import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function SidebarComponent_a_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 5);
    i0.ɵɵelement(1, "app-icon", 6);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵproperty("routerLink", item_r1.link);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", item_r1.icon || "dashboard")("size", 18);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.label);
} }
export class SidebarComponent {
    constructor() {
        this.items = [];
    }
    static { this.ɵfac = function SidebarComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SidebarComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SidebarComponent, selectors: [["app-sidebar"]], inputs: { items: "items" }, decls: 11, vars: 1, consts: [[1, "sidebar", "card"], [1, "brand"], [1, "brand-mark"], [1, "nav"], ["routerLinkActive", "active", "class", "nav-link", 3, "routerLink", 4, "ngFor", "ngForOf"], ["routerLinkActive", "active", 1, "nav-link", 3, "routerLink"], [3, "name", "size"]], template: function SidebarComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "aside", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵtext(3, "\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div")(5, "strong");
            i0.ɵɵtext(6, "\u0628\u064F\u0646\u0627\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "p");
            i0.ɵɵtext(8, "\u0645\u0646\u0635\u0629 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0627\u0644\u062A\u0637\u0648\u064A\u0631");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(9, "nav", 3);
            i0.ɵɵtemplate(10, SidebarComponent_a_10_Template, 4, 4, "a", 4);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("ngForOf", ctx.items);
        } }, dependencies: [CommonModule, i1.NgForOf, RouterLink, RouterLinkActive, IconComponent], styles: [".sidebar[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1.5rem;\n        padding: 1.5rem;\n        position: sticky;\n        top: 1rem;\n      }\n\n      .brand[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n      }\n\n      .brand[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.2rem 0 0;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n\n      .brand-mark[_ngcontent-%COMP%] {\n        width: 3rem;\n        height: 3rem;\n        border-radius: 1rem;\n        display: grid;\n        place-items: center;\n        background: linear-gradient(135deg, var(--color-primary-default), var(--color-secondary-default));\n        color: white;\n        font-weight: 700;\n      }\n\n      .nav[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.55rem;\n      }\n\n      .nav-link[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        padding: 0.9rem 1rem;\n        border-radius: 1rem;\n        color: var(--color-primary-paragraph);\n        transition: background 180ms ease, color 180ms ease;\n      }\n\n      .nav-link.active[_ngcontent-%COMP%], \n   .nav-link[_ngcontent-%COMP%]:hover {\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SidebarComponent, [{
        type: Component,
        args: [{ selector: 'app-sidebar', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent], template: `
    <aside class="sidebar card">
      <div class="brand">
        <div class="brand-mark">ب</div>
        <div>
          <strong>بُناة</strong>
          <p>منصة التدريب والتطوير</p>
        </div>
      </div>

      <nav class="nav">
        <a
          *ngFor="let item of items"
          [routerLink]="item.link"
          routerLinkActive="active"
          class="nav-link"
        >
          <app-icon [name]="item.icon || 'dashboard'" [size]="18" />
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .sidebar {\n        display: grid;\n        gap: 1.5rem;\n        padding: 1.5rem;\n        position: sticky;\n        top: 1rem;\n      }\n\n      .brand {\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n      }\n\n      .brand p {\n        margin: 0.2rem 0 0;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n\n      .brand-mark {\n        width: 3rem;\n        height: 3rem;\n        border-radius: 1rem;\n        display: grid;\n        place-items: center;\n        background: linear-gradient(135deg, var(--color-primary-default), var(--color-secondary-default));\n        color: white;\n        font-weight: 700;\n      }\n\n      .nav {\n        display: grid;\n        gap: 0.55rem;\n      }\n\n      .nav-link {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        padding: 0.9rem 1rem;\n        border-radius: 1rem;\n        color: var(--color-primary-paragraph);\n        transition: background 180ms ease, color 180ms ease;\n      }\n\n      .nav-link.active,\n      .nav-link:hover {\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n      }\n    "] }]
    }], null, { items: [{
            type: Input,
            args: [{ required: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(SidebarComponent, { className: "SidebarComponent", filePath: "src/app/shared/components/sidebar.component.ts", lineNumber: 90 }); })();
//# sourceMappingURL=sidebar.component.js.map