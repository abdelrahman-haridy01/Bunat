import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableComponent } from '../../../shared/components';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';

@Component({
  selector: 'app-team-overview',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">نظرة على تكليفات الفريق</h2>
            <p class="section-subtitle">متابعة مباشرة لحالة التدريب لكل عضو.</p>
          </div>
        </div>

        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
    </section>
  `,
  styles: ['.panel { padding: 1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamOverviewComponent implements OnInit {
  private readonly enrollmentsApi = inject(EnrollmentsApiService);

  protected readonly columns = [
    { key: 'employee', label: 'الموظف' },
    { key: 'course', label: 'الدورة' },
    { key: 'status', label: 'الحالة' },
    { key: 'progress', label: 'التقدّم' },
  ];

  protected readonly rows = signal<Record<string, unknown>[]>([]);

  ngOnInit() {
    this.enrollmentsApi.getTeamEnrollments().subscribe((response) => {
      this.rows.set(
        response.map((item) => ({
          employee: typeof item.userId === 'string' ? item.userId : item.userId?.fullName || 'موظف',
          course: typeof item.courseId === 'string' ? item.courseId : item.courseId?.title || 'دورة',
          status: item.status,
          progress: `${item.progressPercentage}%`,
        })),
      );
    });
  }
}
