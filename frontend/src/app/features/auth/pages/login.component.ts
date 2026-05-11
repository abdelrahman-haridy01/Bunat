import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-layout">
      <section class="hero">
        <span class="status-chip info">Bunat / بُناة</span>
        <h1>منصة داخلية تربط التدريب بأثرٍ قابل للقياس.</h1>
        <p>
          صُممت بُناة لمساعدة الموظف والمدير والإدارة على متابعة التعلّم، التقدّم، ومؤشرات
          الأداء ضمن تجربة عربية واضحة.
        </p>

        <div class="credentials card">
          <strong>حسابات التجرِبة</strong>
          <ul>
            <li><b>admin@bunat.local</b> / <span>Password123!</span></li>
            <li><b>hr@bunat.local</b> / <span>Password123!</span></li>
            <li><b>manager@bunat.local</b> / <span>Password123!</span></li>
            <li><b>employee1@bunat.local</b> / <span>Password123!</span></li>
          </ul>
        </div>
      </section>

      <section class="login-card card">
        <div class="panel-header">
          <div>
            <h2 class="section-title">تسجيل الدخول</h2>
            <p class="section-subtitle">استخدم بريدك الوظيفي للوصول إلى لوحة الدور المناسبة.</p>
          </div>
        </div>

        <form [formGroup]="form" (ngSubmit)="submit()" class="page-grid">
          <div class="field">
            <label for="email">البريد الإلكتروني</label>
            <input id="email" type="email" formControlName="email" />
          </div>

          <div class="field">
            <label for="password">كلمة المرور</label>
            <input id="password" type="password" formControlName="password" />
          </div>

          <div class="message-box error" *ngIf="error()">{{ error() }}</div>

          <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading()">
            {{ loading() ? 'جارٍ التحقق...' : 'دخول' }}
          </button>
        </form>
      </section>
    </div>
  `,
  styles: [
    `
      .login-layout {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 1.1fr minmax(320px, 520px);
        gap: 2rem;
        align-items: center;
        padding: 2rem;
      }

      .hero {
        padding: 2rem;
      }

      .hero h1 {
        margin: 1rem 0;
        max-width: 12ch;
        color: var(--color-display);
        font-size: clamp(2.2rem, 4vw, 4rem);
        line-height: 1.2;
      }

      .hero p {
        max-width: 60ch;
        color: var(--color-primary-paragraph);
        font-size: 1.05rem;
      }

      .credentials {
        margin-top: 1.5rem;
        padding: 1.25rem;
      }

      .credentials ul {
        margin: 0.75rem 0 0;
        padding: 0 1rem 0 0;
        color: var(--color-secondary-paragraph);
      }

      .login-card {
        padding: 2rem;
      }

      @media (max-width: 950px) {
        .login-layout {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly loading = signal(false);
  protected readonly error = signal('');

  protected readonly form = this.fb.nonNullable.group({
    email: ['admin@bunat.local', [Validators.required, Validators.email]],
    password: ['Password123!', [Validators.required, Validators.minLength(6)]],
  });

  protected submit() {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.form.getRawValue().email, this.form.getRawValue().password).subscribe({
      next: (session) => {
        this.authService.persistSession(session);
        this.router.navigateByUrl(this.authService.roleHome(session.user.role));
      },
      error: () => {
        this.error.set('تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}

