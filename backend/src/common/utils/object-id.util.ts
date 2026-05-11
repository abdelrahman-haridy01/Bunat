import { Types } from 'mongoose';

export const toObjectId = (value?: string | Types.ObjectId | null) =>
  value ? new Types.ObjectId(value) : undefined;

