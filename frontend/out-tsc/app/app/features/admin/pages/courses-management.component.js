import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { AuthService } from '../../../core/services/auth.service';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["courseDialog"];
const _c1 = ["aiDialog"];
const _c2 = ["lessonDialog"];
const _c3 = ["deleteDialog"];
function CoursesManagementComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.courseForm.controls.title, ctx_r0.courseValidationMessages.title), " ");
} }
function CoursesManagementComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.courseForm.controls.difficulty, ctx_r0.courseValidationMessages.difficulty), " ");
} }
function CoursesManagementComponent_div_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.courseForm.controls.estimatedDurationMinutes, ctx_r0.courseValidationMessages.estimatedDurationMinutes), " ");
} }
function CoursesManagementComponent_div_56_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const skill_r2 = ctx.$implicit;
    i0.ɵɵproperty("value", skill_r2._id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(skill_r2.name);
} }
function CoursesManagementComponent_div_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "label");
    i0.ɵɵtext(2, "\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 74);
    i0.ɵɵtemplate(4, CoursesManagementComponent_div_56_option_4_Template, 2, 2, "option", 55);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.skills());
} }
function CoursesManagementComponent_div_57_option_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const kpi_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", kpi_r3._id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(kpi_r3.name);
} }
function CoursesManagementComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22)(1, "label");
    i0.ɵɵtext(2, "\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 76);
    i0.ɵɵtemplate(4, CoursesManagementComponent_div_57_option_4_Template, 2, 2, "option", 55);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngForOf", ctx_r0.kpis());
} }
function CoursesManagementComponent_div_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.courseForm.controls.description, ctx_r0.courseValidationMessages.description), " ");
} }
function CoursesManagementComponent_div_128_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 77)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const draft_r4 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r4.course.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(draft_r4.course.description);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", draft_r4.lessons.length, " \u062F\u0631\u0648\u0633 \u2022 ", (draft_r4.finalQuiz == null ? null : draft_r4.finalQuiz.questions == null ? null : draft_r4.finalQuiz.questions.length) || 0, " \u0623\u0633\u0626\u0644\u0629 \u0646\u0647\u0627\u0626\u064A\u0629");
} }
function CoursesManagementComponent_option_144_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r5 = ctx.$implicit;
    i0.ɵɵproperty("value", course_r5._id || course_r5.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(course_r5.title);
} }
function CoursesManagementComponent_div_145_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.lessonForm.controls.courseId, ctx_r0.lessonValidationMessages.courseId), " ");
} }
function CoursesManagementComponent_div_150_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.lessonForm.controls.title, ctx_r0.lessonValidationMessages.title), " ");
} }
function CoursesManagementComponent_div_163_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.lessonForm.controls.contentType, ctx_r0.lessonValidationMessages.contentType), " ");
} }
function CoursesManagementComponent_div_168_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.lessonForm.controls.order, ctx_r0.lessonValidationMessages.order), " ");
} }
function CoursesManagementComponent_div_173_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getVisibleErrorMessage(ctx_r0.lessonForm.controls.durationMinutes, ctx_r0.lessonValidationMessages.durationMinutes), " ");
} }
function CoursesManagementComponent_div_180_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 46)(1, "label");
    i0.ɵɵtext(2, "\u0646\u0635 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "textarea", 78);
    i0.ɵɵelementStart(4, "div", 64);
    i0.ɵɵtext(5, "\u0644\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0623\u0648 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0646\u0635\u064A\u0629 \u0623\u0648 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0646\u0633\u0648\u062E.");
    i0.ɵɵelementEnd()();
} }
function CoursesManagementComponent_div_185_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0644\u0641: ", ctx_r0.uploadedLessonFileName());
} }
function CoursesManagementComponent_div_186_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, " \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u062F\u0627\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u062D\u0627\u0644\u064A\u0627\u064B\u060C \u0648\u0644\u064A\u0633 \u0641\u064A \u0645\u062E\u0632\u0646 \u0645\u0644\u0641\u0627\u062A \u062E\u0627\u0631\u062C\u064A. ");
    i0.ɵɵelementEnd();
} }
function CoursesManagementComponent_div_193_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 73);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.lessonContentErrorMessage(), " ");
} }
function CoursesManagementComponent_strong_204_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(course_r6.title);
} }
function lessonContentValidator(control) {
    const contentType = control.get('contentType')?.value;
    const contentUrl = String(control.get('contentUrl')?.value || '').trim();
    const contentHtml = String(control.get('contentHtml')?.value || '').trim();
    if (!contentType) {
        return null;
    }
    if (contentType === 'video' || contentType === 'pdf') {
        return contentUrl ? null : { contentMissing: true };
    }
    return contentUrl || contentHtml ? null : { contentMissing: true };
}
export class CoursesManagementComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.coursesApi = inject(CoursesApiService);
        this.lookupsApi = inject(LookupsApiService);
        this.router = inject(Router);
        this.authService = inject(AuthService);
        this.courseDialog = viewChild.required('courseDialog');
        this.aiDialog = viewChild.required('aiDialog');
        this.lessonDialog = viewChild.required('lessonDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.courses = signal([], ...(ngDevMode ? [{ debugName: "courses" }] : /* istanbul ignore next */ []));
        this.skills = signal([], ...(ngDevMode ? [{ debugName: "skills" }] : /* istanbul ignore next */ []));
        this.kpis = signal([], ...(ngDevMode ? [{ debugName: "kpis" }] : /* istanbul ignore next */ []));
        this.editingCourse = signal(null, ...(ngDevMode ? [{ debugName: "editingCourse" }] : /* istanbul ignore next */ []));
        this.deletingCourse = signal(null, ...(ngDevMode ? [{ debugName: "deletingCourse" }] : /* istanbul ignore next */ []));
        this.uploadedLessonFileName = signal('', ...(ngDevMode ? [{ debugName: "uploadedLessonFileName" }] : /* istanbul ignore next */ []));
        this.aiDraftPreview = signal(null, ...(ngDevMode ? [{ debugName: "aiDraftPreview" }] : /* istanbul ignore next */ []));
        this.loadingAiDraft = signal(false, ...(ngDevMode ? [{ debugName: "loadingAiDraft" }] : /* istanbul ignore next */ []));
        this.creatingAiCourse = signal(false, ...(ngDevMode ? [{ debugName: "creatingAiCourse" }] : /* istanbul ignore next */ []));
        this.canManageCourseLookups = computed(() => this.authService.currentUser()?.role !== 'course_manager', ...(ngDevMode ? [{ debugName: "canManageCourseLookups" }] : /* istanbul ignore next */ []));
        this.isEditMode = computed(() => !!this.editingCourse(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.courseValidationMessages = {
            title: {
                required: 'أدخل عنوان الدورة.',
            },
            description: {
                required: 'أدخل وصف الدورة.',
            },
            difficulty: {
                required: 'اختر مستوى الدورة.',
            },
            estimatedDurationMinutes: {
                required: 'أدخل المدة التقديرية.',
                min: 'المدة التقديرية يجب أن تكون دقيقة واحدة على الأقل.',
            },
        };
        this.lessonValidationMessages = {
            courseId: {
                required: 'اختر الدورة.',
            },
            title: {
                required: 'أدخل عنوان الدرس.',
            },
            contentType: {
                required: 'اختر نوع المحتوى.',
            },
            order: {
                required: 'أدخل ترتيب الدرس.',
                min: 'ترتيب الدرس يجب أن يبدأ من 1.',
            },
            durationMinutes: {
                required: 'أدخل مدة الدرس.',
                min: 'مدة الدرس يجب أن تكون دقيقة واحدة على الأقل.',
            },
        };
        this.columns = [
            { key: 'title', label: 'الدورة' },
            { key: 'difficultyLabel', label: 'المستوى' },
            { key: 'duration', label: 'المدة' },
            { key: 'statusLabel', label: 'الحالة' },
        ];
        this.actions = [
            { key: 'view-lessons', label: 'الدروس', icon: 'eye', tone: 'secondary' },
            { key: 'edit', label: 'تعديل', icon: 'book-open', tone: 'ghost' },
            { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' },
        ];
        this.courseForm = this.fb.nonNullable.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            difficulty: ['beginner', Validators.required],
            estimatedDurationMinutes: [60, [Validators.required, Validators.min(1)]],
            skillIds: [[]],
            kpiIds: [[]],
            status: ['published'],
            certificateEnabled: [false],
        });
        this.aiDraftForm = this.fb.nonNullable.group({
            topic: ['', Validators.required],
            targetAudience: [''],
            difficulty: ['beginner', Validators.required],
            estimatedDurationMinutes: [60, [Validators.required, Validators.min(15)]],
            lessonCount: [4, [Validators.required, Validators.min(1), Validators.max(12)]],
            learningObjectives: [''],
            notes: [''],
            includeFinalExam: [true],
            finalExamQuestionCount: [5, [Validators.required, Validators.min(3), Validators.max(20)]],
        });
        this.lessonForm = this.fb.nonNullable.group({
            courseId: ['', Validators.required],
            title: ['', Validators.required],
            contentType: ['article', Validators.required],
            order: [1, [Validators.required, Validators.min(1)]],
            durationMinutes: [10, [Validators.required, Validators.min(1)]],
            contentUrl: [''],
            contentHtml: [''],
            isRequired: [true],
        }, { validators: lessonContentValidator });
    }
    ngOnInit() {
        this.loadData();
    }
    openCourseDialog() {
        this.editingCourse.set(null);
        this.courseForm.reset({
            title: '',
            description: '',
            difficulty: 'beginner',
            estimatedDurationMinutes: 60,
            skillIds: [],
            kpiIds: [],
            status: 'published',
            certificateEnabled: false,
        });
        clearControlState(this.courseForm);
        this.courseDialog().open();
    }
    closeCourseDialog() {
        this.courseDialog().close();
    }
    openAiDialog() {
        this.aiDraftPreview.set(null);
        this.aiDraftForm.reset({
            topic: '',
            targetAudience: '',
            difficulty: 'beginner',
            estimatedDurationMinutes: 60,
            lessonCount: 4,
            learningObjectives: '',
            notes: '',
            includeFinalExam: true,
            finalExamQuestionCount: 5,
        });
        clearControlState(this.aiDraftForm);
        this.aiDialog().open();
    }
    closeAiDialog() {
        this.aiDialog().close();
    }
    closeDeleteDialog() {
        this.deletingCourse.set(null);
        this.deleteDialog().close();
    }
    openLessonDialog() {
        this.lessonForm.reset({
            courseId: '',
            title: '',
            contentType: 'article',
            order: 1,
            durationMinutes: 10,
            contentUrl: '',
            contentHtml: '',
            isRequired: true,
        });
        this.uploadedLessonFileName.set('');
        clearControlState(this.lessonForm);
        this.lessonDialog().open();
    }
    closeLessonDialog() {
        this.uploadedLessonFileName.set('');
        this.lessonDialog().close();
    }
    handleTableAction(event) {
        if (typeof event.row['courseId'] !== 'string') {
            return;
        }
        const course = this.courses().find((item) => (item._id || item.id) === event.row['courseId']);
        if (!course) {
            return;
        }
        if (event.key === 'edit') {
            this.openEditCourseDialog(course);
            return;
        }
        if (event.key === 'view-lessons') {
            this.viewLessons(course);
            return;
        }
        if (event.key === 'delete') {
            this.openDeleteDialog(course);
        }
    }
    openEditCourseDialog(course) {
        this.editingCourse.set(course);
        this.courseForm.reset({
            title: course.title,
            description: course.description,
            difficulty: course.difficulty,
            estimatedDurationMinutes: course.estimatedDurationMinutes,
            skillIds: course.skillIds.map((item) => (typeof item === 'string' ? item : item._id || '')).filter(Boolean),
            kpiIds: course.kpiIds.map((item) => (typeof item === 'string' ? item : item._id || '')).filter(Boolean),
            status: course.status,
            certificateEnabled: !!course.certificateEnabled,
        });
        clearControlState(this.courseForm);
        this.courseDialog().open();
    }
    openDeleteDialog(course) {
        this.deletingCourse.set(course);
        this.deleteDialog().open();
    }
    viewLessons(course) {
        const courseId = course._id || course.id;
        if (!courseId) {
            return;
        }
        this.router.navigate([this.managementBasePath(), 'courses', courseId, 'lessons']);
    }
    submitCourse() {
        if (this.courseForm.invalid) {
            touchAllControls(this.courseForm);
            return;
        }
        const payload = {
            ...this.courseForm.getRawValue(),
            difficulty: this.courseForm.getRawValue().difficulty,
            status: this.courseForm.getRawValue().status,
            certificateEnabled: this.courseForm.getRawValue().certificateEnabled,
        };
        const editingCourse = this.editingCourse();
        const courseId = editingCourse?._id || editingCourse?.id;
        if (editingCourse && courseId) {
            this.coursesApi.updateCourse(courseId, payload).subscribe(() => {
                this.editingCourse.set(null);
                this.closeCourseDialog();
                this.loadCourses();
            });
            return;
        }
        this.coursesApi.createCourse(payload).subscribe(() => {
            this.courseForm.reset({
                title: '',
                description: '',
                difficulty: 'beginner',
                estimatedDurationMinutes: 60,
                skillIds: [],
                kpiIds: [],
                status: 'published',
                certificateEnabled: false,
            });
            this.closeCourseDialog();
            this.loadCourses();
        });
    }
    submitLesson() {
        if (this.lessonForm.invalid) {
            touchAllControls(this.lessonForm);
            return;
        }
        const payload = {
            courseId: this.lessonForm.getRawValue().courseId,
            title: this.lessonForm.getRawValue().title.trim(),
            contentType: this.lessonForm.getRawValue().contentType,
            order: Number(this.lessonForm.getRawValue().order),
            durationMinutes: Number(this.lessonForm.getRawValue().durationMinutes),
            isRequired: this.lessonForm.getRawValue().isRequired,
            contentUrl: this.lessonForm.getRawValue().contentUrl.trim() || undefined,
            contentHtml: this.lessonForm.getRawValue().contentHtml.trim() || undefined,
        };
        this.coursesApi.createLesson(payload).subscribe(() => {
            this.lessonForm.reset({
                courseId: payload.courseId,
                title: '',
                contentType: 'article',
                order: 1,
                durationMinutes: 10,
                contentUrl: '',
                contentHtml: '',
                isRequired: true,
            });
            this.closeLessonDialog();
            this.router.navigate([this.managementBasePath(), 'courses', payload.courseId, 'lessons']);
        });
    }
    generateAiDraft() {
        if (this.aiDraftForm.invalid || this.loadingAiDraft()) {
            touchAllControls(this.aiDraftForm);
            return;
        }
        const value = this.aiDraftForm.getRawValue();
        this.loadingAiDraft.set(true);
        this.aiDraftPreview.set(null);
        this.coursesApi
            .generateCourseDraft({
            topic: value.topic.trim(),
            targetAudience: value.targetAudience.trim() || undefined,
            difficulty: value.difficulty,
            estimatedDurationMinutes: Number(value.estimatedDurationMinutes),
            lessonCount: Number(value.lessonCount),
            learningObjectives: value.learningObjectives
                .split('\n')
                .map((item) => item.trim())
                .filter(Boolean),
            notes: value.notes.trim() || undefined,
            includeFinalExam: value.includeFinalExam,
            finalExamQuestionCount: Number(value.finalExamQuestionCount),
        })
            .pipe(finalize(() => this.loadingAiDraft.set(false)))
            .subscribe((draft) => this.aiDraftPreview.set(draft));
    }
    createCourseFromAiDraft() {
        const draft = this.aiDraftPreview();
        if (!draft || this.creatingAiCourse()) {
            return;
        }
        this.creatingAiCourse.set(true);
        this.coursesApi
            .createCourse({
            ...draft.course,
            finalQuiz: draft.finalQuiz || null,
            skillIds: [],
            kpiIds: [],
        })
            .pipe(switchMap((course) => {
            const courseId = course._id || course.id || '';
            return forkJoin(draft.lessons.map((lesson) => this.coursesApi.createLesson({
                ...lesson,
                courseId,
            }))).pipe(switchMap(() => this.coursesApi.getCourse(courseId)));
        }), finalize(() => this.creatingAiCourse.set(false)))
            .subscribe((course) => {
            const courseId = course._id || course.id || '';
            this.closeAiDialog();
            this.loadCourses();
            if (courseId) {
                this.router.navigate([this.managementBasePath(), 'courses', courseId, 'lessons']);
            }
        });
    }
    lessonUsesTextContent() {
        return this.lessonForm.controls.contentType.value !== 'video' && this.lessonForm.controls.contentType.value !== 'pdf';
    }
    lessonUrlHelpText() {
        return this.lessonUsesTextContent()
            ? 'اختياري إذا كتبت نص المحتوى، ومطلوب إذا كنت تريد فتح ملف أو رابط خارجي.'
            : 'مطلوب لهذا النوع. يمكنك لصق رابط مباشر أو اختيار ملف من جهازك.';
    }
    hasLessonContentError() {
        const { contentType, contentUrl, contentHtml } = this.lessonForm.controls;
        return this.lessonForm.hasError('contentMissing') && (contentType.touched || contentUrl.touched || contentHtml.touched);
    }
    lessonContentErrorMessage() {
        return this.lessonUsesTextContent()
            ? 'أضف نص المحتوى أو رابطاً أو ملفاً للدرس.'
            : 'أضف رابط المحتوى أو ارفع ملفاً لهذا الدرس.';
    }
    onLessonFileSelected(event) {
        const input = event.target;
        const file = input?.files?.[0];
        if (!file) {
            return;
        }
        this.uploadedLessonFileName.set(file.name);
        const textLikeFile = file.type.startsWith('text/') || /\.(txt|md|html|htm|json|csv)$/i.test(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            const result = typeof reader.result === 'string' ? reader.result : '';
            if (!result) {
                return;
            }
            if (this.lessonUsesTextContent() && textLikeFile) {
                this.lessonForm.patchValue({
                    contentHtml: result,
                    contentUrl: '',
                });
            }
            else {
                this.lessonForm.patchValue({
                    contentUrl: result,
                });
            }
            this.lessonForm.controls.contentUrl.markAsTouched();
            this.lessonForm.controls.contentHtml.markAsTouched();
            this.lessonForm.updateValueAndValidity();
        };
        if (this.lessonUsesTextContent() && textLikeFile) {
            reader.readAsText(file);
            return;
        }
        reader.readAsDataURL(file);
    }
    rows() {
        return this.courses().map((course) => ({
            courseId: course._id || course.id || '',
            title: course.title,
            difficultyLabel: this.difficultyLabel(course.difficulty),
            duration: `${course.estimatedDurationMinutes} دقيقة`,
            statusLabel: this.statusLabel(course.status),
        }));
    }
    confirmDelete() {
        const course = this.deletingCourse();
        const courseId = course?._id || course?.id;
        if (!course || !courseId) {
            return;
        }
        this.coursesApi.deleteCourse(courseId).subscribe(() => {
            this.closeDeleteDialog();
            this.loadCourses();
        });
    }
    loadData() {
        this.loadCourses();
        if (!this.canManageCourseLookups()) {
            this.skills.set([]);
            this.kpis.set([]);
            return;
        }
        this.lookupsApi.getSkills().subscribe((response) => this.skills.set(response));
        this.lookupsApi.getKpis().subscribe((response) => this.kpis.set(response));
    }
    loadCourses() {
        this.coursesApi.getCourses().subscribe((response) => this.courses.set(response));
    }
    managementBasePath() {
        return this.authService.currentUser()?.role === 'course_manager' ? '/content' : '/admin';
    }
    difficultyLabel(value) {
        return {
            beginner: 'مبتدئ',
            intermediate: 'متوسط',
            advanced: 'متقدم',
        }[value] || value;
    }
    statusLabel(value) {
        return {
            draft: 'مسودة',
            published: 'منشورة',
            archived: 'مؤرشفة',
        }[value] || value;
    }
    static { this.ɵfac = function CoursesManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CoursesManagementComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CoursesManagementComponent, selectors: [["app-courses-management"]], viewQuery: function CoursesManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.courseDialog, _c0, 5)(ctx.aiDialog, _c1, 5)(ctx.lessonDialog, _c2, 5)(ctx.deleteDialog, _c3, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(4);
        } }, decls: 211, vars: 57, consts: [["courseDialog", ""], ["aiDialog", ""], ["lessonDialog", ""], ["deleteDialog", ""], [1, "page-grid"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title", "label-with-icon"], [1, "icon-badge"], ["name", "book-open", 3, "size"], [1, "section-subtitle"], [1, "panel-actions"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "btn-content"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["name", "sparkles", 3, "size"], ["name", "graduation", 3, "size"], [1, "section-title"], [3, "actionClicked", "columns", "rows", "actions"], [3, "title", "subtitle", "icon"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "title"], ["class", "field-error", 4, "ngIf"], ["formControlName", "difficulty"], ["value", "beginner"], ["value", "intermediate"], ["value", "advanced"], ["type", "number", "formControlName", "estimatedDurationMinutes"], ["class", "field", 4, "ngIf"], ["formControlName", "status"], ["value", "draft"], ["value", "published"], ["value", "archived"], [1, "checkbox-field", "field--full"], ["type", "checkbox", "formControlName", "certificateEnabled"], ["rows", "4", "formControlName", "description"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u0625\u0646\u0634\u0627\u0621 \u062F\u0648\u0631\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A", "subtitle", "\u0648\u0644\u0651\u062F \u062F\u0648\u0631\u0629 \u0645\u0628\u062F\u0626\u064A\u0629 \u0645\u0639 \u0627\u0644\u062F\u0631\u0648\u0633 \u0648\u0627\u0644\u0634\u0631\u0627\u0626\u062D \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u062B\u0645 \u0631\u0627\u062C\u0639\u0647\u0627 \u0642\u0628\u0644 \u0627\u0644\u062D\u0641\u0638.", "icon", "sparkles"], ["formControlName", "topic"], ["formControlName", "targetAudience"], ["type", "number", "formControlName", "lessonCount"], ["type", "number", "formControlName", "finalExamQuestionCount"], [1, "field", "field--full"], ["rows", "3", "formControlName", "learningObjectives"], ["rows", "3", "formControlName", "notes"], ["type", "checkbox", "formControlName", "includeFinalExam"], ["class", "message-box info", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-secondary", 3, "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["title", "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633", "subtitle", "\u0625\u062B\u0631\u0627\u0621 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0628\u062F\u0631\u0648\u0633 \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u062A\u0628\u0639.", "icon", "graduation"], ["formControlName", "courseId"], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "contentType"], ["value", "video"], ["value", "article"], ["value", "pdf"], ["value", "task"], ["type", "number", "formControlName", "order"], ["type", "number", "formControlName", "durationMinutes"], ["formControlName", "contentUrl", "placeholder", "https://example.com/lesson \u0623\u0648 \u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u062A\u0647 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641"], [1, "field-help"], ["class", "field field--full", 4, "ngIf"], ["type", "file", 3, "change"], ["class", "field-help", 4, "ngIf"], ["type", "checkbox", "formControlName", "isRequired"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0631\u0629", "subtitle", "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0631\u0629 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], [1, "field-error"], ["multiple", "", "formControlName", "skillIds"], [3, "value"], ["multiple", "", "formControlName", "kpiIds"], [1, "message-box", "info"], ["rows", "7", "formControlName", "contentHtml", "placeholder", "\u0627\u0643\u062A\u0628 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062F\u0631\u0633 \u0647\u0646\u0627 \u0623\u0648 \u0627\u0644\u0635\u0642 HTML \u0628\u0633\u064A\u0637\u0627\u064B."]], template: function CoursesManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 4)(1, "article", 5)(2, "div", 6)(3, "div")(4, "h2", 7)(5, "span", 8);
            i0.ɵɵelement(6, "app-icon", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "span");
            i0.ɵɵtext(8, "\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u062F\u0648\u0631\u0627\u062A");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "p", 10);
            i0.ɵɵtext(10, "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0648\u0627\u0644\u062F\u0631\u0648\u0633 \u0639\u0628\u0631 \u0646\u0648\u0627\u0641\u0630 \u0645\u0633\u062A\u0642\u0644\u0629 \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u0636\u0645\u0646\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "div", 11)(12, "button", 12);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_12_listener() { return ctx.openCourseDialog(); });
            i0.ɵɵelementStart(13, "span", 13);
            i0.ɵɵelement(14, "app-icon", 9);
            i0.ɵɵelementStart(15, "span");
            i0.ɵɵtext(16, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "button", 14);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_17_listener() { return ctx.openAiDialog(); });
            i0.ɵɵelementStart(18, "span", 13);
            i0.ɵɵelement(19, "app-icon", 15);
            i0.ɵɵelementStart(20, "span");
            i0.ɵɵtext(21, "\u062A\u0648\u0644\u064A\u062F \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(22, "button", 14);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_22_listener() { return ctx.openLessonDialog(); });
            i0.ɵɵelementStart(23, "span", 13);
            i0.ɵɵelement(24, "app-icon", 16);
            i0.ɵɵelementStart(25, "span");
            i0.ɵɵtext(26, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633");
            i0.ɵɵelementEnd()()()()()();
            i0.ɵɵelementStart(27, "article", 5)(28, "h2", 17);
            i0.ɵɵtext(29, "\u0627\u0644\u062F\u0648\u0631\u0627\u062A \u0627\u0644\u062D\u0627\u0644\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "app-data-table", 18);
            i0.ɵɵlistener("actionClicked", function CoursesManagementComponent_Template_app_data_table_actionClicked_30_listener($event) { return ctx.handleTableAction($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(31, "app-dialog", 19, 0)(33, "form", 20);
            i0.ɵɵlistener("ngSubmit", function CoursesManagementComponent_Template_form_ngSubmit_33_listener() { return ctx.submitCourse(); });
            i0.ɵɵelementStart(34, "div", 21)(35, "div", 22)(36, "label");
            i0.ɵɵtext(37, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(38, "input", 23);
            i0.ɵɵtemplate(39, CoursesManagementComponent_div_39_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 22)(41, "label");
            i0.ɵɵtext(42, "\u0627\u0644\u0645\u0633\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "select", 25)(44, "option", 26);
            i0.ɵɵtext(45, "\u0645\u0628\u062A\u062F\u0626");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "option", 27);
            i0.ɵɵtext(47, "\u0645\u062A\u0648\u0633\u0637");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "option", 28);
            i0.ɵɵtext(49, "\u0645\u062A\u0642\u062F\u0645");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(50, CoursesManagementComponent_div_50_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(51, "div", 22)(52, "label");
            i0.ɵɵtext(53, "\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(54, "input", 29);
            i0.ɵɵtemplate(55, CoursesManagementComponent_div_55_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(56, CoursesManagementComponent_div_56_Template, 5, 1, "div", 30)(57, CoursesManagementComponent_div_57_Template, 5, 1, "div", 30);
            i0.ɵɵelementStart(58, "div", 22)(59, "label");
            i0.ɵɵtext(60, "\u0627\u0644\u062D\u0627\u0644\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(61, "select", 31)(62, "option", 32);
            i0.ɵɵtext(63, "\u0645\u0633\u0648\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(64, "option", 33);
            i0.ɵɵtext(65, "\u0645\u0646\u0634\u0648\u0631\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "option", 34);
            i0.ɵɵtext(67, "\u0645\u0624\u0631\u0634\u0641\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(68, "label", 35);
            i0.ɵɵelement(69, "input", 36);
            i0.ɵɵelementStart(70, "span");
            i0.ɵɵtext(71, "\u062A\u0641\u0639\u064A\u0644 \u0634\u0647\u0627\u062F\u0629 \u0625\u062A\u0645\u0627\u0645 \u0644\u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(72, "div", 22)(73, "label");
            i0.ɵɵtext(74, "\u0627\u0644\u0648\u0635\u0641");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(75, "textarea", 37);
            i0.ɵɵtemplate(76, CoursesManagementComponent_div_76_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(77, "div", 38)(78, "button", 39);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_78_listener() { return ctx.closeCourseDialog(); });
            i0.ɵɵtext(79, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "button", 40);
            i0.ɵɵtext(81);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(82, "app-dialog", 41, 1)(84, "form", 20);
            i0.ɵɵlistener("ngSubmit", function CoursesManagementComponent_Template_form_ngSubmit_84_listener() { return ctx.generateAiDraft(); });
            i0.ɵɵelementStart(85, "div", 21)(86, "div", 22)(87, "label");
            i0.ɵɵtext(88, "\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(89, "input", 42);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(90, "div", 22)(91, "label");
            i0.ɵɵtext(92, "\u0627\u0644\u0641\u0626\u0629 \u0627\u0644\u0645\u0633\u062A\u0647\u062F\u0641\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(93, "input", 43);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(94, "div", 22)(95, "label");
            i0.ɵɵtext(96, "\u0627\u0644\u0645\u0633\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(97, "select", 25)(98, "option", 26);
            i0.ɵɵtext(99, "\u0645\u0628\u062A\u062F\u0626");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(100, "option", 27);
            i0.ɵɵtext(101, "\u0645\u062A\u0648\u0633\u0637");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(102, "option", 28);
            i0.ɵɵtext(103, "\u0645\u062A\u0642\u062F\u0645");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(104, "div", 22)(105, "label");
            i0.ɵɵtext(106, "\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u062A\u0642\u062F\u064A\u0631\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(107, "input", 29);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(108, "div", 22)(109, "label");
            i0.ɵɵtext(110, "\u0639\u062F\u062F \u0627\u0644\u062F\u0631\u0648\u0633");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(111, "input", 44);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(112, "div", 22)(113, "label");
            i0.ɵɵtext(114, "\u0639\u062F\u062F \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(115, "input", 45);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(116, "div", 46)(117, "label");
            i0.ɵɵtext(118, "\u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(119, "textarea", 47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(120, "div", 46)(121, "label");
            i0.ɵɵtext(122, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(123, "textarea", 48);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(124, "label", 35);
            i0.ɵɵelement(125, "input", 49);
            i0.ɵɵelementStart(126, "span");
            i0.ɵɵtext(127, "\u0625\u0646\u0634\u0627\u0621 \u0627\u062E\u062A\u0628\u0627\u0631 \u0646\u0647\u0627\u0626\u064A");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(128, CoursesManagementComponent_div_128_Template, 7, 4, "div", 50);
            i0.ɵɵelementStart(129, "div", 38)(130, "button", 39);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_130_listener() { return ctx.closeAiDialog(); });
            i0.ɵɵtext(131, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(132, "button", 51);
            i0.ɵɵtext(133);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(134, "button", 52);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_134_listener() { return ctx.createCourseFromAiDraft(); });
            i0.ɵɵtext(135);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(136, "app-dialog", 53, 2)(138, "form", 20);
            i0.ɵɵlistener("ngSubmit", function CoursesManagementComponent_Template_form_ngSubmit_138_listener() { return ctx.submitLesson(); });
            i0.ɵɵelementStart(139, "div", 21)(140, "div", 22)(141, "label");
            i0.ɵɵtext(142, "\u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(143, "select", 54);
            i0.ɵɵtemplate(144, CoursesManagementComponent_option_144_Template, 2, 2, "option", 55);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(145, CoursesManagementComponent_div_145_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(146, "div", 22)(147, "label");
            i0.ɵɵtext(148, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0631\u0633");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(149, "input", 23);
            i0.ɵɵtemplate(150, CoursesManagementComponent_div_150_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(151, "div", 22)(152, "label");
            i0.ɵɵtext(153, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(154, "select", 56)(155, "option", 57);
            i0.ɵɵtext(156, "\u0641\u064A\u062F\u064A\u0648");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(157, "option", 58);
            i0.ɵɵtext(158, "\u0645\u0642\u0627\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(159, "option", 59);
            i0.ɵɵtext(160, "PDF");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(161, "option", 60);
            i0.ɵɵtext(162, "\u0645\u0647\u0645\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(163, CoursesManagementComponent_div_163_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(164, "div", 22)(165, "label");
            i0.ɵɵtext(166, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(167, "input", 61);
            i0.ɵɵtemplate(168, CoursesManagementComponent_div_168_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(169, "div", 22)(170, "label");
            i0.ɵɵtext(171, "\u0627\u0644\u0645\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(172, "input", 62);
            i0.ɵɵtemplate(173, CoursesManagementComponent_div_173_Template, 2, 1, "div", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(174, "div", 46)(175, "label");
            i0.ɵɵtext(176, "\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(177, "input", 63);
            i0.ɵɵelementStart(178, "div", 64);
            i0.ɵɵtext(179);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(180, CoursesManagementComponent_div_180_Template, 6, 0, "div", 65);
            i0.ɵɵelementStart(181, "div", 46)(182, "label");
            i0.ɵɵtext(183, "\u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(184, "input", 66);
            i0.ɵɵlistener("change", function CoursesManagementComponent_Template_input_change_184_listener($event) { return ctx.onLessonFileSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(185, CoursesManagementComponent_div_185_Template, 2, 1, "div", 67)(186, CoursesManagementComponent_div_186_Template, 2, 0, "div", 67);
            i0.ɵɵelementStart(187, "div", 64);
            i0.ɵɵtext(188, " \u0644\u0625\u0646\u0634\u0627\u0621 \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0633\u062A\u062E\u062F\u0645 \u0634\u0627\u0634\u0629 \"\u0627\u0644\u062F\u0631\u0648\u0633\" \u0627\u0644\u062E\u0627\u0635\u0629 \u0628\u0627\u0644\u062F\u0648\u0631\u0629. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(189, "label", 35);
            i0.ɵɵelement(190, "input", 68);
            i0.ɵɵelementStart(191, "span");
            i0.ɵɵtext(192, "\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633 \u0625\u0644\u0632\u0627\u0645\u064A \u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(193, CoursesManagementComponent_div_193_Template, 2, 1, "div", 24);
            i0.ɵɵelementStart(194, "div", 38)(195, "button", 39);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_195_listener() { return ctx.closeLessonDialog(); });
            i0.ɵɵtext(196, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(197, "button", 51);
            i0.ɵɵtext(198, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633");
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(199, "app-dialog", 69, 3)(201, "div", 4)(202, "div", 70);
            i0.ɵɵtext(203, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0648\u0631\u0629 ");
            i0.ɵɵtemplate(204, CoursesManagementComponent_strong_204_Template, 2, 1, "strong", 71);
            i0.ɵɵtext(205, " \u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(206, "div", 38)(207, "button", 39);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_207_listener() { return ctx.closeDeleteDialog(); });
            i0.ɵɵtext(208, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(209, "button", 72);
            i0.ɵɵlistener("click", function CoursesManagementComponent_Template_button_click_209_listener() { return ctx.confirmDelete(); });
            i0.ɵɵtext(210, "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("size", 20);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("size", 18);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("columns", ctx.columns)("rows", ctx.rows())("actions", ctx.actions);
            i0.ɵɵadvance();
            i0.ɵɵproperty("title", ctx.isEditMode() ? "\u062A\u0639\u062F\u064A\u0644 \u062F\u0648\u0631\u0629" : "\u0625\u0636\u0627\u0641\u0629 \u062F\u0648\u0631\u0629")("subtitle", ctx.isEditMode() ? "\u062D\u062F\u0651\u062B \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629 \u062B\u0645 \u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A." : "\u062A\u0639\u0631\u064A\u0641 \u062F\u0648\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u0648\u0631\u0628\u0637\u0647\u0627 \u0628\u0627\u0644\u0645\u0647\u0627\u0631\u0627\u062A \u0648\u0627\u0644\u0645\u0624\u0634\u0631\u0627\u062A.")("icon", ctx.isEditMode() ? "book" : "book-open");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.courseForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.courseForm.controls.title));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.courseForm.controls.title));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.courseForm.controls.difficulty));
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.courseForm.controls.difficulty));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.courseForm.controls.estimatedDurationMinutes));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.courseForm.controls.estimatedDurationMinutes));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canManageCourseLookups());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.canManageCourseLookups());
            i0.ɵɵadvance(18);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.courseForm.controls.description));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.courseForm.controls.description));
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.courseForm.invalid);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.isEditMode() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u062D\u0641\u0638 \u0627\u0644\u062F\u0648\u0631\u0629", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.aiDraftForm);
            i0.ɵɵadvance(44);
            i0.ɵɵproperty("ngIf", ctx.aiDraftPreview());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.aiDraftForm.invalid || ctx.loadingAiDraft());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.loadingAiDraft() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0648\u0644\u064A\u062F..." : "\u062A\u0648\u0644\u064A\u062F \u0627\u0644\u0645\u0633\u0648\u062F\u0629", " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("disabled", !ctx.aiDraftPreview() || ctx.creatingAiCourse());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.creatingAiCourse() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u0625\u0646\u0634\u0627\u0621..." : "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062F\u0648\u0631\u0629 \u0645\u0646 \u0627\u0644\u0645\u0633\u0648\u062F\u0629", " ");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("formGroup", ctx.lessonForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.courseId));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.courses());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.courseId));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.title));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.title));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.contentType));
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.contentType));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.order));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.order));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.durationMinutes));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.durationMinutes));
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.lessonUrlHelpText());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.lessonUsesTextContent());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.uploadedLessonFileName());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.uploadedLessonFileName());
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.hasLessonContentError());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.lessonForm.invalid);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngIf", ctx.deletingCourse());
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.SelectMultipleControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DataTableComponent, DialogComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .field--full[_ngcontent-%COMP%] {\n        grid-column: 1 / -1;\n      }\n\n      .field-help[_ngcontent-%COMP%] {\n        margin-top: 0.45rem;\n        font-size: 0.9rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .checkbox-field[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n        color: var(--color-primary-text);\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CoursesManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-courses-management', standalone: true, imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title label-with-icon">
              <span class="icon-badge"><app-icon name="book-open" [size]="20" /></span>
              <span>إدارة الدورات</span>
            </h2>
            <p class="section-subtitle">إنشاء الدورات والدروس عبر نوافذ مستقلة بدلاً من النماذج المضمنة.</p>
          </div>
          <div class="panel-actions">
            <button class="btn btn-primary" type="button" (click)="openCourseDialog()">
              <span class="btn-content">
                <app-icon name="book-open" [size]="18" />
                <span>إضافة دورة</span>
              </span>
            </button>
            <button class="btn btn-secondary" type="button" (click)="openAiDialog()">
              <span class="btn-content">
                <app-icon name="sparkles" [size]="18" />
                <span>توليد بالذكاء الاصطناعي</span>
              </span>
            </button>
            <button class="btn btn-secondary" type="button" (click)="openLessonDialog()">
              <span class="btn-content">
                <app-icon name="graduation" [size]="18" />
                <span>إضافة درس</span>
              </span>
            </button>
          </div>
        </div>
      </article>

      <article class="card panel">
        <h2 class="section-title">الدورات الحالية</h2>
        <app-data-table [columns]="columns" [rows]="rows()" [actions]="actions" (actionClicked)="handleTableAction($event)" />
      </article>

      <app-dialog
        #courseDialog
        [title]="isEditMode() ? 'تعديل دورة' : 'إضافة دورة'"
        [subtitle]="
          isEditMode()
            ? 'حدّث معلومات الدورة الحالية ثم احفظ التغييرات.'
            : 'تعريف دورة جديدة وربطها بالمهارات والمؤشرات.'
        "
        [icon]="isEditMode() ? 'book' : 'book-open'"
      >
        <form class="dialog-form" [formGroup]="courseForm" (ngSubmit)="submitCourse()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>عنوان الدورة</label>
              <input formControlName="title" [class.is-invalid]="hasVisibleError(courseForm.controls.title)" />
              <div class="field-error" *ngIf="hasVisibleError(courseForm.controls.title)">
                {{ getVisibleErrorMessage(courseForm.controls.title, courseValidationMessages.title) }}
              </div>
            </div>
            <div class="field">
              <label>المستوى</label>
              <select formControlName="difficulty" [class.is-invalid]="hasVisibleError(courseForm.controls.difficulty)">
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(courseForm.controls.difficulty)">
                {{ getVisibleErrorMessage(courseForm.controls.difficulty, courseValidationMessages.difficulty) }}
              </div>
            </div>
            <div class="field">
              <label>المدة التقديرية</label>
              <input
                type="number"
                formControlName="estimatedDurationMinutes"
                [class.is-invalid]="hasVisibleError(courseForm.controls.estimatedDurationMinutes)"
              />
              <div class="field-error" *ngIf="hasVisibleError(courseForm.controls.estimatedDurationMinutes)">
                {{
                  getVisibleErrorMessage(
                    courseForm.controls.estimatedDurationMinutes,
                    courseValidationMessages.estimatedDurationMinutes
                  )
                }}
              </div>
            </div>
            <div class="field" *ngIf="canManageCourseLookups()">
              <label>المهارات</label>
              <select multiple formControlName="skillIds">
                <option *ngFor="let skill of skills()" [value]="skill._id">{{ skill.name }}</option>
              </select>
            </div>
            <div class="field" *ngIf="canManageCourseLookups()">
              <label>المؤشرات</label>
              <select multiple formControlName="kpiIds">
                <option *ngFor="let kpi of kpis()" [value]="kpi._id">{{ kpi.name }}</option>
              </select>
            </div>
            <div class="field">
              <label>الحالة</label>
              <select formControlName="status">
                <option value="draft">مسودة</option>
                <option value="published">منشورة</option>
                <option value="archived">مؤرشفة</option>
              </select>
            </div>
            <label class="checkbox-field field--full">
              <input type="checkbox" formControlName="certificateEnabled" />
              <span>تفعيل شهادة إتمام لهذه الدورة</span>
            </label>
          </div>
          <div class="field">
            <label>الوصف</label>
            <textarea
              rows="4"
              formControlName="description"
              [class.is-invalid]="hasVisibleError(courseForm.controls.description)"
            ></textarea>
            <div class="field-error" *ngIf="hasVisibleError(courseForm.controls.description)">
              {{ getVisibleErrorMessage(courseForm.controls.description, courseValidationMessages.description) }}
            </div>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeCourseDialog()">إلغاء</button>
            <button class="btn btn-primary" type="submit" [disabled]="courseForm.invalid">
              {{ isEditMode() ? 'حفظ التعديلات' : 'حفظ الدورة' }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #aiDialog
        title="إنشاء دورة بالذكاء الاصطناعي"
        subtitle="ولّد دورة مبدئية مع الدروس والشرائح والاختبار النهائي ثم راجعها قبل الحفظ."
        icon="sparkles"
      >
        <form class="dialog-form" [formGroup]="aiDraftForm" (ngSubmit)="generateAiDraft()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>موضوع الدورة</label>
              <input formControlName="topic" />
            </div>
            <div class="field">
              <label>الفئة المستهدفة</label>
              <input formControlName="targetAudience" />
            </div>
            <div class="field">
              <label>المستوى</label>
              <select formControlName="difficulty">
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>
            <div class="field">
              <label>المدة التقديرية</label>
              <input type="number" formControlName="estimatedDurationMinutes" />
            </div>
            <div class="field">
              <label>عدد الدروس</label>
              <input type="number" formControlName="lessonCount" />
            </div>
            <div class="field">
              <label>عدد أسئلة الاختبار النهائي</label>
              <input type="number" formControlName="finalExamQuestionCount" />
            </div>
            <div class="field field--full">
              <label>الأهداف التعليمية</label>
              <textarea rows="3" formControlName="learningObjectives"></textarea>
            </div>
            <div class="field field--full">
              <label>ملاحظات إضافية</label>
              <textarea rows="3" formControlName="notes"></textarea>
            </div>
            <label class="checkbox-field field--full">
              <input type="checkbox" formControlName="includeFinalExam" />
              <span>إنشاء اختبار نهائي</span>
            </label>
          </div>

          <div class="message-box info" *ngIf="aiDraftPreview() as draft">
            <strong>{{ draft.course.title }}</strong>
            <p>{{ draft.course.description }}</p>
            <p>{{ draft.lessons.length }} دروس • {{ draft.finalQuiz?.questions?.length || 0 }} أسئلة نهائية</p>
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeAiDialog()">إلغاء</button>
            <button class="btn btn-secondary" type="submit" [disabled]="aiDraftForm.invalid || loadingAiDraft()">
              {{ loadingAiDraft() ? 'جارٍ التوليد...' : 'توليد المسودة' }}
            </button>
            <button class="btn btn-primary" type="button" (click)="createCourseFromAiDraft()" [disabled]="!aiDraftPreview() || creatingAiCourse()">
              {{ creatingAiCourse() ? 'جارٍ الإنشاء...' : 'إنشاء الدورة من المسودة' }}
            </button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #lessonDialog
        title="إضافة درس"
        subtitle="إثراء الدورات القائمة بدروس قابلة للتتبع."
        icon="graduation"
      >
        <form class="dialog-form" [formGroup]="lessonForm" (ngSubmit)="submitLesson()" novalidate>
          <div class="form-grid">
            <div class="field">
              <label>الدورة</label>
              <select formControlName="courseId" [class.is-invalid]="hasVisibleError(lessonForm.controls.courseId)">
                <option *ngFor="let course of courses()" [value]="course._id || course.id">{{ course.title }}</option>
              </select>
              <div class="field-error" *ngIf="hasVisibleError(lessonForm.controls.courseId)">
                {{ getVisibleErrorMessage(lessonForm.controls.courseId, lessonValidationMessages.courseId) }}
              </div>
            </div>
            <div class="field">
              <label>عنوان الدرس</label>
              <input formControlName="title" [class.is-invalid]="hasVisibleError(lessonForm.controls.title)" />
              <div class="field-error" *ngIf="hasVisibleError(lessonForm.controls.title)">
                {{ getVisibleErrorMessage(lessonForm.controls.title, lessonValidationMessages.title) }}
              </div>
            </div>
            <div class="field">
              <label>نوع المحتوى</label>
              <select formControlName="contentType" [class.is-invalid]="hasVisibleError(lessonForm.controls.contentType)">
              <option value="video">فيديو</option>
              <option value="article">مقال</option>
              <option value="pdf">PDF</option>
              <option value="task">مهمة</option>
            </select>
            <div class="field-error" *ngIf="hasVisibleError(lessonForm.controls.contentType)">
              {{ getVisibleErrorMessage(lessonForm.controls.contentType, lessonValidationMessages.contentType) }}
            </div>
            </div>
            <div class="field">
              <label>الترتيب</label>
              <input type="number" formControlName="order" [class.is-invalid]="hasVisibleError(lessonForm.controls.order)" />
              <div class="field-error" *ngIf="hasVisibleError(lessonForm.controls.order)">
                {{ getVisibleErrorMessage(lessonForm.controls.order, lessonValidationMessages.order) }}
              </div>
            </div>
            <div class="field">
              <label>المدة</label>
              <input
                type="number"
                formControlName="durationMinutes"
                [class.is-invalid]="hasVisibleError(lessonForm.controls.durationMinutes)"
              />
              <div class="field-error" *ngIf="hasVisibleError(lessonForm.controls.durationMinutes)">
                {{ getVisibleErrorMessage(lessonForm.controls.durationMinutes, lessonValidationMessages.durationMinutes) }}
              </div>
            </div>

            <div class="field field--full">
              <label>رابط المحتوى</label>
              <input formControlName="contentUrl" placeholder="https://example.com/lesson أو سيتم تعبئته من الملف" />
              <div class="field-help">{{ lessonUrlHelpText() }}</div>
            </div>

            <div class="field field--full" *ngIf="lessonUsesTextContent()">
              <label>نص المحتوى</label>
              <textarea
                rows="7"
                formControlName="contentHtml"
                placeholder="اكتب محتوى الدرس هنا أو الصق HTML بسيطاً."
              ></textarea>
              <div class="field-help">للمقالات أو التعليمات النصية أو المحتوى المنسوخ.</div>
            </div>

            <div class="field field--full">
              <label>رفع ملف المحتوى</label>
              <input type="file" (change)="onLessonFileSelected($event)" />
              <div class="field-help" *ngIf="uploadedLessonFileName()">تم اختيار الملف: {{ uploadedLessonFileName() }}</div>
            <div class="field-help" *ngIf="!uploadedLessonFileName()">
              يتم حفظ الملف محلياً داخل بيانات الدرس حالياً، وليس في مخزن ملفات خارجي.
            </div>
            <div class="field-help">
              لإنشاء اختبار متعدد الخيارات استخدم شاشة "الدروس" الخاصة بالدورة.
            </div>
          </div>

            <label class="checkbox-field field--full">
              <input type="checkbox" formControlName="isRequired" />
              <span>هذا الدرس إلزامي لإكمال الدورة</span>
            </label>
          </div>

          <div class="field-error" *ngIf="hasLessonContentError()">
            {{ lessonContentErrorMessage() }}
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeLessonDialog()">إلغاء</button>
            <button class="btn btn-secondary" type="submit" [disabled]="lessonForm.invalid">إضافة درس</button>
          </div>
        </form>
      </app-dialog>

      <app-dialog
        #deleteDialog
        title="تأكيد حذف الدورة"
        subtitle="سيتم حذف الدورة نهائياً بعد التأكيد."
        icon="alert"
      >
        <div class="page-grid">
          <div class="message-box error">
            هل أنت متأكد من حذف الدورة
            <strong *ngIf="deletingCourse() as course">{{ course.title }}</strong>
            ؟ لا يمكن التراجع عن هذا الإجراء.
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeDeleteDialog()">إلغاء</button>
            <button class="btn btn-danger" type="button" (click)="confirmDelete()">تأكيد الحذف</button>
          </div>
        </div>
      </app-dialog>
    </section>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .field--full {\n        grid-column: 1 / -1;\n      }\n\n      .field-help {\n        margin-top: 0.45rem;\n        font-size: 0.9rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .checkbox-field {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n        color: var(--color-primary-text);\n      }\n    "] }]
    }], null, { courseDialog: [{ type: i0.ViewChild, args: ['courseDialog', { isSignal: true }] }], aiDialog: [{ type: i0.ViewChild, args: ['aiDialog', { isSignal: true }] }], lessonDialog: [{ type: i0.ViewChild, args: ['lessonDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CoursesManagementComponent, { className: "CoursesManagementComponent", filePath: "src/app/features/admin/pages/courses-management.component.ts", lineNumber: 385 }); })();
//# sourceMappingURL=courses-management.component.js.map