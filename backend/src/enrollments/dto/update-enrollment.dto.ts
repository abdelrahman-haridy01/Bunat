import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { EnrollmentStatus } from 'src/common/enums/domain.enums';

export class UpdateEnrollmentDto {
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;

  @IsOptional()
  @IsNumber()
  progressPercentage?: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

