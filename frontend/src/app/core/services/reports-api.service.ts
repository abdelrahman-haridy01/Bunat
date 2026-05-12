import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AdminDashboard, EmployeeReport, ManagerDashboard } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class ReportsApiService {
  private readonly http = inject(HttpClient);

  getEmployeeReport(userId: string) {
    return this.http.get<EmployeeReport>(`${environment.apiBaseUrl}/reports/employee/${userId}`);
  }

  getManagerDashboard() {
    return this.http.get<ManagerDashboard>(`${environment.apiBaseUrl}/reports/manager-dashboard`);
  }

  getAdminDashboard() {
    return this.http.get<AdminDashboard>(`${environment.apiBaseUrl}/reports/admin-dashboard`);
  }
}
