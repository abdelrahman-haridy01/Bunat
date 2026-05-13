import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { DashboardChartCardComponent, IconComponent, StatCardComponent, } from '../../../shared/components';
import { NeedsSupportComponent } from '../components/needs-support.component';
import { TopPerformersComponent } from '../components/top-performers.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ManagerDashboardComponent_section_0_article_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 18)(1, "strong");
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
function ManagerDashboardComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 1)(1, "div", 2);
    i0.ɵɵelement(2, "app-stat-card", 3)(3, "app-stat-card", 4)(4, "app-stat-card", 5)(5, "app-stat-card", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 7);
    i0.ɵɵelement(7, "app-dashboard-chart-card", 8);
    i0.ɵɵelementStart(8, "article", 9)(9, "div", 10)(10, "div")(11, "h3", 11);
    i0.ɵɵelement(12, "app-icon", 12);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "\u0642\u0631\u0627\u0621\u0629 \u062A\u0646\u0641\u064A\u0630\u064A\u0629");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "p", 13);
    i0.ɵɵtext(16, "\u0623\u0628\u0631\u0632 \u0627\u0644\u0625\u0634\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0633\u062A\u062D\u0642 \u0627\u0646\u062A\u0628\u0627\u0647 \u0627\u0644\u0645\u062F\u064A\u0631 \u062D\u0627\u0644\u064A\u0627\u064B.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 14);
    i0.ɵɵtemplate(18, ManagerDashboardComponent_section_0_article_18_Template, 5, 2, "article", 15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "div", 7);
    i0.ɵɵelement(20, "app-top-performers", 16)(21, "app-needs-support", 17);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const dashboard_r2 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", dashboard_r2.teamMembers.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.topPerformers.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", dashboard_r2.needsSupport.length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.averageProgress(dashboard_r2) + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("items", ctx_r2.teamCompletionItems(dashboard_r2.teamMembers))("scaleMax", 100);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.managerInsights(dashboard_r2));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("performers", dashboard_r2.topPerformers);
    i0.ɵɵadvance();
    i0.ɵɵproperty("employees", dashboard_r2.needsSupport);
} }
export class ManagerDashboardComponent {
    constructor() {
        this.reportsApi = inject(ReportsApiService);
        this.dashboard = signal(null, ...(ngDevMode ? [{ debugName: "dashboard" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        this.reportsApi.getManagerDashboard().subscribe((response) => this.dashboard.set(response));
    }
    averageProgress(dashboard) {
        if (!dashboard.teamMembers.length) {
            return 0;
        }
        return Math.round(dashboard.teamMembers.reduce((sum, member) => sum + member.averageProgress, 0) / dashboard.teamMembers.length);
    }
    teamCompletionItems(teamMembers) {
        return teamMembers
            .slice()
            .sort((a, b) => b.averageProgress - a.averageProgress)
            .slice(0, 6)
            .map((member) => {
            const tone = member.averageProgress >= 75 ? 'success' : member.averageProgress >= 50 ? 'info' : 'warning';
            return {
                label: member.employee?.fullName || 'عضو فريق',
                value: member.averageProgress,
                valueLabel: `${member.averageProgress}%`,
                hint: member.latestImprovement > 0
                    ? `تحسن آخر قدره ${member.latestImprovement}%`
                    : `${member.assignedCourses} دورات مسندة`,
                tone,
            };
        });
    }
    managerInsights(dashboard) {
        const bestPerformer = dashboard.topPerformers[0];
        const bestImprovement = dashboard.teamMembers
            .slice()
            .sort((a, b) => b.latestImprovement - a.latestImprovement)[0];
        const supportShare = dashboard.teamMembers.length
            ? Math.round((dashboard.needsSupport.length / dashboard.teamMembers.length) * 100)
            : 0;
        return [
            {
                title: 'أفضل زخم حالياً',
                description: bestPerformer
                    ? `${bestPerformer.employee?.fullName} يتصدر الفريق حالياً بتقدم ${bestPerformer.averageProgress}% ومعدل إكمال ${bestPerformer.completionRate}%.`
                    : 'لا يوجد متصدر واضح لأن الفريق لا يحتوي على بيانات كافية بعد.',
            },
            {
                title: 'أسرع تحسن',
                description: bestImprovement?.latestImprovement
                    ? `${bestImprovement.employee?.fullName} سجل آخر تحسن بمقدار ${bestImprovement.latestImprovement}%.`
                    : 'لا توجد تحسينات أداء مسجلة حديثاً على مستوى الفريق.',
            },
            {
                title: 'الاحتياج للدعم',
                description: supportShare
                    ? `${supportShare}% من الفريق دون مستوى التقدّم المستهدف حالياً ويحتاجون متابعة أقرب.`
                    : 'لا توجد حالات حرجة حالياً، ومستوى الإنجاز ضمن النطاق المقبول لكل الفريق.',
            },
        ];
    }
    static { this.ɵfac = function ManagerDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ManagerDashboardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ManagerDashboardComponent, selectors: [["app-manager-dashboard"]], decls: 1, vars: 1, consts: [["class", "page-grid", 4, "ngIf"], [1, "page-grid"], [1, "stats-grid"], ["label", "\u0639\u062F\u062F \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642", "icon", "team", 3, "value"], ["label", "\u0627\u0644\u0623\u0639\u0644\u0649 \u0623\u062F\u0627\u0621\u064B", "tone", "success", "icon", "award", 3, "value"], ["label", "\u0628\u062D\u0627\u062C\u0629 \u0625\u0644\u0649 \u062F\u0639\u0645", "tone", "info", "icon", "alert", 3, "value"], ["label", "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u062F\u0651\u0645", "tone", "success", "icon", "chart", 3, "value"], [1, "split-grid"], ["title", "\u062A\u0642\u062F\u0651\u0645 \u0627\u0644\u0641\u0631\u064A\u0642", "subtitle", "\u0646\u0633\u0628\u0629 \u0627\u0644\u0625\u0646\u062C\u0627\u0632 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0644\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u0623\u0643\u062B\u0631 \u0646\u0634\u0627\u0637\u0627\u064B.", "icon", "chart-bars", 3, "items", "scaleMax"], [1, "card", "insight-panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], ["name", "sparkles", 3, "size"], [1, "section-subtitle"], [1, "insight-list"], ["class", "insight-item", 4, "ngFor", "ngForOf"], [3, "performers"], [3, "employees"], [1, "insight-item"]], template: function ManagerDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ManagerDashboardComponent_section_0_Template, 22, 10, "section", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.dashboard());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IconComponent,
            StatCardComponent,
            TopPerformersComponent,
            NeedsSupportComponent,
            DashboardChartCardComponent], styles: [".stats-grid[_ngcontent-%COMP%], \n   .split-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .split-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .insight-panel[_ngcontent-%COMP%] {\n        padding: 1.4rem;\n      }\n\n      .insight-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.9rem;\n      }\n\n      .insight-item[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .insight-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n      }\n\n      .insight-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.4rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .split-grid[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ManagerDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-manager-dashboard', standalone: true, imports: [
                    CommonModule,
                    IconComponent,
                    StatCardComponent,
                    TopPerformersComponent,
                    NeedsSupportComponent,
                    DashboardChartCardComponent,
                ], template: `
    <section class="page-grid" *ngIf="dashboard() as dashboard">
      <div class="stats-grid">
        <app-stat-card label="عدد أعضاء الفريق" [value]="dashboard.teamMembers.length" icon="team" />
        <app-stat-card label="الأعلى أداءً" [value]="dashboard.topPerformers.length" tone="success" icon="award" />
        <app-stat-card label="بحاجة إلى دعم" [value]="dashboard.needsSupport.length" tone="info" icon="alert" />
        <app-stat-card label="متوسط التقدّم" [value]="averageProgress(dashboard) + '%'" tone="success" icon="chart" />
      </div>

      <div class="split-grid">
        <app-dashboard-chart-card
          title="تقدّم الفريق"
          subtitle="نسبة الإنجاز الحالية لأعضاء الفريق الأكثر نشاطاً."
          icon="chart-bars"
          [items]="teamCompletionItems(dashboard.teamMembers)"
          [scaleMax]="100"
        />

        <article class="card insight-panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="sparkles" [size]="18" />
                <span>قراءة تنفيذية</span>
              </h3>
              <p class="section-subtitle">أبرز الإشارات التي تستحق انتباه المدير حالياً.</p>
            </div>
          </div>

          <div class="insight-list">
            <article class="insight-item" *ngFor="let insight of managerInsights(dashboard)">
              <strong>{{ insight.title }}</strong>
              <p>{{ insight.description }}</p>
            </article>
          </div>
        </article>
      </div>

      <div class="split-grid">
        <app-top-performers [performers]="dashboard.topPerformers" />
        <app-needs-support [employees]="dashboard.needsSupport" />
      </div>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid,\n      .split-grid {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid {\n        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n      }\n\n      .split-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .insight-panel {\n        padding: 1.4rem;\n      }\n\n      .insight-list {\n        display: grid;\n        gap: 0.9rem;\n      }\n\n      .insight-item {\n        padding: 1rem;\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .insight-item strong {\n        color: var(--color-display);\n      }\n\n      .insight-item p {\n        margin: 0.4rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .split-grid {\n          grid-template-columns: 1fr;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ManagerDashboardComponent, { className: "ManagerDashboardComponent", filePath: "src/app/features/manager/pages/manager-dashboard.component.ts", lineNumber: 120 }); })();
//# sourceMappingURL=manager-dashboard.component.js.map