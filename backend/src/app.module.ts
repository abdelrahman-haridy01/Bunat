import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { DepartmentsModule } from './departments/departments.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { GamificationModule } from './gamification/gamification.module';
import { KpisModule } from './kpis/kpis.module';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { LessonsModule } from './lessons/lessons.module';
import { PerformanceRecordsModule } from './performance-records/performance-records.module';
import { ReportsModule } from './reports/reports.module';
import { SeedModule } from './seed/seed.module';
import { SkillsModule } from './skills/skills.module';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../.env', '.env'],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/bunat'),
      }),
    }),
    AuthModule,
    UsersModule,
    DepartmentsModule,
    TeamsModule,
    SkillsModule,
    KpisModule,
    CoursesModule,
    LessonsModule,
    LearningPathsModule,
    EnrollmentsModule,
    PerformanceRecordsModule,
    GamificationModule,
    ReportsModule,
    SeedModule,
  ],
})
export class AppModule {}

