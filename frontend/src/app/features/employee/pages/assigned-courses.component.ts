import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { EmptyStateComponent, ProgressBarComponent } from '../../../shared/components';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import { Enrollment } from '../../../core/models/domain.models';

@Component({
  selector: 'app-assigned-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent, EmptyStateComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">الدورات المخصصة لي</h2>
            <p class="section-subtitle">تابع الدورات حسب حالة الإنجاز والموعد المستهدف.</p>
          </div>
        </div>

        <div class="course-grid" *ngIf="enrollments().length; else empty">
          <article class="course-card" *ngFor="let enrollment of enrollments()">
            <div class="panel-header">
              <div>
                <strong>{{ courseTitle(enrollment) }}</strong>
                <p class="section-subtitle">{{ statusLabel(enrollment.status) }}</p>
              </div>
              <span class="status-chip" [class.success]="enrollment.status === 'completed'" [class.info]="enrollment.status === 'in_progress'" [class.warning]="enrollment.status === 'not_started'">
                {{ dueDateLabel(enrollment) }}
              </span>
            </div>

            <app-progress-bar [value]="enrollment.progressPercentage" />
            <a class="btn btn-secondary" [routerLink]="['/employee/courses', enrollment.courseId && objectId(enrollment.courseId)]">تفاصيل الدورة</a>
          </article>
        </div>
      </article>
    </section>

    <ng-template #empty>
      <app-empty-state title="لا توجد دورات مخصصة" description="عند تكليفك بدورات ستظهر هنا مباشرة." />
    </ng-template>
  `,
  styles: [
    `
      .panel {
        padding: 1.5rem;
      }

      .course-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }

      .course-card {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--radius-md);
      }

      strong {
        color: var(--color-display);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignedCoursesComponent implements OnInit {
  private readonly enrollmentsApi = inject(EnrollmentsApiService);

  protected readonly enrollments = signal<Enrollment[]>([]);

  ngOnInit() {
    this.enrollmentsApi.getMyEnrollments().subscribe((response) => this.enrollments.set(response));
  }

  protected courseTitle(enrollment: Enrollment) {
    return typeof enrollment.courseId === 'string'
      ? enrollment.courseId
      : enrollment.courseId?.title || 'دورة تدريبية';
  }

  protected objectId(value: Enrollment['courseId']) {
    return typeof value === 'string' ? value : value?._id || value?.id || '';
  }

  protected dueDateLabel(enrollment: Enrollment) {
    return enrollment.dueDate ? `استحقاق ${new Date(enrollment.dueDate).toLocaleDateString('ar-SA')}` : 'دون موعد';
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

