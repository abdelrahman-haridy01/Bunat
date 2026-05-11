import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  template: `
    <div class="progress-shell">
      <div class="progress-track">
        <div class="progress-fill" [style.width.%]="value"></div>
      </div>
      <span>{{ value }}%</span>
    </div>
  `,
  styles: [
    `
      .progress-shell {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .progress-track {
        flex: 1;
        height: 0.75rem;
        border-radius: 999px;
        background: var(--color-neutral-100);
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--color-secondary-default), var(--color-primary-default));
      }

      span {
        color: var(--color-secondary-paragraph);
        font-size: 0.88rem;
        min-width: 3rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input({ required: true }) value = 0;
}

