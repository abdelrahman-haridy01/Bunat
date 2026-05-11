import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { KpisApiService } from '../../../core/services/kpis-api.service';
import { Kpi } from '../../../core/models/domain.models';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { DataTableComponent } from '../../../shared/components';

@Component({
  selector: 'app-kpi-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <h2 class="section-title">إضافة مؤشر أداء</h2>
        <form class="form-grid" [formGroup]="kpiForm" (ngSubmit)="submitKpi()">
          <div class="field">
            <label>اسم المؤشر</label>
            <input formControlName="name" />
          </div>
          <div class="field">
            <label>نوع القياس</label>
            <select formControlName="metricType">
              <option value="number">رقم</option>
              <option value="percentage">نسبة</option>
              <option value="score">درجة</option>
              <option value="boolean">نعم/لا</option>
            </select>
          </div>
          <div class="field">
            <label>الاتجاه</label>
            <select formControlName="direction">
              <option value="increase">زيادة</option>
              <option value="decrease">خفض</option>
            </select>
          </div>
          <div class="field">
            <label>القيمة المستهدفة</label>
            <input type="number" formControlName="targetValue" />
          </div>
          <div class="field">
            <label>الوحدة</label>
            <input formControlName="unit" />
          </div>
          <div class="field">
            <label>القسم</label>
            <select formControlName="departmentId">
              <option value="">عام</option>
              <option *ngFor="let department of departments()" [value]="department._id">{{ department.name }}</option>
            </select>
          </div>
          <button class="btn btn-primary" type="submit">حفظ المؤشر</button>
        </form>
      </article>

      <article class="card panel">
        <h2 class="section-title">تسجيل نتيجة أداء</h2>
        <form class="form-grid" [formGroup]="recordForm" (ngSubmit)="submitRecord()">
          <div class="field">
            <label>الموظف</label>
            <select formControlName="userId">
              <option *ngFor="let user of employees()" [value]="user._id || user.id">{{ user.fullName }}</option>
            </select>
          </div>
          <div class="field">
            <label>المؤشر</label>
            <select formControlName="kpiId">
              <option *ngFor="let kpi of kpis()" [value]="kpi._id || kpi.id">{{ kpi.name }}</option>
            </select>
          </div>
          <div class="field">
            <label>قبل</label>
            <input type="number" formControlName="beforeValue" />
          </div>
          <div class="field">
            <label>بعد</label>
            <input type="number" formControlName="afterValue" />
          </div>
          <button class="btn btn-secondary" type="submit">تسجيل النتيجة</button>
        </form>
      </article>

      <article class="card panel">
        <h2 class="section-title">المؤشرات الحالية</h2>
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
    </section>
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly kpisApi = inject(KpisApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly kpis = signal<any[]>([]);
  protected readonly departments = signal<any[]>([]);
  protected readonly employees = signal<any[]>([]);
  protected readonly columns = [
    { key: 'name', label: 'المؤشر' },
    { key: 'metricType', label: 'النوع' },
    { key: 'target', label: 'الهدف' },
    { key: 'department', label: 'القسم' },
  ];

  protected readonly kpiForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    metricType: ['percentage', Validators.required],
    direction: ['increase', Validators.required],
    targetValue: [90, Validators.required],
    unit: ['%', Validators.required],
    departmentId: [''],
  });

  protected readonly recordForm = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    kpiId: ['', Validators.required],
    beforeValue: [0, Validators.required],
    afterValue: [0, Validators.required],
    notes: ['قياس من لوحة الإدارة'],
  });

  ngOnInit() {
    this.loadData();
  }

  protected submitKpi() {
    if (this.kpiForm.invalid) {
      return;
    }
    const payload = this.kpiForm.getRawValue();
    this.kpisApi
      .createKpi({
        ...payload,
        metricType: payload.metricType as Kpi['metricType'],
        direction: payload.direction as Kpi['direction'],
        departmentId: payload.departmentId || undefined,
      })
      .subscribe(() => {
        this.loadKpis();
        this.kpiForm.patchValue({ name: '', description: '' });
      });
  }

  protected submitRecord() {
    if (this.recordForm.invalid) {
      return;
    }
    this.kpisApi.createPerformanceRecord(this.recordForm.getRawValue()).subscribe();
  }

  protected rows() {
    return this.kpis().map((kpi) => ({
      name: kpi.name,
      metricType: kpi.metricType,
      target: `${kpi.targetValue} ${kpi.unit}`,
      department: typeof kpi.departmentId === 'string' ? kpi.departmentId : kpi.departmentId?.name || 'عام',
    }));
  }

  private loadData() {
    this.loadKpis();
    this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
    this.lookupsApi.getUsers().subscribe((response) => this.employees.set(response.filter((user) => user.role === 'employee')));
  }

  private loadKpis() {
    this.kpisApi.getKpis().subscribe((response) => this.kpis.set(response));
  }
}
