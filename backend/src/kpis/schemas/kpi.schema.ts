import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { KpiDirection, KpiMetricType, UserRole } from 'src/common/enums/domain.enums';

export type KpiDocument = HydratedDocument<Kpi>;

@Schema({ timestamps: true })
export class Kpi {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ enum: KpiMetricType, required: true })
  metricType!: KpiMetricType;

  @Prop({ enum: KpiDirection, required: true })
  direction!: KpiDirection;

  @Prop({ required: true })
  targetValue!: number;

  @Prop({ default: '' })
  unit!: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', default: null })
  departmentId!: Types.ObjectId | null;

  @Prop({ type: String, enum: UserRole, default: null })
  roleTarget!: UserRole | null;
}

export const KpiSchema = SchemaFactory.createForClass(Kpi);
