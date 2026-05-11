import { ChangeDetectionStrategy, Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { KpisApiService } from '../../../core/services/kpis-api.service';
import { Kpi } from '../../../core/models/domain.models';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import {
  clearControlState,
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

@Component({
  selector: 'app-kpi-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent],
  template: `
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
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>

      <app-dialog
        #kpiDialog
        title="إضافة مؤشر أداء"
        subtitle="تعريف مؤشر جديد وربطه بالقسم المناسب."
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
            <button class="btn btn-primary" type="submit" [disabled]="kpiForm.invalid">حفظ المؤشر</button>
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
    </section>
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly kpisApi = inject(KpisApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly kpiDialog = viewChild.required<DialogComponent>('kpiDialog');
  protected readonly recordDialog = viewChild.required<DialogComponent>('recordDialog');
  protected readonly kpis = signal<any[]>([]);
  protected readonly departments = signal<any[]>([]);
  protected readonly employees = signal<any[]>([]);
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly kpiValidationMessages = {
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
  protected readonly recordValidationMessages = {
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
    targetValue: [90, [Validators.required, Validators.min(0)]],
    unit: ['%', Validators.required],
    departmentId: [''],
  });

  protected readonly recordForm = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    kpiId: ['', Validators.required],
    beforeValue: [0, [Validators.required, Validators.min(0)]],
    afterValue: [0, [Validators.required, Validators.min(0)]],
    notes: ['قياس من لوحة الإدارة'],
  });

  ngOnInit() {
    this.loadData();
  }

  protected openKpiDialog() {
    clearControlState(this.kpiForm);
    this.kpiDialog().open();
  }

  protected closeKpiDialog() {
    this.kpiDialog().close();
  }

  protected openRecordDialog() {
    clearControlState(this.recordForm);
    this.recordDialog().open();
  }

  protected closeRecordDialog() {
    this.recordDialog().close();
  }

  protected submitKpi() {
    if (this.kpiForm.invalid) {
      touchAllControls(this.kpiForm);
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
        this.kpiForm.reset({
          name: '',
          description: '',
          metricType: 'percentage',
          direction: 'increase',
          targetValue: 90,
          unit: '%',
          departmentId: '',
        });
        this.closeKpiDialog();
      });
  }

  protected submitRecord() {
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
