import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { CourseStatus, DifficultyLevel } from 'src/common/enums/domain.enums';
import { LessonQuiz, LessonQuizSchema } from 'src/lessons/schemas/lesson.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true })
  title!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ type: [Types.ObjectId], ref: 'Skill', default: [] })
  skillIds!: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Kpi', default: [] })
  kpiIds!: Types.ObjectId[];

  @Prop({ enum: DifficultyLevel, required: true })
  difficulty!: DifficultyLevel;

  @Prop({ required: true })
  estimatedDurationMinutes!: number;

  @Prop({ enum: CourseStatus, default: CourseStatus.Draft })
  status!: CourseStatus;

  @Prop({ type: LessonQuizSchema, default: null })
  finalQuiz!: LessonQuiz | null;

  @Prop({ default: false })
  certificateEnabled!: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy!: Types.ObjectId;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
