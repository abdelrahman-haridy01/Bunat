import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class UsersApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getUsers() {
        return this.http.get(`${environment.apiBaseUrl}/users`);
    }
    getUser(id) {
        return this.http.get(`${environment.apiBaseUrl}/users/${id}`);
    }
    createUser(payload) {
        return this.http.post(`${environment.apiBaseUrl}/users`, payload);
    }
    updateUser(id, payload) {
        return this.http.patch(`${environment.apiBaseUrl}/users/${id}`, payload);
    }
    deleteUser(id) {
        return this.http.delete(`${environment.apiBaseUrl}/users/${id}`);
    }
    getAiSettings() {
        return this.http.get(`${environment.apiBaseUrl}/users/me/ai-settings`);
    }
    updateAiSettings(payload) {
        return this.http.patch(`${environment.apiBaseUrl}/users/me/ai-settings`, payload);
    }
    deleteAiSettingsApiKey() {
        return this.http.delete(`${environment.apiBaseUrl}/users/me/ai-settings/api-key`);
    }
    static { this.ɵfac = function UsersApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UsersApiService, factory: UsersApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=users-api.service.js.map