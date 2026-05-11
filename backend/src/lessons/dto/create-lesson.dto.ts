import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

import { LessonContentType } from 'src/common/enums/domain.enums';

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

  @IsNumber()
  order!: number;

  @IsNumber()
  durationMinutes!: number;

  @IsBoolean()
  isRequired!: boolean;
}

