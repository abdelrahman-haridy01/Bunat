import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseCertificateDocument = HydratedDocument<CourseCertificate>;

@Schema({ timestamps: true })
export class CourseCertificate {
  @Prop({ required: true, unique: true })
  certificateNumber!: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Enrollment', required: true })
  enrollmentId!: Types.ObjectId;

  @Prop({ type: Date, required: true })
  issuedAt!: Date;
}

export const CourseCertificateSchema = SchemaFactory.createForClass(CourseCertificate);
CourseCertificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });
