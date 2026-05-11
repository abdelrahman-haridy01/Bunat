import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';

import { KpiDirection, KpiMetricType, UserRole } from 'src/common/enums/domain.enums';

export class CreateKpiDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsEnum(KpiMetricType)
  metricType!: KpiMetricType;

  @IsEnum(KpiDirection)
  direction!: KpiDirection;

  @IsNumber()
  targetValue!: number;

  @IsString()
  unit!: string;

  @IsOptional()
  @IsMongoId()
  departmentId?: string;

  @IsOptional()
  @IsEnum(UserRole)
  roleTarget?: UserRole;
}

