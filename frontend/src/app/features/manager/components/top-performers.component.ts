import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-performers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="card panel">
      <h3 class="section-title">الأعلى أداءً</h3>
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

