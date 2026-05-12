import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UserRole } from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { LessonsService } from 'src/lessons/lessons.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
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
    private readonly lessonsService: LessonsService,
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
    return {
      ...(course as Record<string, unknown>),
      lessons,
    };
  }

  create(createCourseDto: CreateCourseDto, createdBy: string) {
    return this.courseModel.create({
      ...createCourseDto,
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
          ...updateCourseDto,
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

  async remove(id: string) {
    await this.courseModel.findByIdAndDelete(id).exec();
    return { success: true };
  }
}
