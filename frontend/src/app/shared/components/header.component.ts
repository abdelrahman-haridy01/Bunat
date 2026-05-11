import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header card">
      <div>
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
      </div>

      <div class="actions">
        <div class="user-box" *ngIf="authService.currentUser() as user">
          <strong>{{ user.fullName }}</strong>
          <span>{{ user.jobTitle }}</span>
        </div>

        <button class="btn btn-secondary" type="button" (click)="authService.logout()">تسجيل الخروج</button>
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1.4rem 1.6rem;
      }

      .eyebrow {
        margin: 0 0 0.35rem;
        color: var(--color-secondary-default);
        font-size: 0.85rem;
        font-weight: 700;
      }

      h1 {
        margin: 0;
        color: var(--color-display);
        font-size: 1.55rem;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .user-box {
        display: grid;
        gap: 0.15rem;
        text-align: left;
      }

      .user-box span {
        color: var(--color-secondary-paragraph);
        font-size: 0.9rem;
      }

      @media (max-width: 900px) {
        .header {
          flex-direction: column;
          align-items: stretch;
        }

        .actions {
          justify-content: space-between;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) title = '';
  @Input() eyebrow = 'لوحة المتابعة';

  protected readonly authService = inject(AuthService);
}

