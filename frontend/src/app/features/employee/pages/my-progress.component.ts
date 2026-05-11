import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../core/services/auth.service';
import { GamificationApiService } from '../../../core/services/gamification-api.service';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import {
  BadgeComponent,
  DataTableComponent,
  EmptyStateComponent,
  LevelCardComponent,
  StatCardComponent,
} from '../../../shared/components';

@Component({
  selector: 'app-my-progress',
  standalone: true,
  imports: [
    CommonModule,
    StatCardComponent,
    LevelCardComponent,
    BadgeComponent,
    DataTableComponent,
    EmptyStateComponent,
  ],
  template: `
    <section class="page-grid">
      <div class="stats-grid" *ngIf="gamification() as summary">
        <app-level-card [name]="summary.user?.levelId?.name || 'غير محدد'" [points]="summary.user?.pointsTotal || 0" />
        <app-stat-card label="عدد الشارات" [value]="(summary.badges || []).length" />
        <app-stat-card label="آخر العمليات" [value]="(summary.recentTransactions || []).length" tone="info" />
      </div>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">الشارات</h2>
            <p class="section-subtitle">الإنجازات التي حصلت عليها حتى الآن.</p>
          </div>
        </div>

        <div class="badge-list" *ngIf="gamification()?.badges?.length; else noBadges">
          <app-badge
            *ngFor="let badge of gamification()?.badges"
            [name]="badge.badgeId?.name || 'شارة'"
            [description]="badge.badgeId?.description || ''"
          />
        </div>
      </article>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">أثر التدريب على المؤشرات</h2>
            <p class="section-subtitle">يعرض قيم ما قبل التدريب وما بعده ونسبة التحسن.</p>
          </div>
        </div>

        <app-data-table [columns]="columns" [rows]="reportRows()" />
      </article>
    </section>

    <ng-template #noBadges>
      <app-empty-state title="لم يتم منح أي شارة بعد" description="استمر في تنفيذ الأنشطة التدريبية." />
    </ng-template>
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

      .badge-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.85rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyProgressComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly gamificationApi = inject(GamificationApiService);
  private readonly reportsApi = inject(ReportsApiService);

  protected readonly gamification = signal<any>(null);
  protected readonly report = signal<any>(null);

  protected readonly columns = [
    { key: 'kpi', label: 'المؤشر' },
    { key: 'beforeValue', label: 'قبل' },
    { key: 'afterValue', label: 'بعد' },
    { key: 'improvementPercentage', label: 'التحسن %' },
  ];

  ngOnInit() {
    const userId = this.authService.currentUser()?._id || this.authService.currentUser()?.id;
    if (!userId) {
      return;
    }

    this.gamificationApi.getMyGamification().subscribe((response) => this.gamification.set(response));
    this.reportsApi.getEmployeeReport(userId).subscribe((response) => this.report.set(response));
  }

  protected reportRows() {
    return (this.report()?.performanceRecords || []).map((record: any) => ({
      kpi: record.kpiId?.name || 'مؤشر',
      beforeValue: record.beforeValue,
      afterValue: record.afterValue,
      improvementPercentage: `${record.improvementPercentage}%`,
    }));
  }
}

