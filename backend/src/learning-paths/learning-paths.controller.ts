import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';
import { UpdateLearningPathDto } from './dto/update-learning-path.dto';
import { LearningPathsService } from './learning-paths.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('learning-paths')
export class LearningPathsController {
  constructor(private readonly learningPathsService: LearningPathsService) {}

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Get()
  findAll() {
    return this.learningPathsService.findAll();
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Post()
  create(
    @Body() createLearningPathDto: CreateLearningPathDto,
    @CurrentUser() user: { id: string },
  ) {
    return this.learningPathsService.create(createLearningPathDto, user.id);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLearningPathDto: UpdateLearningPathDto) {
    return this.learningPathsService.update(id, updateLearningPathDto);
  }
}

