import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const authInterceptor = (request, next) => {
    const authService = inject(AuthService);
    const token = authService.token();
    if (!token) {
        return next(request);
    }
    return next(request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    }));
};
//# sourceMappingURL=auth.interceptor.js.map