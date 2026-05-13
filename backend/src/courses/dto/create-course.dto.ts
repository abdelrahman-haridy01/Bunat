import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CourseStatus, DifficultyLevel } from 'src/common/enums/domain.enums';
import { LessonQuizDto } from 'src/lessons/dto/create-lesson.dto';

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

  @IsOptional()
  @ValidateNested()
  @Type(() => LessonQuizDto)
  finalQuiz?: LessonQuizDto | null;

  @IsOptional()
  @IsBoolean()
  certificateEnabled?: boolean;
}
