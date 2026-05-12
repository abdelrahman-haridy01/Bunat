import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { IconComponent, StatCardComponent } from '../../../shared/components';
import { NeedsSupportComponent } from '../components/needs-support.component';
import { TopPerformersComponent } from '../components/top-performers.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ManagerDashboardComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2);
    i0.ɵɵelement(2, "app-stat-card", 3)(3, "app-stat-card", 4)(4, "app-stat-card", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 6);
    i0.ɵɵelement(6, "app-top-performers", 7)(7, "app-needs-support", 8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dashboard_r1 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", dashboard_r1.teamMembers.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r1.topPerformers.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r1.needsSupport.length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("performers", dashboard_r1.topPerformers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("employees", dashboard_r1.needsSupport);
} }
export class ManagerDashboardComponent {
    constructor() {
        this.reportsApi = inject(ReportsApiService);
        this.dashboard = signal(null, ...(ngDevMode ? [{ debugName: "dashboard" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        this.reportsApi.getManagerDashboard().subscribe((response) => this.dashboard.set(response));
    }
    static { this.ɵfac = function ManagerDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ManagerDashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ManagerDashboardComponent, selectors: [["app-manager-dashboard"]], decls: 1, vars: 1, consts: [["class", "page-grid", 4, "ngIf"], [1, "page-grid"], [1, "stats-grid"], ["label", "\u0639\u062F\u062F \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642", "icon", "team", 3, "value"], ["label", "\u0627\u0644\u0623\u0639\u0644\u0649 \u0623\u062F\u0627\u0621\u064B", "tone", "success", "icon", "award", 3, "value"], ["label", "\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u062F\u0639\u0645", "tone", "info", "icon", "alert", 3, "value"], [1, "split-grid"], [3, "performers"], [3, "employees"]], template: function ManagerDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ManagerDashboardComponent_section_0_Template, 8, 5, "section", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.dashboard());
        } }, dependencies: [CommonModule, i1.NgIf, StatCardComponent, TopPerformersComponent, NeedsSupportComponent], styles: [".stats-grid[_ngcontent-%COMP%], \n   .split-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .split-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      @media (max-width: 960px) {\n        .split-grid[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ManagerDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-manager-dashboard', standalone: true, imports: [CommonModule, IconComponent, StatCardComponent, TopPerformersComponent, NeedsSupportComponent], template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="عدد أعضاء الفريق" [value]="dashboard.teamMembers.length" icon="team" />
        <app-stat-card label="الأعلى أداءً" [value]="dashboard.topPerformers.length" tone="success" icon="award" />
        <app-stat-card label="بحاجة إلى دعم" [value]="dashboard.needsSupport.length" tone="info" icon="alert" />
      </div>

      <div class="split-grid">
        <app-top-performers [performers]="dashboard.topPerformers" />
        <app-needs-support [employees]="dashboard.needsSupport" />
      </div>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid,\n      .split-grid {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .split-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      @media (max-width: 960px) {\n        .split-grid {\n          grid-template-columns: 1fr;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ManagerDashboardComponent, { className: "ManagerDashboardComponent", filePath: "src/app/features/manager/pages/manager-dashboard.component.ts", lineNumber: 52 }); })();
//# sourceMappingURL=manager-dashboard.component.js.map