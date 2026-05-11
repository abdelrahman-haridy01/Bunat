import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="shell">
      <app-sidebar [items]="navItems()" />
      <main class="content">
        <app-header [title]="pageTitle()" [eyebrow]="eyebrow()" />
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .shell {
        display: grid;
        grid-template-columns: 280px minmax(0, 1fr);
        gap: 1rem;
        padding: 1rem;
      }

      .content {
        display: grid;
        gap: 1rem;
      }

      @media (max-width: 1100px) {
        .shell {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly routeTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }

        const data = route.snapshot?.data ?? {};

        return {
          title: data['title'] as string | undefined,
          eyebrow: data['eyebrow'] as string | undefined,
        };
      }),
    ),
    { initialValue: { title: 'لوحة التحكم', eyebrow: 'بُناة' } },
  );

  protected readonly navItems = computed(() => {
    const role = this.authService.currentUser()?.role;
    if (role === 'employee') {
      return [
        { label: 'الرئيسية', link: '/employee/dashboard' },
        { label: 'الدورات', link: '/employee/courses' },
        { label: 'تقدمي', link: '/employee/progress' },
      ];
    }

    if (role === 'manager') {
      return [
        { label: 'الرئيسية', link: '/manager/dashboard' },
        { label: 'الفريق', link: '/manager/team' },
      ];
    }

    return [
      { label: 'الرئيسية', link: '/admin/dashboard' },
      { label: 'المستخدمون', link: '/admin/users' },
      { label: 'الدورات', link: '/admin/courses' },
      { label: 'المؤشرات', link: '/admin/kpis' },
      { label: 'التكليفات', link: '/admin/assignments' },
    ];
  });

  protected readonly pageTitle = computed(() => this.routeTitle().title ?? 'لوحة التحكم');
  protected readonly eyebrow = computed(() => this.routeTitle().eyebrow ?? 'بُناة');
}
