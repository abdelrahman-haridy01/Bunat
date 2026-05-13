import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { DifficultyLevel, LessonContentType } from 'src/common/enums/domain.enums';

export class CreateCourseDraftDto {
  @IsString()
  topic!: string;

  @IsOptional()
  @IsString()
  targetAudience?: string;

  @IsOptional()
  learningObjectives?: string[];

  @IsEnum(DifficultyLevel)
  difficulty!: DifficultyLevel;

  @IsNumber()
  @Min(15)
  estimatedDurationMinutes!: number;

  @IsNumber()
  @Min(1)
  @Max(12)
  lessonCount!: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  includeFinalExam?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(3)
  @Max(20)
  finalExamQuestionCount?: number;

  @IsOptional()
  @IsString()
  language?: string;
}

export type AiDraftLesson = {
  title: string;
  contentType: LessonContentType;
  durationMinutes: number;
  isRequired: boolean;
  slides: Array<{
    title: string;
    body: string;
    mediaUrl?: string | null;
    notes?: string | null;
  }>;
};
