import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AiSettings, UserSummary } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<UserSummary[]>(`${environment.apiBaseUrl}/users`);
  }

  getUser(id: string) {
    return this.http.get<UserSummary>(`${environment.apiBaseUrl}/users/${id}`);
  }

  createUser(payload: Partial<UserSummary> & { password: string }) {
    return this.http.post<UserSummary>(`${environment.apiBaseUrl}/users`, payload);
  }

  updateUser(id: string, payload: Partial<UserSummary> & { password?: string }) {
    return this.http.patch<UserSummary>(`${environment.apiBaseUrl}/users/${id}`, payload);
  }

  deleteUser(id: string) {
    return this.http.delete<{ success: boolean }>(`${environment.apiBaseUrl}/users/${id}`);
  }

  getAiSettings() {
    return this.http.get<AiSettings>(`${environment.apiBaseUrl}/users/me/ai-settings`);
  }

  updateAiSettings(payload: Partial<AiSettings> & { apiKey?: string }) {
    return this.http.patch<AiSettings>(`${environment.apiBaseUrl}/users/me/ai-settings`, payload);
  }

  deleteAiSettingsApiKey() {
    return this.http.delete<{ success: boolean }>(`${environment.apiBaseUrl}/users/me/ai-settings/api-key`);
  }
}
