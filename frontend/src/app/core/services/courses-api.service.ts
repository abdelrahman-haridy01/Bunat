import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { environment } from '../../../environments/environment';
import {
  AiCourseDraftRequest,
  AiCourseDraftResponse,
  Course,
  Lesson,
  LessonQuiz,
} from '../models/domain.models';

type LessonMutationPayload = Partial<Lesson> & {
  courseId: string;
  title: string;
  contentType: Lesson['contentType'];
  quiz?: LessonQuiz | null;
};

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

  deleteCourse(id: string) {
    return this.http.delete<{ success: boolean }>(`${environment.apiBaseUrl}/courses/${id}`);
  }

  getLessons(courseId: string) {
    return this.http.get<Lesson[]>(`${environment.apiBaseUrl}/courses/${courseId}/lessons`);
  }

  createLesson(payload: LessonMutationPayload) {
    return this.http.post<Lesson>(`${environment.apiBaseUrl}/lessons`, payload);
  }

  updateLesson(id: string, payload: LessonMutationPayload) {
    return this.http.patch<Lesson>(`${environment.apiBaseUrl}/lessons/${id}`, payload);
  }

  deleteLesson(id: string) {
    return this.http.delete<{ success: boolean }>(`${environment.apiBaseUrl}/lessons/${id}`);
  }

  completeLesson(id: string, timeSpentMinutes?: number) {
    return this.http.post(`${environment.apiBaseUrl}/lessons/${id}/complete`, { timeSpentMinutes });
  }

  submitQuizAttempt(
    id: string,
    payload: {
      answers: Array<{ questionId: string; optionId: string }>;
      timeSpentMinutes?: number;
    },
  ) {
    return this.http.post(`${environment.apiBaseUrl}/lessons/${id}/quiz-attempt`, payload);
  }

  submitFinalQuizAttempt(
    courseId: string,
    payload: {
      answers: Array<{ questionId: string; optionId: string }>;
      timeSpentMinutes?: number;
    },
  ) {
    return this.http.post(`${environment.apiBaseUrl}/courses/${courseId}/final-quiz-attempt`, payload);
  }

  downloadCertificate(courseId: string, userId?: string) {
    const suffix = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return this.http.get(`${environment.apiBaseUrl}/courses/${courseId}/certificate${suffix}`, {
      responseType: 'blob',
    });
  }

  generateCourseDraft(payload: AiCourseDraftRequest) {
    return this.http.post<AiCourseDraftResponse>(`${environment.apiBaseUrl}/ai/course-drafts`, payload);
  }
}
