import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { BadgeCriteriaType } from 'src/common/enums/domain.enums';

export type BadgeDocument = HydratedDocument<Badge>;

@Schema({ timestamps: true })
export class Badge {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ required: true })
  icon!: string;

  @Prop({ enum: BadgeCriteriaType, required: true })
  criteriaType!: BadgeCriteriaType;

  @Prop({ required: true })
  criteriaValue!: number;

  @Prop({ default: 0 })
  pointsReward!: number;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);

