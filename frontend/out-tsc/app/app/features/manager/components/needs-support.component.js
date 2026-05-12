import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyStateComponent, IconComponent } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function NeedsSupportComponent_div_5_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r1.employee == null ? null : item_r1.employee.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", item_r1.completionRate, "% \u0625\u0646\u062C\u0627\u0632");
} }
function NeedsSupportComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵtemplate(1, NeedsSupportComponent_div_5_div_1_Template, 5, 2, "div", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.employees);
} }
function NeedsSupportComponent_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 8);
} }
export class NeedsSupportComponent {
    constructor() {
        this.employees = [];
    }
    static { this.ɵfac = function NeedsSupportComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NeedsSupportComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NeedsSupportComponent, selectors: [["app-needs-support"]], inputs: { employees: "employees" }, decls: 8, vars: 3, consts: [["empty", ""], [1, "card", "panel"], [1, "section-title", "label-with-icon"], ["name", "alert", 3, "size"], ["class", "support-list", 4, "ngIf", "ngIfElse"], [1, "support-list"], ["class", "support-item", 4, "ngFor", "ngForOf"], [1, "support-item"], ["icon", "shield", "title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0627\u0644\u0627\u062A \u062D\u0631\u062C\u0629", "description", "\u062C\u0645\u064A\u0639 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642 \u0641\u064A \u0645\u0633\u062A\u0648\u0649 \u062A\u0642\u062F\u0645 \u0645\u0642\u0628\u0648\u0644."]], template: function NeedsSupportComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "article", 1)(1, "h3", 2);
            i0.ɵɵelement(2, "app-icon", 3);
            i0.ɵɵelementStart(3, "span");
            i0.ɵɵtext(4, "\u064A\u062D\u062A\u0627\u062C\u0648\u0646 \u062F\u0639\u0645\u0627\u064B");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(5, NeedsSupportComponent_div_5_Template, 2, 1, "div", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(6, NeedsSupportComponent_ng_template_6_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const empty_r3 = i0.ɵɵreference(7);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.employees.length)("ngIfElse", empty_r3);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, EmptyStateComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.3rem;\n      }\n\n      .support-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.75rem;\n      }\n\n      .support-item[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 0.85rem 1rem;\n        border-radius: 1rem;\n        background: var(--color-warning-light);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NeedsSupportComponent, [{
        type: Component,
        args: [{ selector: 'app-needs-support', standalone: true, imports: [CommonModule, EmptyStateComponent, IconComponent], template: `
    <article class="card panel">
      <h3 class="section-title label-with-icon">
        <app-icon name="alert" [size]="18" />
        <span>يحتاجون دعماً</span>
      </h3>
      <div class="support-list" *ngIf="employees.length; else empty">
        <div class="support-item" *ngFor="let item of employees">
          <strong>{{ item.employee?.fullName }}</strong>
          <span>{{ item.completionRate }}% إنجاز</span>
        </div>
      </div>
    </article>

    <ng-template #empty>
      <app-empty-state
        icon="shield"
        title="لا توجد حالات حرجة"
        description="جميع أعضاء الفريق في مستوى تقدم مقبول."
      />
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.3rem;\n      }\n\n      .support-list {\n        display: grid;\n        gap: 0.75rem;\n      }\n\n      .support-item {\n        display: flex;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 0.85rem 1rem;\n        border-radius: 1rem;\n        background: var(--color-warning-light);\n      }\n    "] }]
    }], null, { employees: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NeedsSupportComponent, { className: "NeedsSupportComponent", filePath: "src/app/features/manager/components/needs-support.component.ts", lineNumber: 55 }); })();
//# sourceMappingURL=needs-support.component.js.map