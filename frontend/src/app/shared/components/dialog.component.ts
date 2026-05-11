import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <dialog #dialogRef class="app-dialog" (click)="onBackdropClick($event)">
      <div class="dialog-surface">
        <div class="dialog-header">
          <div class="label-with-icon">
            <span class="icon-badge" *ngIf="icon">
              <app-icon [name]="icon" [size]="20" />
            </span>
            <div>
              <h2 class="section-title">{{ title }}</h2>
              <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
            </div>
          </div>
          <button class="dialog-close" type="button" (click)="close()" aria-label="إغلاق النافذة">×</button>
        </div>

        <div class="dialog-body">
          <ng-content />
        </div>
      </div>
    </dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() icon = 'sparkles';

  @ViewChild('dialogRef', { static: true }) private readonly dialogRef?: ElementRef<HTMLDialogElement>;

  open() {
    if (!this.dialogRef?.nativeElement.open) {
      this.dialogRef?.nativeElement.showModal();
    }
  }

  close() {
    this.dialogRef?.nativeElement.close();
  }

  protected onBackdropClick(event: MouseEvent) {
    if (event.target === this.dialogRef?.nativeElement) {
      this.close();
    }
  }
}
