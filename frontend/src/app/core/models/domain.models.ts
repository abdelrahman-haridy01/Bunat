export type UserRole = 'employee' | 'manager' | 'admin' | 'hr' | 'course_manager';

export interface UserSummary {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  jobTitle: string;
  role: UserRole;
  status: 'active' | 'inactive';
  pointsTotal: number;
  departmentId?: { _id?: string; name?: string } | string | null;
  teamId?: { _id?: string; name?: string } | string | null;
  managerId?: { _id?: string; fullName?: string } | string | null;
  levelId?: { _id?: string; name?: string; icon?: string } | string | null;
}

export interface AuthResponse {
  accessToken: string;
  user: UserSummary;
}

export interface LessonSlide {
  id: string;
  title: string;
  body: string;
  mediaUrl?: string | null;
  notes?: string | null;
}

export interface Course {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDurationMinutes: number;
  status: 'draft' | 'published' | 'archived';
  skillIds: Array<{ _id?: string; name?: string } | string>;
  kpiIds: Array<{ _id?: string; name?: string } | string>;
  finalQuiz?: LessonQuiz | null;
  finalQuizProgress?: FinalQuizProgressSummary | null;
  certificateEnabled?: boolean;
  lessons?: Lesson[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId?: string;
}

export interface LessonQuiz {
  passingScorePercentage: number;
  questions: QuizQuestion[];
}

export interface LessonProgressSummary {
  status: 'not_started' | 'in_progress' | 'completed';
  completedAt?: string | null;
  timeSpentMinutes: number;
  attemptCount?: number;
  lastAttemptAt?: string | null;
  lastQuizScorePercentage?: number | null;
  bestQuizScorePercentage?: number | null;
  bestCorrectAnswersCount?: number | null;
  questionCount?: number | null;
  quizPassed?: boolean;
}

export interface Lesson {
  _id?: string;
  id?: string;
  courseId: string;
  title: string;
  contentType: 'video' | 'article' | 'pdf' | 'quiz' | 'task';
  contentUrl?: string | null;
  contentHtml?: string | null;
  slides?: LessonSlide[];
  quiz?: LessonQuiz | null;
  order: number;
  durationMinutes: number;
  isRequired: boolean;
  progress?: LessonProgressSummary | null;
}

export interface FinalQuizProgressSummary {
  attemptCount: number;
  lastAttemptAt?: string | null;
  lastScorePercentage?: number | null;
  bestScorePercentage?: number | null;
  bestCorrectAnswersCount?: number | null;
  questionCount?: number | null;
  passed: boolean;
  completedAt?: string | null;
}

export interface Enrollment {
  _id?: string;
  id?: string;
  userId?: UserSummary | string;
  courseId?: Course | string;
  learningPathId?: string | null;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  progressPercentage: number;
  dueDate?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  finalQuizProgress?: FinalQuizProgressSummary | null;
}

export interface AiSettings {
  provider: 'openai';
  hasApiKey: boolean;
  maskedApiKey?: string | null;
  model: string;
  baseUrl?: string | null;
  language: string;
  defaultLessonCount: number;
  defaultFinalExamQuestionCount: number;
}

export interface AiCourseDraftRequest {
  topic: string;
  targetAudience?: string;
  learningObjectives?: string[];
  difficulty: Course['difficulty'];
  estimatedDurationMinutes: number;
  lessonCount: number;
  notes?: string;
  includeFinalExam?: boolean;
  finalExamQuestionCount?: number;
  language?: string;
}

export interface AiCourseDraftResponse {
  course: Pick<
    Course,
    'title' | 'description' | 'difficulty' | 'estimatedDurationMinutes' | 'status' | 'certificateEnabled'
  >;
  lessons: Array<
    Pick<Lesson, 'title' | 'contentType' | 'durationMinutes' | 'order' | 'isRequired'> & {
      slides: LessonSlide[];
    }
  >;
  finalQuiz?: LessonQuiz | null;
}

export interface Kpi {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  metricType: 'number' | 'percentage' | 'score' | 'boolean';
  direction: 'increase' | 'decrease';
  targetValue: number;
  unit: string;
  departmentId?: { _id?: string; name?: string } | string | null;
  roleTarget?: UserRole | null;
}

export interface PerformanceRecord {
  _id?: string;
  id?: string;
  userId?: UserSummary | string;
  kpiId?: Kpi | string;
  courseId?: Course | string | null;
  beforeValue: number;
  afterValue: number;
  improvementPercentage: number;
  measuredAt: string;
  notes?: string;
}

export interface EmployeeQuizResult {
  courseId?: Course | string | null;
  lessonId?: Lesson | string | null;
  scorePercentage: number;
  passed: boolean;
  attemptCount: number;
  correctAnswersCount: number;
  questionCount: number;
  lastAttemptAt?: string | null;
  completedAt?: string | null;
}

export interface TeamSummary {
  _id?: string;
  id?: string;
  name: string;
  departmentId?: { _id?: string; name?: string } | string | null;
  managerId?: UserSummary | string | null;
  members?: Array<UserSummary | string>;
}

export interface EmployeeReport {
  user: UserSummary | null;
  enrollments: Enrollment[];
  performanceRecords: PerformanceRecord[];
  quizResults: EmployeeQuizResult[];
  kpiImprovementSummary: Array<{
    kpiId?: Kpi | string | null;
    improvementPercentage: number;
  }>;
}

export interface ManagerDashboardEntry {
  employee: UserSummary;
  assignedCourses: number;
  completionRate: number;
  averageProgress: number;
  latestImprovement: number;
}

export interface ManagerDashboard {
  teamMembers: ManagerDashboardEntry[];
  topPerformers: ManagerDashboardEntry[];
  needsSupport: ManagerDashboardEntry[];
}

export interface AdminDashboard {
  totals: {
    users: number;
    employees: number;
    managers: number;
    teams: number;
    enrollments: number;
    completedEnrollments: number;
    performanceRecords: number;
  };
  completionRate: number;
  roleDistribution: Array<{
    role: UserRole;
    count: number;
  }>;
  enrollmentStatusDistribution: Array<{
    status: Enrollment['status'];
    count: number;
  }>;
  performanceSummary: {
    improvedCount: number;
    stagnantCount: number;
    declinedCount: number;
    averageImprovement: number;
  };
  managerCoverageRate: number;
  averageEmployeesPerManager: number;
  averageMembersPerTeam: number;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  hint?: string;
  tone?: 'primary' | 'success' | 'info' | 'warning';
}

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableAction {
  key: string;
  label: string;
  icon?: string;
  tone?: 'primary' | 'secondary' | 'ghost' | 'danger';
}
