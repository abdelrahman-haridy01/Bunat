import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CompleteLessonDto } from './dto/complete-lesson.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('courses/:courseId/lessons')
  findByCourse(@Param('courseId') courseId: string) {
    return this.lessonsService.findByCourse(courseId);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Post('lessons')
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Patch('lessons/:id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Post('lessons/:id/complete')
  complete(
    @Param('id') id: string,
    @Body() completeLessonDto: CompleteLessonDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.lessonsService.completeLesson(id, user.id, completeLessonDto);
  }
}

