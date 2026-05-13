import { randomUUID } from 'crypto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { EnrollmentStatus, LessonProgressStatus, PointsSourceType, UserRole } from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { GamificationService } from 'src/gamification/gamification.service';
import { LessonQuizDto } from 'src/lessons/dto/create-lesson.dto';
import { SubmitQuizAttemptDto } from 'src/lessons/dto/submit-quiz-attempt.dto';
import { LessonQuiz } from 'src/lessons/schemas/lesson.schema';
import { LessonsService } from 'src/lessons/lessons.service';
import { UsersService } from 'src/users/users.service';
import { buildCourseCertificatePdf } from './course-certificate-pdf.util';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseCertificate, CourseCertificateDocument } from './schemas/course-certificate.schema';
import { Course, CourseDocument } from './schemas/course.schema';

export type CourseDetailsResponse = Record<string, unknown> & {
  lessons: unknown[];
};

type CurrentUser = {
  id: string;
  role: UserRole;
};

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(CourseCertificate.name)
    private readonly courseCertificateModel: Model<CourseCertificateDocument>,
    private readonly lessonsService: LessonsService,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly usersService: UsersService,
    private readonly gamificationService: GamificationService,
  ) {}

  findAll() {
    return this.courseModel
      .find()
      .populate('skillIds kpiIds createdBy')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findById(id: string, currentUser?: CurrentUser): Promise<CourseDetailsResponse> {
    const course = await this.courseModel
      .findById(id)
      .populate('skillIds kpiIds createdBy')
      .lean()
      .exec();

    if (!course) {
      throw new NotFoundException('الدورة غير موجودة');
    }

    const lessons = await this.lessonsService.findByCourse(id, currentUser);
    const isAuthorView =
      !currentUser ||
      currentUser.role === UserRole.Admin ||
      currentUser.role === UserRole.Hr ||
      currentUser.role === UserRole.CourseManager;
    const enrollment = currentUser
      ? await this.enrollmentsService.findByUserAndCourse(currentUser.id, id)
      : null;

    return {
      ...(course as Record<string, unknown>),
      finalQuiz: isAuthorView ? course.finalQuiz : this.sanitizeQuizForLearner(course.finalQuiz),
      finalQuizProgress: enrollment?.finalQuizProgress ?? null,
      lessons,
    };
  }

  create(createCourseDto: CreateCourseDto, createdBy: string) {
    return this.courseModel.create({
      ...this.prepareCoursePayload(createCourseDto),
      skillIds: createCourseDto.skillIds.map((skillId) => toObjectId(skillId)) as Types.ObjectId[],
      kpiIds: createCourseDto.kpiIds.map((kpiId) => toObjectId(kpiId)) as Types.ObjectId[],
      createdBy: toObjectId(createdBy),
    });
  }

  update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.courseModel
      .findByIdAndUpdate(
        id,
        {
          ...this.prepareCoursePayload(updateCourseDto),
          skillIds:
            'skillIds' in updateCourseDto
              ? updateCourseDto.skillIds?.map((skillId) => toObjectId(skillId))
              : undefined,
          kpiIds:
            'kpiIds' in updateCourseDto
              ? updateCourseDto.kpiIds?.map((kpiId) => toObjectId(kpiId))
              : undefined,
        },
        { new: true },
      )
      .exec();
  }

  async submitFinalQuizAttempt(courseId: string, userId: string, submitQuizAttemptDto: SubmitQuizAttemptDto) {
    const [course, enrollment] = await Promise.all([
      this.courseModel.findById(courseId).exec(),
      this.enrollmentsService.findByUserAndCourse(userId, courseId),
    ]);

    if (!course) {
      throw new NotFoundException('الدورة غير موجودة');
    }
    if (!course.finalQuiz) {
      throw new BadRequestException('لا يوجد اختبار نهائي لهذه الدورة');
    }
    if (!enrollment) {
      throw new NotFoundException('لا يوجد تسجيل لهذه الدورة');
    }

    const gradingResult = this.gradeQuizAttempt(course.finalQuiz, submitQuizAttemptDto.answers);
    const now = new Date();
    const previousProgress = enrollment.finalQuizProgress;
    const alreadyPassed = !!previousProgress?.passed;
    const nextProgress = {
      attemptCount: (previousProgress?.attemptCount ?? 0) + 1,
      lastAttemptAt: now,
      lastScorePercentage: gradingResult.scorePercentage,
      bestScorePercentage: Math.max(previousProgress?.bestScorePercentage ?? 0, gradingResult.scorePercentage),
      bestCorrectAnswersCount: Math.max(
        previousProgress?.bestCorrectAnswersCount ?? 0,
        gradingResult.correctAnswersCount,
      ),
      questionCount: gradingResult.questionCount,
      passed: alreadyPassed || gradingResult.passed,
      completedAt: gradingResult.passed ? previousProgress?.completedAt ?? now : previousProgress?.completedAt ?? null,
    };

    await this.enrollmentsService.updateFinalQuizProgress(enrollment.id, nextProgress);

    if (gradingResult.passed && !alreadyPassed) {
      await this.gamificationService.awardPointsInternal(
        userId,
        PointsSourceType.QuizPassed,
        `final:${courseId}`,
        25,
        `اجتياز الاختبار النهائي: ${course.title}`,
      );
    }

    const courseProgress = await this.enrollmentsService.syncCourseProgress(
      enrollment.id,
      userId,
      courseId,
      enrollment.startedAt ?? now,
    );

    return {
      success: true,
      passed: gradingResult.passed,
      scorePercentage: gradingResult.scorePercentage,
      correctAnswersCount: gradingResult.correctAnswersCount,
      questionCount: gradingResult.questionCount,
      passingScorePercentage: course.finalQuiz.passingScorePercentage,
      bestScorePercentage: nextProgress.bestScorePercentage,
      quizPassed: nextProgress.passed,
      attemptCount: nextProgress.attemptCount,
      progressPercentage: courseProgress.progressPercentage,
      status: courseProgress.status,
    };
  }

  async buildCertificatePdf(
    courseId: string,
    currentUser: { id: string; role: UserRole },
    targetUserId?: string,
  ) {
    const userId =
      currentUser.role === UserRole.Admin ||
      currentUser.role === UserRole.Hr ||
      currentUser.role === UserRole.CourseManager
        ? targetUserId || currentUser.id
        : currentUser.id;

    const [course, learner, enrollment] = await Promise.all([
      this.courseModel.findById(courseId).exec(),
      this.usersService.findById(userId),
      this.enrollmentsService.findByUserAndCourse(userId, courseId),
    ]);

    if (!course || !learner || !enrollment) {
      throw new NotFoundException('تعذر إصدار الشهادة');
    }

    if (!course.certificateEnabled) {
      throw new BadRequestException('هذه الدورة لا تمنح شهادة إتمام');
    }

    if (enrollment.status !== EnrollmentStatus.Completed) {
      throw new BadRequestException('يجب إكمال الدورة قبل تنزيل الشهادة');
    }

    const normalizedUserId = toObjectId(userId);
    const normalizedCourseId = toObjectId(courseId);
    let certificate = await this.courseCertificateModel
      .findOne({ userId: normalizedUserId, courseId: normalizedCourseId })
      .exec();

    if (!certificate) {
      certificate = await this.courseCertificateModel.create({
        certificateNumber: `BUNAT-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`,
        userId: normalizedUserId,
        courseId: normalizedCourseId,
        enrollmentId: enrollment._id,
        issuedAt: new Date(),
      });
    }

    const buffer = await buildCourseCertificatePdf({
      learnerName: learner.fullName,
      courseTitle: course.title,
      certificateNumber: certificate.certificateNumber,
      completionDate: enrollment.completedAt ?? certificate.issuedAt,
    });

    return {
      buffer,
      fileNameSuffix: `${userId}-${courseId}`,
    };
  }

  async remove(id: string) {
    await this.courseModel.findByIdAndDelete(id).exec();
    return { success: true };
  }

  private prepareCoursePayload(payload: Partial<CreateCourseDto>) {
    const updatePayload: Record<string, unknown> = {
      ...payload,
    };

    if ('finalQuiz' in payload) {
      updatePayload['finalQuiz'] = payload.finalQuiz ? this.normalizeQuiz(payload.finalQuiz) : null;
    }

    if ('certificateEnabled' in payload) {
      updatePayload['certificateEnabled'] = !!payload.certificateEnabled;
    }

    return updatePayload;
  }

  private normalizeQuiz(quiz?: LessonQuizDto | null): LessonQuiz {
    if (!quiz?.questions?.length) {
      throw new BadRequestException('أضف سؤالاً واحداً على الأقل للاختبار النهائي');
    }

    return {
      passingScorePercentage: this.normalizePassingScore(quiz.passingScorePercentage),
      questions: quiz.questions.map((question, questionIndex) => {
        const prompt = String(question.prompt || '').trim();
        if (!prompt) {
          throw new BadRequestException(`عنوان السؤال النهائي رقم ${questionIndex + 1} مطلوب`);
        }

        const options = question.options.map((option, optionIndex) => {
          const text = String(option.text || '').trim();
          if (!text) {
            throw new BadRequestException(`نص الخيار رقم ${optionIndex + 1} مطلوب`);
          }

          return {
            id: String(option.id || '').trim() || randomUUID(),
            text,
          };
        });

        const correctOptionId = String(question.correctOptionId || '').trim();
        if (!correctOptionId || !options.some((option) => option.id === correctOptionId)) {
          throw new BadRequestException(`حدد الإجابة الصحيحة للسؤال النهائي رقم ${questionIndex + 1}`);
        }

        return {
          id: String(question.id || '').trim() || randomUUID(),
          prompt,
          options,
          correctOptionId,
        };
      }),
    };
  }

  private sanitizeQuizForLearner(quiz?: LessonQuiz | null) {
    if (!quiz) {
      return null;
    }

    return {
      passingScorePercentage: quiz.passingScorePercentage,
      questions: quiz.questions.map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options.map((option) => ({
          id: option.id,
          text: option.text,
        })),
      })),
    };
  }

  private normalizePassingScore(value?: number | null) {
    if (value === undefined || value === null) {
      return 70;
    }

    if (value < 0 || value > 100) {
      throw new BadRequestException('درجة الاجتياز يجب أن تكون بين 0 و100');
    }

    return Math.round(value);
  }

  private gradeQuizAttempt(quiz: LessonQuiz, answers: SubmitQuizAttemptDto['answers']) {
    const answerByQuestionId = new Map(
      answers
        .filter((answer) => answer.questionId && answer.optionId)
        .map((answer) => [answer.questionId, answer.optionId] as const),
    );

    let correctAnswersCount = 0;

    for (const question of quiz.questions) {
      if (answerByQuestionId.get(question.id) === question.correctOptionId) {
        correctAnswersCount += 1;
      }
    }

    const questionCount = quiz.questions.length;
    const scorePercentage = questionCount
      ? Math.round((correctAnswersCount / questionCount) * 100)
      : 0;

    return {
      correctAnswersCount,
      questionCount,
      scorePercentage,
      passed: scorePercentage >= quiz.passingScorePercentage,
    };
  }
}
