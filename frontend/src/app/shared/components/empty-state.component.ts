import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="empty card">
      <div class="empty-icon">
        <app-icon [name]="icon" [size]="22" />
      </div>
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </div>
  `,
  styles: [
    `
      .empty {
        display: grid;
        justify-items: center;
        gap: 0.6rem;
        padding: 2rem;
        text-align: center;
      }

      .empty-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 1rem;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, rgba(20, 87, 58, 0.1), rgba(15, 76, 129, 0.1));
        color: var(--color-secondary-default);
      }

      p {
        margin: 0;
        color: var(--color-secondary-paragraph);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() icon = 'folder-check';
  @Input() title = 'لا توجد بيانات';
  @Input() description = 'ستظهر النتائج هنا عند توفرها.';
}
