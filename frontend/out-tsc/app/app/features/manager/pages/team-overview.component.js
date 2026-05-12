import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../../shared/components';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import * as i0 from "@angular/core";
export class TeamOverviewComponent {
    constructor() {
        this.enrollmentsApi = inject(EnrollmentsApiService);
        this.columns = [
            { key: 'employee', label: 'الموظف' },
            { key: 'course', label: 'الدورة' },
            { key: 'status', label: 'الحالة' },
            { key: 'progress', label: 'التقدّم' },
        ];
        this.rows = signal([], ...(ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        this.enrollmentsApi.getTeamEnrollments().subscribe((response) => {
            this.rows.set(response.map((item) => ({
                employee: typeof item.userId === 'string' ? item.userId : item.userId?.fullName || 'موظف',
                course: typeof item.courseId === 'string' ? item.courseId : item.courseId?.title || 'دورة',
                status: item.status,
                progress: `${item.progressPercentage}%`,
            })));
        });
    }
    static { this.ɵfac = function TeamOverviewComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeamOverviewComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeamOverviewComponent, selectors: [["app-team-overview"]], decls: 9, vars: 2, consts: [[1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title"], [1, "section-subtitle"], [3, "columns", "rows"]], template: function TeamOverviewComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 0)(1, "article", 1)(2, "div", 2)(3, "div")(4, "h2", 3);
            i0.ɵɵtext(5, "\u0646\u0638\u0631\u0629 \u0639\u0644\u0649 \u062A\u0643\u0644\u064A\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u064A\u0642");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 4);
            i0.ɵɵtext(7, "\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0644\u0643\u0644 \u0639\u0636\u0648.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(8, "app-data-table", 5);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.rows());
        } }, dependencies: [CommonModule, DataTableComponent], styles: [".panel[_ngcontent-%COMP%] { padding: 1.5rem; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamOverviewComponent, [{
        type: Component,
        args: [{ selector: 'app-team-overview', standalone: true, imports: [CommonModule, DataTableComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">نظرة على تكليفات الفريق</h2>
            <p class="section-subtitle">متابعة مباشرة لحالة التدريب لكل عضو.</p>
          </div>
        </div>

        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".panel { padding: 1.5rem; }"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeamOverviewComponent, { className: "TeamOverviewComponent", filePath: "src/app/features/manager/pages/team-overview.component.ts", lineNumber: 28 }); })();
//# sourceMappingURL=team-overview.component.js.map