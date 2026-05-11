import { ChangeDetectionStrategy, Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CoursesApiService } from '../../../core/services/courses-api.service';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import {
  clearControlState,
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

@Component({
  selector: 'app-assign-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent],
  template: `
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
        <app-data-table [columns]="columns" [rows]="rows()" />
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
            <button class="btn btn-primary" type="submit" [disabled]="form.invalid">إسناد الدورة</button>
          </div>
        </form>
      </app-dialog>
    </section>
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTrainingComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly usersApi = inject(UsersApiService);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly enrollmentsApi = inject(EnrollmentsApiService);

  protected readonly assignDialog = viewChild.required<DialogComponent>('assignDialog');
  protected readonly employees = signal<any[]>([]);
  protected readonly courses = signal<any[]>([]);
  protected readonly enrollments = signal<any[]>([]);
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly validationMessages = {
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
  protected readonly columns = [
    { key: 'employee', label: 'الموظف' },
    { key: 'course', label: 'الدورة' },
    { key: 'status', label: 'الحالة' },
    { key: 'dueDate', label: 'الاستحقاق' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    courseId: ['', Validators.required],
    dueDate: ['', Validators.required],
  });

  ngOnInit() {
    this.loadData();
  }

  protected openAssignDialog() {
    clearControlState(this.form);
    this.assignDialog().open();
  }

  protected closeAssignDialog() {
    this.assignDialog().close();
  }

  protected submit() {
    if (this.form.invalid) {
      touchAllControls(this.form);
      return;
    }
    this.enrollmentsApi.assign(this.form.getRawValue()).subscribe(() => {
      this.loadEnrollments();
      this.form.reset({
        userId: '',
        courseId: '',
        dueDate: '',
      });
      this.closeAssignDialog();
    });
  }

  protected rows() {
    return this.enrollments().map((item) => ({
      employee: typeof item.userId === 'string' ? item.userId : item.userId?.fullName || 'موظف',
      course: typeof item.courseId === 'string' ? item.courseId : item.courseId?.title || 'دورة',
      status: item.status,
      dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('ar-SA') : '-',
    }));
  }

  private loadData() {
    this.usersApi.getUsers().subscribe((response) => this.employees.set(response.filter((user) => user.role === 'employee')));
    this.coursesApi.getCourses().subscribe((response) => this.courses.set(response));
    this.loadEnrollments();
  }

  private loadEnrollments() {
    this.enrollmentsApi.getTeamEnrollments().subscribe((response) => this.enrollments.set(response));
  }
}
