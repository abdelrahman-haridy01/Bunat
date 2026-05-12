import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerDashboard, ManagerDashboardEntry } from '../../../core/models/domain.models';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import {
  DashboardChartCardComponent,
  DashboardChartItem,
  IconComponent,
  StatCardComponent,
} from '../../../shared/components';
import { NeedsSupportComponent } from '../components/needs-support.component';
import { TopPerformersComponent } from '../components/top-performers.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    StatCardComponent,
    TopPerformersComponent,
    NeedsSupportComponent,
    DashboardChartCardComponent,
  ],
  template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="عدد أعضاء الفريق" [value]="dashboard.teamMembers.length" icon="team" />
        <app-stat-card label="الأعلى أداءً" [value]="dashboard.topPerformers.length" tone="success" icon="award" />
        <app-stat-card label="بحاجة إلى دعم" [value]="dashboard.needsSupport.length" tone="info" icon="alert" />
        <app-stat-card label="متوسط الإنجاز" [value]="averageCompletion(dashboard) + '%'" tone="success" icon="chart" />
      </div>

      <div class="split-grid">
        <app-dashboard-chart-card
          title="تقدّم الفريق"
          subtitle="نسبة الإنجاز الحالية لأعضاء الفريق الأكثر نشاطاً."
          icon="chart-bars"
          [items]="teamCompletionItems(dashboard.teamMembers)"
          [scaleMax]="100"
        />

        <article class="card insight-panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="sparkles" [size]="18" />
                <span>قراءة تنفيذية</span>
              </h3>
              <p class="section-subtitle">أبرز الإشارات التي تستحق انتباه المدير حالياً.</p>
            </div>
          </div>

          <div class="insight-list">
            <article class="insight-item" *ngFor="let insight of managerInsights(dashboard)">
              <strong>{{ insight.title }}</strong>
              <p>{{ insight.description }}</p>
            </article>
          </div>
        </article>
      </div>

      <div class="split-grid">
        <app-top-performers [performers]="dashboard.topPerformers" />
        <app-needs-support [employees]="dashboard.needsSupport" />
      </div>
    </section>
  `,
  styles: [
    `
      .stats-grid,
      .split-grid {
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

      .insight-list {
        display: grid;
        gap: 0.9rem;
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
export class ManagerDashboardComponent implements OnInit {
  private readonly reportsApi = inject(ReportsApiService);

  protected readonly dashboard = signal<ManagerDashboard | null>(null);

  ngOnInit() {
    this.reportsApi.getManagerDashboard().subscribe((response) => this.dashboard.set(response));
  }

  protected averageCompletion(dashboard: ManagerDashboard) {
    if (!dashboard.teamMembers.length) {
      return 0;
    }

    return Math.round(
      dashboard.teamMembers.reduce((sum, member) => sum + member.completionRate, 0) / dashboard.teamMembers.length,
    );
  }

  protected teamCompletionItems(teamMembers: ManagerDashboardEntry[]): DashboardChartItem[] {
    return teamMembers
      .slice()
      .sort((a, b) => b.completionRate - a.completionRate)
      .slice(0, 6)
      .map((member) => {
        const tone: DashboardChartItem['tone'] =
          member.completionRate >= 75 ? 'success' : member.completionRate >= 50 ? 'info' : 'warning';

        return {
          label: member.employee?.fullName || 'عضو فريق',
          value: member.completionRate,
          valueLabel: `${member.completionRate}%`,
          hint:
            member.latestImprovement > 0
              ? `تحسن آخر قدره ${member.latestImprovement}%`
              : 'لا يوجد تحسن مسجل حديثاً',
          tone,
        };
      });
  }

  protected managerInsights(dashboard: ManagerDashboard) {
    const bestPerformer = dashboard.topPerformers[0];
    const bestImprovement = dashboard.teamMembers
      .slice()
      .sort((a, b) => b.latestImprovement - a.latestImprovement)[0];
    const supportShare = dashboard.teamMembers.length
      ? Math.round((dashboard.needsSupport.length / dashboard.teamMembers.length) * 100)
      : 0;

    return [
      {
        title: 'أفضل زخم حالياً',
        description: bestPerformer
          ? `${bestPerformer.employee?.fullName} يتصدر الفريق حالياً بـ ${bestPerformer.employee?.pointsTotal} نقطة.`
          : 'لا يوجد متصدر واضح لأن الفريق لا يحتوي على بيانات كافية بعد.',
      },
      {
        title: 'أسرع تحسن',
        description: bestImprovement?.latestImprovement
          ? `${bestImprovement.employee?.fullName} سجل آخر تحسن بمقدار ${bestImprovement.latestImprovement}%.`
          : 'لا توجد تحسينات أداء مسجلة حديثاً على مستوى الفريق.',
      },
      {
        title: 'الاحتياج للدعم',
        description: supportShare
          ? `${supportShare}% من الفريق دون مستوى الإنجاز المستهدف حالياً ويحتاجون متابعة أقرب.`
          : 'لا توجد حالات حرجة حالياً، ومستوى الإنجاز ضمن النطاق المقبول لكل الفريق.',
      },
    ];
  }
}
