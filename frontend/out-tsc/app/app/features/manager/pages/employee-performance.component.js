import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReportsApiService } from '../../../core/services/reports-api.service';
import { UsersApiService } from '../../../core/services/users-api.service';
import { DashboardChartCardComponent, DataTableComponent, EmptyStateComponent, IconComponent, ProgressBarComponent, StatCardComponent, } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function EmployeePerformanceComponent_section_0_article_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 32)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const insight_r1 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(insight_r1.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(insight_r1.description);
} }
function EmployeePerformanceComponent_section_0_div_45_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 35)(1, "div", 36)(2, "div", 37)(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 38);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(9, "app-progress-bar", 39);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const enrollment_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.courseTitle(enrollment_r2));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.statusLabel(enrollment_r2.status));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", enrollment_r2.progressPercentage, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", enrollment_r2.progressPercentage);
} }
function EmployeePerformanceComponent_section_0_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtemplate(1, EmployeePerformanceComponent_section_0_div_45_article_1_Template, 10, 4, "article", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.enrollments());
} }
function EmployeePerformanceComponent_section_0_ng_template_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 40);
} }
function EmployeePerformanceComponent_section_0_app_data_table_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-data-table", 41);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("columns", ctx_r2.kpiColumns)("rows", ctx_r2.performanceRows());
} }
function EmployeePerformanceComponent_section_0_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 42);
} }
function EmployeePerformanceComponent_section_0_app_data_table_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-data-table", 41);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("columns", ctx_r2.quizColumns)("rows", ctx_r2.quizRows());
} }
function EmployeePerformanceComponent_section_0_ng_template_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 43);
} }
function EmployeePerformanceComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 4)(1, "article", 5)(2, "div", 6)(3, "div")(4, "h2", 7)(5, "span", 8);
    i0.ɵɵelement(6, "app-icon", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "p", 10);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 11)(12, "span", 12);
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span", 13);
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(16, "div", 14);
    i0.ɵɵelement(17, "app-stat-card", 15)(18, "app-stat-card", 16)(19, "app-stat-card", 17)(20, "app-stat-card", 18)(21, "app-stat-card", 19)(22, "app-stat-card", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 21);
    i0.ɵɵelement(24, "app-dashboard-chart-card", 22);
    i0.ɵɵelementStart(25, "article", 23)(26, "div", 24)(27, "div")(28, "h3", 7);
    i0.ɵɵelement(29, "app-icon", 25);
    i0.ɵɵelementStart(30, "span");
    i0.ɵɵtext(31, "\u0645\u0644\u062E\u0635 \u0627\u0644\u062A\u0642\u0631\u064A\u0631");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(32, "p", 10);
    i0.ɵɵtext(33, "\u0642\u0631\u0627\u0621\u0629 \u0633\u0631\u064A\u0639\u0629 \u0644\u0648\u0636\u0639 \u0627\u0644\u0639\u0636\u0648 \u0627\u0644\u062D\u0627\u0644\u064A \u0648\u0645\u0627 \u064A\u062D\u062A\u0627\u062C \u0645\u062A\u0627\u0628\u0639\u0629.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 26);
    i0.ɵɵtemplate(35, EmployeePerformanceComponent_section_0_article_35_Template, 5, 2, "article", 27);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(36, "article", 23)(37, "div", 24)(38, "div")(39, "h3", 7);
    i0.ɵɵelement(40, "app-icon", 28);
    i0.ɵɵelementStart(41, "span");
    i0.ɵɵtext(42, "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u0648\u0627\u0644\u062A\u0642\u062F\u0651\u0645");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(43, "p", 10);
    i0.ɵɵtext(44, "\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u062A\u0646\u0641\u064A\u0630 \u0644\u0643\u0644 \u062F\u0648\u0631\u0629 \u0645\u062E\u0635\u0635\u0629.");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(45, EmployeePerformanceComponent_section_0_div_45_Template, 2, 1, "div", 29)(46, EmployeePerformanceComponent_section_0_ng_template_46_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(48, "div", 21)(49, "article", 23)(50, "h3", 30);
    i0.ɵɵtext(51, "\u0633\u062C\u0644 \u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0623\u062F\u0627\u0621");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(52, EmployeePerformanceComponent_section_0_app_data_table_52_Template, 1, 2, "app-data-table", 31)(53, EmployeePerformanceComponent_section_0_ng_template_53_Template, 1, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(55, "article", 23)(56, "h3", 30);
    i0.ɵɵtext(57, "\u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(58, EmployeePerformanceComponent_section_0_app_data_table_58_Template, 1, 2, "app-data-table", 31)(59, EmployeePerformanceComponent_section_0_ng_template_59_Template, 1, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r4 = ctx.ngIf;
    const noEnrollments_r5 = i0.ɵɵreference(47);
    const noPerformance_r6 = i0.ɵɵreference(54);
    const noQuiz_r7 = i0.ɵɵreference(60);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("size", 20);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r4.fullName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", user_r4.jobTitle, "", ctx_r2.departmentName(user_r4) ? " \u2022 " + ctx_r2.departmentName(user_r4) : "", " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r2.levelName(user_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.statusLabel(user_r4.status));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", user_r4.pointsTotal);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.enrollments().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.averageProgress() + "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.averageQuizScore() + "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.completedCourses());
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", ctx_r2.averageImprovement() + "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("items", ctx_r2.courseProgressItems())("scaleMax", 100);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.reportInsights());
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngIf", ctx_r2.enrollments().length)("ngIfElse", noEnrollments_r5);
    i0.ɵɵadvance(7);
    i0.ɵɵproperty("ngIf", ctx_r2.performanceRows().length)("ngIfElse", noPerformance_r6);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r2.quizRows().length)("ngIfElse", noQuiz_r7);
} }
export class EmployeePerformanceComponent {
    constructor() {
        this.route = inject(ActivatedRoute);
        this.usersApi = inject(UsersApiService);
        this.reportsApi = inject(ReportsApiService);
        this.user = signal(null, ...(ngDevMode ? [{ debugName: "user" }] : /* istanbul ignore next */ []));
        this.report = signal(null, ...(ngDevMode ? [{ debugName: "report" }] : /* istanbul ignore next */ []));
        this.kpiColumns = [
            { key: 'kpi', label: 'المؤشر' },
            { key: 'beforeValue', label: 'قبل' },
            { key: 'afterValue', label: 'بعد' },
            { key: 'improvement', label: 'التحسن' },
            { key: 'measuredAt', label: 'تاريخ القياس' },
        ];
        this.quizColumns = [
            { key: 'course', label: 'الدورة' },
            { key: 'quiz', label: 'الاختبار' },
            { key: 'score', label: 'النتيجة' },
            { key: 'status', label: 'الحالة' },
            { key: 'attempts', label: 'المحاولات' },
        ];
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            return;
        }
        this.usersApi.getUser(id).subscribe((response) => this.user.set(response));
        this.reportsApi.getEmployeeReport(id).subscribe((response) => this.report.set(response));
    }
    enrollments() {
        return this.report()?.enrollments || [];
    }
    completedCourses() {
        return this.enrollments().filter((enrollment) => enrollment.status === 'completed').length;
    }
    averageProgress() {
        if (!this.enrollments().length) {
            return 0;
        }
        return Math.round(this.enrollments().reduce((sum, enrollment) => sum + (enrollment.progressPercentage ?? 0), 0) /
            this.enrollments().length);
    }
    averageQuizScore() {
        const quizResults = this.report()?.quizResults || [];
        if (!quizResults.length) {
            return 0;
        }
        return Math.round(quizResults.reduce((sum, quiz) => sum + quiz.scorePercentage, 0) / quizResults.length);
    }
    averageImprovement() {
        const records = this.report()?.performanceRecords || [];
        if (!records.length) {
            return 0;
        }
        return Math.round(records.reduce((sum, record) => sum + record.improvementPercentage, 0) / records.length);
    }
    courseProgressItems() {
        return this.enrollments().map((enrollment) => ({
            label: this.courseTitle(enrollment),
            value: enrollment.progressPercentage,
            valueLabel: `${enrollment.progressPercentage}%`,
            hint: this.statusLabel(enrollment.status),
            tone: enrollment.status === 'completed'
                ? 'success'
                : enrollment.status === 'in_progress'
                    ? 'info'
                    : 'warning',
        }));
    }
    performanceRows() {
        return (this.report()?.performanceRecords || []).map((record) => ({
            kpi: this.kpiName(record),
            beforeValue: record.beforeValue,
            afterValue: record.afterValue,
            improvement: `${record.improvementPercentage}%`,
            measuredAt: this.dateLabel(record.measuredAt),
        }));
    }
    quizRows() {
        return (this.report()?.quizResults || []).map((result) => ({
            course: this.quizCourseTitle(result),
            quiz: this.quizTitle(result),
            score: `${result.scorePercentage}%`,
            status: result.passed ? 'اجتاز' : 'لم يجتز',
            attempts: result.attemptCount,
        }));
    }
    reportInsights() {
        return [
            {
                title: 'حالة التنفيذ',
                description: this.enrollments().length
                    ? `هذا العضو أكمل ${this.completedCourses()} من أصل ${this.enrollments().length} دورات بمتوسط تقدم ${this.averageProgress()}%.`
                    : 'لا توجد دورات مسندة لهذا العضو حالياً.',
            },
            {
                title: 'الاستيعاب المعرفي',
                description: (this.report()?.quizResults || []).length
                    ? `متوسط نتائج الاختبارات ${this.averageQuizScore()}% عبر ${(this.report()?.quizResults || []).length} اختبارات.`
                    : 'لم تسجل نتائج اختبارات بعد، لذلك لا يوجد قياس مباشر للاستيعاب.',
            },
            {
                title: 'الأثر على الأداء',
                description: (this.report()?.performanceRecords || []).length
                    ? `متوسط التحسن المسجل في مؤشرات الأداء هو ${this.averageImprovement()}%.`
                    : 'لا توجد قياسات أداء مسجلة قبل/بعد لهذا العضو حتى الآن.',
            },
        ];
    }
    departmentName(user) {
        return typeof user.departmentId === 'string' ? user.departmentId : user.departmentId?.name || '';
    }
    levelName(user) {
        return typeof user.levelId === 'string' ? user.levelId : user.levelId?.name || 'مستوى غير محدد';
    }
    statusLabel(status) {
        return ({
            active: 'نشط',
            inactive: 'غير نشط',
            not_started: 'لم تبدأ',
            in_progress: 'قيد التنفيذ',
            completed: 'مكتملة',
            failed: 'متعثرة',
        }[status || 'active'] || status || 'نشط');
    }
    courseTitle(enrollment) {
        return typeof enrollment.courseId === 'string' ? enrollment.courseId : enrollment.courseId?.title || 'دورة تدريبية';
    }
    kpiName(record) {
        return typeof record.kpiId === 'string' ? record.kpiId : record.kpiId?.name || 'مؤشر';
    }
    quizCourseTitle(result) {
        return typeof result.courseId === 'string' ? result.courseId : result.courseId?.title || 'دورة تدريبية';
    }
    quizTitle(result) {
        return typeof result.lessonId === 'string' ? result.lessonId : result.lessonId?.title || 'اختبار';
    }
    dateLabel(value) {
        if (!value) {
            return '-';
        }
        return new Intl.DateTimeFormat('ar', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(value));
    }
    static { this.ɵfac = function EmployeePerformanceComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || EmployeePerformanceComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: EmployeePerformanceComponent, selectors: [["app-employee-performance"]], decls: 1, vars: 1, consts: [["noEnrollments", ""], ["noPerformance", ""], ["noQuiz", ""], ["class", "page-grid", 4, "ngIf"], [1, "page-grid"], [1, "card", "hero-panel"], [1, "hero-copy"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "user", 3, "size"], [1, "section-subtitle"], [1, "hero-tags"], [1, "hero-tag"], [1, "hero-tag", "neutral"], [1, "stats-grid"], ["label", "\u0627\u0644\u0646\u0642\u0627\u0637", "tone", "success", "icon", "award", 3, "value"], ["label", "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0645\u0633\u0646\u062F\u0629", "icon", "book-open", 3, "value"], ["label", "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u0642\u062F\u0651\u0645", "tone", "info", "icon", "chart", 3, "value"], ["label", "\u0627\u0644\u0645\u0639\u062F\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u064A", "tone", "info", "icon", "chart-bars", 3, "value"], ["label", "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629", "tone", "success", "icon", "folder-check", 3, "value"], ["label", "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u062A\u062D\u0633\u0646", "tone", "success", "icon", "target", 3, "value"], [1, "split-grid"], ["title", "\u062A\u0642\u062F\u0651\u0645 \u0627\u0644\u062F\u0648\u0631\u0627\u062A", "subtitle", "\u062D\u0627\u0644\u0629 \u0643\u0644 \u062F\u0648\u0631\u0629 \u0645\u0633\u0646\u062F\u0629 \u0644\u0647\u0630\u0627 \u0627\u0644\u0639\u0636\u0648.", "icon", "chart-bars", 3, "items", "scaleMax"], [1, "card", "panel"], [1, "panel-header"], ["name", "sparkles", 3, "size"], [1, "insight-list"], ["class", "insight-item", 4, "ngFor", "ngForOf"], ["name", "book", 3, "size"], ["class", "course-list", 4, "ngIf", "ngIfElse"], [1, "section-title"], [3, "columns", "rows", 4, "ngIf", "ngIfElse"], [1, "insight-item"], [1, "course-list"], ["class", "course-item", 4, "ngFor", "ngForOf"], [1, "course-item"], [1, "course-head"], [1, "course-copy"], [1, "course-badge"], [3, "value"], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0648\u0631\u0627\u062A \u0645\u0633\u0646\u062F\u0629", "description", "\u0633\u064A\u0638\u0647\u0631 \u0627\u0644\u062A\u0642\u062F\u0645 \u0647\u0646\u0627 \u0639\u0646\u062F \u0625\u0636\u0627\u0641\u0629 \u062F\u0648\u0631\u0627\u062A \u0644\u0644\u0639\u0636\u0648."], [3, "columns", "rows"], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u0642\u064A\u0627\u0633\u0627\u062A \u0623\u062F\u0627\u0621", "description", "\u0644\u0645 \u062A\u064F\u0633\u062C\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0642\u0628\u0644/\u0628\u0639\u062F \u0644\u0647\u0630\u0627 \u0627\u0644\u0639\u0636\u0648 \u062D\u062A\u0649 \u0627\u0644\u0622\u0646."], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A", "description", "\u0633\u062A\u0638\u0647\u0631 \u0646\u062A\u0627\u0626\u062C \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0647\u0646\u0627 \u0639\u0646\u062F \u0627\u0643\u062A\u0645\u0627\u0644\u0647\u0627."]], template: function EmployeePerformanceComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, EmployeePerformanceComponent_section_0_Template, 61, 23, "section", 3);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.user());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, StatCardComponent,
            DataTableComponent,
            DashboardChartCardComponent,
            EmptyStateComponent,
            IconComponent,
            ProgressBarComponent], styles: [".stats-grid[_ngcontent-%COMP%], \n   .split-grid[_ngcontent-%COMP%], \n   .insight-list[_ngcontent-%COMP%], \n   .course-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n      }\n\n      .split-grid[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .hero-panel[_ngcontent-%COMP%], \n   .panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .hero-copy[_ngcontent-%COMP%], \n   .hero-tags[_ngcontent-%COMP%], \n   .course-head[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .hero-tags[_ngcontent-%COMP%] {\n        flex-wrap: wrap;\n      }\n\n      .hero-tag[_ngcontent-%COMP%], \n   .course-badge[_ngcontent-%COMP%] {\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n        font-weight: 600;\n      }\n\n      .hero-tag.neutral[_ngcontent-%COMP%] {\n        background: var(--color-neutral-100);\n        color: var(--color-display);\n      }\n\n      .course-item[_ngcontent-%COMP%], \n   .insight-item[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .course-copy[_ngcontent-%COMP%], \n   .insight-item[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.35rem;\n      }\n\n      .course-copy[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .insight-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .split-grid[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n\n        .hero-copy[_ngcontent-%COMP%], \n   .course-head[_ngcontent-%COMP%] {\n          flex-direction: column;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EmployeePerformanceComponent, [{
        type: Component,
        args: [{ selector: 'app-employee-performance', standalone: true, imports: [
                    CommonModule,
                    StatCardComponent,
                    DataTableComponent,
                    DashboardChartCardComponent,
                    EmptyStateComponent,
                    IconComponent,
                    ProgressBarComponent,
                ], template: `
    <section class="page-grid" *ngIf="user() as user">
      <article class="card hero-panel">
        <div class="hero-copy">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="user" [size]="20" /></span>
              <span>{{ user.fullName }}</span>
            </h2>
            <p class="section-subtitle">
              {{ user.jobTitle }}{{ departmentName(user) ? ' • ' + departmentName(user) : '' }}
            </p>
          </div>
          <div class="hero-tags">
            <span class="hero-tag">{{ levelName(user) }}</span>
            <span class="hero-tag neutral">{{ statusLabel(user.status) }}</span>
          </div>
        </div>
      </article>

      <div class="stats-grid">
        <app-stat-card label="النقاط" [value]="user.pointsTotal" tone="success" icon="award" />
        <app-stat-card label="الدورات المسندة" [value]="enrollments().length" icon="book-open" />
        <app-stat-card label="متوسط التقدّم" [value]="averageProgress() + '%'" tone="info" icon="chart" />
        <app-stat-card label="المعدل الاختباري" [value]="averageQuizScore() + '%'" tone="info" icon="chart-bars" />
        <app-stat-card label="الدورات المكتملة" [value]="completedCourses()" tone="success" icon="folder-check" />
        <app-stat-card label="متوسط التحسن" [value]="averageImprovement() + '%'" tone="success" icon="target" />
      </div>

      <div class="split-grid">
        <app-dashboard-chart-card
          title="تقدّم الدورات"
          subtitle="حالة كل دورة مسندة لهذا العضو."
          icon="chart-bars"
          [items]="courseProgressItems()"
          [scaleMax]="100"
        />

        <article class="card panel">
          <div class="panel-header">
            <div>
              <h3 class="section-title label-with-icon">
                <app-icon name="sparkles" [size]="18" />
                <span>ملخص التقرير</span>
              </h3>
              <p class="section-subtitle">قراءة سريعة لوضع العضو الحالي وما يحتاج متابعة.</p>
            </div>
          </div>

          <div class="insight-list">
            <article class="insight-item" *ngFor="let insight of reportInsights()">
              <strong>{{ insight.title }}</strong>
              <p>{{ insight.description }}</p>
            </article>
          </div>
        </article>
      </div>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h3 class="section-title label-with-icon">
              <app-icon name="book" [size]="18" />
              <span>الدورات الحالية والتقدّم</span>
            </h3>
            <p class="section-subtitle">تفاصيل التنفيذ لكل دورة مخصصة.</p>
          </div>
        </div>

        <div class="course-list" *ngIf="enrollments().length; else noEnrollments">
          <article class="course-item" *ngFor="let enrollment of enrollments()">
            <div class="course-head">
              <div class="course-copy">
                <strong>{{ courseTitle(enrollment) }}</strong>
                <p>{{ statusLabel(enrollment.status) }}</p>
              </div>
              <span class="course-badge">{{ enrollment.progressPercentage }}%</span>
            </div>
            <app-progress-bar [value]="enrollment.progressPercentage" />
          </article>
        </div>

        <ng-template #noEnrollments>
          <app-empty-state title="لا توجد دورات مسندة" description="سيظهر التقدم هنا عند إضافة دورات للعضو." />
        </ng-template>
      </article>

      <div class="split-grid">
        <article class="card panel">
          <h3 class="section-title">سجل مؤشرات الأداء</h3>
          <app-data-table *ngIf="performanceRows().length; else noPerformance" [columns]="kpiColumns" [rows]="performanceRows()" />
          <ng-template #noPerformance>
            <app-empty-state title="لا توجد قياسات أداء" description="لم تُسجل بيانات قبل/بعد لهذا العضو حتى الآن." />
          </ng-template>
        </article>

        <article class="card panel">
          <h3 class="section-title">نتائج الاختبارات</h3>
          <app-data-table *ngIf="quizRows().length; else noQuiz" [columns]="quizColumns" [rows]="quizRows()" />
          <ng-template #noQuiz>
            <app-empty-state title="لا توجد اختبارات" description="ستظهر نتائج الاختبارات هنا عند اكتمالها." />
          </ng-template>
        </article>
      </div>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .stats-grid,\n      .split-grid,\n      .insight-list,\n      .course-list {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .stats-grid {\n        grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n      }\n\n      .split-grid {\n        grid-template-columns: repeat(2, minmax(0, 1fr));\n      }\n\n      .hero-panel,\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .hero-copy,\n      .hero-tags,\n      .course-head {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .hero-tags {\n        flex-wrap: wrap;\n      }\n\n      .hero-tag,\n      .course-badge {\n        padding: 0.45rem 0.8rem;\n        border-radius: 999px;\n        background: var(--color-primary-soft);\n        color: var(--color-primary-default);\n        font-weight: 600;\n      }\n\n      .hero-tag.neutral {\n        background: var(--color-neutral-100);\n        color: var(--color-display);\n      }\n\n      .course-item,\n      .insight-item {\n        padding: 1rem;\n        border-radius: 1rem;\n        background: linear-gradient(180deg, var(--color-neutral-50), #ffffff);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .course-copy,\n      .insight-item {\n        display: grid;\n        gap: 0.35rem;\n      }\n\n      .course-copy p,\n      .insight-item p {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 960px) {\n        .split-grid {\n          grid-template-columns: 1fr;\n        }\n\n        .hero-copy,\n        .course-head {\n          flex-direction: column;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(EmployeePerformanceComponent, { className: "EmployeePerformanceComponent", filePath: "src/app/features/manager/pages/employee-performance.component.ts", lineNumber: 219 }); })();
//# sourceMappingURL=employee-performance.component.js.map