import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  BadgeComponent,
  EmptyStateComponent,
  IconComponent,
  LevelCardComponent,
  ProgressBarComponent,
  StatCardComponent,
} from '../../../shared/components';
import { AuthService } from '../../../core/services/auth.service';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import { GamificationApiService } from '../../../core/services/gamification-api.service';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { EmployeeQuizResult, EmployeeReport, Enrollment, PerformanceRecord } from '../../../core/models/domain.models';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StatCardComponent,
    IconComponent,
    LevelCardComponent,
    BadgeComponent,
    ProgressBarComponent,
    EmptyStateComponent,
  ],
  template: `
    <section class="page-grid">
      <div class="panel-header">
        <div>
          <h2 class="section-title label-with-icon">
            <span class="icon-badge"><app-icon name="sparkles" [size]="20" /></span>
            <span>ملخص تقدّمك</span>
          </h2>
          <p class="section-subtitle">صورة سريعة عن التدريب الحالي، النقاط، والأثر على المؤشرات.</p>
        </div>
      </div>

      <div class="stats-grid">
        <app-stat-card label="الدورات المكلفة" [value]="enrollments().length" icon="book-open" />
        <app-stat-card label="الدورات المكتملة" [value]="completedCount()" tone="success" icon="folder-check" />
        <app-stat-card label="متوسط التقدّم" [value]="averageProgress() + '%'" tone="info" icon="chart" />
        <app-stat-card label="متوسط الاختبارات" [value]="averageQuizScore() + '%'" tone="info" icon="chart-bars" />
        <app-level-card
          [name]="gamification()?.user?.levelId?.name || 'مستوى جاري'"
          [points]="gamification()?.user?.pointsTotal || 0"
        />
      </div>

      <div class="page-columns">
        <article class="card panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="book" [size]="18" />
                <span>الدورات الحالية</span>
              </h3>
              <p class="section-subtitle">اطلع على آخر حالة لكل دورة مخصصة.</p>
            </div>
            <a routerLink="/employee/courses" class="btn btn-secondary">
              <span class="btn-content">
                <app-icon name="eye" [size]="18" />
                <span>كل الدورات</span>
              </span>
            </a>
          </div>

          <ng-container *ngIf="enrollments().length; else noEnrollments">
            <div class="course-list">
              <article class="course-item" *ngFor="let enrollment of enrollments().slice(0, 4)">
                <div class="course-copy">
                  <span class="course-icon">
                    <app-icon name="graduation" [size]="18" />
                  </span>
                  <strong>{{ courseTitle(enrollment) }}</strong>
                  <p>{{ statusLabel(enrollment.status) }}</p>
                </div>
                <app-progress-bar [value]="enrollment.progressPercentage" />
              </article>
            </div>
          </ng-container>
          <ng-template #noEnrollments>
            <app-empty-state title="لا توجد دورات حالياً" description="ستظهر الدورات المخصصة هنا." />
          </ng-template>
        </article>

        <article class="card panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="award" [size]="18" />
                <span>الشارات والإنجاز</span>
              </h3>
              <p class="section-subtitle">آخر ما تم منحه لك ضمن رحلة التطور.</p>
            </div>
          </div>

          <div class="badge-list" *ngIf="userBadges().length; else noBadges">
            <app-badge
              *ngFor="let badge of userBadges()"
              [name]="badge.badgeId?.name || 'شارة'"
              [description]="badge.badgeId?.description || ''"
            />
          </div>

          <ng-template #noBadges>
            <app-empty-state title="لا توجد شارات بعد" description="أكمل الدروس والدورات لجمع الشارات." />
          </ng-template>
        </article>
      </div>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h3 class="section-title label-with-icon">
              <app-icon name="target" [size]="18" />
              <span>مؤشرات سريعة</span>
            </h3>
            <p class="section-subtitle">قراءة مختصرة لما يحتاج متابعة في مسارك الحالي.</p>
          </div>
        </div>

        <div class="insight-list">
          <article class="insight-item" *ngFor="let insight of employeeInsights()">
            <strong>{{ insight.title }}</strong>
            <p>{{ insight.description }}</p>
          </article>
        </div>
      </article>
    </section>
  `,
  styles: [
    `
      .stats-grid,
      .page-columns {
        display: grid;
        gap: 1rem;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      }

      .page-columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .panel {
        padding: 1.4rem;
      }

      .course-list,
      .badge-list,
      .insight-list {
        display: grid;
        gap: 1rem;
      }

      .course-item {
        display: grid;
        gap: 0.85rem;
        padding: 1rem;
        border-radius: 1rem;
        background: var(--color-neutral-50);
      }

      .course-copy {
        display: grid;
        gap: 0.35rem;
      }

      .course-icon {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 0.85rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(20, 87, 58, 0.1);
        color: var(--color-primary-default);
      }

      .course-item p,
      .insight-item p {
        margin: 0.35rem 0 0;
        color: var(--color-secondary-paragraph);
      }

      .insight-item {
        padding: 1rem;
        border-radius: 1rem;
        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);
        border: 1px solid var(--color-neutral-200);
      }

      .insight-item strong {
        color: var(--color-display);
      }

      @media (max-width: 960px) {
        .page-columns {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly enrollmentsApi = inject(EnrollmentsApiService);
  private readonly reportsApi = inject(ReportsApiService);
  private readonly gamificationApi = inject(GamificationApiService);

  protected readonly enrollments = signal<Enrollment[]>([]);
  protected readonly gamification = signal<any>(null);
  protected readonly userBadges = signal<any[]>([]);
  protected readonly report = signal<EmployeeReport | null>(null);

  ngOnInit() {
    const userId = this.authService.currentUser()?._id || this.authService.currentUser()?.id;
    if (!userId) {
      return;
    }

    this.enrollmentsApi.getMyEnrollments().subscribe((response) => this.enrollments.set(response));
    this.reportsApi.getEmployeeReport(userId).subscribe((response) => this.report.set(response));
    this.gamificationApi.getMyGamification().subscribe((response: any) => {
      this.gamification.set(response);
      this.userBadges.set(response.badges || []);
    });
  }

  protected completedCount() {
    return this.enrollments().filter((enrollment) => enrollment.status === 'completed').length;
  }

  protected averageProgress() {
    if (!this.enrollments().length) {
      return 0;
    }

    return Math.round(
      this.enrollments().reduce((total, enrollment) => total + enrollment.progressPercentage, 0) /
        this.enrollments().length,
    );
  }

  protected averageQuizScore() {
    const quizResults = this.report()?.quizResults || [];
    if (!quizResults.length) {
      return 0;
    }

    return Math.round(
      quizResults.reduce((total, result) => total + result.scorePercentage, 0) / quizResults.length,
    );
  }

  protected employeeInsights() {
    const quizResults = this.report()?.quizResults || [];
    const performanceRecords = this.report()?.performanceRecords || [];
    const completedCourses = this.completedCount();
    const passedQuizzes = quizResults.filter((result) => result.passed).length;

    return [
      {
        title: 'وتيرة التنفيذ',
        description: completedCourses
          ? `أنهيت ${completedCourses} من أصل ${this.enrollments().length} دورات مكلفة حتى الآن.`
          : 'لا توجد دورات مكتملة بعد، وأفضل نقطة بداية هي إنهاء أول دورة مكلّفة.',
      },
      {
        title: 'أداء الاختبارات',
        description: this.describeQuizProgress(quizResults, passedQuizzes),
      },
      {
        title: 'أثر التدريب',
        description: this.describePerformanceImpact(performanceRecords),
      },
    ];
  }

  protected describeQuizProgress(quizResults: EmployeeQuizResult[], passedQuizzes: number) {
    if (!quizResults.length) {
      return 'لم تُسجّل نتائج اختبارات بعد، لذلك لا يوجد خط أساس لقياس الاستيعاب.';
    }

    return `متوسط نتائجك ${this.averageQuizScore()}% مع اجتياز ${passedQuizzes} من ${quizResults.length} اختبارات.`;
  }

  protected describePerformanceImpact(performanceRecords: PerformanceRecord[]) {
    if (!performanceRecords.length) {
      return 'لا توجد قياسات أداء مرتبطة بتدريبك حتى الآن.';
    }

    const averageImprovement = Math.round(
      performanceRecords.reduce((total, record) => total + record.improvementPercentage, 0) /
        performanceRecords.length,
    );

    return averageImprovement > 0
      ? `سجلت مؤشراتك تحسناً متوسطه ${averageImprovement}% بعد التدريب.`
      : 'القياسات الحالية لا تظهر تحسناً واضحاً بعد، وقد تحتاج متابعة تطبيق المحتوى عملياً.';
  }

  protected courseTitle(enrollment: Enrollment) {
    return typeof enrollment.courseId === 'string'
      ? enrollment.courseId
      : enrollment.courseId?.title || 'دورة تدريبية';
  }

  protected statusLabel(status: Enrollment['status']) {
    return (
      {
        not_started: 'لم تبدأ',
        in_progress: 'قيد التنفيذ',
        completed: 'مكتملة',
        failed: 'متعثرة',
      }[status] || status
    );
  }
}
