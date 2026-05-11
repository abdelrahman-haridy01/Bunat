import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { AppShellComponent } from './shared/components/app-shell.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'employee',
    component: AppShellComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['employee'] },
    children: [
      {
        path: 'dashboard',
        data: { title: 'لوحة الموظف', eyebrow: 'أداء التعلم' },
        loadComponent: () =>
          import('./features/employee/pages/employee-dashboard.component').then(
            (m) => m.EmployeeDashboardComponent,
          ),
      },
      {
        path: 'courses',
        data: { title: 'الدورات المخصصة', eyebrow: 'التعلم الحالي' },
        loadComponent: () =>
          import('./features/employee/pages/assigned-courses.component').then(
            (m) => m.AssignedCoursesComponent,
          ),
      },
      {
        path: 'courses/:id',
        data: { title: 'تفاصيل الدورة', eyebrow: 'تنفيذ التدريب' },
        loadComponent: () =>
          import('./features/employee/pages/course-details.component').then(
            (m) => m.CourseDetailsComponent,
          ),
      },
      {
        path: 'progress',
        data: { title: 'تقدمي', eyebrow: 'نقاط ومستوى ومؤشرات' },
        loadComponent: () =>
          import('./features/employee/pages/my-progress.component').then(
            (m) => m.MyProgressComponent,
          ),
      },
    ],
  },
  {
    path: 'manager',
    component: AppShellComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['manager'] },
    children: [
      {
        path: 'dashboard',
        data: { title: 'لوحة المدير', eyebrow: 'رؤية الفريق' },
        loadComponent: () =>
          import('./features/manager/pages/manager-dashboard.component').then(
            (m) => m.ManagerDashboardComponent,
          ),
      },
      {
        path: 'team',
        data: { title: 'الفريق', eyebrow: 'متابعة الأعضاء' },
        loadComponent: () =>
          import('./features/manager/pages/team-overview.component').then(
            (m) => m.TeamOverviewComponent,
          ),
      },
      {
        path: 'employees/:id',
        data: { title: 'أداء الموظف', eyebrow: 'تفاصيل الدعم والتطور' },
        loadComponent: () =>
          import('./features/manager/pages/employee-performance.component').then(
            (m) => m.EmployeePerformanceComponent,
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AppShellComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'hr'] },
    children: [
      {
        path: 'dashboard',
        data: { title: 'لوحة الإدارة', eyebrow: 'نظرة تنفيذية' },
        loadComponent: () =>
          import('./features/admin/pages/admin-dashboard.component').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'users',
        data: { title: 'إدارة المستخدمين', eyebrow: 'الصلاحيات والفرق' },
        loadComponent: () =>
          import('./features/admin/pages/users-management.component').then(
            (m) => m.UsersManagementComponent,
          ),
      },
      {
        path: 'courses',
        data: { title: 'إدارة الدورات', eyebrow: 'المحتوى والربط بالمؤشرات' },
        loadComponent: () =>
          import('./features/admin/pages/courses-management.component').then(
            (m) => m.CoursesManagementComponent,
          ),
      },
      {
        path: 'courses/:id/lessons',
        data: { title: 'دروس الدورة', eyebrow: 'إدارة محتوى الدورة' },
        loadComponent: () =>
          import('./features/admin/pages/course-lessons-management.component').then(
            (m) => m.CourseLessonsManagementComponent,
          ),
      },
      {
        path: 'kpis',
        data: { title: 'إدارة مؤشرات الأداء', eyebrow: 'تعريف وقياس التحسن' },
        loadComponent: () =>
          import('./features/admin/pages/kpi-management.component').then(
            (m) => m.KpiManagementComponent,
          ),
      },
      {
        path: 'assignments',
        data: { title: 'تكليف التدريب', eyebrow: 'توزيع الدورات على الموظفين' },
        loadComponent: () =>
          import('./features/admin/pages/assign-training.component').then(
            (m) => m.AssignTrainingComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
