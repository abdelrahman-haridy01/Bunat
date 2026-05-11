import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-level-card',
  standalone: true,
  imports: [IconComponent],
  template: `
    <article class="level-card card">
      <div class="head">
        <span class="level-icon">
          <app-icon name="award" [size]="20" />
        </span>
        <p>المستوى الحالي</p>
      </div>
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

      .head {
        display: flex;
        align-items: center;
        gap: 0.7rem;
      }

      .level-icon {
        width: 2.35rem;
        height: 2.35rem;
        border-radius: 0.9rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(20, 87, 58, 0.12);
        color: var(--color-primary-default);
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
