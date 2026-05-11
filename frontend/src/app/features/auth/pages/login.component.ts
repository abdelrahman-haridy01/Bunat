import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components';
import {
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, IconComponent],
  template: `
    <div class="login-shell">
      <section class="login-layout">
        <aside class="login-intro">
          <a class="back-link" routerLink="/home">
            <app-icon name="book-open" [size]="18" />
            <span>العودة إلى صفحة العرض</span>
          </a>

          <span class="eyebrow">الوصول إلى المنصة</span>
          <h1>اختر الدور الذي تريد عرضه ثم ادخل مباشرة إلى اللوحة المناسبة.</h1>
          <p>
            هذه الصفحة مخصصة للدخول فقط. إذا كنت تقدّم المشروع، فابدأ من صفحة العرض الرئيسية ثم
            عد إلى هنا عند الحاجة للتنقل بين الأدوار.
          </p>

          <div class="demo-accounts">
            <button
              class="demo-account"
              type="button"
              *ngFor="let account of demoAccounts"
              (click)="applyDemoAccount(account.email)"
            >
              <span class="demo-account__role">{{ account.role }}</span>
              <strong>{{ account.email }}</strong>
              <small>{{ account.note }}</small>
            </button>
          </div>

          <div class="password-note">
            <app-icon name="shield" [size]="18" />
            <span>كلمة المرور لجميع الحسابات: <b>Password123!</b></span>
          </div>
        </aside>

        <section class="login-card card">
          <div class="panel-header">
            <div>
              <h2 class="section-title">تسجيل الدخول</h2>
              <p class="section-subtitle">استخدم الحساب المناسب للدور الذي تريد استعراضه.</p>
            </div>
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()" class="page-grid" novalidate>
            <div class="field">
              <label for="email">البريد الإلكتروني</label>
              <input id="email" type="email" formControlName="email" [class.is-invalid]="hasVisibleError(form.controls.email)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.email)">
                {{ getVisibleErrorMessage(form.controls.email, validationMessages.email) }}
              </div>
            </div>

            <div class="field">
              <label for="password">كلمة المرور</label>
              <input
                id="password"
                type="password"
                formControlName="password"
                [class.is-invalid]="hasVisibleError(form.controls.password)"
              />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.password)">
                {{ getVisibleErrorMessage(form.controls.password, validationMessages.password) }}
              </div>
            </div>

            <button class="btn btn-primary login-submit" type="submit" [disabled]="form.invalid || loading()">
              {{ loading() ? 'جارٍ التحقق...' : 'دخول' }}
            </button>
          </form>
        </section>
      </section>
    </div>
  `,
  styles: [
    `
      .login-shell {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 1.25rem;
      }

      .login-layout {
        width: min(1180px, 100%);
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
        gap: 1rem;
      }

      .login-intro,
      .login-card {
        padding: 1.4rem;
        border-radius: 28px;
      }

      .login-intro {
        background:
          radial-gradient(circle at top left, rgba(209, 238, 223, 0.86), transparent 26%),
          linear-gradient(135deg, #f8fcf8 0%, #eef5fc 100%);
        border: 1px solid rgba(20, 87, 58, 0.08);
        box-shadow: 0 24px 60px rgba(24, 39, 75, 0.06);
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        margin-bottom: 1rem;
        color: var(--color-secondary-default);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.78);
        border: 1px solid rgba(15, 76, 129, 0.12);
        color: var(--color-secondary-default);
        font-size: 0.85rem;
        font-weight: 600;
      }

      .login-intro h1 {
        margin: 1rem 0 0.75rem;
        color: var(--color-display);
        font-size: clamp(2rem, 4vw, 3.3rem);
        line-height: 1.2;
      }

      .login-intro p {
        margin: 0;
        color: var(--color-primary-paragraph);
        line-height: 1.85;
      }

      .demo-accounts {
        display: grid;
        gap: 0.75rem;
        margin-top: 1.5rem;
      }

      .demo-account {
        width: 100%;
        border: 1px solid rgba(15, 76, 129, 0.14);
        border-radius: 18px;
        padding: 0.95rem 1rem;
        background: rgba(255, 255, 255, 0.84);
        display: grid;
        gap: 0.2rem;
        text-align: right;
        cursor: pointer;
      }

      .demo-account:hover {
        border-color: rgba(20, 87, 58, 0.28);
        transform: translateY(-1px);
      }

      .demo-account__role {
        color: var(--color-secondary-default);
        font-size: 0.82rem;
        font-weight: 700;
      }

      .demo-account small {
        color: var(--color-secondary-paragraph);
      }

      .password-note {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        margin-top: 1rem;
        padding: 0.75rem 0.9rem;
        border-radius: 999px;
        background: var(--color-primary-soft);
        color: var(--color-primary-default);
      }

      .login-card {
        background: rgba(255, 255, 255, 0.94);
      }

      .login-submit {
        width: 100%;
        justify-content: center;
      }

      @media (max-width: 980px) {
        .login-layout {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        .login-shell {
          padding: 0.85rem;
        }

        .login-intro,
        .login-card {
          padding: 1rem;
        }

        .password-note,
        .back-link {
          align-items: flex-start;
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
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly demoAccounts = [
    {
      email: 'admin@bunat.local',
      role: 'مدير النظام',
      note: 'إدارة المستخدمين والدورات والمؤشرات',
    },
    {
      email: 'hr@bunat.local',
      role: 'الموارد البشرية',
      note: 'تكليف التدريب وربطه بالأثر المؤسسي',
    },
    {
      email: 'manager@bunat.local',
      role: 'المدير',
      note: 'متابعة الفريق وتقدم الأعضاء',
    },
    {
      email: 'employee1@bunat.local',
      role: 'الموظف',
      note: 'تجربة تنفيذ التعلم من منظور المستخدم النهائي',
    },
  ];
  protected readonly validationMessages = {
    email: {
      required: 'أدخل البريد الإلكتروني.',
      email: 'أدخل بريداً إلكترونياً صحيحاً.',
    },
    password: {
      required: 'أدخل كلمة المرور.',
      minlength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',
    },
  };

  protected readonly form = this.fb.nonNullable.group({
    email: ['admin@bunat.local', [Validators.required, Validators.email]],
    password: ['Password123!', [Validators.required, Validators.minLength(6)]],
  });

  protected applyDemoAccount(email: string) {
    this.form.patchValue({
      email,
      password: 'Password123!',
    });
  }

  protected submit() {
    if (this.form.invalid || this.loading()) {
      touchAllControls(this.form);
      return;
    }

    this.loading.set(true);

    this.authService.login(this.form.getRawValue().email, this.form.getRawValue().password).subscribe({
      next: (session) => {
        this.authService.persistSession(session);
        this.router.navigateByUrl(this.authService.roleHome(session.user.role));
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }
}
