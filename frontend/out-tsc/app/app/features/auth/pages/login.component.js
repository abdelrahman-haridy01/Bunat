import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components';
import { getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
function LoginComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.email, ctx_r0.validationMessages.email), " ");
} }
function LoginComponent_div_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.password, ctx_r0.validationMessages.password), " ");
} }
function LoginComponent_button_87_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 38);
    i0.ɵɵlistener("click", function LoginComponent_button_87_Template_button_click_0_listener() { const account_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.applyDemoAccount(account_r3.email)); });
    i0.ɵɵelementStart(1, "div", 39)(2, "span", 40);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 41);
    i0.ɵɵtext(5, "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u062D\u0633\u0627\u0628");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "small");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const account_r3 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(account_r3.role);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(account_r3.email);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(account_r3.note);
} }
export class LoginComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.authService = inject(AuthService);
        this.router = inject(Router);
        this.loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.demoAccounts = [
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
                email: 'content@bunat.local',
                role: 'مدير المحتوى',
                note: 'إدارة الدورات والمحتوى والاختبارات والشهادات',
            },
            {
                email: 'employee1@bunat.local',
                role: 'الموظف',
                note: 'تجربة تنفيذ التعلم من منظور المستخدم النهائي',
            },
        ];
        this.validationMessages = {
            email: {
                required: 'أدخل البريد الإلكتروني.',
                email: 'أدخل بريداً إلكترونياً صحيحاً.',
            },
            password: {
                required: 'أدخل كلمة المرور.',
                minlength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',
            },
        };
        this.form = this.fb.nonNullable.group({
            email: ['admin@bunat.local', [Validators.required, Validators.email]],
            password: ['Password123!', [Validators.required, Validators.minLength(6)]],
        });
    }
    applyDemoAccount(email) {
        this.form.patchValue({
            email,
            password: 'Password123!',
        });
    }
    submit() {
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
    static { this.ɵfac = function LoginComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoginComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoginComponent, selectors: [["app-login"]], decls: 88, vars: 15, consts: [[1, "login-shell"], [1, "login-backdrop"], [1, "login-layout"], [1, "login-intro"], ["routerLink", "/home", 1, "back-link"], ["name", "book-open", 3, "size"], [1, "brand-mark"], [1, "brand-mark__badge"], [1, "eyebrow"], [1, "intro-copy"], [1, "intro-grid"], [1, "intro-stat"], [1, "intro-highlights"], [1, "intro-highlight"], ["name", "target", 3, "size"], ["name", "shield", 3, "size"], ["name", "bolt", 3, "size"], [1, "login-card", "card"], [1, "login-card__top"], [1, "login-card__label"], [1, "section-title"], [1, "section-subtitle"], [1, "password-note"], ["novalidate", "", 1, "page-grid", 3, "ngSubmit", "formGroup"], [1, "field"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email"], ["class", "field-error", 4, "ngIf"], ["for", "password"], ["id", "password", "type", "password", "formControlName", "password"], ["type", "submit", 1, "btn", "btn-primary", "login-submit", 3, "disabled"], [1, "login-card__footer"], [1, "accounts-panel", "card"], [1, "accounts-panel__header"], [1, "eyebrow", "eyebrow--muted"], [1, "demo-accounts"], ["class", "demo-account", "type", "button", 3, "click", 4, "ngFor", "ngForOf"], [1, "field-error"], ["type", "button", 1, "demo-account", 3, "click"], [1, "demo-account__head"], [1, "demo-account__role"], [1, "demo-account__action"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "div", 1);
            i0.ɵɵelementStart(2, "section", 2)(3, "aside", 3)(4, "a", 4);
            i0.ɵɵelement(5, "app-icon", 5);
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 6)(9, "span", 7);
            i0.ɵɵtext(10, "\u0628\u064F\u0646\u0627\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12, "\u0645\u0646\u0635\u0629 \u0631\u0628\u0637 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0627\u0644\u0623\u062B\u0631");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "h1");
            i0.ɵɵtext(14, "\u0648\u0627\u062C\u0647\u0629 \u062F\u062E\u0648\u0644 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u062A\u0646\u0642\u0644 \u0628\u064A\u0646 \u0623\u062F\u0648\u0627\u0631 \u0627\u0644\u0645\u0646\u0635\u0629 \u0628\u062B\u0642\u0629 \u0648\u0648\u0636\u0648\u062D.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 9);
            i0.ɵɵtext(16, " \u0627\u062F\u062E\u0644 \u0628\u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0644\u062A\u062C\u0631\u0628\u0629 \u0645\u0633\u0627\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0623\u0648 \u0627\u0644\u0645\u062F\u064A\u0631 \u0623\u0648 \u0627\u0644\u0625\u062F\u0627\u0631\u0629. \u062A\u0645 \u062A\u0635\u0645\u064A\u0645 \u0647\u0630\u0647 \u0627\u0644\u0634\u0627\u0634\u0629 \u0644\u062A\u0628\u062F\u0648 \u0643\u0648\u0627\u062C\u0647\u0629 \u0645\u0646\u062A\u062C \u0646\u0647\u0627\u0626\u064A\u0629 \u0645\u0639 \u0625\u0628\u0642\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628\u0627\u062A \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0645\u0631\u0626\u064A\u0629 \u0648\u0633\u0647\u0644\u0629 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "div", 10)(18, "article", 11)(19, "strong");
            i0.ɵɵtext(20, "4");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "span");
            i0.ɵɵtext(22, "\u0623\u062F\u0648\u0627\u0631 \u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u062A\u062C\u0631\u0628\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "article", 11)(24, "strong");
            i0.ɵɵtext(25, "6+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "span");
            i0.ɵɵtext(27, "\u062F\u0648\u0631\u0627\u062A \u0648\u0645\u0633\u0627\u0631\u0627\u062A \u0646\u0634\u0637\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "article", 11)(29, "strong");
            i0.ɵɵtext(30, "\u0644\u062D\u0638\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "span");
            i0.ɵɵtext(32, "\u062A\u062A\u0628\u0639 \u0627\u0644\u062A\u0642\u062F\u0645 \u0648\u0627\u0644\u0623\u062B\u0631");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(33, "div", 12)(34, "div", 13);
            i0.ɵɵelement(35, "app-icon", 14);
            i0.ɵɵelementStart(36, "span");
            i0.ɵɵtext(37, "\u0631\u062D\u0644\u0629 \u0648\u0627\u0636\u062D\u0629 \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(38, "div", 13);
            i0.ɵɵelement(39, "app-icon", 15);
            i0.ɵɵelementStart(40, "span");
            i0.ɵɵtext(41, "\u062D\u0633\u0627\u0628\u0627\u062A \u062A\u062C\u0631\u064A\u0628\u064A\u0629 \u0645\u0648\u062D\u062F\u0629 \u0644\u062A\u0628\u062F\u064A\u0644 \u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0628\u0633\u0631\u0639\u0629 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0646\u0642\u0644.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 13);
            i0.ɵɵelement(43, "app-icon", 16);
            i0.ɵɵelementStart(44, "span");
            i0.ɵɵtext(45, "\u062A\u062C\u0631\u0628\u0629 \u0639\u0631\u0628\u064A\u0629 \u0643\u0627\u0645\u0644\u0629 \u0628\u0645\u0638\u0647\u0631 \u0645\u0624\u0633\u0633\u064A \u0646\u0647\u0627\u0626\u064A \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0634\u0627\u0634\u0629 \u062F\u062E\u0648\u0644 \u0645\u0624\u0642\u062A\u0629.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(46, "section", 17)(47, "div", 18)(48, "div")(49, "span", 19);
            i0.ɵɵtext(50, "\u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u062D\u0633\u0627\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "h2", 20);
            i0.ɵɵtext(52, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(53, "p", 21);
            i0.ɵɵtext(54, "\u0627\u0633\u062A\u062E\u062F\u0645 \u0627\u0644\u062D\u0633\u0627\u0628 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0644\u0644\u062F\u0648\u0631 \u0627\u0644\u0630\u064A \u062A\u0631\u064A\u062F \u0627\u0633\u062A\u0639\u0631\u0627\u0636\u0647.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(55, "div", 22);
            i0.ɵɵelement(56, "app-icon", 15);
            i0.ɵɵelementStart(57, "span");
            i0.ɵɵtext(58, "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631: ");
            i0.ɵɵelementStart(59, "b");
            i0.ɵɵtext(60, "Password123!");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(61, "form", 23);
            i0.ɵɵlistener("ngSubmit", function LoginComponent_Template_form_ngSubmit_61_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(62, "div", 24)(63, "label", 25);
            i0.ɵɵtext(64, "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(65, "input", 26);
            i0.ɵɵtemplate(66, LoginComponent_div_66_Template, 2, 1, "div", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div", 24)(68, "label", 28);
            i0.ɵɵtext(69, "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(70, "input", 29);
            i0.ɵɵtemplate(71, LoginComponent_div_71_Template, 2, 1, "div", 27);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "button", 30);
            i0.ɵɵtext(73);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(74, "div", 31)(75, "span");
            i0.ɵɵtext(76, "\u0633\u064A\u062A\u0645 \u062A\u0648\u062C\u064A\u0647\u0643 \u0645\u0628\u0627\u0634\u0631\u0629 \u0625\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0639\u062F \u0646\u062C\u0627\u062D \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(77, "section", 32)(78, "div", 33)(79, "div")(80, "span", 34);
            i0.ɵɵtext(81, "\u062D\u0633\u0627\u0628\u0627\u062A \u062A\u062C\u0631\u064A\u0628\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "h2", 20);
            i0.ɵɵtext(83, "\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(84, "p", 21);
            i0.ɵɵtext(85, "\u062A\u0628\u0642\u0649 \u0638\u0627\u0647\u0631\u0629 \u0623\u0633\u0641\u0644 \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0633\u0631\u064A\u0639 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0646\u0642\u0644.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(86, "div", 35);
            i0.ɵɵtemplate(87, LoginComponent_button_87_Template, 10, 3, "button", 36);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(30);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.email));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.email));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.password));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.password));
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0642\u0642..." : "\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0644\u0648\u062D\u0629", " ");
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngForOf", ctx.demoAccounts);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, RouterLink, IconComponent], styles: [".login-shell[_ngcontent-%COMP%] {\n        min-height: 100vh;\n        position: relative;\n        overflow: hidden;\n        padding: 2rem 1.25rem 3rem;\n      }\n\n      .login-backdrop[_ngcontent-%COMP%] {\n        position: absolute;\n        inset: 0;\n        background:\n          radial-gradient(circle at top right, rgba(15, 76, 129, 0.18), transparent 28%),\n          radial-gradient(circle at left 20%, rgba(20, 87, 58, 0.16), transparent 30%),\n          linear-gradient(145deg, #fbfcff 0%, #eff4f8 48%, #f7fbf7 100%);\n        pointer-events: none;\n      }\n\n      .login-layout[_ngcontent-%COMP%] {\n        position: relative;\n        width: min(1180px, 100%);\n        margin: 0 auto;\n        display: grid;\n        grid-template-columns: minmax(0, 1.2fr) minmax(340px, 430px);\n        gap: 1.25rem;\n        align-items: stretch;\n      }\n\n      .login-intro[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%] {\n        padding: 1.75rem;\n        border-radius: 30px;\n      }\n\n      .login-intro[_ngcontent-%COMP%] {\n        background:\n          radial-gradient(circle at top left, rgba(223, 242, 231, 0.95), transparent 26%),\n          linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(238, 245, 252, 0.94) 100%);\n        border: 1px solid rgba(20, 87, 58, 0.1);\n        box-shadow: 0 30px 70px rgba(24, 39, 75, 0.08);\n        backdrop-filter: blur(10px);\n      }\n\n      .back-link[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.55rem;\n        margin-bottom: 1rem;\n        color: var(--color-secondary-default);\n      }\n\n      .brand-mark[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.8rem;\n        margin-top: 0.4rem;\n      }\n\n      .brand-mark__badge[_ngcontent-%COMP%] {\n        display: inline-flex;\n        width: fit-content;\n        align-items: center;\n        justify-content: center;\n        padding: 0.45rem 0.95rem;\n        border-radius: 999px;\n        background: linear-gradient(135deg, var(--color-primary-default), #1f7d53);\n        color: white;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n      }\n\n      .eyebrow[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        width: fit-content;\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.78);\n        border: 1px solid rgba(15, 76, 129, 0.12);\n        color: var(--color-secondary-default);\n        font-size: 0.85rem;\n        font-weight: 600;\n      }\n\n      .eyebrow--muted[_ngcontent-%COMP%] {\n        background: var(--color-neutral-100);\n        border-color: var(--color-neutral-200);\n      }\n\n      .login-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        margin: 1.15rem 0 0.85rem;\n        color: var(--color-display);\n        font-size: clamp(2.2rem, 4vw, 4rem);\n        line-height: 1.12;\n        max-width: 11ch;\n      }\n\n      .intro-copy[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-primary-paragraph);\n        line-height: 1.95;\n        max-width: 62ch;\n      }\n\n      .intro-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n        gap: 0.85rem;\n        margin-top: 1.5rem;\n      }\n\n      .intro-stat[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.2rem;\n        padding: 1rem;\n        border-radius: 22px;\n        background: rgba(255, 255, 255, 0.72);\n        border: 1px solid rgba(15, 76, 129, 0.1);\n      }\n\n      .intro-stat[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        font-size: 1.35rem;\n        color: var(--color-display);\n      }\n\n      .intro-stat[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n\n      .intro-highlights[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.75rem;\n        margin-top: 1.25rem;\n      }\n\n      .intro-highlight[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        padding: 0.9rem 1rem;\n        border-radius: 18px;\n        background: rgba(255, 255, 255, 0.62);\n        border: 1px solid rgba(213, 221, 230, 0.85);\n        color: var(--color-primary-paragraph);\n      }\n\n      .intro-highlight[_ngcontent-%COMP%]   app-icon[_ngcontent-%COMP%] {\n        color: var(--color-secondary-default);\n      }\n\n      .login-card[_ngcontent-%COMP%] {\n        background: rgba(255, 255, 255, 0.96);\n        display: grid;\n        gap: 1.35rem;\n        align-content: start;\n      }\n\n      .login-card__top[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .login-card__label[_ngcontent-%COMP%] {\n        display: inline-block;\n        margin-bottom: 0.45rem;\n        color: var(--color-secondary-default);\n        font-size: 0.88rem;\n        font-weight: 700;\n      }\n\n      .password-note[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.65rem;\n        padding: 0.75rem 0.95rem;\n        border-radius: 18px;\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n        border: 1px solid rgba(20, 87, 58, 0.08);\n      }\n\n      .login-submit[_ngcontent-%COMP%] {\n        width: 100%;\n        justify-content: center;\n        min-height: 3.35rem;\n        font-weight: 700;\n      }\n\n      .login-card__footer[_ngcontent-%COMP%] {\n        padding-top: 0.25rem;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.92rem;\n        border-top: 1px solid var(--color-neutral-200);\n      }\n\n      .accounts-panel[_ngcontent-%COMP%] {\n        position: relative;\n        width: min(1180px, 100%);\n        margin: 1.1rem auto 0;\n        padding: 1.5rem;\n        border-radius: 30px;\n        background: rgba(255, 255, 255, 0.94);\n      }\n\n      .accounts-panel__header[_ngcontent-%COMP%] {\n        margin-bottom: 1rem;\n      }\n\n      .demo-accounts[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.75rem;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .demo-account[_ngcontent-%COMP%] {\n        width: 100%;\n        border: 1px solid rgba(15, 76, 129, 0.12);\n        border-radius: 20px;\n        padding: 1rem 1.05rem;\n        background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);\n        display: grid;\n        gap: 0.35rem;\n        text-align: right;\n        cursor: pointer;\n        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;\n      }\n\n      .demo-account[_ngcontent-%COMP%]:hover {\n        border-color: rgba(20, 87, 58, 0.28);\n        box-shadow: 0 18px 35px rgba(24, 39, 75, 0.08);\n        transform: translateY(-2px);\n      }\n\n      .demo-account__head[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 0.75rem;\n      }\n\n      .demo-account__role[_ngcontent-%COMP%] {\n        color: var(--color-secondary-default);\n        font-size: 0.82rem;\n        font-weight: 700;\n      }\n\n      .demo-account__action[_ngcontent-%COMP%] {\n        color: var(--color-primary-default);\n        font-size: 0.78rem;\n        font-weight: 600;\n      }\n\n      .demo-account[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n        line-height: 1.7;\n      }\n\n      @media (max-width: 980px) {\n        .login-layout[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n\n        .intro-grid[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }\n\n      @media (max-width: 720px) {\n        .login-shell[_ngcontent-%COMP%] {\n          padding: 1rem 0.85rem 2rem;\n        }\n\n        .login-intro[_ngcontent-%COMP%], \n   .login-card[_ngcontent-%COMP%], \n   .accounts-panel[_ngcontent-%COMP%] {\n          padding: 1.1rem;\n        }\n\n        .password-note[_ngcontent-%COMP%], \n   .back-link[_ngcontent-%COMP%], \n   .demo-account__head[_ngcontent-%COMP%] {\n          align-items: flex-start;\n        }\n\n        .demo-account__head[_ngcontent-%COMP%] {\n          flex-direction: column;\n        }\n\n        .login-intro[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n          max-width: none;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoginComponent, [{
        type: Component,
        args: [{ selector: 'app-login', standalone: true, imports: [CommonModule, ReactiveFormsModule, RouterLink, IconComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .login-shell {\n        min-height: 100vh;\n        position: relative;\n        overflow: hidden;\n        padding: 2rem 1.25rem 3rem;\n      }\n\n      .login-backdrop {\n        position: absolute;\n        inset: 0;\n        background:\n          radial-gradient(circle at top right, rgba(15, 76, 129, 0.18), transparent 28%),\n          radial-gradient(circle at left 20%, rgba(20, 87, 58, 0.16), transparent 30%),\n          linear-gradient(145deg, #fbfcff 0%, #eff4f8 48%, #f7fbf7 100%);\n        pointer-events: none;\n      }\n\n      .login-layout {\n        position: relative;\n        width: min(1180px, 100%);\n        margin: 0 auto;\n        display: grid;\n        grid-template-columns: minmax(0, 1.2fr) minmax(340px, 430px);\n        gap: 1.25rem;\n        align-items: stretch;\n      }\n\n      .login-intro,\n      .login-card {\n        padding: 1.75rem;\n        border-radius: 30px;\n      }\n\n      .login-intro {\n        background:\n          radial-gradient(circle at top left, rgba(223, 242, 231, 0.95), transparent 26%),\n          linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(238, 245, 252, 0.94) 100%);\n        border: 1px solid rgba(20, 87, 58, 0.1);\n        box-shadow: 0 30px 70px rgba(24, 39, 75, 0.08);\n        backdrop-filter: blur(10px);\n      }\n\n      .back-link {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.55rem;\n        margin-bottom: 1rem;\n        color: var(--color-secondary-default);\n      }\n\n      .brand-mark {\n        display: grid;\n        gap: 0.8rem;\n        margin-top: 0.4rem;\n      }\n\n      .brand-mark__badge {\n        display: inline-flex;\n        width: fit-content;\n        align-items: center;\n        justify-content: center;\n        padding: 0.45rem 0.95rem;\n        border-radius: 999px;\n        background: linear-gradient(135deg, var(--color-primary-default), #1f7d53);\n        color: white;\n        font-weight: 700;\n        letter-spacing: 0.04em;\n      }\n\n      .eyebrow {\n        display: inline-flex;\n        align-items: center;\n        width: fit-content;\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.78);\n        border: 1px solid rgba(15, 76, 129, 0.12);\n        color: var(--color-secondary-default);\n        font-size: 0.85rem;\n        font-weight: 600;\n      }\n\n      .eyebrow--muted {\n        background: var(--color-neutral-100);\n        border-color: var(--color-neutral-200);\n      }\n\n      .login-intro h1 {\n        margin: 1.15rem 0 0.85rem;\n        color: var(--color-display);\n        font-size: clamp(2.2rem, 4vw, 4rem);\n        line-height: 1.12;\n        max-width: 11ch;\n      }\n\n      .intro-copy {\n        margin: 0;\n        color: var(--color-primary-paragraph);\n        line-height: 1.95;\n        max-width: 62ch;\n      }\n\n      .intro-grid {\n        display: grid;\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n        gap: 0.85rem;\n        margin-top: 1.5rem;\n      }\n\n      .intro-stat {\n        display: grid;\n        gap: 0.2rem;\n        padding: 1rem;\n        border-radius: 22px;\n        background: rgba(255, 255, 255, 0.72);\n        border: 1px solid rgba(15, 76, 129, 0.1);\n      }\n\n      .intro-stat strong {\n        font-size: 1.35rem;\n        color: var(--color-display);\n      }\n\n      .intro-stat span {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n\n      .intro-highlights {\n        display: grid;\n        gap: 0.75rem;\n        margin-top: 1.25rem;\n      }\n\n      .intro-highlight {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        padding: 0.9rem 1rem;\n        border-radius: 18px;\n        background: rgba(255, 255, 255, 0.62);\n        border: 1px solid rgba(213, 221, 230, 0.85);\n        color: var(--color-primary-paragraph);\n      }\n\n      .intro-highlight app-icon {\n        color: var(--color-secondary-default);\n      }\n\n      .login-card {\n        background: rgba(255, 255, 255, 0.96);\n        display: grid;\n        gap: 1.35rem;\n        align-content: start;\n      }\n\n      .login-card__top {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .login-card__label {\n        display: inline-block;\n        margin-bottom: 0.45rem;\n        color: var(--color-secondary-default);\n        font-size: 0.88rem;\n        font-weight: 700;\n      }\n\n      .password-note {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.65rem;\n        padding: 0.75rem 0.95rem;\n        border-radius: 18px;\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n        border: 1px solid rgba(20, 87, 58, 0.08);\n      }\n\n      .login-submit {\n        width: 100%;\n        justify-content: center;\n        min-height: 3.35rem;\n        font-weight: 700;\n      }\n\n      .login-card__footer {\n        padding-top: 0.25rem;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.92rem;\n        border-top: 1px solid var(--color-neutral-200);\n      }\n\n      .accounts-panel {\n        position: relative;\n        width: min(1180px, 100%);\n        margin: 1.1rem auto 0;\n        padding: 1.5rem;\n        border-radius: 30px;\n        background: rgba(255, 255, 255, 0.94);\n      }\n\n      .accounts-panel__header {\n        margin-bottom: 1rem;\n      }\n\n      .demo-accounts {\n        display: grid;\n        gap: 0.75rem;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .demo-account {\n        width: 100%;\n        border: 1px solid rgba(15, 76, 129, 0.12);\n        border-radius: 20px;\n        padding: 1rem 1.05rem;\n        background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);\n        display: grid;\n        gap: 0.35rem;\n        text-align: right;\n        cursor: pointer;\n        transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;\n      }\n\n      .demo-account:hover {\n        border-color: rgba(20, 87, 58, 0.28);\n        box-shadow: 0 18px 35px rgba(24, 39, 75, 0.08);\n        transform: translateY(-2px);\n      }\n\n      .demo-account__head {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 0.75rem;\n      }\n\n      .demo-account__role {\n        color: var(--color-secondary-default);\n        font-size: 0.82rem;\n        font-weight: 700;\n      }\n\n      .demo-account__action {\n        color: var(--color-primary-default);\n        font-size: 0.78rem;\n        font-weight: 600;\n      }\n\n      .demo-account small {\n        color: var(--color-secondary-paragraph);\n        line-height: 1.7;\n      }\n\n      @media (max-width: 980px) {\n        .login-layout {\n          grid-template-columns: 1fr;\n        }\n\n        .intro-grid {\n          grid-template-columns: 1fr;\n        }\n      }\n\n      @media (max-width: 720px) {\n        .login-shell {\n          padding: 1rem 0.85rem 2rem;\n        }\n\n        .login-intro,\n        .login-card,\n        .accounts-panel {\n          padding: 1.1rem;\n        }\n\n        .password-note,\n        .back-link,\n        .demo-account__head {\n          align-items: flex-start;\n        }\n\n        .demo-account__head {\n          flex-direction: column;\n        }\n\n        .login-intro h1 {\n          max-width: none;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/pages/login.component.ts", lineNumber: 447 }); })();
//# sourceMappingURL=login.component.js.map