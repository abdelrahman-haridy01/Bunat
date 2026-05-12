import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { EnrollmentStatus, LessonContentType, UserRole } from 'src/common/enums/domain.enums';
import { toObjectId } from 'src/common/utils/object-id.util';
import { Enrollment, EnrollmentDocument } from 'src/enrollments/schemas/enrollment.schema';
import { LessonProgress, LessonProgressDocument } from 'src/lessons/schemas/lesson-progress.schema';
import { PerformanceRecord, PerformanceRecordDocument } from 'src/performance-records/schemas/performance-record.schema';
import { Team, TeamDocument } from 'src/teams/schemas/team.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgressDocument>,
    @InjectModel(PerformanceRecord.name)
    private readonly performanceRecordModel: Model<PerformanceRecordDocument>,
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
    private readonly usersService: UsersService,
  ) {}

  async getEmployeeReport(userId: string) {
    const normalizedUserId = toObjectId(userId);
    const [user, enrollments, performanceRecords, lessonProgress] = await Promise.all([
      this.userModel.findById(userId).populate('levelId').exec(),
      this.enrollmentModel.find({ userId: normalizedUserId }).populate('courseId').exec(),
      this.performanceRecordModel.find({ userId: normalizedUserId }).populate('kpiId').exec(),
      this.lessonProgressModel
        .find({ userId: normalizedUserId })
        .populate('courseId lessonId')
        .sort({ lastAttemptAt: -1, updatedAt: -1 })
        .exec(),
    ]);

    return {
      user: user ? this.usersService.toSafeUser(user) : null,
      enrollments,
      performanceRecords,
      quizResults: lessonProgress
        .filter((progress: any) => progress.lessonId?.contentType === LessonContentType.Quiz)
        .map((progress: any) => ({
          courseId: progress.courseId,
          lessonId: progress.lessonId,
          scorePercentage: progress.bestQuizScorePercentage ?? progress.lastQuizScorePercentage ?? 0,
          passed: !!progress.quizPassed,
          attemptCount: progress.attemptCount ?? 0,
          correctAnswersCount: progress.bestCorrectAnswersCount ?? 0,
          questionCount: progress.questionCount ?? 0,
          lastAttemptAt: progress.lastAttemptAt,
          completedAt: progress.completedAt,
        })),
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
      this.enrollmentModel
        .find({ userId: { $in: memberIds.map((id) => toObjectId(id)) } })
        .populate('userId courseId')
        .exec(),
      this.performanceRecordModel
        .find({ userId: { $in: memberIds.map((id) => toObjectId(id)) } })
        .populate('userId kpiId')
        .exec(),
    ]);

    return {
      team,
      enrollments,
      performanceRecords,
    };
  }

  async getManagerDashboard(managerId: string) {
    const normalizedManagerId = this.extractId(managerId);
    const allUsers = await this.usersService.findAll();
    const usersById = new Map(
      allUsers
        .map((user) => [this.extractId(user), user] as const)
        .filter(([id]) => !!id),
    );
    const directReportIds = allUsers
      .filter((user) => user.role === UserRole.Employee && this.extractId(user.managerId) === normalizedManagerId)
      .map((user) => this.extractId(user));
    const managedTeams = await this.teamModel.find({ managerId: normalizedManagerId }).select('members').exec();
    const teamMemberIds = managedTeams.flatMap((team: any) =>
      (team.members ?? []).map((member: unknown) => this.extractId(member)),
    );
    const memberIds = [...new Set([...teamMemberIds, ...directReportIds])].filter((id) => {
      const user = usersById.get(id);
      return !!id && user?.role === UserRole.Employee;
    });
    const teamMembers = memberIds
      .map((id) => usersById.get(id))
      .filter((member): member is NonNullable<typeof member> => !!member);
    const [enrollments, performanceRecords] = await Promise.all([
      this.enrollmentModel
        .find({ userId: { $in: memberIds.map((id) => toObjectId(id)) } })
        .populate('courseId')
        .exec(),
      this.performanceRecordModel
        .find({ userId: { $in: memberIds.map((id) => toObjectId(id)) } })
        .populate('kpiId')
        .exec(),
    ]);

    const completionByEmployee = teamMembers.map((member) => {
      const memberId = this.extractId(member);
      const memberEnrollments = enrollments.filter((enrollment) => enrollment.userId.toString() === memberId);
      const completedCount = memberEnrollments.filter(
        (enrollment) => enrollment.status === EnrollmentStatus.Completed,
      ).length;
      const totalCount = memberEnrollments.length;
      const averageProgress = totalCount
        ? Math.round(
            memberEnrollments.reduce((sum, enrollment) => sum + (enrollment.progressPercentage ?? 0), 0) / totalCount,
          )
        : 0;
      const latestPerformance = performanceRecords
        .filter((record) => record.userId.toString() === memberId)
        .sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime())[0];

      return {
        employee: member,
        assignedCourses: totalCount,
        completionRate: totalCount ? Math.round((completedCount / totalCount) * 100) : 0,
        averageProgress,
        latestImprovement: latestPerformance?.improvementPercentage ?? 0,
      };
    });

    return {
      teamMembers: completionByEmployee,
      topPerformers: [...completionByEmployee]
        .sort((a, b) => {
          if (b.completionRate !== a.completionRate) {
            return b.completionRate - a.completionRate;
          }

          if (b.averageProgress !== a.averageProgress) {
            return b.averageProgress - a.averageProgress;
          }

          return Number(b.employee.pointsTotal) - Number(a.employee.pointsTotal);
        })
        .slice(0, Math.min(3, completionByEmployee.length)),
      needsSupport: completionByEmployee.filter((entry) => entry.assignedCourses > 0 && entry.averageProgress < 50),
    };
  }

  async getAdminDashboard() {
    const [users, enrollments, performanceRecords, teams] = await Promise.all([
      this.userModel.find().exec(),
      this.enrollmentModel.find().exec(),
      this.performanceRecordModel.find().exec(),
      this.teamModel.find().exec(),
    ]);

    const employees = users.filter((user) => user.role === UserRole.Employee);
    const managers = users.filter((user) => user.role === UserRole.Manager);
    const admins = users.filter((user) => user.role === UserRole.Admin);
    const hrUsers = users.filter((user) => user.role === UserRole.Hr);
    const completedEnrollments = enrollments.filter((enrollment) => enrollment.status === EnrollmentStatus.Completed);
    const employeesWithManager = employees.filter((user: any) => user.managerId).length;
    const totalTeamMembers = teams.reduce((sum, team: any) => sum + (team.members?.length ?? 0), 0);
    const improvedCount = performanceRecords.filter((record) => record.improvementPercentage > 0).length;
    const declinedCount = performanceRecords.filter((record) => record.improvementPercentage < 0).length;
    const stagnantCount = performanceRecords.length - improvedCount - declinedCount;

    return {
      totals: {
        users: users.length,
        employees: employees.length,
        managers: managers.length,
        teams: teams.length,
        enrollments: enrollments.length,
        completedEnrollments: completedEnrollments.length,
        performanceRecords: performanceRecords.length,
      },
      completionRate: enrollments.length
        ? Math.round((completedEnrollments.length / enrollments.length) * 100)
        : 0,
      roleDistribution: [
        { role: UserRole.Employee, count: employees.length },
        { role: UserRole.Manager, count: managers.length },
        { role: UserRole.Admin, count: admins.length },
        { role: UserRole.Hr, count: hrUsers.length },
      ].filter((entry) => entry.count > 0),
      enrollmentStatusDistribution: [
        {
          status: EnrollmentStatus.NotStarted,
          count: enrollments.filter((enrollment) => enrollment.status === EnrollmentStatus.NotStarted).length,
        },
        {
          status: EnrollmentStatus.InProgress,
          count: enrollments.filter((enrollment) => enrollment.status === EnrollmentStatus.InProgress).length,
        },
        {
          status: EnrollmentStatus.Completed,
          count: completedEnrollments.length,
        },
        {
          status: EnrollmentStatus.Failed,
          count: enrollments.filter((enrollment) => enrollment.status === EnrollmentStatus.Failed).length,
        },
      ].filter((entry) => entry.count > 0),
      performanceSummary: {
        improvedCount,
        stagnantCount,
        declinedCount,
        averageImprovement: performanceRecords.length
          ? Math.round(
              performanceRecords.reduce((sum, record) => sum + record.improvementPercentage, 0) /
                performanceRecords.length,
            )
          : 0,
      },
      managerCoverageRate: employees.length ? Math.round((employeesWithManager / employees.length) * 100) : 0,
      averageEmployeesPerManager: managers.length ? Number((employees.length / managers.length).toFixed(1)) : 0,
      averageMembersPerTeam: teams.length ? Number((totalTeamMembers / teams.length).toFixed(1)) : 0,
    };
  }

  private extractId(value: unknown) {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object') {
      const record = value as Record<string, unknown>;
      return String(record._id ?? record.id ?? '');
    }

    return String(value);
  }
}
