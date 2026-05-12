import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["assignDialog"];
const _c1 = ["deleteDialog"];
function AssignTrainingComponent_option_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const user_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", user_r1._id || user_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(user_r1.fullName);
} }
function AssignTrainingComponent_div_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.form.controls.userId, ctx_r1.validationMessages.userId), " ");
} }
function AssignTrainingComponent_option_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", course_r3._id || course_r3.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(course_r3.title);
} }
function AssignTrainingComponent_div_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.form.controls.courseId, ctx_r1.validationMessages.courseId), " ");
} }
function AssignTrainingComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.form.controls.dueDate, ctx_r1.validationMessages.dueDate), " ");
} }
function AssignTrainingComponent_strong_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r4 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.enrollmentTitle(enrollment_r4));
} }
export class AssignTrainingComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.usersApi = inject(UsersApiService);
        this.coursesApi = inject(CoursesApiService);
        this.enrollmentsApi = inject(EnrollmentsApiService);
        this.assignDialog = viewChild.required('assignDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.employees = signal([], ...(ngDevMode ? [{ debugName: "employees" }] : /* istanbul ignore next */ []));
        this.courses = signal([], ...(ngDevMode ? [{ debugName: "courses" }] : /* istanbul ignore next */ []));
        this.enrollments = signal([], ...(ngDevMode ? [{ debugName: "enrollments" }] : /* istanbul ignore next */ []));
        this.deletingEnrollment = signal(null, ...(ngDevMode ? [{ debugName: "deletingEnrollment" }] : /* istanbul ignore next */ []));
        this.loading = signal(false, ...(ngDevMode ? [{ debugName: "loading" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.validationMessages = {
            userId: {
                required: 'اختر الموظف.',
            },
            courseId: {
                required: 'اختر الدورة.',
            },
            dueDate: {
                required: 'اختر تاريخ الاستحقاق.',
            },
        };
        this.columns = [
            { key: 'employee', label: 'الموظف' },
            { key: 'course', label: 'الدورة' },
            { key: 'statusLabel', label: 'الحالة' },
            { key: 'dueDate', label: 'الاستحقاق' },
        ];
        this.actions = [
            { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' },
        ];
        this.form = this.fb.nonNullable.group({
            userId: ['', Validators.required],
            courseId: ['', Validators.required],
            dueDate: ['', Validators.required],
        });
    }
    ngOnInit() {
        this.loadData();
    }
    openAssignDialog() {
        clearControlState(this.form);
        this.assignDialog().open();
    }
    closeAssignDialog() {
        this.assignDialog().close();
    }
    closeDeleteDialog() {
        this.deletingEnrollment.set(null);
        this.deleteDialog().close();
    }
    handleTableAction(event) {
        if (typeof event.row['enrollmentId'] !== 'string') {
            return;
        }
        const enrollment = this.enrollments().find((item) => (item._id || item.id) === event.row['enrollmentId']);
        if (!enrollment) {
            return;
        }
        if (event.key === 'delete') {
            this.openDeleteDialog(enrollment);
        }
    }
    openDeleteDialog(enrollment) {
        this.deletingEnrollment.set(enrollment);
        this.deleteDialog().open();
    }
    submit() {
        if (this.form.invalid || this.loading()) {
            touchAllControls(this.form);
            return;
        }
        this.loading.set(true);
        this.enrollmentsApi.assign(this.form.getRawValue()).subscribe({
            next: () => {
                this.loadEnrollments();
                this.form.reset({
                    userId: '',
                    courseId: '',
                    dueDate: '',
                });
                this.closeAssignDialog();
            },
            complete: () => this.loading.set(false),
        });
    }
    confirmDelete() {
        const enrollment = this.deletingEnrollment();
        const enrollmentId = enrollment?._id || enrollment?.id;
        if (!enrollment || !enrollmentId || this.loading()) {
            return;
        }
        this.loading.set(true);
        this.enrollmentsApi.deleteEnrollment(enrollmentId).subscribe({
            next: () => {
                this.closeDeleteDialog();
                this.loadEnrollments();
            },
            complete: () => this.loading.set(false),
        });
    }
    enrollmentTitle(enrollment) {
        const courseTitle = typeof enrollment.courseId === 'string' ? enrollment.courseId : enrollment.courseId?.title || 'الدورة';
        const employeeName = typeof enrollment.userId === 'string' ? enrollment.userId : enrollment.userId?.fullName || 'الموظف';
        return `${courseTitle} - ${employeeName}`;
    }
    rows() {
        return this.enrollments().map((item) => ({
            enrollmentId: item._id || item.id || '',
            employee: typeof item.userId === 'string' ? item.userId : item.userId?.fullName || 'موظف',
            course: typeof item.courseId === 'string' ? item.courseId : item.courseId?.title || 'دورة',
            statusLabel: this.statusLabel(item.status),
            dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('ar-SA') : '-',
        }));
    }
    statusLabel(status) {
        return {
            not_started: 'لم يبدأ',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتمل',
            failed: 'غير مكتمل',
        }[status] || status;
    }
    loadData() {
        this.usersApi.getUsers().subscribe((response) => this.employees.set(response.filter((user) => user.role === 'employee')));
        this.coursesApi.getCourses().subscribe((response) => this.courses.set(response));
        this.loadEnrollments();
    }
    loadEnrollments() {
        this.enrollmentsApi.getTeamEnrollments().subscribe((response) => this.enrollments.set(response));
    }
    static { this.ɵfac = function AssignTrainingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AssignTrainingComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AssignTrainingComponent, selectors: [["app-assign-training"]], viewQuery: function AssignTrainingComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.assignDialog, _c0, 5)(ctx.deleteDialog, _c1, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(2);
        } }, decls: 59, vars: 22, consts: [["assignDialog", ""], ["deleteDialog", ""], [1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "calendar", 3, "size"], [1, "section-subtitle"], [1, "panel-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "btn-content"], [1, "section-title"], [3, "actionClicked", "columns", "rows", "actions"], ["title", "\u062A\u0643\u0644\u064A\u0641 \u062F\u0648\u0631\u0629", "subtitle", "\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0648\u0627\u0644\u062F\u0648\u0631\u0629 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642 \u0642\u0628\u0644 \u0627\u0644\u0625\u0633\u0646\u0627\u062F.", "icon", "calendar"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "userId"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "field-error", 4, "ngIf"], ["formControlName", "courseId"], ["type", "date", "formControlName", "dueDate"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u062A\u0643\u0644\u064A\u0641", "subtitle", "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062A\u0643\u0644\u064A\u0641 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [3, "value"], [1, "field-error"]], template: function AssignTrainingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 2)(1, "article", 3)(2, "div", 4)(3, "div")(4, "h2", 5)(5, "span", 6);
            i0.ɵɵelement(6, "app-icon", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "\u062A\u0643\u0644\u064A\u0641 \u0627\u0644\u062A\u062F\u0631\u064A\u0628");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p", 8);
            i0.ɵɵtext(10, "\u0625\u0633\u0646\u0627\u062F \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0645\u0646 \u062E\u0644\u0627\u0644 \u0646\u0627\u0641\u0630\u0629 \u062D\u0648\u0627\u0631 \u0628\u062F\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C \u0627\u0644\u0638\u0627\u0647\u0631 \u062F\u0627\u062E\u0644 \u0627\u0644\u0635\u0641\u062D\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 9)(12, "button", 10);
            i0.ɵɵlistener("click", function AssignTrainingComponent_Template_button_click_12_listener() { return ctx.openAssignDialog(); });
            i0.ɵɵelementStart(13, "span", 11);
            i0.ɵɵelement(14, "app-icon", 7);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "\u062A\u0643\u0644\u064A\u0641 \u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(17, "article", 3)(18, "h2", 12);
            i0.ɵɵtext(19, "\u062A\u0643\u0644\u064A\u0641\u0627\u062A \u0627\u0644\u0641\u0631\u064A\u0642");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "app-data-table", 13);
            i0.ɵɵlistener("actionClicked", function AssignTrainingComponent_Template_app_data_table_actionClicked_20_listener($event) { return ctx.handleTableAction($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(21, "app-dialog", 14, 0)(23, "form", 15);
            i0.ɵɵlistener("ngSubmit", function AssignTrainingComponent_Template_form_ngSubmit_23_listener() { return ctx.submit(); });
            i0.ɵɵelementStart(24, "div", 16)(25, "div", 17)(26, "label");
            i0.ɵɵtext(27, "\u0627\u0644\u0645\u0648\u0638\u0641");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "select", 18);
            i0.ɵɵtemplate(29, AssignTrainingComponent_option_29_Template, 2, 2, "option", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(30, AssignTrainingComponent_div_30_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 17)(32, "label");
            i0.ɵɵtext(33, "\u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "select", 21);
            i0.ɵɵtemplate(35, AssignTrainingComponent_option_35_Template, 2, 2, "option", 19);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(36, AssignTrainingComponent_div_36_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "div", 17)(38, "label");
            i0.ɵɵtext(39, "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0627\u0633\u062A\u062D\u0642\u0627\u0642");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "input", 22);
            i0.ɵɵtemplate(41, AssignTrainingComponent_div_41_Template, 2, 1, "div", 20);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(42, "div", 23)(43, "button", 24);
            i0.ɵɵlistener("click", function AssignTrainingComponent_Template_button_click_43_listener() { return ctx.closeAssignDialog(); });
            i0.ɵɵtext(44, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "button", 25);
            i0.ɵɵtext(46);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(47, "app-dialog", 26, 1)(49, "div", 2)(50, "div", 27);
            i0.ɵɵtext(51, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u062A\u0643\u0644\u064A\u0641 \u0627\u0644\u062F\u0648\u0631\u0629 ");
            i0.ɵɵtemplate(52, AssignTrainingComponent_strong_52_Template, 2, 1, "strong", 28);
            i0.ɵɵtext(53, " \u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "div", 23)(55, "button", 24);
            i0.ɵɵlistener("click", function AssignTrainingComponent_Template_button_click_55_listener() { return ctx.closeDeleteDialog(); });
            i0.ɵɵtext(56, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "button", 29);
            i0.ɵɵlistener("click", function AssignTrainingComponent_Template_button_click_57_listener() { return ctx.confirmDelete(); });
            i0.ɵɵtext(58);
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.rows())("actions", ctx.actions);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.form);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.userId));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.employees());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.userId));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.courseId));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.courses());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.courseId));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.form.controls.dueDate));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.form.controls.dueDate));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.form.invalid || ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : "\u0625\u0633\u0646\u0627\u062F \u0627\u0644\u062F\u0648\u0631\u0629", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.deletingEnrollment());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.loading());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loading() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DataTableComponent, DialogComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] { padding:1.5rem; }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AssignTrainingComponent, [{
        type: Component,
        args: [{ selector: 'app-assign-training', standalone: true, imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="calendar" [size]="20" /></span>
              <span>تكليف التدريب</span>
            </h2>
            <p class="section-subtitle">إسناد الدورات من خلال نافذة حوار بدل النموذج الظاهر داخل الصفحة.</p>
          </div>
          <div class="panel-actions">
            <button class="btn btn-primary" type="button" (click)="openAssignDialog()">
              <span class="btn-content">
                <app-icon name="calendar" [size]="18" />
                <span>تكليف دورة</span>
              </span>
            </button>
          </div>
        </div>
      </article>

      <article class="card panel">
        <h2 class="section-title">تكليفات الفريق</h2>
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #assignDialog
        title="تكليف دورة"
        subtitle="اختر الموظف والدورة وتاريخ الاستحقاق قبل الإسناد."
        icon="calendar"
      >
        <form class="dialog-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>الموظف</label>
              <select formControlName="userId" [class.is-invalid]="hasVisibleError(form.controls.userId)">
                <option *ngFor="let user of employees()" [value]="user._id || user.id">{{ user.fullName }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(form.controls.userId)">
                {{ getVisibleErrorMessage(form.controls.userId, validationMessages.userId) }}
              </div>
            </div>
            <div class="field">
              <label>الدورة</label>
              <select formControlName="courseId" [class.is-invalid]="hasVisibleError(form.controls.courseId)">
                <option *ngFor="let course of courses()" [value]="course._id || course.id">{{ course.title }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(form.controls.courseId)">
                {{ getVisibleErrorMessage(form.controls.courseId, validationMessages.courseId) }}
              </div>
            </div>
            <div class="field">
              <label>تاريخ الاستحقاق</label>
              <input type="date" formControlName="dueDate" [class.is-invalid]="hasVisibleError(form.controls.dueDate)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.dueDate)">
                {{ getVisibleErrorMessage(form.controls.dueDate, validationMessages.dueDate) }}
              </div>
            </div>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeAssignDialog()">إلغاء</button>
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading()">
              {{ loading() ? 'جارٍ الحفظ...' : 'إسناد الدورة' }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #deleteDialog
        title="تأكيد حذف التكليف"
        subtitle="سيتم حذف التكليف نهائياً بعد التأكيد."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف تكليف الدورة
            <strong *ngIf="deletingEnrollment() as enrollment">{{ enrollmentTitle(enrollment) }}</strong>
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
    }], null, { assignDialog: [{ type: i0.ViewChild, args: ['assignDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AssignTrainingComponent, { className: "AssignTrainingComponent", filePath: "src/app/features/admin/pages/assign-training.component.ts", lineNumber: 118 }); })();
//# sourceMappingURL=assign-training.component.js.map