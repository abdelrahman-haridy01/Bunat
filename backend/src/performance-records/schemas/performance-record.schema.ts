import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PerformanceRecordDocument = HydratedDocument<PerformanceRecord>;

@Schema({ timestamps: true })
export class PerformanceRecord {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Kpi', required: true })
  kpiId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', default: null })
  courseId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'LearningPath', default: null })
  learningPathId!: Types.ObjectId | null;

  @Prop({ required: true })
  beforeValue!: number;

  @Prop({ required: true })
  afterValue!: number;

  @Prop({ required: true })
  improvementPercentage!: number;

  @Prop({ required: true })
  measuredAt!: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  measuredBy!: Types.ObjectId;

  @Prop({ default: '' })
  notes!: string;
}

export const PerformanceRecordSchema = SchemaFactory.createForClass(PerformanceRecord);

