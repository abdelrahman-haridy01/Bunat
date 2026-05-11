import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { UserRole, UserStatus } from 'src/common/enums/domain.enums';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret: Record<string, unknown>) => {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    },
  },
  toObject: {
    transform: (_, ret: Record<string, unknown>) => {
      delete ret.passwordHash;
      delete ret.__v;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, select: false })
  passwordHash!: string;

  @Prop({ required: true })
  jobTitle!: string;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: false, default: null })
  departmentId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'Team', required: false, default: null })
  teamId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false, default: null })
  managerId!: Types.ObjectId | null;

  @Prop({ enum: UserRole, required: true })
  role!: UserRole;

  @Prop({ enum: UserStatus, default: UserStatus.Active })
  status!: UserStatus;

  @Prop({ default: 0 })
  pointsTotal!: number;

  @Prop({ type: Types.ObjectId, ref: 'Level', required: false, default: null })
  levelId!: Types.ObjectId | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
