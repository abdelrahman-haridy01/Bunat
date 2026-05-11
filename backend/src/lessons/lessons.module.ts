import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { GamificationModule } from 'src/gamification/gamification.module';
import { LessonProgress, LessonProgressSchema } from './schemas/lesson-progress.schema';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  imports: [
    EnrollmentsModule,
    GamificationModule,
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
    ]),
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService, MongooseModule],
})
export class LessonsModule {}

