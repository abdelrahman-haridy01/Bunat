import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastService } from '../../core/services/toast.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-toast-outlet',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="toast-stack" *ngIf="toastService.toasts().length">
      <article class="toast-card" *ngFor="let toast of toastService.toasts()" [class.error]="toast.type === 'error'">
        <div class="toast-copy">
          <span class="toast-icon">
            <app-icon [name]="toast.type === 'success' ? 'folder-check' : 'alert'" [size]="18" />
          </span>
          <p>{{ toast.message }}</p>
        </div>
        <button class="toast-close" type="button" (click)="toastService.dismiss(toast.id)" aria-label="إغلاق الإشعار">
          ×
        </button>
      </article>
    </div>
  `,
  styles: [
    `
      .toast-stack {
        position: fixed;
        top: 1rem;
        left: 1rem;
        z-index: 1200;
        display: grid;
        gap: 0.75rem;
        width: min(360px, calc(100vw - 2rem));
      }

      .toast-card {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 1rem 1rem 1rem 1.1rem;
        border-radius: 1rem;
        border: 1px solid rgba(31, 139, 76, 0.18);
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.16);
        backdrop-filter: blur(10px);
      }

      .toast-card.error {
        border-color: rgba(180, 35, 24, 0.18);
      }

      .toast-copy {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
      }

      .toast-icon {
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 0.8rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(31, 139, 76, 0.12);
        color: var(--color-success);
      }

      .toast-card.error .toast-icon {
        background: rgba(180, 35, 24, 0.12);
        color: var(--color-error-default);
      }

      p {
        margin: 0;
        color: var(--color-display);
        line-height: 1.5;
      }

      .toast-close {
        border: 0;
        background: transparent;
        color: var(--color-secondary-paragraph);
        font-size: 1.2rem;
        line-height: 1;
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastOutletComponent {
  protected readonly toastService = inject(ToastService);
}
