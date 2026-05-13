import { IsIn, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

import { AI_PROVIDERS, AiProvider } from '../schemas/user-ai-settings.schema';

export class UpdateAiSettingsDto {
  @IsOptional()
  @IsIn(AI_PROVIDERS)
  provider?: AiProvider;

  @IsOptional()
  @IsString()
  apiKey?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  baseUrl?: string | null;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  defaultLessonCount?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(20)
  defaultFinalExamQuestionCount?: number;
}
