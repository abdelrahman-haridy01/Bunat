import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

import { LessonContentType } from 'src/common/enums/domain.enums';
import { LessonSlideDto } from './lesson-slide.dto';

export class LessonQuizOptionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  text!: string;
}

export class LessonQuizQuestionDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  prompt!: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => LessonQuizOptionDto)
  options!: LessonQuizOptionDto[];

  @IsString()
  correctOptionId!: string;
}

export class LessonQuizDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  passingScorePercentage?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LessonQuizQuestionDto)
  questions!: LessonQuizQuestionDto[];
}

export class CreateLessonDto {
  @IsMongoId()
  courseId!: string;

  @IsString()
  title!: string;

  @IsEnum(LessonContentType)
  contentType!: LessonContentType;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  contentUrl?: string | null;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsString()
  contentHtml?: string | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonSlideDto)
  slides?: LessonSlideDto[];

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @ValidateNested()
  @Type(() => LessonQuizDto)
  quiz?: LessonQuizDto | null;

  @IsNumber()
  order!: number;

  @IsNumber()
  durationMinutes!: number;

  @IsBoolean()
  isRequired!: boolean;
}
