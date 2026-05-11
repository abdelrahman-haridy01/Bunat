import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UserSummary } from '../models/domain.models';

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
}

