import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { EmptyStateComponent } from '../../../shared/components';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = () => ({});
function CourseDetailsComponent_section_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 14);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_button_8_Template_button_click_0_listener() { const lessonIndex_r2 = i0.ɵɵrestoreView(_r1).index; const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectLesson(lessonIndex_r2)); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 15);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const lesson_r4 = ctx.$implicit;
    const lessonIndex_r2 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r2.isActiveLesson(lessonIndex_r2));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", lesson_r4.order, ". ", lesson_r4.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.contentTypeLabel(lesson_r4.contentType));
    i0.ɵɵadvance();
    i0.ɵɵclassProp("success", ctx_r2.isLessonCompleted(lesson_r4));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.isLessonCompleted(lesson_r4) ? "\u0645\u0643\u062A\u0645\u0644" : "\u0642\u064A\u062F \u0627\u0644\u062A\u0646\u0641\u064A\u0630", " ");
} }
function CourseDetailsComponent_section_0_button_9_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 16);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_button_9_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.selectFinalExam()); });
    i0.ɵɵelementStart(1, "div")(2, "strong");
    i0.ɵɵtext(3, "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 15);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_7_0;
    let tmp_8_0;
    let tmp_9_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("active", ctx_r2.activePanel().kind === "final");
    i0.ɵɵproperty("disabled", !ctx_r2.canOpenFinalExam());
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("", ((tmp_7_0 = ctx_r2.course()) == null ? null : tmp_7_0.finalQuiz == null ? null : tmp_7_0.finalQuiz.questions == null ? null : tmp_7_0.finalQuiz.questions.length) || 0, " \u0623\u0633\u0626\u0644\u0629");
    i0.ɵɵadvance();
    i0.ɵɵclassProp("success", (tmp_8_0 = ctx_r2.course()) == null ? null : tmp_8_0.finalQuizProgress == null ? null : tmp_8_0.finalQuizProgress.passed);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ((tmp_9_0 = ctx_r2.course()) == null ? null : tmp_9_0.finalQuizProgress == null ? null : tmp_9_0.finalQuizProgress.passed) ? "\u062A\u0645 \u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632" : ctx_r2.canOpenFinalExam() ? "\u0645\u062A\u0627\u062D" : "\u0628\u0639\u062F \u0627\u0644\u062F\u0631\u0648\u0633", " ");
} }
function CourseDetailsComponent_section_0_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "strong");
    i0.ɵɵtext(2, "\u0634\u0647\u0627\u062F\u0629 \u0627\u0644\u0625\u062A\u0645\u0627\u0645");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "p");
    i0.ɵɵtext(4, "\u062A\u0638\u0647\u0631 \u0628\u0639\u062F \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629 \u0648\u0627\u062C\u062A\u064A\u0627\u0632 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0625\u0646 \u0648\u062C\u062F.");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "button", 18);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_div_10_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r2 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r2.downloadCertificate()); });
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("disabled", !ctx_r2.canDownloadCertificate() || ctx_r2.downloadingCertificate());
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.downloadingCertificate() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0646\u0632\u064A\u0644..." : ctx_r2.canDownloadCertificate() ? "\u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0634\u0647\u0627\u062F\u0629" : "\u063A\u064A\u0631 \u0645\u062A\u0627\u062D\u0629 \u0628\u0639\u062F", " ");
} }
function CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_8_iframe_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "iframe", 38);
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext(2).ngIf;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("src", ctx_r2.safeResourceUrl(slide_r8.mediaUrl), i0.ɵɵsanitizeResourceUrl);
} }
function CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_8_a_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 39);
    i0.ɵɵtext(1, " \u0641\u062A\u062D \u0627\u0644\u0648\u0633\u0627\u0626\u0637 ");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext(2).ngIf;
    i0.ɵɵproperty("href", slide_r8.mediaUrl, i0.ɵɵsanitizeUrl);
} }
function CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtemplate(1, CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_8_iframe_1_Template, 1, 1, "iframe", 36)(2, CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_8_a_2_Template, 2, 1, "a", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r2 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ((tmp_9_0 = ctx_r2.activeLesson()) == null ? null : tmp_9_0.contentType) === "video" || ((tmp_9_0 = ctx_r2.activeLesson()) == null ? null : tmp_9_0.contentType) === "pdf");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ((tmp_10_0 = ctx_r2.activeLesson()) == null ? null : tmp_10_0.contentType) !== "video" && ((tmp_10_0 = ctx_r2.activeLesson()) == null ? null : tmp_10_0.contentType) !== "pdf");
} }
function CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 40);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slide_r8 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(slide_r8.notes);
} }
function CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 29)(1, "div", 30)(2, "h4");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 31);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "p", 32);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_8_Template, 3, 2, "div", 33)(9, CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_div_9_Template, 2, 1, "div", 34);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const slide_r8 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(slide_r8.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r2.activeSlideIndex() + 1, "/", ctx_r2.activeSlides().length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(slide_r8.body);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slide_r8.mediaUrl);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", slide_r8.notes);
} }
function CourseDetailsComponent_section_0_article_11_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 24)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(6, CourseDetailsComponent_section_0_article_11_ng_container_9_section_6_Template, 10, 6, "section", 25);
    i0.ɵɵelementStart(7, "div", 26)(8, "button", 27);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_article_11_ng_container_9_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToPreviousSlide()); });
    i0.ɵɵtext(9, " \u0627\u0644\u0633\u0627\u0628\u0642 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "button", 18);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_article_11_ng_container_9_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToNextSlide()); });
    i0.ɵɵtext(11, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "button", 28);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_article_11_ng_container_9_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r7); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.completeActiveLesson()); });
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0634\u0631\u064A\u062D\u0629 ", ctx_r2.activeSlideIndex() + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0645\u0646 ", ctx_r2.activeSlides().length);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeSlides()[ctx_r2.activeSlideIndex()]);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.activeSlideIndex() === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.activeSlideIndex() === ctx_r2.activeSlides().length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r2.canCompleteActiveLesson() || ctx_r2.loadingLessonId() === ctx_r2.objectId(ctx_r2.activeLesson() || i0.ɵɵpureFunction0(7, _c0)));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r2.loadingLessonId() === ctx_r2.objectId(ctx_r2.activeLesson() || i0.ɵɵpureFunction0(8, _c0)) ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638..." : ctx_r2.isLessonCompleted(ctx_r2.activeLesson() || null) ? "\u062A\u0645 \u0627\u0644\u0625\u062A\u0645\u0627\u0645" : "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062F\u0631\u0633", " ");
} }
function CourseDetailsComponent_section_0_article_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 19)(1, "div", 20)(2, "div")(3, "p", 21);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 22);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(9, CourseDetailsComponent_section_0_article_11_ng_container_9_Template, 14, 9, "ng-container", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    i0.ɵɵnextContext();
    const lessonQuizStage_r9 = i0.ɵɵreference(13);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r2.contentTypeLabel(((tmp_5_0 = ctx_r2.activeLesson()) == null ? null : tmp_5_0.contentType) || "article"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_6_0 = ctx_r2.activeLesson()) == null ? null : tmp_6_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", (tmp_7_0 = ctx_r2.activeLesson()) == null ? null : tmp_7_0.durationMinutes, " \u062F\u0642\u064A\u0642\u0629");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ((tmp_8_0 = ctx_r2.activeLesson()) == null ? null : tmp_8_0.contentType) !== "quiz")("ngIfElse", lessonQuizStage_r9);
} }
function CourseDetailsComponent_section_0_ng_template_12_div_8_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 49);
} if (rf & 2) {
    const question_r11 = ctx.$implicit;
    const questionIndex_r12 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("active", questionIndex_r12 === ctx_r2.activeQuizQuestionIndex())("done", ctx_r2.hasSelectedLessonAnswer(ctx_r2.objectId(ctx_r2.activeLesson() || i0.ɵɵpureFunction0(4, _c0)), question_r11.id));
} }
function CourseDetailsComponent_section_0_ng_template_12_div_8_section_8_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_12_div_8_section_8_button_3_Template_button_click_0_listener() { const option_r14 = i0.ɵɵrestoreView(_r13).$implicit; const question_r15 = i0.ɵɵnextContext().ngIf; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.selectLessonQuizAnswer(question_r15.id, option_r14.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r14 = ctx.$implicit;
    const question_r15 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("selected", ctx_r2.selectedLessonAnswer(ctx_r2.objectId(ctx_r2.activeLesson() || i0.ɵɵpureFunction0(3, _c0)), question_r15.id) === option_r14.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r14.text, " ");
} }
function CourseDetailsComponent_section_0_ng_template_12_div_8_section_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 50)(1, "h4");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CourseDetailsComponent_section_0_ng_template_12_div_8_section_8_button_3_Template, 2, 4, "button", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r15 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(question_r15.prompt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", question_r15.options);
} }
function CourseDetailsComponent_section_0_ng_template_12_div_8_div_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.quizError());
} }
function CourseDetailsComponent_section_0_ng_template_12_div_8_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_8_0;
    let tmp_9_0;
    let tmp_10_0;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(((tmp_8_0 = ctx_r2.activeLesson()) == null ? null : tmp_8_0.progress == null ? null : tmp_8_0.progress.quizPassed) ? "\u062A\u0645 \u0627\u062C\u062A\u064A\u0627\u0632 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631" : "\u0622\u062E\u0631 \u0646\u062A\u064A\u062C\u0629 \u0645\u062D\u0641\u0648\u0638\u0629");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0646\u062A\u064A\u062C\u0629: ", ((tmp_9_0 = ctx_r2.activeLesson()) == null ? null : tmp_9_0.progress == null ? null : tmp_9_0.progress.bestQuizScorePercentage) || ((tmp_9_0 = ctx_r2.activeLesson()) == null ? null : tmp_9_0.progress == null ? null : tmp_9_0.progress.lastQuizScorePercentage) || 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A: ", (tmp_10_0 = ctx_r2.activeLesson()) == null ? null : tmp_10_0.progress == null ? null : tmp_10_0.progress.attemptCount);
} }
function CourseDetailsComponent_section_0_ng_template_12_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 44);
    i0.ɵɵtemplate(7, CourseDetailsComponent_section_0_ng_template_12_div_8_span_7_Template, 1, 5, "span", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, CourseDetailsComponent_section_0_ng_template_12_div_8_section_8_Template, 4, 2, "section", 46)(9, CourseDetailsComponent_section_0_ng_template_12_div_8_div_9_Template, 2, 1, "div", 47)(10, CourseDetailsComponent_section_0_ng_template_12_div_8_div_10_Template, 7, 3, "div", 48);
    i0.ɵɵelementStart(11, "div", 26)(12, "button", 27);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_12_div_8_Template_button_click_12_listener() { i0.ɵɵrestoreView(_r10); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToPreviousQuizQuestion()); });
    i0.ɵɵtext(13, " \u0627\u0644\u0633\u0627\u0628\u0642 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "button", 18);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_12_div_8_Template_button_click_14_listener() { const quiz_r16 = i0.ɵɵrestoreView(_r10).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToNextQuizQuestion(quiz_r16)); });
    i0.ɵɵtext(15, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "button", 28);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_12_div_8_Template_button_click_16_listener() { const quiz_r16 = i0.ɵɵrestoreView(_r10).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.submitActiveLessonQuiz(quiz_r16)); });
    i0.ɵɵtext(17);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_12_0;
    let tmp_15_0;
    let tmp_16_0;
    const quiz_r16 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("\u0627\u0644\u0633\u0624\u0627\u0644 ", ctx_r2.activeQuizQuestionIndex() + 1, " \u0645\u0646 ", quiz_r16.questions.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 ", quiz_r16.passingScorePercentage, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", quiz_r16.questions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", quiz_r16.questions[ctx_r2.activeQuizQuestionIndex()]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.quizError());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_12_0 = ctx_r2.activeLesson()) == null ? null : tmp_12_0.progress == null ? null : tmp_12_0.progress.attemptCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.activeQuizQuestionIndex() === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.activeQuizQuestionIndex() === quiz_r16.questions.length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.loadingLessonId() === ctx_r2.objectId(ctx_r2.activeLesson() || i0.ɵɵpureFunction0(11, _c0)) || !!((tmp_15_0 = ctx_r2.activeLesson()) == null ? null : tmp_15_0.progress == null ? null : tmp_15_0.progress.quizPassed));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ((tmp_16_0 = ctx_r2.activeLesson()) == null ? null : tmp_16_0.progress == null ? null : tmp_16_0.progress.quizPassed) ? "\u062A\u0645 \u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632" : ctx_r2.loadingLessonId() === ctx_r2.objectId(ctx_r2.activeLesson() || i0.ɵɵpureFunction0(12, _c0)) ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0635\u062D\u064A\u062D..." : "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631", " ");
} }
function CourseDetailsComponent_section_0_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20)(1, "div")(2, "p", 21);
    i0.ɵɵtext(3, "\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u062F\u0631\u0633");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "h3");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 22);
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(8, CourseDetailsComponent_section_0_ng_template_12_div_8_Template, 18, 13, "div", 41);
} if (rf & 2) {
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r2.activeLesson()) == null ? null : tmp_5_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ((tmp_6_0 = ctx_r2.activeLesson()) == null ? null : tmp_6_0.quiz == null ? null : tmp_6_0.quiz.questions == null ? null : tmp_6_0.quiz.questions.length) || 0, " \u0623\u0633\u0626\u0644\u0629 ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_7_0 = ctx_r2.activeLesson()) == null ? null : tmp_7_0.quiz);
} }
function CourseDetailsComponent_section_0_ng_template_14_article_0_span_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 49);
} if (rf & 2) {
    const question_r18 = ctx.$implicit;
    const questionIndex_r19 = ctx.index;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("active", questionIndex_r19 === ctx_r2.activeFinalQuizQuestionIndex())("done", ctx_r2.hasSelectedFinalAnswer(question_r18.id));
} }
function CourseDetailsComponent_section_0_ng_template_14_article_0_section_17_button_3_Template(rf, ctx) { if (rf & 1) {
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 52);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_14_article_0_section_17_button_3_Template_button_click_0_listener() { const option_r21 = i0.ɵɵrestoreView(_r20).$implicit; const question_r22 = i0.ɵɵnextContext().ngIf; const ctx_r2 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r2.selectFinalQuizAnswer(question_r22.id, option_r21.id)); });
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const option_r21 = ctx.$implicit;
    const question_r22 = i0.ɵɵnextContext().ngIf;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵclassProp("selected", ctx_r2.selectedFinalAnswer(question_r22.id) === option_r21.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", option_r21.text, " ");
} }
function CourseDetailsComponent_section_0_ng_template_14_article_0_section_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 50)(1, "h4");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, CourseDetailsComponent_section_0_ng_template_14_article_0_section_17_button_3_Template, 2, 3, "button", 51);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const question_r22 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(question_r22.prompt);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", question_r22.options);
} }
function CourseDetailsComponent_section_0_ng_template_14_article_0_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.finalQuizError());
} }
function CourseDetailsComponent_section_0_ng_template_14_article_0_div_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_9_0;
    let tmp_10_0;
    let tmp_11_0;
    const ctx_r2 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(((tmp_9_0 = ctx_r2.course()) == null ? null : tmp_9_0.finalQuizProgress == null ? null : tmp_9_0.finalQuizProgress.passed) ? "\u062A\u0645 \u0627\u062C\u062A\u064A\u0627\u0632 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A" : "\u0622\u062E\u0631 \u0646\u062A\u064A\u062C\u0629 \u0645\u062D\u0641\u0648\u0638\u0629");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0646\u062A\u064A\u062C\u0629: ", ((tmp_10_0 = ctx_r2.course()) == null ? null : tmp_10_0.finalQuizProgress == null ? null : tmp_10_0.finalQuizProgress.bestScorePercentage) || ((tmp_10_0 = ctx_r2.course()) == null ? null : tmp_10_0.finalQuizProgress == null ? null : tmp_10_0.finalQuizProgress.lastScorePercentage) || 0, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A: ", (tmp_11_0 = ctx_r2.course()) == null ? null : tmp_11_0.finalQuizProgress == null ? null : tmp_11_0.finalQuizProgress.attemptCount);
} }
function CourseDetailsComponent_section_0_ng_template_14_article_0_Template(rf, ctx) { if (rf & 1) {
    const _r17 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "article", 19)(1, "div", 20)(2, "div")(3, "p", 21);
    i0.ɵɵtext(4, "\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h3");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 22);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 42)(10, "div", 43)(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 44);
    i0.ɵɵtemplate(16, CourseDetailsComponent_section_0_ng_template_14_article_0_span_16_Template, 1, 4, "span", 45);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, CourseDetailsComponent_section_0_ng_template_14_article_0_section_17_Template, 4, 2, "section", 46)(18, CourseDetailsComponent_section_0_ng_template_14_article_0_div_18_Template, 2, 1, "div", 47)(19, CourseDetailsComponent_section_0_ng_template_14_article_0_div_19_Template, 7, 3, "div", 48);
    i0.ɵɵelementStart(20, "div", 26)(21, "button", 27);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_14_article_0_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r17); const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToPreviousFinalQuizQuestion()); });
    i0.ɵɵtext(22, " \u0627\u0644\u0633\u0627\u0628\u0642 ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 18);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_14_article_0_Template_button_click_23_listener() { const finalQuiz_r23 = i0.ɵɵrestoreView(_r17).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.goToNextFinalQuizQuestion(finalQuiz_r23)); });
    i0.ɵɵtext(24, " \u0627\u0644\u062A\u0627\u0644\u064A ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "button", 28);
    i0.ɵɵlistener("click", function CourseDetailsComponent_section_0_ng_template_14_article_0_Template_button_click_25_listener() { const finalQuiz_r23 = i0.ɵɵrestoreView(_r17).ngIf; const ctx_r2 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r2.submitFinalQuiz(finalQuiz_r23)); });
    i0.ɵɵtext(26);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    let tmp_8_0;
    let tmp_15_0;
    let tmp_18_0;
    let tmp_19_0;
    const finalQuiz_r23 = ctx.ngIf;
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate((tmp_8_0 = ctx_r2.course()) == null ? null : tmp_8_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", finalQuiz_r23.questions.length, " \u0623\u0633\u0626\u0644\u0629");
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("\u0627\u0644\u0633\u0624\u0627\u0644 ", ctx_r2.activeFinalQuizQuestionIndex() + 1, " \u0645\u0646 ", finalQuiz_r23.questions.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632 ", finalQuiz_r23.passingScorePercentage, "%");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", finalQuiz_r23.questions);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", finalQuiz_r23.questions[ctx_r2.activeFinalQuizQuestionIndex()]);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.finalQuizError());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_15_0 = ctx_r2.course()) == null ? null : tmp_15_0.finalQuizProgress == null ? null : tmp_15_0.finalQuizProgress.attemptCount);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.activeFinalQuizQuestionIndex() === 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.activeFinalQuizQuestionIndex() === finalQuiz_r23.questions.length - 1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r2.loadingFinalQuiz() || !!((tmp_18_0 = ctx_r2.course()) == null ? null : tmp_18_0.finalQuizProgress == null ? null : tmp_18_0.finalQuizProgress.passed));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ((tmp_19_0 = ctx_r2.course()) == null ? null : tmp_19_0.finalQuizProgress == null ? null : tmp_19_0.finalQuizProgress.passed) ? "\u062A\u0645 \u0627\u0644\u0627\u062C\u062A\u064A\u0627\u0632" : ctx_r2.loadingFinalQuiz() ? "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0635\u062D\u064A\u062D..." : "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064A", " ");
} }
function CourseDetailsComponent_section_0_ng_template_14_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 19);
    i0.ɵɵelement(1, "app-empty-state", 55);
    i0.ɵɵelementEnd();
} }
function CourseDetailsComponent_section_0_ng_template_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, CourseDetailsComponent_section_0_ng_template_14_article_0_Template, 27, 13, "article", 13)(1, CourseDetailsComponent_section_0_ng_template_14_ng_template_1_Template, 2, 0, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    let tmp_6_0;
    const fallbackStage_r24 = i0.ɵɵreference(2);
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", (tmp_6_0 = ctx_r2.course()) == null ? null : tmp_6_0.finalQuiz)("ngIfElse", fallbackStage_r24);
} }
function CourseDetailsComponent_section_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "section", 5)(1, "aside", 6)(2, "div")(3, "h2", 7);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 8);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "div", 9);
    i0.ɵɵtemplate(8, CourseDetailsComponent_section_0_button_8_Template, 8, 8, "button", 10)(9, CourseDetailsComponent_section_0_button_9_Template, 8, 7, "button", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(10, CourseDetailsComponent_section_0_div_10_Template, 7, 2, "div", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(11, CourseDetailsComponent_section_0_article_11_Template, 10, 5, "article", 13)(12, CourseDetailsComponent_section_0_ng_template_12_Template, 9, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(14, CourseDetailsComponent_section_0_ng_template_14_Template, 3, 2, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_8_0;
    const finalExamStage_r25 = i0.ɵɵreference(15);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate((tmp_4_0 = ctx_r2.course()) == null ? null : tmp_4_0.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate((tmp_5_0 = ctx_r2.course()) == null ? null : tmp_5_0.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r2.lessons());
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_7_0 = ctx_r2.course()) == null ? null : tmp_7_0.finalQuiz);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", (tmp_8_0 = ctx_r2.course()) == null ? null : tmp_8_0.certificateEnabled);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.activeLesson())("ngIfElse", finalExamStage_r25);
} }
function CourseDetailsComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 56);
} }
export class CourseDetailsComponent {
    constructor() {
        this.route = inject(ActivatedRoute);
        this.coursesApi = inject(CoursesApiService);
        this.sanitizer = inject(DomSanitizer);
        this.course = signal(null, ...(ngDevMode ? [{ debugName: "course" }] : /* istanbul ignore next */ []));
        this.lessons = signal([], ...(ngDevMode ? [{ debugName: "lessons" }] : /* istanbul ignore next */ []));
        this.activePanel = signal({
            kind: 'lesson',
            index: 0,
        }, ...(ngDevMode ? [{ debugName: "activePanel" }] : /* istanbul ignore next */ []));
        this.activeSlideIndex = signal(0, ...(ngDevMode ? [{ debugName: "activeSlideIndex" }] : /* istanbul ignore next */ []));
        this.activeQuizQuestionIndex = signal(0, ...(ngDevMode ? [{ debugName: "activeQuizQuestionIndex" }] : /* istanbul ignore next */ []));
        this.activeFinalQuizQuestionIndex = signal(0, ...(ngDevMode ? [{ debugName: "activeFinalQuizQuestionIndex" }] : /* istanbul ignore next */ []));
        this.lessonQuizAnswers = signal({}, ...(ngDevMode ? [{ debugName: "lessonQuizAnswers" }] : /* istanbul ignore next */ []));
        this.finalQuizAnswers = signal({}, ...(ngDevMode ? [{ debugName: "finalQuizAnswers" }] : /* istanbul ignore next */ []));
        this.quizError = signal('', ...(ngDevMode ? [{ debugName: "quizError" }] : /* istanbul ignore next */ []));
        this.finalQuizError = signal('', ...(ngDevMode ? [{ debugName: "finalQuizError" }] : /* istanbul ignore next */ []));
        this.loadingLessonId = signal('', ...(ngDevMode ? [{ debugName: "loadingLessonId" }] : /* istanbul ignore next */ []));
        this.loadingFinalQuiz = signal(false, ...(ngDevMode ? [{ debugName: "loadingFinalQuiz" }] : /* istanbul ignore next */ []));
        this.downloadingCertificate = signal(false, ...(ngDevMode ? [{ debugName: "downloadingCertificate" }] : /* istanbul ignore next */ []));
        this.activeLesson = computed(() => {
            const panel = this.activePanel();
            return panel.kind === 'lesson' ? this.lessons()[panel.index] || null : null;
        }, ...(ngDevMode ? [{ debugName: "activeLesson" }] : /* istanbul ignore next */ []));
        this.activeSlides = computed(() => {
            const lesson = this.activeLesson();
            return lesson ? this.resolveSlides(lesson) : [];
        }, ...(ngDevMode ? [{ debugName: "activeSlides" }] : /* istanbul ignore next */ []));
        this.canOpenFinalExam = computed(() => this.requiredLessonsCompleted(), ...(ngDevMode ? [{ debugName: "canOpenFinalExam" }] : /* istanbul ignore next */ []));
        this.canDownloadCertificate = computed(() => {
            const currentCourse = this.course();
            return !!currentCourse?.certificateEnabled && this.requiredLessonsCompleted() && this.finalQuizCompletedIfRequired();
        }, ...(ngDevMode ? [{ debugName: "canDownloadCertificate" }] : /* istanbul ignore next */ []));
    }
    ngOnInit() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (courseId) {
            this.loadCourse(courseId);
        }
    }
    selectLesson(index) {
        this.activePanel.set({ kind: 'lesson', index });
        this.activeSlideIndex.set(0);
        this.activeQuizQuestionIndex.set(0);
        this.quizError.set('');
    }
    selectFinalExam() {
        if (!this.canOpenFinalExam()) {
            return;
        }
        this.activePanel.set({ kind: 'final' });
        this.activeFinalQuizQuestionIndex.set(0);
        this.finalQuizError.set('');
    }
    goToPreviousSlide() {
        this.activeSlideIndex.update((index) => Math.max(0, index - 1));
    }
    goToNextSlide() {
        this.activeSlideIndex.update((index) => Math.min(this.activeSlides().length - 1, index + 1));
    }
    canCompleteActiveLesson() {
        const lesson = this.activeLesson();
        return !!lesson && lesson.contentType !== 'quiz' && this.activeSlideIndex() === this.activeSlides().length - 1;
    }
    completeActiveLesson() {
        const lesson = this.activeLesson();
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!lesson || !courseId || !this.canCompleteActiveLesson()) {
            return;
        }
        const lessonId = this.objectId(lesson);
        this.loadingLessonId.set(lessonId);
        this.coursesApi
            .completeLesson(lessonId, lesson.durationMinutes)
            .pipe(finalize(() => this.loadingLessonId.set('')))
            .subscribe(() => this.loadCourse(courseId));
    }
    isLessonCompleted(lesson) {
        return lesson?.progress?.status === 'completed';
    }
    selectLessonQuizAnswer(questionId, optionId) {
        const lessonId = this.objectId(this.activeLesson() || {});
        if (!lessonId) {
            return;
        }
        this.lessonQuizAnswers.update((answers) => ({
            ...answers,
            [lessonId]: {
                ...(answers[lessonId] || {}),
                [questionId]: optionId,
            },
        }));
        this.quizError.set('');
    }
    selectedLessonAnswer(lessonId, questionId) {
        return this.lessonQuizAnswers()[lessonId]?.[questionId] || '';
    }
    hasSelectedLessonAnswer(lessonId, questionId) {
        return !!this.selectedLessonAnswer(lessonId, questionId);
    }
    goToPreviousQuizQuestion() {
        this.activeQuizQuestionIndex.update((index) => Math.max(0, index - 1));
    }
    goToNextQuizQuestion(quiz) {
        this.activeQuizQuestionIndex.update((index) => Math.min(quiz.questions.length - 1, index + 1));
    }
    submitActiveLessonQuiz(quiz) {
        const lesson = this.activeLesson();
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!lesson || !courseId) {
            return;
        }
        const lessonId = this.objectId(lesson);
        const selectedAnswers = this.lessonQuizAnswers()[lessonId] || {};
        const unanswered = quiz.questions.find((question) => !selectedAnswers[question.id]);
        if (unanswered) {
            this.quizError.set('أجب عن جميع الأسئلة قبل إرسال الاختبار.');
            return;
        }
        this.loadingLessonId.set(lessonId);
        this.coursesApi
            .submitQuizAttempt(lessonId, {
            answers: quiz.questions.map((question) => ({
                questionId: question.id,
                optionId: selectedAnswers[question.id],
            })),
            timeSpentMinutes: lesson.durationMinutes,
        })
            .pipe(finalize(() => this.loadingLessonId.set('')))
            .subscribe(() => {
            this.quizError.set('');
            this.loadCourse(courseId);
        });
    }
    selectFinalQuizAnswer(questionId, optionId) {
        this.finalQuizAnswers.update((answers) => ({
            ...answers,
            [questionId]: optionId,
        }));
        this.finalQuizError.set('');
    }
    selectedFinalAnswer(questionId) {
        return this.finalQuizAnswers()[questionId] || '';
    }
    hasSelectedFinalAnswer(questionId) {
        return !!this.selectedFinalAnswer(questionId);
    }
    goToPreviousFinalQuizQuestion() {
        this.activeFinalQuizQuestionIndex.update((index) => Math.max(0, index - 1));
    }
    goToNextFinalQuizQuestion(quiz) {
        this.activeFinalQuizQuestionIndex.update((index) => Math.min(quiz.questions.length - 1, index + 1));
    }
    submitFinalQuiz(quiz) {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!courseId) {
            return;
        }
        const selectedAnswers = this.finalQuizAnswers();
        const unanswered = quiz.questions.find((question) => !selectedAnswers[question.id]);
        if (unanswered) {
            this.finalQuizError.set('أجب عن جميع أسئلة الاختبار النهائي قبل الإرسال.');
            return;
        }
        this.loadingFinalQuiz.set(true);
        this.coursesApi
            .submitFinalQuizAttempt(courseId, {
            answers: quiz.questions.map((question) => ({
                questionId: question.id,
                optionId: selectedAnswers[question.id],
            })),
        })
            .pipe(finalize(() => this.loadingFinalQuiz.set(false)))
            .subscribe(() => {
            this.finalQuizError.set('');
            this.loadCourse(courseId);
        });
    }
    downloadCertificate() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (!courseId || !this.canDownloadCertificate() || this.downloadingCertificate()) {
            return;
        }
        this.downloadingCertificate.set(true);
        this.coursesApi
            .downloadCertificate(courseId)
            .pipe(finalize(() => this.downloadingCertificate.set(false)))
            .subscribe((blob) => {
            const fileUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = fileUrl;
            anchor.download = `bunat-certificate-${courseId}.pdf`;
            anchor.click();
            URL.revokeObjectURL(fileUrl);
        });
    }
    contentTypeLabel(value) {
        return {
            article: 'مقال شرائحي',
            task: 'مهمة',
            video: 'فيديو',
            pdf: 'PDF',
            quiz: 'اختبار',
        }[value] || value;
    }
    objectId(item) {
        return item._id || item.id || '';
    }
    isActiveLesson(index) {
        const panel = this.activePanel();
        return panel.kind === 'lesson' && panel.index === index;
    }
    safeResourceUrl(value) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(value || 'about:blank');
    }
    requiredLessonsCompleted() {
        const requiredLessons = this.lessons().filter((lesson) => lesson.isRequired);
        return requiredLessons.every((lesson) => lesson.progress?.status === 'completed');
    }
    finalQuizCompletedIfRequired() {
        return !this.course()?.finalQuiz || !!this.course()?.finalQuizProgress?.passed;
    }
    resolveSlides(lesson) {
        if (lesson.slides?.length) {
            return lesson.slides;
        }
        if (lesson.contentType === 'video' || lesson.contentType === 'pdf') {
            return [
                {
                    id: `${this.objectId(lesson)}-intro`,
                    title: lesson.title,
                    body: lesson.contentType === 'video'
                        ? 'راجع هذه المقدمة ثم انتقل لعرض الفيديو مباشرة من داخل البطاقة.'
                        : 'راجع هذه المقدمة ثم افتح ملف PDF من داخل البطاقة.',
                    mediaUrl: null,
                    notes: null,
                },
                {
                    id: `${this.objectId(lesson)}-media`,
                    title: lesson.contentType === 'video' ? 'مشاهدة الفيديو' : 'عرض الملف',
                    body: lesson.contentHtml || 'يمكنك عرض المحتوى مباشرة هنا.',
                    mediaUrl: lesson.contentUrl || null,
                    notes: null,
                },
            ];
        }
        return [
            {
                id: `${this.objectId(lesson)}-fallback`,
                title: lesson.title,
                body: this.stripContent(lesson.contentHtml || 'تمت إضافة هذا الدرس بالمحتوى القديم وسيظهر هنا كشريحة واحدة.'),
                mediaUrl: lesson.contentUrl || null,
                notes: null,
            },
        ];
    }
    stripContent(value) {
        return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    loadCourse(id) {
        forkJoin({
            course: this.coursesApi.getCourse(id),
            lessons: this.coursesApi.getLessons(id),
        }).subscribe(({ course, lessons }) => {
            this.initializeLessonQuizAnswers(lessons);
            this.initializeFinalQuizAnswers(course);
            this.course.set(course);
            this.lessons.set(lessons);
        });
    }
    initializeLessonQuizAnswers(lessons) {
        const nextAnswers = { ...this.lessonQuizAnswers() };
        for (const lesson of lessons) {
            const lessonId = this.objectId(lesson);
            if (!lessonId || lesson.contentType !== 'quiz' || !lesson.quiz || nextAnswers[lessonId]) {
                continue;
            }
            nextAnswers[lessonId] = {};
        }
        this.lessonQuizAnswers.set(nextAnswers);
    }
    initializeFinalQuizAnswers(course) {
        if (!course.finalQuiz) {
            this.finalQuizAnswers.set({});
            return;
        }
        const nextAnswers = { ...this.finalQuizAnswers() };
        for (const question of course.finalQuiz.questions) {
            nextAnswers[question.id] = nextAnswers[question.id] || '';
        }
        this.finalQuizAnswers.set(nextAnswers);
    }
    static { this.ɵfac = function CourseDetailsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CourseDetailsComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CourseDetailsComponent, selectors: [["app-course-details"]], decls: 3, vars: 2, consts: [["loadingState", ""], ["lessonQuizStage", ""], ["finalExamStage", ""], ["fallbackStage", ""], ["class", "learning-shell", 4, "ngIf", "ngIfElse"], [1, "learning-shell"], [1, "learning-outline", "card"], [1, "section-title"], [1, "section-subtitle"], [1, "outline-list"], ["class", "outline-item", "type", "button", 3, "active", "click", 4, "ngFor", "ngForOf"], ["class", "outline-item", "type", "button", 3, "active", "disabled", "click", 4, "ngIf"], ["class", "certificate-box", 4, "ngIf"], ["class", "learning-stage card", 4, "ngIf", "ngIfElse"], ["type", "button", 1, "outline-item", 3, "click"], [1, "outline-status"], ["type", "button", 1, "outline-item", 3, "click", "disabled"], [1, "certificate-box"], ["type", "button", 1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "learning-stage", "card"], [1, "stage-header"], [1, "eyebrow"], [1, "status-chip", "info"], [4, "ngIf", "ngIfElse"], [1, "slide-progress"], ["class", "slide-card", 4, "ngIf"], [1, "stage-actions"], ["type", "button", 1, "btn", "btn-ghost", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-primary", 3, "click", "disabled"], [1, "slide-card"], [1, "slide-card__header"], [1, "slide-card__count"], [1, "slide-card__body"], ["class", "media-frame", 4, "ngIf"], ["class", "slide-card__notes", 4, "ngIf"], [1, "media-frame"], ["title", "lesson media", 3, "src", 4, "ngIf"], ["class", "btn btn-secondary", "target", "_blank", "rel", "noopener noreferrer", 3, "href", 4, "ngIf"], ["title", "lesson media", 3, "src"], ["target", "_blank", "rel", "noopener noreferrer", 1, "btn", "btn-secondary", 3, "href"], [1, "slide-card__notes"], ["class", "quiz-card", 4, "ngIf"], [1, "quiz-card"], [1, "quiz-progress"], [1, "quiz-stepper"], ["class", "quiz-step", 3, "active", "done", 4, "ngFor", "ngForOf"], ["class", "quiz-question-panel", 4, "ngIf"], ["class", "message-box error", 4, "ngIf"], ["class", "quiz-result", 4, "ngIf"], [1, "quiz-step"], [1, "quiz-question-panel"], ["class", "quiz-option-button", "type", "button", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "quiz-option-button", 3, "click"], [1, "message-box", "error"], [1, "quiz-result"], ["title", "\u0627\u062E\u062A\u0631 \u062F\u0631\u0633\u0627\u064B", "description", "\u0627\u0628\u062F\u0623 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062F\u0631\u0648\u0633 \u0641\u064A \u0627\u0644\u062C\u0647\u0629 \u0627\u0644\u064A\u0645\u0646\u0649."], ["title", "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062F\u0648\u0631\u0629", "description", "\u064A\u062A\u0645 \u062A\u062C\u0647\u064A\u0632 \u0627\u0644\u0634\u0631\u0627\u0626\u062D \u0648\u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u0622\u0646."]], template: function CourseDetailsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, CourseDetailsComponent_section_0_Template, 16, 7, "section", 4)(1, CourseDetailsComponent_ng_template_1_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const loadingState_r26 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", ctx.course())("ngIfElse", loadingState_r26);
        } }, dependencies: [CommonModule, i1.NgForOf, i1.NgIf, EmptyStateComponent], styles: [".learning-shell[_ngcontent-%COMP%] {\n        display: grid;\n        grid-template-columns: 320px minmax(0, 1fr);\n        gap: 1rem;\n        align-items: start;\n      }\n\n      .learning-outline[_ngcontent-%COMP%], \n   .learning-stage[_ngcontent-%COMP%] {\n        padding: 1.5rem;\n      }\n\n      .learning-outline[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n        position: sticky;\n        top: 1rem;\n      }\n\n      .outline-list[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.75rem;\n      }\n\n      .outline-item[_ngcontent-%COMP%], \n   .quiz-option-button[_ngcontent-%COMP%] {\n        width: 100%;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        color: inherit;\n        cursor: pointer;\n      }\n\n      .outline-item[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 0.95rem 1rem;\n        text-align: right;\n      }\n\n      .outline-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n        display: block;\n        font-size: 0.88rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .outline-item.active[_ngcontent-%COMP%] {\n        border-color: var(--color-primary-default);\n        background: var(--color-primary-soft);\n      }\n\n      .outline-item[_ngcontent-%COMP%]:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .outline-status[_ngcontent-%COMP%] {\n        white-space: nowrap;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .outline-status.success[_ngcontent-%COMP%] {\n        color: var(--color-success-700);\n      }\n\n      .certificate-box[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.65rem;\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.08), rgba(15, 76, 129, 0.08));\n        border: 1px solid rgba(20, 87, 58, 0.12);\n      }\n\n      .certificate-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .stage-header[_ngcontent-%COMP%], \n   .slide-progress[_ngcontent-%COMP%], \n   .stage-actions[_ngcontent-%COMP%], \n   .quiz-progress[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .eyebrow[_ngcontent-%COMP%] {\n        margin: 0 0 0.35rem;\n        color: var(--color-secondary-default);\n        font-weight: 700;\n      }\n\n      .stage-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n   .quiz-question-panel[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%], \n   .slide-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n        margin: 0;\n      }\n\n      .slide-card[_ngcontent-%COMP%], \n   .quiz-card[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 1rem;\n        padding: 1.25rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: 1.25rem;\n        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 248, 0.96));\n      }\n\n      .slide-progress[_ngcontent-%COMP%] {\n        margin: 1rem 0;\n      }\n\n      .slide-card__header[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .slide-card__count[_ngcontent-%COMP%] {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .slide-card__body[_ngcontent-%COMP%], \n   .slide-card__notes[_ngcontent-%COMP%] {\n        margin: 0;\n        white-space: pre-wrap;\n        line-height: 1.8;\n      }\n\n      .slide-card__notes[_ngcontent-%COMP%] {\n        padding-top: 0.75rem;\n        border-top: 1px dashed var(--color-neutral-200);\n        color: var(--color-secondary-paragraph);\n      }\n\n      .media-frame[_ngcontent-%COMP%] {\n        border-radius: 1rem;\n        overflow: hidden;\n        border: 1px solid var(--color-neutral-200);\n        background: #fff;\n      }\n\n      .media-frame[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%] {\n        width: 100%;\n        min-height: 360px;\n        border: 0;\n      }\n\n      .quiz-stepper[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 0.55rem;\n      }\n\n      .quiz-step[_ngcontent-%COMP%] {\n        width: 100%;\n        height: 8px;\n        border-radius: 999px;\n        background: var(--color-neutral-200);\n      }\n\n      .quiz-step.active[_ngcontent-%COMP%] {\n        background: var(--color-secondary-default);\n      }\n\n      .quiz-step.done[_ngcontent-%COMP%] {\n        background: var(--color-success-700);\n      }\n\n      .quiz-question-panel[_ngcontent-%COMP%] {\n        display: grid;\n        gap: 0.85rem;\n      }\n\n      .quiz-option-button[_ngcontent-%COMP%] {\n        padding: 1rem 1.1rem;\n        text-align: right;\n        transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;\n      }\n\n      .quiz-option-button.selected[_ngcontent-%COMP%] {\n        border-color: var(--color-secondary-default);\n        background: rgba(15, 76, 129, 0.08);\n        box-shadow: inset 0 0 0 1px rgba(15, 76, 129, 0.18);\n      }\n\n      .quiz-result[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n        flex-wrap: wrap;\n        padding: 0.95rem 1rem;\n        border-radius: 1rem;\n        background: rgba(20, 87, 58, 0.08);\n        color: var(--color-success-700);\n      }\n\n      .stage-actions[_ngcontent-%COMP%] {\n        margin-top: 0.5rem;\n      }\n\n      @media (max-width: 1080px) {\n        .learning-shell[_ngcontent-%COMP%] {\n          grid-template-columns: 1fr;\n        }\n\n        .learning-outline[_ngcontent-%COMP%] {\n          position: static;\n        }\n      }\n\n      @media (max-width: 720px) {\n        .stage-header[_ngcontent-%COMP%], \n   .slide-progress[_ngcontent-%COMP%], \n   .stage-actions[_ngcontent-%COMP%], \n   .quiz-progress[_ngcontent-%COMP%] {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CourseDetailsComponent, [{
        type: Component,
        args: [{ selector: 'app-course-details', standalone: true, imports: [CommonModule, EmptyStateComponent], template: `
    <section class="learning-shell" *ngIf="course(); else loadingState">
      <aside class="learning-outline card">
        <div>
          <h2 class="section-title">{{ course()?.title }}</h2>
          <p class="section-subtitle">{{ course()?.description }}</p>
        </div>

        <div class="outline-list">
          <button
            class="outline-item"
            *ngFor="let lesson of lessons(); let lessonIndex = index"
            type="button"
            [class.active]="isActiveLesson(lessonIndex)"
            (click)="selectLesson(lessonIndex)"
          >
            <div>
              <strong>{{ lesson.order }}. {{ lesson.title }}</strong>
              <span>{{ contentTypeLabel(lesson.contentType) }}</span>
            </div>
            <span class="outline-status" [class.success]="isLessonCompleted(lesson)">
              {{ isLessonCompleted(lesson) ? 'مكتمل' : 'قيد التنفيذ' }}
            </span>
          </button>

          <button
            *ngIf="course()?.finalQuiz"
            class="outline-item"
            type="button"
            [class.active]="activePanel().kind === 'final'"
            [disabled]="!canOpenFinalExam()"
            (click)="selectFinalExam()"
          >
            <div>
              <strong>الاختبار النهائي</strong>
              <span>{{ course()?.finalQuiz?.questions?.length || 0 }} أسئلة</span>
            </div>
            <span class="outline-status" [class.success]="course()?.finalQuizProgress?.passed">
              {{ course()?.finalQuizProgress?.passed ? 'تم الاجتياز' : canOpenFinalExam() ? 'متاح' : 'بعد الدروس' }}
            </span>
          </button>
        </div>

        <div class="certificate-box" *ngIf="course()?.certificateEnabled">
          <strong>شهادة الإتمام</strong>
          <p>تظهر بعد إتمام الدروس المطلوبة واجتياز الاختبار النهائي إن وجد.</p>
          <button class="btn btn-secondary" type="button" (click)="downloadCertificate()" [disabled]="!canDownloadCertificate() || downloadingCertificate()">
            {{
              downloadingCertificate()
                ? 'جارٍ التنزيل...'
                : canDownloadCertificate()
                  ? 'تحميل الشهادة'
                  : 'غير متاحة بعد'
            }}
          </button>
        </div>
      </aside>

      <article class="learning-stage card" *ngIf="activeLesson(); else finalExamStage">
        <div class="stage-header">
          <div>
            <p class="eyebrow">{{ contentTypeLabel(activeLesson()?.contentType || 'article') }}</p>
            <h3>{{ activeLesson()?.title }}</h3>
          </div>
          <span class="status-chip info">{{ activeLesson()?.durationMinutes }} دقيقة</span>
        </div>

        <ng-container *ngIf="activeLesson()?.contentType !== 'quiz'; else lessonQuizStage">
          <div class="slide-progress">
            <strong>الشريحة {{ activeSlideIndex() + 1 }}</strong>
            <span>من {{ activeSlides().length }}</span>
          </div>

          <section class="slide-card" *ngIf="activeSlides()[activeSlideIndex()] as slide">
            <div class="slide-card__header">
              <h4>{{ slide.title }}</h4>
              <span class="slide-card__count">{{ activeSlideIndex() + 1 }}/{{ activeSlides().length }}</span>
            </div>
            <p class="slide-card__body">{{ slide.body }}</p>

            <div class="media-frame" *ngIf="slide.mediaUrl">
              <iframe
                *ngIf="activeLesson()?.contentType === 'video' || activeLesson()?.contentType === 'pdf'"
                [src]="safeResourceUrl(slide.mediaUrl)"
                title="lesson media"
              ></iframe>
              <a *ngIf="activeLesson()?.contentType !== 'video' && activeLesson()?.contentType !== 'pdf'" class="btn btn-secondary" [href]="slide.mediaUrl" target="_blank" rel="noopener noreferrer">
                فتح الوسائط
              </a>
            </div>

            <div class="slide-card__notes" *ngIf="slide.notes">{{ slide.notes }}</div>
          </section>

          <div class="stage-actions">
            <button class="btn btn-ghost" type="button" (click)="goToPreviousSlide()" [disabled]="activeSlideIndex() === 0">
              السابق
            </button>
            <button class="btn btn-secondary" type="button" (click)="goToNextSlide()" [disabled]="activeSlideIndex() === activeSlides().length - 1">
              التالي
            </button>
            <button
              class="btn btn-primary"
              type="button"
              (click)="completeActiveLesson()"
              [disabled]="!canCompleteActiveLesson() || loadingLessonId() === objectId(activeLesson() || {})"
            >
              {{
                loadingLessonId() === objectId(activeLesson() || {})
                  ? 'جارٍ الحفظ...'
                  : isLessonCompleted(activeLesson() || null)
                    ? 'تم الإتمام'
                    : 'إتمام الدرس'
              }}
            </button>
          </div>
        </ng-container>
      </article>

      <ng-template #lessonQuizStage>
        <div class="stage-header">
          <div>
            <p class="eyebrow">اختبار الدرس</p>
            <h3>{{ activeLesson()?.title }}</h3>
          </div>
          <span class="status-chip info">
            {{ activeLesson()?.quiz?.questions?.length || 0 }} أسئلة
          </span>
        </div>

        <div class="quiz-card" *ngIf="activeLesson()?.quiz as quiz">
          <div class="quiz-progress">
            <span>السؤال {{ activeQuizQuestionIndex() + 1 }} من {{ quiz.questions.length }}</span>
            <span>الاجتياز {{ quiz.passingScorePercentage }}%</span>
          </div>

          <div class="quiz-stepper">
            <span
              class="quiz-step"
              *ngFor="let question of quiz.questions; let questionIndex = index"
              [class.active]="questionIndex === activeQuizQuestionIndex()"
              [class.done]="hasSelectedLessonAnswer(objectId(activeLesson() || {}), question.id)"
            ></span>
          </div>

          <section class="quiz-question-panel" *ngIf="quiz.questions[activeQuizQuestionIndex()] as question">
            <h4>{{ question.prompt }}</h4>
            <button
              class="quiz-option-button"
              *ngFor="let option of question.options"
              type="button"
              [class.selected]="selectedLessonAnswer(objectId(activeLesson() || {}), question.id) === option.id"
              (click)="selectLessonQuizAnswer(question.id, option.id)"
            >
              {{ option.text }}
            </button>
          </section>

          <div class="message-box error" *ngIf="quizError()">{{ quizError() }}</div>
          <div class="quiz-result" *ngIf="activeLesson()?.progress?.attemptCount">
            <strong>{{ activeLesson()?.progress?.quizPassed ? 'تم اجتياز الاختبار' : 'آخر نتيجة محفوظة' }}</strong>
            <span>النتيجة: {{ activeLesson()?.progress?.bestQuizScorePercentage || activeLesson()?.progress?.lastQuizScorePercentage || 0 }}%</span>
            <span>المحاولات: {{ activeLesson()?.progress?.attemptCount }}</span>
          </div>

          <div class="stage-actions">
            <button class="btn btn-ghost" type="button" (click)="goToPreviousQuizQuestion()" [disabled]="activeQuizQuestionIndex() === 0">
              السابق
            </button>
            <button
              class="btn btn-secondary"
              type="button"
              (click)="goToNextQuizQuestion(quiz)"
              [disabled]="activeQuizQuestionIndex() === quiz.questions.length - 1"
            >
              التالي
            </button>
            <button
              class="btn btn-primary"
              type="button"
              (click)="submitActiveLessonQuiz(quiz)"
              [disabled]="loadingLessonId() === objectId(activeLesson() || {}) || !!activeLesson()?.progress?.quizPassed"
            >
              {{
                activeLesson()?.progress?.quizPassed
                  ? 'تم الاجتياز'
                  : loadingLessonId() === objectId(activeLesson() || {})
                    ? 'جارٍ التصحيح...'
                    : 'إرسال الاختبار'
              }}
            </button>
          </div>
        </div>
      </ng-template>

      <ng-template #finalExamStage>
        <article class="learning-stage card" *ngIf="course()?.finalQuiz as finalQuiz; else fallbackStage">
          <div class="stage-header">
            <div>
              <p class="eyebrow">الاختبار النهائي</p>
              <h3>{{ course()?.title }}</h3>
            </div>
            <span class="status-chip info">{{ finalQuiz.questions.length }} أسئلة</span>
          </div>

          <div class="quiz-card">
            <div class="quiz-progress">
              <span>السؤال {{ activeFinalQuizQuestionIndex() + 1 }} من {{ finalQuiz.questions.length }}</span>
              <span>الاجتياز {{ finalQuiz.passingScorePercentage }}%</span>
            </div>

            <div class="quiz-stepper">
              <span
                class="quiz-step"
                *ngFor="let question of finalQuiz.questions; let questionIndex = index"
                [class.active]="questionIndex === activeFinalQuizQuestionIndex()"
                [class.done]="hasSelectedFinalAnswer(question.id)"
              ></span>
            </div>

            <section class="quiz-question-panel" *ngIf="finalQuiz.questions[activeFinalQuizQuestionIndex()] as question">
              <h4>{{ question.prompt }}</h4>
              <button
                class="quiz-option-button"
                *ngFor="let option of question.options"
                type="button"
                [class.selected]="selectedFinalAnswer(question.id) === option.id"
                (click)="selectFinalQuizAnswer(question.id, option.id)"
              >
                {{ option.text }}
              </button>
            </section>

            <div class="message-box error" *ngIf="finalQuizError()">{{ finalQuizError() }}</div>
            <div class="quiz-result" *ngIf="course()?.finalQuizProgress?.attemptCount">
              <strong>{{ course()?.finalQuizProgress?.passed ? 'تم اجتياز الاختبار النهائي' : 'آخر نتيجة محفوظة' }}</strong>
              <span>النتيجة: {{ course()?.finalQuizProgress?.bestScorePercentage || course()?.finalQuizProgress?.lastScorePercentage || 0 }}%</span>
              <span>المحاولات: {{ course()?.finalQuizProgress?.attemptCount }}</span>
            </div>

            <div class="stage-actions">
              <button class="btn btn-ghost" type="button" (click)="goToPreviousFinalQuizQuestion()" [disabled]="activeFinalQuizQuestionIndex() === 0">
                السابق
              </button>
              <button
                class="btn btn-secondary"
                type="button"
                (click)="goToNextFinalQuizQuestion(finalQuiz)"
                [disabled]="activeFinalQuizQuestionIndex() === finalQuiz.questions.length - 1"
              >
                التالي
              </button>
              <button
                class="btn btn-primary"
                type="button"
                (click)="submitFinalQuiz(finalQuiz)"
                [disabled]="loadingFinalQuiz() || !!course()?.finalQuizProgress?.passed"
              >
                {{
                  course()?.finalQuizProgress?.passed
                    ? 'تم الاجتياز'
                    : loadingFinalQuiz()
                      ? 'جارٍ التصحيح...'
                      : 'إرسال الاختبار النهائي'
                }}
              </button>
            </div>
          </div>
        </article>

        <ng-template #fallbackStage>
          <article class="learning-stage card">
            <app-empty-state title="اختر درساً" description="ابدأ من قائمة الدروس في الجهة اليمنى." />
          </article>
        </ng-template>
      </ng-template>
    </section>

    <ng-template #loadingState>
      <app-empty-state title="جارٍ تحميل الدورة" description="يتم تجهيز الشرائح والاختبارات الآن." />
    </ng-template>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n      .learning-shell {\n        display: grid;\n        grid-template-columns: 320px minmax(0, 1fr);\n        gap: 1rem;\n        align-items: start;\n      }\n\n      .learning-outline,\n      .learning-stage {\n        padding: 1.5rem;\n      }\n\n      .learning-outline {\n        display: grid;\n        gap: 1rem;\n        position: sticky;\n        top: 1rem;\n      }\n\n      .outline-list {\n        display: grid;\n        gap: 0.75rem;\n      }\n\n      .outline-item,\n      .quiz-option-button {\n        width: 100%;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: var(--radius-sm);\n        background: var(--color-neutral-50);\n        color: inherit;\n        cursor: pointer;\n      }\n\n      .outline-item {\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n        gap: 1rem;\n        padding: 0.95rem 1rem;\n        text-align: right;\n      }\n\n      .outline-item span {\n        display: block;\n        font-size: 0.88rem;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .outline-item.active {\n        border-color: var(--color-primary-default);\n        background: var(--color-primary-soft);\n      }\n\n      .outline-item:disabled {\n        opacity: 0.6;\n        cursor: not-allowed;\n      }\n\n      .outline-status {\n        white-space: nowrap;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .outline-status.success {\n        color: var(--color-success-700);\n      }\n\n      .certificate-box {\n        display: grid;\n        gap: 0.65rem;\n        padding: 1rem;\n        border-radius: var(--radius-sm);\n        background: linear-gradient(135deg, rgba(20, 87, 58, 0.08), rgba(15, 76, 129, 0.08));\n        border: 1px solid rgba(20, 87, 58, 0.12);\n      }\n\n      .certificate-box p {\n        margin: 0;\n        color: var(--color-secondary-paragraph);\n      }\n\n      .stage-header,\n      .slide-progress,\n      .stage-actions,\n      .quiz-progress {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .eyebrow {\n        margin: 0 0 0.35rem;\n        color: var(--color-secondary-default);\n        font-weight: 700;\n      }\n\n      .stage-header h3,\n      .quiz-question-panel h4,\n      .slide-card h4 {\n        margin: 0;\n      }\n\n      .slide-card,\n      .quiz-card {\n        display: grid;\n        gap: 1rem;\n        padding: 1.25rem;\n        border: 1px solid var(--color-neutral-200);\n        border-radius: 1.25rem;\n        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 248, 0.96));\n      }\n\n      .slide-progress {\n        margin: 1rem 0;\n      }\n\n      .slide-card__header {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        gap: 1rem;\n      }\n\n      .slide-card__count {\n        color: var(--color-secondary-paragraph);\n      }\n\n      .slide-card__body,\n      .slide-card__notes {\n        margin: 0;\n        white-space: pre-wrap;\n        line-height: 1.8;\n      }\n\n      .slide-card__notes {\n        padding-top: 0.75rem;\n        border-top: 1px dashed var(--color-neutral-200);\n        color: var(--color-secondary-paragraph);\n      }\n\n      .media-frame {\n        border-radius: 1rem;\n        overflow: hidden;\n        border: 1px solid var(--color-neutral-200);\n        background: #fff;\n      }\n\n      .media-frame iframe {\n        width: 100%;\n        min-height: 360px;\n        border: 0;\n      }\n\n      .quiz-stepper {\n        display: flex;\n        align-items: center;\n        gap: 0.55rem;\n      }\n\n      .quiz-step {\n        width: 100%;\n        height: 8px;\n        border-radius: 999px;\n        background: var(--color-neutral-200);\n      }\n\n      .quiz-step.active {\n        background: var(--color-secondary-default);\n      }\n\n      .quiz-step.done {\n        background: var(--color-success-700);\n      }\n\n      .quiz-question-panel {\n        display: grid;\n        gap: 0.85rem;\n      }\n\n      .quiz-option-button {\n        padding: 1rem 1.1rem;\n        text-align: right;\n        transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;\n      }\n\n      .quiz-option-button.selected {\n        border-color: var(--color-secondary-default);\n        background: rgba(15, 76, 129, 0.08);\n        box-shadow: inset 0 0 0 1px rgba(15, 76, 129, 0.18);\n      }\n\n      .quiz-result {\n        display: flex;\n        align-items: center;\n        gap: 1rem;\n        flex-wrap: wrap;\n        padding: 0.95rem 1rem;\n        border-radius: 1rem;\n        background: rgba(20, 87, 58, 0.08);\n        color: var(--color-success-700);\n      }\n\n      .stage-actions {\n        margin-top: 0.5rem;\n      }\n\n      @media (max-width: 1080px) {\n        .learning-shell {\n          grid-template-columns: 1fr;\n        }\n\n        .learning-outline {\n          position: static;\n        }\n      }\n\n      @media (max-width: 720px) {\n        .stage-header,\n        .slide-progress,\n        .stage-actions,\n        .quiz-progress {\n          flex-direction: column;\n          align-items: stretch;\n        }\n      }\n    "] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CourseDetailsComponent, { className: "CourseDetailsComponent", filePath: "src/app/features/employee/pages/course-details.component.ts", lineNumber: 530 }); })();
//# sourceMappingURL=course-details.component.js.map