import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
export class LevelCardComponent {
    constructor() {
        this.name = '';
        this.points = 0;
    }
    static { this.ɵfac = function LevelCardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LevelCardComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LevelCardComponent, selectors: [["app-level-card"]], inputs: { name: "name", points: "points" }, decls: 10, vars: 3, consts: [[1, "level-card", "card"], [1, "head"], [1, "level-icon"], ["name", "award", 3, "size"]], template: function LevelCardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵelement(3, "app-icon", 3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "p");
            i0.ɵɵtext(5, "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062D\u0627\u0644\u064A");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "strong");
            i0.ɵɵtext(7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "span");
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.name || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.points, " \u0646\u0642\u0637\u0629");
        } }, dependencies: [IconComponent], styles: [".level-card[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.5rem;\n        padding: 1.25rem;\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.08), #fff);\n      }\n\n      .head[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.7rem;\n      }\n\n      .level-icon[_ngcontent-%COMP%] {\n        width: 2.35rem;\n        height: 2.35rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(20, 87, 58, 0.12);\n        color: var(--color-primary-default);\n      }\n\n      p[_ngcontent-%COMP%], \n   span[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      strong[_ngcontent-%COMP%] {\n        font-size: 1.4rem;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LevelCardComponent, [{
        type: Component,
        args: [{ selector: 'app-level-card', standalone: true, imports: [IconComponent], template: `
    <article class="level-card card">
      <div class="head">
        <span class="level-icon">
          <app-icon name="award" [size]="20" />
        </span>
        <p>المستوى الحالي</p>
      </div>
      <strong>{{ name || 'غير محدد' }}</strong>
      <span>{{ points }} نقطة</span>
    </article>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .level-card {\n        display: grid;\n        gap: 0.5rem;\n        padding: 1.25rem;\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.08), #fff);\n      }\n\n      .head {\n        display: flex;\n        align-items: center;\n        gap: 0.7rem;\n      }\n\n      .level-icon {\n        width: 2.35rem;\n        height: 2.35rem;\n        border-radius: 0.9rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(20, 87, 58, 0.12);\n        color: var(--color-primary-default);\n      }\n\n      p,\n      span {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      strong {\n        font-size: 1.4rem;\n      }\n    "] }]
    }], null, { name: [{
            type: Input
        }], points: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LevelCardComponent, { className: "LevelCardComponent", filePath: "src/app/shared/components/level-card.component.ts", lineNumber: 59 }); })();
//# sourceMappingURL=level-card.component.js.map