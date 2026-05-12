import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { EmployeeReport, EmployeeQuizResult, Enrollment, PerformanceRecord, UserSummary } from '../../../core/models/domain.models';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import {
  DashboardChartCardComponent,
  DataTableComponent,
  EmptyStateComponent,
  IconComponent,
  ProgressBarComponent,
  StatCardComponent,
} from '../../../shared/components';

@Component({
  selector: 'app-employee-performance',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    DataTableComponent,
    DashboardChartCardComponent,
    EmptyStateComponent,
    IconComponent,
    ProgressBarComponent,
  ],
  template: `
    <section class="page-grid" *ngIf="user() as user">
      <article class="card hero-panel">
        <div class="hero-copy">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="user" [size]="20" /></span>
              <span>{{ user.fullName }}</span>
            </h2>
            <p class="section-subtitle">
              {{ user.jobTitle }}{{ departmentName(user) ? ' • ' + departmentName(user) : '' }}
            </p>
          </div>
          <div class="hero-tags">
            <span class="hero-tag">{{ levelName(user) }}</span>
            <span class="hero-tag neutral">{{ statusLabel(user.status) }}</span>
          </div>
        </div>
      </article>

      <div class="stats-grid">
        <app-stat-card label="النقاط" [value]="user.pointsTotal" tone="success" icon="award" />
        <app-stat-card label="الدورات المسندة" [value]="enrollments().length" icon="book-open" />
        <app-stat-card label="متوسط التقدّم" [value]="averageProgress() + '%'" tone="info" icon="chart" />
        <app-stat-card label="المعدل الاختباري" [value]="averageQuizScore() + '%'" tone="info" icon="chart-bars" />
        <app-stat-card label="الدورات المكتملة" [value]="completedCourses()" tone="success" icon="folder-check" />
        <app-stat-card label="متوسط التحسن" [value]="averageImprovement() + '%'" tone="success" icon="target" />
      </div>

      <div class="split-grid">
        <app-dashboard-chart-card
          title="تقدّم الدورات"
          subtitle="حالة كل دورة مسندة لهذا العضو."
          icon="chart-bars"
          [items]="courseProgressItems()"
          [scaleMax]="100"
        />

        <article class="card panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="sparkles" [size]="18" />
                <span>ملخص التقرير</span>
              </h3>
              <p class="section-subtitle">قراءة سريعة لوضع العضو الحالي وما يحتاج متابعة.</p>
            </div>
          </div>

          <div class="insight-list">
            <article class="insight-item" *ngFor="let insight of reportInsights()">
              <strong>{{ insight.title }}</strong>
              <p>{{ insight.description }}</p>
            </article>
          </div>
        </article>
      </div>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h3 class="section-title label-with-icon">
              <app-icon name="book" [size]="18" />
              <span>الدورات الحالية والتقدّم</span>
            </h3>
            <p class="section-subtitle">تفاصيل التنفيذ لكل دورة مخصصة.</p>
          </div>
        </div>

        <div class="course-list" *ngIf="enrollments().length; else noEnrollments">
          <article class="course-item" *ngFor="let enrollment of enrollments()">
            <div class="course-head">
              <div class="course-copy">
                <strong>{{ courseTitle(enrollment) }}</strong>
                <p>{{ statusLabel(enrollment.status) }}</p>
              </div>
              <span class="course-badge">{{ enrollment.progressPercentage }}%</span>
            </div>
            <app-progress-bar [value]="enrollment.progressPercentage" />
          </article>
        </div>

        <ng-template #noEnrollments>
          <app-empty-state title="لا توجد دورات مسندة" description="سيظهر التقدم هنا عند إضافة دورات للعضو." />
        </ng-template>
      </article>

      <div class="split-grid">
        <article class="card panel">
          <h3 class="section-title">سجل مؤشرات الأداء</h3>
          <app-data-table *ngIf="performanceRows().length; else noPerformance" [columns]="kpiColumns" [rows]="performanceRows()" />
          <ng-template #noPerformance>
            <app-empty-state title="لا توجد قياسات أداء" description="لم تُسجل بيانات قبل/بعد لهذا العضو حتى الآن." />
          </ng-template>
        </article>

        <article class="card panel">
          <h3 class="section-title">نتائج الاختبارات</h3>
          <app-data-table *ngIf="quizRows().length; else noQuiz" [columns]="quizColumns" [rows]="quizRows()" />
          <ng-template #noQuiz>
            <app-empty-state title="لا توجد اختبارات" description="ستظهر نتائج الاختبارات هنا عند اكتمالها." />
          </ng-template>
        </article>
      </div>
    </section>
  `,
  styles: [
    `
      .stats-grid,
      .split-grid,
      .insight-list,
      .course-list {
        display: grid;
        gap: 1rem;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      }

      .split-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .hero-panel,
      .panel {
        padding: 1.5rem;
      }

      .hero-copy,
      .hero-tags,
      .course-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .hero-tags {
        flex-wrap: wrap;
      }

      .hero-tag,
      .course-badge {
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: var(--color-primary-soft);
        color: var(--color-primary-default);
        font-weight: 600;
      }

      .hero-tag.neutral {
        background: var(--color-neutral-100);
        color: var(--color-display);
      }

      .course-item,
      .insight-item {
        padding: 1rem;
        border-radius: 1rem;
        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);
        border: 1px solid var(--color-neutral-200);
      }

      .course-copy,
      .insight-item {
        display: grid;
        gap: 0.35rem;
      }

      .course-copy p,
      .insight-item p {
        margin: 0;
        color: var(--color-secondary-paragraph);
      }

      @media (max-width: 960px) {
        .split-grid {
          grid-template-columns: 1fr;
        }

        .hero-copy,
        .course-head {
          flex-direction: column;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePerformanceComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly usersApi = inject(UsersApiService);
  private readonly reportsApi = inject(ReportsApiService);

  protected readonly user = signal<UserSummary | null>(null);
  protected readonly report = signal<EmployeeReport | null>(null);
  protected readonly kpiColumns = [
    { key: 'kpi', label: 'المؤشر' },
    { key: 'beforeValue', label: 'قبل' },
    { key: 'afterValue', label: 'بعد' },
    { key: 'improvement', label: 'التحسن' },
    { key: 'measuredAt', label: 'تاريخ القياس' },
  ];
  protected readonly quizColumns = [
    { key: 'course', label: 'الدورة' },
    { key: 'quiz', label: 'الاختبار' },
    { key: 'score', label: 'النتيجة' },
    { key: 'status', label: 'الحالة' },
    { key: 'attempts', label: 'المحاولات' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.usersApi.getUser(id).subscribe((response) => this.user.set(response));
    this.reportsApi.getEmployeeReport(id).subscribe((response) => this.report.set(response));
  }

  protected enrollments() {
    return this.report()?.enrollments || [];
  }

  protected completedCourses() {
    return this.enrollments().filter((enrollment) => enrollment.status === 'completed').length;
  }

  protected averageProgress() {
    if (!this.enrollments().length) {
      return 0;
    }

    return Math.round(
      this.enrollments().reduce((sum, enrollment) => sum + (enrollment.progressPercentage ?? 0), 0) /
        this.enrollments().length,
    );
  }

  protected averageQuizScore() {
    const quizResults = this.report()?.quizResults || [];
    if (!quizResults.length) {
      return 0;
    }

    return Math.round(
      quizResults.reduce((sum, quiz) => sum + quiz.scorePercentage, 0) / quizResults.length,
    );
  }

  protected averageImprovement() {
    const records = this.report()?.performanceRecords || [];
    if (!records.length) {
      return 0;
    }

    return Math.round(records.reduce((sum, record) => sum + record.improvementPercentage, 0) / records.length);
  }

  protected courseProgressItems() {
    return this.enrollments().map((enrollment) => ({
      label: this.courseTitle(enrollment),
      value: enrollment.progressPercentage,
      valueLabel: `${enrollment.progressPercentage}%`,
      hint: this.statusLabel(enrollment.status),
      tone:
        enrollment.status === 'completed'
          ? ('success' as const)
          : enrollment.status === 'in_progress'
            ? ('info' as const)
            : ('warning' as const),
    }));
  }

  protected performanceRows() {
    return (this.report()?.performanceRecords || []).map((record) => ({
      kpi: this.kpiName(record),
      beforeValue: record.beforeValue,
      afterValue: record.afterValue,
      improvement: `${record.improvementPercentage}%`,
      measuredAt: this.dateLabel(record.measuredAt),
    }));
  }

  protected quizRows() {
    return (this.report()?.quizResults || []).map((result) => ({
      course: this.quizCourseTitle(result),
      quiz: this.quizTitle(result),
      score: `${result.scorePercentage}%`,
      status: result.passed ? 'اجتاز' : 'لم يجتز',
      attempts: result.attemptCount,
    }));
  }

  protected reportInsights() {
    return [
      {
        title: 'حالة التنفيذ',
        description: this.enrollments().length
          ? `هذا العضو أكمل ${this.completedCourses()} من أصل ${this.enrollments().length} دورات بمتوسط تقدم ${this.averageProgress()}%.`
          : 'لا توجد دورات مسندة لهذا العضو حالياً.',
      },
      {
        title: 'الاستيعاب المعرفي',
        description: (this.report()?.quizResults || []).length
          ? `متوسط نتائج الاختبارات ${this.averageQuizScore()}% عبر ${(this.report()?.quizResults || []).length} اختبارات.`
          : 'لم تسجل نتائج اختبارات بعد، لذلك لا يوجد قياس مباشر للاستيعاب.',
      },
      {
        title: 'الأثر على الأداء',
        description: (this.report()?.performanceRecords || []).length
          ? `متوسط التحسن المسجل في مؤشرات الأداء هو ${this.averageImprovement()}%.`
          : 'لا توجد قياسات أداء مسجلة قبل/بعد لهذا العضو حتى الآن.',
      },
    ];
  }

  protected departmentName(user: UserSummary) {
    return typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?.name || '';
  }

  protected levelName(user: UserSummary) {
    return typeof user.levelId === 'string' ? user.levelId : user.levelId?.name || 'مستوى غير محدد';
  }

  protected statusLabel(status?: string) {
    return (
      {
        active: 'نشط',
        inactive: 'غير نشط',
        not_started: 'لم تبدأ',
        in_progress: 'قيد التنفيذ',
        completed: 'مكتملة',
        failed: 'متعثرة',
      }[status || 'active'] || status || 'نشط'
    );
  }

  protected courseTitle(enrollment: Enrollment) {
    return typeof enrollment.courseId === 'string' ? enrollment.courseId : enrollment.courseId?.title || 'دورة تدريبية';
  }

  protected kpiName(record: PerformanceRecord) {
    return typeof record.kpiId === 'string' ? record.kpiId : record.kpiId?.name || 'مؤشر';
  }

  protected quizCourseTitle(result: EmployeeQuizResult) {
    return typeof result.courseId === 'string' ? result.courseId : result.courseId?.title || 'دورة تدريبية';
  }

  protected quizTitle(result: EmployeeQuizResult) {
    return typeof result.lessonId === 'string' ? result.lessonId : result.lessonId?.title || 'اختبار';
  }

  protected dateLabel(value?: string) {
    if (!value) {
      return '-';
    }

    return new Intl.DateTimeFormat('ar', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(value));
  }
}
