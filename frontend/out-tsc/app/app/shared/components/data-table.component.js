import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function DataTableComponent_table_1_th_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(column_r1.label);
} }
function DataTableComponent_table_1_th_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th");
    i0.ɵɵtext(1, "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A");
    i0.ɵɵelementEnd();
} }
function DataTableComponent_table_1_tr_6_td_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r2 = ctx.$implicit;
    const row_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r3.resolve(row_r3, column_r2.key));
} }
function DataTableComponent_table_1_tr_6_td_2_button_2_app_icon_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-icon", 12);
} if (rf & 2) {
    const action_r6 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("name", action_r6.icon)("size", 16);
} }
function DataTableComponent_table_1_tr_6_td_2_button_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function DataTableComponent_table_1_tr_6_td_2_button_2_Template_button_click_0_listener() { const action_r6 = i0.ɵɵrestoreView(_r5).$implicit; const row_r3 = i0.ɵɵnextContext(2).$implicit; const ctx_r3 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r3.actionClicked.emit({ key: action_r6.key, row: row_r3 })); });
    i0.ɵɵelementStart(1, "span", 10);
    i0.ɵɵtemplate(2, DataTableComponent_table_1_tr_6_td_2_button_2_app_icon_2_Template, 1, 2, "app-icon", 11);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const action_r6 = ctx.$implicit;
    i0.ɵɵclassProp("secondary", action_r6.tone === "secondary")("ghost", action_r6.tone === "ghost")("danger", action_r6.tone === "danger");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", action_r6.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(action_r6.label);
} }
function DataTableComponent_table_1_tr_6_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 6)(1, "div", 7);
    i0.ɵɵtemplate(2, DataTableComponent_table_1_tr_6_td_2_button_2_Template, 5, 8, "button", 8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.actions);
} }
function DataTableComponent_table_1_tr_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, DataTableComponent_table_1_tr_6_td_1_Template, 2, 1, "td", 3)(2, DataTableComponent_table_1_tr_6_td_2_Template, 3, 1, "td", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.columns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.actions.length);
} }
function DataTableComponent_table_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table")(1, "thead")(2, "tr");
    i0.ɵɵtemplate(3, DataTableComponent_table_1_th_3_Template, 2, 1, "th", 3)(4, DataTableComponent_table_1_th_4_Template, 2, 0, "th", 4);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "tbody");
    i0.ɵɵtemplate(6, DataTableComponent_table_1_tr_6_Template, 3, 2, "tr", 3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r3.columns);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r3.actions.length);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.rows);
} }
function DataTableComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtext(1, "\u0644\u0627 \u062A\u0648\u062C\u062F \u0633\u062C\u0644\u0627\u062A \u0645\u062A\u0627\u062D\u0629 \u062D\u0627\u0644\u064A\u0627\u064B.");
    i0.ɵɵelementEnd();
} }
export class DataTableComponent {
    constructor() {
        this.columns = [];
        this.rows = [];
        this.actions = [];
        this.actionClicked = new EventEmitter();
    }
    resolve(row, key) {
        return key.split('.').reduce((value, part) => {
            if (value && typeof value === 'object' && part in value) {
                return value[part];
            }
            return '';
        }, row);
    }
    static { this.ɵfac = function DataTableComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DataTableComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DataTableComponent, selectors: [["app-data-table"]], inputs: { columns: "columns", rows: "rows", actions: "actions" }, outputs: { actionClicked: "actionClicked" }, decls: 4, vars: 2, consts: [["emptyTemplate", ""], [1, "table-wrap", "card"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"], [4, "ngIf"], ["class", "actions-cell", 4, "ngIf"], [1, "actions-cell"], [1, "table-actions"], ["type", "button", "class", "table-action", 3, "secondary", "ghost", "danger", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "table-action", 3, "click"], [1, "btn-content"], [3, "name", "size", 4, "ngIf"], [3, "name", "size"], [1, "empty-text"]], template: function DataTableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵtemplate(1, DataTableComponent_table_1_Template, 7, 3, "table", 2)(2, DataTableComponent_ng_template_2_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const emptyTemplate_r7 = i0.ɵɵreference(3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.rows.length)("ngIfElse", emptyTemplate_r7);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, IconComponent], styles: [".table-wrap[_ngcontent-%COMP%] {\n        overflow: auto;\n      }\n\n      table[_ngcontent-%COMP%] {\n        width: 100%;\n        border-collapse: collapse;\n      }\n\n      th[_ngcontent-%COMP%], \n   td[_ngcontent-%COMP%] {\n        padding: 1rem;\n        text-align: right;\n        border-bottom: 1px solid var(--color-neutral-200);\n      }\n\n      th[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n        font-weight: 600;\n        background: var(--color-neutral-50);\n      }\n\n      .empty-text[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .actions-cell[_ngcontent-%COMP%] {\n        width: 1%;\n        white-space: nowrap;\n      }\n\n      .table-actions[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-start;\n        gap: 0.5rem;\n      }\n\n      .table-action[_ngcontent-%COMP%] {\n        border: 0;\n        border-radius: 999px;\n        padding: 0.65rem 0.9rem;\n        background: linear-gradient(135deg, var(--color-primary-default), #1a7e53);\n        color: var(--color-oncolor-primary);\n        cursor: pointer;\n      }\n\n      .table-action.secondary[_ngcontent-%COMP%] {\n        background: var(--color-neutral-100);\n        color: var(--color-display);\n      }\n\n      .table-action.ghost[_ngcontent-%COMP%] {\n        background: transparent;\n        color: var(--color-secondary-default);\n        border: 1px solid rgba(15, 76, 129, 0.2);\n      }\n\n      .table-action.danger[_ngcontent-%COMP%] {\n        background: rgba(180, 35, 24, 0.1);\n        color: var(--color-error-default);\n        border: 1px solid rgba(180, 35, 24, 0.18);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DataTableComponent, [{
        type: Component,
        args: [{ selector: 'app-data-table', standalone: true, imports: [CommonModule, IconComponent], template: `
    <div class="table-wrap card">
      <table *ngIf="rows.length; else emptyTemplate">
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column.label }}</th>
            <th *ngIf="actions.length">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">{{ resolve(row, column.key) }}</td>
            <td *ngIf="actions.length" class="actions-cell">
              <div class="table-actions">
                <button
                  *ngFor="let action of actions"
                  type="button"
                  class="table-action"
                  [class.secondary]="action.tone === 'secondary'"
                  [class.ghost]="action.tone === 'ghost'"
                  [class.danger]="action.tone === 'danger'"
                  (click)="actionClicked.emit({ key: action.key, row })"
                >
                  <span class="btn-content">
                    <app-icon *ngIf="action.icon" [name]="action.icon" [size]="16" />
                    <span>{{ action.label }}</span>
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ng-template #emptyTemplate>
        <div class="empty-text">لا توجد سجلات متاحة حالياً.</div>
      </ng-template>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .table-wrap {\n        overflow: auto;\n      }\n\n      table {\n        width: 100%;\n        border-collapse: collapse;\n      }\n\n      th,\n      td {\n        padding: 1rem;\n        text-align: right;\n        border-bottom: 1px solid var(--color-neutral-200);\n      }\n\n      th {\n        color: var(--color-secondary-paragraph);\n        font-size: 0.9rem;\n        font-weight: 600;\n        background: var(--color-neutral-50);\n      }\n\n      .empty-text {\n        padding: 1.5rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .actions-cell {\n        width: 1%;\n        white-space: nowrap;\n      }\n\n      .table-actions {\n        display: flex;\n        justify-content: flex-start;\n        gap: 0.5rem;\n      }\n\n      .table-action {\n        border: 0;\n        border-radius: 999px;\n        padding: 0.65rem 0.9rem;\n        background: linear-gradient(135deg, var(--color-primary-default), #1a7e53);\n        color: var(--color-oncolor-primary);\n        cursor: pointer;\n      }\n\n      .table-action.secondary {\n        background: var(--color-neutral-100);\n        color: var(--color-display);\n      }\n\n      .table-action.ghost {\n        background: transparent;\n        color: var(--color-secondary-default);\n        border: 1px solid rgba(15, 76, 129, 0.2);\n      }\n\n      .table-action.danger {\n        background: rgba(180, 35, 24, 0.1);\n        color: var(--color-error-default);\n        border: 1px solid rgba(180, 35, 24, 0.18);\n      }\n    "] }]
    }], null, { columns: [{
            type: Input,
            args: [{ required: true }]
        }], rows: [{
            type: Input
        }], actions: [{
            type: Input
        }], actionClicked: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DataTableComponent, { className: "DataTableComponent", filePath: "src/app/shared/components/data-table.component.ts", lineNumber: 119 }); })();
//# sourceMappingURL=data-table.component.js.map