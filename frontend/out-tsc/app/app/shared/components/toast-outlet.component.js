import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/services/toast.service';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ToastOutletComponent_div_0_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 3)(1, "div", 4)(2, "span", 5);
    i0.ɵɵelement(3, "app-icon", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 7);
    i0.ɵɵlistener("click", function ToastOutletComponent_div_0_article_1_Template_button_click_6_listener() { const toast_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.toastService.dismiss(toast_r2.id)); });
    i0.ɵɵtext(7, " \u00D7 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const toast_r2 = ctx.$implicit;
    i0.ɵɵclassProp("error", toast_r2.type === "error");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("name", toast_r2.type === "success" ? "folder-check" : "alert")("size", 18);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(toast_r2.message);
} }
function ToastOutletComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, ToastOutletComponent_div_0_article_1_Template, 8, 5, "article", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.toastService.toasts());
} }
export class ToastOutletComponent {
    constructor() {
        this.toastService = inject(ToastService);
    }
    static { this.ɵfac = function ToastOutletComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastOutletComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastOutletComponent, selectors: [["app-toast-outlet"]], decls: 1, vars: 1, consts: [["class", "toast-stack", 4, "ngIf"], [1, "toast-stack"], ["class", "toast-card", 3, "error", 4, "ngFor", "ngForOf"], [1, "toast-card"], [1, "toast-copy"], [1, "toast-icon"], [3, "name", "size"], ["type", "button", "aria-label", "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0625\u0634\u0639\u0627\u0631", 1, "toast-close", 3, "click"]], template: function ToastOutletComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, ToastOutletComponent_div_0_Template, 2, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.toastService.toasts().length);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IconComponent], styles: [".toast-stack[_ngcontent-%COMP%] {\n        position: fixed;\n        top: 1rem;\n        left: 1rem;\n        z-index: 1200;\n        display: grid;\n        gap: 0.75rem;\n        width: min(360px, calc(100vw - 2rem));\n      }\n\n      .toast-card[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 0.75rem;\n        padding: 1rem 1rem 1rem 1.1rem;\n        border-radius: 1rem;\n        border: 1px solid rgba(31, 139, 76, 0.18);\n        background: rgba(255, 255, 255, 0.96);\n        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.16);\n        backdrop-filter: blur(10px);\n      }\n\n      .toast-card.error[_ngcontent-%COMP%] {\n        border-color: rgba(180, 35, 24, 0.18);\n      }\n\n      .toast-copy[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.75rem;\n      }\n\n      .toast-icon[_ngcontent-%COMP%] {\n        width: 2.1rem;\n        height: 2.1rem;\n        border-radius: 0.8rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(31, 139, 76, 0.12);\n        color: var(--color-success);\n      }\n\n      .toast-card.error[_ngcontent-%COMP%]   .toast-icon[_ngcontent-%COMP%] {\n        background: rgba(180, 35, 24, 0.12);\n        color: var(--color-error-default);\n      }\n\n      p[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-display);\n        line-height: 1.5;\n      }\n\n      .toast-close[_ngcontent-%COMP%] {\n        border: 0;\n        background: transparent;\n        color: var(--color-secondary-paragraph);\n        font-size: 1.2rem;\n        line-height: 1;\n        cursor: pointer;\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastOutletComponent, [{
        type: Component,
        args: [{ selector: 'app-toast-outlet', standalone: true, imports: [CommonModule, IconComponent], template: `
    <div class="toast-stack" *ngIf="toastService.toasts().length">
      <article class="toast-card" *ngFor="let toast of toastService.toasts()" [class.error]="toast.type === 'error'">
        <div class="toast-copy">
          <span class="toast-icon">
            <app-icon [name]="toast.type === 'success' ? 'folder-check' : 'alert'" [size]="18" />
          </span>
          <p>{{ toast.message }}</p>
        </div>
        <button class="toast-close" type="button" (click)="toastService.dismiss(toast.id)" aria-label="إغلاق الإشعار">
          ×
        </button>
      </article>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .toast-stack {\n        position: fixed;\n        top: 1rem;\n        left: 1rem;\n        z-index: 1200;\n        display: grid;\n        gap: 0.75rem;\n        width: min(360px, calc(100vw - 2rem));\n      }\n\n      .toast-card {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 0.75rem;\n        padding: 1rem 1rem 1rem 1.1rem;\n        border-radius: 1rem;\n        border: 1px solid rgba(31, 139, 76, 0.18);\n        background: rgba(255, 255, 255, 0.96);\n        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.16);\n        backdrop-filter: blur(10px);\n      }\n\n      .toast-card.error {\n        border-color: rgba(180, 35, 24, 0.18);\n      }\n\n      .toast-copy {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.75rem;\n      }\n\n      .toast-icon {\n        width: 2.1rem;\n        height: 2.1rem;\n        border-radius: 0.8rem;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        background: rgba(31, 139, 76, 0.12);\n        color: var(--color-success);\n      }\n\n      .toast-card.error .toast-icon {\n        background: rgba(180, 35, 24, 0.12);\n        color: var(--color-error-default);\n      }\n\n      p {\n        margin: 0;\n        color: var(--color-display);\n        line-height: 1.5;\n      }\n\n      .toast-close {\n        border: 0;\n        background: transparent;\n        color: var(--color-secondary-paragraph);\n        font-size: 1.2rem;\n        line-height: 1;\n        cursor: pointer;\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ToastOutletComponent, { className: "ToastOutletComponent", filePath: "src/app/shared/components/toast-outlet.component.ts", lineNumber: 95 }); })();
//# sourceMappingURL=toast-outlet.component.js.map