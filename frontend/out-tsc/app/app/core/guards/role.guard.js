import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
export const roleGuard = (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const currentUser = authService.currentUser();
    const allowedRoles = route.data?.['roles'];
    if (!currentUser) {
        return router.parseUrl('/login');
    }
    if (!allowedRoles?.length || allowedRoles.includes(currentUser.role)) {
        return true;
    }
    return router.parseUrl(authService.roleHome(currentUser.role));
};
//# sourceMappingURL=role.guard.js.map