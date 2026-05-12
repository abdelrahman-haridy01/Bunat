import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ProgressBarComponent {
    constructor() {
        this.value = 0;
    }
    static { this.ɵfac = function ProgressBarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ProgressBarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ProgressBarComponent, selectors: [["app-progress-bar"]], inputs: { value: "value" }, decls: 5, vars: 3, consts: [[1, "progress-shell"], [1, "progress-track"], [1, "progress-fill"]], template: function ProgressBarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵdomElement(2, "div", 2);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "span");
            i0.ɵɵtext(4);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵstyleProp("width", ctx.value, "%");
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", ctx.value, "%");
        } }, styles: [".progress-shell[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n      }\n\n      .progress-track[_ngcontent-%COMP%] {\n        flex: 1;\n        height: 0.75rem;\n        border-radius: 999px;\n        background: var(--color-neutral-100);\n        overflow: hidden;\n      }\n\n      .progress-fill[_ngcontent-%COMP%] {\n        height: 100%;\n        border-radius: inherit;\n        background: linear-gradient(90deg, var(--color-secondary-default), var(--color-primary-default));\n      }\n\n      span[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.88rem;\n        min-width: 3rem;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ProgressBarComponent, [{
        type: Component,
        args: [{ selector: 'app-progress-bar', standalone: true, template: `
    <div class="progress-shell">
      <div class="progress-track">
        <div class="progress-fill" [style.width.%]="value"></div>
      </div>
      <span>{{ value }}%</span>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .progress-shell {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n      }\n\n      .progress-track {\n        flex: 1;\n        height: 0.75rem;\n        border-radius: 999px;\n        background: var(--color-neutral-100);\n        overflow: hidden;\n      }\n\n      .progress-fill {\n        height: 100%;\n        border-radius: inherit;\n        background: linear-gradient(90deg, var(--color-secondary-default), var(--color-primary-default));\n      }\n\n      span {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.88rem;\n        min-width: 3rem;\n      }\n    "] }]
    }], null, { value: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ProgressBarComponent, { className: "ProgressBarComponent", filePath: "src/app/shared/components/progress-bar.component.ts", lineNumber: 45 }); })();
//# sourceMappingURL=progress-bar.component.js.map