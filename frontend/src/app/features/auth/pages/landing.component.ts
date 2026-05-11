import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="landing-shell">
      <section class="landing-hero">
        <header class="landing-topbar">
          <div class="brand-mark">
            <span class="brand-mark__badge">ب</span>
            <div>
              <strong>بُناة</strong>
              <p>منصة داخلية لربط التدريب بالأثر على الأداء</p>
            </div>
          </div>

          <div class="landing-topbar__actions">
            <button class="btn btn-ghost" type="button" (click)="goToLogin()">تسجيل الدخول</button>
            <button *ngIf="isAuthenticated()" class="btn btn-secondary" type="button" (click)="goToWorkspace()">
              الانتقال إلى لوحتي
            </button>
          </div>
        </header>

        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">عرض الفكرة</span>
            <h1>منصة تشرح للمدير كيف يتحول التدريب إلى قرار، تنفيذ، ثم أثر قابل للقياس.</h1>
            <p class="hero-lead">
              بُناة لا تقدم محتوى تدريبي فقط، بل تبني سلسلة واضحة تبدأ من تحديد الاحتياج،
              مروراً بإسناد الدورات والدروس، وتنتهي بقياس التغير في مؤشرات الأداء.
            </p>

            <div class="hero-actions">
              <a class="btn btn-primary" href="#solution-sequence">استعرض التسلسل</a>
              <a class="btn btn-secondary" href="#solution-goals">الأهداف التنفيذية</a>
            </div>

            <div class="signal-grid">
              <article class="signal-card" *ngFor="let item of signalCards">
                <span class="signal-card__icon">
                  <app-icon [name]="item.icon" [size]="18" />
                </span>
                <div>
                  <strong>{{ item.title }}</strong>
                  <p>{{ item.description }}</p>
                </div>
              </article>
            </div>
          </div>

          <aside class="executive-card card">
            <span class="executive-card__eyebrow">ما الذي يراه المدير؟</span>
            <h2>قصة تنفيذية كاملة على شاشة واحدة</h2>

            <div class="executive-points">
              <article class="executive-point" *ngFor="let point of executivePoints">
                <app-icon [name]="point.icon" [size]="18" />
                <div>
                  <strong>{{ point.title }}</strong>
                  <p>{{ point.description }}</p>
                </div>
              </article>
            </div>

            <div class="executive-banner">
              <span>الخلاصة</span>
              <strong>لم نعد نسأل فقط من حضر التدريب، بل ما الذي تغيّر بعده.</strong>
            </div>
          </aside>
        </div>
      </section>

      <section id="solution-goals" class="section-band">
        <div class="section-heading">
          <span class="eyebrow">الأهداف</span>
          <h2>المنصة صُممت لحل ثلاث فجوات إدارية في برامج التطوير.</h2>
          <p>الهدف ليس أتمتة التدريب فقط، بل جعل أثره قابلاً للعرض، المتابعة، واتخاذ القرار.</p>
        </div>

        <div class="goals-grid">
          <article class="goal-card" *ngFor="let goal of goals">
            <div class="goal-card__icon">
              <app-icon [name]="goal.icon" [size]="22" />
            </div>
            <strong>{{ goal.title }}</strong>
            <p>{{ goal.description }}</p>
          </article>
        </div>
      </section>

      <section id="solution-sequence" class="section-band">
        <div class="section-heading">
          <span class="eyebrow">تسلسل الحل</span>
          <h2>هذا هو التسلسل الذي تعرضه المنصة من البداية إلى النهاية.</h2>
        </div>

        <div class="sequence-layout">
          <div class="sequence-line"></div>
          <article class="sequence-step" *ngFor="let step of sequenceSteps; let index = index">
            <div class="sequence-step__marker">0{{ index + 1 }}</div>
            <div class="sequence-step__content card">
              <span class="sequence-step__stage">{{ step.stage }}</span>
              <strong>{{ step.title }}</strong>
              <p>{{ step.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="section-band">
        <div class="section-heading">
          <span class="eyebrow">كيف تعمل الأدوار</span>
          <h2>كل دور يدخل في اللحظة المناسبة ضمن نفس السلسلة.</h2>
        </div>

        <div class="roles-grid">
          <article class="role-card" *ngFor="let role of roleCards">
            <div class="role-card__icon">
              <app-icon [name]="role.icon" [size]="20" />
            </div>
            <strong>{{ role.title }}</strong>
            <p>{{ role.description }}</p>
            <ul>
              <li *ngFor="let item of role.points">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section-band">
        <div class="summary-panel card">
          <div class="section-heading section-heading--compact">
            <span class="eyebrow">القيمة النهائية</span>
            <h2>منصة واحدة تجمع التعلم والتنفيذ والقياس.</h2>
          </div>

          <div class="summary-grid">
            <article class="summary-metric" *ngFor="let item of metrics">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
              <p>{{ item.hint }}</p>
            </article>
          </div>

          <div class="summary-actions">
            <button class="btn btn-primary" type="button" (click)="goToLogin()">بدء العرض عبر الدخول</button>
            <button *ngIf="isAuthenticated()" class="btn btn-secondary" type="button" (click)="goToWorkspace()">
              فتح اللوحة الحالية
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .landing-shell {
        min-height: 100vh;
        padding: 1.25rem;
      }

      .landing-hero {
        position: relative;
        overflow: hidden;
        padding: 1.5rem;
        border-radius: 32px;
        background:
          radial-gradient(circle at top left, rgba(209, 238, 223, 0.92), transparent 28%),
          radial-gradient(circle at 85% 15%, rgba(15, 76, 129, 0.18), transparent 30%),
          linear-gradient(135deg, #f7fcf8 0%, #edf6ff 52%, #ffffff 100%);
        border: 1px solid rgba(20, 87, 58, 0.08);
        box-shadow: 0 32px 90px rgba(15, 23, 42, 0.08);
      }

      .landing-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .brand-mark {
        display: inline-flex;
        align-items: center;
        gap: 0.9rem;
      }

      .brand-mark__badge {
        width: 3rem;
        height: 3rem;
        border-radius: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #14573a, #0f4c81);
        color: #fff;
        font-weight: 700;
        font-size: 1.2rem;
        box-shadow: 0 18px 32px rgba(20, 87, 58, 0.2);
      }

      .brand-mark strong {
        display: block;
        color: var(--color-display);
      }

      .brand-mark p {
        margin: 0.2rem 0 0;
        color: var(--color-secondary-paragraph);
      }

      .landing-topbar__actions,
      .hero-actions,
      .summary-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);
        gap: 1.25rem;
        align-items: start;
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

      .hero-copy h1 {
        margin: 1rem 0;
        max-width: 11ch;
        color: #102432;
        font-size: clamp(2.8rem, 5vw, 5rem);
        line-height: 1.15;
        letter-spacing: -0.03em;
      }

      .hero-lead {
        max-width: 64ch;
        margin: 0 0 1.5rem;
        color: var(--color-primary-paragraph);
        font-size: 1.08rem;
        line-height: 1.9;
      }

      .signal-grid,
      .goals-grid,
      .roles-grid,
      .summary-grid {
        display: grid;
        gap: 1rem;
      }

      .signal-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: 1.5rem;
      }

      .signal-card,
      .goal-card,
      .role-card,
      .summary-metric {
        padding: 1rem;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.84);
        border: 1px solid rgba(20, 87, 58, 0.08);
      }

      .signal-card {
        display: grid;
        gap: 0.7rem;
      }

      .signal-card__icon,
      .goal-card__icon,
      .role-card__icon {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.9rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(20, 87, 58, 0.08);
        color: var(--color-primary-default);
      }

      .signal-card strong,
      .goal-card strong,
      .role-card strong,
      .executive-point strong,
      .sequence-step__content strong,
      .summary-metric strong {
        color: var(--color-display);
      }

      .signal-card p,
      .goal-card p,
      .role-card p,
      .executive-point p,
      .sequence-step__content p,
      .summary-metric p {
        margin: 0;
        color: var(--color-secondary-paragraph);
        line-height: 1.7;
      }

      .executive-card {
        padding: 1.3rem;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 255, 0.98));
      }

      .executive-card__eyebrow,
      .sequence-step__stage {
        color: var(--color-secondary-default);
        font-size: 0.82rem;
        font-weight: 700;
      }

      .executive-card h2 {
        margin: 0.5rem 0 1rem;
        color: var(--color-display);
        font-size: 1.6rem;
        line-height: 1.35;
      }

      .executive-points {
        display: grid;
        gap: 0.85rem;
      }

      .executive-point {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.75rem;
        align-items: start;
        padding: 0.95rem;
        border-radius: 18px;
        background: var(--color-neutral-50);
        border: 1px solid var(--color-neutral-200);
      }

      .executive-point app-icon {
        color: var(--color-primary-default);
      }

      .executive-banner {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 18px;
        background: linear-gradient(135deg, #103a59, #14573a);
        color: #fff;
      }

      .executive-banner span {
        display: block;
        margin-bottom: 0.25rem;
        color: rgba(255, 255, 255, 0.75);
        font-size: 0.82rem;
      }

      .section-band {
        width: min(1220px, 100%);
        margin: 1.5rem auto 0;
      }

      .section-heading {
        max-width: 760px;
        margin-bottom: 1.25rem;
      }

      .section-heading h2 {
        margin: 0.8rem 0 0.45rem;
        color: var(--color-display);
        font-size: clamp(1.8rem, 3vw, 2.7rem);
        line-height: 1.3;
      }

      .section-heading p {
        margin: 0;
        color: var(--color-primary-paragraph);
        line-height: 1.85;
      }

      .section-heading--compact h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);
      }

      .goals-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .goal-card {
        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);
      }

      .goal-card strong,
      .role-card strong {
        display: block;
        margin: 1rem 0 0.45rem;
      }

      .sequence-layout {
        position: relative;
        display: grid;
        gap: 1rem;
      }

      .sequence-line {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 1.2rem;
        width: 2px;
        background: linear-gradient(180deg, rgba(20, 87, 58, 0.25), rgba(15, 76, 129, 0.1));
      }

      .sequence-step {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: start;
      }

      .sequence-step__marker {
        position: relative;
        z-index: 1;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 0.9rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #14573a, #0f4c81);
        color: #fff;
        font-size: 0.84rem;
        font-weight: 700;
        box-shadow: 0 12px 24px rgba(20, 87, 58, 0.18);
      }

      .sequence-step__content {
        padding: 1.2rem;
      }

      .sequence-step__content strong {
        display: block;
        margin: 0.35rem 0 0.45rem;
      }

      .roles-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .role-card {
        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);
      }

      .role-card ul {
        margin: 1rem 0 0;
        padding: 0 1rem 0 0;
        color: var(--color-primary-paragraph);
        display: grid;
        gap: 0.55rem;
      }

      .summary-panel {
        padding: 1.35rem;
      }

      .summary-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin: 1rem 0 1.25rem;
      }

      .summary-metric strong {
        display: block;
        margin-bottom: 0.25rem;
        font-size: 2rem;
      }

      .summary-metric span {
        display: block;
        margin-bottom: 0.35rem;
        color: var(--color-display);
      }

      @media (max-width: 1100px) {
        .hero-grid,
        .signal-grid,
        .goals-grid,
        .roles-grid,
        .summary-grid {
          grid-template-columns: 1fr;
        }

        .hero-copy h1 {
          max-width: none;
        }
      }

      @media (max-width: 720px) {
        .landing-shell {
          padding: 0.85rem;
        }

        .landing-hero,
        .summary-panel,
        .executive-card {
          padding: 1rem;
        }

        .landing-topbar,
        .landing-topbar__actions,
        .hero-actions,
        .summary-actions,
        .sequence-step {
          flex-direction: column;
          grid-template-columns: 1fr;
        }

        .sequence-line {
          display: none;
        }

        .btn,
        .landing-topbar__actions .btn,
        .hero-actions .btn,
        .summary-actions .btn {
          width: 100%;
          justify-content: center;
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly signalCards = [
    {
      icon: 'target',
      title: 'فكرة واضحة',
      description: 'ربط كل مبادرة تدريبية بهدف ومؤشر أداء وليس بنشاط تدريبي معزول.',
    },
    {
      icon: 'book-open',
      title: 'تنفيذ منضبط',
      description: 'تحويل كل دورة إلى دروس ومحتوى وخطوات متابعة واضحة للموظف والمدير.',
    },
    {
      icon: 'chart-bars',
      title: 'أثر قابل للعرض',
      description: 'قراءة الفرق بين ما قبل التدريب وما بعده ضمن لوحة تنفيذية واحدة.',
    },
  ];
  protected readonly executivePoints = [
    {
      icon: 'flag',
      title: 'ما المشكلة؟',
      description: 'صعوبة إثبات أن التدريب أدى إلى تغير ملموس في الأداء.',
    },
    {
      icon: 'graduation',
      title: 'ما الحل؟',
      description: 'إدارة التدريب كمجرى عمل يبدأ بالإسناد وينتهي بالقياس.',
    },
    {
      icon: 'users',
      title: 'من الأطراف؟',
      description: 'الموظف، المدير، والإدارة يعملون على نفس المسار لكن بصلاحيات مختلفة.',
    },
    {
      icon: 'chart',
      title: 'ما المخرج؟',
      description: 'لوحات توضح التقدم والأثر بدلاً من تقارير حضور فقط.',
    },
  ];
  protected readonly goals = [
    {
      icon: 'eye',
      title: 'إعطاء الإدارة رؤية موحدة',
      description: 'كل ما يتعلق بالدورة والتكليف والتقدم والتحسن يظهر داخل مشهد واحد.',
    },
    {
      icon: 'team',
      title: 'تسهيل المتابعة على المدير',
      description: 'المدير يعرف من التزم، من تأخر، ومن تحسن بعد تنفيذ التدريب.',
    },
    {
      icon: 'award',
      title: 'رفع قيمة الاستثمار التدريبي',
      description: 'التركيز ينتقل من تنفيذ الدورة إلى قياس فائدتها العملية على الأداء.',
    },
  ];
  protected readonly sequenceSteps = [
    {
      stage: 'المرحلة الأولى',
      title: 'تعريف الاحتياج وربط الدورة بالمؤشر',
      description: 'تبدأ الإدارة بتحديد المهارة المستهدفة ومؤشر الأداء الذي يجب أن يتحسن بعد التدريب.',
    },
    {
      stage: 'المرحلة الثانية',
      title: 'بناء المحتوى وتفصيله إلى دروس',
      description: 'يتم تجهيز الدورة، تقسيمها إلى دروس، وإرفاق المحتوى بما يناسب التنفيذ الفعلي.',
    },
    {
      stage: 'المرحلة الثالثة',
      title: 'إسناد التدريب إلى الموظفين',
      description: 'الموارد البشرية أو الإدارة تسند الدورة إلى الأفراد أو الفرق مع متابعة حالة التنفيذ.',
    },
    {
      stage: 'المرحلة الرابعة',
      title: 'تنفيذ التعلم ومتابعة التقدم',
      description: 'الموظف ينجز الدروس، والمدير يرى تقدم الفريق لحظة بلحظة ضمن لوحة مخصصة.',
    },
    {
      stage: 'المرحلة الخامسة',
      title: 'قياس قبل وبعد وربط النتيجة بالدورة',
      description: 'تُسجل قيمة المؤشر قبل التدريب وبعده لإظهار ما إذا كان التعلم أحدث فرقاً فعلياً.',
    },
    {
      stage: 'المرحلة السادسة',
      title: 'قراءة الأثر واتخاذ قرار التحسين',
      description: 'تعرض المنصة النتائج للإدارة لاتخاذ قرار بالاستمرار أو تعديل المحتوى أو إعادة الاستهداف.',
    },
  ];
  protected readonly roleCards = [
    {
      icon: 'user',
      title: 'الموظف',
      description: 'يستقبل ما طُلب منه بوضوح وينفذ الدروس ضمن مسار تعلم مباشر.',
      points: ['يرى الدورات المسندة', 'يفتح محتوى كل درس', 'يعرف مقدار التقدم المحقق'],
    },
    {
      icon: 'briefcase',
      title: 'المدير',
      description: 'يراقب التزام الفريق ويربط التنفيذ بنتيجة الأداء على مستوى الأفراد.',
      points: ['يرى من بدأ ومن تأخر', 'يتابع حالة الفريق', 'يقرأ أثر التدريب على الأداء'],
    },
    {
      icon: 'chart',
      title: 'الإدارة',
      description: 'تبني المسار كاملاً وتعرض أثره على المؤسسة بلغة قرارات وليست بلغة نشاط.',
      points: ['إدارة المستخدمين والدورات', 'ربط التدريب بالمؤشرات', 'مراجعة النتائج والتحسين'],
    },
  ];
  protected readonly metrics = [
    { value: '6', label: 'مراحل واضحة', hint: 'من تعريف الحاجة إلى قراءة الأثر' },
    { value: '3', label: 'أدوار رئيسية', hint: 'موظف، مدير، إدارة/موارد بشرية' },
    { value: '1', label: 'مسار موحد', hint: 'التكليف والتعلم والقياس في مكان واحد' },
    { value: '2', label: 'نقطتا قياس', hint: 'قبل التدريب وبعده لكل مؤشر مستهدف' },
  ];

  protected goToLogin() {
    this.router.navigate(['/login']);
  }

  protected goToWorkspace() {
    const user = this.authService.currentUser();
    this.router.navigateByUrl(this.authService.roleHome(user?.role));
  }
}
