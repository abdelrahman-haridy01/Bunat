import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { LessonProgressStatus } from 'src/common/enums/domain.enums';

export type LessonProgressDocument = HydratedDocument<LessonProgress>;

@Schema({ _id: false })
export class QuizSubmissionAnswer {
  @Prop({ required: true, trim: true })
  questionId!: string;

  @Prop({ required: true, trim: true })
  optionId!: string;
}

export const QuizSubmissionAnswerSchema = SchemaFactory.createForClass(QuizSubmissionAnswer);

@Schema({ timestamps: true })
export class LessonProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lessonId!: Types.ObjectId;

  @Prop({ enum: LessonProgressStatus, default: LessonProgressStatus.NotStarted })
  status!: LessonProgressStatus;

  @Prop({ type: Date, default: null })
  completedAt!: Date | null;

  @Prop({ default: 0 })
  timeSpentMinutes!: number;

  @Prop({ default: 0 })
  attemptCount!: number;

  @Prop({ type: Date, default: null })
  lastAttemptAt!: Date | null;

  @Prop({ type: Number, default: null })
  lastQuizScorePercentage!: number | null;

  @Prop({ type: Number, default: null })
  bestQuizScorePercentage!: number | null;

  @Prop({ type: Number, default: null })
  bestCorrectAnswersCount!: number | null;

  @Prop({ type: Number, default: null })
  questionCount!: number | null;

  @Prop({ default: false })
  quizPassed!: boolean;

  @Prop({ type: [QuizSubmissionAnswerSchema], default: [] })
  submittedAnswers!: QuizSubmissionAnswer[];
}

export const LessonProgressSchema = SchemaFactory.createForClass(LessonProgress);
LessonProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });
