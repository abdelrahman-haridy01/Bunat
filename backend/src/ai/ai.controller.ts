import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AiService } from './ai.service';
import { CreateCourseDraftDto } from './dto/create-course-draft.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Post('course-drafts')
  createCourseDraft(
    @CurrentUser() user: { id: string },
    @Body() createCourseDraftDto: CreateCourseDraftDto,
  ) {
    return this.aiService.generateCourseDraft(user.id, createCourseDraftDto);
  }
}
