import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { DashboardChartCardComponent, IconComponent, StatCardComponent, } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function AdminDashboardComponent_section_0_article_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 19)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const insight_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(insight_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(insight_r1.description);
} }
function AdminDashboardComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2);
    i0.ɵɵelement(2, "app-stat-card", 3)(3, "app-stat-card", 4)(4, "app-stat-card", 5)(5, "app-stat-card", 6)(6, "app-stat-card", 7)(7, "app-stat-card", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 9);
    i0.ɵɵelement(9, "app-dashboard-chart-card", 10)(10, "app-dashboard-chart-card", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "article", 12)(12, "div", 13)(13, "div")(14, "h3", 14);
    i0.ɵɵelement(15, "app-icon", 15);
    i0.ɵɵelementStart(16, "span");
    i0.ɵɵtext(17, "\u0645\u0624\u0634\u0631\u0627\u062A \u062A\u0646\u0641\u064A\u0630\u064A\u0629");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "p", 16);
    i0.ɵɵtext(19, "\u0623\u0628\u0631\u0632 \u0627\u0644\u0625\u0634\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u062F\u0627\u0631\u0629 \u0639\u0644\u0649 \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0628\u0633\u0631\u0639\u0629.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(20, "div", 17);
    i0.ɵɵtemplate(21, AdminDashboardComponent_section_0_article_21_Template, 5, 2, "article", 18);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const dashboard_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", dashboard_r2.totals.users);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.totals.employees);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.totals.managers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.completionRate + "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.totals.teams);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.totals.performanceRecords);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("items", ctx_r2.roleDistributionItems(dashboard_r2));
    i0.ɵɵadvance();
    i0.ɵɵproperty("items", ctx_r2.enrollmentDistributionItems(dashboard_r2));
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.adminInsights(dashboard_r2));
} }
export class AdminDashboardComponent {
    constructor() {
        this.reportsApi = inject(ReportsApiService);
        this.dashboard = signal(null, ...(ngDevMode ? [{ debugName: "dashboard" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        this.reportsApi.getAdminDashboard().subscribe((response) => this.dashboard.set(response));
    }
    roleDistributionItems(dashboard) {
        return dashboard.roleDistribution.map((item) => {
            const tone = item.role === 'employee' ? 'success' : item.role === 'manager' ? 'info' : 'warning';
            return {
                label: this.roleLabel(item.role),
                value: item.count,
                valueLabel: `${item.count}`,
                hint: `${Math.round((item.count / Math.max(dashboard.totals.users, 1)) * 100)}% من المستخدمين`,
                tone,
            };
        });
    }
    enrollmentDistributionItems(dashboard) {
        return dashboard.enrollmentStatusDistribution.map((item) => {
            const tone = item.status === 'completed' ? 'success' : item.status === 'in_progress' ? 'info' : 'warning';
            return {
                label: this.statusLabel(item.status),
                value: item.count,
                valueLabel: `${item.count}`,
                hint: `${Math.round((item.count / Math.max(dashboard.totals.enrollments, 1)) * 100)}% من الإجمالي`,
                tone,
            };
        });
    }
    adminInsights(dashboard) {
        return [
            {
                title: 'تغطية الإدارة المباشرة',
                description: `${dashboard.managerCoverageRate}% من الموظفين مرتبطون بمدير مباشر، بمتوسط ${dashboard.averageEmployeesPerManager} موظف لكل مدير.`,
            },
            {
                title: 'أثر التدريب على الأداء',
                description: dashboard.performanceSummary.improvedCount > 0
                    ? `${dashboard.performanceSummary.improvedCount} سجل أداء يظهر تحسناً، ومتوسط التحسن العام ${dashboard.performanceSummary.averageImprovement}%.`
                    : 'لا تظهر سجلات الأداء الحالية تحسناً ملموساً بعد على مستوى المؤسسة.',
            },
            {
                title: 'تماسك الفرق',
                description: dashboard.totals.teams
                    ? `متوسط حجم الفريق ${dashboard.averageMembersPerTeam} عضو، مع ${dashboard.totals.teams} فرق مسجلة داخل النظام.`
                    : 'لا توجد فرق معرفة بعد داخل النظام، مما يحد من قراءة الأداء على مستوى المجموعات.',
            },
        ];
    }
    roleLabel(role) {
        return ({
            employee: 'الموظفون',
            manager: 'المديرون',
            admin: 'الإدارة',
            hr: 'الموارد البشرية',
            course_manager: 'مديرو المحتوى',
        }[role] || role);
    }
    statusLabel(status) {
        return ({
            not_started: 'لم تبدأ',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتملة',
            failed: 'متعثرة',
        }[status] || status);
    }
    static { this.ɵfac = function AdminDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminDashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminDashboardComponent, selectors: [["app-admin-dashboard"]], decls: 1, vars: 1, consts: [["class", "page-grid", 4, "ngIf"], [1, "page-grid"], [1, "stats-grid"], ["label", "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646", "icon", "users", 3, "value"], ["label", "\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646", "icon", "briefcase", 3, "value"], ["label", "\u0627\u0644\u0645\u062F\u064A\u0631\u0648\u0646", "icon", "shield", 3, "value"], ["label", "\u0645\u0639\u062F\u0644 \u0627\u0644\u0625\u0643\u0645\u0627\u0644", "tone", "success", "icon", "chart", 3, "value"], ["label", "\u0627\u0644\u0641\u0631\u0642", "icon", "team", 3, "value"], ["label", "\u0633\u062C\u0644\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621", "tone", "info", "icon", "chart-bars", 3, "value"], [1, "split-grid"], ["title", "\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0623\u062F\u0648\u0627\u0631", "subtitle", "\u0642\u0631\u0627\u0621\u0629 \u0633\u0631\u064A\u0639\u0629 \u0644\u0647\u064A\u0643\u0644 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646 \u062F\u0627\u062E\u0644 \u0627\u0644\u0645\u0646\u0635\u0629.", "icon", "users", 3, "items"], ["title", "\u062D\u0627\u0644\u0629 \u0627\u0644\u062A\u0643\u0644\u064A\u0641\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628\u064A\u0629", "subtitle", "\u0643\u064A\u0641 \u062A\u062A\u0648\u0632\u0639 \u0627\u0644\u062A\u0633\u062C\u064A\u0644\u0627\u062A \u0628\u064A\u0646 \u0627\u0644\u0628\u062F\u0621 \u0648\u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0648\u0627\u0644\u0625\u0643\u0645\u0627\u0644.", "icon", "chart-bars", 3, "items"], [1, "card", "insight-panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], ["name", "sparkles", 3, "size"], [1, "section-subtitle"], [1, "insight-grid"], ["class", "insight-item", 4, "ngFor", "ngForOf"], [1, "insight-item"]], template: function AdminDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AdminDashboardComponent_section_0_Template, 22, 10, "section", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.dashboard());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, StatCardComponent, IconComponent, DashboardChartCardComponent], styles: [".stats-grid[_ngcontent-%COMP%], \n   .split-grid[_ngcontent-%COMP%], \n   .insight-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .split-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .insight-panel[_ngcontent-%COMP%] {\n        padding: 1.4rem;\n      }\n\n      .insight-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .insight-item[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .insight-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n      }\n\n      .insight-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.4rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .split-grid[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-admin-dashboard', standalone: true, imports: [CommonModule, StatCardComponent, IconComponent, DashboardChartCardComponent], template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="إجمالي المستخدمين" [value]="dashboard.totals.users" icon="users" />
        <app-stat-card label="الموظفون" [value]="dashboard.totals.employees" icon="briefcase" />
        <app-stat-card label="المديرون" [value]="dashboard.totals.managers" icon="shield" />
        <app-stat-card label="معدل الإكمال" [value]="dashboard.completionRate + '%'" tone="success" icon="chart" />
        <app-stat-card label="الفرق" [value]="dashboard.totals.teams" icon="team" />
        <app-stat-card
          label="سجلات الأداء"
          [value]="dashboard.totals.performanceRecords"
          tone="info"
          icon="chart-bars"
        />
      </div>

      <div class="split-grid">
        <app-dashboard-chart-card
          title="توزيع الأدوار"
          subtitle="قراءة سريعة لهيكل المستخدمين داخل المنصة."
          icon="users"
          [items]="roleDistributionItems(dashboard)"
        />

        <app-dashboard-chart-card
          title="حالة التكليفات التدريبية"
          subtitle="كيف تتوزع التسجيلات بين البدء والتنفيذ والإكمال."
          icon="chart-bars"
          [items]="enrollmentDistributionItems(dashboard)"
        />
      </div>

      <article class="card insight-panel">
        <div class="panel-header">
          <div>
            <h3 class="section-title label-with-icon">
              <app-icon name="sparkles" [size]="18" />
              <span>مؤشرات تنفيذية</span>
            </h3>
            <p class="section-subtitle">أبرز الإشارات التي تساعد الإدارة على قراءة الحالة العامة بسرعة.</p>
          </div>
        </div>

        <div class="insight-grid">
          <article class="insight-item" *ngFor="let insight of adminInsights(dashboard)">
            <strong>{{ insight.title }}</strong>
            <p>{{ insight.description }}</p>
          </article>
        </div>
      </article>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid,\n      .split-grid,\n      .insight-grid {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .split-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .insight-panel {\n        padding: 1.4rem;\n      }\n\n      .insight-grid {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .insight-item {\n        padding: 1rem;\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .insight-item strong {\n        color: var(--color-display);\n      }\n\n      .insight-item p {\n        margin: 0.4rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .split-grid {\n          grid-template-columns: 1fr;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminDashboardComponent, { className: "AdminDashboardComponent", filePath: "src/app/features/admin/pages/admin-dashboard.component.ts", lineNumber: 119 }); })();
//# sourceMappingURL=admin-dashboard.component.js.map