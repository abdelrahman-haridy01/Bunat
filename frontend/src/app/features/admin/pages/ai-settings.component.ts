import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { IconComponent } from '../../../shared/components';

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
            <div class="field field--full">
              <label>OpenAI API Key</label>
              <input type="password" formControlName="apiKey" placeholder="sk-..." />
              <div class="field-help" *ngIf="maskedKey()">
                المفتاح الحالي محفوظ بصيغة مخفية: {{ maskedKey() }}
              </div>
            </div>

            <div class="field">
              <label>النموذج</label>
              <input formControlName="model" placeholder="gpt-4o-mini" />
            </div>

            <div class="field">
              <label>Base URL</label>
              <input formControlName="baseUrl" placeholder="https://api.openai.com" />
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

          <div class="message-box info" *ngIf="message()">
            {{ message() }}
          </div>

          <div class="dialog-actions">
            <button class="btn btn-danger" type="button" (click)="deleteKey()" [disabled]="loading() || !hasStoredKey()">
              حذف المفتاح
            </button>
            <button class="btn btn-primary" type="submit" [disabled]="loading() || form.invalid">
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
  protected readonly currentRoleLabel = computed(() => {
    const role = this.authService.currentUser()?.role;
    return ({
      admin: 'مدير النظام',
      hr: 'موارد بشرية',
      course_manager: 'مدير محتوى',
    } as Record<string, string>)[role || ''] || role || '';
  });

  protected readonly form = this.fb.nonNullable.group({
    apiKey: [''],
    model: ['gpt-4o-mini', Validators.required],
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
        this.form.patchValue({
          apiKey: '',
          model: settings.model,
          baseUrl: settings.baseUrl || '',
          language: settings.language,
          defaultLessonCount: settings.defaultLessonCount,
          defaultFinalExamQuestionCount: settings.defaultFinalExamQuestionCount,
        });
      });
  }

  protected submit() {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.message.set('');
    const payload = this.form.getRawValue();

    this.usersApi
      .updateAiSettings({
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
        this.form.patchValue({ apiKey: '' });
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
}
