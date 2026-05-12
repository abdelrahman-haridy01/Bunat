import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmptyStateComponent, ProgressBarComponent } from '../../../shared/components';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = a0 => ["/employee/courses", a0];
function AssignedCoursesComponent_div_8_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 9)(1, "div", 3)(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 5);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 10);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "app-progress-bar", 11);
    i0.ɵɵelementStart(10, "a", 12);
    i0.ɵɵtext(11, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const enrollment_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.courseTitle(enrollment_r1));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.statusLabel(enrollment_r1.status));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("success", enrollment_r1.status === "completed")("info", enrollment_r1.status === "in_progress")("warning", enrollment_r1.status === "not_started");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.dueDateLabel(enrollment_r1), " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", enrollment_r1.progressPercentage);
    i0.ɵɵadvance();
    i0.ɵɵproperty("routerLink", i0.ɵɵpureFunction1(11, _c0, enrollment_r1.courseId && ctx_r1.objectId(enrollment_r1.courseId)));
} }
function AssignedCoursesComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, AssignedCoursesComponent_div_8_article_1_Template, 12, 13, "article", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.enrollments());
} }
function AssignedCoursesComponent_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 13);
} }
export class AssignedCoursesComponent {
    constructor() {
        this.enrollmentsApi = inject(EnrollmentsApiService);
        this.enrollments = signal([], ...(ngDevMode ? [{ debugName: "enrollments" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        this.enrollmentsApi.getMyEnrollments().subscribe((response) => this.enrollments.set(response));
    }
    courseTitle(enrollment) {
        return typeof enrollment.courseId === 'string'
            ? enrollment.courseId
            : enrollment.courseId?.title || 'دورة تدريبية';
    }
    objectId(value) {
        return typeof value === 'string' ? value : value?._id || value?.id || '';
    }
    dueDateLabel(enrollment) {
        return enrollment.dueDate ? `استحقاق ${new Date(enrollment.dueDate).toLocaleDateString('ar-SA')}` : 'دون موعد';
    }
    statusLabel(status) {
        return ({
            not_started: 'لم تبدأ',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتملة',
            failed: 'متعثرة',
        }[status] || status);
    }
    static { this.ɵfac = function AssignedCoursesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssignedCoursesComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssignedCoursesComponent, selectors: [["app-assigned-courses"]], decls: 11, vars: 2, consts: [["empty", ""], [1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title"], [1, "section-subtitle"], ["class", "course-grid", 4, "ngIf", "ngIfElse"], [1, "course-grid"], ["class", "course-card", 4, "ngFor", "ngForOf"], [1, "course-card"], [1, "status-chip"], [3, "value"], [1, "btn", "btn-secondary", 3, "routerLink"], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0648\u0631\u0627\u062A \u0645\u062E\u0635\u0635\u0629", "description", "\u0639\u0646\u062F \u062A\u0643\u0644\u064A\u0641\u0643 \u0628\u062F\u0648\u0631\u0627\u062A \u0633\u062A\u0638\u0647\u0631 \u0647\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629."]], template: function AssignedCoursesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1)(1, "article", 2)(2, "div", 3)(3, "div")(4, "h2", 4);
            i0.ɵɵtext(5, "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0644\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 5);
            i0.ɵɵtext(7, "\u062A\u0627\u0628\u0639 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u062D\u0633\u0628 \u062D\u0627\u0644\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632 \u0648\u0627\u0644\u0645\u0648\u0639\u062F \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(8, AssignedCoursesComponent_div_8_Template, 2, 1, "div", 6);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(9, AssignedCoursesComponent_ng_template_9_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const empty_r3 = i0.ɵɵreference(10);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.enrollments().length)("ngIfElse", empty_r3);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, RouterLink, ProgressBarComponent, EmptyStateComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .course-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n      }\n\n      .course-card[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-md);\n      }\n\n      strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssignedCoursesComponent, [{
        type: Component,
        args: [{ selector: 'app-assigned-courses', standalone: true, imports: [CommonModule, RouterLink, ProgressBarComponent, EmptyStateComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">الدورات المخصصة لي</h2>
            <p class="section-subtitle">تابع الدورات حسب حالة الإنجاز والموعد المستهدف.</p>
          </div>
        </div>

        <div class="course-grid" *ngIf="enrollments().length; else empty">
          <article class="course-card" *ngFor="let enrollment of enrollments()">
            <div class="panel-header">
              <div>
                <strong>{{ courseTitle(enrollment) }}</strong>
                <p class="section-subtitle">{{ statusLabel(enrollment.status) }}</p>
              </div>
              <span class="status-chip" [class.success]="enrollment.status === 'completed'" [class.info]="enrollment.status === 'in_progress'" [class.warning]="enrollment.status === 'not_started'">
                {{ dueDateLabel(enrollment) }}
              </span>
            </div>

            <app-progress-bar [value]="enrollment.progressPercentage" />
            <a class="btn btn-secondary" [routerLink]="['/employee/courses', enrollment.courseId && objectId(enrollment.courseId)]">تفاصيل الدورة</a>
          </article>
        </div>
      </article>
    </section>

    <ng-template #empty>
      <app-empty-state title="لا توجد دورات مخصصة" description="عند تكليفك بدورات ستظهر هنا مباشرة." />
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .course-grid {\n        display: grid;\n        gap: 1rem;\n        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n      }\n\n      .course-card {\n        display: grid;\n        gap: 1rem;\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-md);\n      }\n\n      strong {\n        color: var(--color-display);\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AssignedCoursesComponent, { className: "AssignedCoursesComponent", filePath: "src/app/features/employee/pages/assigned-courses.component.ts", lineNumber: 73 }); })();
//# sourceMappingURL=assigned-courses.component.js.map