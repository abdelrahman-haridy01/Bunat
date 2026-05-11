import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamificationModule } from 'src/gamification/gamification.module';
import { KpisModule } from 'src/kpis/kpis.module';
import { PerformanceRecord, PerformanceRecordSchema } from './schemas/performance-record.schema';
import { PerformanceRecordsController } from './performance-records.controller';
import { PerformanceRecordsService } from './performance-records.service';

@Module({
  imports: [
    KpisModule,
    GamificationModule,
    MongooseModule.forFeature([{ name: PerformanceRecord.name, schema: PerformanceRecordSchema }]),
  ],
  controllers: [PerformanceRecordsController],
  providers: [PerformanceRecordsService],
  exports: [PerformanceRecordsService, MongooseModule],
})
export class PerformanceRecordsModule {}

