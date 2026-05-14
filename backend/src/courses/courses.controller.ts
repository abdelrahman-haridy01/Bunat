import { Body, Controller, Delete, Get, Param, Patch, Post, Query, StreamableFile, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDetailsResponse, CoursesService } from './courses.service';
import { SubmitQuizAttemptDto } from 'src/lessons/dto/submit-quiz-attempt.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager, UserRole.Manager, UserRole.Employee)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager, UserRole.Manager, UserRole.Employee)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
  ): Promise<CourseDetailsResponse> {
    return this.coursesService.findById(id, user);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @CurrentUser() user: { id: string }) {
    return this.coursesService.create(createCourseDto, user.id);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Post(':id/final-quiz-attempt')
  submitFinalQuizAttempt(
    @Param('id') id: string,
    @Body() submitQuizAttemptDto: SubmitQuizAttemptDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.coursesService.submitFinalQuizAttempt(id, user.id, submitQuizAttemptDto);
  }

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Get(':id/certificate')
  async downloadCertificate(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
    @Query('userId') targetUserId: string | undefined,
  ) {
    const certificate = await this.coursesService.buildCertificatePdf(id, user, targetUserId);
    return new StreamableFile(certificate.buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="bunat-certificate-${certificate.fileNameSuffix}.pdf"`,
      length: certificate.buffer.length,
    });
  }
}
