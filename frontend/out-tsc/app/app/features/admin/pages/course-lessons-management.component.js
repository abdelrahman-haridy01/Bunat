import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild, } from '@angular/core';
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
const _c1 = ["finalExamDialog"];
const _c2 = ["deleteDialog"];
function CourseLessonsManagementComponent_article_1_article_41_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 57)(1, "div")(2, "strong");
    i0.ɵɵtext(3, "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 58)(7, "button", 27);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_article_41_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openFinalExamDialog()); });
    i0.ɵɵtext(8, "\u062A\u0639\u062F\u064A\u0644");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 42);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_article_41_Template_button_click_9_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeFinalQuiz()); });
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_8_0;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.quizSummaryLabel(((tmp_8_0 = ctx_r1.course()) == null ? null : tmp_8_0.finalQuiz) || null));
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("disabled", ctx_r1.savingFinalQuiz());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.savingFinalQuiz() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062D\u0630\u0641", " ");
} }
function CourseLessonsManagementComponent_article_1_div_42_article_1_p_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.resolveSlides(lesson_r5).length, " \u0634\u0631\u0627\u0626\u062D ");
} }
function CourseLessonsManagementComponent_article_1_div_42_article_1_p_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 70);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r5 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.quizSummaryLabel(lesson_r5.quiz || null), " ");
} }
function CourseLessonsManagementComponent_article_1_div_42_article_1_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 71)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const firstSlide_r6 = ctx.ngIf;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(firstSlide_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.previewText(firstSlide_r6.body));
} }
function CourseLessonsManagementComponent_article_1_div_42_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 61)(1, "div", 62)(2, "div", 63)(3, "div")(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "p");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "span", 64);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(10, CourseLessonsManagementComponent_article_1_div_42_article_1_p_10_Template, 2, 1, "p", 65)(11, CourseLessonsManagementComponent_article_1_div_42_article_1_p_11_Template, 2, 1, "p", 65)(12, CourseLessonsManagementComponent_article_1_div_42_article_1_div_12_Template, 5, 2, "div", 66);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 58)(14, "button", 27);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_div_42_article_1_Template_button_click_14_listener() { const lesson_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openEditLessonDialog(lesson_r5)); });
    i0.ɵɵelementStart(15, "span", 49);
    i0.ɵɵelement(16, "app-icon", 67);
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18, "\u062A\u0639\u062F\u064A\u0644");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "button", 68);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_div_42_article_1_Template_button_click_19_listener() { const lesson_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.openDeleteLessonDialog(lesson_r5)); });
    i0.ɵɵelementStart(20, "span", 49);
    i0.ɵɵelement(21, "app-icon", 69);
    i0.ɵɵelementStart(22, "span");
    i0.ɵɵtext(23, "\u062D\u0630\u0641");
    i0.ɵɵelementEnd()()()()();
} if (rf & 2) {
    const lesson_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", lesson_r5.order, ". ", lesson_r5.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.contentTypeLabel(lesson_r5.contentType), " \u2022 ", lesson_r5.durationMinutes, " \u062F\u0642\u064A\u0642\u0629");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("success", lesson_r5.isRequired)("muted", !lesson_r5.isRequired);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", lesson_r5.isRequired ? "\u0625\u0644\u0632\u0627\u0645\u064A" : "\u0627\u062E\u062A\u064A\u0627\u0631\u064A", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r5.contentType !== "quiz");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r5.contentType === "quiz");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r5.contentType !== "quiz" && ctx_r1.resolveSlides(lesson_r5)[0]);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("size", 18);
} }
function CourseLessonsManagementComponent_article_1_div_42_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 59);
    i0.ɵɵtemplate(1, CourseLessonsManagementComponent_article_1_div_42_article_1_Template, 24, 14, "article", 60);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.lessons());
} }
function CourseLessonsManagementComponent_article_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 43)(1, "div", 44)(2, "div")(3, "h2", 45);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 46);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 47)(8, "span", 48);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 37);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openFinalExamDialog()); });
    i0.ɵɵelementStart(11, "span", 49);
    i0.ɵɵelement(12, "app-icon", 50);
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "button", 51);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_1_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openCreateLessonDialog()); });
    i0.ɵɵelementStart(16, "span", 49);
    i0.ɵɵelement(17, "app-icon", 52);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(20, "div", 53)(21, "div", 54)(22, "strong");
    i0.ɵɵtext(23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span");
    i0.ɵɵtext(25, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0631\u0648\u0633");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(26, "div", 54)(27, "strong");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(29, "span");
    i0.ɵɵtext(30, "\u062F\u0631\u0648\u0633 \u0625\u0644\u0632\u0627\u0645\u064A\u0629");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(31, "div", 54)(32, "strong");
    i0.ɵɵtext(33);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(34, "span");
    i0.ɵɵtext(35, "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0642\u0627\u0626\u0642");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "div", 54)(37, "strong");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "span");
    i0.ɵɵtext(40, "\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(41, CourseLessonsManagementComponent_article_1_article_41_Template, 11, 3, "article", 55)(42, CourseLessonsManagementComponent_article_1_div_42_Template, 2, 1, "div", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    let tmp_11_0;
    let tmp_16_0;
    let tmp_17_0;
    const ctx_r1 = i0.ɵɵnextContext();
    const noLessons_r7 = i0.ɵɵreference(5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((tmp_7_0 = ctx_r1.course()) == null ? null : tmp_7_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_8_0 = ctx_r1.course()) == null ? null : tmp_8_0.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.difficultyLabel(((tmp_9_0 = ctx_r1.course()) == null ? null : tmp_9_0.difficulty) || "beginner"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(((tmp_11_0 = ctx_r1.course()) == null ? null : tmp_11_0.finalQuiz) ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u0646\u0647\u0627\u0626\u064A");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r1.lessons().length);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.requiredLessonsCount());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.totalDurationMinutes());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(((tmp_16_0 = ctx_r1.course()) == null ? null : tmp_16_0.finalQuiz == null ? null : tmp_16_0.finalQuiz.questions == null ? null : tmp_16_0.finalQuiz.questions.length) || 0);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", (tmp_17_0 = ctx_r1.course()) == null ? null : tmp_17_0.finalQuiz);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.lessons().length)("ngIfElse", noLessons_r7);
} }
function CourseLessonsManagementComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 72);
} }
function CourseLessonsManagementComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 73);
} }
function CourseLessonsManagementComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.title, ctx_r1.lessonValidationMessages.title), " ");
} }
function CourseLessonsManagementComponent_div_41_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 75);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.legacyConversionNotice(), " ");
} }
function CourseLessonsManagementComponent_section_42_article_12_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 77)(1, "div", 78)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 79)(5, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_section_42_article_12_Template_button_click_5_listener() { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.moveSlide(slideIndex_r10, -1)); });
    i0.ɵɵtext(6, " \u0644\u0644\u0623\u0639\u0644\u0649 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_section_42_article_12_Template_button_click_7_listener() { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.moveSlide(slideIndex_r10, 1)); });
    i0.ɵɵtext(8, " \u0644\u0644\u0623\u0633\u0641\u0644 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 42);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_section_42_article_12_Template_button_click_9_listener() { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeSlide(slideIndex_r10)); });
    i0.ɵɵtext(10, " \u062D\u0630\u0641 ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 11)(12, "label");
    i0.ɵɵtext(13, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0634\u0631\u064A\u062D\u0629");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 81);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_section_42_article_12_Template_input_input_14_listener($event) { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateSlideField(slideIndex_r10, "title", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 11)(16, "label");
    i0.ɵɵtext(17, "\u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u0634\u0631\u064A\u062D\u0629");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "textarea", 82);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_section_42_article_12_Template_textarea_input_18_listener($event) { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateSlideField(slideIndex_r10, "body", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 11)(20, "label");
    i0.ɵɵtext(21, "\u0631\u0627\u0628\u0637 \u0627\u0644\u0648\u0633\u0627\u0626\u0637");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(22, "input", 81);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_section_42_article_12_Template_input_input_22_listener($event) { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateSlideField(slideIndex_r10, "mediaUrl", $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(23, "div", 11)(24, "label");
    i0.ɵɵtext(25, "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0625\u0636\u0627\u0641\u064A\u0629");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "textarea", 83);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_section_42_article_12_Template_textarea_input_26_listener($event) { const slideIndex_r10 = i0.ɵɵrestoreView(_r9).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateSlideField(slideIndex_r10, "notes", $event)); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const slide_r11 = ctx.$implicit;
    const slideIndex_r10 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0634\u0631\u064A\u062D\u0629 ", slideIndex_r10 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", slideIndex_r10 === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", slideIndex_r10 === ctx_r1.slides().length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.slides().length === 1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", slide_r11.title);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", slide_r11.body);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", slide_r11.mediaUrl || "");
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", slide_r11.notes || "");
} }
function CourseLessonsManagementComponent_section_42_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.slidesValidationError(), " ");
} }
function CourseLessonsManagementComponent_section_42_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 30)(1, "div", 31)(2, "div")(3, "strong");
    i0.ɵɵtext(4, "\u0634\u0631\u0627\u0626\u062D \u0627\u0644\u062F\u0631\u0633");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 32);
    i0.ɵɵtext(6, "\u0623\u0636\u0641 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062F\u0631\u0633 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 \u0634\u0631\u0627\u0626\u062D \u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062A\u0646\u0642\u0644 \u0641\u064A \u0648\u0627\u062C\u0647\u0629 \u0627\u0644\u0645\u062A\u0639\u0644\u0645.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 37);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_section_42_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addSlide()); });
    i0.ɵɵelementStart(8, "span", 49);
    i0.ɵɵelement(9, "app-icon", 67);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11, "\u0625\u0636\u0627\u0641\u0629 \u0634\u0631\u064A\u062D\u0629");
    i0.ɵɵelementEnd()()()();
    i0.ɵɵtemplate(12, CourseLessonsManagementComponent_section_42_article_12_Template, 27, 8, "article", 76)(13, CourseLessonsManagementComponent_section_42_div_13_Template, 2, 1, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("size", 18);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.slides());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.slidesValidationError());
} }
function CourseLessonsManagementComponent_ng_template_43_article_11_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 86)(1, "input", 87);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_ng_template_43_article_11_div_15_Template_input_input_1_listener($event) { const optionIndex_r16 = i0.ɵɵrestoreView(_r15).index; const questionIndex_r14 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQuizOptionText(questionIndex_r14, optionIndex_r16, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 88)(3, "input", 89);
    i0.ɵɵlistener("change", function CourseLessonsManagementComponent_ng_template_43_article_11_div_15_Template_input_change_3_listener() { const option_r17 = i0.ɵɵrestoreView(_r15).$implicit; const questionIndex_r14 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.setCorrectQuizOption(questionIndex_r14, option_r17.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "\u0635\u062D\u064A\u062D");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_ng_template_43_article_11_div_15_Template_button_click_6_listener() { const optionIndex_r16 = i0.ɵɵrestoreView(_r15).index; const questionIndex_r14 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeQuizOption(questionIndex_r14, optionIndex_r16)); });
    i0.ɵɵtext(7, " \u062D\u0630\u0641 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r17 = ctx.$implicit;
    const optionIndex_r16 = ctx.index;
    const question_r18 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", option_r17.text)("placeholder", "\u0627\u0644\u062E\u064A\u0627\u0631 " + (optionIndex_r16 + 1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "correct-" + question_r18.id)("checked", question_r18.correctOptionId === option_r17.id);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", question_r18.options.length === 2);
} }
function CourseLessonsManagementComponent_ng_template_43_article_11_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 84)(1, "div", 78)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 79)(5, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_ng_template_43_article_11_Template_button_click_5_listener() { const questionIndex_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.moveQuizQuestion(questionIndex_r14, -1)); });
    i0.ɵɵtext(6, " \u0644\u0644\u0623\u0639\u0644\u0649 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_ng_template_43_article_11_Template_button_click_7_listener() { const questionIndex_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.moveQuizQuestion(questionIndex_r14, 1)); });
    i0.ɵɵtext(8, " \u0644\u0644\u0623\u0633\u0641\u0644 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 42);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_ng_template_43_article_11_Template_button_click_9_listener() { const questionIndex_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeQuizQuestion(questionIndex_r14)); });
    i0.ɵɵtext(10, " \u062D\u0630\u0641 ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 11)(12, "label");
    i0.ɵɵtext(13, "\u0646\u0635 \u0627\u0644\u0633\u0624\u0627\u0644");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 81);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_ng_template_43_article_11_Template_input_input_14_listener($event) { const questionIndex_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.updateQuizQuestionPrompt(questionIndex_r14, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, CourseLessonsManagementComponent_ng_template_43_article_11_div_15_Template, 8, 5, "div", 85);
    i0.ɵɵelementStart(16, "button", 37);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_ng_template_43_article_11_Template_button_click_16_listener() { const questionIndex_r14 = i0.ɵɵrestoreView(_r13).index; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addQuizOption(questionIndex_r14)); });
    i0.ɵɵtext(17, "\u0625\u0636\u0627\u0641\u0629 \u062E\u064A\u0627\u0631");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const question_r18 = ctx.$implicit;
    const questionIndex_r14 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0633\u0624\u0627\u0644 ", questionIndex_r14 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", questionIndex_r14 === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", questionIndex_r14 === ctx_r1.quizQuestions().length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.quizQuestions().length === 1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", question_r18.prompt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", question_r18.options);
} }
function CourseLessonsManagementComponent_ng_template_43_div_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.quizValidationError(), " ");
} }
function CourseLessonsManagementComponent_ng_template_43_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 30)(1, "div", 31)(2, "div")(3, "strong");
    i0.ɵɵtext(4, "\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 32);
    i0.ɵɵtext(6, "\u0648\u0627\u062C\u0647\u0629 \u062A\u062D\u0631\u064A\u0631 \u0645\u0628\u0633\u0637\u0629 \u0644\u0625\u0646\u0634\u0627\u0621 \u0623\u0633\u0626\u0644\u0629 \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0648\u0648\u0627\u0636\u062D\u0629.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 33)(8, "label");
    i0.ɵɵtext(9, "\u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 %");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 34);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_ng_template_43_Template_input_input_10_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateQuizPassingScore($event)); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(11, CourseLessonsManagementComponent_ng_template_43_article_11_Template, 18, 6, "article", 35);
    i0.ɵɵelementStart(12, "div", 36)(13, "button", 37);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_ng_template_43_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r12); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addQuizQuestion()); });
    i0.ɵɵtext(14, "\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644");
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, CourseLessonsManagementComponent_ng_template_43_div_15_Template, 2, 1, "div", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("value", ctx_r1.quizPassingScore());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.quizQuestions());
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", ctx_r1.quizValidationError());
} }
function CourseLessonsManagementComponent_article_63_div_15_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 86)(1, "input", 87);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_article_63_div_15_Template_input_input_1_listener($event) { const optionIndex_r22 = i0.ɵɵrestoreView(_r21).index; const questionIndex_r20 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateFinalQuizOptionText(questionIndex_r20, optionIndex_r22, $event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 88)(3, "input", 89);
    i0.ɵɵlistener("change", function CourseLessonsManagementComponent_article_63_div_15_Template_input_change_3_listener() { const option_r23 = i0.ɵɵrestoreView(_r21).$implicit; const questionIndex_r20 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.setCorrectFinalQuizOption(questionIndex_r20, option_r23.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5, "\u0635\u062D\u064A\u062D");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_63_div_15_Template_button_click_6_listener() { const optionIndex_r22 = i0.ɵɵrestoreView(_r21).index; const questionIndex_r20 = i0.ɵɵnextContext().index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removeFinalQuizOption(questionIndex_r20, optionIndex_r22)); });
    i0.ɵɵtext(7, " \u062D\u0630\u0641 ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r23 = ctx.$implicit;
    const optionIndex_r22 = ctx.index;
    const question_r24 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", option_r23.text)("placeholder", "\u0627\u0644\u062E\u064A\u0627\u0631 " + (optionIndex_r22 + 1));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("name", "final-correct-" + question_r24.id)("checked", question_r24.correctOptionId === option_r23.id);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("disabled", question_r24.options.length === 2);
} }
function CourseLessonsManagementComponent_article_63_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 84)(1, "div", 78)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 79)(5, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_63_Template_button_click_5_listener() { const questionIndex_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.moveFinalQuizQuestion(questionIndex_r20, -1)); });
    i0.ɵɵtext(6, " \u0644\u0644\u0623\u0639\u0644\u0649 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "button", 80);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_63_Template_button_click_7_listener() { const questionIndex_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.moveFinalQuizQuestion(questionIndex_r20, 1)); });
    i0.ɵɵtext(8, " \u0644\u0644\u0623\u0633\u0641\u0644 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "button", 42);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_63_Template_button_click_9_listener() { const questionIndex_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.removeFinalQuizQuestion(questionIndex_r20)); });
    i0.ɵɵtext(10, " \u062D\u0630\u0641 ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(11, "div", 11)(12, "label");
    i0.ɵɵtext(13, "\u0646\u0635 \u0627\u0644\u0633\u0624\u0627\u0644");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "input", 81);
    i0.ɵɵlistener("input", function CourseLessonsManagementComponent_article_63_Template_input_input_14_listener($event) { const questionIndex_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.updateFinalQuizQuestionPrompt(questionIndex_r20, $event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(15, CourseLessonsManagementComponent_article_63_div_15_Template, 8, 5, "div", 85);
    i0.ɵɵelementStart(16, "button", 37);
    i0.ɵɵlistener("click", function CourseLessonsManagementComponent_article_63_Template_button_click_16_listener() { const questionIndex_r20 = i0.ɵɵrestoreView(_r19).index; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.addFinalQuizOption(questionIndex_r20)); });
    i0.ɵɵtext(17, "\u0625\u0636\u0627\u0641\u0629 \u062E\u064A\u0627\u0631");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const question_r24 = ctx.$implicit;
    const questionIndex_r20 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0633\u0624\u0627\u0644 ", questionIndex_r20 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", questionIndex_r20 === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", questionIndex_r20 === ctx_r1.finalQuizQuestions().length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r1.finalQuizQuestions().length === 1);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("value", question_r24.prompt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", question_r24.options);
} }
function CourseLessonsManagementComponent_div_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 74);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.finalQuizValidationError(), " ");
} }
function CourseLessonsManagementComponent_strong_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r25 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lesson_r25.title);
} }
export class CourseLessonsManagementComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.route = inject(ActivatedRoute);
        this.coursesApi = inject(CoursesApiService);
        this.lessonDialog = viewChild.required('lessonDialog');
        this.finalExamDialog = viewChild.required('finalExamDialog');
        this.deleteDialog = viewChild.required('deleteDialog');
        this.course = signal(null, ...(ngDevMode ? [{ debugName: "course" }] : /* istanbul ignore next */ []));
        this.lessons = signal([], ...(ngDevMode ? [{ debugName: "lessons" }] : /* istanbul ignore next */ []));
        this.editingLesson = signal(null, ...(ngDevMode ? [{ debugName: "editingLesson" }] : /* istanbul ignore next */ []));
        this.deletingLesson = signal(null, ...(ngDevMode ? [{ debugName: "deletingLesson" }] : /* istanbul ignore next */ []));
        this.savingLesson = signal(false, ...(ngDevMode ? [{ debugName: "savingLesson" }] : /* istanbul ignore next */ []));
        this.savingFinalQuiz = signal(false, ...(ngDevMode ? [{ debugName: "savingFinalQuiz" }] : /* istanbul ignore next */ []));
        this.deletingLessonInFlight = signal(false, ...(ngDevMode ? [{ debugName: "deletingLessonInFlight" }] : /* istanbul ignore next */ []));
        this.slides = signal([], ...(ngDevMode ? [{ debugName: "slides" }] : /* istanbul ignore next */ []));
        this.slidesValidationError = signal('', ...(ngDevMode ? [{ debugName: "slidesValidationError" }] : /* istanbul ignore next */ []));
        this.legacyConversionNotice = signal('', ...(ngDevMode ? [{ debugName: "legacyConversionNotice" }] : /* istanbul ignore next */ []));
        this.quizQuestions = signal([], ...(ngDevMode ? [{ debugName: "quizQuestions" }] : /* istanbul ignore next */ []));
        this.quizPassingScore = signal(70, ...(ngDevMode ? [{ debugName: "quizPassingScore" }] : /* istanbul ignore next */ []));
        this.quizValidationError = signal('', ...(ngDevMode ? [{ debugName: "quizValidationError" }] : /* istanbul ignore next */ []));
        this.finalQuizQuestions = signal([], ...(ngDevMode ? [{ debugName: "finalQuizQuestions" }] : /* istanbul ignore next */ []));
        this.finalQuizPassingScore = signal(70, ...(ngDevMode ? [{ debugName: "finalQuizPassingScore" }] : /* istanbul ignore next */ []));
        this.finalQuizValidationError = signal('', ...(ngDevMode ? [{ debugName: "finalQuizValidationError" }] : /* istanbul ignore next */ []));
        this.isEditMode = computed(() => !!this.editingLesson(), ...(ngDevMode ? [{ debugName: "isEditMode" }] : /* istanbul ignore next */ []));
        this.requiredLessonsCount = computed(() => this.lessons().filter((lesson) => lesson.isRequired).length, ...(ngDevMode ? [{ debugName: "requiredLessonsCount" }] : /* istanbul ignore next */ []));
        this.totalDurationMinutes = computed(() => this.lessons().reduce((total, lesson) => total + lesson.durationMinutes, 0), ...(ngDevMode ? [{ debugName: "totalDurationMinutes" }] : /* istanbul ignore next */ []));
        this.hasVisibleError = hasVisibleError;
        this.getVisibleErrorMessage = getVisibleErrorMessage;
        this.lessonValidationMessages = {
            title: { required: 'أدخل عنوان الدرس.' },
            order: { required: 'أدخل ترتيب الدرس.' },
            durationMinutes: { required: 'أدخل مدة الدرس.' },
        };
        this.lessonForm = this.fb.nonNullable.group({
            title: ['', Validators.required],
            contentType: ['article', Validators.required],
            order: [1, [Validators.required, Validators.min(1)]],
            durationMinutes: [10, [Validators.required, Validators.min(1)]],
            isRequired: [true],
        });
    }
    ngOnInit() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (courseId) {
            this.loadData(courseId);
        }
    }
    openCreateLessonDialog() {
        this.editingLesson.set(null);
        this.lessonForm.reset({
            title: '',
            contentType: 'article',
            order: this.lessons().length + 1,
            durationMinutes: 10,
            isRequired: true,
        });
        this.resetSlides();
        this.resetQuizBuilder();
        this.legacyConversionNotice.set('');
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
            isRequired: lesson.isRequired,
        });
        if (lesson.contentType === 'quiz') {
            this.loadQuizBuilder(lesson.quiz || null);
            this.resetSlides();
            this.legacyConversionNotice.set('');
        }
        else {
            const { slides, notice } = this.buildEditableSlidesFromLesson(lesson);
            this.slides.set(slides);
            this.resetQuizBuilder();
            this.legacyConversionNotice.set(notice);
        }
        clearControlState(this.lessonForm);
        this.lessonDialog().open();
    }
    closeLessonDialog() {
        this.editingLesson.set(null);
        this.lessonDialog().close();
    }
    openFinalExamDialog() {
        this.loadFinalQuizBuilder(this.course()?.finalQuiz || null);
        this.finalExamDialog().open();
    }
    closeFinalExamDialog() {
        this.finalExamDialog().close();
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
        const isQuiz = this.isQuizContentType();
        const quiz = isQuiz ? this.buildQuizPayload(this.quizQuestions(), this.quizPassingScore(), this.quizValidationError) : null;
        const slides = isQuiz ? [] : this.buildSlidesPayload();
        if ((isQuiz && !quiz) || (!isQuiz && !slides)) {
            return;
        }
        const payload = {
            courseId,
            title: formValue.title.trim(),
            contentType: formValue.contentType,
            order: Number(formValue.order),
            durationMinutes: Number(formValue.durationMinutes),
            isRequired: formValue.isRequired,
            quiz,
            slides: slides || undefined,
            contentUrl: !isQuiz ? this.pickLegacyContentUrl(slides || []) : undefined,
            contentHtml: !isQuiz ? this.buildLegacyContentHtml(slides || []) : undefined,
        };
        const lessonId = this.objectId(this.editingLesson() || {});
        const request = lessonId ? this.coursesApi.updateLesson(lessonId, payload) : this.coursesApi.createLesson(payload);
        this.savingLesson.set(true);
        request.pipe(finalize(() => this.savingLesson.set(false))).subscribe(() => {
            this.closeLessonDialog();
            this.loadData(courseId);
        });
    }
    saveFinalQuiz() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!courseId || this.savingFinalQuiz()) {
            return;
        }
        const finalQuiz = this.buildQuizPayload(this.finalQuizQuestions(), this.finalQuizPassingScore(), this.finalQuizValidationError);
        if (!finalQuiz) {
            return;
        }
        this.savingFinalQuiz.set(true);
        this.coursesApi
            .updateCourse(courseId, { finalQuiz })
            .pipe(finalize(() => this.savingFinalQuiz.set(false)))
            .subscribe(() => {
            this.closeFinalExamDialog();
            this.loadData(courseId);
        });
    }
    removeFinalQuiz() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!courseId || this.savingFinalQuiz()) {
            return;
        }
        this.savingFinalQuiz.set(true);
        this.coursesApi
            .updateCourse(courseId, { finalQuiz: null })
            .pipe(finalize(() => this.savingFinalQuiz.set(false)))
            .subscribe(() => this.loadData(courseId));
    }
    openDeleteLessonDialog(lesson) {
        this.deletingLesson.set(lesson);
        this.deleteDialog().open();
    }
    closeDeleteLessonDialog() {
        this.deletingLesson.set(null);
        this.deleteDialog().close();
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
            .subscribe(() => {
            this.closeDeleteLessonDialog();
            this.loadData(courseId);
        });
    }
    isQuizContentType() {
        return this.lessonForm.controls.contentType.value === 'quiz';
    }
    addSlide() {
        this.slides.update((currentSlides) => [...currentSlides, this.createEmptySlide()]);
        this.slidesValidationError.set('');
    }
    removeSlide(slideIndex) {
        this.slides.update((currentSlides) => currentSlides.length === 1 ? currentSlides : currentSlides.filter((_, index) => index !== slideIndex));
    }
    moveSlide(slideIndex, direction) {
        this.slides.update((currentSlides) => this.moveItem(currentSlides, slideIndex, direction));
    }
    updateSlideField(slideIndex, key, event) {
        const value = event.target?.value || '';
        this.slides.update((currentSlides) => currentSlides.map((slide, index) => index === slideIndex
            ? {
                ...slide,
                [key]: value,
            }
            : slide));
        this.slidesValidationError.set('');
    }
    addQuizQuestion() {
        this.quizQuestions.update((questions) => [...questions, this.createEmptyQuizQuestion()]);
        this.quizValidationError.set('');
    }
    removeQuizQuestion(questionIndex) {
        this.quizQuestions.update((questions) => questions.length === 1 ? questions : questions.filter((_, index) => index !== questionIndex));
    }
    moveQuizQuestion(questionIndex, direction) {
        this.quizQuestions.update((questions) => this.moveItem(questions, questionIndex, direction));
    }
    updateQuizQuestionPrompt(questionIndex, event) {
        const value = event.target?.value || '';
        this.quizQuestions.update((questions) => questions.map((question, index) => (index === questionIndex ? { ...question, prompt: value } : question)));
        this.quizValidationError.set('');
    }
    addQuizOption(questionIndex) {
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex ? { ...question, options: [...question.options, this.createEmptyQuizOption()] } : question));
    }
    removeQuizOption(questionIndex, optionIndex) {
        this.quizQuestions.update((questions) => questions.map((question, index) => {
            if (index !== questionIndex || question.options.length === 2) {
                return question;
            }
            const nextOptions = question.options.filter((_, currentIndex) => currentIndex !== optionIndex);
            return {
                ...question,
                options: nextOptions,
                correctOptionId: nextOptions.some((option) => option.id === question.correctOptionId)
                    ? question.correctOptionId
                    : nextOptions[0]?.id || '',
            };
        }));
    }
    updateQuizOptionText(questionIndex, optionIndex, event) {
        const value = event.target?.value || '';
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex
            ? {
                ...question,
                options: question.options.map((option, currentIndex) => currentIndex === optionIndex ? { ...option, text: value } : option),
            }
            : question));
    }
    setCorrectQuizOption(questionIndex, optionId) {
        this.quizQuestions.update((questions) => questions.map((question, index) => index === questionIndex ? { ...question, correctOptionId: optionId } : question));
    }
    updateQuizPassingScore(event) {
        this.quizPassingScore.set(this.normalizeScoreInput(event));
        this.quizValidationError.set('');
    }
    addFinalQuizQuestion() {
        this.finalQuizQuestions.update((questions) => [...questions, this.createEmptyQuizQuestion()]);
        this.finalQuizValidationError.set('');
    }
    removeFinalQuizQuestion(questionIndex) {
        this.finalQuizQuestions.update((questions) => questions.length === 1 ? questions : questions.filter((_, index) => index !== questionIndex));
    }
    moveFinalQuizQuestion(questionIndex, direction) {
        this.finalQuizQuestions.update((questions) => this.moveItem(questions, questionIndex, direction));
    }
    updateFinalQuizQuestionPrompt(questionIndex, event) {
        const value = event.target?.value || '';
        this.finalQuizQuestions.update((questions) => questions.map((question, index) => (index === questionIndex ? { ...question, prompt: value } : question)));
        this.finalQuizValidationError.set('');
    }
    addFinalQuizOption(questionIndex) {
        this.finalQuizQuestions.update((questions) => questions.map((question, index) => index === questionIndex ? { ...question, options: [...question.options, this.createEmptyQuizOption()] } : question));
    }
    removeFinalQuizOption(questionIndex, optionIndex) {
        this.finalQuizQuestions.update((questions) => questions.map((question, index) => {
            if (index !== questionIndex || question.options.length === 2) {
                return question;
            }
            const nextOptions = question.options.filter((_, currentIndex) => currentIndex !== optionIndex);
            return {
                ...question,
                options: nextOptions,
                correctOptionId: nextOptions.some((option) => option.id === question.correctOptionId)
                    ? question.correctOptionId
                    : nextOptions[0]?.id || '',
            };
        }));
    }
    updateFinalQuizOptionText(questionIndex, optionIndex, event) {
        const value = event.target?.value || '';
        this.finalQuizQuestions.update((questions) => questions.map((question, index) => index === questionIndex
            ? {
                ...question,
                options: question.options.map((option, currentIndex) => currentIndex === optionIndex ? { ...option, text: value } : option),
            }
            : question));
    }
    setCorrectFinalQuizOption(questionIndex, optionId) {
        this.finalQuizQuestions.update((questions) => questions.map((question, index) => index === questionIndex ? { ...question, correctOptionId: optionId } : question));
    }
    updateFinalQuizPassingScore(event) {
        this.finalQuizPassingScore.set(this.normalizeScoreInput(event));
        this.finalQuizValidationError.set('');
    }
    resolveSlides(lesson) {
        return lesson.slides?.length ? lesson.slides : this.buildEditableSlidesFromLesson(lesson).slides;
    }
    previewText(value) {
        const normalizedValue = String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        return normalizedValue.length > 180 ? `${normalizedValue.slice(0, 180)}...` : normalizedValue;
    }
    contentTypeLabel(value) {
        return {
            article: 'مقال',
            task: 'مهمة',
            video: 'فيديو',
            pdf: 'PDF',
            quiz: 'اختبار',
        }[value] || value;
    }
    difficultyLabel(value) {
        return {
            beginner: 'مبتدئ',
            intermediate: 'متوسط',
            advanced: 'متقدم',
        }[value] || value;
    }
    quizSummaryLabel(quiz) {
        if (!quiz) {
            return 'لا يوجد اختبار';
        }
        return `${quiz.questions.length} أسئلة • اجتياز من ${quiz.passingScorePercentage}%`;
    }
    buildSlidesPayload() {
        const currentSlides = this.slides();
        if (!currentSlides.length) {
            this.slidesValidationError.set('أضف شريحة واحدة على الأقل لهذا الدرس.');
            return null;
        }
        for (const [slideIndex, slide] of currentSlides.entries()) {
            if (!slide.title.trim()) {
                this.slidesValidationError.set(`أدخل عنوان الشريحة رقم ${slideIndex + 1}.`);
                return null;
            }
            if (!slide.body.trim()) {
                this.slidesValidationError.set(`أدخل محتوى الشريحة رقم ${slideIndex + 1}.`);
                return null;
            }
        }
        this.slidesValidationError.set('');
        return currentSlides.map((slide) => ({
            id: slide.id,
            title: slide.title.trim(),
            body: slide.body.trim(),
            mediaUrl: slide.mediaUrl?.trim() || null,
            notes: slide.notes?.trim() || null,
        }));
    }
    buildQuizPayload(questions, passingScore, errorSignal) {
        if (!questions.length) {
            errorSignal.set('أضف سؤالاً واحداً على الأقل.');
            return null;
        }
        for (const [questionIndex, question] of questions.entries()) {
            if (!question.prompt.trim()) {
                errorSignal.set(`أدخل نص السؤال رقم ${questionIndex + 1}.`);
                return null;
            }
            if (question.options.some((option) => !option.text.trim())) {
                errorSignal.set(`أكمل جميع الخيارات في السؤال رقم ${questionIndex + 1}.`);
                return null;
            }
            if (!question.options.some((option) => option.id === question.correctOptionId)) {
                errorSignal.set(`حدد الإجابة الصحيحة للسؤال رقم ${questionIndex + 1}.`);
                return null;
            }
        }
        errorSignal.set('');
        return {
            passingScorePercentage: passingScore,
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
    loadQuizBuilder(quiz) {
        this.quizQuestions.set(this.normalizeQuizQuestions(quiz));
        this.quizPassingScore.set(quiz?.passingScorePercentage ?? 70);
        this.quizValidationError.set('');
    }
    loadFinalQuizBuilder(quiz) {
        this.finalQuizQuestions.set(this.normalizeQuizQuestions(quiz));
        this.finalQuizPassingScore.set(quiz?.passingScorePercentage ?? 70);
        this.finalQuizValidationError.set('');
    }
    normalizeQuizQuestions(quiz) {
        if (!quiz?.questions?.length) {
            return [this.createEmptyQuizQuestion()];
        }
        return quiz.questions.map((question) => ({
            id: question.id,
            prompt: question.prompt,
            correctOptionId: question.correctOptionId || question.options[0]?.id || '',
            options: question.options.map((option) => ({
                id: option.id,
                text: option.text,
            })),
        }));
    }
    buildEditableSlidesFromLesson(lesson) {
        if (lesson.slides?.length) {
            return {
                slides: lesson.slides.map((slide) => ({ ...slide })),
                notice: '',
            };
        }
        if (lesson.contentType === 'video' || lesson.contentType === 'pdf') {
            return {
                slides: [
                    {
                        id: crypto.randomUUID(),
                        title: lesson.title,
                        body: lesson.contentType === 'video'
                            ? 'مقدمة مختصرة للفيديو. يمكنك تحديث هذه الشريحة وإضافة ملاحظات للمتعلم.'
                            : 'مقدمة مختصرة للملف. يمكنك تحديث هذه الشريحة وإضافة توجيهات للمتعلم.',
                        mediaUrl: lesson.contentUrl || null,
                        notes: null,
                    },
                ],
                notice: lesson.contentUrl || lesson.contentHtml ? 'تم تحويل المحتوى القديم إلى شريحة أولية قابلة للتحرير.' : '',
            };
        }
        return {
            slides: [
                {
                    id: crypto.randomUUID(),
                    title: lesson.title,
                    body: this.previewText(lesson.contentHtml || 'اكتب محتوى الشريحة هنا.'),
                    mediaUrl: null,
                    notes: null,
                },
            ],
            notice: lesson.contentHtml || lesson.contentUrl ? 'تم تحويل المحتوى النصي القديم إلى شريحة أولية قابلة للتحرير.' : '',
        };
    }
    buildLegacyContentHtml(slides) {
        return slides
            .map((slide) => `<h3>${slide.title}</h3><p>${slide.body}</p>`)
            .join('\n')
            .trim();
    }
    pickLegacyContentUrl(slides) {
        return slides.find((slide) => slide.mediaUrl?.trim())?.mediaUrl?.trim() || undefined;
    }
    normalizeScoreInput(event) {
        const value = Number(event.target?.value || 0);
        return Math.max(0, Math.min(100, Math.round(value)));
    }
    moveItem(items, index, direction) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= items.length) {
            return items;
        }
        const nextItems = [...items];
        const [item] = nextItems.splice(index, 1);
        nextItems.splice(nextIndex, 0, item);
        return nextItems;
    }
    resetSlides() {
        this.slides.set([this.createEmptySlide()]);
        this.slidesValidationError.set('');
    }
    resetQuizBuilder() {
        this.quizQuestions.set([this.createEmptyQuizQuestion()]);
        this.quizPassingScore.set(70);
        this.quizValidationError.set('');
    }
    createEmptySlide() {
        return {
            id: crypto.randomUUID(),
            title: '',
            body: '',
            mediaUrl: null,
            notes: null,
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
    objectId(item) {
        return item._id || item.id || '';
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
            i0.ɵɵviewQuerySignal(ctx.lessonDialog, _c0, 5)(ctx.finalExamDialog, _c1, 5)(ctx.deleteDialog, _c2, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance(3);
        } }, decls: 85, vars: 21, consts: [["loadingState", ""], ["noLessons", ""], ["lessonDialog", ""], ["quizBuilderBlock", ""], ["finalExamDialog", ""], ["deleteDialog", ""], [1, "page-grid"], ["class", "card panel", 4, "ngIf", "ngIfElse"], ["icon", "graduation", 3, "title", "subtitle"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "title"], ["class", "field-error", 4, "ngIf"], ["formControlName", "contentType"], ["value", "article"], ["value", "task"], ["value", "video"], ["value", "pdf"], ["value", "quiz"], ["type", "number", "formControlName", "order"], ["type", "number", "formControlName", "durationMinutes"], [1, "checkbox-field", "field--full"], ["type", "checkbox", "formControlName", "isRequired"], ["class", "message-box info", 4, "ngIf"], ["class", "builder", 4, "ngIf", "ngIfElse"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], ["title", "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A", "subtitle", "\u062D\u062F\u0651\u062F \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0627\u0644\u0630\u064A \u0633\u064A\u0634\u062A\u0631\u0637 \u0627\u062C\u062A\u064A\u0627\u0632\u0647 \u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062F\u0648\u0631\u0629.", "icon", "award"], [1, "builder"], [1, "builder__header"], [1, "field-help"], [1, "quiz-metrics"], ["type", "number", "min", "0", "max", "100", 3, "input", "value"], ["class", "builder-card quiz-card", 4, "ngFor", "ngForOf"], [1, "builder__footer"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["title", "\u062A\u0623\u0643\u064A\u062F \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633", "subtitle", "\u0633\u064A\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633 \u0646\u0647\u0627\u0626\u064A\u0627\u064B \u0628\u0639\u062F \u0627\u0644\u062A\u0623\u0643\u064A\u062F.", "icon", "alert"], [1, "message-box", "error"], [4, "ngIf"], ["type", "button", 1, "btn", "btn-danger", 3, "click", "disabled"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title"], [1, "section-subtitle"], [1, "panel-actions"], [1, "status-chip", "info"], [1, "btn-content"], ["name", "award", 3, "size"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["name", "graduation", 3, "size"], [1, "summary-strip"], [1, "summary-item"], ["class", "final-exam-card", 4, "ngIf"], ["class", "lesson-list", 4, "ngIf", "ngIfElse"], [1, "final-exam-card"], [1, "lesson-card__actions"], [1, "lesson-list"], ["class", "lesson-card", 4, "ngFor", "ngForOf"], [1, "lesson-card"], [1, "lesson-card__body"], [1, "lesson-card__header"], [1, "status-chip"], ["class", "lesson-card__meta", 4, "ngIf"], ["class", "slide-preview", 4, "ngIf"], ["name", "book-open", 3, "size"], ["type", "button", 1, "btn", "btn-danger", 3, "click"], ["name", "alert", 3, "size"], [1, "lesson-card__meta"], [1, "slide-preview"], ["title", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629", "description", "\u064A\u062A\u0645 \u062C\u0644\u0628 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0648\u0631\u0629 \u0648\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0622\u0646."], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0631\u0648\u0633 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629", "description", "\u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0644 \u062F\u0631\u0633 \u0639\u0644\u0649 \u0634\u0643\u0644 \u0634\u0631\u0627\u0626\u062D \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631."], [1, "field-error"], [1, "message-box", "info"], ["class", "builder-card", 4, "ngFor", "ngForOf"], [1, "builder-card"], [1, "builder-card__header"], [1, "builder-card__actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], [3, "input", "value"], ["rows", "6", 3, "input", "value"], ["rows", "3", 3, "input", "value"], [1, "builder-card", "quiz-card"], ["class", "quiz-option-card", 4, "ngFor", "ngForOf"], [1, "quiz-option-card"], [3, "input", "value", "placeholder"], [1, "quiz-option-card__correct"], ["type", "radio", 3, "change", "name", "checked"]], template: function CourseLessonsManagementComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 6);
            i0.ɵɵtemplate(1, CourseLessonsManagementComponent_article_1_Template, 43, 13, "article", 7);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, CourseLessonsManagementComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(4, CourseLessonsManagementComponent_ng_template_4_Template, 1, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(6, "app-dialog", 8, 2)(8, "form", 9);
            i0.ɵɵlistener("ngSubmit", function CourseLessonsManagementComponent_Template_form_ngSubmit_8_listener() { return ctx.submitLesson(); });
            i0.ɵɵelementStart(9, "div", 10)(10, "div", 11)(11, "label");
            i0.ɵɵtext(12, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0631\u0633");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 12);
            i0.ɵɵtemplate(14, CourseLessonsManagementComponent_div_14_Template, 2, 1, "div", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 11)(16, "label");
            i0.ɵɵtext(17, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "select", 14)(19, "option", 15);
            i0.ɵɵtext(20, "\u0645\u0642\u0627\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option", 16);
            i0.ɵɵtext(22, "\u0645\u0647\u0645\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "option", 17);
            i0.ɵɵtext(24, "\u0641\u064A\u062F\u064A\u0648");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "option", 18);
            i0.ɵɵtext(26, "PDF");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "option", 19);
            i0.ɵɵtext(28, "\u0627\u062E\u062A\u0628\u0627\u0631");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(29, "div", 11)(30, "label");
            i0.ɵɵtext(31, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(32, "input", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "div", 11)(34, "label");
            i0.ɵɵtext(35, "\u0627\u0644\u0645\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(36, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "label", 22);
            i0.ɵɵelement(38, "input", 23);
            i0.ɵɵelementStart(39, "span");
            i0.ɵɵtext(40, "\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633 \u0625\u0644\u0632\u0627\u0645\u064A \u0644\u0625\u0643\u0645\u0627\u0644 \u0627\u0644\u062F\u0648\u0631\u0629");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(41, CourseLessonsManagementComponent_div_41_Template, 2, 1, "div", 24)(42, CourseLessonsManagementComponent_section_42_Template, 14, 3, "section", 25)(43, CourseLessonsManagementComponent_ng_template_43_Template, 16, 3, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(45, "div", 26)(46, "button", 27);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_46_listener() { return ctx.closeLessonDialog(); });
            i0.ɵɵtext(47, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "button", 28);
            i0.ɵɵtext(49);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(50, "app-dialog", 29, 4)(52, "section", 30)(53, "div", 31)(54, "div")(55, "strong");
            i0.ɵɵtext(56, "\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "p", 32);
            i0.ɵɵtext(58, "\u0633\u064A\u0638\u0647\u0631 \u0647\u0630\u0627 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0639\u062F \u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(59, "div", 33)(60, "label");
            i0.ɵɵtext(61, "\u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 %");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(62, "input", 34);
            i0.ɵɵlistener("input", function CourseLessonsManagementComponent_Template_input_input_62_listener($event) { return ctx.updateFinalQuizPassingScore($event); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(63, CourseLessonsManagementComponent_article_63_Template, 18, 6, "article", 35);
            i0.ɵɵelementStart(64, "div", 36)(65, "button", 37);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_65_listener() { return ctx.addFinalQuizQuestion(); });
            i0.ɵɵtext(66, "\u0625\u0636\u0627\u0641\u0629 \u0633\u0624\u0627\u0644");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(67, CourseLessonsManagementComponent_div_67_Template, 2, 1, "div", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(68, "div", 26)(69, "button", 27);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_69_listener() { return ctx.closeFinalExamDialog(); });
            i0.ɵɵtext(70, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(71, "button", 38);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_71_listener() { return ctx.saveFinalQuiz(); });
            i0.ɵɵtext(72);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(73, "app-dialog", 39, 5)(75, "div", 6)(76, "div", 40);
            i0.ɵɵtext(77, " \u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0645\u0646 \u062D\u0630\u0641 \u0627\u0644\u062F\u0631\u0633 ");
            i0.ɵɵtemplate(78, CourseLessonsManagementComponent_strong_78_Template, 2, 1, "strong", 41);
            i0.ɵɵtext(79, " \u061F \u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0625\u062C\u0631\u0627\u0621. ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "div", 26)(81, "button", 27);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_81_listener() { return ctx.closeDeleteLessonDialog(); });
            i0.ɵɵtext(82, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(83, "button", 42);
            i0.ɵɵlistener("click", function CourseLessonsManagementComponent_Template_button_click_83_listener() { return ctx.confirmDeleteLesson(); });
            i0.ɵɵtext(84);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const loadingState_r26 = i0.ɵɵreference(3);
            const quizBuilderBlock_r27 = i0.ɵɵreference(44);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.course())("ngIfElse", loadingState_r26);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("title", ctx.isEditMode() ? "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062F\u0631\u0633" : "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633")("subtitle", ctx.isEditMode() ? "\u062D\u062F\u0651\u062B \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u0648\u0634\u0631\u0627\u0626\u062D\u0647 \u0648\u0627\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A." : "\u0623\u0646\u0634\u0626 \u062F\u0631\u0633\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0639\u0644\u0649 \u0634\u0643\u0644 \u0634\u0631\u0627\u0626\u062D \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631 \u0645\u062A\u0639\u062F\u062F \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A.");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("formGroup", ctx.lessonForm);
            i0.ɵɵadvance(5);
            i0.ɵɵclassProp("is-invalid", ctx.hasVisibleError(ctx.lessonForm.controls.title));
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasVisibleError(ctx.lessonForm.controls.title));
            i0.ɵɵadvance(27);
            i0.ɵɵproperty("ngIf", ctx.legacyConversionNotice());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isQuizContentType())("ngIfElse", quizBuilderBlock_r27);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("disabled", ctx.savingLesson());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.savingLesson() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : ctx.isEditMode() ? "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A" : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062F\u0631\u0633", " ");
            i0.ɵɵadvance(13);
            i0.ɵɵproperty("value", ctx.finalQuizPassingScore());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.finalQuizQuestions());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.finalQuizValidationError());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.savingFinalQuiz());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.savingFinalQuiz() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : "\u062D\u0641\u0638 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.deletingLesson());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.deletingLessonInFlight());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.deletingLessonInFlight() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0630\u0641..." : "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062D\u0630\u0641", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.CheckboxControlValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, DialogComponent, EmptyStateComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .summary-strip[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n        gap: 1rem;\n        margin-bottom: 1.25rem;\n      }\n\n      .summary-item[_ngcontent-%COMP%], \n   .final-exam-card[_ngcontent-%COMP%], \n   .slide-preview[_ngcontent-%COMP%], \n   .builder__header[_ngcontent-%COMP%], \n   .builder-card[_ngcontent-%COMP%] {\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n      }\n\n      .summary-item[_ngcontent-%COMP%] {\n        padding: 1rem;\n      }\n\n      .summary-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        font-size: 1.2rem;\n      }\n\n      .summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .field-help[_ngcontent-%COMP%], \n   .lesson-card__meta[_ngcontent-%COMP%], \n   .final-exam-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], \n   .slide-preview[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .final-exam-card[_ngcontent-%COMP%], \n   .lesson-card[_ngcontent-%COMP%], \n   .builder__header[_ngcontent-%COMP%], \n   .builder-card__header[_ngcontent-%COMP%], \n   .quiz-option-card[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .final-exam-card[_ngcontent-%COMP%] {\n        padding: 1rem;\n        margin-bottom: 1rem;\n      }\n\n      .lesson-list[_ngcontent-%COMP%], \n   .builder[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .lesson-card[_ngcontent-%COMP%] {\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n      }\n\n      .lesson-card__body[_ngcontent-%COMP%] {\n        flex: 1;\n        min-width: 0;\n      }\n\n      .lesson-card__header[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .lesson-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.35rem 0 0;\n      }\n\n      .slide-preview[_ngcontent-%COMP%] {\n        margin-top: 0.9rem;\n        padding: 0.9rem;\n      }\n\n      .slide-preview[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n        display: block;\n        margin-bottom: 0.35rem;\n      }\n\n      .lesson-card__actions[_ngcontent-%COMP%], \n   .builder-card__actions[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n\n      .checkbox-field[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n      }\n\n      .field--full[_ngcontent-%COMP%] {\n        grid-column: 1 / -1;\n      }\n\n      .builder__header[_ngcontent-%COMP%], \n   .builder-card[_ngcontent-%COMP%] {\n        padding: 1rem;\n      }\n\n      .builder-card[_ngcontent-%COMP%] {\n        display: grid;\n      }\n\n      .quiz-card[_ngcontent-%COMP%] {\n        gap: 0.9rem;\n      }\n\n      .quiz-option-card[_ngcontent-%COMP%] {\n        align-items: center;\n      }\n\n      .quiz-option-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:first-child {\n        flex: 1;\n      }\n\n      .quiz-option-card__correct[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.45rem;\n        white-space: nowrap;\n      }\n\n      .quiz-metrics[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n      }\n\n      .quiz-metrics[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        width: 88px;\n      }\n\n      .builder__footer[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: flex-start;\n      }\n\n      .status-chip.muted[_ngcontent-%COMP%] {\n        background: var(--color-neutral-100);\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 860px) {\n        .summary-strip[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr 1fr;\n        }\n\n        .final-exam-card[_ngcontent-%COMP%], \n   .lesson-card[_ngcontent-%COMP%], \n   .lesson-card__header[_ngcontent-%COMP%], \n   .builder__header[_ngcontent-%COMP%], \n   .builder-card__header[_ngcontent-%COMP%], \n   .quiz-option-card[_ngcontent-%COMP%] {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }\n\n      @media (max-width: 640px) {\n        .summary-strip[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n      }"], changeDetection: 0 }); }
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
            <button class="btn btn-secondary" type="button" (click)="openFinalExamDialog()">
              <span class="btn-content">
                <app-icon name="award" [size]="18" />
                <span>{{ course()?.finalQuiz ? 'تعديل الاختبار النهائي' : 'إضافة اختبار نهائي' }}</span>
              </span>
            </button>
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
          <div class="summary-item">
            <strong>{{ course()?.finalQuiz?.questions?.length || 0 }}</strong>
            <span>أسئلة الاختبار النهائي</span>
          </div>
        </div>

        <article class="final-exam-card" *ngIf="course()?.finalQuiz">
          <div>
            <strong>الاختبار النهائي</strong>
            <p>{{ quizSummaryLabel(course()?.finalQuiz || null) }}</p>
          </div>
          <div class="lesson-card__actions">
            <button class="btn btn-ghost" type="button" (click)="openFinalExamDialog()">تعديل</button>
            <button class="btn btn-danger" type="button" (click)="removeFinalQuiz()" [disabled]="savingFinalQuiz()">
              {{ savingFinalQuiz() ? 'جارٍ الحذف...' : 'حذف' }}
            </button>
          </div>
        </article>

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

              <p class="lesson-card__meta" *ngIf="lesson.contentType !== 'quiz'">
                {{ resolveSlides(lesson).length }} شرائح
              </p>
              <p class="lesson-card__meta" *ngIf="lesson.contentType === 'quiz'">
                {{ quizSummaryLabel(lesson.quiz || null) }}
              </p>

              <div class="slide-preview" *ngIf="lesson.contentType !== 'quiz' && resolveSlides(lesson)[0] as firstSlide">
                <strong>{{ firstSlide.title }}</strong>
                <p>{{ previewText(firstSlide.body) }}</p>
              </div>
            </div>

            <div class="lesson-card__actions">
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
        description="ابدأ بإضافة أول درس على شكل شرائح أو اختبار."
      />
    </ng-template>

    <app-dialog
      #lessonDialog
      [title]="isEditMode() ? 'تعديل الدرس' : 'إضافة درس'"
      [subtitle]="
        isEditMode()
          ? 'حدّث بيانات الدرس وشرائحه واحفظ التغييرات.'
          : 'أنشئ درساً جديداً على شكل شرائح أو اختبار متعدد الخيارات.'
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
            <select formControlName="contentType">
              <option value="article">مقال</option>
              <option value="task">مهمة</option>
              <option value="video">فيديو</option>
              <option value="pdf">PDF</option>
              <option value="quiz">اختبار</option>
            </select>
          </div>

          <div class="field">
            <label>الترتيب</label>
            <input type="number" formControlName="order" />
          </div>

          <div class="field">
            <label>المدة</label>
            <input type="number" formControlName="durationMinutes" />
          </div>

          <label class="checkbox-field field--full">
            <input type="checkbox" formControlName="isRequired" />
            <span>هذا الدرس إلزامي لإكمال الدورة</span>
          </label>
        </div>

        <div class="message-box info" *ngIf="legacyConversionNotice()">
          {{ legacyConversionNotice() }}
        </div>

        <section class="builder" *ngIf="!isQuizContentType(); else quizBuilderBlock">
          <div class="builder__header">
            <div>
              <strong>شرائح الدرس</strong>
              <p class="field-help">أضف محتوى الدرس على هيئة شرائح قابلة للتنقل في واجهة المتعلم.</p>
            </div>
            <button class="btn btn-secondary" type="button" (click)="addSlide()">
              <span class="btn-content">
                <app-icon name="book-open" [size]="18" />
                <span>إضافة شريحة</span>
              </span>
            </button>
          </div>

          <article class="builder-card" *ngFor="let slide of slides(); let slideIndex = index">
            <div class="builder-card__header">
              <strong>الشريحة {{ slideIndex + 1 }}</strong>
              <div class="builder-card__actions">
                <button class="btn btn-ghost" type="button" (click)="moveSlide(slideIndex, -1)" [disabled]="slideIndex === 0">
                  للأعلى
                </button>
                <button
                  class="btn btn-ghost"
                  type="button"
                  (click)="moveSlide(slideIndex, 1)"
                  [disabled]="slideIndex === slides().length - 1"
                >
                  للأسفل
                </button>
                <button class="btn btn-danger" type="button" (click)="removeSlide(slideIndex)" [disabled]="slides().length === 1">
                  حذف
                </button>
              </div>
            </div>

            <div class="field">
              <label>عنوان الشريحة</label>
              <input [value]="slide.title" (input)="updateSlideField(slideIndex, 'title', $event)" />
            </div>

            <div class="field">
              <label>محتوى الشريحة</label>
              <textarea rows="6" [value]="slide.body" (input)="updateSlideField(slideIndex, 'body', $event)"></textarea>
            </div>

            <div class="field">
              <label>رابط الوسائط</label>
              <input [value]="slide.mediaUrl || ''" (input)="updateSlideField(slideIndex, 'mediaUrl', $event)" />
            </div>

            <div class="field">
              <label>ملاحظات إضافية</label>
              <textarea rows="3" [value]="slide.notes || ''" (input)="updateSlideField(slideIndex, 'notes', $event)"></textarea>
            </div>
          </article>

          <div class="field-error" *ngIf="slidesValidationError()">
            {{ slidesValidationError() }}
          </div>
        </section>

        <ng-template #quizBuilderBlock>
          <section class="builder">
            <div class="builder__header">
              <div>
                <strong>تصميم الاختبار</strong>
                <p class="field-help">واجهة تحرير مبسطة لإنشاء أسئلة احترافية وواضحة.</p>
              </div>
              <div class="quiz-metrics">
                <label>الاجتياز %</label>
                <input type="number" [value]="quizPassingScore()" min="0" max="100" (input)="updateQuizPassingScore($event)" />
              </div>
            </div>

            <article class="builder-card quiz-card" *ngFor="let question of quizQuestions(); let questionIndex = index">
              <div class="builder-card__header">
                <strong>السؤال {{ questionIndex + 1 }}</strong>
                <div class="builder-card__actions">
                  <button
                    class="btn btn-ghost"
                    type="button"
                    (click)="moveQuizQuestion(questionIndex, -1)"
                    [disabled]="questionIndex === 0"
                  >
                    للأعلى
                  </button>
                  <button
                    class="btn btn-ghost"
                    type="button"
                    (click)="moveQuizQuestion(questionIndex, 1)"
                    [disabled]="questionIndex === quizQuestions().length - 1"
                  >
                    للأسفل
                  </button>
                  <button class="btn btn-danger" type="button" (click)="removeQuizQuestion(questionIndex)" [disabled]="quizQuestions().length === 1">
                    حذف
                  </button>
                </div>
              </div>

              <div class="field">
                <label>نص السؤال</label>
                <input [value]="question.prompt" (input)="updateQuizQuestionPrompt(questionIndex, $event)" />
              </div>

              <div class="quiz-option-card" *ngFor="let option of question.options; let optionIndex = index">
                <input
                  [value]="option.text"
                  (input)="updateQuizOptionText(questionIndex, optionIndex, $event)"
                  [placeholder]="'الخيار ' + (optionIndex + 1)"
                />
                <label class="quiz-option-card__correct">
                  <input
                    type="radio"
                    [name]="'correct-' + question.id"
                    [checked]="question.correctOptionId === option.id"
                    (change)="setCorrectQuizOption(questionIndex, option.id)"
                  />
                  <span>صحيح</span>
                </label>
                <button
                  class="btn btn-ghost"
                  type="button"
                  (click)="removeQuizOption(questionIndex, optionIndex)"
                  [disabled]="question.options.length === 2"
                >
                  حذف
                </button>
              </div>

              <button class="btn btn-secondary" type="button" (click)="addQuizOption(questionIndex)">إضافة خيار</button>
            </article>

            <div class="builder__footer">
              <button class="btn btn-secondary" type="button" (click)="addQuizQuestion()">إضافة سؤال</button>
            </div>

            <div class="field-error" *ngIf="quizValidationError()">
              {{ quizValidationError() }}
            </div>
          </section>
        </ng-template>

        <div class="dialog-actions">
          <button class="btn btn-ghost" type="button" (click)="closeLessonDialog()">إلغاء</button>
          <button class="btn btn-primary" type="submit" [disabled]="savingLesson()">
            {{ savingLesson() ? 'جارٍ الحفظ...' : isEditMode() ? 'حفظ التعديلات' : 'إضافة الدرس' }}
          </button>
        </div>
      </form>
    </app-dialog>

    <app-dialog
      #finalExamDialog
      title="الاختبار النهائي"
      subtitle="حدّد أسئلة الاختبار النهائي الذي سيشترط اجتيازه لإكمال الدورة."
      icon="award"
    >
      <section class="builder">
        <div class="builder__header">
          <div>
            <strong>أسئلة الاختبار النهائي</strong>
            <p class="field-help">سيظهر هذا الاختبار بعد إنهاء الدروس المطلوبة.</p>
          </div>
          <div class="quiz-metrics">
            <label>الاجتياز %</label>
            <input type="number" [value]="finalQuizPassingScore()" min="0" max="100" (input)="updateFinalQuizPassingScore($event)" />
          </div>
        </div>

        <article class="builder-card quiz-card" *ngFor="let question of finalQuizQuestions(); let questionIndex = index">
          <div class="builder-card__header">
            <strong>السؤال {{ questionIndex + 1 }}</strong>
            <div class="builder-card__actions">
              <button class="btn btn-ghost" type="button" (click)="moveFinalQuizQuestion(questionIndex, -1)" [disabled]="questionIndex === 0">
                للأعلى
              </button>
              <button class="btn btn-ghost" type="button" (click)="moveFinalQuizQuestion(questionIndex, 1)" [disabled]="questionIndex === finalQuizQuestions().length - 1">
                للأسفل
              </button>
              <button class="btn btn-danger" type="button" (click)="removeFinalQuizQuestion(questionIndex)" [disabled]="finalQuizQuestions().length === 1">
                حذف
              </button>
            </div>
          </div>

          <div class="field">
            <label>نص السؤال</label>
            <input [value]="question.prompt" (input)="updateFinalQuizQuestionPrompt(questionIndex, $event)" />
          </div>

          <div class="quiz-option-card" *ngFor="let option of question.options; let optionIndex = index">
            <input
              [value]="option.text"
              (input)="updateFinalQuizOptionText(questionIndex, optionIndex, $event)"
              [placeholder]="'الخيار ' + (optionIndex + 1)"
            />
            <label class="quiz-option-card__correct">
              <input
                type="radio"
                [name]="'final-correct-' + question.id"
                [checked]="question.correctOptionId === option.id"
                (change)="setCorrectFinalQuizOption(questionIndex, option.id)"
              />
              <span>صحيح</span>
            </label>
            <button
              class="btn btn-ghost"
              type="button"
              (click)="removeFinalQuizOption(questionIndex, optionIndex)"
              [disabled]="question.options.length === 2"
            >
              حذف
            </button>
          </div>

          <button class="btn btn-secondary" type="button" (click)="addFinalQuizOption(questionIndex)">إضافة خيار</button>
        </article>

        <div class="builder__footer">
          <button class="btn btn-secondary" type="button" (click)="addFinalQuizQuestion()">إضافة سؤال</button>
        </div>

        <div class="field-error" *ngIf="finalQuizValidationError()">
          {{ finalQuizValidationError() }}
        </div>
      </section>

      <div class="dialog-actions">
        <button class="btn btn-ghost" type="button" (click)="closeFinalExamDialog()">إلغاء</button>
        <button class="btn btn-primary" type="button" (click)="saveFinalQuiz()" [disabled]="savingFinalQuiz()">
          {{ savingFinalQuiz() ? 'جارٍ الحفظ...' : 'حفظ الاختبار النهائي' }}
        </button>
      </div>
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .summary-strip {\n        display: grid;\n        grid-template-columns: repeat(4, minmax(0, 1fr));\n        gap: 1rem;\n        margin-bottom: 1.25rem;\n      }\n\n      .summary-item,\n      .final-exam-card,\n      .slide-preview,\n      .builder__header,\n      .builder-card {\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n      }\n\n      .summary-item {\n        padding: 1rem;\n      }\n\n      .summary-item strong {\n        display: block;\n        font-size: 1.2rem;\n      }\n\n      .summary-item span,\n      .field-help,\n      .lesson-card__meta,\n      .final-exam-card p,\n      .slide-preview p {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .final-exam-card,\n      .lesson-card,\n      .builder__header,\n      .builder-card__header,\n      .quiz-option-card {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .final-exam-card {\n        padding: 1rem;\n        margin-bottom: 1rem;\n      }\n\n      .lesson-list,\n      .builder {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .lesson-card {\n        padding: 1rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n      }\n\n      .lesson-card__body {\n        flex: 1;\n        min-width: 0;\n      }\n\n      .lesson-card__header {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .lesson-card p {\n        margin: 0.35rem 0 0;\n      }\n\n      .slide-preview {\n        margin-top: 0.9rem;\n        padding: 0.9rem;\n      }\n\n      .slide-preview strong {\n        display: block;\n        margin-bottom: 0.35rem;\n      }\n\n      .lesson-card__actions,\n      .builder-card__actions {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n\n      .checkbox-field {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n      }\n\n      .field--full {\n        grid-column: 1 / -1;\n      }\n\n      .builder__header,\n      .builder-card {\n        padding: 1rem;\n      }\n\n      .builder-card {\n        display: grid;\n      }\n\n      .quiz-card {\n        gap: 0.9rem;\n      }\n\n      .quiz-option-card {\n        align-items: center;\n      }\n\n      .quiz-option-card input:first-child {\n        flex: 1;\n      }\n\n      .quiz-option-card__correct {\n        display: flex;\n        align-items: center;\n        gap: 0.45rem;\n        white-space: nowrap;\n      }\n\n      .quiz-metrics {\n        display: flex;\n        align-items: center;\n        gap: 0.65rem;\n      }\n\n      .quiz-metrics input {\n        width: 88px;\n      }\n\n      .builder__footer {\n        display: flex;\n        justify-content: flex-start;\n      }\n\n      .status-chip.muted {\n        background: var(--color-neutral-100);\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 860px) {\n        .summary-strip {\n          grid-template-columns: 1fr 1fr;\n        }\n\n        .final-exam-card,\n        .lesson-card,\n        .lesson-card__header,\n        .builder__header,\n        .builder-card__header,\n        .quiz-option-card {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }\n\n      @media (max-width: 640px) {\n        .summary-strip {\n          grid-template-columns: 1fr;\n        }\n      }\n    "] }]
    }], null, { lessonDialog: [{ type: i0.ViewChild, args: ['lessonDialog', { isSignal: true }] }], finalExamDialog: [{ type: i0.ViewChild, args: ['finalExamDialog', { isSignal: true }] }], deleteDialog: [{ type: i0.ViewChild, args: ['deleteDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CourseLessonsManagementComponent, { className: "CourseLessonsManagementComponent", filePath: "src/app/features/admin/pages/course-lessons-management.component.ts", lineNumber: 646 }); })();
//# sourceMappingURL=course-lessons-management.component.js.map