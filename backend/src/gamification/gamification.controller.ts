import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AwardPointsDto } from './dto/award-points.dto';
import { GamificationService } from './gamification.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('me')
  me(@CurrentUser() user: { id: string }) {
    return this.gamificationService.getMySummary(user.id);
  }

  @Roles(UserRole.Employee, UserRole.Manager, UserRole.Admin, UserRole.Hr)
  @Get('leaderboard')
  leaderboard() {
    return this.gamificationService.getLeaderboard();
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Post('award-points')
  awardPoints(@Body() awardPointsDto: AwardPointsDto) {
    return this.gamificationService.awardPoints(awardPointsDto);
  }
}

