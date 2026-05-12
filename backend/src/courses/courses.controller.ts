import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseDetailsResponse, CoursesService } from './courses.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager, UserRole.Employee)
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager, UserRole.Employee)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: UserRole },
  ): Promise<CourseDetailsResponse> {
    return this.coursesService.findById(id, user);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @CurrentUser() user: { id: string }) {
    return this.coursesService.create(createCourseDto, user.id);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
