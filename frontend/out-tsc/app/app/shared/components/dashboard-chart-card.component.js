import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function DashboardChartCardComponent_div_9_div_1_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(item_r1.hint);
} }
function DashboardChartCardComponent_div_9_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 11);
    i0.ɵɵelement(7, "span", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, DashboardChartCardComponent_div_9_div_1_p_8_Template, 2, 1, "p", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.valueLabel || item_r1.value);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("width", ctx_r1.barWidth(item_r1.value), "%");
    i0.ɵɵclassProp("success", item_r1.tone === "success")("info", item_r1.tone === "info")("warning", item_r1.tone === "warning");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", item_r1.hint);
} }
function DashboardChartCardComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵtemplate(1, DashboardChartCardComponent_div_9_div_1_Template, 9, 11, "div", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.items);
} }
function DashboardChartCardComponent_ng_template_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 14);
    i0.ɵɵtext(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0643\u0627\u0641\u064A\u0629 \u0644\u0639\u0631\u0636 \u0647\u0630\u0627 \u0627\u0644\u0631\u0633\u0645 \u062D\u0627\u0644\u064A\u0627\u064B.");
    i0.ɵɵelementEnd();
} }
export class DashboardChartCardComponent {
    constructor() {
        this.title = '';
        this.subtitle = '';
        this.icon = 'chart-bars';
        this.scaleMax = null;
        this.items = [];
    }
    barWidth(value) {
        const maxValue = this.scaleMax ?? Math.max(...this.items.map((item) => item.value), 1);
        if (!maxValue || value <= 0) {
            return 0;
        }
        return Math.max(Math.round((value / maxValue) * 100), 10);
    }
    static { this.ɵfac = function DashboardChartCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardChartCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardChartCardComponent, selectors: [["app-dashboard-chart-card"]], inputs: { title: "title", subtitle: "subtitle", icon: "icon", scaleMax: "scaleMax", items: "items" }, decls: 12, vars: 6, consts: [["emptyState", ""], [1, "card", "chart-card"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [3, "name", "size"], [1, "section-subtitle"], ["class", "chart-list", 4, "ngIf", "ngIfElse"], [1, "chart-list"], ["class", "chart-row", 4, "ngFor", "ngForOf"], [1, "chart-row"], [1, "chart-row__head"], [1, "chart-bar"], [1, "chart-bar__fill"], [4, "ngIf"], [1, "empty-copy"]], template: function DashboardChartCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 1)(1, "div", 2)(2, "div")(3, "h3", 3);
            i0.ɵɵelement(4, "app-icon", 4);
            i0.ɵɵelementStart(5, "span");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "p", 5);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(9, DashboardChartCardComponent_div_9_Template, 2, 1, "div", 6)(10, DashboardChartCardComponent_ng_template_10_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const emptyState_r3 = i0.ɵɵreference(11);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("name", ctx.icon)("size", 18);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.subtitle);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.items.length)("ngIfElse", emptyState_r3);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IconComponent], styles: [".chart-card[_ngcontent-%COMP%] {\n        padding: 1.4rem;\n      }\n\n      .chart-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .chart-row[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.45rem;\n      }\n\n      .chart-row__head[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .chart-row__head[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n      }\n\n      .chart-row__head[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .chart-row[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .empty-copy[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .chart-bar[_ngcontent-%COMP%] {\n        height: 0.72rem;\n        overflow: hidden;\n        border-radius: 999px;\n        background: var(--color-neutral-100);\n      }\n\n      .chart-bar__fill[_ngcontent-%COMP%] {\n        display: block;\n        height: 100%;\n        border-radius: inherit;\n        background: linear-gradient(90deg, var(--color-secondary-default), #4e93c4);\n      }\n\n      .chart-bar__fill.success[_ngcontent-%COMP%] {\n        background: linear-gradient(90deg, var(--color-primary-default), #31a26a);\n      }\n\n      .chart-bar__fill.info[_ngcontent-%COMP%] {\n        background: linear-gradient(90deg, var(--color-info), #5da1d0);\n      }\n\n      .chart-bar__fill.warning[_ngcontent-%COMP%] {\n        background: linear-gradient(90deg, var(--color-warning), #d79a31);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardChartCardComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard-chart-card', standalone: true, imports: [CommonModule, IconComponent], template: `
    <article class="card chart-card">
      <div class="panel-header">
        <div>
          <h3 class="section-title label-with-icon">
            <app-icon [name]="icon" [size]="18" />
            <span>{{ title }}</span>
          </h3>
          <p class="section-subtitle">{{ subtitle }}</p>
        </div>
      </div>

      <div class="chart-list" *ngIf="items.length; else emptyState">
        <div class="chart-row" *ngFor="let item of items">
          <div class="chart-row__head">
            <strong>{{ item.label }}</strong>
            <span>{{ item.valueLabel || item.value }}</span>
          </div>
          <div class="chart-bar">
            <span
              class="chart-bar__fill"
              [class.success]="item.tone === 'success'"
              [class.info]="item.tone === 'info'"
              [class.warning]="item.tone === 'warning'"
              [style.width.%]="barWidth(item.value)"
            ></span>
          </div>
          <p *ngIf="item.hint">{{ item.hint }}</p>
        </div>
      </div>

      <ng-template #emptyState>
        <p class="empty-copy">لا توجد بيانات كافية لعرض هذا الرسم حالياً.</p>
      </ng-template>
    </article>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .chart-card {\n        padding: 1.4rem;\n      }\n\n      .chart-list {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .chart-row {\n        display: grid;\n        gap: 0.45rem;\n      }\n\n      .chart-row__head {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .chart-row__head strong {\n        color: var(--color-display);\n      }\n\n      .chart-row__head span,\n      .chart-row p,\n      .empty-copy {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .chart-bar {\n        height: 0.72rem;\n        overflow: hidden;\n        border-radius: 999px;\n        background: var(--color-neutral-100);\n      }\n\n      .chart-bar__fill {\n        display: block;\n        height: 100%;\n        border-radius: inherit;\n        background: linear-gradient(90deg, var(--color-secondary-default), #4e93c4);\n      }\n\n      .chart-bar__fill.success {\n        background: linear-gradient(90deg, var(--color-primary-default), #31a26a);\n      }\n\n      .chart-bar__fill.info {\n        background: linear-gradient(90deg, var(--color-info), #5da1d0);\n      }\n\n      .chart-bar__fill.warning {\n        background: linear-gradient(90deg, var(--color-warning), #d79a31);\n      }\n    "] }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], subtitle: [{
            type: Input
        }], icon: [{
            type: Input
        }], scaleMax: [{
            type: Input
        }], items: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardChartCardComponent, { className: "DashboardChartCardComponent", filePath: "src/app/shared/components/dashboard-chart-card.component.ts", lineNumber: 117 }); })();
//# sourceMappingURL=dashboard-chart-card.component.js.map