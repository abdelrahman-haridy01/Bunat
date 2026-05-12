import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ReportsService } from './reports.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('employee/:userId')
  employee(@Param('userId') userId: string) {
    return this.reportsService.getEmployeeReport(userId);
  }

  @Roles(UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('team/:teamId')
  team(@Param('teamId') teamId: string) {
    return this.reportsService.getTeamReport(teamId);
  }

  @Roles(UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('manager-dashboard')
  managerDashboard(@CurrentUser() user: { id?: string; _id?: string }) {
    return this.reportsService.getManagerDashboard(String(user._id ?? user.id ?? ''));
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Get('admin-dashboard')
  adminDashboard() {
    return this.reportsService.getAdminDashboard();
  }
}
