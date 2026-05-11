import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { toObjectId } from 'src/common/utils/object-id.util';
import { Course, CourseDocument } from 'src/courses/schemas/course.schema';
import { LearningPath, LearningPathDocument } from 'src/learning-paths/schemas/learning-path.schema';
import {
  PerformanceRecord,
  PerformanceRecordDocument,
} from 'src/performance-records/schemas/performance-record.schema';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { UpdateKpiDto } from './dto/update-kpi.dto';
import { Kpi, KpiDocument } from './schemas/kpi.schema';

@Injectable()
export class KpisService {
  constructor(
    @InjectModel(Kpi.name) private readonly kpiModel: Model<KpiDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(LearningPath.name)
    private readonly learningPathModel: Model<LearningPathDocument>,
    @InjectModel(PerformanceRecord.name)
    private readonly performanceRecordModel: Model<PerformanceRecordDocument>,
  ) {}

  findAll() {
    return this.kpiModel.find().populate('departmentId').sort({ name: 1 }).exec();
  }

  findById(id: string) {
    return this.kpiModel.findById(id).exec();
  }

  create(createKpiDto: CreateKpiDto) {
    return this.kpiModel.create({
      ...createKpiDto,
      departmentId: toObjectId(createKpiDto.departmentId) ?? null,
    });
  }

  update(id: string, updateKpiDto: UpdateKpiDto) {
    return this.kpiModel
      .findByIdAndUpdate(
        id,
        {
          ...updateKpiDto,
          departmentId:
            'departmentId' in updateKpiDto ? toObjectId(updateKpiDto.departmentId) ?? null : undefined,
        },
        { new: true },
      )
      .exec();
  }

  async remove(id: string) {
    const kpi = await this.kpiModel.findById(id).exec();
    if (!kpi) {
      throw new NotFoundException('المؤشر غير موجود');
    }

    await Promise.all([
      this.kpiModel.deleteOne({ _id: kpi._id }).exec(),
      this.courseModel.updateMany({ kpiIds: kpi._id }, { $pull: { kpiIds: kpi._id } }).exec(),
      this.learningPathModel.updateMany({ kpiIds: kpi._id }, { $pull: { kpiIds: kpi._id } }).exec(),
      this.performanceRecordModel.deleteMany({ kpiId: kpi._id }).exec(),
    ]);

    return { success: true };
  }
}
