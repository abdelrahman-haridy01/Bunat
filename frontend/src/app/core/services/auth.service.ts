import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthResponse, UserRole, UserSummary } from '../models/domain.models';

const TOKEN_KEY = 'bunat_token';
const USER_KEY = 'bunat_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly tokenState = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly userState = signal<UserSummary | null>(this.readStoredUser());

  readonly token = computed(() => this.tokenState());
  readonly currentUser = computed(() => this.userState());
  readonly isAuthenticated = computed(() => !!this.tokenState());

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/auth/login`, { email, password });
  }

  loadProfile() {
    return this.http.get<UserSummary>(`${environment.apiBaseUrl}/auth/me`);
  }

  persistSession(session: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, session.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    this.tokenState.set(session.accessToken);
    this.userState.set(session.user);
  }

  updateUser(user: UserSummary) {
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

  roleHome(role?: UserRole | null) {
    switch (role) {
      case 'employee':
        return '/employee/dashboard';
      case 'manager':
        return '/manager/dashboard';
      case 'admin':
      case 'hr':
        return '/admin/dashboard';
      case 'course_manager':
        return '/content/courses';
      default:
        return '/login';
    }
  }

  private readStoredUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as UserSummary) : null;
  }
}
