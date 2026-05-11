import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableColumn } from '../../core/models/domain.models';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrap card">
      <table *ngIf="rows.length; else emptyTemplate">
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column.label }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">{{ resolve(row, column.key) }}</td>
          </tr>
        </tbody>
      </table>
      <ng-template #emptyTemplate>
        <div class="empty-text">لا توجد سجلات لعرضها حالياً.</div>
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Input({ required: true }) columns: TableColumn[] = [];
  @Input() rows: Record<string, unknown>[] = [];

  resolve(row: Record<string, unknown>, key: string) {
    return key.split('.').reduce<unknown>((value, part) => {
      if (value && typeof value === 'object' && part in value) {
        return (value as Record<string, unknown>)[part];
      }
      return '';
    }, row);
  }
}

