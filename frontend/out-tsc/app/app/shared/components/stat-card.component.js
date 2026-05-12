import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function StatCardComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 4);
    i0.ɵɵelement(1, "app-icon", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r0.icon)("size", 20);
} }
function StatCardComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.hint);
} }
export class StatCardComponent {
    constructor() {
        this.label = '';
        this.value = '';
        this.hint = '';
        this.icon = '';
        this.tone = 'primary';
    }
    static { this.ɵfac = function StatCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StatCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: StatCardComponent, selectors: [["app-stat-card"]], inputs: { label: "label", value: "value", hint: "hint", icon: "icon", tone: "tone" }, decls: 8, vars: 8, consts: [[1, "stat-card", "card"], [1, "stat-head"], ["class", "stat-icon", 4, "ngIf"], [4, "ngIf"], [1, "stat-icon"], [3, "name", "size"]], template: function StatCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "div", 1);
            i0.ɵɵtemplate(2, StatCardComponent_span_2_Template, 2, 2, "span", 2);
            i0.ɵɵelementStart(3, "p");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "strong");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(7, StatCardComponent_span_7_Template, 2, 1, "span", 3);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("success", ctx.tone === "success")("info", ctx.tone === "info");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.icon);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.label);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.value);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hint);
        } }, dependencies: [CommonModule, i1.NgIf, IconComponent], styles: [".stat-card[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.55rem;\n        padding: 1.25rem;\n      }\n\n      .stat-head[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.7rem;\n      }\n\n      .stat-icon[_ngcontent-%COMP%] {\n        width: 2.35rem;\n        height: 2.35rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(15, 76, 129, 0.08);\n        color: var(--color-secondary-default);\n      }\n\n      .stat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .stat-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .stat-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n        font-size: 1.8rem;\n      }\n\n      .stat-card.success[_ngcontent-%COMP%] {\n        background: linear-gradient(180deg, #ffffff, #f4fbf7);\n      }\n\n      .stat-card.info[_ngcontent-%COMP%] {\n        background: linear-gradient(180deg, #ffffff, #f2f8fc);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StatCardComponent, [{
        type: Component,
        args: [{ selector: 'app-stat-card', standalone: true, imports: [CommonModule, IconComponent], template: `
    <article class="stat-card card" [class.success]="tone === 'success'" [class.info]="tone === 'info'">
      <div class="stat-head">
        <span class="stat-icon" *ngIf="icon">
          <app-icon [name]="icon" [size]="20" />
        </span>
        <p>{{ label }}</p>
      </div>
      <strong>{{ value }}</strong>
      <span *ngIf="hint">{{ hint }}</span>
    </article>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stat-card {\n        display: grid;\n        gap: 0.55rem;\n        padding: 1.25rem;\n      }\n\n      .stat-head {\n        display: flex;\n        align-items: center;\n        gap: 0.7rem;\n      }\n\n      .stat-icon {\n        width: 2.35rem;\n        height: 2.35rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(15, 76, 129, 0.08);\n        color: var(--color-secondary-default);\n      }\n\n      .stat-card p,\n      .stat-card span {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .stat-card strong {\n        color: var(--color-display);\n        font-size: 1.8rem;\n      }\n\n      .stat-card.success {\n        background: linear-gradient(180deg, #ffffff, #f4fbf7);\n      }\n\n      .stat-card.info {\n        background: linear-gradient(180deg, #ffffff, #f2f8fc);\n      }\n    "] }]
    }], null, { label: [{
            type: Input,
            args: [{ required: true }]
        }], value: [{
            type: Input,
            args: [{ required: true }]
        }], hint: [{
            type: Input
        }], icon: [{
            type: Input
        }], tone: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(StatCardComponent, { className: "StatCardComponent", filePath: "src/app/shared/components/stat-card.component.ts", lineNumber: 68 }); })();
//# sourceMappingURL=stat-card.component.js.map