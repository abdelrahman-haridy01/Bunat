import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-public-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="public-shell">
      <header class="public-topbar">
        <div class="public-topbar__inner card">
          <a class="brand-mark" routerLink="/home">
            <img class="brand-mark__icon" src="assets/bunat-small-logo.svg" alt="شعار بُناة" />
            <div>
              <strong>بُناة</strong>
              <p>منصة داخلية لربط التدريب بالأثر على الأداء</p>
            </div>
          </a>

          <nav class="public-nav" aria-label="التنقل العام">
            <a
              *ngFor="let link of navLinks"
              [routerLink]="link.path"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              {{ link.label }}
            </a>
          </nav>

          <div class="public-actions">
            <button class="btn btn-ghost" type="button" (click)="goToLogin()">تسجيل الدخول</button>
            <button *ngIf="isAuthenticated()" class="btn btn-secondary" type="button" (click)="goToWorkspace()">
              الانتقال إلى لوحتي
            </button>
          </div>
        </div>
      </header>

      <main class="public-main">
        <router-outlet />
      </main>

      <footer class="public-footer">
        <div class="public-footer__inner">
          <strong>بُناة</strong>
          <p>واجهة عامة تشرح الفكرة، تعرض التحديثات، ثم تنقلك إلى مساحة العمل المناسبة داخل المنصة.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .public-shell {
        min-height: 100vh;
        padding: 1rem 1.25rem 2rem;
      }

      .public-topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        padding-bottom: 1rem;
      }

      .public-topbar__inner {
        width: min(1240px, 100%);
        margin: 0 auto;
        padding: 0.9rem 1.1rem;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(18px);
      }

      .brand-mark {
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
      }

      .brand-mark__icon {
        width: 3.1rem;
        height: auto;
        flex: 0 0 auto;
      }

      .brand-mark strong {
        display: block;
        color: var(--color-display);
      }

      .brand-mark p {
        margin: 0.15rem 0 0;
        color: var(--color-secondary-paragraph);
        font-size: 0.92rem;
      }

      .public-nav {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.65rem;
      }

      .public-nav a {
        padding: 0.65rem 1rem;
        border-radius: 999px;
        color: var(--color-primary-paragraph);
        border: 1px solid transparent;
        transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
      }

      .public-nav a:hover,
      .public-nav a.is-active {
        background: rgba(15, 76, 129, 0.08);
        border-color: rgba(15, 76, 129, 0.12);
        color: var(--color-secondary-default);
      }

      .public-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .public-main,
      .public-footer__inner {
        width: min(1240px, 100%);
        margin: 0 auto;
      }

      .public-footer {
        margin-top: 1.5rem;
      }

      .public-footer__inner {
        padding: 0 0.5rem;
        color: var(--color-secondary-paragraph);
      }

      .public-footer strong {
        display: block;
        margin-bottom: 0.3rem;
        color: var(--color-display);
      }

      .public-footer p {
        margin: 0;
        line-height: 1.8;
      }

      @media (max-width: 980px) {
        .public-topbar__inner {
          grid-template-columns: 1fr;
          justify-items: stretch;
        }

        .brand-mark,
        .public-nav,
        .public-actions {
          justify-content: center;
        }
      }

      @media (max-width: 720px) {
        .public-shell {
          padding: 0.75rem 0.85rem 1.5rem;
        }

        .public-topbar__inner {
          padding: 1rem;
        }

        .public-actions,
        .public-actions .btn {
          width: 100%;
        }

        .public-actions .btn {
          justify-content: center;
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly navLinks = [
    { label: 'الرئيسية', path: '/home' },
    { label: 'عن بُناة', path: '/about' },
    { label: 'التحديثات', path: '/updates' },
  ];

  protected goToLogin() {
    this.router.navigate(['/login']);
  }

  protected goToWorkspace() {
    const user = this.authService.currentUser();
    this.router.navigateByUrl(this.authService.roleHome(user?.role));
  }
}
