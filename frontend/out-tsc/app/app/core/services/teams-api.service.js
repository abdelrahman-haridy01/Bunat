import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class TeamsApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getTeams() {
        return this.http.get(`${environment.apiBaseUrl}/teams`);
    }
    createTeam(payload) {
        return this.http.post(`${environment.apiBaseUrl}/teams`, payload);
    }
    updateTeam(id, payload) {
        return this.http.patch(`${environment.apiBaseUrl}/teams/${id}`, payload);
    }
    deleteTeam(id) {
        return this.http.delete(`${environment.apiBaseUrl}/teams/${id}`);
    }
    static { this.ɵfac = function TeamsApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TeamsApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TeamsApiService, factory: TeamsApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TeamsApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=teams-api.service.js.map