import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class ReportsApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getEmployeeReport(userId) {
        return this.http.get(`${environment.apiBaseUrl}/reports/employee/${userId}`);
    }
    getManagerDashboard() {
        return this.http.get(`${environment.apiBaseUrl}/reports/manager-dashboard`);
    }
    getAdminDashboard() {
        return this.http.get(`${environment.apiBaseUrl}/reports/admin-dashboard`);
    }
    static { this.ɵfac = function ReportsApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ReportsApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ReportsApiService, factory: ReportsApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReportsApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=reports-api.service.js.map