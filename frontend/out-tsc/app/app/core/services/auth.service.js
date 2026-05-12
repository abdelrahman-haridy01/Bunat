import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
const TOKEN_KEY = 'bunat_token';
const USER_KEY = 'bunat_user';
export class AuthService {
    constructor() {
        this.http = inject(HttpClient);
        this.router = inject(Router);
        this.tokenState = signal(localStorage.getItem(TOKEN_KEY), ...(ngDevMode ? [{ debugName: "tokenState" }] : /* istanbul ignore next */ []));
        this.userState = signal(this.readStoredUser(), ...(ngDevMode ? [{ debugName: "userState" }] : /* istanbul ignore next */ []));
        this.token = computed(() => this.tokenState(), ...(ngDevMode ? [{ debugName: "token" }] : /* istanbul ignore next */ []));
        this.currentUser = computed(() => this.userState(), ...(ngDevMode ? [{ debugName: "currentUser" }] : /* istanbul ignore next */ []));
        this.isAuthenticated = computed(() => !!this.tokenState(), ...(ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []));
    }
    login(email, password) {
        return this.http.post(`${environment.apiBaseUrl}/auth/login`, { email, password });
    }
    loadProfile() {
        return this.http.get(`${environment.apiBaseUrl}/auth/me`);
    }
    persistSession(session) {
        localStorage.setItem(TOKEN_KEY, session.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(session.user));
        this.tokenState.set(session.accessToken);
        this.userState.set(session.user);
    }
    updateUser(user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.userState.set(user);
    }
    logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this.tokenState.set(null);
        this.userState.set(null);
        this.router.navigate(['/login']);
    }
    roleHome(role) {
        switch (role) {
            case 'employee':
                return '/employee/dashboard';
            case 'manager':
                return '/manager/dashboard';
            case 'admin':
            case 'hr':
                return '/admin/dashboard';
            default:
                return '/login';
        }
    }
    readStoredUser() {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    }
    static { this.ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=auth.service.js.map