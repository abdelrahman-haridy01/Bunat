import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { EnrollmentStatus } from 'src/common/enums/domain.enums';
import { FinalQuizProgress, FinalQuizProgressSchema } from './final-quiz-progress.schema';

export type EnrollmentDocument = HydratedDocument<Enrollment>;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LearningPath', default: null })
  learningPathId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedBy!: Types.ObjectId;

  @Prop({ enum: EnrollmentStatus, default: EnrollmentStatus.NotStarted })
  status!: EnrollmentStatus;

  @Prop({ default: 0 })
  progressPercentage!: number;

  @Prop({ type: Date, default: null })
  startedAt!: Date | null;

  @Prop({ type: Date, default: null })
  completedAt!: Date | null;

  @Prop({ type: Date, default: null })
  dueDate!: Date | null;

  @Prop({ type: FinalQuizProgressSchema, default: null })
  finalQuizProgress!: FinalQuizProgress | null;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
