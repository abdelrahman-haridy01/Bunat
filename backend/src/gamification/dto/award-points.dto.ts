import { IsEnum, IsMongoId, IsNumber, IsString } from 'class-validator';

import { PointsSourceType } from 'src/common/enums/domain.enums';

export class AwardPointsDto {
  @IsMongoId()
  userId!: string;

  @IsEnum(PointsSourceType)
  sourceType!: PointsSourceType;

  @IsString()
  sourceId!: string;

  @IsNumber()
  points!: number;

  @IsString()
  description!: string;
}

