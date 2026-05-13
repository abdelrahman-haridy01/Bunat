import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import * as i0 from "@angular/core";
export class AppShellComponent {
    constructor() {
        this.authService = inject(AuthService);
        this.router = inject(Router);
        this.activatedRoute = inject(ActivatedRoute);
        this.routeTitle = toSignal(this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), map(() => {
            let route = this.activatedRoute;
            while (route.firstChild) {
                route = route.firstChild;
            }
            const data = route.snapshot?.data ?? {};
            return {
                title: data['title'],
                eyebrow: data['eyebrow'],
            };
        })), { initialValue: { title: 'لوحة التحكم', eyebrow: 'بُناة' } });
        this.navItems = computed(() => {
            const role = this.authService.currentUser()?.role;
            if (role === 'employee') {
                return [
                    { label: 'الرئيسية', link: '/employee/dashboard', icon: 'dashboard' },
                    { label: 'الدورات', link: '/employee/courses', icon: 'book-open' },
                    { label: 'تقدمي', link: '/employee/progress', icon: 'chart' },
                ];
            }
            if (role === 'manager') {
                return [
                    { label: 'الرئيسية', link: '/manager/dashboard', icon: 'dashboard' },
                    { label: 'الفريق', link: '/manager/team', icon: 'team' },
                ];
            }
            if (role === 'course_manager') {
                return [
                    { label: 'الدورات', link: '/content/courses', icon: 'book-open' },
                    { label: 'الإعدادات', link: '/content/settings', icon: 'shield' },
                ];
            }
            return [
                { label: 'الرئيسية', link: '/admin/dashboard', icon: 'dashboard' },
                { label: 'المستخدمون', link: '/admin/users', icon: 'users' },
                { label: 'الفرق', link: '/admin/teams', icon: 'team' },
                { label: 'الدورات', link: '/admin/courses', icon: 'book-open' },
                { label: 'المؤشرات', link: '/admin/kpis', icon: 'target' },
                { label: 'التكليفات', link: '/admin/assignments', icon: 'calendar' },
                { label: 'الإعدادات', link: '/admin/settings', icon: 'shield' },
            ];
        }, ...(ngDevMode ? [{ debugName: "navItems" }] : /* istanbul ignore next */ []));
        this.pageTitle = computed(() => this.routeTitle().title ?? 'لوحة التحكم', ...(ngDevMode ? [{ debugName: "pageTitle" }] : /* istanbul ignore next */ []));
        this.eyebrow = computed(() => this.routeTitle().eyebrow ?? 'بُناة', ...(ngDevMode ? [{ debugName: "eyebrow" }] : /* istanbul ignore next */ []));
    }
    static { this.ɵfac = function AppShellComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppShellComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppShellComponent, selectors: [["app-app-shell"]], decls: 5, vars: 3, consts: [[1, "shell"], [3, "items"], [1, "content"], [3, "title", "eyebrow"]], template: function AppShellComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵelement(1, "app-sidebar", 1);
            i0.ɵɵelementStart(2, "main", 2);
            i0.ɵɵelement(3, "app-header", 3)(4, "router-outlet");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵproperty("items", ctx.navItems());
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("title", ctx.pageTitle())("eyebrow", ctx.eyebrow());
        } }, dependencies: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent], styles: [".shell[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: 280px minmax(0, 1fr);\n        gap: 1rem;\n        padding: 1rem;\n      }\n\n      .content[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      @media (max-width: 1100px) {\n        .shell[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppShellComponent, [{
        type: Component,
        args: [{ selector: 'app-app-shell', standalone: true, imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent], template: `
    <div class="shell">
      <app-sidebar [items]="navItems()" />
      <main class="content">
        <app-header [title]="pageTitle()" [eyebrow]="eyebrow()" />
        <router-outlet />
      </main>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .shell {\n        display: grid;\n        grid-template-columns: 280px minmax(0, 1fr);\n        gap: 1rem;\n        padding: 1rem;\n      }\n\n      .content {\n        display: grid;\n        gap: 1rem;\n      }\n\n      @media (max-width: 1100px) {\n        .shell {\n          grid-template-columns: 1fr;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppShellComponent, { className: "AppShellComponent", filePath: "src/app/shared/components/app-shell.component.ts", lineNumber: 47 }); })();
//# sourceMappingURL=app-shell.component.js.map