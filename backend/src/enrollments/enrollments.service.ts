import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EnrollmentStatus } from 'src/common/enums/domain.enums';
import { Course, CourseDocument } from 'src/courses/schemas/course.schema';
import { Lesson, LessonDocument } from 'src/lessons/schemas/lesson.schema';
import { toObjectId } from 'src/common/utils/object-id.util';
import { AssignEnrollmentDto } from './dto/assign-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<LessonDocument>,
  ) {}

  findAll() {
    return this.enrollmentModel
      .find()
      .populate('userId courseId learningPathId assignedBy')
      .sort({ createdAt: -1 })
      .exec();
  }

  findMyEnrollments(userId: string) {
    return this.enrollmentModel
      .find({ userId: toObjectId(userId) })
      .populate('courseId learningPathId assignedBy')
      .sort({ createdAt: -1 })
      .exec();
  }

  findTeamEnrollments(teamMemberIds: string[]) {
    return this.enrollmentModel
      .find({ userId: { $in: teamMemberIds.map((memberId) => toObjectId(memberId)) } })
      .populate('userId courseId learningPathId assignedBy')
      .sort({ createdAt: -1 })
      .exec();
  }

  findByUserAndCourse(userId: string, courseId: string) {
    return this.enrollmentModel
      .findOne({
        userId: toObjectId(userId),
        courseId: toObjectId(courseId),
      })
      .exec();
  }

  assign(assignEnrollmentDto: AssignEnrollmentDto, assignedBy: string) {
    return this.validateAssignmentCourse(assignEnrollmentDto.courseId).then(() =>
      this.enrollmentModel
        .findOneAndUpdate(
          {
            userId: toObjectId(assignEnrollmentDto.userId),
            courseId: toObjectId(assignEnrollmentDto.courseId),
          },
          {
            $set: {
              learningPathId: toObjectId(assignEnrollmentDto.learningPathId) ?? null,
              assignedBy: toObjectId(assignedBy),
              dueDate: assignEnrollmentDto.dueDate ? new Date(assignEnrollmentDto.dueDate) : null,
            },
            $setOnInsert: {
              userId: toObjectId(assignEnrollmentDto.userId),
              courseId: toObjectId(assignEnrollmentDto.courseId),
              status: EnrollmentStatus.NotStarted,
              progressPercentage: 0,
              startedAt: null,
              completedAt: null,
            },
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true,
            runValidators: true,
          },
        )
        .populate('userId courseId learningPathId assignedBy')
        .exec(),
    );
  }

  update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentModel
      .findByIdAndUpdate(
        id,
        {
          ...updateEnrollmentDto,
          dueDate:
            'dueDate' in updateEnrollmentDto && updateEnrollmentDto.dueDate
              ? new Date(updateEnrollmentDto.dueDate)
              : undefined,
        },
        { new: true },
      )
      .exec();
  }

  async remove(id: string) {
    const enrollment = await this.enrollmentModel.findById(id).exec();
    if (!enrollment) {
      throw new NotFoundException('التكليف غير موجود');
    }

    await this.enrollmentModel.deleteOne({ _id: enrollment._id }).exec();
    return { success: true };
  }

  updateProgress(
    id: string,
    progressPercentage: number,
    status: EnrollmentStatus,
    startedAt: Date | null,
    completedAt: Date | null,
  ) {
    return this.enrollmentModel
      .findByIdAndUpdate(
        id,
        {
          progressPercentage,
          status,
          startedAt,
          completedAt,
        },
        { new: true },
      )
      .exec();
  }

  private async validateAssignmentCourse(courseId: string) {
    const normalizedCourseId = toObjectId(courseId);
    const course = await this.courseModel.findById(normalizedCourseId).exec();
    if (!course) {
      throw new NotFoundException('الدورة غير موجودة');
    }

    const lessonsCount = await this.lessonModel.countDocuments({ courseId: normalizedCourseId }).exec();
    if (lessonsCount === 0) {
      throw new BadRequestException('لا يمكن إسناد دورة لا تحتوي على دروس');
    }
  }
}
