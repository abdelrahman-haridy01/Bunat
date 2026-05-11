import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportsApiService {
  private readonly http = inject(HttpClient);

  getEmployeeReport(userId: string) {
    return this.http.get(`${environment.apiBaseUrl}/reports/employee/${userId}`);
  }

  getManagerDashboard() {
    return this.http.get(`${environment.apiBaseUrl}/reports/manager-dashboard`);
  }

  getAdminDashboard() {
    return this.http.get(`${environment.apiBaseUrl}/reports/admin-dashboard`);
  }
}

