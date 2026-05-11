import { IsNumber, IsOptional, Min } from 'class-validator';

export class CompleteLessonDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpentMinutes?: number;
}

