import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerDashboardEntry } from '../../../core/models/domain.models';
import { IconComponent } from '../../../shared/components';

@Component({
  selector: 'app-top-performers',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="card panel">
      <h3 class="section-title label-with-icon">
        <app-icon name="award" [size]="18" />
        <span>الأعلى أداءً</span>
      </h3>
      <div class="performer-list">
        <div class="performer" *ngFor="let item of sortedPerformers()">
          <div class="performer-copy">
            <strong>{{ item.employee?.fullName }}</strong>
            <small>{{ item.averageProgress }}% تقدم</small>
          </div>
          <span>{{ item.employee?.pointsTotal }} نقطة</span>
        </div>
      </div>
    </article>
  `,
  styles: [
    `
      .panel {
        padding: 1.3rem;
      }

      .performer-list {
        display: grid;
        gap: 0.75rem;
      }

      .performer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1rem;
        border-radius: 1rem;
        background: var(--color-primary-soft);
      }

      .performer-copy {
        display: grid;
        gap: 0.2rem;
      }

      .performer-copy small {
        color: var(--color-secondary-paragraph);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPerformersComponent {
  @Input() performers: ManagerDashboardEntry[] = [];

  protected sortedPerformers() {
    return this.performers
      .slice()
      .sort((a, b) => {
        if (Number(b.employee?.pointsTotal) !== Number(a.employee?.pointsTotal)) {
          return Number(b.employee?.pointsTotal) - Number(a.employee?.pointsTotal);
        }

        if (b.averageProgress !== a.averageProgress) {
          return b.averageProgress - a.averageProgress;
        }

        return b.completionRate - a.completionRate;
      });
  }
}
