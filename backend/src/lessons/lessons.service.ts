import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  EnrollmentStatus,
  LessonProgressStatus,
  PointsSourceType,
} from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { GamificationService } from 'src/gamification/gamification.service';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonProgress, LessonProgressDocument } from './schemas/lesson-progress.schema';
import { Lesson, LessonDocument } from './schemas/lesson.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonModel: Model<LessonDocument>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgressDocument>,
    private readonly enrollmentsService: EnrollmentsService,
    private readonly gamificationService: GamificationService,
  ) {}

  findByCourse(courseId: string) {
    return this.lessonModel.find({ courseId: toObjectId(courseId) }).sort({ order: 1 }).exec();
  }

  create(createLessonDto: CreateLessonDto) {
    return this.lessonModel.create({
      ...createLessonDto,
      courseId: toObjectId(createLessonDto.courseId),
    });
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.lessonModel
      .findByIdAndUpdate(
        id,
        {
          ...updateLessonDto,
          courseId:
            'courseId' in updateLessonDto ? toObjectId(updateLessonDto.courseId) : undefined,
        },
        { new: true },
      )
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

    const enrollment = await this.enrollmentsService.findByUserAndCourse(userId, lesson.courseId.toString());
    if (!enrollment) {
      throw new NotFoundException('لا يوجد تسجيل لهذه الدورة');
    }

    const existingProgress = await this.lessonProgressModel.findOne({
      userId,
      lessonId: id,
    });

    if (!existingProgress) {
      await this.lessonProgressModel.create({
        userId: toObjectId(userId),
        courseId: lesson.courseId,
        lessonId: lesson._id,
        status: LessonProgressStatus.Completed,
        completedAt: new Date(),
        timeSpentMinutes: completeLessonDto.timeSpentMinutes ?? lesson.durationMinutes,
      });

      await this.gamificationService.awardPointsInternal(
        userId,
        PointsSourceType.LessonCompleted,
        id,
        10,
        `إكمال الدرس: ${lesson.title}`,
      );
    } else if (existingProgress.status !== LessonProgressStatus.Completed) {
      existingProgress.status = LessonProgressStatus.Completed;
      existingProgress.completedAt = new Date();
      existingProgress.timeSpentMinutes = completeLessonDto.timeSpentMinutes ?? existingProgress.timeSpentMinutes;
      await existingProgress.save();
    }

    const [lessons, completedLessonProgress] = await Promise.all([
      this.findByCourse(lesson.courseId.toString()),
      this.lessonProgressModel.find({
        userId,
        courseId: lesson.courseId,
        status: LessonProgressStatus.Completed,
      }),
    ]);

    const requiredLessons = lessons.filter((entry) => entry.isRequired);
    const progressPercentage = lessons.length
      ? Math.round((completedLessonProgress.length / lessons.length) * 100)
      : 0;
    const completedRequiredLessons = requiredLessons.every((requiredLesson) =>
      completedLessonProgress.some(
        (progress) => progress.lessonId.toString() === requiredLesson._id.toString(),
      ),
    );

    const startedAt = enrollment.startedAt ?? new Date();
    const completedAt = completedRequiredLessons ? new Date() : null;
    const status = completedRequiredLessons ? EnrollmentStatus.Completed : EnrollmentStatus.InProgress;

    await this.enrollmentsService.updateProgress(
      enrollment.id,
      progressPercentage,
      status,
      startedAt,
      completedAt,
    );

    if (completedRequiredLessons) {
      await this.gamificationService.awardPointsInternal(
        userId,
        PointsSourceType.CourseCompleted,
        lesson.courseId.toString(),
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
