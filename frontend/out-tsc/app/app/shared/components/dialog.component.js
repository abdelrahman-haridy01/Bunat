import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["dialogRef"];
const _c1 = ["*"];
function DialogComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵelement(1, "app-icon", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r0.icon)("size", 20);
} }
function DialogComponent_p_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.subtitle);
} }
export class DialogComponent {
    constructor() {
        this.title = '';
        this.subtitle = '';
        this.icon = 'sparkles';
    }
    open() {
        if (!this.dialogRef?.nativeElement.open) {
            this.dialogRef?.nativeElement.showModal();
        }
    }
    close() {
        this.dialogRef?.nativeElement.close();
    }
    onBackdropClick(event) {
        if (event.target === this.dialogRef?.nativeElement) {
            this.close();
        }
    }
    static { this.ɵfac = function DialogComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DialogComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DialogComponent, selectors: [["app-dialog"]], viewQuery: function DialogComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogRef = _t.first);
        } }, inputs: { title: "title", subtitle: "subtitle", icon: "icon" }, ngContentSelectors: _c1, decls: 14, vars: 3, consts: [["dialogRef", ""], [1, "app-dialog", 3, "click"], [1, "dialog-surface"], [1, "dialog-header"], [1, "label-with-icon"], ["class", "icon-badge", 4, "ngIf"], [1, "section-title"], ["class", "section-subtitle", 4, "ngIf"], ["type", "button", "aria-label", "\u0625\u063A\u0644\u0627\u0642 \u0627\u0644\u0646\u0627\u0641\u0630\u0629", 1, "dialog-close", 3, "click"], [1, "dialog-body"], [1, "icon-badge"], [3, "name", "size"], [1, "section-subtitle"]], template: function DialogComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "dialog", 1, 0);
            i0.ɵɵlistener("click", function DialogComponent_Template_dialog_click_0_listener($event) { return ctx.onBackdropClick($event); });
            i0.ɵɵelementStart(2, "div", 2)(3, "div", 3)(4, "div", 4);
            i0.ɵɵtemplate(5, DialogComponent_span_5_Template, 2, 2, "span", 5);
            i0.ɵɵelementStart(6, "div")(7, "h2", 6);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(9, DialogComponent_p_9_Template, 2, 1, "p", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(10, "button", 8);
            i0.ɵɵlistener("click", function DialogComponent_Template_button_click_10_listener() { return ctx.close(); });
            i0.ɵɵtext(11, "\u00D7");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "div", 9);
            i0.ɵɵprojection(13);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.icon);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx.title);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.subtitle);
        } }, dependencies: [CommonModule, i1.NgIf, IconComponent], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DialogComponent, [{
        type: Component,
        args: [{
                selector: 'app-dialog',
                standalone: true,
                imports: [CommonModule, IconComponent],
                template: `
    <dialog #dialogRef class="app-dialog" (click)="onBackdropClick($event)">
      <div class="dialog-surface">
        <div class="dialog-header">
          <div class="label-with-icon">
            <span class="icon-badge" *ngIf="icon">
              <app-icon [name]="icon" [size]="20" />
            </span>
            <div>
              <h2 class="section-title">{{ title }}</h2>
              <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
            </div>
          </div>
          <button class="dialog-close" type="button" (click)="close()" aria-label="إغلاق النافذة">×</button>
        </div>

        <div class="dialog-body">
          <ng-content />
        </div>
      </div>
    </dialog>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], null, { title: [{
            type: Input,
            args: [{ required: true }]
        }], subtitle: [{
            type: Input
        }], icon: [{
            type: Input
        }], dialogRef: [{
            type: ViewChild,
            args: ['dialogRef', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DialogComponent, { className: "DialogComponent", filePath: "src/app/shared/components/dialog.component.ts", lineNumber: 33 }); })();
//# sourceMappingURL=dialog.component.js.map