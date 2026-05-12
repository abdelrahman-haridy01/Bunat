import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { StatCardComponent } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function AdminDashboardComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2);
    i0.ɵɵelement(2, "app-stat-card", 3)(3, "app-stat-card", 4)(4, "app-stat-card", 5)(5, "app-stat-card", 6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dashboard_r1 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", dashboard_r1.totals.users);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r1.totals.employees);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r1.totals.managers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r1.completionRate + "%");
} }
export class AdminDashboardComponent {
    constructor() {
        this.reportsApi = inject(ReportsApiService);
        this.dashboard = signal(null, ...(ngDevMode ? [{ debugName: "dashboard" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        this.reportsApi.getAdminDashboard().subscribe((response) => this.dashboard.set(response));
    }
    static { this.ɵfac = function AdminDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminDashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 1, vars: 1, consts: [["class", "page-grid", 4, "ngIf"], [1, "page-grid"], [1, "stats-grid"], ["label", "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646", "icon", "users", 3, "value"], ["label", "\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646", "icon", "briefcase", 3, "value"], ["label", "\u0627\u0644\u0645\u062F\u064A\u0631\u0648\u0646", "icon", "shield", 3, "value"], ["label", "\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u0643\u0645\u0627\u0644", "tone", "success", "icon", "chart", 3, "value"]], template: function AdminDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AdminDashboardComponent_section_0_Template, 6, 4, "section", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.dashboard());
        } }, dependencies: [CommonModule, i1.NgIf, StatCardComponent], styles: [".stats-grid[_ngcontent-%COMP%] { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-admin-dashboard', standalone: true, imports: [CommonModule, StatCardComponent], template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="إجمالي المستخدمين" [value]="dashboard.totals.users" icon="users" />
        <app-stat-card label="الموظفون" [value]="dashboard.totals.employees" icon="briefcase" />
        <app-stat-card label="المديرون" [value]="dashboard.totals.managers" icon="shield" />
        <app-stat-card label="معدل الإكمال" [value]="dashboard.completionRate + '%'" tone="success" icon="chart" />
      </div>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".stats-grid { display:grid; gap:1rem; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); }"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/features/admin/pages/admin-dashboard.component.ts", lineNumber: 24 }); })();
//# sourceMappingURL=admin-dashboard.component.js.map