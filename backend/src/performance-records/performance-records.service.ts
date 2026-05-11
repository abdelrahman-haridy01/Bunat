import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KpiDirection, PointsSourceType } from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { GamificationService } from 'src/gamification/gamification.service';
import { KpisService } from 'src/kpis/kpis.service';
import { CreatePerformanceRecordDto } from './dto/create-performance-record.dto';
import { PerformanceRecord, PerformanceRecordDocument } from './schemas/performance-record.schema';

@Injectable()
export class PerformanceRecordsService {
  constructor(
    @InjectModel(PerformanceRecord.name)
    private readonly performanceRecordModel: Model<PerformanceRecordDocument>,
    private readonly kpisService: KpisService,
    private readonly gamificationService: GamificationService,
  ) {}

  findByUser(userId: string) {
    return this.performanceRecordModel.find({ userId }).populate('kpiId courseId learningPathId').exec();
  }

  async create(createPerformanceRecordDto: CreatePerformanceRecordDto, measuredBy: string) {
    const kpi = await this.kpisService.findById(createPerformanceRecordDto.kpiId);
    if (!kpi) {
      throw new NotFoundException('مؤشر الأداء غير موجود');
    }

    const delta = createPerformanceRecordDto.afterValue - createPerformanceRecordDto.beforeValue;
    const denominator = createPerformanceRecordDto.beforeValue === 0 ? 1 : createPerformanceRecordDto.beforeValue;
    const improvementPercentage = Number(((delta / denominator) * 100).toFixed(2));

    const record = await this.performanceRecordModel.create({
      ...createPerformanceRecordDto,
      userId: toObjectId(createPerformanceRecordDto.userId),
      kpiId: toObjectId(createPerformanceRecordDto.kpiId),
      courseId: toObjectId(createPerformanceRecordDto.courseId) ?? null,
      learningPathId: toObjectId(createPerformanceRecordDto.learningPathId) ?? null,
      measuredBy: toObjectId(measuredBy),
      measuredAt: createPerformanceRecordDto.measuredAt
        ? new Date(createPerformanceRecordDto.measuredAt)
        : new Date(),
      improvementPercentage,
    });

    const targetAchieved =
      kpi.direction === KpiDirection.Increase
        ? createPerformanceRecordDto.afterValue >= kpi.targetValue
        : createPerformanceRecordDto.afterValue <= kpi.targetValue;

    if (targetAchieved) {
      await this.gamificationService.awardPointsInternal(
        createPerformanceRecordDto.userId,
        PointsSourceType.KpiAchieved,
        record.id,
        150,
        `تحقيق مؤشر الأداء: ${kpi.name}`,
      );
    }

    return record;
  }
}
