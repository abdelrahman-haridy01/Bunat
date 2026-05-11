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
import { Enrollment } from '../../../core/models/domain.models';

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
              <p class="section-subtitle">اعرض آخر حالة لكل دورة مخصصة.</p>
            </div>
            <a routerLink="/employee/courses" class="btn btn-secondary">
              <span class="btn-content">
                <app-icon name="eye" [size]="18" />
                <span>عرض الكل</span>
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
      .badge-list {
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

      .course-item p {
        margin: 0.35rem 0 0;
        color: var(--color-secondary-paragraph);
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

  ngOnInit() {
    const userId = this.authService.currentUser()?._id || this.authService.currentUser()?.id;
    if (!userId) {
      return;
    }

    this.enrollmentsApi.getMyEnrollments().subscribe((response) => this.enrollments.set(response));
    this.reportsApi.getEmployeeReport(userId).subscribe();
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
