import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Course, CourseSchema } from 'src/courses/schemas/course.schema';
import { Department, DepartmentSchema } from 'src/departments/schemas/department.schema';
import { Enrollment, EnrollmentSchema } from 'src/enrollments/schemas/enrollment.schema';
import { Badge, BadgeSchema } from 'src/gamification/schemas/badge.schema';
import { Level, LevelSchema } from 'src/gamification/schemas/level.schema';
import { PointsTransaction, PointsTransactionSchema } from 'src/gamification/schemas/points-transaction.schema';
import { UserBadge, UserBadgeSchema } from 'src/gamification/schemas/user-badge.schema';
import { Kpi, KpiSchema } from 'src/kpis/schemas/kpi.schema';
import { LearningPath, LearningPathSchema } from 'src/learning-paths/schemas/learning-path.schema';
import { LessonProgress, LessonProgressSchema } from 'src/lessons/schemas/lesson-progress.schema';
import { Lesson, LessonSchema } from 'src/lessons/schemas/lesson.schema';
import { PerformanceRecord, PerformanceRecordSchema } from 'src/performance-records/schemas/performance-record.schema';
import { Skill, SkillSchema } from 'src/skills/schemas/skill.schema';
import { Team, TeamSchema } from 'src/teams/schemas/team.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { SeedService } from './seed.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Department.name, schema: DepartmentSchema },
      { name: Team.name, schema: TeamSchema },
      { name: Skill.name, schema: SkillSchema },
      { name: Kpi.name, schema: KpiSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
      { name: LearningPath.name, schema: LearningPathSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: PerformanceRecord.name, schema: PerformanceRecordSchema },
      { name: PointsTransaction.name, schema: PointsTransactionSchema },
      { name: Level.name, schema: LevelSchema },
      { name: Badge.name, schema: BadgeSchema },
      { name: UserBadge.name, schema: UserBadgeSchema },
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

