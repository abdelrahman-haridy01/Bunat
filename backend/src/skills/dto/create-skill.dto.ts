import { IsEnum, IsString } from 'class-validator';

import { DifficultyLevel } from 'src/common/enums/domain.enums';

export class CreateSkillDto {
  @IsString()
  name!: string;

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsEnum(DifficultyLevel)
  level!: DifficultyLevel;
}

