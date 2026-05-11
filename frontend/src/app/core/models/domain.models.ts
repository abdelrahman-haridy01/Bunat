export type UserRole = 'employee' | 'manager' | 'admin' | 'hr';

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
  lessons?: Lesson[];
}

export interface Lesson {
  _id?: string;
  id?: string;
  courseId: string;
  title: string;
  contentType: 'video' | 'article' | 'pdf' | 'quiz' | 'task';
  contentUrl?: string | null;
  contentHtml?: string | null;
  order: number;
  durationMinutes: number;
  isRequired: boolean;
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
