import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboard } from '../../../core/models/domain.models';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import {
  DashboardChartCardComponent,
  DashboardChartItem,
  IconComponent,
  StatCardComponent,
} from '../../../shared/components';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, IconComponent, DashboardChartCardComponent],
  template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="إجمالي المستخدمين" [value]="dashboard.totals.users" icon="users" />
        <app-stat-card label="الموظفون" [value]="dashboard.totals.employees" icon="briefcase" />
        <app-stat-card label="المديرون" [value]="dashboard.totals.managers" icon="shield" />
        <app-stat-card label="معدل الإكمال" [value]="dashboard.completionRate + '%'" tone="success" icon="chart" />
        <app-stat-card label="الفرق" [value]="dashboard.totals.teams" icon="team" />
        <app-stat-card
          label="سجلات الأداء"
          [value]="dashboard.totals.performanceRecords"
          tone="info"
          icon="chart-bars"
        />
      </div>

      <div class="split-grid">
        <app-dashboard-chart-card
          title="توزيع الأدوار"
          subtitle="قراءة سريعة لهيكل المستخدمين داخل المنصة."
          icon="users"
          [items]="roleDistributionItems(dashboard)"
        />

        <app-dashboard-chart-card
          title="حالة التكليفات التدريبية"
          subtitle="كيف تتوزع التسجيلات بين البدء والتنفيذ والإكمال."
          icon="chart-bars"
          [items]="enrollmentDistributionItems(dashboard)"
        />
      </div>

      <article class="card insight-panel">
        <div class="panel-header">
          <div>
            <h3 class="section-title label-with-icon">
              <app-icon name="sparkles" [size]="18" />
              <span>مؤشرات تنفيذية</span>
            </h3>
            <p class="section-subtitle">أبرز الإشارات التي تساعد الإدارة على قراءة الحالة العامة بسرعة.</p>
          </div>
        </div>

        <div class="insight-grid">
          <article class="insight-item" *ngFor="let insight of adminInsights(dashboard)">
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
      .split-grid,
      .insight-grid {
        display: grid;
        gap: 1rem;
      }

      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .split-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .insight-panel {
        padding: 1.4rem;
      }

      .insight-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

      .insight-item p {
        margin: 0.4rem 0 0;
        color: var(--color-secondary-paragraph);
      }

      @media (max-width: 960px) {
        .split-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent implements OnInit {
  private readonly reportsApi = inject(ReportsApiService);
  protected readonly dashboard = signal<AdminDashboard | null>(null);

  ngOnInit() {
    this.reportsApi.getAdminDashboard().subscribe((response) => this.dashboard.set(response));
  }

  protected roleDistributionItems(dashboard: AdminDashboard): DashboardChartItem[] {
    return dashboard.roleDistribution.map((item) => {
      const tone: DashboardChartItem['tone'] =
        item.role === 'employee' ? 'success' : item.role === 'manager' ? 'info' : 'warning';

      return {
        label: this.roleLabel(item.role),
        value: item.count,
        valueLabel: `${item.count}`,
        hint: `${Math.round((item.count / Math.max(dashboard.totals.users, 1)) * 100)}% من المستخدمين`,
        tone,
      };
    });
  }

  protected enrollmentDistributionItems(dashboard: AdminDashboard): DashboardChartItem[] {
    return dashboard.enrollmentStatusDistribution.map((item) => {
      const tone: DashboardChartItem['tone'] =
        item.status === 'completed' ? 'success' : item.status === 'in_progress' ? 'info' : 'warning';

      return {
        label: this.statusLabel(item.status),
        value: item.count,
        valueLabel: `${item.count}`,
        hint: `${Math.round((item.count / Math.max(dashboard.totals.enrollments, 1)) * 100)}% من الإجمالي`,
        tone,
      };
    });
  }

  protected adminInsights(dashboard: AdminDashboard) {
    return [
      {
        title: 'تغطية الإدارة المباشرة',
        description: `${dashboard.managerCoverageRate}% من الموظفين مرتبطون بمدير مباشر، بمتوسط ${dashboard.averageEmployeesPerManager} موظف لكل مدير.`,
      },
      {
        title: 'أثر التدريب على الأداء',
        description:
          dashboard.performanceSummary.improvedCount > 0
            ? `${dashboard.performanceSummary.improvedCount} سجل أداء يظهر تحسناً، ومتوسط التحسن العام ${dashboard.performanceSummary.averageImprovement}%.`
            : 'لا تظهر سجلات الأداء الحالية تحسناً ملموساً بعد على مستوى المؤسسة.',
      },
      {
        title: 'تماسك الفرق',
        description: dashboard.totals.teams
          ? `متوسط حجم الفريق ${dashboard.averageMembersPerTeam} عضو، مع ${dashboard.totals.teams} فرق مسجلة داخل النظام.`
          : 'لا توجد فرق معرفة بعد داخل النظام، مما يحد من قراءة الأداء على مستوى المجموعات.',
      },
    ];
  }

  protected roleLabel(role: AdminDashboard['roleDistribution'][number]['role']) {
    return (
      {
        employee: 'الموظفون',
        manager: 'المديرون',
        admin: 'الإدارة',
        hr: 'الموارد البشرية',
      }[role] || role
    );
  }

  protected statusLabel(status: AdminDashboard['enrollmentStatusDistribution'][number]['status']) {
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
