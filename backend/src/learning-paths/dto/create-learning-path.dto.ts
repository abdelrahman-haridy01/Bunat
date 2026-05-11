import { ArrayUnique, IsArray, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

import { LearningPathStatus, UserRole } from 'src/common/enums/domain.enums';

export class CreateLearningPathDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(UserRole)
  targetRole!: UserRole;

  @IsOptional()
  @IsMongoId()
  departmentId?: string;

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  courseIds!: string[];

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  skillIds!: string[];

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  kpiIds!: string[];

  @IsOptional()
  @IsEnum(LearningPathStatus)
  status?: LearningPathStatus;
}

