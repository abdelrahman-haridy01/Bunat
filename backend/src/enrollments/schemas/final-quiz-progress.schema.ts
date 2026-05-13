import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class FinalQuizProgress {
  @Prop({ default: 0 })
  attemptCount!: number;

  @Prop({ type: Date, default: null })
  lastAttemptAt!: Date | null;

  @Prop({ type: Number, default: null })
  lastScorePercentage!: number | null;

  @Prop({ type: Number, default: null })
  bestScorePercentage!: number | null;

  @Prop({ type: Number, default: null })
  bestCorrectAnswersCount!: number | null;

  @Prop({ type: Number, default: null })
  questionCount!: number | null;

  @Prop({ default: false })
  passed!: boolean;

  @Prop({ type: Date, default: null })
  completedAt!: Date | null;
}

export const FinalQuizProgressSchema = SchemaFactory.createForClass(FinalQuizProgress);
