import { ChangeDetectionStrategy, Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CoursesApiService } from '../../../core/services/courses-api.service';
import { Enrollment } from '../../../core/models/domain.models';
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
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly employees = signal<any[]>([]);
  protected readonly courses = signal<any[]>([]);
  protected readonly enrollments = signal<Enrollment[]>([]);
  protected readonly deletingEnrollment = signal<Enrollment | null>(null);
  protected readonly loading = signal(false);
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
    { key: 'statusLabel', label: 'الحالة' },
    { key: 'dueDate', label: 'الاستحقاق' },
  ];
  protected readonly actions = [
    { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' as const },
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

  protected closeDeleteDialog() {
    this.deletingEnrollment.set(null);
    this.deleteDialog().close();
  }

  protected handleTableAction(event: { key: string; row: Record<string, unknown> }) {
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

  protected openDeleteDialog(enrollment: Enrollment) {
    this.deletingEnrollment.set(enrollment);
    this.deleteDialog().open();
  }

  protected submit() {
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

  protected confirmDelete() {
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

  protected enrollmentTitle(enrollment: Enrollment) {
    const courseTitle =
      typeof enrollment.courseId === 'string' ? enrollment.courseId : enrollment.courseId?.title || 'الدورة';
    const employeeName =
      typeof enrollment.userId === 'string' ? enrollment.userId : enrollment.userId?.fullName || 'الموظف';
    return `${courseTitle} - ${employeeName}`;
  }

  protected rows() {
    return this.enrollments().map((item) => ({
      enrollmentId: item._id || item.id || '',
      employee: typeof item.userId === 'string' ? item.userId : item.userId?.fullName || 'موظف',
      course: typeof item.courseId === 'string' ? item.courseId : item.courseId?.title || 'دورة',
      statusLabel: this.statusLabel(item.status),
      dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('ar-SA') : '-',
    }));
  }

  private statusLabel(status: Enrollment['status']) {
    return {
      not_started: 'لم يبدأ',
      in_progress: 'قيد التنفيذ',
      completed: 'مكتمل',
      failed: 'غير مكتمل',
    }[status] || status;
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
