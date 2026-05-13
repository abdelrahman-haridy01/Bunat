import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { LessonContentType } from 'src/common/enums/domain.enums';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema({ _id: false })
export class LessonSlide {
  @Prop({ required: true, trim: true })
  id!: string;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true, trim: true })
  body!: string;

  @Prop({ type: String, default: null })
  mediaUrl!: string | null;

  @Prop({ type: String, default: null })
  notes!: string | null;
}

export const LessonSlideSchema = SchemaFactory.createForClass(LessonSlide);

@Schema({ _id: false })
export class QuizOption {
  @Prop({ required: true, trim: true })
  id!: string;

  @Prop({ required: true, trim: true })
  text!: string;
}

export const QuizOptionSchema = SchemaFactory.createForClass(QuizOption);

@Schema({ _id: false })
export class QuizQuestion {
  @Prop({ required: true, trim: true })
  id!: string;

  @Prop({ required: true, trim: true })
  prompt!: string;

  @Prop({ type: [QuizOptionSchema], default: [] })
  options!: QuizOption[];

  @Prop({ required: true, trim: true })
  correctOptionId!: string;
}

export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);

@Schema({ _id: false })
export class LessonQuiz {
  @Prop({ default: 70 })
  passingScorePercentage!: number;

  @Prop({ type: [QuizQuestionSchema], default: [] })
  questions!: QuizQuestion[];
}

export const LessonQuizSchema = SchemaFactory.createForClass(LessonQuiz);

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ enum: LessonContentType, required: true })
  contentType!: LessonContentType;

  @Prop({ type: String, default: null })
  contentUrl!: string | null;

  @Prop({ type: String, default: null })
  contentHtml!: string | null;

  @Prop({ type: [LessonSlideSchema], default: [] })
  slides!: LessonSlide[];

  @Prop({ type: LessonQuizSchema, default: null })
  quiz!: LessonQuiz | null;

  @Prop({ required: true })
  order!: number;

  @Prop({ required: true })
  durationMinutes!: number;

  @Prop({ default: true })
  isRequired!: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
