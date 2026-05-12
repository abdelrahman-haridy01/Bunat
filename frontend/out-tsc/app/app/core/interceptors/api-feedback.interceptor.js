import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ToastService } from '../services/toast.service';
export const apiFeedbackInterceptor = (request, next) => {
    const toastService = inject(ToastService);
    return next(request).pipe(tap({
        next: (event) => {
            if (!(event instanceof HttpResponse) || event.type !== HttpEventType.Response) {
                return;
            }
            if (!shouldShowSuccess(request.method)) {
                return;
            }
            toastService.success(extractSuccessMessage(event.body, request.method, request.url));
        },
        error: (error) => {
            if (!(error instanceof HttpErrorResponse)) {
                toastService.error('حدث خطأ غير متوقع. حاول مرة أخرى.');
                return;
            }
            toastService.error(extractErrorMessage(error));
        },
    }));
};
function shouldShowSuccess(method) {
    return ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method.toUpperCase());
}
function extractSuccessMessage(body, method, url) {
    if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
        return body.message;
    }
    if (url.includes('/auth/login')) {
        return 'تم تسجيل الدخول بنجاح.';
    }
    switch (method.toUpperCase()) {
        case 'POST':
            return 'تمت العملية بنجاح.';
        case 'PATCH':
        case 'PUT':
            return 'تم تحديث البيانات بنجاح.';
        case 'DELETE':
            return 'تم الحذف بنجاح.';
        default:
            return 'تمت العملية بنجاح.';
    }
}
function extractErrorMessage(error) {
    if (error.status === 0) {
        return 'تعذر الاتصال بالخادم. تحقق من الشبكة ثم حاول مرة أخرى.';
    }
    const payload = error.error;
    if (typeof payload === 'string' && payload.trim()) {
        return payload;
    }
    if (payload && typeof payload === 'object') {
        if (Array.isArray(payload.message) && payload.message.length) {
            return payload.message.join('، ');
        }
        if (typeof payload.message === 'string' && payload.message.trim()) {
            return payload.message;
        }
        if (typeof payload.error === 'string' && payload.error.trim()) {
            return payload.error;
        }
    }
    return 'تعذر تنفيذ الطلب. حاول مرة أخرى.';
}
//# sourceMappingURL=api-feedback.interceptor.js.map