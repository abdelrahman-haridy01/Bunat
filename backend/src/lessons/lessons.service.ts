import { randomUUID } from 'crypto';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  EnrollmentStatus,
  LessonContentType,
  LessonProgressStatus,
  PointsSourceType,
  UserRole,
} from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { GamificationService } from 'src/gamification/gamification.service';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { CreateLessonDto, LessonQuizDto } from './dto/create-lesson.dto';
import { SubmitQuizAttemptDto } from './dto/submit-quiz-attempt.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonProgress, LessonProgressDocument } from './schemas/lesson-progress.schema';
import { Lesson, LessonDocument, LessonQuiz } from './schemas/lesson.schema';

type CurrentUser = {
  id: string;
  role: UserRole;
};

type QuizGradingResult = {
  correctAnswersCount: number;
  questionCount: number;
  scorePercentage: number;
  passed: boolean;
  submittedAnswers: Array<{ questionId: string; optionId: string }>;
};

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonModel: Model<LessonDocument>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgressDocument>,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly gamificationService: GamificationService,
  ) {}

  async findByCourse(courseId: string, currentUser?: CurrentUser) {
    const normalizedCourseId = toObjectId(courseId);
    const lessons = await this.lessonModel.find({ courseId: normalizedCourseId }).sort({ order: 1 }).exec();

    if (
      !currentUser ||
      currentUser.role === UserRole.Admin ||
      currentUser.role === UserRole.Hr
    ) {
      return lessons;
    }

    const lessonProgress = await this.lessonProgressModel
      .find({
        userId: toObjectId(currentUser.id),
        courseId: normalizedCourseId,
      })
      .exec();

    const progressByLessonId = new Map(
      lessonProgress.map((progress) => [progress.lessonId.toString(), progress] as const),
    );

    return lessons.map((lesson) =>
      this.sanitizeLessonForLearner(lesson, progressByLessonId.get(lesson._id.toString())),
    );
  }

  create(createLessonDto: CreateLessonDto) {
    return this.lessonModel.create(this.prepareLessonPayload(createLessonDto));
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.lessonModel
      .findByIdAndUpdate(id, this.prepareLessonPayload(updateLessonDto), { new: true })
      .exec();
  }

  async remove(id: string) {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException('الدرس غير موجود');
    }

    await Promise.all([
      this.lessonModel.deleteOne({ _id: lesson._id }).exec(),
      this.lessonProgressModel.deleteMany({ lessonId: lesson._id }).exec(),
      this.lessonModel
        .updateMany(
          {
            courseId: lesson.courseId,
            order: { $gt: lesson.order },
          },
          { $inc: { order: -1 } },
        )
        .exec(),
    ]);

    return { success: true };
  }

  async completeLesson(id: string, userId: string, completeLessonDto: CompleteLessonDto) {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException('الدرس غير موجود');
    }

    if (lesson.contentType === LessonContentType.Quiz) {
      throw new BadRequestException('هذا الدرس اختبار ويجب إرساله عبر نموذج الاختبار');
    }

    const enrollment = await this.ensureEnrollment(userId, lesson.courseId.toString());
    const existingProgress = await this.lessonProgressModel.findOne({
      userId: toObjectId(userId),
      lessonId: lesson._id,
    });

    await this.markLessonCompleted(
      lesson,
      userId,
      completeLessonDto.timeSpentMinutes ?? lesson.durationMinutes,
      existingProgress,
    );

    return this.syncEnrollmentProgress(enrollment.id, userId, lesson.courseId.toString(), enrollment.startedAt ?? new Date());
  }

  async submitQuizAttempt(id: string, userId: string, submitQuizAttemptDto: SubmitQuizAttemptDto) {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException('الدرس غير موجود');
    }

    if (lesson.contentType !== LessonContentType.Quiz || !lesson.quiz) {
      throw new BadRequestException('الدرس المحدد ليس اختباراً');
    }

    const enrollment = await this.ensureEnrollment(userId, lesson.courseId.toString());
    const gradingResult = this.gradeQuizAttempt(lesson.quiz, submitQuizAttemptDto.answers);
    const now = new Date();
    const existingProgress = await this.lessonProgressModel.findOne({
      userId: toObjectId(userId),
      lessonId: lesson._id,
    });

    const alreadyPassed = existingProgress?.quizPassed || existingProgress?.status === LessonProgressStatus.Completed;
    const timeSpentMinutes =
      (existingProgress?.timeSpentMinutes ?? 0) +
      (submitQuizAttemptDto.timeSpentMinutes ?? lesson.durationMinutes);

    const progress =
      existingProgress ??
      new this.lessonProgressModel({
        userId: toObjectId(userId),
        courseId: lesson.courseId,
        lessonId: lesson._id,
      });

    progress.status = gradingResult.passed
      ? LessonProgressStatus.Completed
      : LessonProgressStatus.InProgress;
    progress.completedAt = gradingResult.passed ? progress.completedAt ?? now : progress.completedAt ?? null;
    progress.timeSpentMinutes = timeSpentMinutes;
    progress.attemptCount = (progress.attemptCount ?? 0) + 1;
    progress.lastAttemptAt = now;
    progress.lastQuizScorePercentage = gradingResult.scorePercentage;
    progress.bestQuizScorePercentage = Math.max(
      progress.bestQuizScorePercentage ?? 0,
      gradingResult.scorePercentage,
    );
    progress.bestCorrectAnswersCount = Math.max(
      progress.bestCorrectAnswersCount ?? 0,
      gradingResult.correctAnswersCount,
    );
    progress.questionCount = gradingResult.questionCount;
    progress.quizPassed = alreadyPassed || gradingResult.passed;
    progress.submittedAnswers = gradingResult.submittedAnswers;

    await progress.save();

    if (gradingResult.passed) {
      if (!alreadyPassed) {
        await this.gamificationService.awardPointsInternal(
          userId,
          PointsSourceType.QuizPassed,
          id,
          25,
          `اجتياز الاختبار: ${lesson.title}`,
        );
      }

      await this.markLessonCompleted(lesson, userId, timeSpentMinutes, progress);
    }

    const enrollmentProgress = await this.syncEnrollmentProgress(
      enrollment.id,
      userId,
      lesson.courseId.toString(),
      enrollment.startedAt ?? now,
    );

    return {
      success: true,
      passed: gradingResult.passed,
      scorePercentage: gradingResult.scorePercentage,
      correctAnswersCount: gradingResult.correctAnswersCount,
      questionCount: gradingResult.questionCount,
      passingScorePercentage: lesson.quiz.passingScorePercentage,
      bestScorePercentage: progress.bestQuizScorePercentage,
      quizPassed: progress.quizPassed,
      attemptCount: progress.attemptCount,
      progressPercentage: enrollmentProgress.progressPercentage,
      status: enrollmentProgress.status,
    };
  }

  private sanitizeLessonForLearner(lesson: LessonDocument, progress?: LessonProgressDocument) {
    const lessonObject = lesson.toObject();

    return {
      ...lessonObject,
      quiz: lesson.quiz
        ? {
            passingScorePercentage: lesson.quiz.passingScorePercentage,
            questions: lesson.quiz.questions.map((question) => ({
              id: question.id,
              prompt: question.prompt,
              options: question.options.map((option) => ({
                id: option.id,
                text: option.text,
              })),
            })),
          }
        : null,
      progress: progress
        ? {
            status: progress.status,
            completedAt: progress.completedAt,
            timeSpentMinutes: progress.timeSpentMinutes,
            attemptCount: progress.attemptCount,
            lastAttemptAt: progress.lastAttemptAt,
            lastQuizScorePercentage: progress.lastQuizScorePercentage,
            bestQuizScorePercentage: progress.bestQuizScorePercentage,
            bestCorrectAnswersCount: progress.bestCorrectAnswersCount,
            questionCount: progress.questionCount,
            quizPassed: progress.quizPassed,
          }
        : null,
    };
  }

  private prepareLessonPayload(payload: Partial<CreateLessonDto>) {
    const updatePayload: Record<string, unknown> = {
      ...payload,
    };

    if ('courseId' in payload && payload.courseId) {
      updatePayload['courseId'] = toObjectId(payload.courseId);
    }

    if ('contentType' in payload) {
      if (payload.contentType === LessonContentType.Quiz) {
        updatePayload['quiz'] = this.normalizeQuiz(payload.quiz);
      } else {
        updatePayload['quiz'] = null;
      }
    } else if ('quiz' in payload) {
      updatePayload['quiz'] = payload.quiz ? this.normalizeQuiz(payload.quiz) : null;
    }

    return updatePayload;
  }

  private normalizeQuiz(quiz?: LessonQuizDto | null): LessonQuiz {
    if (!quiz?.questions?.length) {
      throw new BadRequestException('أضف سؤالاً واحداً على الأقل للاختبار');
    }

    const questions = quiz.questions.map((question, questionIndex) => {
      const prompt = String(question.prompt || '').trim();
      if (!prompt) {
        throw new BadRequestException(`عنوان السؤال رقم ${questionIndex + 1} مطلوب`);
      }

      if (!Array.isArray(question.options) || question.options.length < 2) {
        throw new BadRequestException(`السؤال رقم ${questionIndex + 1} يجب أن يحتوي على خيارين على الأقل`);
      }

      const options = question.options.map((option, optionIndex) => {
        const text = String(option.text || '').trim();
        if (!text) {
          throw new BadRequestException(
            `نص الخيار رقم ${optionIndex + 1} في السؤال رقم ${questionIndex + 1} مطلوب`,
          );
        }

        return {
          id: String(option.id || '').trim() || randomUUID(),
          text,
        };
      });

      const correctOptionId = String(question.correctOptionId || '').trim();
      if (!correctOptionId || !options.some((option) => option.id === correctOptionId)) {
        throw new BadRequestException(`حدد الإجابة الصحيحة للسؤال رقم ${questionIndex + 1}`);
      }

      return {
        id: String(question.id || '').trim() || randomUUID(),
        prompt,
        options,
        correctOptionId,
      };
    });

    return {
      passingScorePercentage: this.normalizePassingScore(quiz.passingScorePercentage),
      questions,
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

  private gradeQuizAttempt(
    quiz: LessonQuiz,
    answers: SubmitQuizAttemptDto['answers'],
  ): QuizGradingResult {
    const answerByQuestionId = new Map(
      answers
        .filter((answer) => answer.questionId && answer.optionId)
        .map((answer) => [answer.questionId, answer.optionId] as const),
    );

    let correctAnswersCount = 0;

    for (const question of quiz.questions) {
      const selectedOptionId = answerByQuestionId.get(question.id);
      if (selectedOptionId && selectedOptionId === question.correctOptionId) {
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
      submittedAnswers: Array.from(answerByQuestionId.entries()).map(([questionId, optionId]) => ({
        questionId,
        optionId,
      })),
    };
  }

  private async ensureEnrollment(userId: string, courseId: string) {
    const enrollment = await this.enrollmentsService.findByUserAndCourse(userId, courseId);
    if (!enrollment) {
      throw new NotFoundException('لا يوجد تسجيل لهذه الدورة');
    }

    return enrollment;
  }

  private async markLessonCompleted(
    lesson: LessonDocument,
    userId: string,
    timeSpentMinutes: number,
    existingProgress?: LessonProgressDocument | null,
  ) {
    const progress =
      existingProgress ??
      new this.lessonProgressModel({
        userId: toObjectId(userId),
        courseId: lesson.courseId,
        lessonId: lesson._id,
      });
    const wasCompletedBefore = progress.status === LessonProgressStatus.Completed;

    progress.status = LessonProgressStatus.Completed;
    progress.completedAt = progress.completedAt ?? new Date();
    progress.timeSpentMinutes = Math.max(progress.timeSpentMinutes ?? 0, timeSpentMinutes);

    await progress.save();

    if (!wasCompletedBefore) {
      await this.gamificationService.awardPointsInternal(
        userId,
        PointsSourceType.LessonCompleted,
        lesson.id,
        10,
        `إكمال الدرس: ${lesson.title}`,
      );
    }

    return progress;
  }

  private async syncEnrollmentProgress(
    enrollmentId: string,
    userId: string,
    courseId: string,
    startedAt: Date,
  ) {
    const [lessons, completedLessonProgress] = await Promise.all([
      this.lessonModel.find({ courseId: toObjectId(courseId) }).sort({ order: 1 }).exec(),
      this.lessonProgressModel.find({
        userId: toObjectId(userId),
        courseId: toObjectId(courseId),
        status: LessonProgressStatus.Completed,
      }),
    ]);

    const requiredLessons = lessons.filter((lesson) => lesson.isRequired);
    const progressPercentage = lessons.length
      ? Math.round((completedLessonProgress.length / lessons.length) * 100)
      : 0;
    const completedRequiredLessons = requiredLessons.every((requiredLesson) =>
      completedLessonProgress.some(
        (progress) => progress.lessonId.toString() === requiredLesson._id.toString(),
      ),
    );

    const completedAt = completedRequiredLessons ? new Date() : null;
    const status = completedRequiredLessons ? EnrollmentStatus.Completed : EnrollmentStatus.InProgress;

    await this.enrollmentsService.updateProgress(
      enrollmentId,
      progressPercentage,
      status,
      startedAt,
      completedAt,
    );

    if (completedRequiredLessons) {
      await this.gamificationService.awardPointsInternal(
        userId,
        PointsSourceType.CourseCompleted,
        courseId,
        100,
        'إكمال الدورة التدريبية',
      );
    }

    return {
      success: true,
      progressPercentage,
      status,
    };
  }
}
