import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Enrollment, EnrollmentSchema } from 'src/enrollments/schemas/enrollment.schema';
import { PerformanceRecord, PerformanceRecordSchema } from 'src/performance-records/schemas/performance-record.schema';
import { Team, TeamSchema } from 'src/teams/schemas/team.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
      { name: PerformanceRecord.name, schema: PerformanceRecordSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}

