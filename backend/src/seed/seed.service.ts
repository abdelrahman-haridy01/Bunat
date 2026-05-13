import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  BadgeCriteriaType,
  CourseStatus,
  DifficultyLevel,
  EnrollmentStatus,
  KpiDirection,
  KpiMetricType,
  LearningPathStatus,
  LessonContentType,
  LessonProgressStatus,
  PointsSourceType,
  UserRole,
  UserStatus,
} from 'src/common/enums/domain.enums';
import { hashPassword } from 'src/common/utils/password.util';
import { Course, CourseDocument } from 'src/courses/schemas/course.schema';
import { Department, DepartmentDocument } from 'src/departments/schemas/department.schema';
import { Enrollment, EnrollmentDocument } from 'src/enrollments/schemas/enrollment.schema';
import { Badge, BadgeDocument } from 'src/gamification/schemas/badge.schema';
import { Level, LevelDocument } from 'src/gamification/schemas/level.schema';
import { PointsTransaction, PointsTransactionDocument } from 'src/gamification/schemas/points-transaction.schema';
import { UserBadge, UserBadgeDocument } from 'src/gamification/schemas/user-badge.schema';
import { Kpi, KpiDocument } from 'src/kpis/schemas/kpi.schema';
import { LearningPath, LearningPathDocument } from 'src/learning-paths/schemas/learning-path.schema';
import { LessonProgress, LessonProgressDocument } from 'src/lessons/schemas/lesson-progress.schema';
import { Lesson } from 'src/lessons/schemas/lesson.schema';
import { PerformanceRecord, PerformanceRecordDocument } from 'src/performance-records/schemas/performance-record.schema';
import { Skill, SkillDocument } from 'src/skills/schemas/skill.schema';
import { Team, TeamDocument } from 'src/teams/schemas/team.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';

type SeedLessonRef = {
  _id: Types.ObjectId;
  courseId: Types.ObjectId;
  durationMinutes: number;
  contentType: LessonContentType;
  quiz?: {
    questions?: Array<{
      id: string;
      correctOptionId: string;
    }>;
  } | null;
};

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);
  private readonly excellenceCourseTitle = 'خارطة التميز الوظيفي';

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Department.name) private readonly departmentModel: Model<DepartmentDocument>,
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
    @InjectModel(Skill.name) private readonly skillModel: Model<SkillDocument>,
    @InjectModel(Kpi.name) private readonly kpiModel: Model<KpiDocument>,
    @InjectModel(Course.name) private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgressDocument>,
    @InjectModel(LearningPath.name)
    private readonly learningPathModel: Model<LearningPathDocument>,
    @InjectModel(Enrollment.name) private readonly enrollmentModel: Model<EnrollmentDocument>,
    @InjectModel(PerformanceRecord.name)
    private readonly performanceRecordModel: Model<PerformanceRecordDocument>,
    @InjectModel(PointsTransaction.name)
    private readonly pointsTransactionModel: Model<PointsTransactionDocument>,
    @InjectModel(Level.name) private readonly levelModel: Model<LevelDocument>,
    @InjectModel(Badge.name) private readonly badgeModel: Model<BadgeDocument>,
    @InjectModel(UserBadge.name) private readonly userBadgeModel: Model<UserBadgeDocument>,
  ) {}

  async run() {
    await this.resetCollections();

    const passwordHash = await hashPassword('Password123!');

    const levels = await this.levelModel.insertMany([
      { name: 'مبتدئ', minPoints: 0, maxPoints: 199, icon: 'seedling', order: 1 },
      { name: 'متقدم', minPoints: 200, maxPoints: 499, icon: 'trophy', order: 2 },
      { name: 'قائد تعلم', minPoints: 500, maxPoints: 999999, icon: 'medal', order: 3 },
    ]);

    const badges = await this.badgeModel.insertMany([
      { name: 'أول خطوة', description: 'الوصول إلى 50 نقطة', icon: 'star', criteriaType: BadgeCriteriaType.Points, criteriaValue: 50, pointsReward: 0 },
      { name: 'متعلم نشط', description: 'الوصول إلى 150 نقطة', icon: 'bolt', criteriaType: BadgeCriteriaType.Points, criteriaValue: 150, pointsReward: 0 },
      { name: 'منجز', description: 'الوصول إلى 300 نقطة', icon: 'award', criteriaType: BadgeCriteriaType.Points, criteriaValue: 300, pointsReward: 0 },
      { name: 'أثر ملموس', description: 'تحقيق تحسن قوي في مؤشر الأداء', icon: 'target', criteriaType: BadgeCriteriaType.Kpi, criteriaValue: 1, pointsReward: 0 },
      { name: 'استمرارية', description: 'استكمال أكثر من دورة', icon: 'flame', criteriaType: BadgeCriteriaType.Course, criteriaValue: 2, pointsReward: 0 },
    ]);

    const departments = await this.departmentModel.insertMany([
      { name: 'العمليات', description: 'إدارة العمليات التشغيلية' },
      { name: 'المبيعات', description: 'إدارة النمو والعلاقات التجارية' },
    ]);

    const adminLevel = levels[2]._id;
    const managerLevel = levels[1]._id;
    const employeeLevel = levels[0]._id;

    const users = await this.userModel.insertMany([
      {
        fullName: 'عبدالرحمن هريدي',
        email: 'admin@bunat.local',
        passwordHash,
        jobTitle: 'مدير النظام',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Admin,
        status: UserStatus.Active,
        pointsTotal: 620,
        levelId: adminLevel,
      },
      {
        fullName: 'نورة القحطاني',
        email: 'hr@bunat.local',
        passwordHash,
        jobTitle: 'أخصائي موارد بشرية',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Hr,
        status: UserStatus.Active,
        pointsTotal: 280,
        levelId: managerLevel,
      },
      {
        fullName: 'خالد الشهري',
        email: 'manager@bunat.local',
        passwordHash,
        jobTitle: 'مدير فريق',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Manager,
        status: UserStatus.Active,
        pointsTotal: 360,
        levelId: managerLevel,
      },
      {
        fullName: 'سارة الماجد',
        email: 'content@bunat.local',
        passwordHash,
        jobTitle: 'مدير محتوى تدريبي',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.CourseManager,
        status: UserStatus.Active,
        pointsTotal: 190,
        levelId: employeeLevel,
      },
      {
        fullName: 'ريم الحربي',
        email: 'employee1@bunat.local',
        passwordHash,
        jobTitle: 'أخصائي عمليات',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Employee,
        status: UserStatus.Active,
        pointsTotal: 160,
        levelId: employeeLevel,
      },
      {
        fullName: 'مشاعل المطيري',
        email: 'employee2@bunat.local',
        passwordHash,
        jobTitle: 'منسق عمليات',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Employee,
        status: UserStatus.Active,
        pointsTotal: 240,
        levelId: managerLevel,
      },
      {
        fullName: 'محمد السهلي',
        email: 'employee3@bunat.local',
        passwordHash,
        jobTitle: 'مندوب مبيعات',
        departmentId: departments[1]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Employee,
        status: UserStatus.Active,
        pointsTotal: 80,
        levelId: employeeLevel,
      },
      {
        fullName: 'لولوة الدوسري',
        email: 'employee4@bunat.local',
        passwordHash,
        jobTitle: 'أخصائي مبيعات',
        departmentId: departments[1]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Employee,
        status: UserStatus.Active,
        pointsTotal: 120,
        levelId: employeeLevel,
      },
      {
        fullName: 'فهد القحطاني',
        email: 'employee5@bunat.local',
        passwordHash,
        jobTitle: 'محلل تقارير',
        departmentId: departments[0]._id,
        teamId: null,
        managerId: null,
        role: UserRole.Employee,
        status: UserStatus.Active,
        pointsTotal: 210,
        levelId: managerLevel,
      },
    ]);

    const admin = users[0];
    const manager = users[2];
    const employees = users.slice(3);

    const teams = await this.teamModel.insertMany([
      {
        name: 'فريق تحسين العمليات',
        departmentId: departments[0]._id,
        managerId: manager._id,
        members: [employees[0]._id, employees[1]._id, employees[4]._id],
      },
      {
        name: 'فريق المبيعات الميدانية',
        departmentId: departments[1]._id,
        managerId: manager._id,
        members: [employees[2]._id, employees[3]._id],
      },
    ]);

    await this.departmentModel.findByIdAndUpdate(departments[0]._id, { managerId: manager._id }).exec();
    await this.departmentModel.findByIdAndUpdate(departments[1]._id, { managerId: manager._id }).exec();

    await Promise.all([
      this.userModel.findByIdAndUpdate(manager._id, { teamId: teams[0]._id }).exec(),
      ...employees.map((employee, index) =>
        this.userModel
          .findByIdAndUpdate(employee._id, {
            teamId: index < 2 || index === 4 ? teams[0]._id : teams[1]._id,
            managerId: manager._id,
          })
          .exec(),
      ),
    ]);

    const skills = await this.skillModel.insertMany([
      { name: 'تحليل الأداء', category: 'تشغيلي', description: 'قراءة مؤشرات الأداء وتحسينها', level: DifficultyLevel.Intermediate },
      { name: 'خدمة العملاء', category: 'سلوكي', description: 'رفع جودة التعامل مع المستفيدين', level: DifficultyLevel.Beginner },
      { name: 'البيع الاستشاري', category: 'مبيعات', description: 'بناء فرص بيع على أساس الاحتياج', level: DifficultyLevel.Advanced },
      { name: 'إدارة الوقت', category: 'إنتاجية', description: 'تنظيم الأولويات والالتزام بالمواعيد', level: DifficultyLevel.Beginner },
      { name: 'التقارير التنفيذية', category: 'تحليلي', description: 'عرض النتائج بطريقة واضحة للإدارة', level: DifficultyLevel.Intermediate },
    ]);

    const kpis = await this.kpiModel.insertMany([
      { name: 'زمن إنجاز الطلب', description: 'خفض مدة الإنجاز', metricType: KpiMetricType.Number, direction: KpiDirection.Decrease, targetValue: 8, unit: 'ساعات', departmentId: departments[0]._id, roleTarget: UserRole.Employee },
      { name: 'رضا المستفيد', description: 'رفع نسبة الرضا', metricType: KpiMetricType.Percentage, direction: KpiDirection.Increase, targetValue: 90, unit: '%', departmentId: departments[0]._id, roleTarget: UserRole.Employee },
      { name: 'معدل الإغلاق', description: 'زيادة تحويل الفرص', metricType: KpiMetricType.Percentage, direction: KpiDirection.Increase, targetValue: 35, unit: '%', departmentId: departments[1]._id, roleTarget: UserRole.Employee },
      { name: 'جودة التقارير', description: 'رفع تقييم دقة التقارير', metricType: KpiMetricType.Score, direction: KpiDirection.Increase, targetValue: 85, unit: 'نقطة', departmentId: departments[0]._id, roleTarget: UserRole.Employee },
      { name: 'الالتزام بالمواعيد', description: 'تقليل التأخر', metricType: KpiMetricType.Percentage, direction: KpiDirection.Increase, targetValue: 95, unit: '%', departmentId: null, roleTarget: UserRole.Employee },
    ]);

    const courses = await this.courseModel.insertMany([
      { title: 'أساسيات إدارة الأداء', description: 'فهم لوحات المؤشرات وربط الجهد بالنتائج', skillIds: [skills[0]._id, skills[4]._id], kpiIds: [kpis[0]._id, kpis[3]._id], difficulty: DifficultyLevel.Beginner, estimatedDurationMinutes: 90, status: CourseStatus.Published, createdBy: admin._id },
      { title: 'تحسين خدمة المستفيد', description: 'أفضل الممارسات لرفع الرضا', skillIds: [skills[1]._id], kpiIds: [kpis[1]._id], difficulty: DifficultyLevel.Beginner, estimatedDurationMinutes: 75, status: CourseStatus.Published, createdBy: admin._id },
      { title: 'البيع الاستشاري المتقدم', description: 'منهج عملي لرفع معدل الإغلاق', skillIds: [skills[2]._id], kpiIds: [kpis[2]._id], difficulty: DifficultyLevel.Advanced, estimatedDurationMinutes: 120, status: CourseStatus.Published, createdBy: admin._id },
      { title: 'إدارة الوقت للفرق التشغيلية', description: 'أدوات تنظيم اليوم وتحسين الالتزام', skillIds: [skills[3]._id], kpiIds: [kpis[4]._id], difficulty: DifficultyLevel.Beginner, estimatedDurationMinutes: 60, status: CourseStatus.Published, createdBy: admin._id },
      { title: 'كتابة التقارير التنفيذية', description: 'تنظيم التقارير الدورية ورفع جودتها', skillIds: [skills[4]._id], kpiIds: [kpis[3]._id], difficulty: DifficultyLevel.Intermediate, estimatedDurationMinutes: 95, status: CourseStatus.Published, createdBy: admin._id },
      { title: this.excellenceCourseTitle, description: 'مسار تأسيسي متكامل لفهم التميز الوظيفي وبناء خطة تطوير عملية مرتبطة بالأداء والانضباط المهني.', skillIds: [skills[0]._id, skills[3]._id, skills[4]._id], kpiIds: [kpis[0]._id, kpis[4]._id, kpis[3]._id], difficulty: DifficultyLevel.Intermediate, estimatedDurationMinutes: 155, status: CourseStatus.Published, createdBy: admin._id },
    ]);

    const lessons: Array<Record<string, unknown>> = [];
    courses.forEach((course, courseIndex) => {
      if (course.title === this.excellenceCourseTitle) {
        lessons.push(...this.createExcellenceCourseLessons(course._id));
        return;
      }

      lessons.push(
        {
          courseId: course._id,
          title: `${course.title} - مقدمة`,
          contentType: LessonContentType.Video,
          contentUrl: 'https://example.com/video',
          contentHtml: null,
          order: 1,
          durationMinutes: 15,
          isRequired: true,
        },
        {
          courseId: course._id,
          title: `${course.title} - محتوى تطبيقي`,
          contentType: LessonContentType.Article,
          contentUrl: null,
          contentHtml: `<p>وحدة تطبيقية للدورة رقم ${courseIndex + 1}</p>`,
          order: 2,
          durationMinutes: 20,
          isRequired: true,
        },
        {
          courseId: course._id,
          title: `${course.title} - اختبار قصير`,
          contentType: LessonContentType.Quiz,
          contentUrl: null,
          contentHtml: '<p>أجب عن الأسئلة التالية للتحقق من استيعاب المفاهيم الأساسية في هذه الدورة.</p>',
          quiz: {
            passingScorePercentage: 70,
            questions: [
              {
                id: `${courseIndex + 1}-q1`,
                prompt: 'ما الهدف الرئيسي من هذه الوحدة التدريبية؟',
                options: [
                  { id: `${courseIndex + 1}-q1-a`, text: 'زيادة المعرفة بالمفاهيم الأساسية وتطبيقها عملياً' },
                  { id: `${courseIndex + 1}-q1-b`, text: 'مراجعة سياسات الموارد البشرية فقط' },
                  { id: `${courseIndex + 1}-q1-c`, text: 'إلغاء الحاجة إلى مؤشرات الأداء' },
                ],
                correctOptionId: `${courseIndex + 1}-q1-a`,
              },
              {
                id: `${courseIndex + 1}-q2`,
                prompt: 'أي سلوك يعكس الاستفادة الصحيحة من المحتوى؟',
                options: [
                  { id: `${courseIndex + 1}-q2-a`, text: 'تطبيق ما تم تعلمه وقياس أثره على العمل' },
                  { id: `${courseIndex + 1}-q2-b`, text: 'الاكتفاء بقراءة المحتوى دون تنفيذ' },
                  { id: `${courseIndex + 1}-q2-c`, text: 'تجاهل التغذية الراجعة من المدير' },
                ],
                correctOptionId: `${courseIndex + 1}-q2-a`,
              },
            ],
          },
          order: 3,
          durationMinutes: 10,
          isRequired: false,
        },
      );
    });
    const insertedLessons = (await this.lessonModel.insertMany(lessons)) as unknown as SeedLessonRef[];

    await this.learningPathModel.insertMany([
      {
        title: 'مسار موظف العمليات',
        description: 'مسار تأسيسي لتحسين الأداء التشغيلي',
        targetRole: UserRole.Employee,
        departmentId: departments[0]._id,
        courseIds: [courses[0]._id, courses[3]._id, courses[5]._id],
        skillIds: [skills[0]._id, skills[3]._id],
        kpiIds: [kpis[0]._id, kpis[4]._id],
        status: LearningPathStatus.Active,
        createdBy: admin._id,
      },
      {
        title: 'مسار موظف المبيعات',
        description: 'مسار يركز على الإغلاق والرضا',
        targetRole: UserRole.Employee,
        departmentId: departments[1]._id,
        courseIds: [courses[1]._id, courses[2]._id],
        skillIds: [skills[1]._id, skills[2]._id],
        kpiIds: [kpis[1]._id, kpis[2]._id],
        status: LearningPathStatus.Active,
        createdBy: admin._id,
      },
    ]);

    const enrollments = await this.enrollmentModel.insertMany([
      { userId: employees[0]._id, courseId: courses[0]._id, learningPathId: null, assignedBy: manager._id, status: EnrollmentStatus.InProgress, progressPercentage: 67, startedAt: new Date(), completedAt: null, dueDate: this.futureDate(14) },
      { userId: employees[0]._id, courseId: courses[3]._id, learningPathId: null, assignedBy: manager._id, status: EnrollmentStatus.NotStarted, progressPercentage: 0, startedAt: null, completedAt: null, dueDate: this.futureDate(21) },
      { userId: employees[1]._id, courseId: courses[5]._id, learningPathId: null, assignedBy: manager._id, status: EnrollmentStatus.Completed, progressPercentage: 100, startedAt: this.pastDate(15), completedAt: this.pastDate(7), dueDate: this.futureDate(5) },
      { userId: employees[2]._id, courseId: courses[2]._id, learningPathId: null, assignedBy: manager._id, status: EnrollmentStatus.InProgress, progressPercentage: 33, startedAt: this.pastDate(6), completedAt: null, dueDate: this.futureDate(10) },
      { userId: employees[3]._id, courseId: courses[1]._id, learningPathId: null, assignedBy: manager._id, status: EnrollmentStatus.Completed, progressPercentage: 100, startedAt: this.pastDate(12), completedAt: this.pastDate(3), dueDate: this.futureDate(2) },
      { userId: employees[4]._id, courseId: courses[4]._id, learningPathId: null, assignedBy: manager._id, status: EnrollmentStatus.InProgress, progressPercentage: 67, startedAt: this.pastDate(4), completedAt: null, dueDate: this.futureDate(9) },
    ]);

    const courseLessonsMap = new Map<string, SeedLessonRef[]>();
    for (const lesson of insertedLessons) {
      const list = courseLessonsMap.get(lesson.courseId.toString()) ?? [];
      list.push(lesson);
      courseLessonsMap.set(lesson.courseId.toString(), list);
    }

    await this.lessonProgressModel.insertMany([
      ...this.createLessonProgresses(employees[0]._id, courses[0]._id, courseLessonsMap.get(courses[0]._id.toString()) ?? [], 2),
      ...this.createLessonProgresses(employees[1]._id, courses[5]._id, courseLessonsMap.get(courses[5]._id.toString()) ?? [], 5),
      ...this.createLessonProgresses(employees[2]._id, courses[2]._id, courseLessonsMap.get(courses[2]._id.toString()) ?? [], 1),
      ...this.createLessonProgresses(employees[3]._id, courses[1]._id, courseLessonsMap.get(courses[1]._id.toString()) ?? [], 3),
      ...this.createLessonProgresses(employees[4]._id, courses[4]._id, courseLessonsMap.get(courses[4]._id.toString()) ?? [], 2),
    ]);

    await this.performanceRecordModel.insertMany([
      { userId: employees[0]._id, kpiId: kpis[0]._id, courseId: courses[0]._id, learningPathId: null, beforeValue: 12, afterValue: 9, improvementPercentage: -25, measuredAt: this.pastDate(2), measuredBy: manager._id, notes: 'تحسن ملحوظ لكن لم يصل للهدف بعد' },
      { userId: employees[1]._id, kpiId: kpis[4]._id, courseId: courses[5]._id, learningPathId: null, beforeValue: 82, afterValue: 96, improvementPercentage: 17.07, measuredAt: this.pastDate(4), measuredBy: manager._id, notes: 'تم تحقيق الهدف المستهدف' },
      { userId: employees[2]._id, kpiId: kpis[2]._id, courseId: courses[2]._id, learningPathId: null, beforeValue: 22, afterValue: 31, improvementPercentage: 40.91, measuredAt: this.pastDate(1), measuredBy: manager._id, notes: 'في طريقه إلى الهدف' },
      { userId: employees[3]._id, kpiId: kpis[1]._id, courseId: courses[1]._id, learningPathId: null, beforeValue: 84, afterValue: 91, improvementPercentage: 8.33, measuredAt: this.pastDate(3), measuredBy: manager._id, notes: 'تم تحقيق الهدف' },
      { userId: employees[4]._id, kpiId: kpis[3]._id, courseId: courses[4]._id, learningPathId: null, beforeValue: 70, afterValue: 82, improvementPercentage: 17.14, measuredAt: this.pastDate(2), measuredBy: manager._id, notes: 'تحسن جيد' },
    ]);

    await this.pointsTransactionModel.insertMany([
      { userId: employees[0]._id, sourceType: PointsSourceType.LessonCompleted, sourceId: new Types.ObjectId().toString(), points: 20, description: 'إكمال درسين' },
      { userId: employees[0]._id, sourceType: PointsSourceType.KpiAchieved, sourceId: new Types.ObjectId().toString(), points: 140, description: 'تحسن تشغيلي ملحوظ' },
      { userId: employees[1]._id, sourceType: PointsSourceType.CourseCompleted, sourceId: new Types.ObjectId().toString(), points: 100, description: 'إكمال دورة خارطة التميز الوظيفي' },
      { userId: employees[1]._id, sourceType: PointsSourceType.KpiAchieved, sourceId: new Types.ObjectId().toString(), points: 140, description: 'تحقيق الالتزام بالمواعيد' },
      { userId: employees[2]._id, sourceType: PointsSourceType.LessonCompleted, sourceId: new Types.ObjectId().toString(), points: 80, description: 'نشاط تدريبي أولي' },
      { userId: employees[3]._id, sourceType: PointsSourceType.CourseCompleted, sourceId: new Types.ObjectId().toString(), points: 120, description: 'إكمال دورة تحسين خدمة المستفيد' },
      { userId: employees[4]._id, sourceType: PointsSourceType.LessonCompleted, sourceId: new Types.ObjectId().toString(), points: 60, description: 'إكمال محتوى تقارير تنفيذية' },
    ]);

    await this.upsertUserBadges([
      { userId: employees[0]._id, badgeId: badges[0]._id, awardedAt: this.pastDate(5), awardedBy: manager._id },
      { userId: employees[1]._id, badgeId: badges[1]._id, awardedAt: this.pastDate(3), awardedBy: manager._id },
      { userId: employees[3]._id, badgeId: badges[0]._id, awardedAt: this.pastDate(4), awardedBy: manager._id },
    ]);

    this.logger.log('Seed completed');
    this.logger.log('Admin: admin@bunat.local / Password123!');
    this.logger.log('HR: hr@bunat.local / Password123!');
    this.logger.log('Manager: manager@bunat.local / Password123!');
    this.logger.log('Employees: employee1..employee5@bunat.local / Password123!');
  }

  private async resetCollections() {
    await Promise.all([
      this.userBadgeModel.deleteMany({}).exec(),
      this.pointsTransactionModel.deleteMany({}).exec(),
      this.performanceRecordModel.deleteMany({}).exec(),
      this.lessonProgressModel.deleteMany({}).exec(),
      this.enrollmentModel.deleteMany({}).exec(),
      this.learningPathModel.deleteMany({}).exec(),
      this.lessonModel.deleteMany({}).exec(),
      this.courseModel.deleteMany({}).exec(),
      this.kpiModel.deleteMany({}).exec(),
      this.skillModel.deleteMany({}).exec(),
      this.teamModel.deleteMany({}).exec(),
      this.departmentModel.deleteMany({}).exec(),
      this.userModel.deleteMany({}).exec(),
      this.badgeModel.deleteMany({}).exec(),
      this.levelModel.deleteMany({}).exec(),
    ]);
  }

  private pastDate(daysAgo: number) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  }

  private futureDate(daysAhead: number) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date;
  }

  private createLessonProgresses(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    lessons: SeedLessonRef[],
    completedCount: number,
  ) {
    return lessons.slice(0, completedCount).map((lesson) => {
      const correctAnswers = lesson.quiz?.questions?.map((question) => ({
        questionId: question.id,
        optionId: question.correctOptionId,
      })) ?? [];
      const questionCount = correctAnswers.length;

      return {
        userId,
        courseId,
        lessonId: lesson._id,
        status: LessonProgressStatus.Completed,
        completedAt: this.pastDate(1),
        timeSpentMinutes: lesson.durationMinutes,
        attemptCount: lesson.contentType === LessonContentType.Quiz ? 1 : 0,
        lastAttemptAt: lesson.contentType === LessonContentType.Quiz ? this.pastDate(1) : null,
        lastQuizScorePercentage: lesson.contentType === LessonContentType.Quiz ? 100 : null,
        bestQuizScorePercentage: lesson.contentType === LessonContentType.Quiz ? 100 : null,
        bestCorrectAnswersCount: lesson.contentType === LessonContentType.Quiz ? questionCount : null,
        questionCount: lesson.contentType === LessonContentType.Quiz ? questionCount : null,
        quizPassed: lesson.contentType === LessonContentType.Quiz,
        submittedAnswers: lesson.contentType === LessonContentType.Quiz ? correctAnswers : [],
      };
    });
  }

  private async upsertUserBadges(
    entries: Array<{
      userId: Types.ObjectId;
      badgeId: Types.ObjectId;
      awardedAt: Date;
      awardedBy: Types.ObjectId | null;
    }>,
  ) {
    const dedupedEntries = Array.from(
      new Map(
        entries.map((entry) => [`${entry.userId.toString()}-${entry.badgeId.toString()}`, entry] as const),
      ).values(),
    );

    if (!dedupedEntries.length) {
      return;
    }

    await this.userBadgeModel.bulkWrite(
      dedupedEntries.map((entry) => ({
        updateOne: {
          filter: {
            userId: entry.userId,
            badgeId: entry.badgeId,
          },
          update: {
            $set: {
              awardedAt: entry.awardedAt,
              awardedBy: entry.awardedBy,
            },
            $setOnInsert: {
              userId: entry.userId,
              badgeId: entry.badgeId,
            },
          },
          upsert: true,
        },
      })),
    );
  }

  private createExcellenceCourseLessons(courseId: Types.ObjectId) {
    return [
      {
        courseId,
        title: 'خارطة التميز الوظيفي - لماذا نبدأ بالتميز؟',
        contentType: LessonContentType.Video,
        contentUrl: 'https://example.com/excellence-roadmap-intro',
        contentHtml: null,
        order: 1,
        durationMinutes: 18,
        isRequired: true,
      },
      {
        courseId,
        title: 'خارطة التميز الوظيفي - أبعاد التميز الوظيفي',
        contentType: LessonContentType.Article,
        contentUrl: null,
        contentHtml:
          '<h3>الأبعاد الأساسية</h3><p>يرتكز التميز الوظيفي على وضوح الدور، جودة التنفيذ، المبادرة، الانضباط، والتطوير المستمر. يفهم الموظف المتميز أثر عمله على مؤشرات الأداء وعلى تجربة المستفيد الداخلي والخارجي.</p><p>يبدأ التميز من الربط بين الواجبات اليومية والنتائج القابلة للقياس، ثم الانتقال إلى تحسين الأسلوب، ثم بناء عادة المراجعة الذاتية والتغذية الراجعة.</p>',
        order: 2,
        durationMinutes: 22,
        isRequired: true,
      },
      {
        courseId,
        title: 'خارطة التميز الوظيفي - اختبار فهم المفاهيم',
        contentType: LessonContentType.Quiz,
        contentUrl: null,
        contentHtml: '<p>أجب عن الأسئلة التالية للتحقق من فهمك لمفهوم التميز الوظيفي وأبعاده الأساسية.</p>',
        quiz: {
          passingScorePercentage: 75,
          questions: [
            {
              id: 'excellence-map-quiz-1-q1',
              prompt: 'أي عبارة تعبّر بشكل أدق عن التميز الوظيفي؟',
              options: [
                { id: 'excellence-map-quiz-1-q1-a', text: 'تنفيذ المهام اليومية بجودة ثابتة مع السعي للتحسين المستمر' },
                { id: 'excellence-map-quiz-1-q1-b', text: 'التركيز على سرعة الإنجاز حتى لو انخفضت الجودة' },
                { id: 'excellence-map-quiz-1-q1-c', text: 'الالتزام بالحد الأدنى من المتطلبات فقط' },
                { id: 'excellence-map-quiz-1-q1-d', text: 'الاعتماد الكامل على المدير لاتخاذ كل قرار' },
              ],
              correctOptionId: 'excellence-map-quiz-1-q1-a',
            },
            {
              id: 'excellence-map-quiz-1-q2',
              prompt: 'ما الخطوة الأولى لبناء خارطة تميز شخصية؟',
              options: [
                { id: 'excellence-map-quiz-1-q2-a', text: 'تحديد فجوات الأداء الحالية وربطها بدورك الوظيفي' },
                { id: 'excellence-map-quiz-1-q2-b', text: 'مقارنة نفسك بجميع الزملاء دون بيانات' },
                { id: 'excellence-map-quiz-1-q2-c', text: 'تأجيل التطوير حتى نهاية العام' },
                { id: 'excellence-map-quiz-1-q2-d', text: 'إلغاء الأولويات الحالية' },
              ],
              correctOptionId: 'excellence-map-quiz-1-q2-a',
            },
            {
              id: 'excellence-map-quiz-1-q3',
              prompt: 'أي مؤشر يدل على أن الممارسة المهنية مرتبطة بالأثر؟',
              options: [
                { id: 'excellence-map-quiz-1-q3-a', text: 'وجود تحسن ملموس في مؤشرات الأداء المرتبطة بالدور' },
                { id: 'excellence-map-quiz-1-q3-b', text: 'زيادة الاجتماعات فقط' },
                { id: 'excellence-map-quiz-1-q3-c', text: 'كتابة تقارير دون متابعة تنفيذ' },
                { id: 'excellence-map-quiz-1-q3-d', text: 'الاعتماد على الانطباعات العامة وحدها' },
              ],
              correctOptionId: 'excellence-map-quiz-1-q3-a',
            },
          ],
        },
        order: 3,
        durationMinutes: 12,
        isRequired: true,
      },
      {
        courseId,
        title: 'خارطة التميز الوظيفي - خطة التحسين الشخصية',
        contentType: LessonContentType.Task,
        contentUrl: null,
        contentHtml:
          '<h3>مهمة تطبيقية</h3><p>اكتب ثلاث أولويات تطوير مهنية للأربعين يوماً القادمة. لكل أولوية: حدّد السلوك المطلوب، المقياس الذي سيتأثر، والخطوة العملية التي ستبدأ بها هذا الأسبوع.</p><ul><li>أولوية مرتبطة بجودة التنفيذ</li><li>أولوية مرتبطة بالالتزام والانضباط</li><li>أولوية مرتبطة بالتطوير الذاتي أو التعلم</li></ul>',
        order: 4,
        durationMinutes: 28,
        isRequired: true,
      },
      {
        courseId,
        title: 'خارطة التميز الوظيفي - الاختبار الختامي',
        contentType: LessonContentType.Quiz,
        contentUrl: null,
        contentHtml: '<p>اختبار ختامي لقياس جاهزيتك لبناء خارطة تميز وظيفي قابلة للتنفيذ والقياس.</p>',
        quiz: {
          passingScorePercentage: 80,
          questions: [
            {
              id: 'excellence-map-final-q1',
              prompt: 'ما أفضل طريقة لتحويل التميز من مفهوم إلى ممارسة يومية؟',
              options: [
                { id: 'excellence-map-final-q1-a', text: 'تحديد سلوكيات واضحة وربطها بقياسات ومراجعة دورية' },
                { id: 'excellence-map-final-q1-b', text: 'الاعتماد على الحماس المؤقت فقط' },
                { id: 'excellence-map-final-q1-c', text: 'إضافة مهام كثيرة دون ترتيب أولويات' },
                { id: 'excellence-map-final-q1-d', text: 'الاكتفاء بالمعرفة النظرية' },
              ],
              correctOptionId: 'excellence-map-final-q1-a',
            },
            {
              id: 'excellence-map-final-q2',
              prompt: 'عند انخفاض الالتزام بالمواعيد، ما الإجراء الأكثر مهنية؟',
              options: [
                { id: 'excellence-map-final-q2-a', text: 'تحليل أسباب التأخر ووضع آلية متابعة أسبوعية' },
                { id: 'excellence-map-final-q2-b', text: 'تجاهل المشكلة لأنها مؤقتة' },
                { id: 'excellence-map-final-q2-c', text: 'تحميل الفريق المسؤولية بالكامل' },
                { id: 'excellence-map-final-q2-d', text: 'إلغاء أي هدف زمني' },
              ],
              correctOptionId: 'excellence-map-final-q2-a',
            },
            {
              id: 'excellence-map-final-q3',
              prompt: 'أي عنصر يجب أن يظهر في خطة التميز الشخصية؟',
              options: [
                { id: 'excellence-map-final-q3-a', text: 'هدف تطويري، سلوك تنفيذي، ومؤشر قياس واضح' },
                { id: 'excellence-map-final-q3-b', text: 'وصف عام دون مواعيد أو متابعة' },
                { id: 'excellence-map-final-q3-c', text: 'قائمة مهام غير مرتبطة بالدور' },
                { id: 'excellence-map-final-q3-d', text: 'خطة تعتمد على شخص واحد فقط لتنفيذها' },
              ],
              correctOptionId: 'excellence-map-final-q3-a',
            },
            {
              id: 'excellence-map-final-q4',
              prompt: 'ما فائدة التغذية الراجعة ضمن خارطة التميز؟',
              options: [
                { id: 'excellence-map-final-q4-a', text: 'تساعد على تصحيح المسار وتحسين جودة التنفيذ مبكراً' },
                { id: 'excellence-map-final-q4-b', text: 'تؤخر اتخاذ القرار' },
                { id: 'excellence-map-final-q4-c', text: 'تغني عن مؤشرات الأداء' },
                { id: 'excellence-map-final-q4-d', text: 'تستخدم فقط عند حدوث مشكلة كبيرة' },
              ],
              correctOptionId: 'excellence-map-final-q4-a',
            },
          ],
        },
        order: 5,
        durationMinutes: 15,
        isRequired: true,
      },
      {
        courseId,
        title: 'خارطة التميز الوظيفي - مرجع التتبع العملي',
        contentType: LessonContentType.Pdf,
        contentUrl: 'https://example.com/excellence-roadmap-guide.pdf',
        contentHtml: null,
        order: 6,
        durationMinutes: 10,
        isRequired: false,
      },
    ];
  }
}
