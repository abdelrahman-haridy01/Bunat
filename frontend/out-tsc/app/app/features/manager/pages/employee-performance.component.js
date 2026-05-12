import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DataTableComponent, StatCardComponent } from '../../../shared/components';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function EmployeePerformanceComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2);
    i0.ɵɵelement(2, "app-stat-card", 3)(3, "app-stat-card", 4)(4, "app-stat-card", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "article", 6)(6, "h2", 7);
    i0.ɵɵtext(7, "\u0633\u062C\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "app-data-table", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "article", 6)(10, "h2", 7);
    i0.ɵɵtext(11, "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "app-data-table", 8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const user_r1 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", user_r1.fullName);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", user_r1.jobTitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", user_r1.pointsTotal);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("columns", ctx_r1.columns)("rows", ctx_r1.rows());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("columns", ctx_r1.quizColumns)("rows", ctx_r1.quizRows());
} }
export class EmployeePerformanceComponent {
    constructor() {
        this.route = inject(ActivatedRoute);
        this.usersApi = inject(UsersApiService);
        this.reportsApi = inject(ReportsApiService);
        this.user = signal(null, ...(ngDevMode ? [{ debugName: "user" }] : /* istanbul ignore next */ []));
        this.report = signal(null, ...(ngDevMode ? [{ debugName: "report" }] : /* istanbul ignore next */ []));
        this.columns = [
            { key: 'kpi', label: 'المؤشر' },
            { key: 'beforeValue', label: 'قبل' },
            { key: 'afterValue', label: 'بعد' },
            { key: 'improvement', label: 'التحسن' },
        ];
        this.quizColumns = [
            { key: 'course', label: 'الدورة' },
            { key: 'quiz', label: 'الاختبار' },
            { key: 'score', label: 'النتيجة' },
            { key: 'status', label: 'الحالة' },
            { key: 'attempts', label: 'المحاولات' },
        ];
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            return;
        }
        this.usersApi.getUser(id).subscribe((response) => this.user.set(response));
        this.reportsApi.getEmployeeReport(id).subscribe((response) => this.report.set(response));
    }
    rows() {
        return (this.report()?.performanceRecords || []).map((record) => ({
            kpi: record.kpiId?.name || 'مؤشر',
            beforeValue: record.beforeValue,
            afterValue: record.afterValue,
            improvement: `${record.improvementPercentage}%`,
        }));
    }
    quizRows() {
        return (this.report()?.quizResults || []).map((result) => ({
            course: result.courseId?.title || 'دورة تدريبية',
            quiz: result.lessonId?.title || 'اختبار',
            score: `${result.scorePercentage}%`,
            status: result.passed ? 'اجتاز' : 'لم يجتز',
            attempts: result.attemptCount,
        }));
    }
    static { this.ɵfac = function EmployeePerformanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeePerformanceComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeePerformanceComponent, selectors: [["app-employee-performance"]], decls: 1, vars: 1, consts: [["class", "page-grid", 4, "ngIf"], [1, "page-grid"], [1, "stats-grid"], ["label", "\u0627\u0644\u0645\u0648\u0638\u0641", 3, "value"], ["label", "\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A", "tone", "info", 3, "value"], ["label", "\u0627\u0644\u0646\u0642\u0627\u0637", "tone", "success", 3, "value"], [1, "card", "panel"], [1, "section-title"], [3, "columns", "rows"]], template: function EmployeePerformanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EmployeePerformanceComponent_section_0_Template, 13, 7, "section", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.user());
        } }, dependencies: [CommonModule, i1.NgIf, StatCardComponent, DataTableComponent], styles: [".stats-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeePerformanceComponent, [{
        type: Component,
        args: [{ selector: 'app-employee-performance', standalone: true, imports: [CommonModule, StatCardComponent, DataTableComponent], template: `
    <section class="page-grid" *ngIf="user() as user">
      <div class="stats-grid">
        <app-stat-card label="الموظف" [value]="user.fullName" />
        <app-stat-card label="المسمى الوظيفي" [value]="user.jobTitle" tone="info" />
        <app-stat-card label="النقاط" [value]="user.pointsTotal" tone="success" />
      </div>

      <article class="card panel">
        <h2 class="section-title">سجل مؤشرات الأداء</h2>
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>

      <article class="card panel">
        <h2 class="section-title">نتائج الاختبارات</h2>
        <app-data-table [columns]="quizColumns" [rows]="quizRows()" />
      </article>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid {\n        display: grid;\n        gap: 1rem;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .panel {\n        padding: 1.5rem;\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeePerformanceComponent, { className: "EmployeePerformanceComponent", filePath: "src/app/features/manager/pages/employee-performance.component.ts", lineNumber: 47 }); })();
//# sourceMappingURL=employee-performance.component.js.map