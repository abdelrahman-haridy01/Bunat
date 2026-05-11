import { IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class AssignEnrollmentDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  courseId!: string;

  @IsOptional()
  @IsMongoId()
  learningPathId?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

