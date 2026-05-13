import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserAiSettingsDocument = HydratedDocument<UserAiSettings>;

@Schema({ timestamps: true })
export class UserAiSettings {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId!: Types.ObjectId;

  @Prop({ default: 'openai' })
  provider!: string;

  @Prop({ required: true })
  encryptedApiKey!: string;

  @Prop({ default: 'gpt-4o-mini' })
  model!: string;

  @Prop({ type: String, default: null })
  baseUrl!: string | null;

  @Prop({ default: 'ar' })
  language!: string;

  @Prop({ default: 5 })
  defaultLessonCount!: number;

  @Prop({ default: 5 })
  defaultFinalExamQuestionCount!: number;
}

export const UserAiSettingsSchema = SchemaFactory.createForClass(UserAiSettings);
