import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  template: `
    <aside class="sidebar card">
      <div class="brand">
        <div class="brand-mark">ب</div>
        <div>
          <strong>بُناة</strong>
          <p>منصة التدريب والتطوير</p>
        </div>
      </div>

      <nav class="nav">
        <a
          *ngFor="let item of items"
          [routerLink]="item.link"
          routerLinkActive="active"
          class="nav-link"
        >
          <app-icon [name]="item.icon || 'dashboard'" [size]="18" />
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  `,
  styles: [
    `
      .sidebar {
        display: grid;
        gap: 1.5rem;
        padding: 1.5rem;
        position: sticky;
        top: 1rem;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .brand p {
        margin: 0.2rem 0 0;
        color: var(--color-secondary-paragraph);
        font-size: 0.9rem;
      }

      .brand-mark {
        width: 3rem;
        height: 3rem;
        border-radius: 1rem;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, var(--color-primary-default), var(--color-secondary-default));
        color: white;
        font-weight: 700;
      }

      .nav {
        display: grid;
        gap: 0.55rem;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.9rem 1rem;
        border-radius: 1rem;
        color: var(--color-primary-paragraph);
        transition: background 180ms ease, color 180ms ease;
      }

      .nav-link.active,
      .nav-link:hover {
        background: var(--color-primary-soft);
        color: var(--color-primary-default);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input({ required: true }) items: Array<{ label: string; link: string; icon?: string }> = [];
}
