import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CoursesApiService } from '../../../core/services/courses-api.service';
import { EnrollmentsApiService } from '../../../core/services/enrollments-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { DataTableComponent } from '../../../shared/components';

@Component({
  selector: 'app-assign-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <h2 class="section-title">تكليف دورة</h2>
        <form class="form-grid" [formGroup]="form" (ngSubmit)="submit()">
          <div class="field">
            <label>الموظف</label>
            <select formControlName="userId">
              <option *ngFor="let user of employees()" [value]="user._id || user.id">{{ user.fullName }}</option>
            </select>
          </div>
          <div class="field">
            <label>الدورة</label>
            <select formControlName="courseId">
              <option *ngFor="let course of courses()" [value]="course._id || course.id">{{ course.title }}</option>
            </select>
          </div>
          <div class="field">
            <label>تاريخ الاستحقاق</label>
            <input type="date" formControlName="dueDate" />
          </div>
          <button class="btn btn-primary" type="submit">إسناد الدورة</button>
        </form>
      </article>

      <article class="card panel">
        <h2 class="section-title">تكليفات الفريق</h2>
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
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

  protected readonly employees = signal<any[]>([]);
  protected readonly courses = signal<any[]>([]);
  protected readonly enrollments = signal<any[]>([]);
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

  protected submit() {
    if (this.form.invalid) {
      return;
    }
    this.enrollmentsApi.assign(this.form.getRawValue()).subscribe(() => this.loadEnrollments());
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

