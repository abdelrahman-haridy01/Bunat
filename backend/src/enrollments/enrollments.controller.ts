import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UsersService } from 'src/users/users.service';
import { AssignEnrollmentDto } from './dto/assign-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentsService } from './enrollments.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly usersService: UsersService,
  ) {}

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('my')
  my(@CurrentUser() user: { id: string }) {
    return this.enrollmentsService.findMyEnrollments(user.id);
  }

  @Roles(UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('team')
  async team(@CurrentUser() user: { id: string; role: UserRole }) {
    if (user.role === UserRole.Admin || user.role === UserRole.Hr) {
      return this.enrollmentsService.findAll();
    }

    const users = await this.usersService.findAll();
    const teamMembers = users.filter((member) => this.extractId(member.managerId) === user.id);
    return this.enrollmentsService.findTeamEnrollments(teamMembers.map((member) => String(member._id ?? member.id)));
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Post('assign')
  assign(@Body() assignEnrollmentDto: AssignEnrollmentDto, @CurrentUser() user: { id: string }) {
    return this.enrollmentsService.assign(assignEnrollmentDto, user.id);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }

  private extractId(value: unknown) {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object') {
      const record = value as Record<string, unknown>;
      return String(record._id ?? record.id ?? '');
    }

    return String(value);
  }
}
