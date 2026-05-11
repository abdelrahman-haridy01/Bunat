import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
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
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #kpiDialog
        [title]="isEditMode() ? 'تعديل مؤشر أداء' : 'إضافة مؤشر أداء'"
        [subtitle]="
          isEditMode()
            ? 'حدّث بيانات المؤشر الحالي ثم احفظ التغييرات.'
            : 'تعريف مؤشر جديد وربطه بالقسم المناسب.'
        "
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
            <button class="btn btn-primary" type="submit" [disabled]="kpiForm.invalid">
              {{ isEditMode() ? 'حفظ التعديلات' : 'حفظ المؤشر' }}
            </button>
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

      <app-dialog
        #deleteDialog
        title="تأكيد حذف المؤشر"
        subtitle="سيتم حذف المؤشر ونتائجه المرتبطة نهائياً بعد التأكيد."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف المؤشر
            <strong *ngIf="deletingKpi() as kpi">{{ kpi.name }}</strong>
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
export class KpiManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly kpisApi = inject(KpisApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly kpiDialog = viewChild.required<DialogComponent>('kpiDialog');
  protected readonly recordDialog = viewChild.required<DialogComponent>('recordDialog');
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly kpis = signal<Kpi[]>([]);
  protected readonly departments = signal<any[]>([]);
  protected readonly employees = signal<any[]>([]);
  protected readonly loading = signal(false);
  protected readonly editingKpi = signal<Kpi | null>(null);
  protected readonly deletingKpi = signal<Kpi | null>(null);
  protected readonly isEditMode = computed(() => !!this.editingKpi());
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
    { key: 'metricTypeLabel', label: 'النوع' },
    { key: 'target', label: 'الهدف' },
    { key: 'department', label: 'القسم' },
  ];
  protected readonly actions = [
    { key: 'edit', label: 'تعديل', icon: 'target', tone: 'ghost' as const },
    { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' as const },
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
    this.editingKpi.set(null);
    this.kpiForm.reset({
      name: '',
      description: '',
      metricType: 'percentage',
      direction: 'increase',
      targetValue: 90,
      unit: '%',
      departmentId: '',
    });
    clearControlState(this.kpiForm);
    this.kpiDialog().open();
  }

  protected closeKpiDialog() {
    this.editingKpi.set(null);
    this.kpiDialog().close();
  }

  protected openRecordDialog() {
    clearControlState(this.recordForm);
    this.recordDialog().open();
  }

  protected closeRecordDialog() {
    this.recordDialog().close();
  }

  protected closeDeleteDialog() {
    this.deletingKpi.set(null);
    this.deleteDialog().close();
  }

  protected handleTableAction(event: { key: string; row: Record<string, unknown> }) {
    if (typeof event.row['kpiId'] !== 'string') {
      return;
    }

    const kpi = this.kpis().find((item) => (item._id || item.id) === event.row['kpiId']);
    if (!kpi) {
      return;
    }

    if (event.key === 'edit') {
      this.openEditDialog(kpi);
      return;
    }

    if (event.key === 'delete') {
      this.openDeleteDialog(kpi);
    }
  }

  protected openEditDialog(kpi: Kpi) {
    this.editingKpi.set(kpi);
    this.kpiForm.reset({
      name: kpi.name,
      description: kpi.description,
      metricType: kpi.metricType,
      direction: kpi.direction,
      targetValue: kpi.targetValue,
      unit: kpi.unit,
      departmentId: typeof kpi.departmentId === 'string' ? kpi.departmentId : kpi.departmentId?._id || '',
    });
    clearControlState(this.kpiForm);
    this.kpiDialog().open();
  }

  protected openDeleteDialog(kpi: Kpi) {
    this.deletingKpi.set(kpi);
    this.deleteDialog().open();
  }

  protected submitKpi() {
    if (this.kpiForm.invalid || this.loading()) {
      touchAllControls(this.kpiForm);
      return;
    }
    const payload = this.kpiForm.getRawValue();
    const normalizedPayload = {
      ...payload,
      metricType: payload.metricType as Kpi['metricType'],
      direction: payload.direction as Kpi['direction'],
      departmentId: payload.departmentId || undefined,
    };
    const currentEdit = this.editingKpi();
    const kpiId = currentEdit?._id || currentEdit?.id;
    const request = currentEdit && kpiId
      ? this.kpisApi.updateKpi(kpiId, normalizedPayload)
      : this.kpisApi.createKpi(normalizedPayload);

    this.loading.set(true);
    request.subscribe({
      next: () => {
        this.loadKpis();
        this.closeKpiDialog();
      },
      complete: () => this.loading.set(false),
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
      kpiId: kpi._id || kpi.id || '',
      name: kpi.name,
      metricTypeLabel: this.metricTypeLabel(kpi.metricType),
      target: `${kpi.targetValue} ${kpi.unit}`,
      department: typeof kpi.departmentId === 'string' ? kpi.departmentId : kpi.departmentId?.name || 'عام',
    }));
  }

  protected confirmDelete() {
    const kpi = this.deletingKpi();
    const kpiId = kpi?._id || kpi?.id;
    if (!kpi || !kpiId || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.kpisApi.deleteKpi(kpiId).subscribe({
      next: () => {
        this.closeDeleteDialog();
        this.loadKpis();
      },
      complete: () => this.loading.set(false),
    });
  }

  private loadData() {
    this.loadKpis();
    this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
    this.lookupsApi.getUsers().subscribe((response) => this.employees.set(response.filter((user) => user.role === 'employee')));
  }

  private loadKpis() {
    this.kpisApi.getKpis().subscribe((response) => this.kpis.set(response));
  }

  private metricTypeLabel(value: Kpi['metricType']) {
    return {
      number: 'رقم',
      percentage: 'نسبة',
      score: 'درجة',
      boolean: 'نعم/لا',
    }[value] || value;
  }
}
