import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.currentUser();
  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (!currentUser) {
    return router.parseUrl('/login');
  }

  if (!allowedRoles?.length || allowedRoles.includes(currentUser.role)) {
    return true;
  }

  return router.parseUrl(authService.roleHome(currentUser.role));
};

