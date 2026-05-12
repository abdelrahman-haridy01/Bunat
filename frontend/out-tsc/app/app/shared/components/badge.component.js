import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function BadgeComponent_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.description);
} }
export class BadgeComponent {
    constructor() {
        this.icon = 'award';
        this.name = '';
        this.description = '';
    }
    static { this.ɵfac = function BadgeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BadgeComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BadgeComponent, selectors: [["app-badge"]], inputs: { icon: "icon", name: "name", description: "description" }, decls: 7, vars: 4, consts: [[1, "badge-pill"], [1, "icon"], [3, "name", "size"], [4, "ngIf"]], template: function BadgeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "span", 1);
            i0.ɵɵelement(2, "app-icon", 2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div")(4, "strong");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, BadgeComponent_p_6_Template, 2, 1, "p", 3);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("name", ctx.icon)("size", 18);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.name);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.description);
        } }, dependencies: [CommonModule, i1.NgIf, IconComponent], styles: [".badge-pill[_ngcontent-%COMP%] {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.75rem;\n        border-radius: 999px;\n        padding: 0.85rem 1rem;\n        background: linear-gradient(135deg, #fff, #f5fbf7);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .icon[_ngcontent-%COMP%] {\n        width: 2.25rem;\n        height: 2.25rem;\n        border-radius: 50%;\n        display: grid;\n        place-items: center;\n        background: var(--color-primary-soft);\n      }\n\n      p[_ngcontent-%COMP%], \n   strong[_ngcontent-%COMP%] {\n        margin: 0;\n      }\n\n      p[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.85rem;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BadgeComponent, [{
        type: Component,
        args: [{ selector: 'app-badge', standalone: true, imports: [CommonModule, IconComponent], template: `
    <div class="badge-pill">
      <span class="icon"><app-icon [name]="icon" [size]="18" /></span>
      <div>
        <strong>{{ name }}</strong>
        <p *ngIf="description">{{ description }}</p>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .badge-pill {\n        display: inline-flex;\n        align-items: center;\n        gap: 0.75rem;\n        border-radius: 999px;\n        padding: 0.85rem 1rem;\n        background: linear-gradient(135deg, #fff, #f5fbf7);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .icon {\n        width: 2.25rem;\n        height: 2.25rem;\n        border-radius: 50%;\n        display: grid;\n        place-items: center;\n        background: var(--color-primary-soft);\n      }\n\n      p,\n      strong {\n        margin: 0;\n      }\n\n      p {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.85rem;\n      }\n    "] }]
    }], null, { icon: [{
            type: Input
        }], name: [{
            type: Input,
            args: [{ required: true }]
        }], description: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BadgeComponent, { className: "BadgeComponent", filePath: "src/app/shared/components/badge.component.ts", lineNumber: 52 }); })();
//# sourceMappingURL=badge.component.js.map