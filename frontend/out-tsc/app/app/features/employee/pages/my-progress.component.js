import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { GamificationApiService } from '../../../core/services/gamification-api.service';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { BadgeComponent, DataTableComponent, EmptyStateComponent, LevelCardComponent, StatCardComponent, } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = () => [];
function MyProgressComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵelement(1, "app-level-card", 10)(2, "app-stat-card", 11)(3, "app-stat-card", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const summary_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", (summary_r1.user == null ? null : summary_r1.user.levelId == null ? null : summary_r1.user.levelId.name) || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F")("points", (summary_r1.user == null ? null : summary_r1.user.pointsTotal) || 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", (summary_r1.badges || i0.ɵɵpureFunction0(4, _c0)).length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", (summary_r1.recentTransactions || i0.ɵɵpureFunction0(5, _c0)).length);
} }
function MyProgressComponent_div_9_app_badge_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-badge", 15);
} if (rf & 2) {
    const badge_r2 = ctx.$implicit;
    i0.ɵɵproperty("name", (badge_r2.badgeId == null ? null : badge_r2.badgeId.name) || "\u0634\u0627\u0631\u0629")("description", (badge_r2.badgeId == null ? null : badge_r2.badgeId.description) || "");
} }
function MyProgressComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, MyProgressComponent_div_9_app_badge_1_Template, 1, 2, "app-badge", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", (tmp_2_0 = ctx_r2.gamification()) == null ? null : tmp_2_0.badges);
} }
function MyProgressComponent_ng_template_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 16);
} }
export class MyProgressComponent {
    constructor() {
        this.authService = inject(AuthService);
        this.gamificationApi = inject(GamificationApiService);
        this.reportsApi = inject(ReportsApiService);
        this.gamification = signal(null, ...(ngDevMode ? [{ debugName: "gamification" }] : /* istanbul ignore next */ []));
        this.report = signal(null, ...(ngDevMode ? [{ debugName: "report" }] : /* istanbul ignore next */ []));
        this.columns = [
            { key: 'kpi', label: 'المؤشر' },
            { key: 'beforeValue', label: 'قبل' },
            { key: 'afterValue', label: 'بعد' },
            { key: 'improvementPercentage', label: 'التحسن %' },
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
        const userId = this.authService.currentUser()?._id || this.authService.currentUser()?.id;
        if (!userId) {
            return;
        }
        this.gamificationApi.getMyGamification().subscribe((response) => this.gamification.set(response));
        this.reportsApi.getEmployeeReport(userId).subscribe((response) => this.report.set(response));
    }
    reportRows() {
        return (this.report()?.performanceRecords || []).map((record) => ({
            kpi: record.kpiId?.name || 'مؤشر',
            beforeValue: record.beforeValue,
            afterValue: record.afterValue,
            improvementPercentage: `${record.improvementPercentage}%`,
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
    static { this.ɵfac = function MyProgressComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || MyProgressComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MyProgressComponent, selectors: [["app-my-progress"]], decls: 28, vars: 7, consts: [["noBadges", ""], [1, "page-grid"], ["class", "stats-grid", 4, "ngIf"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title"], [1, "section-subtitle"], ["class", "badge-list", 4, "ngIf", "ngIfElse"], [3, "columns", "rows"], [1, "stats-grid"], [3, "name", "points"], ["label", "\u0639\u062F\u062F \u0627\u0644\u0634\u0627\u0631\u0627\u062A", 3, "value"], ["label", "\u0622\u062E\u0631 \u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A", "tone", "info", 3, "value"], [1, "badge-list"], [3, "name", "description", 4, "ngFor", "ngForOf"], [3, "name", "description"], ["title", "\u0644\u0645 \u064A\u062A\u0645 \u0645\u0646\u062D \u0623\u064A \u0634\u0627\u0631\u0629 \u0628\u0639\u062F", "description", "\u0627\u0633\u062A\u0645\u0631 \u0641\u064A \u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629."]], template: function MyProgressComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 1);
            i0.ɵɵtemplate(1, MyProgressComponent_div_1_Template, 4, 6, "div", 2);
            i0.ɵɵelementStart(2, "article", 3)(3, "div", 4)(4, "div")(5, "h2", 5);
            i0.ɵɵtext(6, "\u0627\u0644\u0634\u0627\u0631\u0627\u062A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p", 6);
            i0.ɵɵtext(8, "\u0627\u0644\u0625\u0646\u062C\u0627\u0632\u0627\u062A \u0627\u0644\u062A\u064A \u062D\u0635\u0644\u062A \u0639\u0644\u064A\u0647\u0627 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(9, MyProgressComponent_div_9_Template, 2, 1, "div", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "article", 3)(11, "div", 4)(12, "div")(13, "h2", 5);
            i0.ɵɵtext(14, "\u0623\u062B\u0631 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0639\u0644\u0649 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "p", 6);
            i0.ɵɵtext(16, "\u064A\u0648\u0636\u062D \u0642\u064A\u0645 \u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0645\u0627 \u0628\u0639\u062F\u0647 \u0648\u0646\u0633\u0628\u0629 \u0627\u0644\u062A\u062D\u0633\u0646.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(17, "app-data-table", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "article", 3)(19, "div", 4)(20, "div")(21, "h2", 5);
            i0.ɵɵtext(22, "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "p", 6);
            i0.ɵɵtext(24, "\u064A\u0648\u0636\u062D \u0623\u0641\u0636\u0644 \u0646\u062A\u064A\u062C\u0629 \u0648\u062D\u0627\u0644\u0629 \u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 \u0644\u0643\u0644 \u0627\u062E\u062A\u0628\u0627\u0631 \u0623\u062A\u0645\u0645\u062A\u0647.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(25, "app-data-table", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(26, MyProgressComponent_ng_template_26_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            let tmp_2_0;
            const noBadges_r4 = i0.ɵɵreference(27);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.gamification());
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", (tmp_2_0 = ctx.gamification()) == null ? null : tmp_2_0.badges == null ? null : tmp_2_0.badges.length)("ngIfElse", noBadges_r4);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.reportRows());
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("columns", ctx.quizColumns)("rows", ctx.quizRows());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, StatCardComponent,
            LevelCardComponent,
            BadgeComponent,
            DataTableComponent,
            EmptyStateComponent], styles: [".stats-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .badge-list[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 0.85rem;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MyProgressComponent, [{
        type: Component,
        args: [{ selector: 'app-my-progress', standalone: true, imports: [
                    CommonModule,
                    StatCardComponent,
                    LevelCardComponent,
                    BadgeComponent,
                    DataTableComponent,
                    EmptyStateComponent,
                ], template: `
    <section class="page-grid">
      <div class="stats-grid" *ngIf="gamification() as summary">
        <app-level-card [name]="summary.user?.levelId?.name || 'غير محدد'" [points]="summary.user?.pointsTotal || 0" />
        <app-stat-card label="عدد الشارات" [value]="(summary.badges || []).length" />
        <app-stat-card label="آخر العمليات" [value]="(summary.recentTransactions || []).length" tone="info" />
      </div>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">الشارات</h2>
            <p class="section-subtitle">الإنجازات التي حصلت عليها حتى الآن.</p>
          </div>
        </div>

        <div class="badge-list" *ngIf="gamification()?.badges?.length; else noBadges">
          <app-badge
            *ngFor="let badge of gamification()?.badges"
            [name]="badge.badgeId?.name || 'شارة'"
            [description]="badge.badgeId?.description || ''"
          />
        </div>
      </article>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">أثر التدريب على المؤشرات</h2>
            <p class="section-subtitle">يوضح قيم ما قبل التدريب وما بعده ونسبة التحسن.</p>
          </div>
        </div>

        <app-data-table [columns]="columns" [rows]="reportRows()" />
      </article>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">نتائج الاختبارات</h2>
            <p class="section-subtitle">يوضح أفضل نتيجة وحالة الاجتياز لكل اختبار أتممته.</p>
          </div>
        </div>

        <app-data-table [columns]="quizColumns" [rows]="quizRows()" />
      </article>
    </section>

    <ng-template #noBadges>
      <app-empty-state title="لم يتم منح أي شارة بعد" description="استمر في تنفيذ الأنشطة التدريبية." />
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid {\n        display: grid;\n        gap: 1rem;\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .badge-list {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 0.85rem;\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(MyProgressComponent, { className: "MyProgressComponent", filePath: "src/app/features/employee/pages/my-progress.component.ts", lineNumber: 99 }); })();
//# sourceMappingURL=my-progress.component.js.map