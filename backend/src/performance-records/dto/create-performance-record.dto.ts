import { IsDateString, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePerformanceRecordDto {
  @IsMongoId()
  userId!: string;

  @IsMongoId()
  kpiId!: string;

  @IsOptional()
  @IsMongoId()
  courseId?: string;

  @IsOptional()
  @IsMongoId()
  learningPathId?: string;

  @IsNumber()
  beforeValue!: number;

  @IsNumber()
  afterValue!: number;

  @IsOptional()
  @IsDateString()
  measuredAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

