import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class QuizAnswerSubmissionDto {
  @IsString()
  questionId!: string;

  @IsString()
  optionId!: string;
}

export class SubmitQuizAttemptDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuizAnswerSubmissionDto)
  answers!: QuizAnswerSubmissionDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpentMinutes?: number;
}
