import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KpisApiService } from '../../../core/services/kpis-api.service';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["kpiDialog"];
const _c1 = ["recordDialog"];
const _c2 = ["deleteDialog"];
function KpiManagementComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.kpiForm.controls.name, ctx_r0.kpiValidationMessages.name), " ");
} }
function KpiManagementComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.kpiForm.controls.metricType, ctx_r0.kpiValidationMessages.metricType), " ");
} }
function KpiManagementComponent_div_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.kpiForm.controls.direction, ctx_r0.kpiValidationMessages.direction), " ");
} }
function KpiManagementComponent_div_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.kpiForm.controls.targetValue, ctx_r0.kpiValidationMessages.targetValue), " ");
} }
function KpiManagementComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.kpiForm.controls.unit, ctx_r0.kpiValidationMessages.unit), " ");
} }
function KpiManagementComponent_option_73_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r2._id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(department_r2.name);
} }
function KpiManagementComponent_div_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.kpiForm.controls.description, ctx_r0.kpiValidationMessages.description), " ");
} }
function KpiManagementComponent_option_92_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", user_r3._id || user_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r3.fullName);
} }
function KpiManagementComponent_div_93_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.recordForm.controls.userId, ctx_r0.recordValidationMessages.userId), " ");
} }
function KpiManagementComponent_option_98_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 51);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const kpi_r4 = ctx.$implicit;
    i0.ɵɵproperty("value", kpi_r4._id || kpi_r4.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(kpi_r4.name);
} }
function KpiManagementComponent_div_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.recordForm.controls.kpiId, ctx_r0.recordValidationMessages.kpiId), " ");
} }
function KpiManagementComponent_div_104_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.recordForm.controls.beforeValue, ctx_r0.recordValidationMessages.beforeValue), " ");
} }
function KpiManagementComponent_div_109_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.recordForm.controls.afterValue, ctx_r0.recordValidationMessages.afterValue), " ");
} }
function KpiManagementComponent_strong_120_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const kpi_r5 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(kpi_r5.name);
} }
export class KpiManagementComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.kpisApi = inject(KpisApiService);
        this.lookupsApi = inject(LookupsApiService);
        this.kpiDialog = viewChild.required('kpiDialog');
        this.recordDialog = viewChild.required('recordDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.kpis = signal([], ...(ngDevMode ? [{ debugName: "kpis" }] : /* istanbul ignore next */ []));
        this.departments = signal([], ...(ngDevMode ? [{ debugName: "departments" }] : /* istanbul ignore next */ []));
        this.employees = signal([], ...(ngDevMode ? [{ debugName: "employees" }] : /* istanbul ignore next */ []));
        this.loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.editingKpi = signal(null, ...(ngDevMode ? [{ debugName: "editingKpi" }] : /* istanbul ignore next */ []));
        this.deletingKpi = signal(null, ...(ngDevMode ? [{ debugName: "deletingKpi" }] : /* istanbul ignore next */ []));
        this.isEditMode = computed(() => !!this.editingKpi(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.kpiValidationMessages = {
            name: {
                required: 'أدخل اسم المؤشر.',
            },
            description: {
                required: 'أدخل وصف المؤشر.',
            },
            metricType: {
                required: 'اختر نوع القياس.',
            },
            direction: {
                required: 'اختر الاتجاه.',
            },
            targetValue: {
                required: 'أدخل القيمة المستهدفة.',
                min: 'القيمة المستهدفة لا يمكن أن تكون سالبة.',
            },
            unit: {
                required: 'أدخل وحدة القياس.',
            },
        };
        this.recordValidationMessages = {
            userId: {
                required: 'اختر الموظف.',
            },
            kpiId: {
                required: 'اختر المؤشر.',
            },
            beforeValue: {
                required: 'أدخل القيمة قبل التدريب.',
                min: 'القيمة قبل التدريب لا يمكن أن تكون سالبة.',
            },
            afterValue: {
                required: 'أدخل القيمة بعد التدريب.',
                min: 'القيمة بعد التدريب لا يمكن أن تكون سالبة.',
            },
        };
        this.columns = [
            { key: 'name', label: 'المؤشر' },
            { key: 'metricTypeLabel', label: 'النوع' },
            { key: 'target', label: 'الهدف' },
            { key: 'department', label: 'القسم' },
        ];
        this.actions = [
            { key: 'edit', label: 'تعديل', icon: 'target', tone: 'ghost' },
            { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' },
        ];
        this.kpiForm = this.fb.nonNullable.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            metricType: ['percentage', Validators.required],
            direction: ['increase', Validators.required],
            targetValue: [90, [Validators.required, Validators.min(0)]],
            unit: ['%', Validators.required],
            departmentId: [''],
        });
        this.recordForm = this.fb.nonNullable.group({
            userId: ['', Validators.required],
            kpiId: ['', Validators.required],
            beforeValue: [0, [Validators.required, Validators.min(0)]],
            afterValue: [0, [Validators.required, Validators.min(0)]],
            notes: ['قياس من لوحة الإدارة'],
        });
    }
    ngOnInit() {
        this.loadData();
    }
    openKpiDialog() {
        this.editingKpi.set(null);
        this.kpiForm.reset({
            name: '',
            description: '',
            metricType: 'percentage',
            direction: 'increase',
            targetValue: 90,
            unit: '%',
            departmentId: '',
        });
        clearControlState(this.kpiForm);
        this.kpiDialog().open();
    }
    closeKpiDialog() {
        this.editingKpi.set(null);
        this.kpiDialog().close();
    }
    openRecordDialog() {
        clearControlState(this.recordForm);
        this.recordDialog().open();
    }
    closeRecordDialog() {
        this.recordDialog().close();
    }
    closeDeleteDialog() {
        this.deletingKpi.set(null);
        this.deleteDialog().close();
    }
    handleTableAction(event) {
        if (typeof event.row['kpiId'] !== 'string') {
            return;
        }
        const kpi = this.kpis().find((item) => (item._id || item.id) === event.row['kpiId']);
        if (!kpi) {
            return;
        }
        if (event.key === 'edit') {
            this.openEditDialog(kpi);
            return;
        }
        if (event.key === 'delete') {
            this.openDeleteDialog(kpi);
        }
    }
    openEditDialog(kpi) {
        this.editingKpi.set(kpi);
        this.kpiForm.reset({
            name: kpi.name,
            description: kpi.description,
            metricType: kpi.metricType,
            direction: kpi.direction,
            targetValue: kpi.targetValue,
            unit: kpi.unit,
            departmentId: typeof kpi.departmentId === 'string' ? kpi.departmentId : kpi.departmentId?._id || '',
        });
        clearControlState(this.kpiForm);
        this.kpiDialog().open();
    }
    openDeleteDialog(kpi) {
        this.deletingKpi.set(kpi);
        this.deleteDialog().open();
    }
    submitKpi() {
        if (this.kpiForm.invalid || this.loading()) {
            touchAllControls(this.kpiForm);
            return;
        }
        const payload = this.kpiForm.getRawValue();
        const normalizedPayload = {
            ...payload,
            metricType: payload.metricType,
            direction: payload.direction,
            departmentId: payload.departmentId || undefined,
        };
        const currentEdit = this.editingKpi();
        const kpiId = currentEdit?._id || currentEdit?.id;
        const request = currentEdit && kpiId
            ? this.kpisApi.updateKpi(kpiId, normalizedPayload)
            : this.kpisApi.createKpi(normalizedPayload);
        this.loading.set(true);
        request.subscribe({
            next: () => {
                this.loadKpis();
                this.closeKpiDialog();
            },
            complete: () => this.loading.set(false),
        });
    }
    submitRecord() {
        if (this.recordForm.invalid) {
            touchAllControls(this.recordForm);
            return;
        }
        this.kpisApi.createPerformanceRecord(this.recordForm.getRawValue()).subscribe(() => {
            this.recordForm.reset({
                userId: this.recordForm.getRawValue().userId,
                kpiId: this.recordForm.getRawValue().kpiId,
                beforeValue: 0,
                afterValue: 0,
                notes: 'قياس من لوحة الإدارة',
            });
            this.closeRecordDialog();
        });
    }
    rows() {
        return this.kpis().map((kpi) => ({
            kpiId: kpi._id || kpi.id || '',
            name: kpi.name,
            metricTypeLabel: this.metricTypeLabel(kpi.metricType),
            target: `${kpi.targetValue} ${kpi.unit}`,
            department: typeof kpi.departmentId === 'string' ? kpi.departmentId : kpi.departmentId?.name || 'عام',
        }));
    }
    confirmDelete() {
        const kpi = this.deletingKpi();
        const kpiId = kpi?._id || kpi?.id;
        if (!kpi || !kpiId || this.loading()) {
            return;
        }
        this.loading.set(true);
        this.kpisApi.deleteKpi(kpiId).subscribe({
            next: () => {
                this.closeDeleteDialog();
                this.loadKpis();
            },
            complete: () => this.loading.set(false),
        });
    }
    loadData() {
        this.loadKpis();
        this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
        this.lookupsApi.getUsers().subscribe((response) => this.employees.set(response.filter((user) => user.role === 'employee')));
    }
    loadKpis() {
        this.kpisApi.getKpis().subscribe((response) => this.kpis.set(response));
    }
    metricTypeLabel(value) {
        return {
            number: 'رقم',
            percentage: 'نسبة',
            score: 'درجة',
            boolean: 'نعم/لا',
        }[value] || value;
    }
    static { this.ɵfac = function KpiManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KpiManagementComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KpiManagementComponent, selectors: [["app-kpi-management"]], viewQuery: function KpiManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.kpiDialog, _c0, 5)(ctx.recordDialog, _c1, 5)(ctx.deleteDialog, _c2, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(3);
        } }, decls: 127, vars: 49, consts: [["kpiDialog", ""], ["recordDialog", ""], ["deleteDialog", ""], [1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "target", 3, "size"], [1, "section-subtitle"], [1, "panel-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "btn-content"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["name", "chart-bars", 3, "size"], [1, "section-title"], [3, "actionClicked", "columns", "rows", "actions"], ["icon", "target", 3, "title", "subtitle"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "name"], ["class", "field-error", 4, "ngIf"], ["formControlName", "metricType"], ["value", "number"], ["value", "percentage"], ["value", "score"], ["value", "boolean"], ["formControlName", "direction"], ["value", "increase"], ["value", "decrease"], ["type", "number", "formControlName", "targetValue"], ["formControlName", "unit"], ["formControlName", "departmentId"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["rows", "4", "formControlName", "description"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u062A\u0633\u062C\u064A\u0644 \u0646\u062A\u064A\u062C\u0629 \u0623\u062F\u0627\u0621", "subtitle", "\u062A\u0648\u062B\u064A\u0642 \u0627\u0644\u062A\u062D\u0633\u0646 \u0642\u0628\u0644 \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0648\u0628\u0639\u062F\u0647 \u0644\u0644\u0645\u0648\u0638\u0641 \u0627\u0644\u0645\u062D\u062F\u062F.", "icon", "chart-bars"], ["formControlName", "userId"], ["formControlName", "kpiId"], ["type", "number", "formControlName", "beforeValue"], ["type", "number", "formControlName", "afterValue"], ["type", "submit", 1, "btn", "btn-secondary", 3, "disabled"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0645\u0624\u0634\u0631", "subtitle", "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0624\u0634\u0631 \u0648\u0646\u062A\u0627\u0626\u062C\u0647 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "field-error"], [3, "value"]], template: function KpiManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 3)(1, "article", 4)(2, "div", 5)(3, "div")(4, "h2", 6)(5, "span", 7);
            i0.ɵɵelement(6, "app-icon", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "\u0625\u062F\u0627\u0631\u0629 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p", 9);
            i0.ɵɵtext(10, "\u0641\u062A\u062D \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0641\u064A \u0646\u0627\u0641\u0630\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u0639\u0646\u062F \u062A\u0639\u0631\u064A\u0641 \u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0623\u0648 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0646\u062A\u0627\u0626\u062C.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 10)(12, "button", 11);
            i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_12_listener() { return ctx.openKpiDialog(); });
            i0.ɵɵelementStart(13, "span", 12);
            i0.ɵɵelement(14, "app-icon", 8);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "button", 13);
            i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_17_listener() { return ctx.openRecordDialog(); });
            i0.ɵɵelementStart(18, "span", 12);
            i0.ɵɵelement(19, "app-icon", 14);
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21, "\u062A\u0633\u062C\u064A\u0644 \u0646\u062A\u064A\u062C\u0629");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(22, "article", 4)(23, "h2", 15);
            i0.ɵɵtext(24, "\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "app-data-table", 16);
            i0.ɵɵlistener("actionClicked", function KpiManagementComponent_Template_app_data_table_actionClicked_25_listener($event) { return ctx.handleTableAction($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(26, "app-dialog", 17, 0)(28, "form", 18);
            i0.ɵɵlistener("ngSubmit", function KpiManagementComponent_Template_form_ngSubmit_28_listener() { return ctx.submitKpi(); });
            i0.ɵɵelementStart(29, "div", 19)(30, "div", 20)(31, "label");
            i0.ɵɵtext(32, "\u0627\u0633\u0645 \u0627\u0644\u0645\u0624\u0634\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "input", 21);
            i0.ɵɵtemplate(34, KpiManagementComponent_div_34_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 20)(36, "label");
            i0.ɵɵtext(37, "\u0646\u0648\u0639 \u0627\u0644\u0642\u064A\u0627\u0633");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "select", 23)(39, "option", 24);
            i0.ɵɵtext(40, "\u0631\u0642\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "option", 25);
            i0.ɵɵtext(42, "\u0646\u0633\u0628\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "option", 26);
            i0.ɵɵtext(44, "\u062F\u0631\u062C\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "option", 27);
            i0.ɵɵtext(46, "\u0646\u0639\u0645/\u0644\u0627");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(47, KpiManagementComponent_div_47_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 20)(49, "label");
            i0.ɵɵtext(50, "\u0627\u0644\u0627\u062A\u062C\u0627\u0647");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "select", 28)(52, "option", 29);
            i0.ɵɵtext(53, "\u0632\u064A\u0627\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "option", 30);
            i0.ɵɵtext(55, "\u062E\u0641\u0636");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(56, KpiManagementComponent_div_56_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 20)(58, "label");
            i0.ɵɵtext(59, "\u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(60, "input", 31);
            i0.ɵɵtemplate(61, KpiManagementComponent_div_61_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "div", 20)(63, "label");
            i0.ɵɵtext(64, "\u0627\u0644\u0648\u062D\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(65, "input", 32);
            i0.ɵɵtemplate(66, KpiManagementComponent_div_66_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "div", 20)(68, "label");
            i0.ɵɵtext(69, "\u0627\u0644\u0642\u0633\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(70, "select", 33)(71, "option", 34);
            i0.ɵɵtext(72, "\u0639\u0627\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(73, KpiManagementComponent_option_73_Template, 2, 2, "option", 35);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(74, "div", 20)(75, "label");
            i0.ɵɵtext(76, "\u0627\u0644\u0648\u0635\u0641");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(77, "textarea", 36);
            i0.ɵɵtemplate(78, KpiManagementComponent_div_78_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(79, "div", 37)(80, "button", 38);
            i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_80_listener() { return ctx.closeKpiDialog(); });
            i0.ɵɵtext(81, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "button", 39);
            i0.ɵɵtext(83);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(84, "app-dialog", 40, 1)(86, "form", 18);
            i0.ɵɵlistener("ngSubmit", function KpiManagementComponent_Template_form_ngSubmit_86_listener() { return ctx.submitRecord(); });
            i0.ɵɵelementStart(87, "div", 19)(88, "div", 20)(89, "label");
            i0.ɵɵtext(90, "\u0627\u0644\u0645\u0648\u0638\u0641");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(91, "select", 41);
            i0.ɵɵtemplate(92, KpiManagementComponent_option_92_Template, 2, 2, "option", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(93, KpiManagementComponent_div_93_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "div", 20)(95, "label");
            i0.ɵɵtext(96, "\u0627\u0644\u0645\u0624\u0634\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "select", 42);
            i0.ɵɵtemplate(98, KpiManagementComponent_option_98_Template, 2, 2, "option", 35);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(99, KpiManagementComponent_div_99_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "div", 20)(101, "label");
            i0.ɵɵtext(102, "\u0642\u0628\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(103, "input", 43);
            i0.ɵɵtemplate(104, KpiManagementComponent_div_104_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(105, "div", 20)(106, "label");
            i0.ɵɵtext(107, "\u0628\u0639\u062F");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(108, "input", 44);
            i0.ɵɵtemplate(109, KpiManagementComponent_div_109_Template, 2, 1, "div", 22);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(110, "div", 37)(111, "button", 38);
            i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_111_listener() { return ctx.closeRecordDialog(); });
            i0.ɵɵtext(112, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(113, "button", 45);
            i0.ɵɵtext(114, "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0646\u062A\u064A\u062C\u0629");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(115, "app-dialog", 46, 2)(117, "div", 3)(118, "div", 47);
            i0.ɵɵtext(119, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0624\u0634\u0631 ");
            i0.ɵɵtemplate(120, KpiManagementComponent_strong_120_Template, 2, 1, "strong", 48);
            i0.ɵɵtext(121, " \u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(122, "div", 37)(123, "button", 38);
            i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_123_listener() { return ctx.closeDeleteDialog(); });
            i0.ɵɵtext(124, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(125, "button", 49);
            i0.ɵɵlistener("click", function KpiManagementComponent_Template_button_click_125_listener() { return ctx.confirmDelete(); });
            i0.ɵɵtext(126);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.rows())("actions", ctx.actions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.isEditMode() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u0624\u0634\u0631 \u0623\u062F\u0627\u0621" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0624\u0634\u0631 \u0623\u062F\u0627\u0621")("subtitle", ctx.isEditMode() ? "\u062D\u062F\u0651\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0624\u0634\u0631 \u0627\u0644\u062D\u0627\u0644\u064A \u062B\u0645 \u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A." : "\u062A\u0639\u0631\u064A\u0641 \u0645\u0624\u0634\u0631 \u062C\u062F\u064A\u062F \u0648\u0631\u0628\u0637\u0647 \u0628\u0627\u0644\u0642\u0633\u0645 \u0627\u0644\u0645\u0646\u0627\u0633\u0628.");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.kpiForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.kpiForm.controls.name));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.kpiForm.controls.name));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.kpiForm.controls.metricType));
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.kpiForm.controls.metricType));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.kpiForm.controls.direction));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.kpiForm.controls.direction));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.kpiForm.controls.targetValue));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.kpiForm.controls.targetValue));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.kpiForm.controls.unit));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.kpiForm.controls.unit));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.departments());
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.kpiForm.controls.description));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.kpiForm.controls.description));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.kpiForm.invalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isEditMode() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u062D\u0641\u0638 \u0627\u0644\u0645\u0624\u0634\u0631", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.recordForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.recordForm.controls.userId));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.employees());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.recordForm.controls.userId));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.recordForm.controls.kpiId));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.kpis());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.recordForm.controls.kpiId));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.recordForm.controls.beforeValue));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.recordForm.controls.beforeValue));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.recordForm.controls.afterValue));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.recordForm.controls.afterValue));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.recordForm.invalid);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.deletingKpi());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DataTableComponent, DialogComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] { padding:1.5rem; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KpiManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-kpi-management', standalone: true, imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="target" [size]="20" /></span>
              <span>إدارة مؤشرات الأداء</span>
            </h2>
            <p class="section-subtitle">فتح النماذج في نافذة مستقلة عند تعريف المؤشرات أو تسجيل النتائج.</p>
          </div>
          <div class="panel-actions">
            <button class="btn btn-primary" type="button" (click)="openKpiDialog()">
              <span class="btn-content">
                <app-icon name="target" [size]="18" />
                <span>إضافة مؤشر</span>
              </span>
            </button>
            <button class="btn btn-secondary" type="button" (click)="openRecordDialog()">
              <span class="btn-content">
                <app-icon name="chart-bars" [size]="18" />
                <span>تسجيل نتيجة</span>
              </span>
            </button>
          </div>
        </div>
      </article>

      <article class="card panel">
        <h2 class="section-title">المؤشرات الحالية</h2>
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #kpiDialog
        [title]="isEditMode() ? 'تعديل مؤشر أداء' : 'إضافة مؤشر أداء'"
        [subtitle]="
          isEditMode()
            ? 'حدّث بيانات المؤشر الحالي ثم احفظ التغييرات.'
            : 'تعريف مؤشر جديد وربطه بالقسم المناسب.'
        "
        icon="target"
      >
        <form class="dialog-form" [formGroup]="kpiForm" (ngSubmit)="submitKpi()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>اسم المؤشر</label>
              <input formControlName="name" [class.is-invalid]="hasVisibleError(kpiForm.controls.name)" />
              <div class="field-error" *ngIf="hasVisibleError(kpiForm.controls.name)">
                {{ getVisibleErrorMessage(kpiForm.controls.name, kpiValidationMessages.name) }}
              </div>
            </div>
            <div class="field">
              <label>نوع القياس</label>
              <select formControlName="metricType" [class.is-invalid]="hasVisibleError(kpiForm.controls.metricType)">
                <option value="number">رقم</option>
                <option value="percentage">نسبة</option>
                <option value="score">درجة</option>
                <option value="boolean">نعم/لا</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(kpiForm.controls.metricType)">
                {{ getVisibleErrorMessage(kpiForm.controls.metricType, kpiValidationMessages.metricType) }}
              </div>
            </div>
            <div class="field">
              <label>الاتجاه</label>
              <select formControlName="direction" [class.is-invalid]="hasVisibleError(kpiForm.controls.direction)">
                <option value="increase">زيادة</option>
                <option value="decrease">خفض</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(kpiForm.controls.direction)">
                {{ getVisibleErrorMessage(kpiForm.controls.direction, kpiValidationMessages.direction) }}
              </div>
            </div>
            <div class="field">
              <label>القيمة المستهدفة</label>
              <input
                type="number"
                formControlName="targetValue"
                [class.is-invalid]="hasVisibleError(kpiForm.controls.targetValue)"
              />
              <div class="field-error" *ngIf="hasVisibleError(kpiForm.controls.targetValue)">
                {{ getVisibleErrorMessage(kpiForm.controls.targetValue, kpiValidationMessages.targetValue) }}
              </div>
            </div>
            <div class="field">
              <label>الوحدة</label>
              <input formControlName="unit" [class.is-invalid]="hasVisibleError(kpiForm.controls.unit)" />
              <div class="field-error" *ngIf="hasVisibleError(kpiForm.controls.unit)">
                {{ getVisibleErrorMessage(kpiForm.controls.unit, kpiValidationMessages.unit) }}
              </div>
            </div>
            <div class="field">
              <label>القسم</label>
              <select formControlName="departmentId">
                <option value="">عام</option>
                <option *ngFor="let department of departments()" [value]="department._id">{{ department.name }}</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label>الوصف</label>
            <textarea
              rows="4"
              formControlName="description"
              [class.is-invalid]="hasVisibleError(kpiForm.controls.description)"
            ></textarea>
            <div class="field-error" *ngIf="hasVisibleError(kpiForm.controls.description)">
              {{ getVisibleErrorMessage(kpiForm.controls.description, kpiValidationMessages.description) }}
            </div>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeKpiDialog()">إلغاء</button>
            <button class="btn btn-primary" type="submit" [disabled]="kpiForm.invalid">
              {{ isEditMode() ? 'حفظ التعديلات' : 'حفظ المؤشر' }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #recordDialog
        title="تسجيل نتيجة أداء"
        subtitle="توثيق التحسن قبل التدريب وبعده للموظف المحدد."
        icon="chart-bars"
      >
        <form class="dialog-form" [formGroup]="recordForm" (ngSubmit)="submitRecord()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>الموظف</label>
              <select formControlName="userId" [class.is-invalid]="hasVisibleError(recordForm.controls.userId)">
                <option *ngFor="let user of employees()" [value]="user._id || user.id">{{ user.fullName }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(recordForm.controls.userId)">
                {{ getVisibleErrorMessage(recordForm.controls.userId, recordValidationMessages.userId) }}
              </div>
            </div>
            <div class="field">
              <label>المؤشر</label>
              <select formControlName="kpiId" [class.is-invalid]="hasVisibleError(recordForm.controls.kpiId)">
                <option *ngFor="let kpi of kpis()" [value]="kpi._id || kpi.id">{{ kpi.name }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(recordForm.controls.kpiId)">
                {{ getVisibleErrorMessage(recordForm.controls.kpiId, recordValidationMessages.kpiId) }}
              </div>
            </div>
            <div class="field">
              <label>قبل</label>
              <input
                type="number"
                formControlName="beforeValue"
                [class.is-invalid]="hasVisibleError(recordForm.controls.beforeValue)"
              />
              <div class="field-error" *ngIf="hasVisibleError(recordForm.controls.beforeValue)">
                {{ getVisibleErrorMessage(recordForm.controls.beforeValue, recordValidationMessages.beforeValue) }}
              </div>
            </div>
            <div class="field">
              <label>بعد</label>
              <input
                type="number"
                formControlName="afterValue"
                [class.is-invalid]="hasVisibleError(recordForm.controls.afterValue)"
              />
              <div class="field-error" *ngIf="hasVisibleError(recordForm.controls.afterValue)">
                {{ getVisibleErrorMessage(recordForm.controls.afterValue, recordValidationMessages.afterValue) }}
              </div>
            </div>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeRecordDialog()">إلغاء</button>
            <button class="btn btn-secondary" type="submit" [disabled]="recordForm.invalid">تسجيل النتيجة</button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #deleteDialog
        title="تأكيد حذف المؤشر"
        subtitle="سيتم حذف المؤشر ونتائجه المرتبطة نهائياً بعد التأكيد."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف المؤشر
            <strong *ngIf="deletingKpi() as kpi">{{ kpi.name }}</strong>
            ؟ لا يمكن التراجع عن هذا الإجراء.
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeDeleteDialog()">إلغاء</button>
            <button class="btn btn-danger" type="button" (click)="confirmDelete()" [disabled]="loading()">
              {{ loading() ? 'جارٍ الحذف...' : 'تأكيد الحذف' }}
            </button>
          </div>
        </div>
      </app-dialog>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".panel { padding:1.5rem; }"] }]
    }], null, { kpiDialog: [{ type: i0.ViewChild, args: ['kpiDialog', { isSignal: true }] }], recordDialog: [{ type: i0.ViewChild, args: ['recordDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KpiManagementComponent, { className: "KpiManagementComponent", filePath: "src/app/features/admin/pages/kpi-management.component.ts", lineNumber: 224 }); })();
//# sourceMappingURL=kpi-management.component.js.map