import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { DataTableComponent, StatCardComponent } from '../../../shared/components';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';

@Component({
  selector: 'app-employee-performance',
  standalone: true,
  imports: [CommonModule, StatCardComponent, DataTableComponent],
  template: `
    <section class="page-grid" *ngIf="user() as user">
      <div class="stats-grid">
        <app-stat-card label="الموظف" [value]="user.fullName" />
        <app-stat-card label="المسمى الوظيفي" [value]="user.jobTitle" tone="info" />
        <app-stat-card label="النقاط" [value]="user.pointsTotal" tone="success" />
      </div>

      <article class="card panel">
        <h2 class="section-title">سجل مؤشرات الأداء</h2>
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
    </section>
  `,
  styles: [
    `
      .stats-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .panel {
        padding: 1.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePerformanceComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly usersApi = inject(UsersApiService);
  private readonly reportsApi = inject(ReportsApiService);

  protected readonly user = signal<any>(null);
  protected readonly report = signal<any>(null);
  protected readonly columns = [
    { key: 'kpi', label: 'المؤشر' },
    { key: 'beforeValue', label: 'قبل' },
    { key: 'afterValue', label: 'بعد' },
    { key: 'improvement', label: 'التحسن' },
  ];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.usersApi.getUser(id).subscribe((response) => this.user.set(response));
    this.reportsApi.getEmployeeReport(id).subscribe((response) => this.report.set(response));
  }

  protected rows() {
    return (this.report()?.performanceRecords || []).map((record: any) => ({
      kpi: record.kpiId?.name || 'مؤشر',
      beforeValue: record.beforeValue,
      afterValue: record.afterValue,
      improvement: `${record.improvementPercentage}%`,
    }));
  }
}

