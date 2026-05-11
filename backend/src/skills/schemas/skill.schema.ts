import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { DifficultyLevel } from 'src/common/enums/domain.enums';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ enum: DifficultyLevel, required: true })
  level!: DifficultyLevel;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);

