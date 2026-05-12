import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TeamSummary, UserSummary } from '../../../core/models/domain.models';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { TeamsApiService } from '../../../core/services/teams-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import {
  clearControlState,
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

@Component({
  selector: 'app-teams-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="team" [size]="20" /></span>
              <span>إدارة الفرق والأعضاء</span>
            </h2>
            <p class="section-subtitle">أنشئ الفرق، حدّد المدير، ووزّع الأعضاء من مكان واحد.</p>
          </div>
          <div class="panel-actions">
            <button class="btn btn-primary" type="button" (click)="openCreateDialog()">
              <span class="btn-content">
                <app-icon name="team" [size]="18" />
                <span>إضافة فريق</span>
              </span>
            </button>
          </div>
        </div>
      </article>

      <article class="card panel">
        <h2 class="section-title">الفرق الحالية</h2>
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #teamDialog
        [title]="isEditMode() ? 'تعديل الفريق' : 'إضافة فريق'"
        [subtitle]="
          isEditMode()
            ? 'حدّث المدير أو أعضاء الفريق مع مزامنة العضويات مباشرة.'
            : 'أنشئ فريقاً جديداً وحدد الأعضاء التابعين له.'
        "
        icon="team"
      >
        <form class="dialog-form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>اسم الفريق</label>
              <input formControlName="name" [class.is-invalid]="hasVisibleError(form.controls.name)" />
              <div class="field-error" *ngIf="hasVisibleError(form.controls.name)">
                {{ getVisibleErrorMessage(form.controls.name, validationMessages.name) }}
              </div>
            </div>

            <div class="field">
              <label>القسم</label>
              <select formControlName="departmentId" [class.is-invalid]="hasVisibleError(form.controls.departmentId)">
                <option value="">اختر القسم</option>
                <option *ngFor="let department of departments()" [value]="department._id">{{ department.name }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(form.controls.departmentId)">
                {{ getVisibleErrorMessage(form.controls.departmentId, validationMessages.departmentId) }}
              </div>
            </div>

            <div class="field">
              <label>مدير الفريق</label>
              <select formControlName="managerId">
                <option value="">بدون مدير محدد</option>
                <option *ngFor="let manager of availableManagers()" [value]="manager._id || manager.id">
                  {{ manager.fullName }}
                </option>
              </select>
            </div>
          </div>

          <div class="member-section">
            <div class="member-section__header">
              <div>
                <h3 class="section-title">أعضاء الفريق</h3>
                <p class="section-subtitle">اختر الموظفين الذين يجب ربطهم بهذا الفريق.</p>
              </div>
              <span class="member-count">{{ form.controls.members.value.length }} عضو</span>
            </div>

            <div class="member-grid" *ngIf="availableEmployees().length; else noEmployees">
              <label class="member-option" *ngFor="let employee of availableEmployees()">
                <input
                  type="checkbox"
                  [checked]="isSelectedMember(extractId(employee))"
                  (change)="toggleMember(extractId(employee), $any($event.target).checked)"
                />
                <span class="member-option__copy">
                  <strong>{{ employee.fullName }}</strong>
                  <span>{{ employee.jobTitle }}</span>
                  <small *ngIf="teamName(employee.teamId)">الفريق الحالي: {{ teamName(employee.teamId) }}</small>
                </span>
              </label>
            </div>

            <ng-template #noEmployees>
              <div class="message-box">لا يوجد موظفون متاحون للاختيار حالياً.</div>
            </ng-template>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeTeamDialog()">إلغاء</button>
            <button class="btn btn-primary" type="submit" [disabled]="loading()">
              {{ loading() ? 'جارٍ الحفظ...' : (isEditMode() ? 'حفظ التعديلات' : 'إضافة الفريق') }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #deleteDialog
        title="تأكيد حذف الفريق"
        subtitle="سيتم فك ارتباط الأعضاء من هذا الفريق قبل الحذف."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف الفريق
            <strong *ngIf="deletingTeam() as team">{{ team.name }}</strong>
            ؟
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
  styles: [
    `
      .panel {
        padding: 1.5rem;
      }

      .member-section {
        display: grid;
        gap: 1rem;
      }

      .member-section__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .member-count {
        padding: 0.45rem 0.8rem;
        border-radius: 999px;
        background: var(--color-primary-soft);
        color: var(--color-primary-default);
        font-weight: 600;
      }

      .member-grid {
        display: grid;
        gap: 0.85rem;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }

      .member-option {
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
        padding: 1rem;
        border: 1px solid var(--color-neutral-200);
        border-radius: 1rem;
        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);
      }

      .member-option input {
        margin-top: 0.2rem;
      }

      .member-option__copy {
        display: grid;
        gap: 0.2rem;
      }

      .member-option__copy strong {
        color: var(--color-display);
      }

      .member-option__copy span,
      .member-option__copy small {
        color: var(--color-secondary-paragraph);
      }

      .message-box {
        padding: 1rem 1.1rem;
        border-radius: 1rem;
        background: var(--color-neutral-50);
        color: var(--color-secondary-paragraph);
      }

      .message-box.error {
        background: var(--color-error-light);
        color: var(--color-error-default);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly teamsApi = inject(TeamsApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly teamDialog = viewChild.required<DialogComponent>('teamDialog');
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly teams = signal<TeamSummary[]>([]);
  protected readonly users = signal<UserSummary[]>([]);
  protected readonly departments = signal<Array<{ _id: string; name: string }>>([]);
  protected readonly loading = signal(false);
  protected readonly editingTeam = signal<TeamSummary | null>(null);
  protected readonly deletingTeam = signal<TeamSummary | null>(null);
  protected readonly isEditMode = computed(() => !!this.editingTeam());
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly validationMessages = {
    name: { required: 'أدخل اسم الفريق.' },
    departmentId: { required: 'اختر القسم.' },
  };
  protected readonly columns = [
    { key: 'name', label: 'الفريق' },
    { key: 'department', label: 'القسم' },
    { key: 'manager', label: 'المدير' },
    { key: 'membersCount', label: 'عدد الأعضاء' },
    { key: 'membersPreview', label: 'الأعضاء' },
  ];
  protected readonly actions = [
    { key: 'edit', label: 'تعديل', icon: 'team', tone: 'ghost' as const },
    { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' as const },
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    departmentId: ['', Validators.required],
    managerId: [''],
    members: this.fb.nonNullable.control<string[]>([]),
  });

  ngOnInit() {
    this.loadData();
  }

  protected openCreateDialog() {
    this.editingTeam.set(null);
    this.form.reset({
      name: '',
      departmentId: '',
      managerId: '',
      members: [],
    });
    clearControlState(this.form);
    this.teamDialog().open();
  }

  protected openEditDialog(team: TeamSummary) {
    this.editingTeam.set(team);
    this.form.reset({
      name: team.name,
      departmentId: this.extractLookupId(team.departmentId),
      managerId: this.extractLookupId(team.managerId),
      members: (team.members ?? []).map((member) => this.extractLookupId(member)).filter(Boolean),
    });
    clearControlState(this.form);
    this.teamDialog().open();
  }

  protected closeTeamDialog() {
    this.teamDialog().close();
  }

  protected openDeleteDialog(team: TeamSummary) {
    this.deletingTeam.set(team);
    this.deleteDialog().open();
  }

  protected closeDeleteDialog() {
    this.deletingTeam.set(null);
    this.deleteDialog().close();
  }

  protected handleTableAction(event: { key: string; row: Record<string, unknown> }) {
    const teamId = String(event.row['teamId'] || '');
    const team = this.teams().find((item) => this.extractId(item) === teamId);
    if (!team) {
      return;
    }

    if (event.key === 'edit') {
      this.openEditDialog(team);
      return;
    }

    if (event.key === 'delete') {
      this.openDeleteDialog(team);
    }
  }

  protected submit() {
    if (this.form.invalid || this.loading()) {
      touchAllControls(this.form);
      return;
    }

    this.loading.set(true);
    const payload = this.form.getRawValue();
    const requestPayload = {
      name: payload.name,
      departmentId: payload.departmentId,
      managerId: payload.managerId || undefined,
      members: payload.members,
    };
    const editingTeam = this.editingTeam();

    const request$ = editingTeam
      ? this.teamsApi.updateTeam(this.extractId(editingTeam), requestPayload)
      : this.teamsApi.createTeam(requestPayload);

    request$.subscribe({
      next: () => {
        this.closeTeamDialog();
        this.loadData();
      },
      complete: () => this.loading.set(false),
    });
  }

  protected confirmDelete() {
    const team = this.deletingTeam();
    const teamId = team ? this.extractId(team) : '';
    if (!teamId || this.loading()) {
      return;
    }

    this.loading.set(true);
    this.teamsApi.deleteTeam(teamId).subscribe({
      next: () => {
        this.closeDeleteDialog();
        this.loadData();
      },
      complete: () => this.loading.set(false),
    });
  }

  protected rows() {
    return this.teams().map((team) => {
      const memberNames = (team.members ?? [])
        .map((member) => this.userName(member))
        .filter(Boolean);

      return {
        teamId: this.extractId(team),
        name: team.name,
        department: this.lookupName(team.departmentId),
        manager: this.userName(team.managerId) || '-',
        membersCount: memberNames.length,
        membersPreview: memberNames.length ? memberNames.slice(0, 3).join('، ') : '-',
      };
    });
  }

  protected availableManagers() {
    const selectedDepartmentId = this.form.controls.departmentId.value;
    return this.users()
      .filter((user) => user.role === 'manager')
      .filter((user) => !selectedDepartmentId || this.extractLookupId(user.departmentId) === selectedDepartmentId);
  }

  protected availableEmployees() {
    return this.users().filter((user) => user.role === 'employee');
  }

  protected toggleMember(memberId: string, checked: boolean) {
    const currentMembers = this.form.controls.members.value;
    const nextMembers = checked
      ? Array.from(new Set([...currentMembers, memberId]))
      : currentMembers.filter((id) => id !== memberId);

    this.form.controls.members.setValue(nextMembers);
    this.form.controls.members.markAsDirty();
  }

  protected isSelectedMember(memberId: string) {
    return this.form.controls.members.value.includes(memberId);
  }

  protected teamName(teamValue: UserSummary['teamId']) {
    if (!teamValue) {
      return '';
    }

    if (typeof teamValue === 'string') {
      return this.teams().find((team) => this.extractId(team) === teamValue)?.name || '';
    }

    return teamValue.name || '';
  }

  protected extractId(value: { _id?: string; id?: string } | null | undefined) {
    return value?._id || value?.id || '';
  }

  protected extractLookupId(value: unknown) {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object') {
      const record = value as Record<string, unknown>;
      return String(record['_id'] ?? record['id'] ?? '');
    }

    return String(value);
  }

  protected lookupName(value: TeamSummary['departmentId']) {
    if (!value) {
      return '-';
    }

    if (typeof value === 'string') {
      return this.departments().find((department) => department._id === value)?.name || value;
    }

    return value.name || '-';
  }

  protected userName(value: UserSummary | string | null | undefined) {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return this.users().find((user) => this.extractId(user) === value)?.fullName || value;
    }

    return value.fullName || '';
  }

  private loadData() {
    this.teamsApi.getTeams().subscribe((response) => this.teams.set(response));
    this.lookupsApi.getDepartments().subscribe((response) => this.departments.set(response));
    this.lookupsApi.getUsers().subscribe((response) => this.users.set(response));
  }
}
