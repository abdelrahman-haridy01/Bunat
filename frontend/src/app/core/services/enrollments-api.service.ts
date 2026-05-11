import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Enrollment } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class EnrollmentsApiService {
  private readonly http = inject(HttpClient);

  getMyEnrollments() {
    return this.http.get<Enrollment[]>(`${environment.apiBaseUrl}/enrollments/my`);
  }

  getTeamEnrollments() {
    return this.http.get<Enrollment[]>(`${environment.apiBaseUrl}/enrollments/team`);
  }

  assign(payload: { userId: string; courseId: string; dueDate?: string | null }) {
    return this.http.post<Enrollment>(`${environment.apiBaseUrl}/enrollments/assign`, payload);
  }
}

