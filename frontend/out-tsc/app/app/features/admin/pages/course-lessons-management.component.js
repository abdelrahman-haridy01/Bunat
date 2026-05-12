import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { DialogComponent, EmptyStateComponent, IconComponent } from '../../../shared/components';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["lessonDialog"];
const _c1 = ["deleteDialog"];
function CourseLessonsManagementComponent_article_1_div_31_article_1_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 55);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.quizSummaryLabel(lesson_r4), " ");
} }
function CourseLessonsManagementComponent_article_1_div_31_article_1_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 55);
    i0.ɵɵtext(1, "\u064A\u0648\u062C\u062F \u0631\u0627\u0628\u0637 \u0623\u0648 \u0645\u0644\u0641 \u0645\u062D\u0641\u0648\u0638 \u0644\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633.");
    i0.ɵɵelementEnd();
} }
function CourseLessonsManagementComponent_article_1_div_31_article_1_pre_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "pre", 56);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.previewText(lesson_r4.contentHtml));
} }
function CourseLessonsManagementComponent_article_1_div_31_article_1_p_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 55);
    i0.ɵɵtext(1, " \u0644\u0645 \u062A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u062D\u062A\u0648\u0649 \u0644\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633 \u0628\u0639\u062F. ");
    i0.ɵɵelementEnd();
} }
function CourseLessonsManagementComponent_article_1_div_31_article_1_a_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 57);
    i0.ɵɵtext(1, " \u0641\u062A\u062D \u0627\u0644\u0645\u062D\u062A\u0648\u0649 ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("href", lesson_r4.contentUrl, i0.ɵɵsanitizeUrl);
} }
function CourseLessonsManagementComponent_article_1_div_31_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 44)(1, "div", 45)(2, "div", 46)(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 47);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, CourseLessonsManagementComponent_article_1_div_31_article_1_p_10_Template, 2, 1, "p", 48)(11, CourseLessonsManagementComponent_article_1_div_31_article_1_p_11_Template, 2, 0, "p", 48)(12, CourseLessonsManagementComponent_article_1_div_31_article_1_pre_12_Template, 2, 1, "pre", 49)(13, CourseLessonsManagementComponent_article_1_div_31_article_1_p_13_Template, 2, 0, "p", 48);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 50);
    i0.ɵɵtemplate(15, CourseLessonsManagementComponent_article_1_div_31_article_1_a_15_Template, 2, 1, "a", 51);
    i0.ɵɵelementStart(16, "button", 24);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_div_31_article_1_Template_button_click_16_listener() { const lesson_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openEditLessonDialog(lesson_r4)); });
    i0.ɵɵelementStart(17, "span", 37);
    i0.ɵɵelement(18, "app-icon", 52);
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "\u062A\u0639\u062F\u064A\u0644");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "button", 53);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_div_31_article_1_Template_button_click_21_listener() { const lesson_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openDeleteLessonDialog(lesson_r4)); });
    i0.ɵɵelementStart(22, "span", 37);
    i0.ɵɵelement(23, "app-icon", 54);
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "\u062D\u0630\u0641");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const lesson_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", lesson_r4.order, ". ", lesson_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.contentTypeLabel(lesson_r4.contentType), " \u2022 ", lesson_r4.durationMinutes, " \u062F\u0642\u064A\u0642\u0629");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("success", lesson_r4.isRequired)("muted", !lesson_r4.isRequired);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", lesson_r4.isRequired ? "\u0625\u0644\u0632\u0627\u0645\u064A" : "\u0627\u062E\u062A\u064A\u0627\u0631\u064A", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r4.contentType === "quiz");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r4.contentUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r4.contentHtml);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !lesson_r4.contentUrl && !lesson_r4.contentHtml && lesson_r4.contentType !== "quiz");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", lesson_r4.contentUrl);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", 18);
} }
function CourseLessonsManagementComponent_article_1_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 42);
    i0.ɵɵtemplate(1, CourseLessonsManagementComponent_article_1_div_31_article_1_Template, 26, 16, "article", 43);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.lessons());
} }
function CourseLessonsManagementComponent_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 30)(1, "div", 31)(2, "div")(3, "h2", 32);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 33);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 34)(8, "span", 35);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 36);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreateLessonDialog()); });
    i0.ɵɵelementStart(11, "span", 37);
    i0.ɵɵelement(12, "app-icon", 38);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(15, "div", 39)(16, "div", 40)(17, "strong");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "span");
    i0.ɵɵtext(20, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0631\u0648\u0633");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(21, "div", 40)(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "\u062F\u0631\u0648\u0633 \u0625\u0644\u0632\u0627\u0645\u064A\u0629");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 40)(27, "strong");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0642\u0627\u0626\u0642");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(31, CourseLessonsManagementComponent_article_1_div_31_Template, 2, 1, "div", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r1 = i0.ɵɵnextContext();
    const noLessons_r5 = i0.ɵɵreference(5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r1.course()) == null ? null : tmp_5_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_6_0 = ctx_r1.course()) == null ? null : tmp_6_0.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.difficultyLabel(((tmp_7_0 = ctx_r1.course()) == null ? null : tmp_7_0.difficulty) || "beginner"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.lessons().length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.requiredLessonsCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.totalDurationMinutes());
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.lessons().length)("ngIfElse", noLessons_r5);
} }
function CourseLessonsManagementComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 58);
} }
function CourseLessonsManagementComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 59);
} }
function CourseLessonsManagementComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.title, ctx_r1.lessonValidationMessages.title), " ");
} }
function CourseLessonsManagementComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.contentType, ctx_r1.lessonValidationMessages.contentType), " ");
} }
function CourseLessonsManagementComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.order, ctx_r1.lessonValidationMessages.order), " ");
} }
function CourseLessonsManagementComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.durationMinutes, ctx_r1.lessonValidationMessages.durationMinutes), " ");
} }
function CourseLessonsManagementComponent_div_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61)(1, "label");
    i0.ɵɵtext(2, "\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 62);
    i0.ɵɵelementStart(4, "div", 63);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.lessonUrlHelpText());
} }
function CourseLessonsManagementComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 61)(1, "label");
    i0.ɵɵtext(2, "\u0646\u0635 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "textarea", 64);
    i0.ɵɵelementStart(4, "div", 63);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("placeholder", ctx_r1.isQuizContentType() ? "\u0623\u0636\u0641 \u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0642\u0635\u064A\u0631\u0629 \u0644\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0625\u0646 \u0644\u0632\u0645." : "\u0627\u0643\u062A\u0628 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062F\u0631\u0633 \u0647\u0646\u0627 \u0623\u0648 \u0627\u0644\u0635\u0642 HTML \u0628\u0633\u064A\u0637\u0627\u064B.");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isQuizContentType() ? "\u0627\u062E\u062A\u064A\u0627\u0631\u064A \u0644\u0639\u0631\u0636 \u0645\u0642\u062F\u0645\u0629 \u0642\u0635\u064A\u0631\u0629 \u0642\u0628\u0644 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631." : "\u0644\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0623\u0648 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0646\u0635\u064A\u0629 \u0623\u0648 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0645\u0646\u0633\u0648\u062E.", " ");
} }
function CourseLessonsManagementComponent_div_42_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0644\u0641: ", ctx_r1.uploadedLessonFileName());
} }
function CourseLessonsManagementComponent_div_42_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 63);
    i0.ɵɵtext(1, " \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641 \u0645\u062D\u0644\u064A\u0627\u064B \u062F\u0627\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u062D\u0627\u0644\u064A\u0627\u064B\u060C \u0648\u0644\u064A\u0633 \u0641\u064A \u0645\u062E\u0632\u0646 \u0645\u0644\u0641\u0627\u062A \u062E\u0627\u0631\u062C\u064A. ");
    i0.ɵɵelementEnd();
} }
function CourseLessonsManagementComponent_div_42_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "label");
    i0.ɵɵtext(2, "\u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 65);
    i0.ɵɵlistener("change", function CourseLessonsManagementComponent_div_42_Template_input_change_3_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onLessonFileSelected($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, CourseLessonsManagementComponent_div_42_div_4_Template, 2, 1, "div", 66)(5, CourseLessonsManagementComponent_div_42_div_5_Template, 2, 0, "div", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.uploadedLessonFileName());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.uploadedLessonFileName());
} }
function CourseLessonsManagementComponent_div_43_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "label");
    i0.ɵɵtext(2, "\u062F\u0631\u062C\u0629 \u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 %");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "input", 67);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_div_43_Template_input_input_3_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateQuizPassingScore($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 63);
    i0.ɵɵtext(5, "\u0633\u064A\u064F\u0639\u062A\u0628\u0631 \u0627\u0644\u0645\u0648\u0638\u0641 \u0646\u0627\u062C\u062D\u0627\u064B \u0639\u0646\u062F\u0645\u0627 \u064A\u0635\u0644 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u0646\u0633\u0628\u0629 \u0623\u0648 \u064A\u062A\u062C\u0627\u0648\u0632\u0647\u0627.");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("value", ctx_r1.quizPassingScore());
} }
function CourseLessonsManagementComponent_div_44_div_13_div_10_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 24);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_div_44_div_13_div_10_button_6_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const optionIndex_r12 = i0.ɵɵnextContext().index; const questionIndex_r10 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeQuizOption(questionIndex_r10, optionIndex_r12)); });
    i0.ɵɵtext(1, " \u062D\u0630\u0641 ");
    i0.ɵɵelementEnd();
} }
function CourseLessonsManagementComponent_div_44_div_13_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 76)(1, "input", 77);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_div_44_div_13_div_10_Template_input_input_1_listener($event) { const optionIndex_r12 = i0.ɵɵrestoreView(_r11).index; const questionIndex_r10 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQuizOptionText(questionIndex_r10, optionIndex_r12, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 78)(3, "input", 79);
    i0.ɵɵlistener("change", function CourseLessonsManagementComponent_div_44_div_13_div_10_Template_input_change_3_listener() { const option_r13 = i0.ɵɵrestoreView(_r11).$implicit; const questionIndex_r10 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setCorrectQuizOption(questionIndex_r10, option_r13.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "\u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, CourseLessonsManagementComponent_div_44_div_13_div_10_button_6_Template, 2, 0, "button", 80);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    const optionIndex_r12 = ctx.index;
    const question_r15 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", option_r13.text)("placeholder", "\u0627\u0644\u062E\u064A\u0627\u0631 " + (optionIndex_r12 + 1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "correct-" + question_r15.id)("checked", question_r15.correctOptionId === option_r13.id);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", question_r15.options.length > 2);
} }
function CourseLessonsManagementComponent_div_44_div_13_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 72)(1, "div", 73)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 24);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_div_44_div_13_Template_button_click_4_listener() { const questionIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeQuizQuestion(questionIndex_r10)); });
    i0.ɵɵtext(5, " \u062D\u0630\u0641 \u0627\u0644\u0633\u0624\u0627\u0644 ");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 9)(7, "label");
    i0.ɵɵtext(8, "\u0646\u0635 \u0627\u0644\u0633\u0624\u0627\u0644");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "input", 74);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_div_44_div_13_Template_input_input_9_listener($event) { const questionIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQuizQuestionPrompt(questionIndex_r10, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, CourseLessonsManagementComponent_div_44_div_13_div_10_Template, 7, 5, "div", 75);
    i0.ɵɵelementStart(11, "button", 24);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_div_44_div_13_Template_button_click_11_listener() { const questionIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addQuizOption(questionIndex_r10)); });
    i0.ɵɵtext(12, " \u0625\u0636\u0627\u0641\u0629 \u062E\u064A\u0627\u0631 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const question_r15 = ctx.$implicit;
    const questionIndex_r10 = ctx.index;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0633\u0624\u0627\u0644 ", questionIndex_r10 + 1);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("value", question_r15.prompt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", question_r15.options);
} }
function CourseLessonsManagementComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 61)(1, "div", 68)(2, "div", 69)(3, "div")(4, "strong");
    i0.ɵɵtext(5, "\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p", 63);
    i0.ɵɵtext(7, "\u0623\u0646\u0634\u0626 \u0623\u0633\u0626\u0644\u0629 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646 \u0645\u062A\u0639\u062F\u062F \u0648\u062D\u062F\u062F \u0625\u062C\u0627\u0628\u0629 \u0635\u062D\u064A\u062D\u0629 \u0648\u0627\u062D\u062F\u0629 \u0644\u0643\u0644 \u0633\u0624\u0627\u0644.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "button", 70);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_div_44_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addQuizQuestion()); });
    i0.ɵɵelementStart(9, "span", 37);
    i0.ɵɵelement(10, "app-icon", 38);
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12, "\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(13, CourseLessonsManagementComponent_div_44_div_13_Template, 13, 3, "div", 71);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.quizQuestions());
} }
function CourseLessonsManagementComponent_div_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.lessonContentErrorMessage(), " ");
} }
function CourseLessonsManagementComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.quizValidationError(), " ");
} }
function CourseLessonsManagementComponent_strong_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r16 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lesson_r16.title);
} }
function lessonContentValidator(control) {
    const contentType = control.get('contentType')?.value;
    const contentUrl = String(control.get('contentUrl')?.value || '').trim();
    const contentHtml = String(control.get('contentHtml')?.value || '').trim();
    if (!contentType) {
        return null;
    }
    if (contentType === 'quiz') {
        return null;
    }
    if (contentType === 'video' || contentType === 'pdf') {
        return contentUrl ? null : { contentMissing: true };
    }
    return contentUrl || contentHtml ? null : { contentMissing: true };
}
export class CourseLessonsManagementComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.route = inject(ActivatedRoute);
        this.coursesApi = inject(CoursesApiService);
        this.lessonDialog = viewChild.required('lessonDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.course = signal(null, ...(ngDevMode ? [{ debugName: "course" }] : /* istanbul ignore next */ []));
        this.lessons = signal([], ...(ngDevMode ? [{ debugName: "lessons" }] : /* istanbul ignore next */ []));
        this.editingLesson = signal(null, ...(ngDevMode ? [{ debugName: "editingLesson" }] : /* istanbul ignore next */ []));
        this.deletingLesson = signal(null, ...(ngDevMode ? [{ debugName: "deletingLesson" }] : /* istanbul ignore next */ []));
        this.savingLesson = signal(false, ...(ngDevMode ? [{ debugName: "savingLesson" }] : /* istanbul ignore next */ []));
        this.deletingLessonInFlight = signal(false, ...(ngDevMode ? [{ debugName: "deletingLessonInFlight" }] : /* istanbul ignore next */ []));
        this.uploadedLessonFileName = signal('', ...(ngDevMode ? [{ debugName: "uploadedLessonFileName" }] : /* istanbul ignore next */ []));
        this.quizQuestions = signal([], ...(ngDevMode ? [{ debugName: "quizQuestions" }] : /* istanbul ignore next */ []));
        this.quizPassingScore = signal(70, ...(ngDevMode ? [{ debugName: "quizPassingScore" }] : /* istanbul ignore next */ []));
        this.quizValidationError = signal('', ...(ngDevMode ? [{ debugName: "quizValidationError" }] : /* istanbul ignore next */ []));
        this.isEditMode = computed(() => !!this.editingLesson(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : /* istanbul ignore next */ []));
        this.requiredLessonsCount = computed(() => this.lessons().filter((lesson) => lesson.isRequired).length, ...(ngDevMode ? [{ debugName: "requiredLessonsCount" }] : /* istanbul ignore next */ []));
        this.totalDurationMinutes = computed(() => this.lessons().reduce((total, lesson) => total + lesson.durationMinutes, 0), ...(ngDevMode ? [{ debugName: "totalDurationMinutes" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.lessonValidationMessages = {
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
        this.lessonForm = this.fb.nonNullable.group({
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
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!courseId) {
            return;
        }
        this.loadData(courseId);
    }
    openCreateLessonDialog() {
        this.editingLesson.set(null);
        this.lessonForm.reset({
            title: '',
            contentType: 'article',
            order: this.lessons().length + 1,
            durationMinutes: 10,
            contentUrl: '',
            contentHtml: '',
            isRequired: true,
        });
        this.uploadedLessonFileName.set('');
        this.resetQuizBuilder();
        clearControlState(this.lessonForm);
        this.lessonDialog().open();
    }
    openEditLessonDialog(lesson) {
        this.editingLesson.set(lesson);
        this.lessonForm.reset({
            title: lesson.title,
            contentType: lesson.contentType,
            order: lesson.order,
            durationMinutes: lesson.durationMinutes,
            contentUrl: lesson.contentUrl || '',
            contentHtml: lesson.contentHtml || '',
            isRequired: lesson.isRequired,
        });
        this.uploadedLessonFileName.set('');
        this.loadQuizBuilder(lesson.quiz || null);
        clearControlState(this.lessonForm);
        this.lessonDialog().open();
    }
    closeLessonDialog() {
        this.uploadedLessonFileName.set('');
        this.editingLesson.set(null);
        this.resetQuizBuilder();
        this.lessonDialog().close();
    }
    openDeleteLessonDialog(lesson) {
        this.deletingLesson.set(lesson);
        this.deleteDialog().open();
    }
    closeDeleteLessonDialog() {
        this.deletingLesson.set(null);
        this.deleteDialog().close();
    }
    submitLesson() {
        if (this.lessonForm.invalid || this.savingLesson()) {
            touchAllControls(this.lessonForm);
            return;
        }
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!courseId) {
            return;
        }
        const formValue = this.lessonForm.getRawValue();
        const isQuiz = formValue.contentType === 'quiz';
        const quiz = isQuiz ? this.buildQuizPayload() : null;
        if (isQuiz && !quiz) {
            return;
        }
        const payload = {
            courseId,
            title: formValue.title.trim(),
            contentType: formValue.contentType,
            order: Number(formValue.order),
            durationMinutes: Number(formValue.durationMinutes),
            isRequired: formValue.isRequired,
            contentUrl: isQuiz ? undefined : formValue.contentUrl.trim() || undefined,
            contentHtml: formValue.contentHtml.trim() || undefined,
            quiz,
        };
        const editingLessonId = this.objectId(this.editingLesson() || {});
        const request = editingLessonId
            ? this.coursesApi.updateLesson(editingLessonId, payload)
            : this.coursesApi.createLesson(payload);
        this.savingLesson.set(true);
        request.pipe(finalize(() => this.savingLesson.set(false))).subscribe({
            next: () => {
                this.closeLessonDialog();
                this.loadData(courseId);
            },
        });
    }
    confirmDeleteLesson() {
        const courseId = this.route.snapshot.paramMap.get('id');
        const lessonId = this.objectId(this.deletingLesson() || {});
        if (!courseId || !lessonId || this.deletingLessonInFlight()) {
            return;
        }
        this.deletingLessonInFlight.set(true);
        this.coursesApi
            .deleteLesson(lessonId)
            .pipe(finalize(() => this.deletingLessonInFlight.set(false)))
            .subscribe({
            next: () => {
                this.closeDeleteLessonDialog();
                this.loadData(courseId);
            },
        });
    }
    lessonUsesTextContent() {
        return this.lessonForm.controls.contentType.value !== 'video' && this.lessonForm.controls.contentType.value !== 'pdf';
    }
    isQuizContentType() {
        return this.lessonForm.controls.contentType.value === 'quiz';
    }
    supportsLessonUrl() {
        return !this.isQuizContentType();
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
        if (this.isQuizContentType()) {
            return '';
        }
        return this.lessonUsesTextContent()
            ? 'أضف نص المحتوى أو رابطاً أو ملفاً للدرس.'
            : 'أضف رابط المحتوى أو ارفع ملفاً لهذا الدرس.';
    }
    updateQuizPassingScore(event) {
        const value = Number(event.target?.value || 0);
        this.quizPassingScore.set(Math.min(100, Math.max(0, value)));
        this.quizValidationError.set('');
    }
    addQuizQuestion() {
        this.quizQuestions.update((questions) => [...questions, this.createEmptyQuizQuestion()]);
        this.quizValidationError.set('');
    }
    removeQuizQuestion(questionIndex) {
        this.quizQuestions.update((questions) => questions.filter((_, index) => index !== questionIndex));
        this.quizValidationError.set('');
    }
    updateQuizQuestionPrompt(questionIndex, event) {
        const value = event.target?.value || '';
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex ? { ...question, prompt: value } : question));
        this.quizValidationError.set('');
    }
    addQuizOption(questionIndex) {
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex
            ? {
                ...question,
                options: [...question.options, this.createEmptyQuizOption()],
            }
            : question));
        this.quizValidationError.set('');
    }
    removeQuizOption(questionIndex, optionIndex) {
        this.quizQuestions.update((questions) => questions.map((question, index) => {
            if (index !== questionIndex || question.options.length <= 2) {
                return question;
            }
            const nextOptions = question.options.filter((_, currentOptionIndex) => currentOptionIndex !== optionIndex);
            const nextCorrectOptionId = nextOptions.some((option) => option.id === question.correctOptionId)
                ? question.correctOptionId
                : nextOptions[0]?.id || '';
            return {
                ...question,
                options: nextOptions,
                correctOptionId: nextCorrectOptionId,
            };
        }));
        this.quizValidationError.set('');
    }
    updateQuizOptionText(questionIndex, optionIndex, event) {
        const value = event.target?.value || '';
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex
            ? {
                ...question,
                options: question.options.map((option, currentOptionIndex) => currentOptionIndex === optionIndex ? { ...option, text: value } : option),
            }
            : question));
        this.quizValidationError.set('');
    }
    setCorrectQuizOption(questionIndex, optionId) {
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex ? { ...question, correctOptionId: optionId } : question));
        this.quizValidationError.set('');
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
    contentTypeLabel(value) {
        return {
            video: 'فيديو',
            article: 'مقال',
            pdf: 'PDF',
            quiz: 'اختبار',
            task: 'مهمة',
        }[value] || value;
    }
    difficultyLabel(value) {
        return {
            beginner: 'مبتدئ',
            intermediate: 'متوسط',
            advanced: 'متقدم',
        }[value] || value;
    }
    previewText(value) {
        if (!value) {
            return '';
        }
        return value.length > 280 ? `${value.slice(0, 280)}...` : value;
    }
    quizSummaryLabel(lesson) {
        const questionsCount = lesson.quiz?.questions?.length || 0;
        const passingScore = lesson.quiz?.passingScorePercentage ?? 70;
        return `${questionsCount} أسئلة • اجتياز من ${passingScore}%`;
    }
    objectId(item) {
        return item._id || item.id || '';
    }
    resetQuizBuilder() {
        this.quizQuestions.set([this.createEmptyQuizQuestion()]);
        this.quizPassingScore.set(70);
        this.quizValidationError.set('');
    }
    loadQuizBuilder(quiz) {
        if (!quiz?.questions?.length) {
            this.resetQuizBuilder();
            return;
        }
        this.quizQuestions.set(quiz.questions.map((question) => ({
            id: question.id,
            prompt: question.prompt,
            correctOptionId: question.correctOptionId || question.options[0]?.id || '',
            options: question.options.map((option) => ({
                id: option.id,
                text: option.text,
            })),
        })));
        this.quizPassingScore.set(quiz.passingScorePercentage ?? 70);
        this.quizValidationError.set('');
    }
    buildQuizPayload() {
        const questions = this.quizQuestions();
        if (!questions.length) {
            this.quizValidationError.set('أضف سؤالاً واحداً على الأقل للاختبار.');
            return null;
        }
        for (const [questionIndex, question] of questions.entries()) {
            if (!question.prompt.trim()) {
                this.quizValidationError.set(`أدخل نص السؤال رقم ${questionIndex + 1}.`);
                return null;
            }
            if (question.options.length < 2) {
                this.quizValidationError.set(`أضف خيارين على الأقل للسؤال رقم ${questionIndex + 1}.`);
                return null;
            }
            if (question.options.some((option) => !option.text.trim())) {
                this.quizValidationError.set(`أكمل نص جميع الخيارات في السؤال رقم ${questionIndex + 1}.`);
                return null;
            }
            if (!question.correctOptionId || !question.options.some((option) => option.id === question.correctOptionId)) {
                this.quizValidationError.set(`حدد الإجابة الصحيحة للسؤال رقم ${questionIndex + 1}.`);
                return null;
            }
        }
        this.quizValidationError.set('');
        return {
            passingScorePercentage: this.quizPassingScore(),
            questions: questions.map((question) => ({
                id: question.id,
                prompt: question.prompt.trim(),
                correctOptionId: question.correctOptionId,
                options: question.options.map((option) => ({
                    id: option.id,
                    text: option.text.trim(),
                })),
            })),
        };
    }
    createEmptyQuizQuestion() {
        const firstOption = this.createEmptyQuizOption();
        const secondOption = this.createEmptyQuizOption();
        return {
            id: crypto.randomUUID(),
            prompt: '',
            correctOptionId: firstOption.id,
            options: [firstOption, secondOption],
        };
    }
    createEmptyQuizOption() {
        return {
            id: crypto.randomUUID(),
            text: '',
        };
    }
    loadData(courseId) {
        forkJoin({
            course: this.coursesApi.getCourse(courseId),
            lessons: this.coursesApi.getLessons(courseId),
        }).subscribe(({ course, lessons }) => {
            this.course.set(course);
            this.lessons.set(lessons);
        });
    }
    static { this.ɵfac = function CourseLessonsManagementComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CourseLessonsManagementComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CourseLessonsManagementComponent, selectors: [["app-course-lessons-management"]], viewQuery: function CourseLessonsManagementComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.lessonDialog, _c0, 5)(ctx.deleteDialog, _c1, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(2);
        } }, decls: 68, vars: 29, consts: [["loadingState", ""], ["noLessons", ""], ["lessonDialog", ""], ["deleteDialog", ""], [1, "page-grid"], ["class", "card panel", 4, "ngIf", "ngIfElse"], ["icon", "graduation", 3, "title", "subtitle"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "title"], ["class", "field-error", 4, "ngIf"], ["formControlName", "contentType"], ["value", "video"], ["value", "article"], ["value", "pdf"], ["value", "quiz"], ["value", "task"], ["type", "number", "formControlName", "order"], ["type", "number", "formControlName", "durationMinutes"], ["class", "field field--full", 4, "ngIf"], [1, "checkbox-field", "field--full"], ["type", "checkbox", "formControlName", "isRequired"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633", "subtitle", "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title"], [1, "section-subtitle"], [1, "panel-actions"], [1, "status-chip", "info"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], [1, "btn-content"], ["name", "graduation", 3, "size"], [1, "summary-strip"], [1, "summary-item"], ["class", "lesson-list", 4, "ngIf", "ngIfElse"], [1, "lesson-list"], ["class", "lesson-card", 4, "ngFor", "ngForOf"], [1, "lesson-card"], [1, "lesson-card__body"], [1, "lesson-card__header"], [1, "status-chip"], ["class", "lesson-card__meta", 4, "ngIf"], ["class", "lesson-card__content", 4, "ngIf"], [1, "lesson-card__actions"], ["class", "btn btn-secondary", "target", "_blank", "rel", "noopener noreferrer", 3, "href", 4, "ngIf"], ["name", "book-open", 3, "size"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], ["name", "alert", 3, "size"], [1, "lesson-card__meta"], [1, "lesson-card__content"], ["target", "_blank", "rel", "noopener noreferrer", 1, "btn", "btn-secondary", 3, "href"], ["title", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629", "description", "\u064A\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u0629 \u0648\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0622\u0646."], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0631\u0648\u0633 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629", "description", "\u0623\u0636\u0641 \u0623\u0648\u0644 \u062F\u0631\u0633 \u0645\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0623\u0648 \u0627\u0644\u0645\u0644\u0641 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0627\u0634\u0629."], [1, "field-error"], [1, "field", "field--full"], ["formControlName", "contentUrl", "placeholder", "https://example.com/lesson \u0623\u0648 \u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u062A\u0647 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641"], [1, "field-help"], ["rows", "8", "formControlName", "contentHtml", 3, "placeholder"], ["type", "file", 3, "change"], ["class", "field-help", 4, "ngIf"], ["type", "number", "min", "0", "max", "100", 3, "input", "value"], [1, "quiz-builder"], [1, "quiz-builder__header"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["class", "quiz-question", 4, "ngFor", "ngForOf"], [1, "quiz-question"], [1, "quiz-question__header"], [3, "input", "value"], ["class", "quiz-option", 4, "ngFor", "ngForOf"], [1, "quiz-option"], [3, "input", "value", "placeholder"], [1, "quiz-option__correct"], ["type", "radio", 3, "change", "name", "checked"], ["class", "btn btn-ghost", "type", "button", 3, "click", 4, "ngIf"]], template: function CourseLessonsManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 4);
            i0.ɵɵtemplate(1, CourseLessonsManagementComponent_article_1_Template, 32, 9, "article", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, CourseLessonsManagementComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(4, CourseLessonsManagementComponent_ng_template_4_Template, 1, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(6, "app-dialog", 6, 2)(8, "form", 7);
            i0.ɵɵlistener("ngSubmit", function CourseLessonsManagementComponent_Template_form_ngSubmit_8_listener() { return ctx.submitLesson(); });
            i0.ɵɵelementStart(9, "div", 8)(10, "div", 9)(11, "label");
            i0.ɵɵtext(12, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0631\u0633");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 10);
            i0.ɵɵtemplate(14, CourseLessonsManagementComponent_div_14_Template, 2, 1, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 9)(16, "label");
            i0.ɵɵtext(17, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "select", 12)(19, "option", 13);
            i0.ɵɵtext(20, "\u0641\u064A\u062F\u064A\u0648");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option", 14);
            i0.ɵɵtext(22, "\u0645\u0642\u0627\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "option", 15);
            i0.ɵɵtext(24, "PDF");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "option", 16);
            i0.ɵɵtext(26, "\u0627\u062E\u062A\u0628\u0627\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "option", 17);
            i0.ɵɵtext(28, "\u0645\u0647\u0645\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(29, CourseLessonsManagementComponent_div_29_Template, 2, 1, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 9)(31, "label");
            i0.ɵɵtext(32, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "input", 18);
            i0.ɵɵtemplate(34, CourseLessonsManagementComponent_div_34_Template, 2, 1, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 9)(36, "label");
            i0.ɵɵtext(37, "\u0627\u0644\u0645\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(38, "input", 19);
            i0.ɵɵtemplate(39, CourseLessonsManagementComponent_div_39_Template, 2, 1, "div", 11);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(40, CourseLessonsManagementComponent_div_40_Template, 6, 1, "div", 20)(41, CourseLessonsManagementComponent_div_41_Template, 6, 2, "div", 20)(42, CourseLessonsManagementComponent_div_42_Template, 6, 2, "div", 20)(43, CourseLessonsManagementComponent_div_43_Template, 6, 1, "div", 20)(44, CourseLessonsManagementComponent_div_44_Template, 14, 2, "div", 20);
            i0.ɵɵelementStart(45, "label", 21);
            i0.ɵɵelement(46, "input", 22);
            i0.ɵɵelementStart(47, "span");
            i0.ɵɵtext(48, "\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633 \u0625\u0644\u0632\u0627\u0645\u064A \u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(49, CourseLessonsManagementComponent_div_49_Template, 2, 1, "div", 11)(50, CourseLessonsManagementComponent_div_50_Template, 2, 1, "div", 11);
            i0.ɵɵelementStart(51, "div", 23)(52, "button", 24);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_52_listener() { return ctx.closeLessonDialog(); });
            i0.ɵɵtext(53, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(54, "button", 25);
            i0.ɵɵtext(55);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(56, "app-dialog", 26, 3)(58, "div", 4)(59, "div", 27);
            i0.ɵɵtext(60, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633 ");
            i0.ɵɵtemplate(61, CourseLessonsManagementComponent_strong_61_Template, 2, 1, "strong", 28);
            i0.ɵɵtext(62, " \u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(63, "div", 23)(64, "button", 24);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_64_listener() { return ctx.closeDeleteLessonDialog(); });
            i0.ɵɵtext(65, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "button", 29);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_66_listener() { return ctx.confirmDeleteLesson(); });
            i0.ɵɵtext(67);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const loadingState_r17 = i0.ɵɵreference(3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.course())("ngIfElse", loadingState_r17);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("title", ctx.isEditMode() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062F\u0631\u0633" : "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633")("subtitle", ctx.isEditMode() ? "\u062D\u062F\u0651\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u0648\u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A." : "\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u0648\u0623\u0636\u0641 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0623\u0648 \u0623\u0646\u0634\u0626 \u0627\u062E\u062A\u0628\u0627\u0631\u0627\u064B \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A.");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.lessonForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.title));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.title));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.contentType));
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.contentType));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.order));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.order));
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.durationMinutes));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.durationMinutes));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.supportsLessonUrl());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.lessonUsesTextContent());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.supportsLessonUrl());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isQuizContentType());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isQuizContentType());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.hasLessonContentError());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.quizValidationError());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.lessonForm.invalid || ctx.savingLesson());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.savingLesson() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : ctx.isEditMode() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062F\u0631\u0633", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.deletingLesson());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.deletingLessonInFlight());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.deletingLessonInFlight() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DialogComponent, EmptyStateComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .summary-strip[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n        gap: 1rem;\n        margin-bottom: 1.25rem;\n      }\n\n      .summary-item[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .summary-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        font-size: 1.25rem;\n        color: var(--color-primary-text);\n      }\n\n      .summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .lesson-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .lesson-card[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .lesson-card__body[_ngcontent-%COMP%] {\n        min-width: 0;\n        flex: 1;\n      }\n\n      .lesson-card__header[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .lesson-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.35rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .lesson-card__meta[_ngcontent-%COMP%] {\n        font-size: 0.92rem;\n      }\n\n      .lesson-card__content[_ngcontent-%COMP%] {\n        margin: 0.85rem 0 0;\n        padding: 0.85rem;\n        white-space: pre-wrap;\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n        color: var(--color-primary-text);\n        font-family: inherit;\n      }\n\n      .lesson-card__actions[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n\n      .field--full[_ngcontent-%COMP%] {\n        grid-column: 1 / -1;\n      }\n\n      .field-help[_ngcontent-%COMP%] {\n        margin-top: 0.45rem;\n        font-size: 0.9rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .checkbox-field[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n        color: var(--color-primary-text);\n      }\n\n      .quiz-builder[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .quiz-builder__header[_ngcontent-%COMP%], \n   .quiz-question__header[_ngcontent-%COMP%], \n   .quiz-option[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 0.75rem;\n      }\n\n      .quiz-builder__header[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n      }\n\n      .quiz-question[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.9rem;\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n      }\n\n      .quiz-option[_ngcontent-%COMP%]   input[type='text'][_ngcontent-%COMP%], \n   .quiz-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:not([type]) {\n        flex: 1;\n      }\n\n      .quiz-option__correct[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.45rem;\n        white-space: nowrap;\n      }\n\n      .status-chip.muted[_ngcontent-%COMP%] {\n        background: var(--color-neutral-100);\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 720px) {\n        .summary-strip[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n\n        .lesson-card[_ngcontent-%COMP%], \n   .lesson-card__header[_ngcontent-%COMP%], \n   .quiz-builder__header[_ngcontent-%COMP%], \n   .quiz-question__header[_ngcontent-%COMP%], \n   .quiz-option[_ngcontent-%COMP%] {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CourseLessonsManagementComponent, [{
        type: Component,
        args: [{ selector: 'app-course-lessons-management', standalone: true, imports: [CommonModule, ReactiveFormsModule, DialogComponent, EmptyStateComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel" *ngIf="course(); else loadingState">
        <div class="panel-header">
          <div>
            <h2 class="section-title">{{ course()?.title }}</h2>
            <p class="section-subtitle">{{ course()?.description }}</p>
          </div>
          <div class="panel-actions">
            <span class="status-chip info">{{ difficultyLabel(course()?.difficulty || 'beginner') }}</span>
            <button class="btn btn-primary" type="button" (click)="openCreateLessonDialog()">
              <span class="btn-content">
                <app-icon name="graduation" [size]="18" />
                <span>إضافة درس</span>
              </span>
            </button>
          </div>
        </div>

        <div class="summary-strip">
          <div class="summary-item">
            <strong>{{ lessons().length }}</strong>
            <span>إجمالي الدروس</span>
          </div>
          <div class="summary-item">
            <strong>{{ requiredLessonsCount() }}</strong>
            <span>دروس إلزامية</span>
          </div>
          <div class="summary-item">
            <strong>{{ totalDurationMinutes() }}</strong>
            <span>إجمالي الدقائق</span>
          </div>
        </div>

        <div class="lesson-list" *ngIf="lessons().length; else noLessons">
          <article class="lesson-card" *ngFor="let lesson of lessons()">
            <div class="lesson-card__body">
              <div class="lesson-card__header">
                <div>
                  <strong>{{ lesson.order }}. {{ lesson.title }}</strong>
                  <p>{{ contentTypeLabel(lesson.contentType) }} • {{ lesson.durationMinutes }} دقيقة</p>
                </div>
                <span class="status-chip" [class.success]="lesson.isRequired" [class.muted]="!lesson.isRequired">
                  {{ lesson.isRequired ? 'إلزامي' : 'اختياري' }}
                </span>
              </div>

              <p class="lesson-card__meta" *ngIf="lesson.contentType === 'quiz'">
                {{ quizSummaryLabel(lesson) }}
              </p>
              <p class="lesson-card__meta" *ngIf="lesson.contentUrl">يوجد رابط أو ملف محفوظ لهذا الدرس.</p>
              <pre class="lesson-card__content" *ngIf="lesson.contentHtml">{{ previewText(lesson.contentHtml) }}</pre>
              <p class="lesson-card__meta" *ngIf="!lesson.contentUrl && !lesson.contentHtml && lesson.contentType !== 'quiz'">
                لم تتم إضافة محتوى لهذا الدرس بعد.
              </p>
            </div>

            <div class="lesson-card__actions">
              <a
                *ngIf="lesson.contentUrl"
                class="btn btn-secondary"
                [href]="lesson.contentUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                فتح المحتوى
              </a>
              <button class="btn btn-ghost" type="button" (click)="openEditLessonDialog(lesson)">
                <span class="btn-content">
                  <app-icon name="book-open" [size]="18" />
                  <span>تعديل</span>
                </span>
              </button>
              <button class="btn btn-danger" type="button" (click)="openDeleteLessonDialog(lesson)">
                <span class="btn-content">
                  <app-icon name="alert" [size]="18" />
                  <span>حذف</span>
                </span>
              </button>
            </div>
          </article>
        </div>
      </article>
    </section>

    <ng-template #loadingState>
      <app-empty-state title="جارٍ تحميل الدورة" description="يتم جلب بيانات الدورة والدروس الآن." />
    </ng-template>

    <ng-template #noLessons>
      <app-empty-state
        title="لا توجد دروس في هذه الدورة"
        description="أضف أول درس مع المحتوى أو الملف من هذه الشاشة."
      />
    </ng-template>

    <app-dialog
      #lessonDialog
      [title]="isEditMode() ? 'تعديل الدرس' : 'إضافة درس'"
      [subtitle]="
        isEditMode()
          ? 'حدّث بيانات الدرس واحفظ التغييرات.'
          : 'أدخل بيانات الدرس وأضف المحتوى أو أنشئ اختباراً متعدد الخيارات.'
      "
      icon="graduation"
    >
      <form class="dialog-form" [formGroup]="lessonForm" (ngSubmit)="submitLesson()" novalidate>
        <div class="form-grid">
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
              <option value="quiz">اختبار</option>
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

          <div class="field field--full" *ngIf="supportsLessonUrl()">
            <label>رابط المحتوى</label>
            <input formControlName="contentUrl" placeholder="https://example.com/lesson أو سيتم تعبئته من الملف" />
            <div class="field-help">{{ lessonUrlHelpText() }}</div>
          </div>

          <div class="field field--full" *ngIf="lessonUsesTextContent()">
            <label>نص المحتوى</label>
            <textarea
              rows="8"
              formControlName="contentHtml"
              [placeholder]="
                isQuizContentType()
                  ? 'أضف تعليمات قصيرة للاختبار إن لزم.'
                  : 'اكتب محتوى الدرس هنا أو الصق HTML بسيطاً.'
              "
            ></textarea>
            <div class="field-help">
              {{ isQuizContentType() ? 'اختياري لعرض مقدمة قصيرة قبل أسئلة الاختبار.' : 'للمقالات أو التعليمات النصية أو المحتوى المنسوخ.' }}
            </div>
          </div>

          <div class="field field--full" *ngIf="supportsLessonUrl()">
            <label>رفع ملف المحتوى</label>
            <input type="file" (change)="onLessonFileSelected($event)" />
            <div class="field-help" *ngIf="uploadedLessonFileName()">تم اختيار الملف: {{ uploadedLessonFileName() }}</div>
            <div class="field-help" *ngIf="!uploadedLessonFileName()">
              يتم حفظ الملف محلياً داخل بيانات الدرس حالياً، وليس في مخزن ملفات خارجي.
            </div>
          </div>

          <div class="field field--full" *ngIf="isQuizContentType()">
            <label>درجة الاجتياز %</label>
            <input type="number" [value]="quizPassingScore()" min="0" max="100" (input)="updateQuizPassingScore($event)" />
            <div class="field-help">سيُعتبر الموظف ناجحاً عندما يصل إلى هذه النسبة أو يتجاوزها.</div>
          </div>

          <div class="field field--full" *ngIf="isQuizContentType()">
            <div class="quiz-builder">
              <div class="quiz-builder__header">
                <div>
                  <strong>أسئلة الاختبار</strong>
                  <p class="field-help">أنشئ أسئلة اختيار من متعدد وحدد إجابة صحيحة واحدة لكل سؤال.</p>
                </div>
                <button class="btn btn-secondary" type="button" (click)="addQuizQuestion()">
                  <span class="btn-content">
                    <app-icon name="graduation" [size]="18" />
                    <span>إضافة سؤال</span>
                  </span>
                </button>
              </div>

              <div class="quiz-question" *ngFor="let question of quizQuestions(); let questionIndex = index">
                <div class="quiz-question__header">
                  <strong>السؤال {{ questionIndex + 1 }}</strong>
                  <button class="btn btn-ghost" type="button" (click)="removeQuizQuestion(questionIndex)">
                    حذف السؤال
                  </button>
                </div>

                <div class="field">
                  <label>نص السؤال</label>
                  <input [value]="question.prompt" (input)="updateQuizQuestionPrompt(questionIndex, $event)" />
                </div>

                <div class="quiz-option" *ngFor="let option of question.options; let optionIndex = index">
                  <input
                    [value]="option.text"
                    (input)="updateQuizOptionText(questionIndex, optionIndex, $event)"
                    [placeholder]="'الخيار ' + (optionIndex + 1)"
                  />
                  <label class="quiz-option__correct">
                    <input
                      type="radio"
                      [name]="'correct-' + question.id"
                      [checked]="question.correctOptionId === option.id"
                      (change)="setCorrectQuizOption(questionIndex, option.id)"
                    />
                    <span>الإجابة الصحيحة</span>
                  </label>
                  <button
                    *ngIf="question.options.length > 2"
                    class="btn btn-ghost"
                    type="button"
                    (click)="removeQuizOption(questionIndex, optionIndex)"
                  >
                    حذف
                  </button>
                </div>

                <button class="btn btn-ghost" type="button" (click)="addQuizOption(questionIndex)">
                  إضافة خيار
                </button>
              </div>
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
        <div class="field-error" *ngIf="quizValidationError()">
          {{ quizValidationError() }}
        </div>

        <div class="dialog-actions">
          <button class="btn btn-ghost" type="button" (click)="closeLessonDialog()">إلغاء</button>
          <button class="btn btn-primary" type="submit" [disabled]="lessonForm.invalid || savingLesson()">
            {{ savingLesson() ? 'جارٍ الحفظ...' : isEditMode() ? 'حفظ التعديلات' : 'إضافة الدرس' }}
          </button>
        </div>
      </form>
    </app-dialog>

    <app-dialog
      #deleteDialog
      title="تأكيد حذف الدرس"
      subtitle="سيتم حذف الدرس نهائياً بعد التأكيد."
      icon="alert"
    >
      <div class="page-grid">
        <div class="message-box error">
          هل أنت متأكد من حذف الدرس
          <strong *ngIf="deletingLesson() as lesson">{{ lesson.title }}</strong>
          ؟ لا يمكن التراجع عن هذا الإجراء.
        </div>

        <div class="dialog-actions">
          <button class="btn btn-ghost" type="button" (click)="closeDeleteLessonDialog()">إلغاء</button>
          <button class="btn btn-danger" type="button" (click)="confirmDeleteLesson()" [disabled]="deletingLessonInFlight()">
            {{ deletingLessonInFlight() ? 'جارٍ الحذف...' : 'تأكيد الحذف' }}
          </button>
        </div>
      </div>
    </app-dialog>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .summary-strip {\n        display: grid;\n        grid-template-columns: repeat(3, minmax(0, 1fr));\n        gap: 1rem;\n        margin-bottom: 1.25rem;\n      }\n\n      .summary-item {\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .summary-item strong {\n        display: block;\n        font-size: 1.25rem;\n        color: var(--color-primary-text);\n      }\n\n      .summary-item span {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .lesson-list {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .lesson-card {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .lesson-card__body {\n        min-width: 0;\n        flex: 1;\n      }\n\n      .lesson-card__header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .lesson-card p {\n        margin: 0.35rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .lesson-card__meta {\n        font-size: 0.92rem;\n      }\n\n      .lesson-card__content {\n        margin: 0.85rem 0 0;\n        padding: 0.85rem;\n        white-space: pre-wrap;\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n        color: var(--color-primary-text);\n        font-family: inherit;\n      }\n\n      .lesson-card__actions {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n\n      .field--full {\n        grid-column: 1 / -1;\n      }\n\n      .field-help {\n        margin-top: 0.45rem;\n        font-size: 0.9rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .checkbox-field {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n        color: var(--color-primary-text);\n      }\n\n      .quiz-builder {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .quiz-builder__header,\n      .quiz-question__header,\n      .quiz-option {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 0.75rem;\n      }\n\n      .quiz-builder__header {\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n      }\n\n      .quiz-question {\n        display: grid;\n        gap: 0.9rem;\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n      }\n\n      .quiz-option input[type='text'],\n      .quiz-option input:not([type]) {\n        flex: 1;\n      }\n\n      .quiz-option__correct {\n        display: flex;\n        align-items: center;\n        gap: 0.45rem;\n        white-space: nowrap;\n      }\n\n      .status-chip.muted {\n        background: var(--color-neutral-100);\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 720px) {\n        .summary-strip {\n          grid-template-columns: 1fr;\n        }\n\n        .lesson-card,\n        .lesson-card__header,\n        .quiz-builder__header,\n        .quiz-question__header,\n        .quiz-option {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }\n    "] }]
    }], null, { lessonDialog: [{ type: i0.ViewChild, args: ['lessonDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CourseLessonsManagementComponent, { className: "CourseLessonsManagementComponent", filePath: "src/app/features/admin/pages/course-lessons-management.component.ts", lineNumber: 509 }); })();
//# sourceMappingURL=course-lessons-management.component.js.map