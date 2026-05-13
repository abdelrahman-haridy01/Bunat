import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["createDialog"];
const _c1 = ["deleteDialog"];
function UsersManagementComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.fullName, ctx_r0.validationMessages.fullName), " ");
} }
function UsersManagementComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.email, ctx_r0.validationMessages.email), " ");
} }
function UsersManagementComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.password, ctx_r0.validationMessages.password), " ");
} }
function UsersManagementComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtext(1, "\u0627\u062A\u0631\u0643 \u0627\u0644\u062D\u0642\u0644 \u0641\u0627\u0631\u063A\u0627\u064B \u0625\u0630\u0627 \u0644\u0645 \u062A\u0631\u063A\u0628 \u0641\u064A \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631.");
    i0.ɵɵelementEnd();
} }
function UsersManagementComponent_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.jobTitle, ctx_r0.validationMessages.jobTitle), " ");
} }
function UsersManagementComponent_div_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.role, ctx_r0.validationMessages.role), " ");
} }
function UsersManagementComponent_option_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 45);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const department_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", department_r2._id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(department_r2.name);
} }
function UsersManagementComponent_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 44);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.form.controls.status, ctx_r0.validationMessages.status), " ");
} }
function UsersManagementComponent_strong_87_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r3 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r3.fullName);
} }
export class UsersManagementComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.usersApi = inject(UsersApiService);
        this.lookupsApi = inject(LookupsApiService);
        this.authService = inject(AuthService);
        this.router = inject(Router);
        this.createDialog = viewChild.required('createDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.users = signal([], ...(ngDevMode ? [{ debugName: "users" }] : /* istanbul ignore next */ []));
        this.departments = signal([], ...(ngDevMode ? [{ debugName: "departments" }] : /* istanbul ignore next */ []));
        this.loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.editingUser = signal(null, ...(ngDevMode ? [{ debugName: "editingUser" }] : /* istanbul ignore next */ []));
        this.deletingUser = signal(null, ...(ngDevMode ? [{ debugName: "deletingUser" }] : /* istanbul ignore next */ []));
        this.isEditMode = computed(() => !!this.editingUser(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.validationMessages = {
            fullName: {
                required: 'أدخل الاسم الكامل.',
            },
            email: {
                required: 'أدخل البريد الإلكتروني.',
                email: 'أدخل بريداً إلكترونياً صحيحاً.',
            },
            password: {
                required: 'أدخل كلمة المرور.',
                minlength: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.',
            },
            jobTitle: {
                required: 'أدخل المسمى الوظيفي.',
            },
            role: {
                required: 'اختر الدور.',
            },
            status: {
                required: 'اختر الحالة.',
            },
        };
        this.columns = [
            { key: 'fullName', label: 'الاسم' },
            { key: 'jobTitle', label: 'المسمى' },
            { key: 'roleLabel', label: 'الدور' },
            { key: 'department', label: 'القسم' },
            { key: 'statusLabel', label: 'الحالة' },
        ];
        this.actions = [
            { key: 'report', label: 'التقرير', icon: 'eye', tone: 'ghost' },
            { key: 'edit', label: 'تعديل', icon: 'user', tone: 'ghost' },
            { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' },
        ];
        this.form = this.fb.nonNullable.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            jobTitle: ['', Validators.required],
            role: ['employee', Validators.required],
            departmentId: [''],
            status: ['active', Validators.required],
        });
    }
    ngOnInit() {
        this.loadData();
    }
    openCreateDialog() {
        this.editingUser.set(null);
        this.setCreatePasswordValidators();
        this.form.reset({
            fullName: '',
            email: '',
            password: '',
            jobTitle: '',
            role: 'employee',
            departmentId: '',
            status: 'active',
        });
        clearControlState(this.form);
        this.createDialog().open();
    }
    closeCreateDialog() {
        this.createDialog().close();
    }
    closeDeleteDialog() {
        this.deletingUser.set(null);
        this.deleteDialog().close();
    }
    handleTableAction(event) {
        if (typeof event.row['userId'] !== 'string') {
            return;
        }
        const user = this.users().find((item) => (item._id || item.id) === event.row['userId']);
        if (!user) {
            return;
        }
        if (event.key === 'report') {
            this.router.navigate(['/admin/employees', event.row['userId'], 'report']);
            return;
        }
        if (event.key === 'edit') {
            this.openEditDialog(user);
            return;
        }
        if (event.key === 'delete') {
            this.openDeleteDialog(user);
        }
    }
    openEditDialog(user) {
        this.editingUser.set(user);
        this.setEditPasswordValidators();
        this.form.reset({
            fullName: user.fullName,
            email: user.email,
            password: '',
            jobTitle: user.jobTitle,
            role: user.role,
            departmentId: typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?._id || '',
            status: user.status || 'active',
        });
        clearControlState(this.form);
        this.createDialog().open();
    }
    openDeleteDialog(user) {
        this.deletingUser.set(user);
        this.deleteDialog().open();
    }
    submit() {
        if (this.form.invalid || this.loading()) {
            touchAllControls(this.form);
            return;
        }
        this.loading.set(true);
        const payload = this.form.getRawValue();
        const currentEdit = this.editingUser();
        if (currentEdit) {
            const userId = currentEdit._id || currentEdit.id;
            if (!userId) {
                this.loading.set(false);
                return;
            }
            const updatePayload = {
                fullName: payload.fullName,
                email: payload.email,
                jobTitle: payload.jobTitle,
                role: payload.role,
                departmentId: payload.departmentId || undefined,
                status: payload.status,
            };
            if (payload.password) {
                updatePayload.password = payload.password;
            }
            this.usersApi.updateUser(userId, updatePayload).subscribe({
                next: (updatedUser) => {
                    if ((this.authService.currentUser()?._id || this.authService.currentUser()?.id) === userId) {
                        this.authService.updateUser(updatedUser);
                    }
                    this.closeCreateDialog();
                    this.loadUsers();
                },
                complete: () => this.loading.set(false),
            });
            return;
        }
        this.usersApi
            .createUser({
            ...payload,
            role: payload.role,
            departmentId: payload.departmentId || undefined,
            status: payload.status,
        })
            .subscribe({
            next: () => {
                this.form.reset({
                    fullName: '',
                    email: '',
                    password: '',
                    jobTitle: '',
                    role: 'employee',
                    departmentId: '',
                    status: 'active',
                });
                this.closeCreateDialog();
                this.loadUsers();
            },
            complete: () => this.loading.set(false),
        });
    }
    confirmDelete() {
        const user = this.deletingUser();
        const userId = user?._id || user?.id;
        if (!user || !userId || this.loading()) {
            return;
        }
        this.loading.set(true);
        this.usersApi.deleteUser(userId).subscribe({
            next: () => {
                this.closeDeleteDialog();
                this.loadUsers();
                if ((this.authService.currentUser()?._id || this.authService.currentUser()?.id) === userId) {
                    this.authService.logout();
                }
            },
            complete: () => this.loading.set(false),
        });
    }
    rows() {
        return this.users().map((user) => ({
            userId: user._id || user.id || '',
            fullName: user.fullName,
            jobTitle: user.jobTitle,
            roleLabel: this.roleLabel(user.role),
            department: typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?.name || '-',
            statusLabel: this.statusLabel(user.status),
        }));
    }
    loadData() {
        this.loadUsers();
        this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
    }
    loadUsers() {
        this.usersApi.getUsers().subscribe((response) => this.users.set(response));
    }
    setCreatePasswordValidators() {
        this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
        this.form.controls.password.updateValueAndValidity({ emitEvent: false });
    }
    setEditPasswordValidators() {
        this.form.controls.password.setValidators([Validators.minLength(6)]);
        this.form.controls.password.updateValueAndValidity({ emitEvent: false });
    }
    roleLabel(role) {
        return {
            employee: 'موظف',
            manager: 'مدير',
            admin: 'مدير نظام',
            hr: 'موارد بشرية',
            course_manager: 'مدير محتوى',
        }[role] || role;
    }
    statusLabel(status) {
        return { active: 'نشط', inactive: 'غير نشط' }[status || 'active'] || status || 'نشط';
    }
    static { this.ɵfac = function UsersManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersManagementComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UsersManagementComponent, selectors: [["app-users-management"]], viewQuery: function UsersManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.createDialog, _c0, 5)(ctx.deleteDialog, _c1, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(2);
        } }, decls: 94, vars: 34, consts: [["createDialog", ""], ["deleteDialog", ""], [1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "users", 3, "size"], [1, "section-subtitle"], [1, "panel-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "btn-content"], ["name", "user-plus", 3, "size"], [1, "section-title"], [3, "actionClicked", "columns", "rows", "actions"], [3, "title", "subtitle", "icon"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "fullName"], ["class", "field-error", 4, "ngIf"], ["formControlName", "email"], ["type", "password", "formControlName", "password"], ["class", "section-subtitle", 4, "ngIf"], ["formControlName", "jobTitle"], ["formControlName", "role"], ["value", "employee"], ["value", "manager"], ["value", "admin"], ["value", "hr"], ["value", "course_manager"], ["formControlName", "departmentId"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "status"], ["value", "active"], ["value", "inactive"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645", "subtitle", "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062D\u0633\u0627\u0628 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "field-error"], [3, "value"]], template: function UsersManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 2)(1, "article", 3)(2, "div", 4)(3, "div")(4, "h2", 5)(5, "span", 6);
            i0.ɵɵelement(6, "app-icon", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u064A\u0646");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p", 8);
            i0.ɵɵtext(10, "\u062A\u0647\u064A\u0626\u0629 \u0645\u0648\u0638\u0641 \u0623\u0648 \u0645\u062F\u064A\u0631 \u0623\u0648 \u0645\u0633\u062A\u062E\u062F\u0645 \u0625\u062F\u0627\u0631\u064A \u062C\u062F\u064A\u062F \u0645\u0646 \u062E\u0644\u0627\u0644 \u0646\u0627\u0641\u0630\u0629 \u0645\u0633\u062A\u0642\u0644\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 9)(12, "button", 10);
            i0.ɵɵlistener("click", function UsersManagementComponent_Template_button_click_12_listener() { return ctx.openCreateDialog(); });
            i0.ɵɵelementStart(13, "span", 11);
            i0.ɵɵelement(14, "app-icon", 12);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(17, "article", 3)(18, "h2", 13);
            i0.ɵɵtext(19, "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u062D\u0627\u0644\u064A\u0648\u0646");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "app-data-table", 14);
            i0.ɵɵlistener("actionClicked", function UsersManagementComponent_Template_app_data_table_actionClicked_20_listener($event) { return ctx.handleTableAction($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "app-dialog", 15, 0)(23, "form", 16);
            i0.ɵɵlistener("ngSubmit", function UsersManagementComponent_Template_form_ngSubmit_23_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(24, "div", 17)(25, "div", 18)(26, "label");
            i0.ɵɵtext(27, "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(28, "input", 19);
            i0.ɵɵtemplate(29, UsersManagementComponent_div_29_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 18)(31, "label");
            i0.ɵɵtext(32, "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "input", 21);
            i0.ɵɵtemplate(34, UsersManagementComponent_div_34_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 18)(36, "label");
            i0.ɵɵtext(37, "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(38, "input", 22);
            i0.ɵɵtemplate(39, UsersManagementComponent_div_39_Template, 2, 1, "div", 20)(40, UsersManagementComponent_div_40_Template, 2, 0, "div", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 18)(42, "label");
            i0.ɵɵtext(43, "\u0627\u0644\u0645\u0633\u0645\u0649 \u0627\u0644\u0648\u0638\u064A\u0641\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "input", 24);
            i0.ɵɵtemplate(45, UsersManagementComponent_div_45_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 18)(47, "label");
            i0.ɵɵtext(48, "\u0627\u0644\u062F\u0648\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "select", 25)(50, "option", 26);
            i0.ɵɵtext(51, "\u0645\u0648\u0638\u0641");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(52, "option", 27);
            i0.ɵɵtext(53, "\u0645\u062F\u064A\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "option", 28);
            i0.ɵɵtext(55, "\u0645\u062F\u064A\u0631 \u0646\u0638\u0627\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "option", 29);
            i0.ɵɵtext(57, "\u0645\u0648\u0627\u0631\u062F \u0628\u0634\u0631\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "option", 30);
            i0.ɵɵtext(59, "\u0645\u062F\u064A\u0631 \u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(60, UsersManagementComponent_div_60_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "div", 18)(62, "label");
            i0.ɵɵtext(63, "\u0627\u0644\u0642\u0633\u0645");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "select", 31)(65, "option", 32);
            i0.ɵɵtext(66, "\u0628\u062F\u0648\u0646");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(67, UsersManagementComponent_option_67_Template, 2, 2, "option", 33);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(68, "div", 18)(69, "label");
            i0.ɵɵtext(70, "\u0627\u0644\u062D\u0627\u0644\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "select", 34)(72, "option", 35);
            i0.ɵɵtext(73, "\u0646\u0634\u0637");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(74, "option", 36);
            i0.ɵɵtext(75, "\u063A\u064A\u0631 \u0646\u0634\u0637");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(76, UsersManagementComponent_div_76_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(77, "div", 37)(78, "button", 38);
            i0.ɵɵlistener("click", function UsersManagementComponent_Template_button_click_78_listener() { return ctx.closeCreateDialog(); });
            i0.ɵɵtext(79, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "button", 39);
            i0.ɵɵtext(81);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(82, "app-dialog", 40, 1)(84, "div", 2)(85, "div", 41);
            i0.ɵɵtext(86, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 ");
            i0.ɵɵtemplate(87, UsersManagementComponent_strong_87_Template, 2, 1, "strong", 42);
            i0.ɵɵtext(88, " \u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(89, "div", 37)(90, "button", 38);
            i0.ɵɵlistener("click", function UsersManagementComponent_Template_button_click_90_listener() { return ctx.closeDeleteDialog(); });
            i0.ɵɵtext(91, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(92, "button", 43);
            i0.ɵɵlistener("click", function UsersManagementComponent_Template_button_click_92_listener() { return ctx.confirmDelete(); });
            i0.ɵɵtext(93);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.rows())("actions", ctx.actions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.isEditMode() ? "\u062A\u0639\u062F\u064A\u0644 \u0645\u0633\u062A\u062E\u062F\u0645" : "\u0625\u0636\u0627\u0641\u0629 \u0645\u0633\u062A\u062E\u062F\u0645")("subtitle", ctx.isEditMode() ? "\u062D\u062F\u0651\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A \u062F\u0648\u0646 \u0627\u0644\u062D\u0627\u062C\u0629 \u0644\u0625\u0639\u0627\u062F\u0629 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628." : "\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u062B\u0645 \u0627\u062D\u0641\u0638\u0647\u0627 \u0644\u0625\u0636\u0627\u0641\u062A\u0647 \u0625\u0644\u0649 \u0627\u0644\u0646\u0638\u0627\u0645.")("icon", ctx.isEditMode() ? "user" : "user-plus");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.fullName));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.fullName));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.email));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.email));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.password));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.password));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isEditMode());
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.jobTitle));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.jobTitle));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.role));
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.role));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.departments());
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.status));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.status));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : ctx.isEditMode() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.deletingUser());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DataTableComponent, DialogComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] { padding:1.5rem; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-users-management', standalone: true, imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="users" [size]="20" /></span>
              <span>إدارة المستخدمين</span>
            </h2>
            <p class="section-subtitle">تهيئة موظف أو مدير أو مستخدم إداري جديد من خلال نافذة مستقلة.</p>
          </div>
          <div class="panel-actions">
            <button class="btn btn-primary" type="button" (click)="openCreateDialog()">
              <span class="btn-content">
                <app-icon name="user-plus" [size]="18" />
                <span>إضافة مستخدم</span>
              </span>
            </button>
          </div>
        </div>

      </article>

      <article class="card panel">
        <h2 class="section-title">المستخدمون الحاليون</h2>
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #createDialog
        [title]="isEditMode() ? 'تعديل مستخدم' : 'إضافة مستخدم'"
        [subtitle]="
          isEditMode()
            ? 'حدّث بيانات المستخدم واحفظ التغييرات دون الحاجة لإعادة إنشاء الحساب.'
            : 'أدخل بيانات المستخدم ثم احفظها لإضافته إلى النظام.'
        "
        [icon]="isEditMode() ? 'user' : 'user-plus'"
      >
        <form class="dialog-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>الاسم الكامل</label>
              <input formControlName="fullName" [class.is-invalid]="hasVisibleError(form.controls.fullName)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.fullName)">
                {{ getVisibleErrorMessage(form.controls.fullName, validationMessages.fullName) }}
              </div>
            </div>
            <div class="field">
              <label>البريد الإلكتروني</label>
              <input formControlName="email" [class.is-invalid]="hasVisibleError(form.controls.email)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.email)">
                {{ getVisibleErrorMessage(form.controls.email, validationMessages.email) }}
              </div>
            </div>
            <div class="field">
              <label>كلمة المرور</label>
              <input
                type="password"
                formControlName="password"
                [class.is-invalid]="hasVisibleError(form.controls.password)"
              />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.password)">
                {{ getVisibleErrorMessage(form.controls.password, validationMessages.password) }}
              </div>
              <div class="section-subtitle" *ngIf="isEditMode()">اترك الحقل فارغاً إذا لم ترغب في تغيير كلمة المرور.</div>
            </div>
            <div class="field">
              <label>المسمى الوظيفي</label>
              <input formControlName="jobTitle" [class.is-invalid]="hasVisibleError(form.controls.jobTitle)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.jobTitle)">
                {{ getVisibleErrorMessage(form.controls.jobTitle, validationMessages.jobTitle) }}
              </div>
            </div>
            <div class="field">
              <label>الدور</label>
              <select formControlName="role" [class.is-invalid]="hasVisibleError(form.controls.role)">
                <option value="employee">موظف</option>
                <option value="manager">مدير</option>
                <option value="admin">مدير نظام</option>
                <option value="hr">موارد بشرية</option>
                <option value="course_manager">مدير محتوى</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(form.controls.role)">
                {{ getVisibleErrorMessage(form.controls.role, validationMessages.role) }}
              </div>
            </div>
            <div class="field">
              <label>القسم</label>
              <select formControlName="departmentId">
                <option value="">بدون</option>
                <option *ngFor="let department of departments()" [value]="department._id">{{ department.name }}</option>
              </select>
            </div>
            <div class="field">
              <label>الحالة</label>
              <select formControlName="status" [class.is-invalid]="hasVisibleError(form.controls.status)">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(form.controls.status)">
                {{ getVisibleErrorMessage(form.controls.status, validationMessages.status) }}
              </div>
            </div>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeCreateDialog()">إلغاء</button>
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading()">
              {{ loading() ? 'جارٍ الحفظ...' : (isEditMode() ? 'حفظ التعديلات' : 'إضافة المستخدم') }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #deleteDialog
        title="تأكيد حذف المستخدم"
        subtitle="سيتم حذف الحساب نهائياً بعد التأكيد."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف المستخدم
            <strong *ngIf="deletingUser() as user">{{ user.fullName }}</strong>
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
    }], null, { createDialog: [{ type: i0.ViewChild, args: ['createDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UsersManagementComponent, { className: "UsersManagementComponent", filePath: "src/app/features/admin/pages/users-management.component.ts", lineNumber: 162 }); })();
//# sourceMappingURL=users-management.component.js.map