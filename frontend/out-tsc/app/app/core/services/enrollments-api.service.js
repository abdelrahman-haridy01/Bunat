import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class EnrollmentsApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getMyEnrollments() {
        return this.http.get(`${environment.apiBaseUrl}/enrollments/my`);
    }
    getTeamEnrollments() {
        return this.http.get(`${environment.apiBaseUrl}/enrollments/team`);
    }
    assign(payload) {
        return this.http.post(`${environment.apiBaseUrl}/enrollments/assign`, payload);
    }
    deleteEnrollment(id) {
        return this.http.delete(`${environment.apiBaseUrl}/enrollments/${id}`);
    }
    static { this.ɵfac = function EnrollmentsApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EnrollmentsApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: EnrollmentsApiService, factory: EnrollmentsApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EnrollmentsApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=enrollments-api.service.js.map