import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { IconComponent } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function AiSettingsComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u0627\u0644\u0645\u0641\u062A\u0627\u062D \u0627\u0644\u062D\u0627\u0644\u064A \u0645\u062D\u0641\u0648\u0638 \u0628\u0635\u064A\u063A\u0629 \u0645\u062E\u0641\u064A\u0629: ", ctx_r0.maskedKey(), " ");
} }
function AiSettingsComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.message(), " ");
} }
export class AiSettingsComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.usersApi = inject(UsersApiService);
        this.authService = inject(AuthService);
        this.loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.hasStoredKey = signal(false, ...(ngDevMode ? [{ debugName: "hasStoredKey" }] : /* istanbul ignore next */ []));
        this.maskedKey = signal(null, ...(ngDevMode ? [{ debugName: "maskedKey" }] : /* istanbul ignore next */ []));
        this.message = signal('', ...(ngDevMode ? [{ debugName: "message" }] : /* istanbul ignore next */ []));
        this.currentRoleLabel = computed(() => {
            const role = this.authService.currentUser()?.role;
            return {
                admin: 'مدير النظام',
                hr: 'موارد بشرية',
                course_manager: 'مدير محتوى',
            }[role || ''] || role || '';
        }, ...(ngDevMode ? [{ debugName: "currentRoleLabel" }] : /* istanbul ignore next */ []));
        this.form = this.fb.nonNullable.group({
            apiKey: [''],
            model: ['gpt-4o-mini', Validators.required],
            baseUrl: [''],
            language: ['ar', Validators.required],
            defaultLessonCount: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
            defaultFinalExamQuestionCount: [5, [Validators.required, Validators.min(1), Validators.max(20)]],
        });
    }
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
    submit() {
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
    deleteKey() {
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
    static { this.ɵfac = function AiSettingsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AiSettingsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AiSettingsComponent, selectors: [["app-ai-settings"]], decls: 46, vars: 8, consts: [[1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "sparkles", 3, "size"], [1, "section-subtitle"], [1, "status-chip", "info"], [1, "settings-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field", "field--full"], ["type", "password", "formControlName", "apiKey", "placeholder", "sk-..."], ["class", "field-help", 4, "ngIf"], [1, "field"], ["formControlName", "model", "placeholder", "gpt-4o-mini"], ["formControlName", "baseUrl", "placeholder", "https://api.openai.com"], ["formControlName", "language", "placeholder", "ar"], ["type", "number", "formControlName", "defaultLessonCount", "min", "1", "max", "20"], ["type", "number", "formControlName", "defaultFinalExamQuestionCount", "min", "1", "max", "20"], ["class", "message-box info", 4, "ngIf"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "field-help"], [1, "message-box", "info"]], template: function AiSettingsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "article", 1)(2, "div", 2)(3, "div")(4, "h2", 3)(5, "span", 4);
            i0.ɵɵelement(6, "app-icon", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p", 6);
            i0.ɵɵtext(10, " \u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0647 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0645\u0639 \u062D\u0633\u0627\u0628\u0643 \u0627\u0644\u062D\u0627\u0644\u064A \u0641\u0642\u0637 \u0639\u0646\u062F \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0648\u0627\u0644\u0639\u0631\u0648\u0636 \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "span", 7);
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "form", 8);
            i0.ɵɵlistener("ngSubmit", function AiSettingsComponent_Template_form_ngSubmit_13_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(14, "div", 9)(15, "div", 10)(16, "label");
            i0.ɵɵtext(17, "OpenAI API Key");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(18, "input", 11);
            i0.ɵɵtemplate(19, AiSettingsComponent_div_19_Template, 2, 1, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "div", 13)(21, "label");
            i0.ɵɵtext(22, "\u0627\u0644\u0646\u0645\u0648\u0630\u062C");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(23, "input", 14);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 13)(25, "label");
            i0.ɵɵtext(26, "Base URL");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(27, "input", 15);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "div", 13)(29, "label");
            i0.ɵɵtext(30, "\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(31, "input", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "div", 13)(33, "label");
            i0.ɵɵtext(34, "\u0639\u062F\u062F \u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(35, "input", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 13)(37, "label");
            i0.ɵɵtext(38, "\u0639\u062F\u062F \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(39, "input", 18);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(40, AiSettingsComponent_div_40_Template, 2, 1, "div", 19);
            i0.ɵɵelementStart(41, "div", 20)(42, "button", 21);
            i0.ɵɵlistener("click", function AiSettingsComponent_Template_button_click_42_listener() { return ctx.deleteKey(); });
            i0.ɵɵtext(43, " \u062D\u0630\u0641 \u0627\u0644\u0645\u0641\u062A\u0627\u062D ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "button", 22);
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.currentRoleLabel());
            i0.ɵɵadvance();
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.maskedKey());
            i0.ɵɵadvance(21);
            i0.ɵɵproperty("ngIf", ctx.message());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading() || !ctx.hasStoredKey());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", ctx.loading() || ctx.form.invalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A", " ");
        } }, dependencies: [CommonModule, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.MinValidator, i2.MaxValidator, i2.FormGroupDirective, i2.FormControlName, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .settings-form[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .field--full[_ngcontent-%COMP%] {\n        grid-column: 1 / -1;\n      }\n\n      .field-help[_ngcontent-%COMP%] {\n        margin-top: 0.45rem;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AiSettingsComponent, [{
        type: Component,
        args: [{ selector: 'app-ai-settings', standalone: true, imports: [CommonModule, ReactiveFormsModule, IconComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .settings-form {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .field--full {\n        grid-column: 1 / -1;\n      }\n\n      .field-help {\n        margin-top: 0.45rem;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AiSettingsComponent, { className: "AiSettingsComponent", filePath: "src/app/features/admin/pages/ai-settings.component.ts", lineNumber: 106 }); })();
//# sourceMappingURL=ai-settings.component.js.map