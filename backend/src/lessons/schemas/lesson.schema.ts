import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { LessonContentType } from 'src/common/enums/domain.enums';

export type LessonDocument = HydratedDocument<Lesson>;

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

  @Prop({ required: true })
  order!: number;

  @Prop({ required: true })
  durationMinutes!: number;

  @Prop({ default: true })
  isRequired!: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
