import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Kpi, KpiSchema } from './schemas/kpi.schema';
import { KpisController } from './kpis.controller';
import { KpisService } from './kpis.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Kpi.name, schema: KpiSchema }])],
  controllers: [KpisController],
  providers: [KpisService],
  exports: [KpisService, MongooseModule],
})
export class KpisModule {}

