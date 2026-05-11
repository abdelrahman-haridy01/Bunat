import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserRole } from '../../../core/models/domain.models';
import { DataTableComponent } from '../../../shared/components';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';

@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">إضافة مستخدم</h2>
            <p class="section-subtitle">تهيئة موظف أو مدير أو مستخدم إداري جديد.</p>
          </div>
        </div>

        <form class="page-grid" [formGroup]="form" (ngSubmit)="submit()">
          <div class="form-grid">
            <div class="field">
              <label>الاسم الكامل</label>
              <input formControlName="fullName" />
            </div>
            <div class="field">
              <label>البريد الإلكتروني</label>
              <input formControlName="email" />
            </div>
            <div class="field">
              <label>كلمة المرور</label>
              <input type="password" formControlName="password" />
            </div>
            <div class="field">
              <label>المسمى الوظيفي</label>
              <input formControlName="jobTitle" />
            </div>
            <div class="field">
              <label>الدور</label>
              <select formControlName="role">
                <option value="employee">موظف</option>
                <option value="manager">مدير</option>
                <option value="admin">مدير نظام</option>
                <option value="hr">موارد بشرية</option>
              </select>
            </div>
            <div class="field">
              <label>القسم</label>
              <select formControlName="departmentId">
                <option value="">بدون</option>
                <option *ngFor="let department of departments()" [value]="department._id">{{ department.name }}</option>
              </select>
            </div>
          </div>

          <div class="message-box success" *ngIf="success()">{{ success() }}</div>
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading()">
            {{ loading() ? 'جارٍ الحفظ...' : 'إضافة المستخدم' }}
          </button>
        </form>
      </article>

      <article class="card panel">
        <h2 class="section-title">المستخدمون الحاليون</h2>
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
    </section>
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly usersApi = inject(UsersApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly users = signal<any[]>([]);
  protected readonly departments = signal<Array<{ _id: string; name: string }>>([]);
  protected readonly loading = signal(false);
  protected readonly success = signal('');
  protected readonly columns = [
    { key: 'fullName', label: 'الاسم' },
    { key: 'jobTitle', label: 'المسمى' },
    { key: 'roleLabel', label: 'الدور' },
    { key: 'department', label: 'القسم' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    jobTitle: ['', Validators.required],
    role: ['employee', Validators.required],
    departmentId: [''],
  });

  ngOnInit() {
    this.loadData();
  }

  protected submit() {
    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.success.set('');
    const payload = this.form.getRawValue();
    this.usersApi
      .createUser({
        ...payload,
        role: payload.role as UserRole,
        departmentId: payload.departmentId || undefined,
      })
      .subscribe({
      next: () => {
        this.success.set('تمت إضافة المستخدم بنجاح.');
        this.form.reset({
          fullName: '',
          email: '',
          password: '',
          jobTitle: '',
          role: 'employee',
          departmentId: '',
        });
        this.loadUsers();
      },
      complete: () => this.loading.set(false),
      });
  }

  protected rows() {
    return this.users().map((user) => ({
      fullName: user.fullName,
      jobTitle: user.jobTitle,
      roleLabel: this.roleLabel(user.role),
      department: typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?.name || '-',
    }));
  }

  private loadData() {
    this.loadUsers();
    this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
  }

  private loadUsers() {
    this.usersApi.getUsers().subscribe((response) => this.users.set(response));
  }

  private roleLabel(role: string) {
    return { employee: 'موظف', manager: 'مدير', admin: 'مدير نظام', hr: 'موارد بشرية' }[role] || role;
  }
}
