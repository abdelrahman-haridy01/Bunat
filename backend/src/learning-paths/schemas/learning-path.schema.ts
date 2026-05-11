import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { LearningPathStatus, UserRole } from 'src/common/enums/domain.enums';

export type LearningPathDocument = HydratedDocument<LearningPath>;

@Schema({ timestamps: true })
export class LearningPath {
  @Prop({ required: true })
  title!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ enum: UserRole, required: true })
  targetRole!: UserRole;

  @Prop({ type: Types.ObjectId, ref: 'Department', default: null })
  departmentId!: Types.ObjectId | null;

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  courseIds!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Skill', default: [] })
  skillIds!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Kpi', default: [] })
  kpiIds!: Types.ObjectId[];

  @Prop({ enum: LearningPathStatus, default: LearningPathStatus.Active })
  status!: LearningPathStatus;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy!: Types.ObjectId;
}

export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);

