import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableAction, TableColumn } from '../../core/models/domain.models';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="table-wrap card">
      <table *ngIf="rows.length; else emptyTemplate">
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column.label }}</th>
            <th *ngIf="actions.length">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">{{ resolve(row, column.key) }}</td>
            <td *ngIf="actions.length" class="actions-cell">
              <div class="table-actions">
                <button
                  *ngFor="let action of actions"
                  type="button"
                  class="table-action"
                  [class.secondary]="action.tone === 'secondary'"
                  [class.ghost]="action.tone === 'ghost'"
                  [class.danger]="action.tone === 'danger'"
                  (click)="actionClicked.emit({ key: action.key, row })"
                >
                  <span class="btn-content">
                    <app-icon *ngIf="action.icon" [name]="action.icon" [size]="16" />
                    <span>{{ action.label }}</span>
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ng-template #emptyTemplate>
        <div class="empty-text">لا توجد سجلات متاحة حالياً.</div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .table-wrap {
        overflow: auto;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 1rem;
        text-align: right;
        border-bottom: 1px solid var(--color-neutral-200);
      }

      th {
        color: var(--color-secondary-paragraph);
        font-size: 0.9rem;
        font-weight: 600;
        background: var(--color-neutral-50);
      }

      .empty-text {
        padding: 1.5rem;
        color: var(--color-secondary-paragraph);
      }

      .actions-cell {
        width: 1%;
        white-space: nowrap;
      }

      .table-actions {
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
      }

      .table-action {
        border: 0;
        border-radius: 999px;
        padding: 0.65rem 0.9rem;
        background: linear-gradient(135deg, var(--color-primary-default), #1a7e53);
        color: var(--color-oncolor-primary);
        cursor: pointer;
      }

      .table-action.secondary {
        background: var(--color-neutral-100);
        color: var(--color-display);
      }

      .table-action.ghost {
        background: transparent;
        color: var(--color-secondary-default);
        border: 1px solid rgba(15, 76, 129, 0.2);
      }

      .table-action.danger {
        background: rgba(180, 35, 24, 0.1);
        color: var(--color-error-default);
        border: 1px solid rgba(180, 35, 24, 0.18);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];
  @Input() actions: TableAction[] = [];
  @Output() actionClicked = new EventEmitter<{ key: string; row: Record<string, unknown> }>();

  resolve(row: Record<string, unknown>, key: string) {
    return key.split('.').reduce<unknown>((value, part) => {
      if (value && typeof value === 'object' && part in value) {
        return (value as Record<string, unknown>)[part];
      }
      return '';
    }, row);
  }
}
