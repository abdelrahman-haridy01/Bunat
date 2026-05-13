import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EnrollmentsModule } from 'src/enrollments/enrollments.module';
import { GamificationModule } from 'src/gamification/gamification.module';
import { LessonsModule } from 'src/lessons/lessons.module';
import { UsersModule } from 'src/users/users.module';
import { CourseCertificate, CourseCertificateSchema } from './schemas/course-certificate.schema';
import { Course, CourseSchema } from './schemas/course.schema';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: CourseCertificate.name, schema: CourseCertificateSchema },
    ]),
    UsersModule,
    EnrollmentsModule,
    GamificationModule,
    LessonsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, MongooseModule],
})
export class CoursesModule {}
