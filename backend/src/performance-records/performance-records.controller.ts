import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreatePerformanceRecordDto } from './dto/create-performance-record.dto';
import { PerformanceRecordsService } from './performance-records.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('performance-records')
export class PerformanceRecordsController {
  constructor(private readonly performanceRecordsService: PerformanceRecordsService) {}

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Post()
  create(
    @Body() createPerformanceRecordDto: CreatePerformanceRecordDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.performanceRecordsService.create(createPerformanceRecordDto, user.id);
  }
}

