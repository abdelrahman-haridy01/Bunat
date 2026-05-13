import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="info-page">
      <section class="info-hero card">
        <span class="eyebrow">عن بُناة</span>
        <h1>نحوّل التدريب الداخلي من نشاط منفصل إلى مسار تنفيذي واضح ينتهي بنتيجة قابلة للقياس.</h1>
        <p class="hero-copy">
          بُناة صُممت لتجمع في مكان واحد تحديد الاحتياج، بناء الدورة، إسناد التدريب، متابعة التنفيذ،
          ثم قراءة الأثر على الأداء. الفكرة الأساسية هي أن التدريب لا ينجح عند الإطلاق، بل عند
          القدرة على إثبات ما تغيّر بعده.
        </p>

        <div class="hero-actions">
          <a class="btn btn-primary" routerLink="/home">العودة إلى الرئيسية</a>
          <a class="btn btn-secondary" routerLink="/updates">استعراض التحديثات</a>
          <button *ngIf="isAuthenticated()" class="btn btn-ghost" type="button" (click)="goToWorkspace()">
            فتح اللوحة الحالية
          </button>
        </div>
      </section>

      <section class="info-section">
        <div class="section-heading">
          <span class="eyebrow">مرتكزات المنصة</span>
          <h2>ثلاثة محاور تجعل التدريب جزءاً من التشغيل لا مجرد مادة تعليمية.</h2>
        </div>

        <div class="pillars-grid">
          <article class="pillar-card card" *ngFor="let pillar of pillars">
            <div class="pillar-card__icon">
              <app-icon [name]="pillar.icon" [size]="22" />
            </div>
            <strong>{{ pillar.title }}</strong>
            <p>{{ pillar.description }}</p>
          </article>
        </div>
      </section>

      <section class="info-section story-grid">
        <article class="story-card card">
          <span class="story-card__label">كيف تعمل الفكرة؟</span>
          <h2>نربط كل دورة بسؤال إداري واضح: ماذا نريد أن يتحسن بعد هذا التدريب؟</h2>

          <div class="story-points">
            <div class="story-point" *ngFor="let item of operatingModel">
              <app-icon [name]="item.icon" [size]="18" />
              <div>
                <strong>{{ item.title }}</strong>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>
        </article>

        <article class="story-card card">
          <span class="story-card__label">لمن صُممت؟</span>
          <h2>كل دور يرى نفس السلسلة ولكن من زاوية قراره ومسؤوليته.</h2>

          <div class="audience-grid">
            <article class="audience-card" *ngFor="let audience of audiences">
              <div class="audience-card__icon">
                <app-icon [name]="audience.icon" [size]="18" />
              </div>
              <div>
                <strong>{{ audience.title }}</strong>
                <p>{{ audience.description }}</p>
              </div>
            </article>
          </div>
        </article>
      </section>

      <section class="info-section">
        <div class="section-heading">
          <span class="eyebrow">مبادئ العمل</span>
          <h2>هذه المبادئ توجه شكل المنتج والقرارات داخله.</h2>
        </div>

        <div class="principles-grid">
          <article class="principle-card card" *ngFor="let principle of principles; let index = index">
            <span class="principle-card__index">0{{ index + 1 }}</span>
            <strong>{{ principle.title }}</strong>
            <p>{{ principle.description }}</p>
          </article>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .info-page {
        display: grid;
        gap: 1.5rem;
      }

      .info-hero,
      .story-card {
        padding: 1.5rem;
      }

      .info-hero {
        border-radius: 32px;
        background:
          radial-gradient(circle at top left, rgba(209, 238, 223, 0.92), transparent 28%),
          radial-gradient(circle at 85% 15%, rgba(15, 76, 129, 0.18), transparent 30%),
          linear-gradient(135deg, #f7fcf8 0%, #edf6ff 52%, #ffffff 100%);
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

      .info-hero h1,
      .section-heading h2,
      .story-card h2 {
        color: var(--color-display);
      }

      .info-hero h1 {
        max-width: 16ch;
        margin: 1rem 0 0.85rem;
        font-size: clamp(2.2rem, 4.5vw, 3rem);
        line-height: 1.12;
        letter-spacing: -0.03em;
      }

      .hero-copy,
      .section-heading p,
      .pillar-card p,
      .story-point p,
      .audience-card p,
      .principle-card p {
        margin: 0;
        color: var(--color-primary-paragraph);
        line-height: 1.9;
      }

      .hero-copy {
        max-width: 62ch;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 1.5rem;
      }

      .info-section {
        display: grid;
        gap: 1.2rem;
      }

      .section-heading {
        max-width: 760px;
      }

      .section-heading h2,
      .story-card h2 {
        margin: 0.85rem 0 0.4rem;
        font-size: clamp(1.7rem, 2.8vw, 2.4rem);
        line-height: 1.3;
      }

      .pillars-grid,
      .principles-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .pillar-card,
      .principle-card {
        padding: 1.2rem;
      }

      .pillar-card__icon,
      .audience-card__icon {
        width: 2.75rem;
        height: 2.75rem;
        border-radius: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, rgba(20, 87, 58, 0.1), rgba(15, 76, 129, 0.1));
        color: var(--color-secondary-default);
      }

      .pillar-card strong,
      .story-point strong,
      .audience-card strong,
      .principle-card strong {
        display: block;
        margin-bottom: 0.35rem;
        color: var(--color-display);
      }

      .story-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .story-card {
        display: grid;
        gap: 1rem;
      }

      .story-card__label {
        color: var(--color-secondary-default);
        font-size: 0.84rem;
        font-weight: 700;
      }

      .story-points,
      .audience-grid {
        display: grid;
        gap: 0.9rem;
      }

      .story-point,
      .audience-card {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.75rem;
        align-items: start;
        padding: 1rem;
        border-radius: 20px;
        background: var(--color-neutral-50);
        border: 1px solid var(--color-neutral-200);
      }

      .story-point app-icon {
        color: var(--color-primary-default);
      }

      .principle-card__index {
        display: inline-flex;
        margin-bottom: 0.8rem;
        color: rgba(16, 58, 89, 0.5);
        font-size: 0.8rem;
        font-weight: 800;
        letter-spacing: 0.08em;
      }

      @media (max-width: 980px) {
        .pillars-grid,
        .story-grid,
        .principles-grid {
          grid-template-columns: 1fr;
        }

        .info-hero h1 {
          max-width: none;
        }
      }

      @media (max-width: 720px) {
        .info-hero,
        .story-card,
        .pillar-card,
        .principle-card {
          padding: 1rem;
        }

        .hero-actions,
        .hero-actions .btn {
          width: 100%;
        }

        .hero-actions .btn {
          justify-content: center;
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly pillars = [
    {
      icon: 'target',
      title: 'البدء من الاحتياج',
      description: 'كل دورة تبدأ بسبب تشغيلي أو مهاري واضح، وليس فقط لأن محتوى التدريب متاح.',
    },
    {
      icon: 'book-open',
      title: 'تحويل التدريب إلى تنفيذ',
      description: 'المحتوى يُقسم إلى دروس وخطوات متابعة تجعل التنفيذ قابلاً للإدارة والقراءة.',
    },
    {
      icon: 'chart-bars',
      title: 'إغلاق الحلقة بالقياس',
      description: 'النتيجة النهائية تُقرأ من خلال مؤشرات الأداء والتحسن قبل التدريب وبعده.',
    },
  ];
  protected readonly operatingModel = [
    {
      icon: 'flag',
      title: 'تحديد الهدف',
      description: 'الإدارة أو الموارد البشرية تربط المهارة بالدورة وبمؤشر الأداء المطلوب تحريكه.',
    },
    {
      icon: 'users',
      title: 'إسناد التنفيذ',
      description: 'يتم توزيع التدريب على الأفراد أو الفرق مع وضوح حالة كل مكلف عبر المسار.',
    },
    {
      icon: 'chart',
      title: 'قراءة النتيجة',
      description: 'المدير والإدارة يقرآن الفرق بين التنفيذ وبين التحسن الفعلي في المخرجات.',
    },
  ];
  protected readonly audiences = [
    {
      icon: 'user',
      title: 'الموظف',
      description: 'يرى ما هو مطلوب منه، ينجز الدروس، ويتابع تقدمه ضمن مسار واضح.',
    },
    {
      icon: 'briefcase',
      title: 'المدير',
      description: 'يراقب التزام الفريق ويقارن التنفيذ بنتيجة الأداء على مستوى الأفراد.',
    },
    {
      icon: 'dashboard',
      title: 'الإدارة والموارد البشرية',
      description: 'تدير البرامج، تربط التدريب بالمؤشرات، وتراجع أثر الاستثمار التدريبي بلغة تشغيلية.',
    },
  ];
  protected readonly principles = [
    {
      title: 'الرؤية التنفيذية قبل التفاصيل',
      description: 'الصفحات واللوحات مصممة لتوضح ماذا يجري الآن وما الذي تغيّر بعد التنفيذ.',
    },
    {
      title: 'تقليل الفجوة بين المحتوى والنتيجة',
      description: 'لا نعرض الدورة كعنصر منفصل؛ نعرضها ضمن علاقة مباشرة مع التقدم والتحسن.',
    },
    {
      title: 'تجربة عربية مؤسسية',
      description: 'المحتوى والواجهة والنبرة صُممت لتناسب بيئة عمل عربية داخلية واضحة ومباشرة.',
    },
  ];

  protected goToWorkspace() {
    const user = this.authService.currentUser();
    this.router.navigateByUrl(this.authService.roleHome(user?.role));
  }
}
