import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function HeaderComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "div", 8);
    i0.ɵɵelement(2, "app-icon", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "span");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r1 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(user_r1.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r1.jobTitle);
} }
export class HeaderComponent {
    constructor() {
        this.title = '';
        this.eyebrow = 'لوحة المتابعة';
        this.authService = inject(AuthService);
    }
    static { this.ɵfac = function HeaderComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HeaderComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HeaderComponent, selectors: [["app-header"]], inputs: { title: "title", eyebrow: "eyebrow" }, decls: 13, vars: 4, consts: [[1, "header", "card"], [1, "eyebrow"], [1, "actions"], ["class", "user-box", 4, "ngIf"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "btn-content"], ["name", "logout", 3, "size"], [1, "user-box"], [1, "user-avatar"], ["name", "user", 3, "size"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "header", 0)(1, "div")(2, "p", 1);
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h1");
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 2);
            i0.ɵɵtemplate(7, HeaderComponent_div_7_Template, 8, 3, "div", 3);
            i0.ɵɵelementStart(8, "button", 4);
            i0.ɵɵlistener("click", function HeaderComponent_Template_button_click_8_listener() { return ctx.authService.logout(); });
            i0.ɵɵelementStart(9, "span", 5);
            i0.ɵɵelement(10, "app-icon", 6);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.eyebrow);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.authService.currentUser());
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("size", 18);
        } }, dependencies: [CommonModule, i1.NgIf, IconComponent], styles: [".header[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 1.4rem 1.6rem;\n      }\n\n      .eyebrow[_ngcontent-%COMP%] {\n        margin: 0 0 0.35rem;\n        color: var(--color-secondary-default);\n        font-size: 0.85rem;\n        font-weight: 700;\n      }\n\n      h1[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-display);\n        font-size: 1.55rem;\n      }\n\n      .actions[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n      }\n\n      .user-box[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.85rem;\n        text-align: left;\n      }\n\n      .user-box[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:last-child {\n        display: grid;\n        gap: 0.15rem;\n      }\n\n      .user-avatar[_ngcontent-%COMP%] {\n        width: 2.6rem;\n        height: 2.6rem;\n        border-radius: 0.95rem;\n        display: grid;\n        place-items: center;\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.12), rgba(15, 76, 129, 0.14));\n        color: var(--color-secondary-default);\n      }\n\n      .user-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n\n      @media (max-width: 900px) {\n        .header[_ngcontent-%COMP%] {\n          flex-direction: column;\n          align-items: stretch;\n        }\n\n        .actions[_ngcontent-%COMP%] {\n          justify-content: space-between;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeaderComponent, [{
        type: Component,
        args: [{ selector: 'app-header', standalone: true, imports: [CommonModule, IconComponent], template: `
    <header class="header card">
      <div>
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
      </div>

      <div class="actions">
        <div class="user-box" *ngIf="authService.currentUser() as user">
          <div class="user-avatar">
            <app-icon name="user" [size]="18" />
          </div>
          <div>
            <strong>{{ user.fullName }}</strong>
            <span>{{ user.jobTitle }}</span>
          </div>
        </div>

        <button class="btn btn-secondary" type="button" (click)="authService.logout()">
          <span class="btn-content">
            <app-icon name="logout" [size]="18" />
            <span>تسجيل الخروج</span>
          </span>
        </button>
      </div>
    </header>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 1.4rem 1.6rem;\n      }\n\n      .eyebrow {\n        margin: 0 0 0.35rem;\n        color: var(--color-secondary-default);\n        font-size: 0.85rem;\n        font-weight: 700;\n      }\n\n      h1 {\n        margin: 0;\n        color: var(--color-display);\n        font-size: 1.55rem;\n      }\n\n      .actions {\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n      }\n\n      .user-box {\n        display: flex;\n        align-items: center;\n        gap: 0.85rem;\n        text-align: left;\n      }\n\n      .user-box > div:last-child {\n        display: grid;\n        gap: 0.15rem;\n      }\n\n      .user-avatar {\n        width: 2.6rem;\n        height: 2.6rem;\n        border-radius: 0.95rem;\n        display: grid;\n        place-items: center;\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.12), rgba(15, 76, 129, 0.14));\n        color: var(--color-secondary-default);\n      }\n\n      .user-box span {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n      }\n\n      @media (max-width: 900px) {\n        .header {\n          flex-direction: column;\n          align-items: stretch;\n        }\n\n        .actions {\n          justify-content: space-between;\n        }\n      }\n    "] }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], eyebrow: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HeaderComponent, { className: "HeaderComponent", filePath: "src/app/shared/components/header.component.ts", lineNumber: 108 }); })();
//# sourceMappingURL=header.component.js.map