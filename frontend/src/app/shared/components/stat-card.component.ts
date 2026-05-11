import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="stat-card card" [class.success]="tone === 'success'" [class.info]="tone === 'info'">
      <p>{{ label }}</p>
      <strong>{{ value }}</strong>
      <span *ngIf="hint">{{ hint }}</span>
    </article>
  `,
  styles: [
    `
      .stat-card {
        display: grid;
        gap: 0.55rem;
        padding: 1.25rem;
      }

      .stat-card p,
      .stat-card span {
        margin: 0;
        color: var(--color-secondary-paragraph);
      }

      .stat-card strong {
        color: var(--color-display);
        font-size: 1.8rem;
      }

      .stat-card.success {
        background: linear-gradient(180deg, #ffffff, #f4fbf7);
      }

      .stat-card.info {
        background: linear-gradient(180deg, #ffffff, #f2f8fc);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatCardComponent {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = '';
  @Input() hint = '';
  @Input() tone: 'primary' | 'success' | 'info' | 'warning' = 'primary';
}
