import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class CoursesApiService {
    constructor() {
        this.http = inject(HttpClient);
    }
    getCourses() {
        return this.http.get(`${environment.apiBaseUrl}/courses`);
    }
    getCourse(id) {
        return this.http.get(`${environment.apiBaseUrl}/courses/${id}`);
    }
    createCourse(payload) {
        return this.http.post(`${environment.apiBaseUrl}/courses`, payload);
    }
    updateCourse(id, payload) {
        return this.http.patch(`${environment.apiBaseUrl}/courses/${id}`, payload);
    }
    deleteCourse(id) {
        return this.http.delete(`${environment.apiBaseUrl}/courses/${id}`);
    }
    getLessons(courseId) {
        return this.http.get(`${environment.apiBaseUrl}/courses/${courseId}/lessons`);
    }
    createLesson(payload) {
        return this.http.post(`${environment.apiBaseUrl}/lessons`, payload);
    }
    updateLesson(id, payload) {
        return this.http.patch(`${environment.apiBaseUrl}/lessons/${id}`, payload);
    }
    deleteLesson(id) {
        return this.http.delete(`${environment.apiBaseUrl}/lessons/${id}`);
    }
    completeLesson(id, timeSpentMinutes) {
        return this.http.post(`${environment.apiBaseUrl}/lessons/${id}/complete`, { timeSpentMinutes });
    }
    submitQuizAttempt(id, payload) {
        return this.http.post(`${environment.apiBaseUrl}/lessons/${id}/quiz-attempt`, payload);
    }
    submitFinalQuizAttempt(courseId, payload) {
        return this.http.post(`${environment.apiBaseUrl}/courses/${courseId}/final-quiz-attempt`, payload);
    }
    downloadCertificate(courseId, userId) {
        const suffix = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return this.http.get(`${environment.apiBaseUrl}/courses/${courseId}/certificate${suffix}`, {
            responseType: 'blob',
        });
    }
    generateCourseDraft(payload) {
        return this.http.post(`${environment.apiBaseUrl}/ai/course-drafts`, payload);
    }
    static { this.ɵfac = function CoursesApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CoursesApiService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CoursesApiService, factory: CoursesApiService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CoursesApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=courses-api.service.js.map