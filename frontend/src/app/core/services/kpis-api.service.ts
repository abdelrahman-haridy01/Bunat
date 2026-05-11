import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Kpi, PerformanceRecord } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class KpisApiService {
  private readonly http = inject(HttpClient);

  getKpis() {
    return this.http.get<Kpi[]>(`${environment.apiBaseUrl}/kpis`);
  }

  createKpi(payload: Partial<Kpi>) {
    return this.http.post<Kpi>(`${environment.apiBaseUrl}/kpis`, payload);
  }

  updateKpi(id: string, payload: Partial<Kpi>) {
    return this.http.patch<Kpi>(`${environment.apiBaseUrl}/kpis/${id}`, payload);
  }

  deleteKpi(id: string) {
    return this.http.delete<{ success: boolean }>(`${environment.apiBaseUrl}/kpis/${id}`);
  }

  createPerformanceRecord(payload: Partial<PerformanceRecord> & { userId: string; kpiId: string }) {
    return this.http.post<PerformanceRecord>(`${environment.apiBaseUrl}/performance-records`, payload);
  }
}
