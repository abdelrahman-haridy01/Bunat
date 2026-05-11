import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsApiService } from '../../../core/services/reports-api.service';
import { IconComponent, StatCardComponent } from '../../../shared/components';
import { NeedsSupportComponent } from '../components/needs-support.component';
import { TopPerformersComponent } from '../components/top-performers.component';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, IconComponent, StatCardComponent, TopPerformersComponent, NeedsSupportComponent],
  template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="عدد أعضاء الفريق" [value]="dashboard.teamMembers.length" icon="team" />
        <app-stat-card label="الأعلى أداءً" [value]="dashboard.topPerformers.length" tone="success" icon="award" />
        <app-stat-card label="بحاجة إلى دعم" [value]="dashboard.needsSupport.length" tone="info" icon="alert" />
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

  protected readonly dashboard = signal<any>(null);

  ngOnInit() {
    this.reportsApi.getManagerDashboard().subscribe((response) => this.dashboard.set(response));
  }
}
