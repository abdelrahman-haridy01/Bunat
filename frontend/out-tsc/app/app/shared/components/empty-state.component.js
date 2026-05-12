import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
export class EmptyStateComponent {
    constructor() {
        this.icon = 'folder-check';
        this.title = 'لا توجد بيانات';
        this.description = 'ستظهر النتائج هنا عند توفرها.';
    }
    static { this.ɵfac = function EmptyStateComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmptyStateComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmptyStateComponent, selectors: [["app-empty-state"]], inputs: { icon: "icon", title: "title", description: "description" }, decls: 7, vars: 4, consts: [[1, "empty", "card"], [1, "empty-icon"], [3, "name", "size"]], template: function EmptyStateComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
            i0.ɵɵelement(2, "app-icon", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "strong");
            i0.ɵɵtext(4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "p");
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("name", ctx.icon)("size", 22);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.description);
        } }, dependencies: [IconComponent], styles: [".empty[_ngcontent-%COMP%] {\n        display: grid;\n        justify-items: center;\n        gap: 0.6rem;\n        padding: 2rem;\n        text-align: center;\n      }\n\n      .empty-icon[_ngcontent-%COMP%] {\n        width: 3rem;\n        height: 3rem;\n        border-radius: 1rem;\n        display: grid;\n        place-items: center;\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.1), rgba(15, 76, 129, 0.1));\n        color: var(--color-secondary-default);\n      }\n\n      p[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmptyStateComponent, [{
        type: Component,
        args: [{ selector: 'app-empty-state', standalone: true, imports: [IconComponent], template: `
    <div class="empty card">
      <div class="empty-icon">
        <app-icon [name]="icon" [size]="22" />
      </div>
      <strong>{{ title }}</strong>
      <p>{{ description }}</p>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .empty {\n        display: grid;\n        justify-items: center;\n        gap: 0.6rem;\n        padding: 2rem;\n        text-align: center;\n      }\n\n      .empty-icon {\n        width: 3rem;\n        height: 3rem;\n        border-radius: 1rem;\n        display: grid;\n        place-items: center;\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.1), rgba(15, 76, 129, 0.1));\n        color: var(--color-secondary-default);\n      }\n\n      p {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n    "] }]
    }], null, { icon: [{
            type: Input
        }], title: [{
            type: Input
        }], description: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmptyStateComponent, { className: "EmptyStateComponent", filePath: "src/app/shared/components/empty-state.component.ts", lineNumber: 45 }); })();
//# sourceMappingURL=empty-state.component.js.map