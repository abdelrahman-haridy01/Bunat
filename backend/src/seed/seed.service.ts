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
      options?: Array<{
        id: string;
      }>;
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

    const adminLevel = levels[2]._id;
    const managerLevel = levels[1]._id;
    const employeeLevel = levels[0]._id;

    const departmentSeeds = [
      {
        key: 'educationPrograms',
        name: 'قطاع البرامج التعليمية',
        description: 'قيادة تصميم البرامج التعليمية والمسارات وبناء الحقائب وقياس أثرها.',
      },
      {
        key: 'linguisticComputing',
        name: 'قطاع الحوسبة اللغوية',
        description: 'تطوير الحلول اللغوية العربية والنماذج والتقييمات المرتبطة بها.',
      },
      {
        key: 'culturalPrograms',
        name: 'قطاع البرامج الثقافية',
        description: 'إدارة المبادرات والبرامج الثقافية والشراكات والفعاليات.',
      },
      {
        key: 'communications',
        name: 'قسم التواصل',
        description: 'إدارة الرسائل المؤسسية والعلاقات الإعلامية والمحتوى التعريفي.',
      },
      {
        key: 'hr',
        name: 'قسم الموارد البشرية',
        description: 'الاستقطاب والتطوير الوظيفي وشؤون الموظفين.',
      },
      {
        key: 'technology',
        name: 'قسم التقنية',
        description: 'تشغيل المنصات والأنظمة والتكاملات الداخلية.',
      },
      {
        key: 'cybersecurity',
        name: 'قسم الأمن السيبراني',
        description: 'الحوكمة الأمنية والمراقبة والتوعية والاستجابة للحوادث.',
      },
      {
        key: 'accounting',
        name: 'قسم المحاسبة',
        description: 'الضبط المالي والإقفال الدوري والتقارير المحاسبية.',
      },
    ] as const;

    const departments = await this.departmentModel.insertMany(
      departmentSeeds.map(({ name, description }) => ({ name, description })),
    );
    const departmentByKey = new Map(departmentSeeds.map((department, index) => [department.key, departments[index]]));
    const getDepartment = (key: (typeof departmentSeeds)[number]['key']) => {
      const department = departmentByKey.get(key);
      if (!department) {
        throw new Error(`Department seed is missing for key: ${key}`);
      }

      return department;
    };

    const resolveLevelId = (pointsTotal: number) => {
      if (pointsTotal >= 500) {
        return adminLevel;
      }

      if (pointsTotal >= 200) {
        return managerLevel;
      }

      return employeeLevel;
    };

    const userSeeds = [
      {
        key: 'admin',
        fullName: 'عبدالرحمن هريدي',
        email: 'admin@bunat.local',
        jobTitle: 'مدير المنصة',
        departmentKey: 'technology',
        role: UserRole.Admin,
        pointsTotal: 640,
      },
      {
        key: 'hrLead',
        fullName: 'نورة القحطاني',
        email: 'hr@bunat.local',
        jobTitle: 'مدير الموارد البشرية',
        departmentKey: 'hr',
        role: UserRole.Hr,
        pointsTotal: 340,
      },
      {
        key: 'educationManager',
        fullName: 'خالد الشهري',
        email: 'manager@bunat.local',
        jobTitle: 'مدير قطاع البرامج التعليمية',
        departmentKey: 'educationPrograms',
        role: UserRole.Manager,
        pointsTotal: 410,
      },
      {
        key: 'contentManager',
        fullName: 'سارة الماجد',
        email: 'content@bunat.local',
        jobTitle: 'مدير المحتوى التعليمي',
        departmentKey: 'educationPrograms',
        role: UserRole.CourseManager,
        pointsTotal: 230,
      },
      {
        key: 'languageManager',
        fullName: 'أمل الشمراني',
        email: 'manager.lang@bunat.local',
        jobTitle: 'مدير قطاع الحوسبة اللغوية',
        departmentKey: 'linguisticComputing',
        role: UserRole.Manager,
        pointsTotal: 370,
      },
      {
        key: 'cultureManager',
        fullName: 'بدر العتيبي',
        email: 'manager.culture@bunat.local',
        jobTitle: 'مدير قطاع البرامج الثقافية',
        departmentKey: 'culturalPrograms',
        role: UserRole.Manager,
        pointsTotal: 320,
      },
      {
        key: 'techManager',
        fullName: 'مشاري العنزي',
        email: 'manager.tech@bunat.local',
        jobTitle: 'مدير قسم التقنية',
        departmentKey: 'technology',
        role: UserRole.Manager,
        pointsTotal: 390,
      },
      {
        key: 'employee1',
        fullName: 'ريم الحربي',
        email: 'employee1@bunat.local',
        jobTitle: 'أخصائي تصميم برامج تعليمية',
        departmentKey: 'educationPrograms',
        role: UserRole.Employee,
        pointsTotal: 180,
      },
      {
        key: 'employee2',
        fullName: 'فهد القحطاني',
        email: 'employee2@bunat.local',
        jobTitle: 'أخصائي قياس أثر تدريبي',
        departmentKey: 'educationPrograms',
        role: UserRole.Employee,
        pointsTotal: 255,
      },
      {
        key: 'employee3',
        fullName: 'نجلاء السبيعي',
        email: 'employee3@bunat.local',
        jobTitle: 'مهندس حوسبة لغوية',
        departmentKey: 'linguisticComputing',
        role: UserRole.Employee,
        pointsTotal: 145,
      },
      {
        key: 'employee4',
        fullName: 'محمد السهلي',
        email: 'employee4@bunat.local',
        jobTitle: 'منسق برامج ثقافية',
        departmentKey: 'culturalPrograms',
        role: UserRole.Employee,
        pointsTotal: 120,
      },
      {
        key: 'employee5',
        fullName: 'لولوة الدوسري',
        email: 'employee5@bunat.local',
        jobTitle: 'أخصائي تواصل مؤسسي',
        departmentKey: 'communications',
        role: UserRole.Employee,
        pointsTotal: 210,
      },
      {
        key: 'employee6',
        fullName: 'مشاعل المطيري',
        email: 'employee6@bunat.local',
        jobTitle: 'أخصائي موارد بشرية',
        departmentKey: 'hr',
        role: UserRole.Employee,
        pointsTotal: 260,
      },
      {
        key: 'employee7',
        fullName: 'راكان الدوسري',
        email: 'employee7@bunat.local',
        jobTitle: 'مهندس منصات تقنية',
        departmentKey: 'technology',
        role: UserRole.Employee,
        pointsTotal: 170,
      },
      {
        key: 'employee8',
        fullName: 'هدى العنزي',
        email: 'employee8@bunat.local',
        jobTitle: 'محلل أمن سيبراني',
        departmentKey: 'cybersecurity',
        role: UserRole.Employee,
        pointsTotal: 200,
      },
      {
        key: 'employee9',
        fullName: 'عبدالله المطيري',
        email: 'employee9@bunat.local',
        jobTitle: 'محاسب مالي',
        departmentKey: 'accounting',
        role: UserRole.Employee,
        pointsTotal: 150,
      },
    ] as const;

    const users = await this.userModel.insertMany(
      userSeeds.map(({ fullName, email, jobTitle, departmentKey, role, pointsTotal }) => ({
        fullName,
        email,
        passwordHash,
        jobTitle,
        departmentId: getDepartment(departmentKey)._id,
        teamId: null,
        managerId: null,
        role,
        status: UserStatus.Active,
        pointsTotal,
        levelId: resolveLevelId(pointsTotal),
      })),
    );
    const userByKey = new Map(userSeeds.map((user, index) => [user.key, users[index]]));
    const getUser = (key: (typeof userSeeds)[number]['key']) => {
      const user = userByKey.get(key);
      if (!user) {
        throw new Error(`User seed is missing for key: ${key}`);
      }

      return user;
    };

    const admin = getUser('admin');
    const hrLead = getUser('hrLead');

    const teamSeeds = [
      {
        key: 'educationDesign',
        name: 'فريق تصميم المسارات التعليمية',
        departmentKey: 'educationPrograms',
        managerKey: 'educationManager',
        memberKeys: ['employee1', 'employee2'],
      },
      {
        key: 'languageModels',
        name: 'فريق النماذج اللغوية العربية',
        departmentKey: 'linguisticComputing',
        managerKey: 'languageManager',
        memberKeys: ['employee3'],
      },
      {
        key: 'culturalInitiatives',
        name: 'فريق المبادرات الثقافية',
        departmentKey: 'culturalPrograms',
        managerKey: 'cultureManager',
        memberKeys: ['employee4'],
      },
      {
        key: 'communications',
        name: 'فريق التواصل المؤسسي',
        departmentKey: 'communications',
        managerKey: 'cultureManager',
        memberKeys: ['employee5'],
      },
      {
        key: 'peopleOperations',
        name: 'فريق شؤون الموظفين',
        departmentKey: 'hr',
        managerKey: 'hrLead',
        memberKeys: ['employee6'],
      },
      {
        key: 'platforms',
        name: 'فريق المنصات والتكاملات',
        departmentKey: 'technology',
        managerKey: 'techManager',
        memberKeys: ['employee7'],
      },
      {
        key: 'securityOperations',
        name: 'فريق الحوكمة الأمنية',
        departmentKey: 'cybersecurity',
        managerKey: 'techManager',
        memberKeys: ['employee8'],
      },
      {
        key: 'finance',
        name: 'فريق المالية والتقارير',
        departmentKey: 'accounting',
        managerKey: 'admin',
        memberKeys: ['employee9'],
      },
    ] as const;

    const teams = await this.teamModel.insertMany(
      teamSeeds.map(({ name, departmentKey, managerKey, memberKeys }) => ({
        name,
        departmentId: getDepartment(departmentKey)._id,
        managerId: getUser(managerKey)._id,
        members: memberKeys.map((memberKey) => getUser(memberKey)._id),
      })),
    );
    const teamByKey = new Map(teamSeeds.map((team, index) => [team.key, teams[index]]));
    const getTeam = (key: (typeof teamSeeds)[number]['key']) => {
      const team = teamByKey.get(key);
      if (!team) {
        throw new Error(`Team seed is missing for key: ${key}`);
      }

      return team;
    };

    await Promise.all([
      this.departmentModel
        .findByIdAndUpdate(getDepartment('educationPrograms')._id, { managerId: getUser('educationManager')._id })
        .exec(),
      this.departmentModel
        .findByIdAndUpdate(getDepartment('linguisticComputing')._id, { managerId: getUser('languageManager')._id })
        .exec(),
      this.departmentModel
        .findByIdAndUpdate(getDepartment('culturalPrograms')._id, { managerId: getUser('cultureManager')._id })
        .exec(),
      this.departmentModel
        .findByIdAndUpdate(getDepartment('communications')._id, { managerId: getUser('cultureManager')._id })
        .exec(),
      this.departmentModel.findByIdAndUpdate(getDepartment('hr')._id, { managerId: hrLead._id }).exec(),
      this.departmentModel
        .findByIdAndUpdate(getDepartment('technology')._id, { managerId: getUser('techManager')._id })
        .exec(),
      this.departmentModel
        .findByIdAndUpdate(getDepartment('cybersecurity')._id, { managerId: getUser('techManager')._id })
        .exec(),
      this.departmentModel.findByIdAndUpdate(getDepartment('accounting')._id, { managerId: admin._id }).exec(),
      this.userModel.findByIdAndUpdate(admin._id, { teamId: getTeam('finance')._id }).exec(),
      this.userModel.findByIdAndUpdate(hrLead._id, { teamId: getTeam('peopleOperations')._id }).exec(),
      this.userModel
        .findByIdAndUpdate(getUser('educationManager')._id, { teamId: getTeam('educationDesign')._id })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('languageManager')._id, { teamId: getTeam('languageModels')._id })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('cultureManager')._id, { teamId: getTeam('culturalInitiatives')._id })
        .exec(),
      this.userModel.findByIdAndUpdate(getUser('techManager')._id, { teamId: getTeam('platforms')._id }).exec(),
      this.userModel
        .findByIdAndUpdate(getUser('contentManager')._id, {
          teamId: getTeam('educationDesign')._id,
          managerId: getUser('educationManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee1')._id, {
          teamId: getTeam('educationDesign')._id,
          managerId: getUser('educationManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee2')._id, {
          teamId: getTeam('educationDesign')._id,
          managerId: getUser('educationManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee3')._id, {
          teamId: getTeam('languageModels')._id,
          managerId: getUser('languageManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee4')._id, {
          teamId: getTeam('culturalInitiatives')._id,
          managerId: getUser('cultureManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee5')._id, {
          teamId: getTeam('communications')._id,
          managerId: getUser('cultureManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee6')._id, {
          teamId: getTeam('peopleOperations')._id,
          managerId: hrLead._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee7')._id, {
          teamId: getTeam('platforms')._id,
          managerId: getUser('techManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee8')._id, {
          teamId: getTeam('securityOperations')._id,
          managerId: getUser('techManager')._id,
        })
        .exec(),
      this.userModel
        .findByIdAndUpdate(getUser('employee9')._id, {
          teamId: getTeam('finance')._id,
          managerId: admin._id,
        })
        .exec(),
    ]);

    const skillSeeds = [
      {
        key: 'instructionalDesign',
        name: 'تصميم الحقائب التعليمية',
        category: 'تعليمي',
        description: 'بناء برامج تدريبية مترابطة مع الأهداف والنتائج.',
        level: DifficultyLevel.Intermediate,
      },
      {
        key: 'trainingImpact',
        name: 'قياس الأثر التدريبي',
        category: 'تحليلي',
        description: 'قياس أثر البرامج وربطها بالمؤشرات المؤسسية.',
        level: DifficultyLevel.Intermediate,
      },
      {
        key: 'arabicNlp',
        name: 'هندسة اللغة العربية',
        category: 'تقني',
        description: 'إعداد البيانات اللغوية وتحسين جودة المعالجة العربية.',
        level: DifficultyLevel.Advanced,
      },
      {
        key: 'modelEvaluation',
        name: 'تقييم النماذج اللغوية',
        category: 'تقني',
        description: 'اختبار المخرجات وقياس الدقة والاستقرار.',
        level: DifficultyLevel.Advanced,
      },
      {
        key: 'culturalPrograms',
        name: 'إدارة المبادرات الثقافية',
        category: 'برامجي',
        description: 'تصميم وتنفيذ المبادرات الثقافية ورفع التفاعل معها.',
        level: DifficultyLevel.Intermediate,
      },
      {
        key: 'corporateComms',
        name: 'الاتصال المؤسسي',
        category: 'اتصال',
        description: 'صياغة الرسائل المؤسسية وإدارة قنوات التواصل.',
        level: DifficultyLevel.Beginner,
      },
      {
        key: 'talentOperations',
        name: 'استقطاب وتطوير الكفاءات',
        category: 'موارد بشرية',
        description: 'تحسين دورة التوظيف وربط التطوير بالأدوار.',
        level: DifficultyLevel.Intermediate,
      },
      {
        key: 'platformOperations',
        name: 'تشغيل المنصات الرقمية',
        category: 'تقنية',
        description: 'رفع جاهزية المنصات والتعامل مع الأعطال والتكاملات.',
        level: DifficultyLevel.Intermediate,
      },
      {
        key: 'cyberOps',
        name: 'الأمن السيبراني التشغيلي',
        category: 'أمن',
        description: 'تطبيق ضوابط الحماية والتعامل مع المخاطر التشغيلية.',
        level: DifficultyLevel.Intermediate,
      },
      {
        key: 'financialControl',
        name: 'الضبط المالي',
        category: 'مالي',
        description: 'إتقان الإقفال الدوري ودقة التقارير والتسويات.',
        level: DifficultyLevel.Intermediate,
      },
    ] as const;

    const skills = await this.skillModel.insertMany(
      skillSeeds.map(({ name, category, description, level }) => ({
        name,
        category,
        description,
        level,
      })),
    );
    const skillByKey = new Map(skillSeeds.map((skill, index) => [skill.key, skills[index]]));
    const getSkill = (key: (typeof skillSeeds)[number]['key']) => {
      const skill = skillByKey.get(key);
      if (!skill) {
        throw new Error(`Skill seed is missing for key: ${key}`);
      }

      return skill;
    };

    const kpiSeeds = [
      {
        key: 'programCompletion',
        name: 'نسبة إكمال البرامج التعليمية',
        description: 'رفع اكتمال البرامج في المواعيد المستهدفة.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 92,
        unit: '%',
        departmentKey: 'educationPrograms',
      },
      {
        key: 'contentRefreshTime',
        name: 'متوسط زمن تحديث الحقائب',
        description: 'تقليل زمن تحديث المحتوى والاعتماد.',
        metricType: KpiMetricType.Number,
        direction: KpiDirection.Decrease,
        targetValue: 12,
        unit: 'يوم',
        departmentKey: 'educationPrograms',
      },
      {
        key: 'arabicAccuracy',
        name: 'دقة معالجة النصوص العربية',
        description: 'رفع جودة مخرجات الحوسبة اللغوية العربية.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 94,
        unit: '%',
        departmentKey: 'linguisticComputing',
      },
      {
        key: 'culturalReach',
        name: 'نسبة تغطية المبادرات الثقافية',
        description: 'توسيع الوصول للمبادرات والبرامج الثقافية.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 85,
        unit: '%',
        departmentKey: 'culturalPrograms',
      },
      {
        key: 'communicationsEngagement',
        name: 'معدل التفاعل مع الرسائل المؤسسية',
        description: 'رفع التفاعل مع قنوات التواصل الرسمية.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 60,
        unit: '%',
        departmentKey: 'communications',
      },
      {
        key: 'hiringCycle',
        name: 'زمن إغلاق الشواغر',
        description: 'تقليل مدة التوظيف من الطلب حتى الإغلاق.',
        metricType: KpiMetricType.Number,
        direction: KpiDirection.Decrease,
        targetValue: 18,
        unit: 'يوم',
        departmentKey: 'hr',
      },
      {
        key: 'platformAvailability',
        name: 'جاهزية المنصات الداخلية',
        description: 'ضمان جاهزية التشغيل وتوافر الخدمة.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 99,
        unit: '%',
        departmentKey: 'technology',
      },
      {
        key: 'securityCompliance',
        name: 'نسبة الالتزام بالضوابط الأمنية',
        description: 'رفع الالتزام بالضوابط والإجراءات الأمنية.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 97,
        unit: '%',
        departmentKey: 'cybersecurity',
      },
      {
        key: 'financeAccuracy',
        name: 'دقة الإقفال المالي الشهري',
        description: 'رفع جودة الإقفال الشهري والتسويات.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 98,
        unit: '%',
        departmentKey: 'accounting',
      },
      {
        key: 'generalTimeliness',
        name: 'الالتزام بالمواعيد',
        description: 'تعزيز الانضباط والالتزام بالتسليمات الزمنية.',
        metricType: KpiMetricType.Percentage,
        direction: KpiDirection.Increase,
        targetValue: 95,
        unit: '%',
        departmentKey: null,
      },
    ] as const;

    const kpis = await this.kpiModel.insertMany(
      kpiSeeds.map(({ name, description, metricType, direction, targetValue, unit, departmentKey }) => ({
        name,
        description,
        metricType,
        direction,
        targetValue,
        unit,
        departmentId: departmentKey ? getDepartment(departmentKey)._id : null,
        roleTarget: UserRole.Employee,
      })),
    );
    const kpiByKey = new Map(kpiSeeds.map((kpi, index) => [kpi.key, kpis[index]]));
    const getKpi = (key: (typeof kpiSeeds)[number]['key']) => {
      const kpi = kpiByKey.get(key);
      if (!kpi) {
        throw new Error(`KPI seed is missing for key: ${key}`);
      }

      return kpi;
    };

    const courseSeeds = [
      {
        key: 'educationDesign',
        title: 'تصميم البرامج التعليمية المؤثرة',
        description: 'منهج عملي لبناء برامج مرتبطة بالأهداف التعليمية والنتائج المؤسسية.',
        skillKeys: ['instructionalDesign', 'trainingImpact'],
        kpiKeys: ['programCompletion', 'contentRefreshTime'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 95,
      },
      {
        key: 'trainingImpact',
        title: 'قياس أثر التدريب المؤسسي',
        description: 'أدوات ربط التدريب بالمؤشرات والتحسين المستمر.',
        skillKeys: ['trainingImpact'],
        kpiKeys: ['programCompletion'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 80,
      },
      {
        key: 'arabicComputing',
        title: 'أساسيات الحوسبة اللغوية العربية',
        description: 'مفاهيم إعداد البيانات اللغوية وتقييم الجودة للنماذج العربية.',
        skillKeys: ['arabicNlp', 'modelEvaluation'],
        kpiKeys: ['arabicAccuracy'],
        difficulty: DifficultyLevel.Advanced,
        estimatedDurationMinutes: 110,
      },
      {
        key: 'culturalPrograms',
        title: 'إدارة المبادرات والبرامج الثقافية',
        description: 'تخطيط المبادرات الثقافية ورفع الوصول والتفاعل.',
        skillKeys: ['culturalPrograms'],
        kpiKeys: ['culturalReach'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 85,
      },
      {
        key: 'communications',
        title: 'الاتصال المؤسسي وصناعة الرسائل',
        description: 'بناء الرسائل المؤسسية وتنسيق القنوات الداخلية والخارجية.',
        skillKeys: ['corporateComms'],
        kpiKeys: ['communicationsEngagement'],
        difficulty: DifficultyLevel.Beginner,
        estimatedDurationMinutes: 70,
      },
      {
        key: 'talentOperations',
        title: 'التوظيف المبني على الكفاءات',
        description: 'تحسين الاستقطاب والمقابلات وربطها بالأدوار المستهدفة.',
        skillKeys: ['talentOperations'],
        kpiKeys: ['hiringCycle'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 90,
      },
      {
        key: 'platformOperations',
        title: 'تشغيل المنصات الرقمية الداخلية',
        description: 'رفع الاعتمادية ومتابعة الحوادث والتكاملات التشغيلية.',
        skillKeys: ['platformOperations'],
        kpiKeys: ['platformAvailability'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 88,
      },
      {
        key: 'cybersecurity',
        title: 'الأمن السيبراني للفرق التشغيلية',
        description: 'أساسيات الحماية والضوابط والتعامل مع المخاطر السيبرانية.',
        skillKeys: ['cyberOps'],
        kpiKeys: ['securityCompliance'],
        difficulty: DifficultyLevel.Beginner,
        estimatedDurationMinutes: 75,
      },
      {
        key: 'financialControl',
        title: 'الضبط المالي وإقفال التقارير',
        description: 'تطبيق أفضل ممارسات الإقفال والتسويات ورفع الدقة المحاسبية.',
        skillKeys: ['financialControl'],
        kpiKeys: ['financeAccuracy'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 92,
      },
      {
        key: 'excellenceMap',
        title: this.excellenceCourseTitle,
        description: 'مسار تأسيسي متكامل لفهم التميز الوظيفي وبناء خطة تطوير عملية مرتبطة بالأداء والانضباط المهني.',
        skillKeys: ['trainingImpact', 'corporateComms', 'platformOperations'],
        kpiKeys: ['programCompletion', 'platformAvailability', 'generalTimeliness'],
        difficulty: DifficultyLevel.Intermediate,
        estimatedDurationMinutes: 155,
      },
    ] as const;

    const courses = await this.courseModel.insertMany(
      courseSeeds.map(({ title, description, skillKeys, kpiKeys, difficulty, estimatedDurationMinutes }) => ({
        title,
        description,
        skillIds: skillKeys.map((skillKey) => getSkill(skillKey)._id),
        kpiIds: kpiKeys.map((kpiKey) => getKpi(kpiKey)._id),
        difficulty,
        estimatedDurationMinutes,
        status: CourseStatus.Published,
        createdBy: admin._id,
      })),
    );
    const courseByKey = new Map(courseSeeds.map((course, index) => [course.key, courses[index]]));
    const getCourse = (key: (typeof courseSeeds)[number]['key']) => {
      const course = courseByKey.get(key);
      if (!course) {
        throw new Error(`Course seed is missing for key: ${key}`);
      }

      return course;
    };

    await Promise.all([
      this.courseModel
        .findByIdAndUpdate(getCourse('educationDesign')._id, {
          createdBy: getUser('contentManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('trainingImpact')._id, {
          createdBy: getUser('educationManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('arabicComputing')._id, {
          createdBy: getUser('languageManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('culturalPrograms')._id, {
          createdBy: getUser('cultureManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('communications')._id, {
          createdBy: getUser('contentManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('talentOperations')._id, {
          createdBy: hrLead._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('platformOperations')._id, {
          createdBy: getUser('techManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('cybersecurity')._id, {
          createdBy: getUser('techManager')._id,
        })
        .exec(),
      this.courseModel
        .findByIdAndUpdate(getCourse('excellenceMap')._id, {
          createdBy: getUser('contentManager')._id,
          certificateEnabled: true,
          finalQuiz: this.createExcellenceCourseFinalQuiz(),
        })
        .exec(),
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

    const learningPathSeeds = [
      {
        key: 'education',
        title: 'مسار البرامج التعليمية',
        description: 'مسار تأسيسي لفرق البرامج التعليمية وقياس الأثر.',
        departmentKey: 'educationPrograms',
        courseKeys: ['educationDesign', 'trainingImpact', 'excellenceMap'],
        skillKeys: ['instructionalDesign', 'trainingImpact'],
        kpiKeys: ['programCompletion', 'contentRefreshTime', 'generalTimeliness'],
      },
      {
        key: 'linguistic',
        title: 'مسار الحوسبة اللغوية',
        description: 'مسار يركز على جودة الحلول اللغوية العربية والنماذج.',
        departmentKey: 'linguisticComputing',
        courseKeys: ['arabicComputing', 'excellenceMap'],
        skillKeys: ['arabicNlp', 'modelEvaluation'],
        kpiKeys: ['arabicAccuracy', 'generalTimeliness'],
      },
      {
        key: 'cultureAndComms',
        title: 'مسار البرامج الثقافية والتواصل',
        description: 'مسار مشترك لرفع جودة المبادرات الثقافية ورسائلها المؤسسية.',
        departmentKey: 'culturalPrograms',
        courseKeys: ['culturalPrograms', 'communications', 'excellenceMap'],
        skillKeys: ['culturalPrograms', 'corporateComms'],
        kpiKeys: ['culturalReach', 'communicationsEngagement', 'generalTimeliness'],
      },
      {
        key: 'hr',
        title: 'مسار الموارد البشرية',
        description: 'مسار يربط الاستقطاب بتطوير الكفاءات والانضباط المؤسسي.',
        departmentKey: 'hr',
        courseKeys: ['talentOperations', 'excellenceMap'],
        skillKeys: ['talentOperations'],
        kpiKeys: ['hiringCycle', 'generalTimeliness'],
      },
      {
        key: 'technology',
        title: 'مسار التقنية والأمن السيبراني',
        description: 'مسار لتشغيل المنصات الرقمية مع رفع الالتزام الأمني.',
        departmentKey: 'technology',
        courseKeys: ['platformOperations', 'cybersecurity', 'excellenceMap'],
        skillKeys: ['platformOperations', 'cyberOps'],
        kpiKeys: ['platformAvailability', 'securityCompliance', 'generalTimeliness'],
      },
      {
        key: 'finance',
        title: 'مسار المحاسبة والضبط المالي',
        description: 'مسار مخصص لدقة الإقفال المالي والانضباط التشغيلي.',
        departmentKey: 'accounting',
        courseKeys: ['financialControl', 'excellenceMap'],
        skillKeys: ['financialControl'],
        kpiKeys: ['financeAccuracy', 'generalTimeliness'],
      },
    ] as const;

    const learningPaths = await this.learningPathModel.insertMany(
      learningPathSeeds.map(({ title, description, departmentKey, courseKeys, skillKeys, kpiKeys }) => ({
        title,
        description,
        targetRole: UserRole.Employee,
        departmentId: getDepartment(departmentKey)._id,
        courseIds: courseKeys.map((courseKey) => getCourse(courseKey)._id),
        skillIds: skillKeys.map((skillKey) => getSkill(skillKey)._id),
        kpiIds: kpiKeys.map((kpiKey) => getKpi(kpiKey)._id),
        status: LearningPathStatus.Active,
        createdBy: admin._id,
      })),
    );
    const learningPathByKey = new Map(
      learningPathSeeds.map((learningPath, index) => [learningPath.key, learningPaths[index]]),
    );
    const getLearningPath = (key: (typeof learningPathSeeds)[number]['key']) => {
      const learningPath = learningPathByKey.get(key);
      if (!learningPath) {
        throw new Error(`Learning path seed is missing for key: ${key}`);
      }

      return learningPath;
    };

    await this.enrollmentModel.insertMany([
      {
        userId: getUser('employee1')._id,
        courseId: getCourse('educationDesign')._id,
        learningPathId: getLearningPath('education')._id,
        assignedBy: getUser('educationManager')._id,
        status: EnrollmentStatus.InProgress,
        progressPercentage: 67,
        startedAt: this.pastDate(5),
        completedAt: null,
        dueDate: this.futureDate(14),
      },
      {
        userId: getUser('employee1')._id,
        courseId: getCourse('trainingImpact')._id,
        learningPathId: getLearningPath('education')._id,
        assignedBy: getUser('educationManager')._id,
        status: EnrollmentStatus.NotStarted,
        progressPercentage: 0,
        startedAt: null,
        completedAt: null,
        dueDate: this.futureDate(21),
      },
      {
        userId: getUser('employee2')._id,
        courseId: getCourse('excellenceMap')._id,
        learningPathId: getLearningPath('education')._id,
        assignedBy: getUser('educationManager')._id,
        status: EnrollmentStatus.Completed,
        progressPercentage: 100,
        startedAt: this.pastDate(18),
        completedAt: this.pastDate(7),
        dueDate: this.futureDate(5),
        finalQuizProgress: {
          attemptCount: 1,
          lastAttemptAt: this.pastDate(7),
          lastScorePercentage: 100,
          bestScorePercentage: 100,
          bestCorrectAnswersCount: 5,
          questionCount: 5,
          passed: true,
          completedAt: this.pastDate(7),
        },
      },
      {
        userId: getUser('employee3')._id,
        courseId: getCourse('arabicComputing')._id,
        learningPathId: getLearningPath('linguistic')._id,
        assignedBy: getUser('languageManager')._id,
        status: EnrollmentStatus.InProgress,
        progressPercentage: 33,
        startedAt: this.pastDate(6),
        completedAt: null,
        dueDate: this.futureDate(10),
      },
      {
        userId: getUser('employee4')._id,
        courseId: getCourse('culturalPrograms')._id,
        learningPathId: getLearningPath('cultureAndComms')._id,
        assignedBy: getUser('cultureManager')._id,
        status: EnrollmentStatus.Completed,
        progressPercentage: 100,
        startedAt: this.pastDate(12),
        completedAt: this.pastDate(3),
        dueDate: this.futureDate(2),
      },
      {
        userId: getUser('employee5')._id,
        courseId: getCourse('communications')._id,
        learningPathId: getLearningPath('cultureAndComms')._id,
        assignedBy: getUser('cultureManager')._id,
        status: EnrollmentStatus.InProgress,
        progressPercentage: 67,
        startedAt: this.pastDate(4),
        completedAt: null,
        dueDate: this.futureDate(9),
      },
      {
        userId: getUser('employee6')._id,
        courseId: getCourse('talentOperations')._id,
        learningPathId: getLearningPath('hr')._id,
        assignedBy: hrLead._id,
        status: EnrollmentStatus.Completed,
        progressPercentage: 100,
        startedAt: this.pastDate(14),
        completedAt: this.pastDate(4),
        dueDate: this.futureDate(6),
      },
      {
        userId: getUser('employee7')._id,
        courseId: getCourse('platformOperations')._id,
        learningPathId: getLearningPath('technology')._id,
        assignedBy: getUser('techManager')._id,
        status: EnrollmentStatus.InProgress,
        progressPercentage: 33,
        startedAt: this.pastDate(3),
        completedAt: null,
        dueDate: this.futureDate(11),
      },
      {
        userId: getUser('employee7')._id,
        courseId: getCourse('cybersecurity')._id,
        learningPathId: getLearningPath('technology')._id,
        assignedBy: getUser('techManager')._id,
        status: EnrollmentStatus.Failed,
        progressPercentage: 33,
        startedAt: this.pastDate(16),
        completedAt: null,
        dueDate: this.pastDate(2),
      },
      {
        userId: getUser('employee8')._id,
        courseId: getCourse('cybersecurity')._id,
        learningPathId: getLearningPath('technology')._id,
        assignedBy: getUser('techManager')._id,
        status: EnrollmentStatus.Completed,
        progressPercentage: 100,
        startedAt: this.pastDate(10),
        completedAt: this.pastDate(2),
        dueDate: this.futureDate(8),
      },
      {
        userId: getUser('employee9')._id,
        courseId: getCourse('financialControl')._id,
        learningPathId: getLearningPath('finance')._id,
        assignedBy: admin._id,
        status: EnrollmentStatus.InProgress,
        progressPercentage: 67,
        startedAt: this.pastDate(8),
        completedAt: null,
        dueDate: this.futureDate(12),
      },
    ]);

    const courseLessonsMap = new Map<string, SeedLessonRef[]>();
    for (const lesson of insertedLessons) {
      const list = courseLessonsMap.get(lesson.courseId.toString()) ?? [];
      list.push(lesson);
      courseLessonsMap.set(lesson.courseId.toString(), list);
    }

    const communicationsLessons = courseLessonsMap.get(getCourse('communications')._id.toString()) ?? [];
    const communicationsQuizLesson = communicationsLessons.find(
      (lesson) => lesson.contentType === LessonContentType.Quiz && lesson.quiz?.questions?.length,
    );
    const communicationsQuizQuestions = communicationsQuizLesson?.quiz?.questions ?? [];
    const communicationsQuizAttempt = communicationsQuizLesson && communicationsQuizQuestions.length
      ? [
          this.createQuizAttemptProgress(
            getUser('employee5')._id,
            getCourse('communications')._id,
            communicationsQuizLesson,
            communicationsQuizQuestions.map((question, questionIndex) => ({
              questionId: question.id,
              optionId:
                questionIndex === 0
                  ? question.options?.find((option) => option.id !== question.correctOptionId)?.id ??
                    question.correctOptionId
                  : question.correctOptionId,
            })),
            1,
            1,
          ),
        ]
      : [];

    await this.lessonProgressModel.insertMany([
      ...this.createLessonProgresses(
        getUser('employee1')._id,
        getCourse('educationDesign')._id,
        courseLessonsMap.get(getCourse('educationDesign')._id.toString()) ?? [],
        2,
      ),
      ...this.createLessonProgresses(
        getUser('employee2')._id,
        getCourse('excellenceMap')._id,
        courseLessonsMap.get(getCourse('excellenceMap')._id.toString()) ?? [],
        6,
      ),
      ...this.createLessonProgresses(
        getUser('employee3')._id,
        getCourse('arabicComputing')._id,
        courseLessonsMap.get(getCourse('arabicComputing')._id.toString()) ?? [],
        1,
      ),
      ...this.createLessonProgresses(
        getUser('employee4')._id,
        getCourse('culturalPrograms')._id,
        courseLessonsMap.get(getCourse('culturalPrograms')._id.toString()) ?? [],
        3,
      ),
      ...this.createLessonProgresses(
        getUser('employee5')._id,
        getCourse('communications')._id,
        courseLessonsMap.get(getCourse('communications')._id.toString()) ?? [],
        2,
      ),
      ...this.createLessonProgresses(
        getUser('employee6')._id,
        getCourse('talentOperations')._id,
        courseLessonsMap.get(getCourse('talentOperations')._id.toString()) ?? [],
        3,
      ),
      ...this.createLessonProgresses(
        getUser('employee7')._id,
        getCourse('platformOperations')._id,
        courseLessonsMap.get(getCourse('platformOperations')._id.toString()) ?? [],
        1,
      ),
      ...this.createLessonProgresses(
        getUser('employee7')._id,
        getCourse('cybersecurity')._id,
        courseLessonsMap.get(getCourse('cybersecurity')._id.toString()) ?? [],
        1,
      ),
      ...this.createLessonProgresses(
        getUser('employee8')._id,
        getCourse('cybersecurity')._id,
        courseLessonsMap.get(getCourse('cybersecurity')._id.toString()) ?? [],
        3,
      ),
      ...this.createLessonProgresses(
        getUser('employee9')._id,
        getCourse('financialControl')._id,
        courseLessonsMap.get(getCourse('financialControl')._id.toString()) ?? [],
        2,
      ),
      ...communicationsQuizAttempt,
    ]);

    await this.performanceRecordModel.insertMany([
      {
        userId: getUser('employee1')._id,
        kpiId: getKpi('programCompletion')._id,
        courseId: getCourse('educationDesign')._id,
        learningPathId: getLearningPath('education')._id,
        beforeValue: 74,
        afterValue: 91,
        improvementPercentage: 22.97,
        measuredAt: this.pastDate(2),
        measuredBy: getUser('educationManager')._id,
        notes: 'تحسن واضح في اكتمال البرامج بعد تطبيق أدوات التصميم والتخطيط.',
      },
      {
        userId: getUser('employee2')._id,
        kpiId: getKpi('contentRefreshTime')._id,
        courseId: getCourse('trainingImpact')._id,
        learningPathId: getLearningPath('education')._id,
        beforeValue: 17,
        afterValue: 11,
        improvementPercentage: 35.29,
        measuredAt: this.pastDate(4),
        measuredBy: getUser('educationManager')._id,
        notes: 'انخفض زمن تحديث المحتوى وتم تجاوز الهدف التشغيلي.',
      },
      {
        userId: getUser('employee3')._id,
        kpiId: getKpi('arabicAccuracy')._id,
        courseId: getCourse('arabicComputing')._id,
        learningPathId: getLearningPath('linguistic')._id,
        beforeValue: 81,
        afterValue: 90,
        improvementPercentage: 11.11,
        measuredAt: this.pastDate(1),
        measuredBy: getUser('languageManager')._id,
        notes: 'تحسن ملحوظ في دقة المخرجات اللغوية وما زال أمامه هامش للوصول إلى المستهدف.',
      },
      {
        userId: getUser('employee4')._id,
        kpiId: getKpi('culturalReach')._id,
        courseId: getCourse('culturalPrograms')._id,
        learningPathId: getLearningPath('cultureAndComms')._id,
        beforeValue: 68,
        afterValue: 84,
        improvementPercentage: 23.53,
        measuredAt: this.pastDate(3),
        measuredBy: getUser('cultureManager')._id,
        notes: 'ارتفعت تغطية البرامج الثقافية بعد إعادة ترتيب خطة الإطلاق.',
      },
      {
        userId: getUser('employee5')._id,
        kpiId: getKpi('communicationsEngagement')._id,
        courseId: getCourse('communications')._id,
        learningPathId: getLearningPath('cultureAndComms')._id,
        beforeValue: 43,
        afterValue: 61,
        improvementPercentage: 41.86,
        measuredAt: this.pastDate(2),
        measuredBy: getUser('cultureManager')._id,
        notes: 'تحسن التفاعل بعد اعتماد رسائل مؤسسية أكثر وضوحاً وتخصيصاً.',
      },
      {
        userId: getUser('employee6')._id,
        kpiId: getKpi('hiringCycle')._id,
        courseId: getCourse('talentOperations')._id,
        learningPathId: getLearningPath('hr')._id,
        beforeValue: 26,
        afterValue: 17,
        improvementPercentage: 34.62,
        measuredAt: this.pastDate(2),
        measuredBy: hrLead._id,
        notes: 'انخفض زمن إغلاق الشواغر بعد توحيد خطوات الفرز والمقابلات.',
      },
      {
        userId: getUser('employee7')._id,
        kpiId: getKpi('platformAvailability')._id,
        courseId: getCourse('platformOperations')._id,
        learningPathId: getLearningPath('technology')._id,
        beforeValue: 93,
        afterValue: 98,
        improvementPercentage: 5.38,
        measuredAt: this.pastDate(1),
        measuredBy: getUser('techManager')._id,
        notes: 'تحسن استقرار المنصة الداخلية بعد معالجة أعطال التكاملات.',
      },
      {
        userId: getUser('employee7')._id,
        kpiId: getKpi('generalTimeliness')._id,
        courseId: getCourse('platformOperations')._id,
        learningPathId: getLearningPath('technology')._id,
        beforeValue: 96,
        afterValue: 92,
        improvementPercentage: -4.17,
        measuredAt: this.pastDate(7),
        measuredBy: getUser('techManager')._id,
        notes: 'ظهر تراجع مؤقت في الالتزام بالمواعيد قبل استقرار خطة المتابعة التشغيلية.',
      },
      {
        userId: getUser('employee8')._id,
        kpiId: getKpi('securityCompliance')._id,
        courseId: getCourse('cybersecurity')._id,
        learningPathId: getLearningPath('technology')._id,
        beforeValue: 88,
        afterValue: 96,
        improvementPercentage: 9.09,
        measuredAt: this.pastDate(2),
        measuredBy: getUser('techManager')._id,
        notes: 'ارتفع الالتزام الأمني بعد إغلاق الملاحظات ذات الأولوية العالية.',
      },
      {
        userId: getUser('employee9')._id,
        kpiId: getKpi('financeAccuracy')._id,
        courseId: getCourse('financialControl')._id,
        learningPathId: getLearningPath('finance')._id,
        beforeValue: 91,
        afterValue: 98,
        improvementPercentage: 7.69,
        measuredAt: this.pastDate(3),
        measuredBy: admin._id,
        notes: 'تحققت دقة أعلى في الإقفال الشهري بعد تحسين ضوابط التسوية.',
      },
      {
        userId: getUser('employee9')._id,
        kpiId: getKpi('generalTimeliness')._id,
        courseId: getCourse('financialControl')._id,
        learningPathId: getLearningPath('finance')._id,
        beforeValue: 95,
        afterValue: 95,
        improvementPercentage: 0,
        measuredAt: this.pastDate(9),
        measuredBy: admin._id,
        notes: 'استقر الالتزام بالمواعيد دون تغير ملحوظ خلال دورة المتابعة الحالية.',
      },
    ]);

    await this.pointsTransactionModel.insertMany([
      {
        userId: getUser('employee1')._id,
        sourceType: PointsSourceType.LessonCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 20,
        description: 'إكمال درسين من مسار البرامج التعليمية',
      },
      {
        userId: getUser('employee1')._id,
        sourceType: PointsSourceType.KpiAchieved,
        sourceId: new Types.ObjectId().toString(),
        points: 110,
        description: 'تحسن ملموس في إكمال البرامج التعليمية',
      },
      {
        userId: getUser('employee2')._id,
        sourceType: PointsSourceType.CourseCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 100,
        description: 'إكمال دورة خارطة التميز الوظيفي',
      },
      {
        userId: getUser('employee2')._id,
        sourceType: PointsSourceType.QuizPassed,
        sourceId: `final:${getCourse('excellenceMap')._id.toString()}`,
        points: 25,
        description: 'اجتياز الاختبار النهائي لدورة خارطة التميز الوظيفي',
      },
      {
        userId: getUser('employee3')._id,
        sourceType: PointsSourceType.LessonCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 40,
        description: 'بدء مسار الحوسبة اللغوية العربية',
      },
      {
        userId: getUser('employee4')._id,
        sourceType: PointsSourceType.CourseCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 120,
        description: 'إكمال دورة المبادرات والبرامج الثقافية',
      },
      {
        userId: getUser('employee5')._id,
        sourceType: PointsSourceType.LessonCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 60,
        description: 'إكمال محتوى الاتصال المؤسسي التطبيقي',
      },
      {
        userId: getUser('employee6')._id,
        sourceType: PointsSourceType.CourseCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 100,
        description: 'إكمال دورة التوظيف المبني على الكفاءات',
      },
      {
        userId: getUser('employee7')._id,
        sourceType: PointsSourceType.LessonCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 30,
        description: 'تقدم أولي في تشغيل المنصات الرقمية',
      },
      {
        userId: getUser('employee8')._id,
        sourceType: PointsSourceType.CourseCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 120,
        description: 'إكمال دورة الأمن السيبراني للفرق التشغيلية',
      },
      {
        userId: getUser('employee9')._id,
        sourceType: PointsSourceType.LessonCompleted,
        sourceId: new Types.ObjectId().toString(),
        points: 50,
        description: 'إكمال وحدتين من الضبط المالي وإقفال التقارير',
      },
    ]);

    await this.upsertUserBadges([
      {
        userId: getUser('employee1')._id,
        badgeId: badges[0]._id,
        awardedAt: this.pastDate(5),
        awardedBy: getUser('educationManager')._id,
      },
      {
        userId: getUser('employee2')._id,
        badgeId: badges[1]._id,
        awardedAt: this.pastDate(3),
        awardedBy: getUser('educationManager')._id,
      },
      {
        userId: getUser('employee4')._id,
        badgeId: badges[0]._id,
        awardedAt: this.pastDate(4),
        awardedBy: getUser('cultureManager')._id,
      },
      {
        userId: getUser('employee8')._id,
        badgeId: badges[3]._id,
        awardedAt: this.pastDate(2),
        awardedBy: getUser('techManager')._id,
      },
    ]);

    this.logger.log('Seed completed');
    this.logger.log('Admin: admin@bunat.local / Password123!');
    this.logger.log('HR: hr@bunat.local / Password123!');
    this.logger.log('Manager: manager@bunat.local / Password123!');
    this.logger.log('Course Manager: content@bunat.local / Password123!');
    this.logger.log('Additional managers: manager.lang@bunat.local, manager.culture@bunat.local, manager.tech@bunat.local / Password123!');
    this.logger.log('Employees: employee1..employee9@bunat.local / Password123!');
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

  private createQuizAttemptProgress(
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    lesson: SeedLessonRef,
    submittedAnswers: Array<{ questionId: string; optionId: string }>,
    attemptCount: number,
    daysAgo: number,
  ) {
    const questions = lesson.quiz?.questions ?? [];
    const questionCount = questions.length;
    const correctAnswersCount = questions.filter(
      (question) =>
        submittedAnswers.find((answer) => answer.questionId === question.id)?.optionId === question.correctOptionId,
    ).length;
    const scorePercentage = questionCount ? Math.round((correctAnswersCount / questionCount) * 100) : 0;
    const attemptedAt = this.pastDate(daysAgo);

    return {
      userId,
      courseId,
      lessonId: lesson._id,
      status: LessonProgressStatus.InProgress,
      completedAt: null,
      timeSpentMinutes: lesson.durationMinutes,
      attemptCount,
      lastAttemptAt: attemptedAt,
      lastQuizScorePercentage: scorePercentage,
      bestQuizScorePercentage: scorePercentage,
      bestCorrectAnswersCount: correctAnswersCount,
      questionCount,
      quizPassed: false,
      submittedAnswers,
    };
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
        slides: [
          {
            id: 'excellence-intro-slide-1',
            title: 'لماذا أصبح التميز ضرورة تشغيلية؟',
            body: 'التميز الوظيفي ليس شعاراً عاماً، بل وسيلة لتقليل الفجوة بين ما يُطلب من الدور وما يتحقق فعلاً في مؤشرات الأداء اليومية.',
            mediaUrl: 'https://example.com/excellence-roadmap-intro',
            notes: 'ابدأ هذه الشريحة بتحديد أين يظهر أثر دورك على المستفيد أو على نتائج الفريق.',
          },
          {
            id: 'excellence-intro-slide-2',
            title: 'من النشاط إلى الأثر',
            body: 'كل نشاط تدريبي داخل بُناة يفترض أن يرتبط بسلوك عملي ثم بمؤشر أداء واضح، حتى لا يبقى التعلم معزولاً عن العمل الفعلي.',
            mediaUrl: null,
            notes: 'اسأل نفسك: ما السلوك الذي سيتغير بعد هذا الدرس؟',
          },
          {
            id: 'excellence-intro-slide-3',
            title: 'المخرجات المتوقعة من هذا المسار',
            body: 'ستنتهي من الدورة بخارطة تميز شخصية، أولويات قابلة للقياس، واستعداد أفضل للحوار مع المدير حول التحسن المطلوب.',
            mediaUrl: null,
            notes: 'دوّن مؤشرين اثنين تريد تحسينهما خلال الشهر القادم.',
          },
        ],
        order: 1,
        durationMinutes: 18,
        isRequired: true,
      },
      {
        courseId,
        title: 'خارطة التميز الوظيفي - أبعاد التميز الوظيفي',
        contentType: LessonContentType.Article,
        contentUrl: null,
        contentHtml: null,
        slides: [
          {
            id: 'excellence-dimensions-slide-1',
            title: 'وضوح الدور والنتيجة',
            body: 'التميّز يبدأ حين يفهم الموظف بوضوح المطلوب من دوره، وما النتيجة التي يجب أن تظهر، وكيف تُقاس هذه النتيجة داخل الفريق أو الإدارة.',
            mediaUrl: null,
            notes: 'اربط كل مسؤولية في وصفك الوظيفي بنتيجة قابلة للملاحظة أو القياس.',
          },
          {
            id: 'excellence-dimensions-slide-2',
            title: 'جودة التنفيذ والانضباط',
            body: 'الجودة تعني ثبات الأداء، والانضباط يعني الالتزام بالمواعيد والمعايير. اجتماع هذين البعدين هو ما يصنع الثقة التشغيلية داخل المؤسسة.',
            mediaUrl: null,
            notes: 'حدد معيارين للجودة ومؤشرين للانضباط في عملك الحالي.',
          },
          {
            id: 'excellence-dimensions-slide-3',
            title: 'المبادرة والتطوير المستمر',
            body: 'الموظف المتميز لا ينتظر المشكلة حتى تتضخم. يراجع مؤشرات الأداء، يطلب التغذية الراجعة، ويقترح تحسينات صغيرة لكنها منتظمة ومؤثرة.',
            mediaUrl: null,
            notes: 'اختر تحسيناً واحداً بسيطاً يمكنك تجربته هذا الأسبوع.',
          },
        ],
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
        contentHtml: null,
        slides: [
          {
            id: 'excellence-plan-slide-1',
            title: 'ابنِ أولوياتك الثلاث',
            body: 'اكتب ثلاث أولويات تطوير للأربعين يوماً القادمة: واحدة لجودة التنفيذ، واحدة للانضباط، وواحدة للتطوير الذاتي أو التعلم.',
            mediaUrl: null,
            notes: 'احرص أن تكون كل أولوية مرتبطة بموقف عملي متكرر في دورك.',
          },
          {
            id: 'excellence-plan-slide-2',
            title: 'حوّل الخطة إلى متابعة أسبوعية',
            body: 'لكل أولوية: حدّد السلوك المطلوب، المؤشر الذي سيتأثر، والخطوة التي ستبدأ بها هذا الأسبوع. ثم راجع التنفيذ مع مديرك أو مع نفسك كل سبعة أيام.',
            mediaUrl: null,
            notes: 'يمكنك استخدام المرجع العملي في نهاية الدورة لتتبع التنفيذ.',
          },
        ],
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
        slides: [
          {
            id: 'excellence-guide-slide-1',
            title: 'مرجع متابعة التنفيذ',
            body: 'يتضمن هذا المرجع نموذجاً أسبوعياً لتتبّع الأولويات التطويرية، ونقاط مراجعة سريعة تساعد على تحويل الخطة إلى عادة عملية.',
            mediaUrl: 'https://example.com/excellence-roadmap-guide.pdf',
            notes: 'استخدم المرجع بعد انتهاء الدورة لتحديث تقدمك الذاتي بانتظام.',
          },
          {
            id: 'excellence-guide-slide-2',
            title: 'كيف تستخدم المرجع؟',
            body: 'راجع الأولويات الثلاث، حدّث نسبة التنفيذ، ثم دوّن ما الذي تحسن وما الذي يحتاج تدخلاً أو دعماً إضافياً من المدير أو الفريق.',
            mediaUrl: null,
            notes: 'احفظ نسخة محدثة كل أسبوعين لقياس التغيّر بمرور الوقت.',
          },
        ],
        order: 6,
        durationMinutes: 10,
        isRequired: false,
      },
    ];
  }

  private createExcellenceCourseFinalQuiz() {
    return {
      passingScorePercentage: 80,
      questions: [
        {
          id: 'excellence-course-final-q1',
          prompt: 'ما نقطة البداية الصحيحة لبناء مسار تميز وظيفي فعّال؟',
          options: [
            { id: 'excellence-course-final-q1-a', text: 'تحديد فجوات الدور وربطها بمؤشرات الأداء المرتبطة به' },
            { id: 'excellence-course-final-q1-b', text: 'جمع أكبر عدد ممكن من المبادرات دون ترتيب' },
            { id: 'excellence-course-final-q1-c', text: 'التركيز على الحضور الشكلي فقط' },
            { id: 'excellence-course-final-q1-d', text: 'تأجيل القياس إلى نهاية العام' },
          ],
          correctOptionId: 'excellence-course-final-q1-a',
        },
        {
          id: 'excellence-course-final-q2',
          prompt: 'كيف يثبت المتعلم أن التدريب ارتبط بالأثر؟',
          options: [
            { id: 'excellence-course-final-q2-a', text: 'عندما يظهر تغير واضح في السلوك التنفيذي والمؤشر المرتبط به' },
            { id: 'excellence-course-final-q2-b', text: 'عند الاكتفاء بتلخيص المحتوى دون تطبيق' },
            { id: 'excellence-course-final-q2-c', text: 'عند زيادة عدد الاجتماعات فقط' },
            { id: 'excellence-course-final-q2-d', text: 'عند حفظ المفاهيم دون مراجعتها' },
          ],
          correctOptionId: 'excellence-course-final-q2-a',
        },
        {
          id: 'excellence-course-final-q3',
          prompt: 'أي خيار يعكس خطة تحسين شخصية مكتملة؟',
          options: [
            { id: 'excellence-course-final-q3-a', text: 'هدف واضح، سلوك مطلوب، مؤشر قياس، ومراجعة زمنية منتظمة' },
            { id: 'excellence-course-final-q3-b', text: 'أمنيات عامة بلا توقيت أو متابعة' },
            { id: 'excellence-course-final-q3-c', text: 'مهام كثيرة غير مرتبطة بالأولويات' },
            { id: 'excellence-course-final-q3-d', text: 'توصيات عامة بلا مسؤولية واضحة' },
          ],
          correctOptionId: 'excellence-course-final-q3-a',
        },
        {
          id: 'excellence-course-final-q4',
          prompt: 'ما الدور المهني للتغذية الراجعة ضمن هذا المسار؟',
          options: [
            { id: 'excellence-course-final-q4-a', text: 'تصحيح المسار مبكراً ورفع جودة التنفيذ قبل تراكم المشكلة' },
            { id: 'excellence-course-final-q4-b', text: 'إلغاء الحاجة للمؤشرات' },
            { id: 'excellence-course-final-q4-c', text: 'الاعتماد على الانطباعات الشخصية فقط' },
            { id: 'excellence-course-final-q4-d', text: 'تأجيل كل مراجعة إلى نهاية الدورة' },
          ],
          correctOptionId: 'excellence-course-final-q4-a',
        },
        {
          id: 'excellence-course-final-q5',
          prompt: 'ما أفضل وصف للتميز الوظيفي المستدام؟',
          options: [
            { id: 'excellence-course-final-q5-a', text: 'ممارسة يومية تجمع الوضوح والانضباط والجودة والتحسين المستمر' },
            { id: 'excellence-course-final-q5-b', text: 'إنجاز سريع غير قابل للتكرار' },
            { id: 'excellence-course-final-q5-c', text: 'الاعتماد الكامل على التوجيه الخارجي' },
            { id: 'excellence-course-final-q5-d', text: 'التركيز على النشاط بدلاً من النتيجة' },
          ],
          correctOptionId: 'excellence-course-final-q5-a',
        },
      ],
    };
  }
}
