import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IconComponent } from './icon.component';

export interface DashboardChartItem {
  label: string;
  value: number;
  valueLabel?: string;
  hint?: string;
  tone?: 'primary' | 'success' | 'info' | 'warning';
}

@Component({
  selector: 'app-dashboard-chart-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="card chart-card">
      <div class="panel-header">
        <div>
          <h3 class="section-title label-with-icon">
            <app-icon [name]="icon" [size]="18" />
            <span>{{ title }}</span>
          </h3>
          <p class="section-subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <div class="chart-list" *ngIf="items.length; else emptyState">
        <div class="chart-row" *ngFor="let item of items">
          <div class="chart-row__head">
            <strong>{{ item.label }}</strong>
            <span>{{ item.valueLabel || item.value }}</span>
          </div>
          <div class="chart-bar">
            <span
              class="chart-bar__fill"
              [class.success]="item.tone === 'success'"
              [class.info]="item.tone === 'info'"
              [class.warning]="item.tone === 'warning'"
              [style.width.%]="barWidth(item.value)"
            ></span>
          </div>
          <p *ngIf="item.hint">{{ item.hint }}</p>
        </div>
      </div>

      <ng-template #emptyState>
        <p class="empty-copy">لا توجد بيانات كافية لعرض هذا الرسم حالياً.</p>
      </ng-template>
    </article>
  `,
  styles: [
    `
      .chart-card {
        padding: 1.4rem;
      }

      .chart-list {
        display: grid;
        gap: 1rem;
      }

      .chart-row {
        display: grid;
        gap: 0.45rem;
      }

      .chart-row__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .chart-row__head strong {
        color: var(--color-display);
      }

      .chart-row__head span,
      .chart-row p,
      .empty-copy {
        margin: 0;
        color: var(--color-secondary-paragraph);
      }

      .chart-bar {
        height: 0.72rem;
        overflow: hidden;
        border-radius: 999px;
        background: var(--color-neutral-100);
      }

      .chart-bar__fill {
        display: block;
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--color-secondary-default), #4e93c4);
      }

      .chart-bar__fill.success {
        background: linear-gradient(90deg, var(--color-primary-default), #31a26a);
      }

      .chart-bar__fill.info {
        background: linear-gradient(90deg, var(--color-info), #5da1d0);
      }

      .chart-bar__fill.warning {
        background: linear-gradient(90deg, var(--color-warning), #d79a31);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartCardComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() icon = 'chart-bars';
  @Input() scaleMax: number | null = null;
  @Input() items: DashboardChartItem[] = [];

  protected barWidth(value: number) {
    const maxValue = this.scaleMax ?? Math.max(...this.items.map((item) => item.value), 1);

    if (!maxValue || value <= 0) {
      return 0;
    }

    return Math.max(Math.round((value / maxValue) * 100), 10);
  }
}
