import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        <div class="performer" *ngFor="let item of performers">
          <strong>{{ item.employee?.fullName }}</strong>
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
        gap: 1rem;
        padding: 0.85rem 1rem;
        border-radius: 1rem;
        background: var(--color-primary-soft);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopPerformersComponent {
  @Input() performers: any[] = [];
}
