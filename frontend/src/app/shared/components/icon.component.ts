import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      class="app-icon"
      [attr.viewBox]="'0 0 24 24'"
      [style.width.px]="size"
      [style.height.px]="size"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      [attr.stroke-width]="strokeWidth"
      aria-hidden="true"
    >
      <ng-container [ngSwitch]="name">
        <ng-container *ngSwitchCase="'dashboard'">
          <path d="M3 13h8V3H3z" />
          <path d="M13 21h8v-6h-8z" />
          <path d="M13 11h8V3h-8z" />
          <path d="M3 21h8v-4H3z" />
        </ng-container>
        <ng-container *ngSwitchCase="'users'">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </ng-container>
        <ng-container *ngSwitchCase="'user'">
          <path d="M20 21a8 8 0 1 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </ng-container>
        <ng-container *ngSwitchCase="'user-plus'">
          <path d="M20 21a8 8 0 0 0-14.92-4" />
          <circle cx="10" cy="7" r="4" />
          <path d="M19 8v6" />
          <path d="M22 11h-6" />
        </ng-container>
        <ng-container *ngSwitchCase="'book'">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </ng-container>
        <ng-container *ngSwitchCase="'book-open'">
          <path d="M2 7.5A2.5 2.5 0 0 1 4.5 5H10v15H4.5A2.5 2.5 0 0 0 2 22z" />
          <path d="M22 7.5A2.5 2.5 0 0 0 19.5 5H14v15h5.5A2.5 2.5 0 0 1 22 22z" />
        </ng-container>
        <ng-container *ngSwitchCase="'graduation'">
          <path d="M3 8.5 12 4l9 4.5-9 4.5z" />
          <path d="M7 10.5V15c0 1.7 2.24 3 5 3s5-1.3 5-3v-4.5" />
          <path d="M21 10v6" />
        </ng-container>
        <ng-container *ngSwitchCase="'target'">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
        </ng-container>
        <ng-container *ngSwitchCase="'chart'">
          <path d="M3 3v18h18" />
          <path d="m7 14 4-4 3 3 5-7" />
        </ng-container>
        <ng-container *ngSwitchCase="'chart-bars'">
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20v-3" />
        </ng-container>
        <ng-container *ngSwitchCase="'team'">
          <circle cx="9" cy="7" r="4" />
          <path d="M17 11a4 4 0 1 0 0-8" />
          <path d="M3 21a6 6 0 0 1 12 0" />
          <path d="M15 21a6 6 0 0 1 6-6" />
        </ng-container>
        <ng-container *ngSwitchCase="'award'">
          <circle cx="12" cy="8" r="6" />
          <path d="m8.21 13.89-1.42 7.11L12 18l5.21 3-1.42-7.11" />
        </ng-container>
        <ng-container *ngSwitchCase="'shield'">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </ng-container>
        <ng-container *ngSwitchCase="'logout'">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5" />
          <path d="M21 12H9" />
        </ng-container>
        <ng-container *ngSwitchCase="'sparkles'">
          <path d="m12 3 1.9 4.1L18 9l-4.1 1.9L12 15l-1.9-4.1L6 9l4.1-1.9z" />
          <path d="M5 3v4" />
          <path d="M3 5h4" />
          <path d="M19 16v5" />
          <path d="M16.5 18.5h5" />
        </ng-container>
        <ng-container *ngSwitchCase="'alert'">
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        </ng-container>
        <ng-container *ngSwitchCase="'folder-check'">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="m9 13 2 2 4-4" />
        </ng-container>
        <ng-container *ngSwitchCase="'calendar'">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 10h18" />
        </ng-container>
        <ng-container *ngSwitchCase="'eye'">
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
          <circle cx="12" cy="12" r="3" />
        </ng-container>
        <ng-container *ngSwitchCase="'flag'">
          <path d="M5 21V5" />
          <path d="M5 5c5-3 9 3 14 0v9c-5 3-9-3-14 0" />
        </ng-container>
        <ng-container *ngSwitchCase="'briefcase'">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </ng-container>
        <ng-container *ngSwitchCase="'mail'">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </ng-container>
        <ng-container *ngSwitchDefault>
          <circle cx="12" cy="12" r="8" />
        </ng-container>
      </ng-container>
    </svg>
  `,
  styles: [
    `
      .app-icon {
        flex: 0 0 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true }) name = 'dashboard';
  @Input() size = 20;
  @Input() strokeWidth = 1.8;
}
