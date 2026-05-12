import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class KpisApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getKpis() {
        return this.http.get(`${environment.apiBaseUrl}/kpis`);
    }
    createKpi(payload) {
        return this.http.post(`${environment.apiBaseUrl}/kpis`, payload);
    }
    updateKpi(id, payload) {
        return this.http.patch(`${environment.apiBaseUrl}/kpis/${id}`, payload);
    }
    deleteKpi(id) {
        return this.http.delete(`${environment.apiBaseUrl}/kpis/${id}`);
    }
    createPerformanceRecord(payload) {
        return this.http.post(`${environment.apiBaseUrl}/performance-records`, payload);
    }
    static { this.ɵfac = function KpisApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KpisApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: KpisApiService, factory: KpisApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KpisApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=kpis-api.service.js.map