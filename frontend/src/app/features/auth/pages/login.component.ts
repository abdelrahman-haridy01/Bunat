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
      <div class="login-backdrop"></div>

      <section class="login-layout">
        <aside class="login-intro">
          <a class="back-link" routerLink="/home">
            <app-icon name="book-open" [size]="18" />
            <span>العودة إلى الصفحة الرئيسية</span>
          </a>

          <div class="brand-mark">
            <span class="brand-mark__badge">بُناة</span>
            <span class="eyebrow">منصة ربط التدريب بالأثر</span>
          </div>

          <h1>واجهة دخول جاهزة للتنقل بين أدوار المنصة بثقة ووضوح.</h1>
          <p class="intro-copy">
            ادخل بالحساب المناسب لتجربة مسار الموظف أو المدير أو الإدارة. تم تصميم هذه الشاشة لتبدو
            كواجهة منتج نهائية مع إبقاء الحسابات التجريبية مرئية وسهلة الاستخدام.
          </p>

          <div class="intro-grid">
            <article class="intro-stat">
              <strong>4</strong>
              <span>أدوار جاهزة للتجربة</span>
            </article>
            <article class="intro-stat">
              <strong>6+</strong>
              <span>دورات ومسارات نشطة</span>
            </article>
            <article class="intro-stat">
              <strong>لحظي</strong>
              <span>تتبع التقدم والأثر</span>
            </article>
          </div>

          <div class="intro-highlights">
            <div class="intro-highlight">
              <app-icon name="target" [size]="18" />
              <span>رحلة واضحة من تسجيل الدخول إلى لوحة الدور المناسبة.</span>
            </div>
            <div class="intro-highlight">
              <app-icon name="shield" [size]="18" />
              <span>حسابات تجريبية موحدة لتبديل الأدوار بسرعة أثناء التنقل.</span>
            </div>
            <div class="intro-highlight">
              <app-icon name="bolt" [size]="18" />
              <span>تجربة عربية كاملة بمظهر مؤسسي نهائي بدلاً من شاشة دخول مؤقتة.</span>
            </div>
          </div>
        </aside>

        <section class="login-card card">
          <div class="login-card__top">
            <div>
              <span class="login-card__label">الدخول إلى الحساب</span>
              <h2 class="section-title">تسجيل الدخول</h2>
              <p class="section-subtitle">استخدم الحساب المناسب للدور الذي تريد استعراضه.</p>
            </div>

            <div class="password-note">
              <app-icon name="shield" [size]="18" />
              <span>كلمة المرور: <b>Password123!</b></span>
            </div>
          </div>

          <form [formGroup]="form" (ngSubmit)="submit()" class="page-grid" novalidate>
            <div class="field">
              <label for="email">البريد الإلكتروني</label>
              <input
                id="email"
                type="email"
                formControlName="email"
                [class.is-invalid]="hasVisibleError(form.controls.email)"
              />
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
              {{ loading() ? 'جارٍ التحقق...' : 'دخول إلى اللوحة' }}
            </button>
          </form>

          <div class="login-card__footer">
            <span>سيتم توجيهك مباشرة إلى لوحة الدور المرتبطة بالحساب بعد نجاح تسجيل الدخول.</span>
          </div>
        </section>
      </section>

      <section class="accounts-panel card">
        <div class="accounts-panel__header">
          <div>
            <span class="eyebrow eyebrow--muted">حسابات تجريبية</span>
            <h2 class="section-title">معلومات المستخدمين</h2>
            <p class="section-subtitle">تبقى ظاهرة أسفل الصفحة للاستخدام السريع أثناء التنقل.</p>
          </div>
        </div>

        <div class="demo-accounts">
          <button
            class="demo-account"
            type="button"
            *ngFor="let account of demoAccounts"
            (click)="applyDemoAccount(account.email)"
          >
            <div class="demo-account__head">
              <span class="demo-account__role">{{ account.role }}</span>
              <span class="demo-account__action">استخدام الحساب</span>
            </div>
            <strong>{{ account.email }}</strong>
            <small>{{ account.note }}</small>
          </button>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .login-shell {
        min-height: 100vh;
        position: relative;
        overflow: hidden;
        padding: 2rem 1.25rem 3rem;
      }

      .login-backdrop {
        position: absolute;
        inset: 0;
        background:
          radial-gradient(circle at top right, rgba(15, 76, 129, 0.18), transparent 28%),
          radial-gradient(circle at left 20%, rgba(20, 87, 58, 0.16), transparent 30%),
          linear-gradient(145deg, #fbfcff 0%, #eff4f8 48%, #f7fbf7 100%);
        pointer-events: none;
      }

      .login-layout {
        position: relative;
        width: min(1180px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(340px, 430px);
        gap: 1.25rem;
        align-items: stretch;
      }

      .login-intro,
      .login-card {
        padding: 1.75rem;
        border-radius: 30px;
      }

      .login-intro {
        background:
          radial-gradient(circle at top left, rgba(223, 242, 231, 0.95), transparent 26%),
          linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(238, 245, 252, 0.94) 100%);
        border: 1px solid rgba(20, 87, 58, 0.1);
        box-shadow: 0 30px 70px rgba(24, 39, 75, 0.08);
        backdrop-filter: blur(10px);
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        margin-bottom: 1rem;
        color: var(--color-secondary-default);
      }

      .brand-mark {
        display: grid;
        gap: 0.8rem;
        margin-top: 0.4rem;
      }

      .brand-mark__badge {
        display: inline-flex;
        width: fit-content;
        align-items: center;
        justify-content: center;
        padding: 0.45rem 0.95rem;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--color-primary-default), #1f7d53);
        color: white;
        font-weight: 700;
        letter-spacing: 0.04em;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.78);
        border: 1px solid rgba(15, 76, 129, 0.12);
        color: var(--color-secondary-default);
        font-size: 0.85rem;
        font-weight: 600;
      }

      .eyebrow--muted {
        background: var(--color-neutral-100);
        border-color: var(--color-neutral-200);
      }

      .login-intro h1 {
        margin: 1.15rem 0 0.85rem;
        color: var(--color-display);
        font-size: clamp(2.2rem, 4vw, 4rem);
        line-height: 1.12;
        max-width: 11ch;
      }

      .intro-copy {
        margin: 0;
        color: var(--color-primary-paragraph);
        line-height: 1.95;
        max-width: 62ch;
      }

      .intro-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.85rem;
        margin-top: 1.5rem;
      }

      .intro-stat {
        display: grid;
        gap: 0.2rem;
        padding: 1rem;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.72);
        border: 1px solid rgba(15, 76, 129, 0.1);
      }

      .intro-stat strong {
        font-size: 1.35rem;
        color: var(--color-display);
      }

      .intro-stat span {
        color: var(--color-secondary-paragraph);
        font-size: 0.9rem;
      }

      .intro-highlights {
        display: grid;
        gap: 0.75rem;
        margin-top: 1.25rem;
      }

      .intro-highlight {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.9rem 1rem;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.62);
        border: 1px solid rgba(213, 221, 230, 0.85);
        color: var(--color-primary-paragraph);
      }

      .intro-highlight app-icon {
        color: var(--color-secondary-default);
      }

      .login-card {
        background: rgba(255, 255, 255, 0.96);
        display: grid;
        gap: 1.35rem;
        align-content: start;
      }

      .login-card__top {
        display: grid;
        gap: 1rem;
      }

      .login-card__label {
        display: inline-block;
        margin-bottom: 0.45rem;
        color: var(--color-secondary-default);
        font-size: 0.88rem;
        font-weight: 700;
      }

      .password-note {
        display: inline-flex;
        align-items: center;
        gap: 0.65rem;
        padding: 0.75rem 0.95rem;
        border-radius: 18px;
        background: var(--color-primary-soft);
        color: var(--color-primary-default);
        border: 1px solid rgba(20, 87, 58, 0.08);
      }

      .login-submit {
        width: 100%;
        justify-content: center;
        min-height: 3.35rem;
        font-weight: 700;
      }

      .login-card__footer {
        padding-top: 0.25rem;
        color: var(--color-secondary-paragraph);
        font-size: 0.92rem;
        border-top: 1px solid var(--color-neutral-200);
      }

      .accounts-panel {
        position: relative;
        width: min(1180px, 100%);
        margin: 1.1rem auto 0;
        padding: 1.5rem;
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.94);
      }

      .accounts-panel__header {
        margin-bottom: 1rem;
      }

      .demo-accounts {
        display: grid;
        gap: 0.75rem;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .demo-account {
        width: 100%;
        border: 1px solid rgba(15, 76, 129, 0.12);
        border-radius: 20px;
        padding: 1rem 1.05rem;
        background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);
        display: grid;
        gap: 0.35rem;
        text-align: right;
        cursor: pointer;
        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
      }

      .demo-account:hover {
        border-color: rgba(20, 87, 58, 0.28);
        box-shadow: 0 18px 35px rgba(24, 39, 75, 0.08);
        transform: translateY(-2px);
      }

      .demo-account__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
      }

      .demo-account__role {
        color: var(--color-secondary-default);
        font-size: 0.82rem;
        font-weight: 700;
      }

      .demo-account__action {
        color: var(--color-primary-default);
        font-size: 0.78rem;
        font-weight: 600;
      }

      .demo-account small {
        color: var(--color-secondary-paragraph);
        line-height: 1.7;
      }

      @media (max-width: 980px) {
        .login-layout {
          grid-template-columns: 1fr;
        }

        .intro-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        .login-shell {
          padding: 1rem 0.85rem 2rem;
        }

        .login-intro,
        .login-card,
        .accounts-panel {
          padding: 1.1rem;
        }

        .password-note,
        .back-link,
        .demo-account__head {
          align-items: flex-start;
        }

        .demo-account__head {
          flex-direction: column;
        }

        .login-intro h1 {
          max-width: none;
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
