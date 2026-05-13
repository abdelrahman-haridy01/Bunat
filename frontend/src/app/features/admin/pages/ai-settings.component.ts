import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { IconComponent } from '../../../shared/components';

type AiProvider = 'openai' | 'gemini';

const PROVIDER_CONFIG: Record<
  AiProvider,
  {
    label: string;
    providerName: string;
    apiKeyLabel: string;
    apiKeyPlaceholder: string;
    defaultModel: string;
    modelHint: string;
    baseUrlPlaceholder: string;
    keyGuideUrl: string;
    keyGuideLabel: string;
  }
> = {
  openai: {
    label: 'GPT من OpenAI',
    providerName: 'OpenAI',
    apiKeyLabel: 'OpenAI API Key',
    apiKeyPlaceholder: 'sk-...',
    defaultModel: 'gpt-4o-mini',
    modelHint: 'مثال: gpt-4o-mini',
    baseUrlPlaceholder: 'https://api.openai.com',
    keyGuideUrl: 'https://developers.openai.com/api/docs/quickstart',
    keyGuideLabel: 'طريقة الحصول على مفتاح OpenAI',
  },
  gemini: {
    label: 'Gemini من Google',
    providerName: 'Google Gemini',
    apiKeyLabel: 'Gemini API Key',
    apiKeyPlaceholder: 'AIza...',
    defaultModel: 'gemini-2.5-flash',
    modelHint: 'مثال: gemini-2.5-flash',
    baseUrlPlaceholder: 'https://generativelanguage.googleapis.com',
    keyGuideUrl: 'https://ai.google.dev/gemini-api/docs/api-key',
    keyGuideLabel: 'طريقة الحصول على مفتاح Gemini',
  },
};

@Component({
  selector: 'app-ai-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="sparkles" [size]="20" /></span>
              <span>إعدادات الذكاء الاصطناعي</span>
            </h2>
            <p class="section-subtitle">
              يتم استخدام هذه الإعدادات مع حسابك الحالي فقط عند توليد الدورات والعروض والاختبارات.
            </p>
          </div>
          <span class="status-chip info">{{ currentRoleLabel() }}</span>
        </div>

        <form class="settings-form" [formGroup]="form" (ngSubmit)="submit()">
          <div class="form-grid">
            <div class="field">
              <label>مزود الذكاء الاصطناعي</label>
              <select formControlName="provider" (change)="onProviderChange()">
                <option *ngFor="let option of providerOptions" [value]="option.value">{{ option.label }}</option>
              </select>
              <div class="field-help">اختر المزود ثم أضف المفتاح والنموذج المناسبين له.</div>
            </div>

            <div class="field">
              <label>روابط الحصول على المفتاح</label>
              <div class="provider-links">
                <a
                  *ngFor="let option of providerOptions"
                  class="provider-link"
                  [href]="option.keyGuideUrl"
                  target="_blank"
                  rel="noreferrer"
                >
                  {{ option.keyGuideLabel }}
                </a>
              </div>
            </div>

            <div class="field field--full">
              <label>{{ activeProviderConfig().apiKeyLabel }}</label>
              <input type="password" formControlName="apiKey" [placeholder]="activeProviderConfig().apiKeyPlaceholder" />
              <div class="field-help" *ngIf="showStoredKeyNotice()">
                المفتاح الحالي المحفوظ لـ {{ storedProviderConfig().providerName }}: {{ maskedKey() }}
              </div>
            </div>

            <div class="field">
              <label>النموذج / الوكيل</label>
              <input formControlName="model" [placeholder]="activeProviderConfig().defaultModel" />
              <div class="field-help">{{ activeProviderConfig().modelHint }}</div>
            </div>

            <div class="field">
              <label>Base URL</label>
              <input formControlName="baseUrl" [placeholder]="activeProviderConfig().baseUrlPlaceholder" />
              <div class="field-help">اتركه فارغاً لاستخدام الرابط الافتراضي لـ {{ activeProviderConfig().providerName }}.</div>
            </div>

            <div class="field">
              <label>اللغة الافتراضية</label>
              <input formControlName="language" placeholder="ar" />
            </div>

            <div class="field">
              <label>عدد الدروس الافتراضي</label>
              <input type="number" formControlName="defaultLessonCount" min="1" max="20" />
            </div>

            <div class="field">
              <label>عدد أسئلة الاختبار النهائي</label>
              <input type="number" formControlName="defaultFinalExamQuestionCount" min="1" max="20" />
            </div>
          </div>

          <div class="message-box notice-box" *ngIf="providerChangedSinceLastSave()">
            تم تغيير المزود إلى {{ activeProviderConfig().providerName }}. أدخل مفتاحاً جديداً قبل الحفظ.
          </div>

          <div class="message-box notice-box" *ngIf="!hasStoredKey()">
            لا يوجد مفتاح محفوظ حالياً. أدخل مفتاح API قبل حفظ الإعدادات للمرة الأولى.
          </div>

          <div class="message-box info" *ngIf="message()">
            {{ message() }}
          </div>

          <div class="dialog-actions">
            <button class="btn btn-danger" type="button" (click)="deleteKey()" [disabled]="loading() || !hasStoredKey()">
              حذف المفتاح
            </button>
            <button class="btn btn-primary" type="submit" [disabled]="loading() || form.invalid || isMissingRequiredKey()">
              {{ loading() ? 'جارٍ الحفظ...' : 'حفظ الإعدادات' }}
            </button>
          </div>
        </form>
      </article>
    </section>
  `,
  styles: [
    `
      .panel {
        padding: 1.5rem;
      }

      .settings-form {
        display: grid;
        gap: 1rem;
      }

      .field--full {
        grid-column: 1 / -1;
      }

      .field-help {
        margin-top: 0.45rem;
        color: var(--color-secondary-paragraph);
        font-size: 0.9rem;
      }

      .provider-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .provider-link {
        color: var(--color-secondary-default);
        font-size: 0.92rem;
        font-weight: 600;
        text-decoration: underline;
        text-underline-offset: 0.18rem;
      }

      .notice-box {
        background: var(--color-warning-light);
        color: var(--color-warning);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiSettingsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly usersApi = inject(UsersApiService);
  private readonly authService = inject(AuthService);

  protected readonly loading = signal(false);
  protected readonly hasStoredKey = signal(false);
  protected readonly maskedKey = signal<string | null>(null);
  protected readonly message = signal('');
  protected readonly selectedProvider = signal<AiProvider>('openai');
  protected readonly storedProvider = signal<AiProvider>('openai');
  protected readonly activeProviderConfig = computed(() => PROVIDER_CONFIG[this.selectedProvider()]);
  protected readonly storedProviderConfig = computed(() => PROVIDER_CONFIG[this.storedProvider()]);
  protected readonly currentRoleLabel = computed(() => {
    const role = this.authService.currentUser()?.role;
    return ({
      admin: 'مدير النظام',
      hr: 'موارد بشرية',
      course_manager: 'مدير محتوى',
    } as Record<string, string>)[role || ''] || role || '';
  });
  protected readonly providerOptions = (Object.entries(PROVIDER_CONFIG) as Array<
    [AiProvider, (typeof PROVIDER_CONFIG)[AiProvider]]
  >).map(([value, config]) => ({
    value,
    label: config.label,
    keyGuideUrl: config.keyGuideUrl,
    keyGuideLabel: config.keyGuideLabel,
  }));

  protected readonly form = this.fb.nonNullable.group({
    provider: ['openai' as AiProvider, Validators.required],
    apiKey: [''],
    model: [PROVIDER_CONFIG.openai.defaultModel, Validators.required],
    baseUrl: [''],
    language: ['ar', Validators.required],
    defaultLessonCount: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
    defaultFinalExamQuestionCount: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
  });

  ngOnInit() {
    this.loading.set(true);
    this.usersApi
      .getAiSettings()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((settings) => {
        this.hasStoredKey.set(settings.hasApiKey);
        this.maskedKey.set(settings.maskedApiKey || null);
        this.selectedProvider.set(settings.provider);
        this.storedProvider.set(settings.provider);
        this.form.patchValue({
          provider: settings.provider,
          apiKey: '',
          model: settings.model,
          baseUrl: settings.baseUrl || '',
          language: settings.language,
          defaultLessonCount: settings.defaultLessonCount,
          defaultFinalExamQuestionCount: settings.defaultFinalExamQuestionCount,
        });
      });
  }

  protected onProviderChange() {
    const nextProvider = this.form.controls.provider.getRawValue();
    const previousProvider = this.selectedProvider();

    this.selectedProvider.set(nextProvider);
    this.message.set('');

    if (nextProvider === previousProvider) {
      return;
    }

    this.form.patchValue({
      model: PROVIDER_CONFIG[nextProvider].defaultModel,
      baseUrl: '',
    });
  }

  protected submit() {
    if (this.form.invalid || this.loading() || this.isMissingRequiredKey()) {
      return;
    }

    this.loading.set(true);
    this.message.set('');
    const payload = this.form.getRawValue();

    this.usersApi
      .updateAiSettings({
        provider: payload.provider,
        apiKey: payload.apiKey.trim() || undefined,
        model: payload.model.trim(),
        baseUrl: payload.baseUrl.trim() || null,
        language: payload.language.trim(),
        defaultLessonCount: Number(payload.defaultLessonCount),
        defaultFinalExamQuestionCount: Number(payload.defaultFinalExamQuestionCount),
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((settings) => {
        this.hasStoredKey.set(settings.hasApiKey);
        this.maskedKey.set(settings.maskedApiKey || null);
        this.selectedProvider.set(settings.provider);
        this.storedProvider.set(settings.provider);
        this.form.patchValue({
          provider: settings.provider,
          apiKey: '',
          model: settings.model,
          baseUrl: settings.baseUrl || '',
          language: settings.language,
          defaultLessonCount: settings.defaultLessonCount,
          defaultFinalExamQuestionCount: settings.defaultFinalExamQuestionCount,
        });
        this.message.set('تم تحديث إعدادات الذكاء الاصطناعي.');
      });
  }

  protected deleteKey() {
    if (this.loading() || !this.hasStoredKey()) {
      return;
    }

    this.loading.set(true);
    this.message.set('');
    this.usersApi
      .deleteAiSettingsApiKey()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe(() => {
        this.hasStoredKey.set(false);
        this.maskedKey.set(null);
        this.message.set('تم حذف المفتاح المحفوظ.');
      });
  }

  protected showStoredKeyNotice() {
    return this.hasStoredKey() && !!this.maskedKey() && this.selectedProvider() === this.storedProvider();
  }

  protected providerChangedSinceLastSave() {
    return this.hasStoredKey() && this.selectedProvider() !== this.storedProvider();
  }

  protected isMissingRequiredKey() {
    const apiKey = this.form.controls.apiKey.getRawValue().trim();
    return !apiKey && (!this.hasStoredKey() || this.providerChangedSinceLastSave());
  }
}
