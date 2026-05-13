import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function TopPerformersComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 6)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r1.employee == null ? null : item_r1.employee.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r1.averageProgress, "% \u062A\u0642\u062F\u0645");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r1.employee == null ? null : item_r1.employee.pointsTotal, " \u0646\u0642\u0637\u0629");
} }
export class TopPerformersComponent {
    constructor() {
        this.performers = [];
    }
    sortedPerformers() {
        return this.performers
            .slice()
            .sort((a, b) => {
            if (Number(b.employee?.pointsTotal) !== Number(a.employee?.pointsTotal)) {
                return Number(b.employee?.pointsTotal) - Number(a.employee?.pointsTotal);
            }
            if (b.averageProgress !== a.averageProgress) {
                return b.averageProgress - a.averageProgress;
            }
            return b.completionRate - a.completionRate;
        });
    }
    static { this.ɵfac = function TopPerformersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TopPerformersComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TopPerformersComponent, selectors: [["app-top-performers"]], inputs: { performers: "performers" }, decls: 7, vars: 2, consts: [[1, "card", "panel"], [1, "section-title", "label-with-icon"], ["name", "award", 3, "size"], [1, "performer-list"], ["class", "performer", 4, "ngFor", "ngForOf"], [1, "performer"], [1, "performer-copy"]], template: function TopPerformersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "h3", 1);
            i0.ɵɵelement(2, "app-icon", 2);
            i0.ɵɵelementStart(3, "span");
            i0.ɵɵtext(4, "\u0627\u0644\u0623\u0639\u0644\u0649 \u0623\u062F\u0627\u0621\u064B");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(5, "div", 3);
            i0.ɵɵtemplate(6, TopPerformersComponent_div_6_Template, 8, 3, "div", 4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngForOf", ctx.sortedPerformers());
        } }, dependencies: [CommonModule, i1.NgForOf, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.3rem;\n      }\n\n      .performer-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.75rem;\n      }\n\n      .performer[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 1rem;\n        padding: 0.85rem 1rem;\n        border-radius: 1rem;\n        background: var(--color-primary-soft);\n      }\n\n      .performer-copy[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.2rem;\n      }\n\n      .performer-copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TopPerformersComponent, [{
        type: Component,
        args: [{ selector: 'app-top-performers', standalone: true, imports: [CommonModule, IconComponent], template: `
    <article class="card panel">
      <h3 class="section-title label-with-icon">
        <app-icon name="award" [size]="18" />
        <span>الأعلى أداءً</span>
      </h3>
      <div class="performer-list">
        <div class="performer" *ngFor="let item of sortedPerformers()">
          <div class="performer-copy">
            <strong>{{ item.employee?.fullName }}</strong>
            <small>{{ item.averageProgress }}% تقدم</small>
          </div>
          <span>{{ item.employee?.pointsTotal }} نقطة</span>
        </div>
      </div>
    </article>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.3rem;\n      }\n\n      .performer-list {\n        display: grid;\n        gap: 0.75rem;\n      }\n\n      .performer {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        gap: 1rem;\n        padding: 0.85rem 1rem;\n        border-radius: 1rem;\n        background: var(--color-primary-soft);\n      }\n\n      .performer-copy {\n        display: grid;\n        gap: 0.2rem;\n      }\n\n      .performer-copy small {\n        color: var(--color-secondary-paragraph);\n      }\n    "] }]
    }], null, { performers: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TopPerformersComponent, { className: "TopPerformersComponent", filePath: "src/app/features/manager/components/top-performers.component.ts", lineNumber: 60 }); })();
//# sourceMappingURL=top-performers.component.js.map