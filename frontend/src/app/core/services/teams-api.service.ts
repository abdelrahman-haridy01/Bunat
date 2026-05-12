import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { TeamSummary } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class TeamsApiService {
  private readonly http = inject(HttpClient);

  getTeams() {
    return this.http.get<TeamSummary[]>(`${environment.apiBaseUrl}/teams`);
  }

  createTeam(payload: { name: string; departmentId: string; managerId?: string; members?: string[] }) {
    return this.http.post<TeamSummary>(`${environment.apiBaseUrl}/teams`, payload);
  }

  updateTeam(id: string, payload: { name?: string; departmentId?: string; managerId?: string; members?: string[] }) {
    return this.http.patch<TeamSummary>(`${environment.apiBaseUrl}/teams/${id}`, payload);
  }

  deleteTeam(id: string) {
    return this.http.delete<{ success: boolean }>(`${environment.apiBaseUrl}/teams/${id}`);
  }
}
