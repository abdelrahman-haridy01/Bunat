import { ArrayUnique, IsArray, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

import { CourseStatus, DifficultyLevel } from 'src/common/enums/domain.enums';

export class CreateCourseDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  skillIds!: string[];

  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  kpiIds!: string[];

  @IsEnum(DifficultyLevel)
  difficulty!: DifficultyLevel;

  @IsNumber()
  estimatedDurationMinutes!: number;

  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;
}

