import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class LookupsApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getDepartments() {
        return this.http.get(`${environment.apiBaseUrl}/departments`);
    }
    getTeams() {
        return this.http.get(`${environment.apiBaseUrl}/teams`);
    }
    getSkills() {
        return this.http.get(`${environment.apiBaseUrl}/skills`);
    }
    getKpis() {
        return this.http.get(`${environment.apiBaseUrl}/kpis`);
    }
    getUsers() {
        return this.http.get(`${environment.apiBaseUrl}/users`);
    }
    static { this.ɵfac = function LookupsApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LookupsApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LookupsApiService, factory: LookupsApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LookupsApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=lookups-api.service.js.map