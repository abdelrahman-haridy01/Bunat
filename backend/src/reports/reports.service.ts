import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EnrollmentStatus, UserRole } from 'src/common/enums/domain.enums';
import { Enrollment, EnrollmentDocument } from 'src/enrollments/schemas/enrollment.schema';
import { PerformanceRecord, PerformanceRecordDocument } from 'src/performance-records/schemas/performance-record.schema';
import { Team, TeamDocument } from 'src/teams/schemas/team.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(PerformanceRecord.name)
    private readonly performanceRecordModel: Model<PerformanceRecordDocument>,
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
    private readonly usersService: UsersService,
  ) {}

  async getEmployeeReport(userId: string) {
    const [user, enrollments, performanceRecords] = await Promise.all([
      this.userModel.findById(userId).populate('levelId').exec(),
      this.enrollmentModel.find({ userId }).populate('courseId').exec(),
      this.performanceRecordModel.find({ userId }).populate('kpiId').exec(),
    ]);

    return {
      user: user ? this.usersService.toSafeUser(user) : null,
      enrollments,
      performanceRecords,
      kpiImprovementSummary: performanceRecords.map((record) => ({
        kpiId: record.kpiId,
        improvementPercentage: record.improvementPercentage,
      })),
    };
  }

  async getTeamReport(teamId: string) {
    const team = await this.teamModel.findById(teamId).populate('members managerId').exec();
    const memberIds =
      team?.members.map((member: any) => String(member?._id ?? member?.id ?? member)) ?? [];
    const [enrollments, performanceRecords] = await Promise.all([
      this.enrollmentModel.find({ userId: { $in: memberIds } }).populate('userId courseId').exec(),
      this.performanceRecordModel.find({ userId: { $in: memberIds } }).populate('userId kpiId').exec(),
    ]);

    return {
      team,
      enrollments,
      performanceRecords,
    };
  }

  async getManagerDashboard(managerId: string) {
    const teamMembers = await this.userModel.find({ managerId, role: UserRole.Employee }).exec();
    const memberIds = teamMembers.map((member) => member.id);
    const [enrollments, performanceRecords] = await Promise.all([
      this.enrollmentModel.find({ userId: { $in: memberIds } }).populate('courseId').exec(),
      this.performanceRecordModel.find({ userId: { $in: memberIds } }).populate('kpiId').exec(),
    ]);

    const completionByEmployee = teamMembers.map((member) => {
      const memberEnrollments = enrollments.filter((enrollment) => enrollment.userId.toString() === member.id);
      const completedCount = memberEnrollments.filter(
        (enrollment) => enrollment.status === EnrollmentStatus.Completed,
      ).length;
      const totalCount = memberEnrollments.length;
      const latestPerformance = performanceRecords
        .filter((record) => record.userId.toString() === member.id)
        .sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime())[0];

      return {
        employee: this.usersService.toSafeUser(member),
        completionRate: totalCount ? Math.round((completedCount / totalCount) * 100) : 0,
        latestImprovement: latestPerformance?.improvementPercentage ?? 0,
      };
    });

    return {
      teamMembers: completionByEmployee,
      topPerformers: [...completionByEmployee]
        .sort((a, b) => Number(b.employee.pointsTotal) - Number(a.employee.pointsTotal))
        .slice(0, 5),
      needsSupport: completionByEmployee.filter((entry) => entry.completionRate < 50),
    };
  }

  async getAdminDashboard() {
    const [users, enrollments, performanceRecords, teams] = await Promise.all([
      this.userModel.find().exec(),
      this.enrollmentModel.find().exec(),
      this.performanceRecordModel.find().exec(),
      this.teamModel.find().exec(),
    ]);

    return {
      totals: {
        users: users.length,
        employees: users.filter((user) => user.role === UserRole.Employee).length,
        managers: users.filter((user) => user.role === UserRole.Manager).length,
        teams: teams.length,
        enrollments: enrollments.length,
        completedEnrollments: enrollments.filter(
          (enrollment) => enrollment.status === EnrollmentStatus.Completed,
        ).length,
        performanceRecords: performanceRecords.length,
      },
      completionRate: enrollments.length
        ? Math.round(
            (enrollments.filter((enrollment) => enrollment.status === EnrollmentStatus.Completed).length /
              enrollments.length) *
              100,
          )
        : 0,
    };
  }
}
