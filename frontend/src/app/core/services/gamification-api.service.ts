import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GamificationApiService {
  private readonly http = inject(HttpClient);

  getMyGamification() {
    return this.http.get(`${environment.apiBaseUrl}/gamification/me`);
  }

  getLeaderboard() {
    return this.http.get(`${environment.apiBaseUrl}/gamification/leaderboard`);
  }
}

