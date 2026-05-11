import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyStateComponent, IconComponent } from '../../../shared/components';

@Component({
  selector: 'app-needs-support',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent, IconComponent],
  template: `
    <article class="card panel">
      <h3 class="section-title label-with-icon">
        <app-icon name="alert" [size]="18" />
        <span>يحتاجون دعماً</span>
      </h3>
      <div class="support-list" *ngIf="employees.length; else empty">
        <div class="support-item" *ngFor="let item of employees">
          <strong>{{ item.employee?.fullName }}</strong>
          <span>{{ item.completionRate }}% إنجاز</span>
        </div>
      </div>
    </article>

    <ng-template #empty>
      <app-empty-state
        icon="shield"
        title="لا توجد حالات حرجة"
        description="جميع أعضاء الفريق في مستوى تقدم مقبول."
      />
    </ng-template>
  `,
  styles: [
    `
      .panel {
        padding: 1.3rem;
      }

      .support-list {
        display: grid;
        gap: 0.75rem;
      }

      .support-item {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.85rem 1rem;
        border-radius: 1rem;
        background: var(--color-warning-light);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeedsSupportComponent {
  @Input() employees: any[] = [];
}
