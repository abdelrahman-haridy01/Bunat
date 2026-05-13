import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-updates',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="updates-page">
      <section class="updates-header">
        <div class="updates-header__copy">
          <span class="eyebrow">سجل التحديثات</span>
          <h1>تحديثات بُناة أصبحت معروضة كصفحة تحديثات تطبيق: نسخة، تاريخ، وماذا تغيّر فعلاً.</h1>
          <p>
            بدلاً من أقسام عامة، تعرض هذه الصفحة كل إصدار بصيغة أقرب لصفحات تحديث التطبيقات:
            بطاقة واضحة للإصدار الأخير، ثم سجل إصدارات متتابع، ثم قائمة قصيرة لما يأتي بعده.
          </p>
        </div>

        <article class="app-card card">
          <div class="app-card__top">
            <div class="app-card__icon">
              <img src="assets/bunat-small-logo.svg" alt="شعار بُناة" />
            </div>

            <div class="app-card__identity">
              <strong>بُناة</strong>
              <p>منصة داخلية لربط التدريب بالأثر على الأداء</p>
              <span>{{ latestRelease.version }} • {{ latestRelease.date }}</span>
            </div>
          </div>

          <div class="app-card__actions">
            <span class="status-pill">آخر إصدار</span>
            <a class="btn btn-primary" routerLink="/home">فتح الرئيسية</a>
            <button *ngIf="isAuthenticated()" class="btn btn-secondary" type="button" (click)="goToWorkspace()">
              فتح اللوحة
            </button>
            <a class="btn btn-ghost" routerLink="/about">عن بُناة</a>
          </div>
        </article>
      </section>

      <section class="updates-section">
        <div class="section-heading section-heading--row">
          <div>
            <span class="eyebrow">الجديد في هذا التحديث</span>
            <h2>الإصدار الأخير</h2>
          </div>
          <span class="section-meta">{{ latestRelease.tag }}</span>
        </div>

        <article class="release-card release-card--featured card">
          <div class="release-card__head">
            <div class="release-card__app">
              <div class="release-card__app-icon">
                <img src="assets/bunat-small-logo.svg" alt="شعار بُناة" />
              </div>

              <div>
                <strong>بُناة</strong>
                <p>{{ latestRelease.version }} • {{ latestRelease.date }}</p>
              </div>
            </div>

            <span class="release-chip">{{ latestRelease.scope }}</span>
          </div>

          <p class="release-summary">{{ latestRelease.summary }}</p>

          <div class="notes-block">
            <h3>What’s New</h3>
            <div class="notes-list">
              <article class="note-item" *ngFor="let note of latestRelease.notes">
                <strong>{{ note.title }}</strong>
                <p>{{ note.description }}</p>
              </article>
            </div>
          </div>
        </article>
      </section>

      <section class="updates-section">
        <div class="section-heading section-heading--row">
          <div>
            <span class="eyebrow">سجل الإصدارات</span>
            <h2>التحديثات السابقة</h2>
          </div>
          <span class="section-meta">{{ releaseHistory.length + 1 }} إصدارات</span>
        </div>

        <div class="release-list">
          <article class="release-card card" *ngFor="let release of releaseHistory">
            <div class="release-card__head">
              <div>
                <div class="release-meta">
                  <strong>{{ release.version }}</strong>
                  <span>{{ release.date }}</span>
                </div>
                <p class="release-headline">{{ release.headline }}</p>
              </div>

              <span class="release-chip release-chip--muted">{{ release.scope }}</span>
            </div>

            <p class="release-summary">{{ release.summary }}</p>

            <ul class="history-notes">
              <li *ngFor="let note of release.notes">{{ note }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="updates-section">
        <div class="section-heading section-heading--row">
          <div>
            <span class="eyebrow">قريباً</span>
            <h2>التالي في قائمة التحديث</h2>
          </div>
          <span class="section-meta">قائمة عمل</span>
        </div>

        <div class="queue-list">
          <article class="queue-item card" *ngFor="let item of nextQueue; let index = index">
            <span class="queue-item__index">0{{ index + 1 }}</span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .updates-page {
        display: grid;
        gap: 1.5rem;
      }

      .updates-header {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.75fr);
        gap: 1rem;
        align-items: stretch;
      }

      .updates-header__copy,
      .app-card,
      .release-card,
      .queue-item {
        padding: 1.35rem;
      }

      .updates-header__copy {
        border-radius: 32px;
        background:
          radial-gradient(circle at top right, rgba(15, 76, 129, 0.16), transparent 26%),
          radial-gradient(circle at 12% 18%, rgba(20, 87, 58, 0.12), transparent 28%),
          linear-gradient(145deg, #fbfcff 0%, #eef5fb 52%, #f8fcf8 100%);
        border: 1px solid rgba(15, 76, 129, 0.08);
        box-shadow: 0 22px 48px rgba(15, 23, 42, 0.06);
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.84);
        border: 1px solid rgba(15, 76, 129, 0.12);
        color: var(--color-secondary-default);
        font-size: 0.85rem;
        font-weight: 600;
      }

      .updates-header__copy h1,
      .section-heading h2,
      .app-card__identity strong,
      .release-card strong,
      .queue-item strong,
      .notes-block h3 {
        color: var(--color-display);
      }

      .updates-header__copy h1 {
        margin: 1rem 0 0.8rem;
        max-width: 15ch;
        font-size: clamp(2.15rem, 4.4vw, 3rem);
        line-height: 1.1;
        letter-spacing: -0.03em;
      }

      .updates-header__copy p,
      .app-card__identity p,
      .release-summary,
      .history-notes,
      .queue-item p,
      .note-item p,
      .release-headline {
        margin: 0;
        color: var(--color-primary-paragraph);
        line-height: 1.85;
      }

      .app-card {
        display: grid;
        gap: 1rem;
        align-content: space-between;
        background: rgba(255, 255, 255, 0.92);
      }

      .app-card__top,
      .release-card__app {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.9rem;
        align-items: center;
      }

      .app-card__icon,
      .release-card__app-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 1.5rem;
        background: linear-gradient(145deg, #f4fbf6, #edf4fb);
        border: 1px solid rgba(20, 87, 58, 0.08);
      }

      .app-card__icon {
        width: 5rem;
        height: 5rem;
      }

      .release-card__app-icon {
        width: 3.4rem;
        height: 3.4rem;
        border-radius: 1rem;
      }

      .app-card__icon img,
      .release-card__app-icon img {
        width: 72%;
        height: auto;
      }

      .app-card__identity strong {
        display: block;
        font-size: 1.2rem;
      }

      .app-card__identity p {
        margin-top: 0.2rem;
      }

      .app-card__identity span,
      .section-meta,
      .release-meta span,
      .release-card__app p {
        color: var(--color-secondary-paragraph);
        font-size: 0.9rem;
      }

      .app-card__actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        align-items: center;
      }

      .status-pill,
      .release-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 2.2rem;
        padding: 0.45rem 0.9rem;
        border-radius: 999px;
        font-size: 0.84rem;
        font-weight: 700;
      }

      .status-pill,
      .release-chip {
        background: rgba(15, 76, 129, 0.08);
        color: var(--color-secondary-default);
      }

      .release-chip--muted {
        background: var(--color-neutral-100);
        color: var(--color-primary-paragraph);
      }

      .updates-section {
        display: grid;
        gap: 1rem;
      }

      .section-heading {
        max-width: 760px;
      }

      .section-heading--row {
        max-width: none;
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 1rem;
      }

      .section-heading h2 {
        margin: 0.8rem 0 0;
        font-size: clamp(1.55rem, 2.7vw, 2.15rem);
        line-height: 1.25;
      }

      .release-list,
      .queue-list {
        display: grid;
        gap: 1rem;
      }

      .release-card {
        background: rgba(255, 255, 255, 0.94);
      }

      .release-card--featured {
        background:
          linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.98));
        border-color: rgba(15, 76, 129, 0.1);
      }

      .release-card__head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 1rem;
      }

      .release-meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.6rem;
      }

      .release-meta strong,
      .release-card__app strong {
        font-size: 1.05rem;
      }

      .release-headline {
        margin-top: 0.35rem;
      }

      .release-summary {
        margin-top: 1rem;
      }

      .notes-block {
        margin-top: 1.15rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(213, 221, 230, 0.9);
      }

      .notes-block h3 {
        margin: 0 0 0.85rem;
        font-size: 1.05rem;
      }

      .notes-list {
        display: grid;
        gap: 0.85rem;
      }

      .note-item {
        padding: 0.95rem 1rem;
        border-radius: 18px;
        background: var(--color-neutral-50);
        border: 1px solid var(--color-neutral-200);
      }

      .note-item strong,
      .queue-item strong {
        display: block;
        margin-bottom: 0.3rem;
      }

      .history-notes {
        margin: 0.95rem 0 0;
        padding: 0 1rem 0 0;
        display: grid;
        gap: 0.45rem;
      }

      .queue-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: start;
      }

      .queue-item__index {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.9rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #14573a, #0f4c81);
        color: #fff;
        font-size: 0.82rem;
        font-weight: 700;
      }

      @media (max-width: 980px) {
        .updates-header {
          grid-template-columns: 1fr;
        }

        .updates-header__copy h1 {
          max-width: none;
        }
      }

      @media (max-width: 720px) {
        .updates-header__copy,
        .app-card,
        .release-card,
        .queue-item {
          padding: 1rem;
        }

        .section-heading--row,
        .release-card__head,
        .app-card__actions {
          align-items: start;
          flex-direction: column;
        }

        .app-card__actions,
        .app-card__actions .btn {
          width: 100%;
        }

        .app-card__actions .btn {
          justify-content: center;
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatesComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly latestRelease = {
    version: 'الإصدار 1.3.0',
    date: '13 مايو 2026',
    tag: 'آخر تحديث منشور',
    scope: 'الواجهة العامة',
    summary:
      'أعدنا تصميم صفحة التحديثات نفسها لتصبح أقرب إلى سجل تحديثات التطبيقات: نسخة واضحة، ملاحظات تغيير قابلة للمسح السريع، وتسلسل إصدارات يمكن قراءته خلال ثوانٍ.',
    notes: [
      {
        title: 'واجهة تحديثات أقرب لسلوك المتاجر',
        description:
          'الصفحة لم تعد مجموعة أقسام تسويقية؛ أصبحت قائمة تحديثات تعرض آخر إصدار أولاً ثم تسجل ما سبقه بشكل متسلسل.',
      },
      {
        title: 'إبراز النسخة والتاريخ مباشرة',
        description:
          'كل إدخال أصبح يبدأ برقم الإصدار وتاريخ النشر والنطاق المتأثر، بحيث يعرف القارئ بسرعة ما الذي تغير وأين.',
      },
      {
        title: 'صياغة ملاحظات أكثر عملية',
        description:
          'محتوى التحديثات يعرض الآن ما تم تحسينه فعلاً في التجربة العامة وفي واجهة المنتج بدلاً من وصف عام للمشروع.',
      },
    ],
  };
  protected readonly releaseHistory = [
    {
      version: 'الإصدار 1.2.0',
      date: '11 مايو 2026',
      headline: 'إضافة صفحات عامة مستقلة إلى جانب الصفحة الرئيسية.',
      scope: 'الموقع العام',
      summary:
        'تم فصل النبذة العامة والتحديثات عن الصفحة الرئيسية حتى تصبح تجربة التصفح العامة أوضح وأكثر قابلية للتوسع.',
      notes: [
        'إضافة صفحة مستقلة لشرح المنصة ومسار القيمة فيها.',
        'إضافة صفحة تحديثات عامة ضمن نفس شريط التنقل العام.',
        'إبقاء الصفحة الرئيسية كنقطة دخول وملخص سريع للمنتج.',
      ],
    },
    {
      version: 'الإصدار 1.1.0',
      date: '8 مايو 2026',
      headline: 'توحيد التنقل العام بين الصفحات المفتوحة قبل تسجيل الدخول.',
      scope: 'التنقل',
      summary:
        'أصبح هناك غلاف عام موحد يربط الرئيسية والنبذة والتحديثات مع أزرار ثابتة للعودة إلى تسجيل الدخول أو مساحة العمل.',
      notes: [
        'شريط علوي ثابت للتنقل بين الصفحات العامة.',
        'زر مباشر للانتقال إلى اللوحة عند وجود جلسة نشطة.',
        'توحيد هوية الواجهة العامة بصرياً.',
      ],
    },
    {
      version: 'الإصدار 1.0.0',
      date: '2 مايو 2026',
      headline: 'إطلاق الصفحة العامة الأساسية للمنتج.',
      scope: 'الإطلاق الأول',
      summary:
        'تم تقديم الصفحة الرئيسية العامة لتشرح فكرة بُناة وعلاقة التدريب بالتقدم والأثر على الأداء داخل المؤسسة.',
      notes: [
        'تقديم السرد الرئيسي للمنتج باللغة العربية.',
        'شرح أدوار الموظف والمدير والإدارة ضمن نفس المسار.',
        'ربط الدعوات الرئيسية بشاشة تسجيل الدخول ومساحات العمل.',
      ],
    },
  ];
  protected readonly nextQueue = [
    {
      title: 'إظهار تغييرات أدق على مستوى كل دور',
      description: 'ربط سجل التحديثات مستقبلاً بما تغير تحديداً في لوحات الموظف أو المدير أو الإدارة.',
    },
    {
      title: 'تجميع تحسينات المحتوى والذكاء الاصطناعي',
      description: 'فصل التحديثات الخاصة ببناء الدورات وإعدادات الذكاء الاصطناعي ضمن مجموعات أوضح.',
    },
    {
      title: 'صياغة سجل تحديث أقرب لعمليات الإصدار',
      description: 'الانتقال من سجل وصفي ثابت إلى نمط يمكن تحديثه بسهولة مع كل نسخة جديدة من المنتج.',
    },
  ];

  protected goToWorkspace() {
    const user = this.authService.currentUser();
    this.router.navigateByUrl(this.authService.roleHome(user?.role));
  }
}
