import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LevelDocument = HydratedDocument<Level>;

@Schema({ timestamps: true })
export class Level {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  minPoints!: number;

  @Prop({ required: true })
  maxPoints!: number;

  @Prop({ required: true })
  icon!: string;

  @Prop({ required: true })
  order!: number;
}

export const LevelSchema = SchemaFactory.createForClass(Level);

