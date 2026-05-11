import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsApiService } from '../../../core/services/reports-api.service';
import { StatCardComponent } from '../../../shared/components';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="إجمالي المستخدمين" [value]="dashboard.totals.users" />
        <app-stat-card label="الموظفون" [value]="dashboard.totals.employees" />
        <app-stat-card label="المديرون" [value]="dashboard.totals.managers" />
        <app-stat-card label="معدل الإكمال" [value]="dashboard.completionRate + '%'" tone="success" />
      </div>
    </section>
  `,
  styles: ['.stats-grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  private readonly reportsApi = inject(ReportsApiService);
  protected readonly dashboard = signal<any>(null);

  ngOnInit() {
    this.reportsApi.getAdminDashboard().subscribe((response) => this.dashboard.set(response));
  }
}

