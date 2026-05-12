import { ChangeDetectionStrategy, Component, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { DialogComponent, EmptyStateComponent, IconComponent } from '../../../shared/components';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { clearControlState, getVisibleErrorMessage, hasVisibleError, touchAllControls, } from '../../../shared/utils/form-validation';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _c0 = ["lessonDialog"];
function CourseDetailsComponent_article_1_button_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 36);
    i0.ɵɵlistener("click", function CourseDetailsComponent_article_1_button_10_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.openLessonDialog()); });
    i0.ɵɵelementStart(1, "span", 37);
    i0.ɵɵelement(2, "app-icon", 38);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("size", 18);
} }
function CourseDetailsComponent_article_1_div_11_article_1_p_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" \u062A\u0645 \u0627\u062C\u062A\u064A\u0627\u0632 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0628\u0646\u062A\u064A\u062C\u0629 ", (lesson_r3.progress == null ? null : lesson_r3.progress.bestQuizScorePercentage) || (lesson_r3.progress == null ? null : lesson_r3.progress.lastQuizScorePercentage) || 0, "% ");
} }
function CourseDetailsComponent_article_1_div_11_article_1_p_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 50);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" \u0622\u062E\u0631 \u0646\u062A\u064A\u062C\u0629: ", (lesson_r3.progress == null ? null : lesson_r3.progress.lastQuizScorePercentage) || 0, "% \u0645\u0646 ", (lesson_r3.quiz == null ? null : lesson_r3.quiz.passingScorePercentage) || 70, "% ");
} }
function CourseDetailsComponent_article_1_div_11_article_1_p_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 51);
    i0.ɵɵtext(1, "\u064A\u0648\u062C\u062F \u0631\u0627\u0628\u0637 \u0623\u0648 \u0645\u0644\u0641 \u0645\u0631\u0641\u0648\u0639 \u0644\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633.");
    i0.ɵɵelementEnd();
} }
function CourseDetailsComponent_article_1_div_11_article_1_pre_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "pre", 52);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(lesson_r3.contentHtml);
} }
function CourseDetailsComponent_article_1_div_11_article_1_div_10_span_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A: ", lesson_r3.progress == null ? null : lesson_r3.progress.attemptCount);
} }
function CourseDetailsComponent_article_1_div_11_article_1_div_10_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.quizErrors()[ctx_r1.objectId(lesson_r3)], " ");
} }
function CourseDetailsComponent_article_1_div_11_article_1_div_10_div_8_label_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 60)(1, "input", 61);
    i0.ɵɵlistener("change", function CourseDetailsComponent_article_1_div_11_article_1_div_10_div_8_label_3_Template_input_change_1_listener() { const option_r5 = i0.ɵɵrestoreView(_r4).$implicit; const question_r6 = i0.ɵɵnextContext().$implicit; const lesson_r3 = i0.ɵɵnextContext(2).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectQuizAnswer(ctx_r1.objectId(lesson_r3), question_r6.id, option_r5.id)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r5 = ctx.$implicit;
    const question_r6 = i0.ɵɵnextContext().$implicit;
    const lesson_r3 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", "quiz-" + ctx_r1.objectId(lesson_r3) + "-" + question_r6.id)("checked", ctx_r1.selectedQuizAnswer(ctx_r1.objectId(lesson_r3), question_r6.id) === option_r5.id)("disabled", ctx_r1.quizLocked(lesson_r3));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r5.text);
} }
function CourseDetailsComponent_article_1_div_11_article_1_div_10_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CourseDetailsComponent_article_1_div_11_article_1_div_10_div_8_label_3_Template, 4, 4, "label", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r6 = ctx.$implicit;
    const questionIndex_r7 = ctx.index;
    const lesson_r3 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("hidden", !!(lesson_r3.progress == null ? null : lesson_r3.progress.quizPassed));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("\u0633", questionIndex_r7 + 1, ". ", question_r6.prompt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", question_r6.options);
} }
function CourseDetailsComponent_article_1_div_11_article_1_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "div", 54)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CourseDetailsComponent_article_1_div_11_article_1_div_10_span_6_Template, 2, 1, "span", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, CourseDetailsComponent_article_1_div_11_article_1_div_10_div_7_Template, 2, 1, "div", 10)(8, CourseDetailsComponent_article_1_div_11_article_1_div_10_div_8_Template, 4, 4, "div", 56);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", lesson_r3.quiz.questions.length, " \u0623\u0633\u0626\u0644\u0629");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 \u0645\u0646 ", lesson_r3.quiz.passingScorePercentage, "%");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r3.progress == null ? null : lesson_r3.progress.attemptCount);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.quizErrors()[ctx_r1.objectId(lesson_r3)]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", lesson_r3.quiz.questions);
} }
function CourseDetailsComponent_article_1_div_11_article_1_a_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 62);
    i0.ɵɵtext(1, " \u0641\u062A\u062D \u0627\u0644\u0645\u062D\u062A\u0648\u0649 ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("href", lesson_r3.contentUrl, i0.ɵɵsanitizeUrl);
} }
function CourseDetailsComponent_article_1_div_11_article_1_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 63);
    i0.ɵɵlistener("click", function CourseDetailsComponent_article_1_div_11_article_1_button_13_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r8); const lesson_r3 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.complete(lesson_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.loadingLessonId() === ctx_r1.objectId(lesson_r3));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.loadingLessonId() === ctx_r1.objectId(lesson_r3) ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0631\u0633", " ");
} }
function CourseDetailsComponent_article_1_div_11_article_1_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 63);
    i0.ɵɵlistener("click", function CourseDetailsComponent_article_1_div_11_article_1_button_14_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); const lesson_r3 = i0.ɵɵnextContext().$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.submitQuiz(lesson_r3)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const lesson_r3 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("disabled", ctx_r1.quizLocked(lesson_r3) || ctx_r1.loadingLessonId() === ctx_r1.objectId(lesson_r3));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", (lesson_r3.progress == null ? null : lesson_r3.progress.quizPassed) ? "\u062A\u0645 \u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632" : ctx_r1.loadingLessonId() === ctx_r1.objectId(lesson_r3) ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0635\u062D\u064A\u062D..." : "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631", " ");
} }
function CourseDetailsComponent_article_1_div_11_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 41)(1, "div", 42)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, CourseDetailsComponent_article_1_div_11_article_1_p_6_Template, 2, 1, "p", 43)(7, CourseDetailsComponent_article_1_div_11_article_1_p_7_Template, 2, 2, "p", 43)(8, CourseDetailsComponent_article_1_div_11_article_1_p_8_Template, 2, 0, "p", 44)(9, CourseDetailsComponent_article_1_div_11_article_1_pre_9_Template, 2, 1, "pre", 45)(10, CourseDetailsComponent_article_1_div_11_article_1_div_10_Template, 9, 5, "div", 46);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "div", 47);
    i0.ɵɵtemplate(12, CourseDetailsComponent_article_1_div_11_article_1_a_12_Template, 2, 1, "a", 48)(13, CourseDetailsComponent_article_1_div_11_article_1_button_13_Template, 2, 2, "button", 49)(14, CourseDetailsComponent_article_1_div_11_article_1_button_14_Template, 2, 2, "button", 49);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(lesson_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.contentTypeLabel(lesson_r3.contentType), " \u2022 ", lesson_r3.durationMinutes, " \u062F\u0642\u064A\u0642\u0629");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r3.contentType === "quiz" && (lesson_r3.progress == null ? null : lesson_r3.progress.quizPassed));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r3.contentType === "quiz" && !(lesson_r3.progress == null ? null : lesson_r3.progress.quizPassed) && (lesson_r3.progress == null ? null : lesson_r3.progress.attemptCount));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r3.contentUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r3.contentHtml);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", lesson_r3.contentType === "quiz" && lesson_r3.quiz);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", lesson_r3.contentUrl && lesson_r3.contentType !== "quiz");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.readOnlyLessons() && lesson_r3.contentType !== "quiz");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.readOnlyLessons() && lesson_r3.contentType === "quiz");
} }
function CourseDetailsComponent_article_1_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 39);
    i0.ɵɵtemplate(1, CourseDetailsComponent_article_1_div_11_article_1_Template, 15, 11, "article", 40);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.lessons());
} }
function CourseDetailsComponent_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 28)(1, "div", 29)(2, "div")(3, "h2", 30);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 31);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 32)(8, "span", 33);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, CourseDetailsComponent_article_1_button_10_Template, 5, 1, "button", 34);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(11, CourseDetailsComponent_article_1_div_11_Template, 2, 1, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = i0.ɵɵnextContext();
    const noLessons_r10 = i0.ɵɵreference(5);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((tmp_4_0 = ctx_r1.course()) == null ? null : tmp_4_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r1.course()) == null ? null : tmp_5_0.description);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.difficultyLabel(((tmp_6_0 = ctx_r1.course()) == null ? null : tmp_6_0.difficulty) || "beginner"));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.readOnlyLessons());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.lessons().length)("ngIfElse", noLessons_r10);
} }
function CourseDetailsComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 64);
} }
function CourseDetailsComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 65);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("description", ctx_r1.readOnlyLessons() ? "\u0627\u0628\u062F\u0623 \u0628\u0625\u0636\u0627\u0641\u0629 \u0623\u0648\u0644 \u062F\u0631\u0633 \u0644\u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629 \u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u0634\u0627\u0634\u0629." : "\u0627\u0644\u062F\u0648\u0631\u0629 \u0645\u062E\u0635\u0635\u0629 \u0644\u0643\u060C \u0644\u0643\u0646 \u0644\u0645 \u062A\u062A\u0645 \u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0648\u0633 \u0644\u0647\u0627 \u0628\u0639\u062F \u0645\u0646 \u0644\u0648\u062D\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u0629.");
} }
function CourseDetailsComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.title, ctx_r1.lessonValidationMessages.title), " ");
} }
function CourseDetailsComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.contentType, ctx_r1.lessonValidationMessages.contentType), " ");
} }
function CourseDetailsComponent_div_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.order, ctx_r1.lessonValidationMessages.order), " ");
} }
function CourseDetailsComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.getVisibleErrorMessage(ctx_r1.lessonForm.controls.durationMinutes, ctx_r1.lessonValidationMessages.durationMinutes), " ");
} }
function CourseDetailsComponent_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 19)(1, "label");
    i0.ɵɵtext(2, "\u0646\u0635 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "textarea", 66);
    i0.ɵɵelementStart(4, "div", 21);
    i0.ɵɵtext(5, "\u064A\u0645\u0643\u0646\u0643 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0647\u0630\u0627 \u0627\u0644\u062D\u0642\u0644 \u0644\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0623\u0648 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0646\u0635\u064A\u0629.");
    i0.ɵɵelementEnd()();
} }
function CourseDetailsComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0644\u0641: ", ctx_r1.uploadedLessonFileName());
} }
function CourseDetailsComponent_div_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 21);
    i0.ɵɵtext(1, " \u064A\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0645\u062D\u0644\u064A\u0627\u064B \u062F\u0627\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u062D\u0627\u0644\u064A\u0627\u064B\u060C \u0648\u0644\u064A\u0633 \u0639\u0628\u0631 \u0645\u062E\u0632\u0646 \u0645\u0644\u0641\u0627\u062A \u062E\u0627\u0631\u062C\u064A. ");
    i0.ɵɵelementEnd();
} }
function CourseDetailsComponent_div_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 57);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.lessonContentErrorMessage(), " ");
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
export class CourseDetailsComponent {
    constructor() {
        this.fb = inject(FormBuilder);
        this.route = inject(ActivatedRoute);
        this.coursesApi = inject(CoursesApiService);
        this.lessonDialog = viewChild.required('lessonDialog');
        this.course = signal(null, ...(ngDevMode ? [{ debugName: "course" }] : /* istanbul ignore next */ []));
        this.lessons = signal([], ...(ngDevMode ? [{ debugName: "lessons" }] : /* istanbul ignore next */ []));
        this.loadingLessonId = signal('', ...(ngDevMode ? [{ debugName: "loadingLessonId" }] : /* istanbul ignore next */ []));
        this.savingLesson = signal(false, ...(ngDevMode ? [{ debugName: "savingLesson" }] : /* istanbul ignore next */ []));
        this.uploadedLessonFileName = signal('', ...(ngDevMode ? [{ debugName: "uploadedLessonFileName" }] : /* istanbul ignore next */ []));
        this.quizAnswers = signal({}, ...(ngDevMode ? [{ debugName: "quizAnswers" }] : /* istanbul ignore next */ []));
        this.quizErrors = signal({}, ...(ngDevMode ? [{ debugName: "quizErrors" }] : /* istanbul ignore next */ []));
        this.readOnlyLessons = computed(() => !!this.route.snapshot.data['readOnlyLessons'], ...(ngDevMode ? [{ debugName: "readOnlyLessons" }] : /* istanbul ignore next */ []));
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
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            return;
        }
        this.loadCourse(id);
    }
    complete(lesson) {
        const lessonId = this.objectId(lesson);
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!lessonId || !courseId) {
            return;
        }
        this.loadingLessonId.set(lessonId);
        this.coursesApi
            .completeLesson(lessonId, lesson.durationMinutes)
            .pipe(finalize(() => this.loadingLessonId.set('')))
            .subscribe({
            next: () => this.loadCourse(courseId),
        });
    }
    selectQuizAnswer(lessonId, questionId, optionId) {
        this.quizAnswers.update((answers) => ({
            ...answers,
            [lessonId]: {
                ...(answers[lessonId] || {}),
                [questionId]: optionId,
            },
        }));
        this.quizErrors.update((errors) => ({
            ...errors,
            [lessonId]: '',
        }));
    }
    selectedQuizAnswer(lessonId, questionId) {
        return this.quizAnswers()[lessonId]?.[questionId] || '';
    }
    quizLocked(lesson) {
        const lessonId = this.objectId(lesson);
        return !lessonId || !!lesson.progress?.quizPassed || this.loadingLessonId() === lessonId;
    }
    submitQuiz(lesson) {
        const lessonId = this.objectId(lesson);
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!lessonId || !courseId || !lesson.quiz || this.quizLocked(lesson)) {
            return;
        }
        const selectedAnswers = this.quizAnswers()[lessonId] || {};
        const unansweredQuestion = lesson.quiz.questions.find((question) => !selectedAnswers[question.id]);
        if (unansweredQuestion) {
            this.quizErrors.update((errors) => ({
                ...errors,
                [lessonId]: 'أجب عن جميع أسئلة الاختبار قبل الإرسال.',
            }));
            return;
        }
        this.loadingLessonId.set(lessonId);
        this.coursesApi
            .submitQuizAttempt(lessonId, {
            answers: lesson.quiz.questions.map((question) => ({
                questionId: question.id,
                optionId: selectedAnswers[question.id],
            })),
            timeSpentMinutes: lesson.durationMinutes,
        })
            .pipe(finalize(() => this.loadingLessonId.set('')))
            .subscribe({
            next: () => {
                this.quizErrors.update((errors) => ({
                    ...errors,
                    [lessonId]: '',
                }));
                this.loadCourse(courseId);
            },
        });
    }
    openLessonDialog() {
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
        clearControlState(this.lessonForm);
        this.lessonDialog().open();
    }
    closeLessonDialog() {
        this.uploadedLessonFileName.set('');
        this.lessonDialog().close();
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
        const payload = {
            title: formValue.title.trim(),
            courseId,
            contentType: formValue.contentType,
            order: Number(formValue.order),
            durationMinutes: Number(formValue.durationMinutes),
            isRequired: formValue.isRequired,
            contentUrl: formValue.contentUrl.trim() || undefined,
            contentHtml: formValue.contentHtml.trim() || undefined,
        };
        this.savingLesson.set(true);
        this.coursesApi
            .createLesson(payload)
            .pipe(finalize(() => this.savingLesson.set(false)))
            .subscribe({
            next: () => {
                this.closeLessonDialog();
                this.loadCourse(courseId);
            },
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
    objectId(item) {
        return item._id || item.id || '';
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
    loadCourse(id) {
        forkJoin({
            course: this.coursesApi.getCourse(id),
            lessons: this.coursesApi.getLessons(id),
        }).subscribe(({ course, lessons }) => {
            this.initializeQuizAnswers(lessons);
            this.course.set(course);
            this.lessons.set(lessons);
        });
    }
    initializeQuizAnswers(lessons) {
        const nextAnswers = { ...this.quizAnswers() };
        for (const lesson of lessons) {
            const lessonId = this.objectId(lesson);
            if (!lessonId || lesson.contentType !== 'quiz' || !lesson.quiz || nextAnswers[lessonId]) {
                continue;
            }
            nextAnswers[lessonId] = {};
        }
        this.quizAnswers.set(nextAnswers);
    }
    static { this.ɵfac = function CourseDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CourseDetailsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CourseDetailsComponent, selectors: [["app-course-details"]], viewQuery: function CourseDetailsComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuerySignal(ctx.lessonDialog, _c0, 5);
        } if (rf & 2) {
            i0.ɵɵqueryAdvance();
        } }, decls: 59, vars: 22, consts: [["loadingState", ""], ["noLessons", ""], ["lessonDialog", ""], [1, "page-grid"], ["class", "card panel", 4, "ngIf", "ngIfElse"], ["title", "\u0625\u0636\u0627\u0641\u0629 \u062F\u0631\u0633", "subtitle", "\u0623\u062F\u062E\u0644 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u0644\u0625\u0636\u0627\u0641\u062A\u0647 \u0625\u0644\u0649 \u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629.", "icon", "graduation"], ["novalidate", "", 1, "dialog-form", 3, "ngSubmit", "formGroup"], [1, "form-grid"], [1, "field"], ["formControlName", "title"], ["class", "field-error", 4, "ngIf"], ["formControlName", "contentType"], ["value", "video"], ["value", "article"], ["value", "pdf"], ["value", "quiz"], ["value", "task"], ["type", "number", "formControlName", "order"], ["type", "number", "formControlName", "durationMinutes"], [1, "field", "field--full"], ["formControlName", "contentUrl", "placeholder", "https://example.com/lesson \u0623\u0648 \u0633\u064A\u062A\u0645 \u062A\u0639\u0628\u0626\u062A\u0647 \u0645\u0646 \u0627\u0644\u0645\u0644\u0641"], [1, "field-help"], ["class", "field field--full", 4, "ngIf"], ["type", "file", 3, "change"], ["class", "field-help", 4, "ngIf"], [1, "dialog-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"], [1, "card", "panel"], [1, "panel-header"], [1, "section-title"], [1, "section-subtitle"], [1, "panel-actions"], [1, "status-chip", "info"], ["class", "btn btn-secondary", "type", "button", 3, "click", 4, "ngIf"], ["class", "lesson-list", 4, "ngIf", "ngIfElse"], ["type", "button", 1, "btn", "btn-secondary", 3, "click"], [1, "btn-content"], ["name", "graduation", 3, "size"], [1, "lesson-list"], ["class", "lesson-card", 4, "ngFor", "ngForOf"], [1, "lesson-card"], [1, "lesson-card__body"], ["class", "lesson-card__meta status", 4, "ngIf"], ["class", "lesson-card__meta", 4, "ngIf"], ["class", "lesson-card__content", 4, "ngIf"], ["class", "quiz-panel", 4, "ngIf"], [1, "lesson-card__actions"], ["class", "btn btn-secondary", "target", "_blank", "rel", "noopener noreferrer", 3, "href", 4, "ngIf"], ["class", "btn btn-primary", "type", "button", 3, "disabled", "click", 4, "ngIf"], [1, "lesson-card__meta", "status"], [1, "lesson-card__meta"], [1, "lesson-card__content"], [1, "quiz-panel"], [1, "quiz-panel__summary"], [4, "ngIf"], ["class", "quiz-question", 3, "hidden", 4, "ngFor", "ngForOf"], [1, "field-error"], [1, "quiz-question", 3, "hidden"], ["class", "quiz-option", 4, "ngFor", "ngForOf"], [1, "quiz-option"], ["type", "radio", 3, "change", "name", "checked", "disabled"], ["target", "_blank", "rel", "noopener noreferrer", 1, "btn", "btn-secondary", 3, "href"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], ["title", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629", "description", "\u064A\u062A\u0645 \u062C\u0644\u0628 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0622\u0646."], ["title", "\u0644\u0627 \u062A\u0648\u062C\u062F \u062F\u0631\u0648\u0633 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u062F\u0648\u0631\u0629", 3, "description"], ["rows", "8", "formControlName", "contentHtml", "placeholder", "\u0627\u0643\u062A\u0628 \u0645\u062D\u062A\u0648\u0649 \u0627\u0644\u062F\u0631\u0633 \u0647\u0646\u0627 \u0623\u0648 \u0627\u0644\u0635\u0642 HTML \u0628\u0633\u064A\u0637\u0627\u064B."]], template: function CourseDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "section", 3);
            i0.ɵɵtemplate(1, CourseDetailsComponent_article_1_Template, 12, 6, "article", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(2, CourseDetailsComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor)(4, CourseDetailsComponent_ng_template_4_Template, 1, 1, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementStart(6, "app-dialog", 5, 2)(8, "form", 6);
            i0.ɵɵlistener("ngSubmit", function CourseDetailsComponent_Template_form_ngSubmit_8_listener() { return ctx.submitLesson(); });
            i0.ɵɵelementStart(9, "div", 7)(10, "div", 8)(11, "label");
            i0.ɵɵtext(12, "\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u062F\u0631\u0633");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(13, "input", 9);
            i0.ɵɵtemplate(14, CourseDetailsComponent_div_14_Template, 2, 1, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "div", 8)(16, "label");
            i0.ɵɵtext(17, "\u0646\u0648\u0639 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "select", 11)(19, "option", 12);
            i0.ɵɵtext(20, "\u0641\u064A\u062F\u064A\u0648");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "option", 13);
            i0.ɵɵtext(22, "\u0645\u0642\u0627\u0644");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "option", 14);
            i0.ɵɵtext(24, "PDF");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "option", 15);
            i0.ɵɵtext(26, "\u0627\u062E\u062A\u0628\u0627\u0631");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "option", 16);
            i0.ɵɵtext(28, "\u0645\u0647\u0645\u0629");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(29, CourseDetailsComponent_div_29_Template, 2, 1, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(30, "div", 8)(31, "label");
            i0.ɵɵtext(32, "\u0627\u0644\u062A\u0631\u062A\u064A\u0628");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(33, "input", 17);
            i0.ɵɵtemplate(34, CourseDetailsComponent_div_34_Template, 2, 1, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "div", 8)(36, "label");
            i0.ɵɵtext(37, "\u0627\u0644\u0645\u062F\u0629");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(38, "input", 18);
            i0.ɵɵtemplate(39, CourseDetailsComponent_div_39_Template, 2, 1, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "div", 19)(41, "label");
            i0.ɵɵtext(42, "\u0631\u0627\u0628\u0637 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(43, "input", 20);
            i0.ɵɵelementStart(44, "div", 21);
            i0.ɵɵtext(45);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(46, CourseDetailsComponent_div_46_Template, 6, 0, "div", 22);
            i0.ɵɵelementStart(47, "div", 19)(48, "label");
            i0.ɵɵtext(49, "\u0631\u0641\u0639 \u0645\u0644\u0641 \u0627\u0644\u0645\u062D\u062A\u0648\u0649");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(50, "input", 23);
            i0.ɵɵlistener("change", function CourseDetailsComponent_Template_input_change_50_listener($event) { return ctx.onLessonFileSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(51, CourseDetailsComponent_div_51_Template, 2, 1, "div", 24)(52, CourseDetailsComponent_div_52_Template, 2, 0, "div", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(53, CourseDetailsComponent_div_53_Template, 2, 1, "div", 10);
            i0.ɵɵelementStart(54, "div", 25)(55, "button", 26);
            i0.ɵɵlistener("click", function CourseDetailsComponent_Template_button_click_55_listener() { return ctx.closeLessonDialog(); });
            i0.ɵɵtext(56, "\u0625\u0644\u063A\u0627\u0621");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "button", 27);
            i0.ɵɵtext(58);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const loadingState_r11 = i0.ɵɵreference(3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.course())("ngIfElse", loadingState_r11);
            i0.ɵɵadvance(7);
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
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate1(" ", ctx.lessonUrlHelpText(), " ");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.lessonUsesTextContent());
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ctx.uploadedLessonFileName());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.uploadedLessonFileName());
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.hasLessonContentError());
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("disabled", ctx.lessonForm.invalid || ctx.savingLesson());
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.savingLesson() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : "\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u062F\u0631\u0633", " ");
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, ReactiveFormsModule, i2.ɵNgNoValidate, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, EmptyStateComponent, DialogComponent, IconComponent], styles: [".panel[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .lesson-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .lesson-card[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .lesson-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0.35rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .lesson-card__body[_ngcontent-%COMP%] {\n        min-width: 0;\n      }\n\n      .lesson-card__meta[_ngcontent-%COMP%] {\n        font-size: 0.92rem;\n      }\n\n      .lesson-card__content[_ngcontent-%COMP%] {\n        margin: 0.85rem 0 0;\n        padding: 0.85rem;\n        white-space: pre-wrap;\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n        color: var(--color-primary-text);\n        font-family: inherit;\n      }\n\n      .lesson-card__meta.status[_ngcontent-%COMP%] {\n        color: var(--color-success-700);\n      }\n\n      .quiz-panel[_ngcontent-%COMP%] {\n        margin-top: 1rem;\n        display: grid;\n        gap: 0.85rem;\n      }\n\n      .quiz-panel__summary[_ngcontent-%COMP%] {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 0.75rem;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.92rem;\n      }\n\n      .quiz-question[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.55rem;\n        padding: 0.9rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n      }\n\n      .quiz-option[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.55rem;\n        color: var(--color-primary-text);\n      }\n\n      .lesson-card__actions[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n\n      .field--full[_ngcontent-%COMP%] {\n        grid-column: 1 / -1;\n      }\n\n      .field-help[_ngcontent-%COMP%] {\n        margin-top: 0.45rem;\n        font-size: 0.9rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 720px) {\n        .lesson-card[_ngcontent-%COMP%] {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CourseDetailsComponent, [{
        type: Component,
        args: [{ selector: 'app-course-details', standalone: true, imports: [CommonModule, ReactiveFormsModule, EmptyStateComponent, DialogComponent, IconComponent], template: `
    <section class="page-grid">
      <article class="card panel" *ngIf="course(); else loadingState">
        <div class="panel-header">
          <div>
            <h2 class="section-title">{{ course()?.title }}</h2>
            <p class="section-subtitle">{{ course()?.description }}</p>
          </div>
          <div class="panel-actions">
            <span class="status-chip info">{{ difficultyLabel(course()?.difficulty || 'beginner') }}</span>
            <button *ngIf="readOnlyLessons()" class="btn btn-secondary" type="button" (click)="openLessonDialog()">
              <span class="btn-content">
                <app-icon name="graduation" [size]="18" />
                <span>إضافة درس</span>
              </span>
            </button>
          </div>
        </div>

        <div class="lesson-list" *ngIf="lessons().length; else noLessons">
          <article class="lesson-card" *ngFor="let lesson of lessons()">
            <div class="lesson-card__body">
              <strong>{{ lesson.title }}</strong>
              <p>{{ contentTypeLabel(lesson.contentType) }} • {{ lesson.durationMinutes }} دقيقة</p>
              <p class="lesson-card__meta status" *ngIf="lesson.contentType === 'quiz' && lesson.progress?.quizPassed">
                تم اجتياز الاختبار بنتيجة {{ lesson.progress?.bestQuizScorePercentage || lesson.progress?.lastQuizScorePercentage || 0 }}%
              </p>
              <p class="lesson-card__meta status" *ngIf="lesson.contentType === 'quiz' && !lesson.progress?.quizPassed && lesson.progress?.attemptCount">
                آخر نتيجة: {{ lesson.progress?.lastQuizScorePercentage || 0 }}% من {{ lesson.quiz?.passingScorePercentage || 70 }}%
              </p>
              <p class="lesson-card__meta" *ngIf="lesson.contentUrl">يوجد رابط أو ملف مرفوع لهذا الدرس.</p>
              <pre class="lesson-card__content" *ngIf="lesson.contentHtml">{{ lesson.contentHtml }}</pre>

              <div class="quiz-panel" *ngIf="lesson.contentType === 'quiz' && lesson.quiz">
                <div class="quiz-panel__summary">
                  <span>{{ lesson.quiz.questions.length }} أسئلة</span>
                  <span>الاجتياز من {{ lesson.quiz.passingScorePercentage }}%</span>
                  <span *ngIf="lesson.progress?.attemptCount">المحاولات: {{ lesson.progress?.attemptCount }}</span>
                </div>

                <div class="field-error" *ngIf="quizErrors()[objectId(lesson)]">
                  {{ quizErrors()[objectId(lesson)] }}
                </div>

                <div
                  class="quiz-question"
                  *ngFor="let question of lesson.quiz.questions; let questionIndex = index"
                  [hidden]="!!lesson.progress?.quizPassed"
                >
                  <strong>س{{ questionIndex + 1 }}. {{ question.prompt }}</strong>
                  <label class="quiz-option" *ngFor="let option of question.options">
                    <input
                      type="radio"
                      [name]="'quiz-' + objectId(lesson) + '-' + question.id"
                      [checked]="selectedQuizAnswer(objectId(lesson), question.id) === option.id"
                      [disabled]="quizLocked(lesson)"
                      (change)="selectQuizAnswer(objectId(lesson), question.id, option.id)"
                    />
                    <span>{{ option.text }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="lesson-card__actions">
              <a
                *ngIf="lesson.contentUrl && lesson.contentType !== 'quiz'"
                class="btn btn-secondary"
                [href]="lesson.contentUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                فتح المحتوى
              </a>
              <button
                *ngIf="!readOnlyLessons() && lesson.contentType !== 'quiz'"
                class="btn btn-primary"
                type="button"
                (click)="complete(lesson)"
                [disabled]="loadingLessonId() === objectId(lesson)"
              >
                {{ loadingLessonId() === objectId(lesson) ? 'جارٍ الحفظ...' : 'إتمام الدرس' }}
              </button>
              <button
                *ngIf="!readOnlyLessons() && lesson.contentType === 'quiz'"
                class="btn btn-primary"
                type="button"
                (click)="submitQuiz(lesson)"
                [disabled]="quizLocked(lesson) || loadingLessonId() === objectId(lesson)"
              >
                {{
                  lesson.progress?.quizPassed
                    ? 'تم الاجتياز'
                    : loadingLessonId() === objectId(lesson)
                      ? 'جارٍ التصحيح...'
                      : 'إرسال الاختبار'
                }}
              </button>
            </div>
          </article>
        </div>
      </article>
    </section>

    <ng-template #loadingState>
      <app-empty-state title="جارٍ تحميل الدورة" description="يتم جلب التفاصيل الآن." />
    </ng-template>
    <ng-template #noLessons>
      <app-empty-state
        title="لا توجد دروس في هذه الدورة"
        [description]="
          readOnlyLessons()
            ? 'ابدأ بإضافة أول درس لهذه الدورة من هذه الشاشة.'
            : 'الدورة مخصصة لك، لكن لم تتم إضافة دروس لها بعد من لوحة الإدارة.'
        "
      />
    </ng-template>

    <app-dialog
      #lessonDialog
      title="إضافة درس"
      subtitle="أدخل بيانات الدرس لإضافته إلى هذه الدورة."
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
          <div class="field field--full">
            <label>رابط المحتوى</label>
            <input formControlName="contentUrl" placeholder="https://example.com/lesson أو سيتم تعبئته من الملف" />
            <div class="field-help">
              {{ lessonUrlHelpText() }}
            </div>
          </div>
          <div class="field field--full" *ngIf="lessonUsesTextContent()">
            <label>نص المحتوى</label>
            <textarea
              rows="8"
              formControlName="contentHtml"
              placeholder="اكتب محتوى الدرس هنا أو الصق HTML بسيطاً."
            ></textarea>
            <div class="field-help">يمكنك استخدام هذا الحقل للمقالات أو التعليمات النصية.</div>
          </div>
          <div class="field field--full">
            <label>رفع ملف المحتوى</label>
            <input type="file" (change)="onLessonFileSelected($event)" />
            <div class="field-help" *ngIf="uploadedLessonFileName()">تم اختيار الملف: {{ uploadedLessonFileName() }}</div>
            <div class="field-help" *ngIf="!uploadedLessonFileName()">
              يتم حفظ الملفات محلياً داخل بيانات الدرس حالياً، وليس عبر مخزن ملفات خارجي.
            </div>
          </div>
        </div>

        <div class="field-error" *ngIf="hasLessonContentError()">
          {{ lessonContentErrorMessage() }}
        </div>

        <div class="dialog-actions">
          <button class="btn btn-ghost" type="button" (click)="closeLessonDialog()">إلغاء</button>
          <button class="btn btn-primary" type="submit" [disabled]="lessonForm.invalid || savingLesson()">
            {{ savingLesson() ? 'جارٍ الحفظ...' : 'إضافة الدرس' }}
          </button>
        </div>
      </form>
    </app-dialog>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .panel {\n        padding: 1.5rem;\n      }\n\n      .lesson-list {\n        display: grid;\n        gap: 1rem;\n      }\n\n      .lesson-card {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        border: 1px solid var(--color-neutral-200);\n      }\n\n      .lesson-card p {\n        margin: 0.35rem 0 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .lesson-card__body {\n        min-width: 0;\n      }\n\n      .lesson-card__meta {\n        font-size: 0.92rem;\n      }\n\n      .lesson-card__content {\n        margin: 0.85rem 0 0;\n        padding: 0.85rem;\n        white-space: pre-wrap;\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        border: 1px solid var(--color-neutral-200);\n        color: var(--color-primary-text);\n        font-family: inherit;\n      }\n\n      .lesson-card__meta.status {\n        color: var(--color-success-700);\n      }\n\n      .quiz-panel {\n        margin-top: 1rem;\n        display: grid;\n        gap: 0.85rem;\n      }\n\n      .quiz-panel__summary {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 0.75rem;\n        color: var(--color-secondary-paragraph);\n        font-size: 0.92rem;\n      }\n\n      .quiz-question {\n        display: grid;\n        gap: 0.55rem;\n        padding: 0.9rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n      }\n\n      .quiz-option {\n        display: flex;\n        align-items: flex-start;\n        gap: 0.55rem;\n        color: var(--color-primary-text);\n      }\n\n      .lesson-card__actions {\n        display: flex;\n        align-items: center;\n        gap: 0.75rem;\n        flex-wrap: wrap;\n      }\n\n      .field--full {\n        grid-column: 1 / -1;\n      }\n\n      .field-help {\n        margin-top: 0.45rem;\n        font-size: 0.9rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      @media (max-width: 720px) {\n        .lesson-card {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }\n    "] }]
    }], null, { lessonDialog: [{ type: i0.ViewChild, args: ['lessonDialog', { isSignal: true }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CourseDetailsComponent, { className: "CourseDetailsComponent", filePath: "src/app/features/employee/pages/course-details.component.ts", lineNumber: 349 }); })();
//# sourceMappingURL=course-details.component.js.map