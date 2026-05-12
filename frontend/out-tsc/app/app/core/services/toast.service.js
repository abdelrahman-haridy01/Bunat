import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class ToastService {
    constructor() {
        this.nextId = 1;
        this.defaultDurationMs = 4000;
        this.toastsState = signal([], ...(ngDevMode ? [{ debugName: "toastsState" }] : /* istanbul ignore next */ []));
        this.toasts = this.toastsState.asReadonly();
    }
    success(message, durationMs = this.defaultDurationMs) {
        this.show('success', message, durationMs);
    }
    error(message, durationMs = this.defaultDurationMs + 1000) {
        this.show('error', message, durationMs);
    }
    dismiss(id) {
        this.toastsState.update((items) => items.filter((item) => item.id !== id));
    }
    show(type, message, durationMs) {
        const normalizedMessage = message.trim();
        if (!normalizedMessage) {
            return;
        }
        const id = this.nextId++;
        this.toastsState.update((items) => [...items, { id, type, message: normalizedMessage }]);
        window.setTimeout(() => this.dismiss(id), durationMs);
    }
    static { this.ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=toast.service.js.map