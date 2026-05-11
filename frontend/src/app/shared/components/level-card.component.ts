import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-level-card',
  standalone: true,
  template: `
    <article class="level-card card">
      <p>المستوى الحالي</p>
      <strong>{{ name || 'غير محدد' }}</strong>
      <span>{{ points }} نقطة</span>
    </article>
  `,
  styles: [
    `
      .level-card {
        display: grid;
        gap: 0.5rem;
        padding: 1.25rem;
        background: linear-gradient(135deg, rgba(20, 87, 58, 0.08), #fff);
      }

      p,
      span {
        margin: 0;
        color: var(--color-secondary-paragraph);
      }

      strong {
        font-size: 1.4rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LevelCardComponent {
  @Input() name = '';
  @Input() points = 0;
}

