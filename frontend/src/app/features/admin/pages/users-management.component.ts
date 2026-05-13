import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRole, UserSummary } from '../../../core/models/domain.models';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { AuthService } from '../../../core/services/auth.service';
import {
  clearControlState,
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent],
  template: `
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
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly usersApi = inject(UsersApiService);
  private readonly lookupsApi = inject(LookupsApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly createDialog = viewChild.required<DialogComponent>('createDialog');
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly users = signal<UserSummary[]>([]);
  protected readonly departments = signal<Array<{ _id: string; name: string }>>([]);
  protected readonly loading = signal(false);
  protected readonly editingUser = signal<UserSummary | null>(null);
  protected readonly deletingUser = signal<UserSummary | null>(null);
  protected readonly isEditMode = computed(() => !!this.editingUser());
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly validationMessages = {
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
  protected readonly columns = [
    { key: 'fullName', label: 'الاسم' },
    { key: 'jobTitle', label: 'المسمى' },
    { key: 'roleLabel', label: 'الدور' },
    { key: 'department', label: 'القسم' },
    { key: 'statusLabel', label: 'الحالة' },
  ];
  protected readonly actions = [
    { key: 'report', label: 'التقرير', icon: 'eye', tone: 'ghost' as const },
    { key: 'edit', label: 'تعديل', icon: 'user', tone: 'ghost' as const },
    { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' as const },
  ];

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    jobTitle: ['', Validators.required],
    role: ['employee', Validators.required],
    departmentId: [''],
    status: ['active', Validators.required],
  });

  ngOnInit() {
    this.loadData();
  }

  protected openCreateDialog() {
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

  protected closeCreateDialog() {
    this.createDialog().close();
  }

  protected closeDeleteDialog() {
    this.deletingUser.set(null);
    this.deleteDialog().close();
  }

  protected handleTableAction(event: { key: string; row: Record<string, unknown> }) {
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

  protected openEditDialog(user: UserSummary) {
    this.editingUser.set(user);
    this.setEditPasswordValidators();
    this.form.reset({
      fullName: user.fullName,
      email: user.email,
      password: '',
      jobTitle: user.jobTitle,
      role: user.role,
      departmentId:
        typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?._id || '',
      status: user.status || 'active',
    });
    clearControlState(this.form);
    this.createDialog().open();
  }

  protected openDeleteDialog(user: UserSummary) {
    this.deletingUser.set(user);
    this.deleteDialog().open();
  }

  protected submit() {
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

      const updatePayload: Partial<UserSummary> & { password?: string } = {
        fullName: payload.fullName,
        email: payload.email,
        jobTitle: payload.jobTitle,
        role: payload.role as UserRole,
        departmentId: payload.departmentId || undefined,
        status: payload.status as UserSummary['status'],
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
        role: payload.role as UserRole,
        departmentId: payload.departmentId || undefined,
        status: payload.status as UserSummary['status'],
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

  protected confirmDelete() {
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

  protected rows() {
    return this.users().map((user) => ({
      userId: user._id || user.id || '',
      fullName: user.fullName,
      jobTitle: user.jobTitle,
      roleLabel: this.roleLabel(user.role),
      department: typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?.name || '-',
      statusLabel: this.statusLabel(user.status),
    }));
  }

  private loadData() {
    this.loadUsers();
    this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
  }

  private loadUsers() {
    this.usersApi.getUsers().subscribe((response) => this.users.set(response));
  }

  private setCreatePasswordValidators() {
    this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
    this.form.controls.password.updateValueAndValidity({ emitEvent: false });
  }

  private setEditPasswordValidators() {
    this.form.controls.password.setValidators([Validators.minLength(6)]);
    this.form.controls.password.updateValueAndValidity({ emitEvent: false });
  }

  private roleLabel(role: string) {
    return {
      employee: 'موظف',
      manager: 'مدير',
      admin: 'مدير نظام',
      hr: 'موارد بشرية',
      course_manager: 'مدير محتوى',
    }[role] || role;
  }

  private statusLabel(status?: string) {
    return { active: 'نشط', inactive: 'غير نشط' }[status || 'active'] || status || 'نشط';
  }
}
