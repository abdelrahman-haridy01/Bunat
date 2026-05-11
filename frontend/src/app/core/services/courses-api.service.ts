import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Course, Lesson } from '../models/domain.models';

@Injectable({ providedIn: 'root' })
export class CoursesApiService {
  private readonly http = inject(HttpClient);

  getCourses() {
    return this.http.get<Course[]>(`${environment.apiBaseUrl}/courses`);
  }

  getCourse(id: string) {
    return this.http.get<Course>(`${environment.apiBaseUrl}/courses/${id}`);
  }

  createCourse(payload: Partial<Course>) {
    return this.http.post<Course>(`${environment.apiBaseUrl}/courses`, payload);
  }

  updateCourse(id: string, payload: Partial<Course>) {
    return this.http.patch<Course>(`${environment.apiBaseUrl}/courses/${id}`, payload);
  }

  getLessons(courseId: string) {
    return this.http.get<Lesson[]>(`${environment.apiBaseUrl}/courses/${courseId}/lessons`);
  }

  createLesson(payload: Partial<Lesson> & { courseId: string; title: string; contentType: string }) {
    return this.http.post<Lesson>(`${environment.apiBaseUrl}/lessons`, payload);
  }

  completeLesson(id: string, timeSpentMinutes?: number) {
    return this.http.post(`${environment.apiBaseUrl}/lessons/${id}/complete`, { timeSpentMinutes });
  }
}
