export enum UserRole {
  Employee = 'employee',
  Manager = 'manager',
  Admin = 'admin',
  Hr = 'hr',
  CourseManager = 'course_manager',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum DifficultyLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}

export enum CourseStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum LessonContentType {
  Video = 'video',
  Article = 'article',
  Pdf = 'pdf',
  Quiz = 'quiz',
  Task = 'task',
}

export enum EnrollmentStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
  Failed = 'failed',
}

export enum LessonProgressStatus {
  NotStarted = 'not_started',
  InProgress = 'in_progress',
  Completed = 'completed',
}

export enum KpiMetricType {
  Number = 'number',
  Percentage = 'percentage',
  Score = 'score',
  Boolean = 'boolean',
}

export enum KpiDirection {
  Increase = 'increase',
  Decrease = 'decrease',
}

export enum LearningPathStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum PointsSourceType {
  CourseCompleted = 'course_completed',
  LessonCompleted = 'lesson_completed',
  QuizPassed = 'quiz_passed',
  KpiAchieved = 'kpi_achieved',
  BadgeAwarded = 'badge_awarded',
}

export enum BadgeCriteriaType {
  Course = 'course',
  Kpi = 'kpi',
  Points = 'points',
  Streak = 'streak',
}
