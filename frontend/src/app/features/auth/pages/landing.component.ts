import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="landing-shell">
      <section class="landing-hero">
        <div class="hero-grid">
          <div class="hero-copy">
            <div class="hero-copy__meta">
              <span class="eyebrow">الفكرة الرئيسية</span>
              <span class="hero-copy__note">من التعلم إلى أثر يُبنى</span>
            </div>
            <h1>نحوّل التدريب من نشاط منفصل إلى مسار واضح ينتهي بنتيجة قابلة للقياس.</h1>
            <p class="hero-lead">
              بُناة تمنح الإدارة والمدير رؤية مباشرة تربط الاحتياج بالدورة، ثم التنفيذ بالمتابعة،
              ثم المتابعة بالأثر على مؤشرات الأداء داخل تسلسل واحد سهل القراءة.
            </p>

            <div class="hero-actions">
              <a class="btn btn-primary" href="#solution-sequence">تصفح التسلسل</a>
              <a class="btn btn-secondary" href="#solution-goals">الأهداف التنفيذية</a>
            </div>

            <div class="hero-strip">
              <div class="hero-strip__lead">
                <strong>كيف يقرأ المدير المنصة؟</strong>
                <p>ثلاث طبقات واضحة: لماذا بدأ التدريب، كيف نُفذ، وما الذي تغيّر بعده.</p>
              </div>

              <div class="signal-grid">
                <article class="signal-card" *ngFor="let item of signalCards; let index = index">
                  <span class="signal-card__index">0{{ index + 1 }}</span>
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

      <div class="hero-illustration">
        <img class="hero-logo" src="assets/bunat-logo.svg" alt="شعار بُناة الكامل" />      
      </div>

      <section id="solution-goals" class="section-band">
        <div class="section-heading">
          <span class="eyebrow">الأهداف</span>
          <h2>المنصة صُممت لحل ثلاث فجوات إدارية في برامج التطوير.</h2>
          <p>الهدف ليس أتمتة التدريب فقط، بل جعل أثره قابلاً للمتابعة، التقييم، واتخاذ القرار.</p>
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
          <h2>هذا هو التسلسل الذي توضحه المنصة من البداية إلى النهاية.</h2>
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
        <div class="section-heading">
          <span class="eyebrow">صفحات عامة</span>
          <h2>أضفنا صفحات ثابتة مرافقة للرئيسية لشرح المنصة ومتابعة تطورها بسرعة.</h2>
          <p>إذا كنت تريد قراءة نبذة مركزة أو مراجعة ما يغطيه الإصدار الحالي، فهذه الروابط هي الأقرب.</p>
        </div>

        <div class="page-links">
          <a class="page-link card" *ngFor="let page of publicPages" [routerLink]="page.path">
            <div class="page-link__icon">
              <app-icon [name]="page.icon" [size]="20" />
            </div>
            <div class="page-link__content">
              <strong>{{ page.title }}</strong>
              <p>{{ page.description }}</p>
            </div>
            <span class="page-link__action">{{ page.cta }}</span>
          </a>
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
            <button class="btn btn-primary" type="button" (click)="goToLogin()">الدخول إلى المنصة</button>
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
        display: grid;
        gap: 1.5rem;
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
        margin: 1rem 0 0.85rem;
        max-width: 80%;
        color: #102432;
        font-size: clamp(2.6rem, 4.8vw, 2.75rem);
        line-height: 1.08;
        letter-spacing: -0.03em;
      }

      .hero-logo {
        display: block;
        width: min(100%, 28rem);
        height: auto;
        margin: 0 auto 1rem;
      }

      .hero-copy__meta {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;
      }

      .hero-copy__note {
        color: var(--color-secondary-default);
        font-size: 0.92rem;
        font-weight: 700;
      }

      .hero-lead {
        max-width: 58ch;
        margin: 0 0 1.5rem;
        color: var(--color-primary-paragraph);
        font-size: 1.05rem;
        line-height: 1.95;
      }

      .hero-strip {
        margin-top: 1.5rem;
        padding: 1rem;
        border-radius: 24px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(245, 249, 253, 0.88));
        border: 1px solid rgba(15, 76, 129, 0.1);
        box-shadow: 0 20px 40px rgba(24, 39, 75, 0.05);
      }

      .hero-strip__lead {
        margin-bottom: 1rem;
      }

      .hero-strip__lead strong {
        display: block;
        margin-bottom: 0.3rem;
        color: var(--color-display);
        font-size: 1rem;
      }

      .hero-strip__lead p {
        margin: 0;
        color: var(--color-secondary-paragraph);
        line-height: 1.75;
      }

      .signal-grid,
      .goals-grid,
      .roles-grid,
      .page-links,
      .summary-grid {
        display: grid;
        gap: 1rem;
      }

      .signal-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .signal-card,
      .goal-card,
      .role-card,
      .page-link,
      .summary-metric {
        padding: 1rem;
        border-radius: 22px;
        background: rgba(255, 255, 255, 0.84);
        border: 1px solid rgba(20, 87, 58, 0.08);
      }

      .signal-card {
        display: grid;
        grid-template-columns: auto auto 1fr;
        gap: 0.8rem;
        align-items: start;
      }

      .signal-card__index {
        color: rgba(16, 58, 89, 0.45);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        padding-top: 0.1rem;
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
      .page-link strong,
      .executive-point strong,
      .sequence-step__content strong,
      .summary-metric strong {
        color: var(--color-display);
      }

      .signal-card p,
      .goal-card p,
      .role-card p,
      .page-link p,
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

      .page-links {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .page-link {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0.9rem;
        align-items: center;
        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);
      }

      .page-link__icon {
        width: 2.6rem;
        height: 2.6rem;
        border-radius: 0.95rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(15, 76, 129, 0.08);
        color: var(--color-secondary-default);
      }

      .page-link__content strong {
        display: block;
        margin-bottom: 0.3rem;
      }

      .page-link__action {
        color: var(--color-primary-default);
        font-size: 0.9rem;
        font-weight: 700;
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
        .page-links,
        .summary-grid {
          grid-template-columns: 1fr;
        }

        .hero-copy h1 {
          max-width: none;
        }

        .hero-logo {
          width: min(100%, 22rem);
        }

        .signal-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        .landing-shell {
          gap: 1rem;
        }

        .landing-hero,
        .summary-panel,
        .executive-card {
          padding: 1rem;
        }

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
      title: 'أثر واضح للقياس',
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
      description: 'توضح المنصة النتائج للإدارة لاتخاذ قرار بالاستمرار أو تعديل المحتوى أو إعادة الاستهداف.',
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
      description: 'تبني المسار كاملاً وتوضح أثره على المؤسسة بلغة قرارات وليست بلغة نشاط.',
      points: ['إدارة المستخدمين والدورات', 'ربط التدريب بالمؤشرات', 'مراجعة النتائج والتحسين'],
    },
  ];
  protected readonly metrics = [
    { value: '6', label: 'مراحل واضحة', hint: 'من تعريف الحاجة إلى قراءة الأثر' },
    { value: '3', label: 'أدوار رئيسية', hint: 'موظف، مدير، إدارة/موارد بشرية' },
    { value: '1', label: 'مسار موحد', hint: 'التكليف والتعلم والقياس في مكان واحد' },
    { value: '2', label: 'نقطتا قياس', hint: 'قبل التدريب وبعده لكل مؤشر مستهدف' },
  ];
  protected readonly publicPages = [
    {
      icon: 'eye',
      title: 'عن بُناة',
      description: 'صفحة ثابتة تشرح فكرة المنصة، مرتكزاتها، وكيف توزّع القيمة بين الأدوار المختلفة.',
      cta: 'اذهب إلى النبذة',
      path: '/about',
    },
    {
      icon: 'calendar',
      title: 'التحديثات',
      description: 'ملخص سريع لما يغطيه الإصدار الحالي وما الذي نركز عليه في التطوير القادم.',
      cta: 'شاهد التحديثات',
      path: '/updates',
    },
  ];

  protected goToLogin() {
    this.router.navigate(['/login']);
  }

  protected goToWorkspace() {
    const user = this.authService.currentUser();
    this.router.navigateByUrl(this.authService.roleHome(user?.role));
  }
}
