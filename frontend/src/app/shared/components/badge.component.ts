import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="badge-pill">
      <span class="icon"><app-icon [name]="icon" [size]="18" /></span>
      <div>
        <strong>{{ name }}</strong>
        <p *ngIf="description">{{ description }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .badge-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        border-radius: 999px;
        padding: 0.85rem 1rem;
        background: linear-gradient(135deg, #fff, #f5fbf7);
        border: 1px solid var(--color-neutral-200);
      }

      .icon {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: var(--color-primary-soft);
      }

      p,
      strong {
        margin: 0;
      }

      p {
        color: var(--color-secondary-paragraph);
        font-size: 0.85rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input() icon = 'award';
  @Input({ required: true }) name = '';
  @Input() description = '';
}
