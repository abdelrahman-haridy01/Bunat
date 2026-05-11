import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { PointsSourceType } from 'src/common/enums/domain.enums';

export type PointsTransactionDocument = HydratedDocument<PointsTransaction>;

@Schema({ timestamps: true })
export class PointsTransaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ enum: PointsSourceType, required: true })
  sourceType!: PointsSourceType;

  @Prop({ type: String, required: true })
  sourceId!: string;

  @Prop({ required: true })
  points!: number;

  @Prop({ required: true })
  description!: string;
}

export const PointsTransactionSchema = SchemaFactory.createForClass(PointsTransaction);

