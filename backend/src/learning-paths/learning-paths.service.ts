import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';
import { UpdateLearningPathDto } from './dto/update-learning-path.dto';
import { LearningPath, LearningPathDocument } from './schemas/learning-path.schema';

@Injectable()
export class LearningPathsService {
  constructor(
    @InjectModel(LearningPath.name)
    private readonly learningPathModel: Model<LearningPathDocument>,
  ) {}

  findAll() {
    return this.learningPathModel
      .find()
      .populate('departmentId courseIds skillIds kpiIds createdBy')
      .sort({ title: 1 })
      .exec();
  }

  create(createLearningPathDto: CreateLearningPathDto, createdBy: string) {
    return this.learningPathModel.create({
      ...createLearningPathDto,
      departmentId: toObjectId(createLearningPathDto.departmentId) ?? null,
      courseIds: createLearningPathDto.courseIds.map((courseId) => toObjectId(courseId)),
      skillIds: createLearningPathDto.skillIds.map((skillId) => toObjectId(skillId)),
      kpiIds: createLearningPathDto.kpiIds.map((kpiId) => toObjectId(kpiId)),
      createdBy: toObjectId(createdBy),
    });
  }

  update(id: string, updateLearningPathDto: UpdateLearningPathDto) {
    return this.learningPathModel
      .findByIdAndUpdate(
        id,
        {
          ...updateLearningPathDto,
          departmentId:
            'departmentId' in updateLearningPathDto
              ? toObjectId(updateLearningPathDto.departmentId) ?? null
              : undefined,
          courseIds:
            'courseIds' in updateLearningPathDto
              ? updateLearningPathDto.courseIds?.map((courseId) => toObjectId(courseId))
              : undefined,
          skillIds:
            'skillIds' in updateLearningPathDto
              ? updateLearningPathDto.skillIds?.map((skillId) => toObjectId(skillId))
              : undefined,
          kpiIds:
            'kpiIds' in updateLearningPathDto
              ? updateLearningPathDto.kpiIds?.map((kpiId) => toObjectId(kpiId))
              : undefined,
        },
        { new: true },
      )
      .exec();
  }
}

