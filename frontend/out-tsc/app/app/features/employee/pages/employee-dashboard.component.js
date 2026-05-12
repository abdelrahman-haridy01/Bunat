import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BadgeComponent, EmptyStateComponent, IconComponent, LevelCardComponent, ProgressBarComponent, StatCardComponent, } from '../../../shared/components';
import { AuthService } from '../../../core/services/auth.service';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import { GamificationApiService } from '../../../core/services/gamification-api.service';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function EmployeeDashboardComponent_ng_container_30_article_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 24)(1, "div", 25)(2, "span", 26);
    i0.ɵɵelement(3, "app-icon", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "app-progress-bar", 28);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.courseTitle(enrollment_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusLabel(enrollment_r1.status));
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", enrollment_r1.progressPercentage);
} }
function EmployeeDashboardComponent_ng_container_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵtemplate(2, EmployeeDashboardComponent_ng_container_30_article_2_Template, 9, 4, "article", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.enrollments().slice(0, 4));
} }
function EmployeeDashboardComponent_ng_template_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 29);
} }
function EmployeeDashboardComponent_div_42_app_badge_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-badge", 32);
} if (rf & 2) {
    const badge_r3 = ctx.$implicit;
    i0.ɵɵproperty("name", (badge_r3.badgeId == null ? null : badge_r3.badgeId.name) || "\u0634\u0627\u0631\u0629")("description", (badge_r3.badgeId == null ? null : badge_r3.badgeId.description) || "");
} }
function EmployeeDashboardComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtemplate(1, EmployeeDashboardComponent_div_42_app_badge_1_Template, 1, 2, "app-badge", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.userBadges());
} }
function EmployeeDashboardComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 33);
} }
export class EmployeeDashboardComponent {
    constructor() {
        this.authService = inject(AuthService);
        this.enrollmentsApi = inject(EnrollmentsApiService);
        this.reportsApi = inject(ReportsApiService);
        this.gamificationApi = inject(GamificationApiService);
        this.enrollments = signal([], ...(ngDevMode ? [{ debugName: "enrollments" }] : /* istanbul ignore next */ []));
        this.gamification = signal(null, ...(ngDevMode ? [{ debugName: "gamification" }] : /* istanbul ignore next */ []));
        this.userBadges = signal([], ...(ngDevMode ? [{ debugName: "userBadges" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        const userId = this.authService.currentUser()?._id || this.authService.currentUser()?.id;
        if (!userId) {
            return;
        }
        this.enrollmentsApi.getMyEnrollments().subscribe((response) => this.enrollments.set(response));
        this.reportsApi.getEmployeeReport(userId).subscribe();
        this.gamificationApi.getMyGamification().subscribe((response) => {
            this.gamification.set(response);
            this.userBadges.set(response.badges || []);
        });
    }
    completedCount() {
        return this.enrollments().filter((enrollment) => enrollment.status === 'completed').length;
    }
    averageProgress() {
        if (!this.enrollments().length) {
            return 0;
        }
        return Math.round(this.enrollments().reduce((total, enrollment) => total + enrollment.progressPercentage, 0) /
            this.enrollments().length);
    }
    courseTitle(enrollment) {
        return typeof enrollment.courseId === 'string'
            ? enrollment.courseId
            : enrollment.courseId?.title || 'دورة تدريبية';
    }
    statusLabel(status) {
        return ({
            not_started: 'لم تبدأ',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتملة',
            failed: 'متعثرة',
        }[status] || status);
    }
    static { this.ɵfac = function EmployeeDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeeDashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeeDashboardComponent, selectors: [["app-employee-dashboard"]], decls: 45, vars: 13, consts: [["noEnrollments", ""], ["noBadges", ""], [1, "page-grid"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "sparkles", 3, "size"], [1, "section-subtitle"], [1, "stats-grid"], ["label", "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0645\u0643\u0644\u0641\u0629", "icon", "book-open", 3, "value"], ["label", "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629", "tone", "success", "icon", "folder-check", 3, "value"], ["label", "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u062F\u0651\u0645", "tone", "info", "icon", "chart", 3, "value"], [3, "name", "points"], [1, "page-columns"], [1, "card", "panel"], ["name", "book", 3, "size"], ["routerLink", "/employee/courses", 1, "btn", "btn-secondary"], [1, "btn-content"], ["name", "eye", 3, "size"], [4, "ngIf", "ngIfElse"], ["name", "award", 3, "size"], ["class", "badge-list", 4, "ngIf", "ngIfElse"], [1, "course-list"], ["class", "course-item", 4, "ngFor", "ngForOf"], [1, "course-item"], [1, "course-copy"], [1, "course-icon"], ["name", "graduation", 3, "size"], [3, "value"], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0648\u0631\u0627\u062A \u062D\u0627\u0644\u064A\u0627\u064B", "description", "\u0633\u062A\u0638\u0647\u0631 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0647\u0646\u0627."], [1, "badge-list"], [3, "name", "description", 4, "ngFor", "ngForOf"], [3, "name", "description"], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u0634\u0627\u0631\u0627\u062A \u0628\u0639\u062F", "description", "\u0623\u0643\u0645\u0644 \u0627\u0644\u062F\u0631\u0648\u0633 \u0648\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0644\u062C\u0645\u0639 \u0627\u0644\u0634\u0627\u0631\u0627\u062A."]], template: function EmployeeDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 2)(1, "div", 3)(2, "div")(3, "h2", 4)(4, "span", 5);
            i0.ɵɵelement(5, "app-icon", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span");
            i0.ɵɵtext(7, "\u0645\u0644\u062E\u0635 \u062A\u0642\u062F\u0651\u0645\u0643");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "p", 7);
            i0.ɵɵtext(9, "\u0635\u0648\u0631\u0629 \u0633\u0631\u064A\u0639\u0629 \u0639\u0646 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u062D\u0627\u0644\u064A\u060C \u0627\u0644\u0646\u0642\u0627\u0637\u060C \u0648\u0627\u0644\u0623\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(10, "div", 8);
            i0.ɵɵelement(11, "app-stat-card", 9)(12, "app-stat-card", 10)(13, "app-stat-card", 11)(14, "app-level-card", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 13)(16, "article", 14)(17, "div", 3)(18, "div")(19, "h3", 4);
            i0.ɵɵelement(20, "app-icon", 15);
            i0.ɵɵelementStart(21, "span");
            i0.ɵɵtext(22, "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(23, "p", 7);
            i0.ɵɵtext(24, "\u0627\u0639\u0631\u0636 \u0622\u062E\u0631 \u062D\u0627\u0644\u0629 \u0644\u0643\u0644 \u062F\u0648\u0631\u0629 \u0645\u062E\u0635\u0635\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(25, "a", 16)(26, "span", 17);
            i0.ɵɵelement(27, "app-icon", 18);
            i0.ɵɵelementStart(28, "span");
            i0.ɵɵtext(29, "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵtemplate(30, EmployeeDashboardComponent_ng_container_30_Template, 3, 1, "ng-container", 19)(31, EmployeeDashboardComponent_ng_template_31_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "article", 14)(34, "div", 3)(35, "div")(36, "h3", 4);
            i0.ɵɵelement(37, "app-icon", 20);
            i0.ɵɵelementStart(38, "span");
            i0.ɵɵtext(39, "\u0627\u0644\u0634\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0625\u0646\u062C\u0627\u0632");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "p", 7);
            i0.ɵɵtext(41, "\u0622\u062E\u0631 \u0645\u0627 \u062A\u0645 \u0645\u0646\u062D\u0647 \u0644\u0643 \u0636\u0645\u0646 \u0631\u062D\u0644\u0629 \u0627\u0644\u062A\u0637\u0648\u0631.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(42, EmployeeDashboardComponent_div_42_Template, 2, 1, "div", 21)(43, EmployeeDashboardComponent_ng_template_43_Template, 1, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            let tmp_6_0;
            let tmp_7_0;
            const noEnrollments_r4 = i0.ɵɵreference(32);
            const noBadges_r5 = i0.ɵɵreference(44);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("value", ctx.enrollments().length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.completedCount());
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.averageProgress() + "%");
            i0.ɵɵadvance();
            i0.ɵɵproperty("name", ((tmp_6_0 = ctx.gamification()) == null ? null : tmp_6_0.user == null ? null : tmp_6_0.user.levelId == null ? null : tmp_6_0.user.levelId.name) || "\u0645\u0633\u062A\u0648\u0649 \u062C\u0627\u0631\u064A")("points", ((tmp_7_0 = ctx.gamification()) == null ? null : tmp_7_0.user == null ? null : tmp_7_0.user.pointsTotal) || 0);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.enrollments().length)("ngIfElse", noEnrollments_r4);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.userBadges().length)("ngIfElse", noBadges_r5);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, RouterLink,
            StatCardComponent,
            IconComponent,
            LevelCardComponent,
            BadgeComponent,
            ProgressBarComponent,
            EmptyStateComponent], styles: [".stats-grid[_ngcontent-%COMP%], \n   .page-columns[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n      }\n\n      .page-columns[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .panel[_ngcontent-%COMP%] {\n        padding: 1.4rem;\n      }\n\n      .course-list[_ngcontent-%COMP%], \n   .badge-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .course-item[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.85rem;\n        padding: 1rem;\n        border-radius: 1rem;\n        background: var(--color-neutral-50);\n      }\n\n      .course-copy[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.35rem;\n      }\n\n      .course-icon[_ngcontent-%COMP%] {\n        width: 2.2rem;\n        height: 2.2rem;\n        border-radius: 0.85rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(20, 87, 58, 0.1);\n        color: var(--color-primary-default);\n      }\n\n      .course-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.35rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .page-columns[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeeDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-employee-dashboard', standalone: true, imports: [
                    CommonModule,
                    RouterLink,
                    StatCardComponent,
                    IconComponent,
                    LevelCardComponent,
                    BadgeComponent,
                    ProgressBarComponent,
                    EmptyStateComponent,
                ], template: `
    <section class="page-grid">
      <div class="panel-header">
        <div>
          <h2 class="section-title label-with-icon">
            <span class="icon-badge"><app-icon name="sparkles" [size]="20" /></span>
            <span>ملخص تقدّمك</span>
          </h2>
          <p class="section-subtitle">صورة سريعة عن التدريب الحالي، النقاط، والأثر على المؤشرات.</p>
        </div>
      </div>

      <div class="stats-grid">
        <app-stat-card label="الدورات المكلفة" [value]="enrollments().length" icon="book-open" />
        <app-stat-card label="الدورات المكتملة" [value]="completedCount()" tone="success" icon="folder-check" />
        <app-stat-card label="متوسط التقدّم" [value]="averageProgress() + '%'" tone="info" icon="chart" />
        <app-level-card
          [name]="gamification()?.user?.levelId?.name || 'مستوى جاري'"
          [points]="gamification()?.user?.pointsTotal || 0"
        />
      </div>

      <div class="page-columns">
        <article class="card panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="book" [size]="18" />
                <span>الدورات الحالية</span>
              </h3>
              <p class="section-subtitle">اعرض آخر حالة لكل دورة مخصصة.</p>
            </div>
            <a routerLink="/employee/courses" class="btn btn-secondary">
              <span class="btn-content">
                <app-icon name="eye" [size]="18" />
                <span>عرض الكل</span>
              </span>
            </a>
          </div>

          <ng-container *ngIf="enrollments().length; else noEnrollments">
            <div class="course-list">
              <article class="course-item" *ngFor="let enrollment of enrollments().slice(0, 4)">
                <div class="course-copy">
                  <span class="course-icon">
                    <app-icon name="graduation" [size]="18" />
                  </span>
                  <strong>{{ courseTitle(enrollment) }}</strong>
                  <p>{{ statusLabel(enrollment.status) }}</p>
                </div>
                <app-progress-bar [value]="enrollment.progressPercentage" />
              </article>
            </div>
          </ng-container>
          <ng-template #noEnrollments>
            <app-empty-state title="لا توجد دورات حالياً" description="ستظهر الدورات المخصصة هنا." />
          </ng-template>
        </article>

        <article class="card panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="award" [size]="18" />
                <span>الشارات والإنجاز</span>
              </h3>
              <p class="section-subtitle">آخر ما تم منحه لك ضمن رحلة التطور.</p>
            </div>
          </div>

          <div class="badge-list" *ngIf="userBadges().length; else noBadges">
            <app-badge
              *ngFor="let badge of userBadges()"
              [name]="badge.badgeId?.name || 'شارة'"
              [description]="badge.badgeId?.description || ''"
            />
          </div>

          <ng-template #noBadges>
            <app-empty-state title="لا توجد شارات بعد" description="أكمل الدروس والدورات لجمع الشارات." />
          </ng-template>
        </article>
      </div>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid,\n      .page-columns {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid {\n        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n      }\n\n      .page-columns {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .panel {\n        padding: 1.4rem;\n      }\n\n      .course-list,\n      .badge-list {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .course-item {\n        display: grid;\n        gap: 0.85rem;\n        padding: 1rem;\n        border-radius: 1rem;\n        background: var(--color-neutral-50);\n      }\n\n      .course-copy {\n        display: grid;\n        gap: 0.35rem;\n      }\n\n      .course-icon {\n        width: 2.2rem;\n        height: 2.2rem;\n        border-radius: 0.85rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(20, 87, 58, 0.1);\n        color: var(--color-primary-default);\n      }\n\n      .course-item p {\n        margin: 0.35rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .page-columns {\n          grid-template-columns: 1fr;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeeDashboardComponent, { className: "EmployeeDashboardComponent", filePath: "src/app/features/employee/pages/employee-dashboard.component.ts", lineNumber: 181 }); })();
//# sourceMappingURL=employee-dashboard.component.js.map