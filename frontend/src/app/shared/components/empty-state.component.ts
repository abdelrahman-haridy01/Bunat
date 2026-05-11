import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="empty card">
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </div>
  `,
  styles: [
    `
      .empty {
        padding: 2rem;
        text-align: center;
      }

      p {
        margin: 0.75rem 0 0;
        color: var(--color-secondary-paragraph);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  @Input() title = 'لا توجد بيانات';
  @Input() description = 'ستظهر النتائج هنا عند توفرها.';
}

