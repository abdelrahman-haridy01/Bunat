import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function LandingComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function LandingComponent_button_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToWorkspace()); });
    i0.ɵɵtext(1, " \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0644\u0648\u062D\u062A\u064A ");
    i0.ɵɵelementEnd();
} }
function LandingComponent_article_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 40)(1, "span", 41);
    i0.ɵɵelement(2, "app-icon", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", item_r3.icon)("size", 18);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r3.description);
} }
function LandingComponent_article_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 43);
    i0.ɵɵelement(1, "app-icon", 42);
    i0.ɵɵelementStart(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const point_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", point_r4.icon)("size", 18);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(point_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(point_r4.description);
} }
function LandingComponent_article_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 44)(1, "div", 45);
    i0.ɵɵelement(2, "app-icon", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const goal_r5 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", goal_r5.icon)("size", 22);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(goal_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(goal_r5.description);
} }
function LandingComponent_article_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 46)(1, "div", 47);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 48)(4, "span", 49);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "strong");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const step_r6 = ctx.$implicit;
    const index_r7 = ctx.index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("0", index_r7 + 1);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(step_r6.stage);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(step_r6.description);
} }
function LandingComponent_article_68_li_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r8);
} }
function LandingComponent_article_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 50)(1, "div", 51);
    i0.ɵɵelement(2, "app-icon", 42);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "ul");
    i0.ɵɵtemplate(8, LandingComponent_article_68_li_8_Template, 2, 1, "li", 52);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const role_r9 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", role_r9.icon)("size", 20);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(role_r9.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(role_r9.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", role_r9.points);
} }
function LandingComponent_article_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 53)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.value);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r10.hint);
} }
function LandingComponent_button_81_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 39);
    i0.ɵɵlistener("click", function LandingComponent_button_81_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToWorkspace()); });
    i0.ɵɵtext(1, " \u0641\u062A\u062D \u0627\u0644\u0644\u0648\u062D\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 ");
    i0.ɵɵelementEnd();
} }
export class LandingComponent {
    constructor() {
        this.authService = inject(AuthService);
        this.router = inject(Router);
        this.isAuthenticated = this.authService.isAuthenticated;
        this.signalCards = [
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
        this.executivePoints = [
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
        this.goals = [
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
        this.sequenceSteps = [
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
        this.roleCards = [
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
        this.metrics = [
            { value: '6', label: 'مراحل واضحة', hint: 'من تعريف الحاجة إلى قراءة الأثر' },
            { value: '3', label: 'أدوار رئيسية', hint: 'موظف، مدير، إدارة/موارد بشرية' },
            { value: '1', label: 'مسار موحد', hint: 'التكليف والتعلم والقياس في مكان واحد' },
            { value: '2', label: 'نقطتا قياس', hint: 'قبل التدريب وبعده لكل مؤشر مستهدف' },
        ];
    }
    goToLogin() {
        this.router.navigate(['/login']);
    }
    goToWorkspace() {
        const user = this.authService.currentUser();
        this.router.navigateByUrl(this.authService.roleHome(user?.role));
    }
    static { this.ɵfac = function LandingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LandingComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LandingComponent, selectors: [["app-landing"]], decls: 82, vars: 8, consts: [[1, "landing-shell"], [1, "landing-hero"], [1, "landing-topbar"], [1, "brand-mark"], [1, "brand-mark__badge"], [1, "landing-topbar__actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["class", "btn btn-secondary", "type", "button", 3, "click", 4, "ngIf"], [1, "hero-grid"], [1, "hero-copy"], [1, "eyebrow"], [1, "hero-lead"], [1, "hero-actions"], ["href", "#solution-sequence", 1, "btn", "btn-primary"], ["href", "#solution-goals", 1, "btn", "btn-secondary"], [1, "signal-grid"], ["class", "signal-card", 4, "ngFor", "ngForOf"], [1, "executive-card", "card"], [1, "executive-card__eyebrow"], [1, "executive-points"], ["class", "executive-point", 4, "ngFor", "ngForOf"], [1, "executive-banner"], ["id", "solution-goals", 1, "section-band"], [1, "section-heading"], [1, "goals-grid"], ["class", "goal-card", 4, "ngFor", "ngForOf"], ["id", "solution-sequence", 1, "section-band"], [1, "sequence-layout"], [1, "sequence-line"], ["class", "sequence-step", 4, "ngFor", "ngForOf"], [1, "section-band"], [1, "roles-grid"], ["class", "role-card", 4, "ngFor", "ngForOf"], [1, "summary-panel", "card"], [1, "section-heading", "section-heading--compact"], [1, "summary-grid"], ["class", "summary-metric", 4, "ngFor", "ngForOf"], [1, "summary-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "signal-card"], [1, "signal-card__icon"], [3, "name", "size"], [1, "executive-point"], [1, "goal-card"], [1, "goal-card__icon"], [1, "sequence-step"], [1, "sequence-step__marker"], [1, "sequence-step__content", "card"], [1, "sequence-step__stage"], [1, "role-card"], [1, "role-card__icon"], [4, "ngFor", "ngForOf"], [1, "summary-metric"]], template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "section", 1)(2, "header", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵtext(5, "\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div")(7, "strong");
            i0.ɵɵtext(8, "\u0628\u064F\u0646\u0627\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "p");
            i0.ɵɵtext(10, "\u0645\u0646\u0635\u0629 \u062F\u0627\u062E\u0644\u064A\u0629 \u0644\u0631\u0628\u0637 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0628\u0627\u0644\u0623\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u0623\u062F\u0627\u0621");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(11, "div", 5)(12, "button", 6);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_12_listener() { return ctx.goToLogin(); });
            i0.ɵɵtext(13, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(14, LandingComponent_button_14_Template, 2, 0, "button", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "div", 8)(16, "div", 9)(17, "span", 10);
            i0.ɵɵtext(18, "\u0639\u0631\u0636 \u0627\u0644\u0641\u0643\u0631\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "h1");
            i0.ɵɵtext(20, "\u0645\u0646\u0635\u0629 \u062A\u0634\u0631\u062D \u0644\u0644\u0645\u062F\u064A\u0631 \u0643\u064A\u0641 \u064A\u062A\u062D\u0648\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0625\u0644\u0649 \u0642\u0631\u0627\u0631\u060C \u062A\u0646\u0641\u064A\u0630\u060C \u062B\u0645 \u0623\u062B\u0631 \u0642\u0627\u0628\u0644 \u0644\u0644\u0642\u064A\u0627\u0633.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "p", 11);
            i0.ɵɵtext(22, " \u0628\u064F\u0646\u0627\u0629 \u0644\u0627 \u062A\u0642\u062F\u0645 \u0645\u062D\u062A\u0648\u0649 \u062A\u062F\u0631\u064A\u0628\u064A \u0641\u0642\u0637\u060C \u0628\u0644 \u062A\u0628\u0646\u064A \u0633\u0644\u0633\u0644\u0629 \u0648\u0627\u0636\u062D\u0629 \u062A\u0628\u062F\u0623 \u0645\u0646 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u062C\u060C \u0645\u0631\u0648\u0631\u0627\u064B \u0628\u0625\u0633\u0646\u0627\u062F \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0648\u0627\u0644\u062F\u0631\u0648\u0633\u060C \u0648\u062A\u0646\u062A\u0647\u064A \u0628\u0642\u064A\u0627\u0633 \u0627\u0644\u062A\u063A\u064A\u0631 \u0641\u064A \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 12)(24, "a", 13);
            i0.ɵɵtext(25, "\u0627\u0633\u062A\u0639\u0631\u0636 \u0627\u0644\u062A\u0633\u0644\u0633\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "a", 14);
            i0.ɵɵtext(27, "\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div", 15);
            i0.ɵɵtemplate(29, LandingComponent_article_29_Template, 8, 4, "article", 16);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "aside", 17)(31, "span", 18);
            i0.ɵɵtext(32, "\u0645\u0627 \u0627\u0644\u0630\u064A \u064A\u0631\u0627\u0647 \u0627\u0644\u0645\u062F\u064A\u0631\u061F");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "h2");
            i0.ɵɵtext(34, "\u0642\u0635\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629 \u0643\u0627\u0645\u0644\u0629 \u0639\u0644\u0649 \u0634\u0627\u0634\u0629 \u0648\u0627\u062D\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 19);
            i0.ɵɵtemplate(36, LandingComponent_article_36_Template, 7, 4, "article", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 21)(38, "span");
            i0.ɵɵtext(39, "\u0627\u0644\u062E\u0644\u0627\u0635\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "strong");
            i0.ɵɵtext(41, "\u0644\u0645 \u0646\u0639\u062F \u0646\u0633\u0623\u0644 \u0641\u0642\u0637 \u0645\u0646 \u062D\u0636\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u060C \u0628\u0644 \u0645\u0627 \u0627\u0644\u0630\u064A \u062A\u063A\u064A\u0651\u0631 \u0628\u0639\u062F\u0647.");
            i0.ɵɵelementEnd()()()()();
            i0.ɵɵelementStart(42, "section", 22)(43, "div", 23)(44, "span", 10);
            i0.ɵɵtext(45, "\u0627\u0644\u0623\u0647\u062F\u0627\u0641");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "h2");
            i0.ɵɵtext(47, "\u0627\u0644\u0645\u0646\u0635\u0629 \u0635\u064F\u0645\u0645\u062A \u0644\u062D\u0644 \u062B\u0644\u0627\u062B \u0641\u062C\u0648\u0627\u062A \u0625\u062F\u0627\u0631\u064A\u0629 \u0641\u064A \u0628\u0631\u0627\u0645\u062C \u0627\u0644\u062A\u0637\u0648\u064A\u0631.");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "p");
            i0.ɵɵtext(49, "\u0627\u0644\u0647\u062F\u0641 \u0644\u064A\u0633 \u0623\u062A\u0645\u062A\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0641\u0642\u0637\u060C \u0628\u0644 \u062C\u0639\u0644 \u0623\u062B\u0631\u0647 \u0642\u0627\u0628\u0644\u0627\u064B \u0644\u0644\u0639\u0631\u0636\u060C \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629\u060C \u0648\u0627\u062A\u062E\u0627\u0630 \u0627\u0644\u0642\u0631\u0627\u0631.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 24);
            i0.ɵɵtemplate(51, LandingComponent_article_51_Template, 7, 4, "article", 25);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "section", 26)(53, "div", 23)(54, "span", 10);
            i0.ɵɵtext(55, "\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u062D\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "h2");
            i0.ɵɵtext(57, "\u0647\u0630\u0627 \u0647\u0648 \u0627\u0644\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0630\u064A \u062A\u0639\u0631\u0636\u0647 \u0627\u0644\u0645\u0646\u0635\u0629 \u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0625\u0644\u0649 \u0627\u0644\u0646\u0647\u0627\u064A\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(58, "div", 27);
            i0.ɵɵelement(59, "div", 28);
            i0.ɵɵtemplate(60, LandingComponent_article_60_Template, 10, 4, "article", 29);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(61, "section", 30)(62, "div", 23)(63, "span", 10);
            i0.ɵɵtext(64, "\u0643\u064A\u0641 \u062A\u0639\u0645\u0644 \u0627\u0644\u0623\u062F\u0648\u0627\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(65, "h2");
            i0.ɵɵtext(66, "\u0643\u0644 \u062F\u0648\u0631 \u064A\u062F\u062E\u0644 \u0641\u064A \u0627\u0644\u0644\u062D\u0638\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0636\u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0633\u0644\u0633\u0644\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(67, "div", 31);
            i0.ɵɵtemplate(68, LandingComponent_article_68_Template, 9, 5, "article", 32);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(69, "section", 30)(70, "div", 33)(71, "div", 34)(72, "span", 10);
            i0.ɵɵtext(73, "\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "h2");
            i0.ɵɵtext(75, "\u0645\u0646\u0635\u0629 \u0648\u0627\u062D\u062F\u0629 \u062A\u062C\u0645\u0639 \u0627\u0644\u062A\u0639\u0644\u0645 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0648\u0627\u0644\u0642\u064A\u0627\u0633.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(76, "div", 35);
            i0.ɵɵtemplate(77, LandingComponent_article_77_Template, 7, 3, "article", 36);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "div", 37)(79, "button", 38);
            i0.ɵɵlistener("click", function LandingComponent_Template_button_click_79_listener() { return ctx.goToLogin(); });
            i0.ɵɵtext(80, "\u0628\u062F\u0621 \u0627\u0644\u0639\u0631\u0636 \u0639\u0628\u0631 \u0627\u0644\u062F\u062E\u0648\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(81, LandingComponent_button_81_Template, 2, 0, "button", 7);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(14);
            i0.ɵɵproperty("ngIf", ctx.isAuthenticated());
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngForOf", ctx.signalCards);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.executivePoints);
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngForOf", ctx.goals);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngForOf", ctx.sequenceSteps);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngForOf", ctx.roleCards);
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngForOf", ctx.metrics);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.isAuthenticated());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IconComponent], styles: [".landing-shell[_ngcontent-%COMP%] {\n        min-height: 100vh;\n        padding: 1.25rem;\n      }\n\n      .landing-hero[_ngcontent-%COMP%] {\n        position: relative;\n        overflow: hidden;\n        padding: 1.5rem;\n        border-radius: 32px;\n        background:\n          radial-gradient(circle at top left, rgba(209, 238, 223, 0.92), transparent 28%),\n          radial-gradient(circle at 85% 15%, rgba(15, 76, 129, 0.18), transparent 30%),\n          linear-gradient(135deg, #f7fcf8 0%, #edf6ff 52%, #ffffff 100%);\n        border: 1px solid rgba(20, 87, 58, 0.08);\n        box-shadow: 0 32px 90px rgba(15, 23, 42, 0.08);\n      }\n\n      .landing-topbar[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n        margin-bottom: 2rem;\n      }\n\n      .brand-mark[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.9rem;\n      }\n\n      .brand-mark__badge[_ngcontent-%COMP%] {\n        width: 3rem;\n        height: 3rem;\n        border-radius: 1rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: linear-gradient(135deg, #14573a, #0f4c81);\n        color: #fff;\n        font-weight: 700;\n        font-size: 1.2rem;\n        box-shadow: 0 18px 32px rgba(20, 87, 58, 0.2);\n      }\n\n      .brand-mark[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        color: var(--color-display);\n      }\n\n      .brand-mark[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.2rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .landing-topbar__actions[_ngcontent-%COMP%], \n   .hero-actions[_ngcontent-%COMP%], \n   .summary-actions[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 0.75rem;\n      }\n\n      .hero-grid[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);\n        gap: 1.25rem;\n        align-items: start;\n      }\n\n      .eyebrow[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.78);\n        border: 1px solid rgba(15, 76, 129, 0.12);\n        color: var(--color-secondary-default);\n        font-size: 0.85rem;\n        font-weight: 600;\n      }\n\n      .hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        margin: 1rem 0;\n        max-width: 11ch;\n        color: #102432;\n        font-size: clamp(2.8rem, 5vw, 5rem);\n        line-height: 1.15;\n        letter-spacing: -0.03em;\n      }\n\n      .hero-lead[_ngcontent-%COMP%] {\n        max-width: 64ch;\n        margin: 0 0 1.5rem;\n        color: var(--color-primary-paragraph);\n        font-size: 1.08rem;\n        line-height: 1.9;\n      }\n\n      .signal-grid[_ngcontent-%COMP%], \n   .goals-grid[_ngcontent-%COMP%], \n   .roles-grid[_ngcontent-%COMP%], \n   .summary-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .signal-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n        margin-top: 1.5rem;\n      }\n\n      .signal-card[_ngcontent-%COMP%], \n   .goal-card[_ngcontent-%COMP%], \n   .role-card[_ngcontent-%COMP%], \n   .summary-metric[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border-radius: 22px;\n        background: rgba(255, 255, 255, 0.84);\n        border: 1px solid rgba(20, 87, 58, 0.08);\n      }\n\n      .signal-card[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.7rem;\n      }\n\n      .signal-card__icon[_ngcontent-%COMP%], \n   .goal-card__icon[_ngcontent-%COMP%], \n   .role-card__icon[_ngcontent-%COMP%] {\n        width: 2.5rem;\n        height: 2.5rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(20, 87, 58, 0.08);\n        color: var(--color-primary-default);\n      }\n\n      .signal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .goal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .role-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .executive-point[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .sequence-step__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .summary-metric[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n      }\n\n      .signal-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .goal-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .role-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .executive-point[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .sequence-step__content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .summary-metric[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n        line-height: 1.7;\n      }\n\n      .executive-card[_ngcontent-%COMP%] {\n        padding: 1.3rem;\n        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 255, 0.98));\n      }\n\n      .executive-card__eyebrow[_ngcontent-%COMP%], \n   .sequence-step__stage[_ngcontent-%COMP%] {\n        color: var(--color-secondary-default);\n        font-size: 0.82rem;\n        font-weight: 700;\n      }\n\n      .executive-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n        margin: 0.5rem 0 1rem;\n        color: var(--color-display);\n        font-size: 1.6rem;\n        line-height: 1.35;\n      }\n\n      .executive-points[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.85rem;\n      }\n\n      .executive-point[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: auto 1fr;\n        gap: 0.75rem;\n        align-items: start;\n        padding: 0.95rem;\n        border-radius: 18px;\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .executive-point[_ngcontent-%COMP%]   app-icon[_ngcontent-%COMP%] {\n        color: var(--color-primary-default);\n      }\n\n      .executive-banner[_ngcontent-%COMP%] {\n        margin-top: 1rem;\n        padding: 1rem;\n        border-radius: 18px;\n        background: linear-gradient(135deg, #103a59, #14573a);\n        color: #fff;\n      }\n\n      .executive-banner[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        display: block;\n        margin-bottom: 0.25rem;\n        color: rgba(255, 255, 255, 0.75);\n        font-size: 0.82rem;\n      }\n\n      .section-band[_ngcontent-%COMP%] {\n        width: min(1220px, 100%);\n        margin: 1.5rem auto 0;\n      }\n\n      .section-heading[_ngcontent-%COMP%] {\n        max-width: 760px;\n        margin-bottom: 1.25rem;\n      }\n\n      .section-heading[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n        margin: 0.8rem 0 0.45rem;\n        color: var(--color-display);\n        font-size: clamp(1.8rem, 3vw, 2.7rem);\n        line-height: 1.3;\n      }\n\n      .section-heading[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-primary-paragraph);\n        line-height: 1.85;\n      }\n\n      .section-heading--compact[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n        font-size: clamp(1.5rem, 2vw, 2rem);\n      }\n\n      .goals-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n      }\n\n      .goal-card[_ngcontent-%COMP%] {\n        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);\n      }\n\n      .goal-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n   .role-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        margin: 1rem 0 0.45rem;\n      }\n\n      .sequence-layout[_ngcontent-%COMP%] {\n        position: relative;\n        display: grid;\n        gap: 1rem;\n      }\n\n      .sequence-line[_ngcontent-%COMP%] {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        right: 1.2rem;\n        width: 2px;\n        background: linear-gradient(180deg, rgba(20, 87, 58, 0.25), rgba(15, 76, 129, 0.1));\n      }\n\n      .sequence-step[_ngcontent-%COMP%] {\n        position: relative;\n        display: grid;\n        grid-template-columns: auto 1fr;\n        gap: 1rem;\n        align-items: start;\n      }\n\n      .sequence-step__marker[_ngcontent-%COMP%] {\n        position: relative;\n        z-index: 1;\n        width: 2.4rem;\n        height: 2.4rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: linear-gradient(135deg, #14573a, #0f4c81);\n        color: #fff;\n        font-size: 0.84rem;\n        font-weight: 700;\n        box-shadow: 0 12px 24px rgba(20, 87, 58, 0.18);\n      }\n\n      .sequence-step__content[_ngcontent-%COMP%] {\n        padding: 1.2rem;\n      }\n\n      .sequence-step__content[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        margin: 0.35rem 0 0.45rem;\n      }\n\n      .roles-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n      }\n\n      .role-card[_ngcontent-%COMP%] {\n        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);\n      }\n\n      .role-card[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n        margin: 1rem 0 0;\n        padding: 0 1rem 0 0;\n        color: var(--color-primary-paragraph);\n        display: grid;\n        gap: 0.55rem;\n      }\n\n      .summary-panel[_ngcontent-%COMP%] {\n        padding: 1.35rem;\n      }\n\n      .summary-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n        margin: 1rem 0 1.25rem;\n      }\n\n      .summary-metric[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        margin-bottom: 0.25rem;\n        font-size: 2rem;\n      }\n\n      .summary-metric[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        display: block;\n        margin-bottom: 0.35rem;\n        color: var(--color-display);\n      }\n\n      @media (max-width: 1100px) {\n        .hero-grid[_ngcontent-%COMP%], \n   .signal-grid[_ngcontent-%COMP%], \n   .goals-grid[_ngcontent-%COMP%], \n   .roles-grid[_ngcontent-%COMP%], \n   .summary-grid[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n\n        .hero-copy[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n          max-width: none;\n        }\n      }\n\n      @media (max-width: 720px) {\n        .landing-shell[_ngcontent-%COMP%] {\n          padding: 0.85rem;\n        }\n\n        .landing-hero[_ngcontent-%COMP%], \n   .summary-panel[_ngcontent-%COMP%], \n   .executive-card[_ngcontent-%COMP%] {\n          padding: 1rem;\n        }\n\n        .landing-topbar[_ngcontent-%COMP%], \n   .landing-topbar__actions[_ngcontent-%COMP%], \n   .hero-actions[_ngcontent-%COMP%], \n   .summary-actions[_ngcontent-%COMP%], \n   .sequence-step[_ngcontent-%COMP%] {\n          flex-direction: column;\n          grid-template-columns: 1fr;\n        }\n\n        .sequence-line[_ngcontent-%COMP%] {\n          display: none;\n        }\n\n        .btn[_ngcontent-%COMP%], \n   .landing-topbar__actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], \n   .hero-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%], \n   .summary-actions[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n          width: 100%;\n          justify-content: center;\n          text-align: center;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LandingComponent, [{
        type: Component,
        args: [{ selector: 'app-landing', standalone: true, imports: [CommonModule, IconComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .landing-shell {\n        min-height: 100vh;\n        padding: 1.25rem;\n      }\n\n      .landing-hero {\n        position: relative;\n        overflow: hidden;\n        padding: 1.5rem;\n        border-radius: 32px;\n        background:\n          radial-gradient(circle at top left, rgba(209, 238, 223, 0.92), transparent 28%),\n          radial-gradient(circle at 85% 15%, rgba(15, 76, 129, 0.18), transparent 30%),\n          linear-gradient(135deg, #f7fcf8 0%, #edf6ff 52%, #ffffff 100%);\n        border: 1px solid rgba(20, 87, 58, 0.08);\n        box-shadow: 0 32px 90px rgba(15, 23, 42, 0.08);\n      }\n\n      .landing-topbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n        margin-bottom: 2rem;\n      }\n\n      .brand-mark {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.9rem;\n      }\n\n      .brand-mark__badge {\n        width: 3rem;\n        height: 3rem;\n        border-radius: 1rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: linear-gradient(135deg, #14573a, #0f4c81);\n        color: #fff;\n        font-weight: 700;\n        font-size: 1.2rem;\n        box-shadow: 0 18px 32px rgba(20, 87, 58, 0.2);\n      }\n\n      .brand-mark strong {\n        display: block;\n        color: var(--color-display);\n      }\n\n      .brand-mark p {\n        margin: 0.2rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .landing-topbar__actions,\n      .hero-actions,\n      .summary-actions {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 0.75rem;\n      }\n\n      .hero-grid {\n        display: grid;\n        grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);\n        gap: 1.25rem;\n        align-items: start;\n      }\n\n      .eyebrow {\n        display: inline-flex;\n        align-items: center;\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: rgba(255, 255, 255, 0.78);\n        border: 1px solid rgba(15, 76, 129, 0.12);\n        color: var(--color-secondary-default);\n        font-size: 0.85rem;\n        font-weight: 600;\n      }\n\n      .hero-copy h1 {\n        margin: 1rem 0;\n        max-width: 11ch;\n        color: #102432;\n        font-size: clamp(2.8rem, 5vw, 5rem);\n        line-height: 1.15;\n        letter-spacing: -0.03em;\n      }\n\n      .hero-lead {\n        max-width: 64ch;\n        margin: 0 0 1.5rem;\n        color: var(--color-primary-paragraph);\n        font-size: 1.08rem;\n        line-height: 1.9;\n      }\n\n      .signal-grid,\n      .goals-grid,\n      .roles-grid,\n      .summary-grid {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .signal-grid {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n        margin-top: 1.5rem;\n      }\n\n      .signal-card,\n      .goal-card,\n      .role-card,\n      .summary-metric {\n        padding: 1rem;\n        border-radius: 22px;\n        background: rgba(255, 255, 255, 0.84);\n        border: 1px solid rgba(20, 87, 58, 0.08);\n      }\n\n      .signal-card {\n        display: grid;\n        gap: 0.7rem;\n      }\n\n      .signal-card__icon,\n      .goal-card__icon,\n      .role-card__icon {\n        width: 2.5rem;\n        height: 2.5rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(20, 87, 58, 0.08);\n        color: var(--color-primary-default);\n      }\n\n      .signal-card strong,\n      .goal-card strong,\n      .role-card strong,\n      .executive-point strong,\n      .sequence-step__content strong,\n      .summary-metric strong {\n        color: var(--color-display);\n      }\n\n      .signal-card p,\n      .goal-card p,\n      .role-card p,\n      .executive-point p,\n      .sequence-step__content p,\n      .summary-metric p {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n        line-height: 1.7;\n      }\n\n      .executive-card {\n        padding: 1.3rem;\n        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 255, 0.98));\n      }\n\n      .executive-card__eyebrow,\n      .sequence-step__stage {\n        color: var(--color-secondary-default);\n        font-size: 0.82rem;\n        font-weight: 700;\n      }\n\n      .executive-card h2 {\n        margin: 0.5rem 0 1rem;\n        color: var(--color-display);\n        font-size: 1.6rem;\n        line-height: 1.35;\n      }\n\n      .executive-points {\n        display: grid;\n        gap: 0.85rem;\n      }\n\n      .executive-point {\n        display: grid;\n        grid-template-columns: auto 1fr;\n        gap: 0.75rem;\n        align-items: start;\n        padding: 0.95rem;\n        border-radius: 18px;\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .executive-point app-icon {\n        color: var(--color-primary-default);\n      }\n\n      .executive-banner {\n        margin-top: 1rem;\n        padding: 1rem;\n        border-radius: 18px;\n        background: linear-gradient(135deg, #103a59, #14573a);\n        color: #fff;\n      }\n\n      .executive-banner span {\n        display: block;\n        margin-bottom: 0.25rem;\n        color: rgba(255, 255, 255, 0.75);\n        font-size: 0.82rem;\n      }\n\n      .section-band {\n        width: min(1220px, 100%);\n        margin: 1.5rem auto 0;\n      }\n\n      .section-heading {\n        max-width: 760px;\n        margin-bottom: 1.25rem;\n      }\n\n      .section-heading h2 {\n        margin: 0.8rem 0 0.45rem;\n        color: var(--color-display);\n        font-size: clamp(1.8rem, 3vw, 2.7rem);\n        line-height: 1.3;\n      }\n\n      .section-heading p {\n        margin: 0;\n        color: var(--color-primary-paragraph);\n        line-height: 1.85;\n      }\n\n      .section-heading--compact h2 {\n        font-size: clamp(1.5rem, 2vw, 2rem);\n      }\n\n      .goals-grid {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n      }\n\n      .goal-card {\n        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);\n      }\n\n      .goal-card strong,\n      .role-card strong {\n        display: block;\n        margin: 1rem 0 0.45rem;\n      }\n\n      .sequence-layout {\n        position: relative;\n        display: grid;\n        gap: 1rem;\n      }\n\n      .sequence-line {\n        position: absolute;\n        top: 0;\n        bottom: 0;\n        right: 1.2rem;\n        width: 2px;\n        background: linear-gradient(180deg, rgba(20, 87, 58, 0.25), rgba(15, 76, 129, 0.1));\n      }\n\n      .sequence-step {\n        position: relative;\n        display: grid;\n        grid-template-columns: auto 1fr;\n        gap: 1rem;\n        align-items: start;\n      }\n\n      .sequence-step__marker {\n        position: relative;\n        z-index: 1;\n        width: 2.4rem;\n        height: 2.4rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: linear-gradient(135deg, #14573a, #0f4c81);\n        color: #fff;\n        font-size: 0.84rem;\n        font-weight: 700;\n        box-shadow: 0 12px 24px rgba(20, 87, 58, 0.18);\n      }\n\n      .sequence-step__content {\n        padding: 1.2rem;\n      }\n\n      .sequence-step__content strong {\n        display: block;\n        margin: 0.35rem 0 0.45rem;\n      }\n\n      .roles-grid {\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n      }\n\n      .role-card {\n        box-shadow: 0 18px 48px rgba(24, 39, 75, 0.05);\n      }\n\n      .role-card ul {\n        margin: 1rem 0 0;\n        padding: 0 1rem 0 0;\n        color: var(--color-primary-paragraph);\n        display: grid;\n        gap: 0.55rem;\n      }\n\n      .summary-panel {\n        padding: 1.35rem;\n      }\n\n      .summary-grid {\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n        margin: 1rem 0 1.25rem;\n      }\n\n      .summary-metric strong {\n        display: block;\n        margin-bottom: 0.25rem;\n        font-size: 2rem;\n      }\n\n      .summary-metric span {\n        display: block;\n        margin-bottom: 0.35rem;\n        color: var(--color-display);\n      }\n\n      @media (max-width: 1100px) {\n        .hero-grid,\n        .signal-grid,\n        .goals-grid,\n        .roles-grid,\n        .summary-grid {\n          grid-template-columns: 1fr;\n        }\n\n        .hero-copy h1 {\n          max-width: none;\n        }\n      }\n\n      @media (max-width: 720px) {\n        .landing-shell {\n          padding: 0.85rem;\n        }\n\n        .landing-hero,\n        .summary-panel,\n        .executive-card {\n          padding: 1rem;\n        }\n\n        .landing-topbar,\n        .landing-topbar__actions,\n        .hero-actions,\n        .summary-actions,\n        .sequence-step {\n          flex-direction: column;\n          grid-template-columns: 1fr;\n        }\n\n        .sequence-line {\n          display: none;\n        }\n\n        .btn,\n        .landing-topbar__actions .btn,\n        .hero-actions .btn,\n        .summary-actions .btn {\n          width: 100%;\n          justify-content: center;\n          text-align: center;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LandingComponent, { className: "LandingComponent", filePath: "src/app/features/auth/pages/landing.component.ts", lineNumber: 557 }); })();
//# sourceMappingURL=landing.component.js.map