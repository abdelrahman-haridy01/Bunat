import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Kpi, UserSummary } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class LookupsApiService {
  private readonly http = inject(HttpClient);

  getDepartments() {
    return this.http.get<Array<{ _id: string; name: string }>>(`${environment.apiBaseUrl}/departments`);
  }

  getTeams() {
    return this.http.get<Array<{ _id: string; name: string }>>(`${environment.apiBaseUrl}/teams`);
  }

  getSkills() {
    return this.http.get<Array<{ _id: string; name: string }>>(`${environment.apiBaseUrl}/skills`);
  }

  getKpis() {
    return this.http.get<Kpi[]>(`${environment.apiBaseUrl}/kpis`);
  }

  getUsers() {
    return this.http.get<UserSummary[]>(`${environment.apiBaseUrl}/users`);
  }
}

