import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Course, CourseSchema } from 'src/courses/schemas/course.schema';
import { LearningPath, LearningPathSchema } from 'src/learning-paths/schemas/learning-path.schema';
import {
  PerformanceRecord,
  PerformanceRecordSchema,
} from 'src/performance-records/schemas/performance-record.schema';
import { Kpi, KpiSchema } from './schemas/kpi.schema';
import { KpisController } from './kpis.controller';
import { KpisService } from './kpis.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Kpi.name, schema: KpiSchema },
      { name: Course.name, schema: CourseSchema },
      { name: LearningPath.name, schema: LearningPathSchema },
      { name: PerformanceRecord.name, schema: PerformanceRecordSchema },
    ]),
  ],
  controllers: [KpisController],
  providers: [KpisService],
  exports: [KpisService, MongooseModule],
})
export class KpisModule {}
