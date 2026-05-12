import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class GamificationApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getMyGamification() {
        return this.http.get(`${environment.apiBaseUrl}/gamification/me`);
    }
    getLeaderboard() {
        return this.http.get(`${environment.apiBaseUrl}/gamification/leaderboard`);
    }
    static { this.ɵfac = function GamificationApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GamificationApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: GamificationApiService, factory: GamificationApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GamificationApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=gamification-api.service.js.map