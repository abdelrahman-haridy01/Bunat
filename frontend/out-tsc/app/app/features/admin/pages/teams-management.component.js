import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { TeamsApiService } from '../../../core/services/teams-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["teamDialog"];
const _c1 = ["deleteDialog"];
function TeamsManagementComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.name, ctx_r0.validationMessages.name), " ");
} }
function TeamsManagementComponent_option_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r2._id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(department_r2.name);
} }
function TeamsManagementComponent_div_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.departmentId, ctx_r0.validationMessages.departmentId), " ");
} }
function TeamsManagementComponent_option_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 37);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const manager_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", manager_r3._id || manager_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", manager_r3.fullName, " ");
} }
function TeamsManagementComponent_div_54_label_1_small_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const employee_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0641\u0631\u064A\u0642 \u0627\u0644\u062D\u0627\u0644\u064A: ", ctx_r0.teamName(employee_r5.teamId));
} }
function TeamsManagementComponent_div_54_label_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 40)(1, "input", 41);
    i0.ɵɵlistener("change", function TeamsManagementComponent_div_54_label_1_Template_input_change_1_listener($event) { const employee_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.toggleMember(ctx_r0.extractId(employee_r5), $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span", 42)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, TeamsManagementComponent_div_54_label_1_small_7_Template, 2, 1, "small", 34);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const employee_r5 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r0.isSelectedMember(ctx_r0.extractId(employee_r5)));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(employee_r5.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(employee_r5.jobTitle);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r0.teamName(employee_r5.teamId));
} }
function TeamsManagementComponent_div_54_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵtemplate(1, TeamsManagementComponent_div_54_label_1_Template, 8, 4, "label", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.availableEmployees());
} }
function TeamsManagementComponent_ng_template_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43);
    i0.ɵɵtext(1, "\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0648\u0638\u0641\u0648\u0646 \u0645\u062A\u0627\u062D\u0648\u0646 \u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u062D\u0627\u0644\u064A\u0627\u064B.");
    i0.ɵɵelementEnd();
} }
function TeamsManagementComponent_strong_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const team_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(team_r6.name);
} }
export class TeamsManagementComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.teamsApi = inject(TeamsApiService);
        this.lookupsApi = inject(LookupsApiService);
        this.teamDialog = viewChild.required('teamDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.teams = signal([], ...(ngDevMode ? [{ debugName: "teams" }] : /* istanbul ignore next */ []));
        this.users = signal([], ...(ngDevMode ? [{ debugName: "users" }] : /* istanbul ignore next */ []));
        this.departments = signal([], ...(ngDevMode ? [{ debugName: "departments" }] : /* istanbul ignore next */ []));
        this.loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.editingTeam = signal(null, ...(ngDevMode ? [{ debugName: "editingTeam" }] : /* istanbul ignore next */ []));
        this.deletingTeam = signal(null, ...(ngDevMode ? [{ debugName: "deletingTeam" }] : /* istanbul ignore next */ []));
        this.isEditMode = computed(() => !!this.editingTeam(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.validationMessages = {
            name: { required: 'أدخل اسم الفريق.' },
            departmentId: { required: 'اختر القسم.' },
        };
        this.columns = [
            { key: 'name', label: 'الفريق' },
            { key: 'department', label: 'القسم' },
            { key: 'manager', label: 'المدير' },
            { key: 'membersCount', label: 'عدد الأعضاء' },
            { key: 'membersPreview', label: 'الأعضاء' },
        ];
        this.actions = [
            { key: 'edit', label: 'تعديل', icon: 'team', tone: 'ghost' },
            { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' },
        ];
        this.form = this.fb.nonNullable.group({
            name: ['', Validators.required],
            departmentId: ['', Validators.required],
            managerId: [''],
            members: this.fb.nonNullable.control([]),
        });
    }
    ngOnInit() {
        this.loadData();
    }
    openCreateDialog() {
        this.editingTeam.set(null);
        this.form.reset({
            name: '',
            departmentId: '',
            managerId: '',
            members: [],
        });
        clearControlState(this.form);
        this.teamDialog().open();
    }
    openEditDialog(team) {
        this.editingTeam.set(team);
        this.form.reset({
            name: team.name,
            departmentId: this.extractLookupId(team.departmentId),
            managerId: this.extractLookupId(team.managerId),
            members: (team.members ?? []).map((member) => this.extractLookupId(member)).filter(Boolean),
        });
        clearControlState(this.form);
        this.teamDialog().open();
    }
    closeTeamDialog() {
        this.teamDialog().close();
    }
    openDeleteDialog(team) {
        this.deletingTeam.set(team);
        this.deleteDialog().open();
    }
    closeDeleteDialog() {
        this.deletingTeam.set(null);
        this.deleteDialog().close();
    }
    handleTableAction(event) {
        const teamId = String(event.row['teamId'] || '');
        const team = this.teams().find((item) => this.extractId(item) === teamId);
        if (!team) {
            return;
        }
        if (event.key === 'edit') {
            this.openEditDialog(team);
            return;
        }
        if (event.key === 'delete') {
            this.openDeleteDialog(team);
        }
    }
    submit() {
        if (this.form.invalid || this.loading()) {
            touchAllControls(this.form);
            return;
        }
        this.loading.set(true);
        const payload = this.form.getRawValue();
        const requestPayload = {
            name: payload.name,
            departmentId: payload.departmentId,
            managerId: payload.managerId || undefined,
            members: payload.members,
        };
        const editingTeam = this.editingTeam();
        const request$ = editingTeam
            ? this.teamsApi.updateTeam(this.extractId(editingTeam), requestPayload)
            : this.teamsApi.createTeam(requestPayload);
        request$.subscribe({
            next: () => {
                this.closeTeamDialog();
                this.loadData();
            },
            complete: () => this.loading.set(false),
        });
    }
    confirmDelete() {
        const team = this.deletingTeam();
        const teamId = team ? this.extractId(team) : '';
        if (!teamId || this.loading()) {
            return;
        }
        this.loading.set(true);
        this.teamsApi.deleteTeam(teamId).subscribe({
            next: () => {
                this.closeDeleteDialog();
                this.loadData();
            },
            complete: () => this.loading.set(false),
        });
    }
    rows() {
        return this.teams().map((team) => {
            const memberNames = (team.members ?? [])
                .map((member) => this.userName(member))
                .filter(Boolean);
            return {
                teamId: this.extractId(team),
                name: team.name,
                department: this.lookupName(team.departmentId),
                manager: this.userName(team.managerId) || '-',
                membersCount: memberNames.length,
                membersPreview: memberNames.length ? memberNames.slice(0, 3).join('، ') : '-',
            };
        });
    }
    availableManagers() {
        const selectedDepartmentId = this.form.controls.departmentId.value;
        return this.users()
            .filter((user) => user.role === 'manager')
            .filter((user) => !selectedDepartmentId || this.extractLookupId(user.departmentId) === selectedDepartmentId);
    }
    availableEmployees() {
        return this.users().filter((user) => user.role === 'employee');
    }
    toggleMember(memberId, checked) {
        const currentMembers = this.form.controls.members.value;
        const nextMembers = checked
            ? Array.from(new Set([...currentMembers, memberId]))
            : currentMembers.filter((id) => id !== memberId);
        this.form.controls.members.setValue(nextMembers);
        this.form.controls.members.markAsDirty();
    }
    isSelectedMember(memberId) {
        return this.form.controls.members.value.includes(memberId);
    }
    teamName(teamValue) {
        if (!teamValue) {
            return '';
        }
        if (typeof teamValue === 'string') {
            return this.teams().find((team) => this.extractId(team) === teamValue)?.name || '';
        }
        return teamValue.name || '';
    }
    extractId(value) {
        return value?._id || value?.id || '';
    }
    extractLookupId(value) {
        if (!value) {
            return '';
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'object') {
            const record = value;
            return String(record['_id'] ?? record['id'] ?? '');
        }
        return String(value);
    }
    lookupName(value) {
        if (!value) {
            return '-';
        }
        if (typeof value === 'string') {
            return this.departments().find((department) => department._id === value)?.name || value;
        }
        return value.name || '-';
    }
    userName(value) {
        if (!value) {
            return '';
        }
        if (typeof value === 'string') {
            return this.users().find((user) => this.extractId(user) === value)?.fullName || value;
        }
        return value.fullName || '';
    }
    loadData() {
        this.teamsApi.getTeams().subscribe((response) => this.teams.set(response));
        this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
        this.lookupsApi.getUsers().subscribe((response) => this.users.set(response));
    }
    static { this.ɵfac = function TeamsManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeamsManagementComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TeamsManagementComponent, selectors: [["app-teams-management"]], viewQuery: function TeamsManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.teamDialog, _c0, 5)(ctx.deleteDialog, _c1, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(2);
        } }, decls: 74, vars: 24, consts: [["teamDialog", ""], ["noEmployees", ""], ["deleteDialog", ""], [1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "team", 3, "size"], [1, "section-subtitle"], [1, "panel-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "btn-content"], [1, "section-title"], [3, "actionClicked", "columns", "rows", "actions"], ["icon", "team", 3, "title", "subtitle"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "name"], ["class", "field-error", 4, "ngIf"], ["formControlName", "departmentId"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "managerId"], [1, "member-section"], [1, "member-section__header"], [1, "member-count"], ["class", "member-grid", 4, "ngIf", "ngIfElse"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0641\u0631\u064A\u0642", "subtitle", "\u0633\u064A\u062A\u0645 \u0641\u0643 \u0627\u0631\u062A\u0628\u0627\u0637 \u0627\u0644\u0623\u0639\u0636\u0627\u0621 \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0641\u0631\u064A\u0642 \u0642\u0628\u0644 \u0627\u0644\u062D\u0630\u0641.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "field-error"], [3, "value"], [1, "member-grid"], ["class", "member-option", 4, "ngFor", "ngForOf"], [1, "member-option"], ["type", "checkbox", 3, "change", "checked"], [1, "member-option__copy"], [1, "message-box"]], template: function TeamsManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 3)(1, "article", 4)(2, "div", 5)(3, "div")(4, "h2", 6)(5, "span", 7);
            i0.ɵɵelement(6, "app-icon", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0641\u0631\u0642 \u0648\u0627\u0644\u0623\u0639\u0636\u0627\u0621");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p", 9);
            i0.ɵɵtext(10, "\u0623\u0646\u0634\u0626 \u0627\u0644\u0641\u0631\u0642\u060C \u062D\u062F\u0651\u062F \u0627\u0644\u0645\u062F\u064A\u0631\u060C \u0648\u0648\u0632\u0651\u0639 \u0627\u0644\u0623\u0639\u0636\u0627\u0621 \u0645\u0646 \u0645\u0643\u0627\u0646 \u0648\u0627\u062D\u062F.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 10)(12, "button", 11);
            i0.ɵɵlistener("click", function TeamsManagementComponent_Template_button_click_12_listener() { return ctx.openCreateDialog(); });
            i0.ɵɵelementStart(13, "span", 12);
            i0.ɵɵelement(14, "app-icon", 8);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "\u0625\u0636\u0627\u0641\u0629 \u0641\u0631\u064A\u0642");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(17, "article", 4)(18, "h2", 13);
            i0.ɵɵtext(19, "\u0627\u0644\u0641\u0631\u0642 \u0627\u0644\u062D\u0627\u0644\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "app-data-table", 14);
            i0.ɵɵlistener("actionClicked", function TeamsManagementComponent_Template_app_data_table_actionClicked_20_listener($event) { return ctx.handleTableAction($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "app-dialog", 15, 0)(23, "form", 16);
            i0.ɵɵlistener("ngSubmit", function TeamsManagementComponent_Template_form_ngSubmit_23_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(24, "div", 17)(25, "div", 18)(26, "label");
            i0.ɵɵtext(27, "\u0627\u0633\u0645 \u0627\u0644\u0641\u0631\u064A\u0642");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "input", 19);
            i0.ɵɵtemplate(29, TeamsManagementComponent_div_29_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 18)(31, "label");
            i0.ɵɵtext(32, "\u0627\u0644\u0642\u0633\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "select", 21)(34, "option", 22);
            i0.ɵɵtext(35, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0642\u0633\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, TeamsManagementComponent_option_36_Template, 2, 2, "option", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(37, TeamsManagementComponent_div_37_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 18)(39, "label");
            i0.ɵɵtext(40, "\u0645\u062F\u064A\u0631 \u0627\u0644\u0641\u0631\u064A\u0642");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "select", 24)(42, "option", 22);
            i0.ɵɵtext(43, "\u0628\u062F\u0648\u0646 \u0645\u062F\u064A\u0631 \u0645\u062D\u062F\u062F");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(44, TeamsManagementComponent_option_44_Template, 2, 2, "option", 23);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(45, "div", 25)(46, "div", 26)(47, "div")(48, "h3", 13);
            i0.ɵɵtext(49, "\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "p", 9);
            i0.ɵɵtext(51, "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641\u064A\u0646 \u0627\u0644\u0630\u064A\u0646 \u064A\u062C\u0628 \u0631\u0628\u0637\u0647\u0645 \u0628\u0647\u0630\u0627 \u0627\u0644\u0641\u0631\u064A\u0642.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "span", 27);
            i0.ɵɵtext(53);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(54, TeamsManagementComponent_div_54_Template, 2, 1, "div", 28)(55, TeamsManagementComponent_ng_template_55_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "div", 29)(58, "button", 30);
            i0.ɵɵlistener("click", function TeamsManagementComponent_Template_button_click_58_listener() { return ctx.closeTeamDialog(); });
            i0.ɵɵtext(59, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(60, "button", 31);
            i0.ɵɵtext(61);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(62, "app-dialog", 32, 2)(64, "div", 3)(65, "div", 33);
            i0.ɵɵtext(66, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0641\u0631\u064A\u0642 ");
            i0.ɵɵtemplate(67, TeamsManagementComponent_strong_67_Template, 2, 1, "strong", 34);
            i0.ɵɵtext(68, " \u061F ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(69, "div", 29)(70, "button", 30);
            i0.ɵɵlistener("click", function TeamsManagementComponent_Template_button_click_70_listener() { return ctx.closeDeleteDialog(); });
            i0.ɵɵtext(71, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(72, "button", 35);
            i0.ɵɵlistener("click", function TeamsManagementComponent_Template_button_click_72_listener() { return ctx.confirmDelete(); });
            i0.ɵɵtext(73);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const noEmployees_r7 = i0.ɵɵreference(56);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.rows())("actions", ctx.actions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.isEditMode() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0641\u0631\u064A\u0642" : "\u0625\u0636\u0627\u0641\u0629 \u0641\u0631\u064A\u0642")("subtitle", ctx.isEditMode() ? "\u062D\u062F\u0651\u062B \u0627\u0644\u0645\u062F\u064A\u0631 \u0623\u0648 \u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u0641\u0631\u064A\u0642 \u0645\u0639 \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0639\u0636\u0648\u064A\u0627\u062A \u0645\u0628\u0627\u0634\u0631\u0629." : "\u0623\u0646\u0634\u0626 \u0641\u0631\u064A\u0642\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0648\u062D\u062F\u062F \u0627\u0644\u0623\u0639\u0636\u0627\u0621 \u0627\u0644\u062A\u0627\u0628\u0639\u064A\u0646 \u0644\u0647.");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.name));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.name));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.departmentId));
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", ctx.departments());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.departmentId));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.availableManagers());
            i0.ɵɵadvance(9);
            i0.ɵɵtextInterpolate1("", ctx.form.controls.members.value.length, " \u0639\u0636\u0648");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.availableEmployees().length)("ngIfElse", noEmployees_r7);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : ctx.isEditMode() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0641\u0631\u064A\u0642", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.deletingTeam());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DataTableComponent, DialogComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .member-section[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .member-section__header[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .member-count[_ngcontent-%COMP%] {\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n        font-weight: 600;\n      }\n\n      .member-grid[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.85rem;\n        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n      }\n\n      .member-option[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.8rem;\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n      }\n\n      .member-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        margin-top: 0.2rem;\n      }\n\n      .member-option__copy[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.2rem;\n      }\n\n      .member-option__copy[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        color: var(--color-display);\n      }\n\n      .member-option__copy[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .member-option__copy[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .message-box[_ngcontent-%COMP%] {\n        padding: 1rem 1.1rem;\n        border-radius: 1rem;\n        background: var(--color-neutral-50);\n        color: var(--color-secondary-paragraph);\n      }\n\n      .message-box.error[_ngcontent-%COMP%] {\n        background: var(--color-error-light);\n        color: var(--color-error-default);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamsManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-teams-management', standalone: true, imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="team" [size]="20" /></span>
              <span>إدارة الفرق والأعضاء</span>
            </h2>
            <p class="section-subtitle">أنشئ الفرق، حدّد المدير، ووزّع الأعضاء من مكان واحد.</p>
          </div>
          <div class="panel-actions">
            <button class="btn btn-primary" type="button" (click)="openCreateDialog()">
              <span class="btn-content">
                <app-icon name="team" [size]="18" />
                <span>إضافة فريق</span>
              </span>
            </button>
          </div>
        </div>
      </article>

      <article class="card panel">
        <h2 class="section-title">الفرق الحالية</h2>
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #teamDialog
        [title]="isEditMode() ? 'تعديل الفريق' : 'إضافة فريق'"
        [subtitle]="
          isEditMode()
            ? 'حدّث المدير أو أعضاء الفريق مع مزامنة العضويات مباشرة.'
            : 'أنشئ فريقاً جديداً وحدد الأعضاء التابعين له.'
        "
        icon="team"
      >
        <form class="dialog-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>اسم الفريق</label>
              <input formControlName="name" [class.is-invalid]="hasVisibleError(form.controls.name)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.name)">
                {{ getVisibleErrorMessage(form.controls.name, validationMessages.name) }}
              </div>
            </div>

            <div class="field">
              <label>القسم</label>
              <select formControlName="departmentId" [class.is-invalid]="hasVisibleError(form.controls.departmentId)">
                <option value="">اختر القسم</option>
                <option *ngFor="let department of departments()" [value]="department._id">{{ department.name }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(form.controls.departmentId)">
                {{ getVisibleErrorMessage(form.controls.departmentId, validationMessages.departmentId) }}
              </div>
            </div>

            <div class="field">
              <label>مدير الفريق</label>
              <select formControlName="managerId">
                <option value="">بدون مدير محدد</option>
                <option *ngFor="let manager of availableManagers()" [value]="manager._id || manager.id">
                  {{ manager.fullName }}
                </option>
              </select>
            </div>
          </div>

          <div class="member-section">
            <div class="member-section__header">
              <div>
                <h3 class="section-title">أعضاء الفريق</h3>
                <p class="section-subtitle">اختر الموظفين الذين يجب ربطهم بهذا الفريق.</p>
              </div>
              <span class="member-count">{{ form.controls.members.value.length }} عضو</span>
            </div>

            <div class="member-grid" *ngIf="availableEmployees().length; else noEmployees">
              <label class="member-option" *ngFor="let employee of availableEmployees()">
                <input
                  type="checkbox"
                  [checked]="isSelectedMember(extractId(employee))"
                  (change)="toggleMember(extractId(employee), $any($event.target).checked)"
                />
                <span class="member-option__copy">
                  <strong>{{ employee.fullName }}</strong>
                  <span>{{ employee.jobTitle }}</span>
                  <small *ngIf="teamName(employee.teamId)">الفريق الحالي: {{ teamName(employee.teamId) }}</small>
                </span>
              </label>
            </div>

            <ng-template #noEmployees>
              <div class="message-box">لا يوجد موظفون متاحون للاختيار حالياً.</div>
            </ng-template>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeTeamDialog()">إلغاء</button>
            <button class="btn btn-primary" type="submit" [disabled]="loading()">
              {{ loading() ? 'جارٍ الحفظ...' : (isEditMode() ? 'حفظ التعديلات' : 'إضافة الفريق') }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #deleteDialog
        title="تأكيد حذف الفريق"
        subtitle="سيتم فك ارتباط الأعضاء من هذا الفريق قبل الحذف."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف الفريق
            <strong *ngIf="deletingTeam() as team">{{ team.name }}</strong>
            ؟
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .member-section {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .member-section__header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .member-count {\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n        font-weight: 600;\n      }\n\n      .member-grid {\n        display: grid;\n        gap: 0.85rem;\n        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n      }\n\n      .member-option {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.8rem;\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n      }\n\n      .member-option input {\n        margin-top: 0.2rem;\n      }\n\n      .member-option__copy {\n        display: grid;\n        gap: 0.2rem;\n      }\n\n      .member-option__copy strong {\n        color: var(--color-display);\n      }\n\n      .member-option__copy span,\n      .member-option__copy small {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .message-box {\n        padding: 1rem 1.1rem;\n        border-radius: 1rem;\n        background: var(--color-neutral-50);\n        color: var(--color-secondary-paragraph);\n      }\n\n      .message-box.error {\n        background: var(--color-error-light);\n        color: var(--color-error-default);\n      }\n    "] }]
    }], null, { teamDialog: [{ type: i0.ViewChild, args: ['teamDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TeamsManagementComponent, { className: "TeamsManagementComponent", filePath: "src/app/features/admin/pages/teams-management.component.ts", lineNumber: 225 }); })();
//# sourceMappingURL=teams-management.component.js.map