import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/domain.enums';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateAiSettingsDto } from './dto/update-ai-settings.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Get('me/ai-settings')
  getAiSettings(@CurrentUser() user: { id: string }) {
    return this.usersService.getAiSettings(user.id);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Patch('me/ai-settings')
  updateAiSettings(@CurrentUser() user: { id: string }, @Body() updateAiSettingsDto: UpdateAiSettingsDto) {
    return this.usersService.updateAiSettings(user.id, updateAiSettingsDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.CourseManager)
  @Delete('me/ai-settings/api-key')
  deleteAiSettingsApiKey(@CurrentUser() user: { id: string }) {
    return this.usersService.deleteAiSettingsApiKey(user.id);
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(UserRole.Admin, UserRole.Hr, UserRole.Manager)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findProfile(id);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(UserRole.Admin, UserRole.Hr)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
