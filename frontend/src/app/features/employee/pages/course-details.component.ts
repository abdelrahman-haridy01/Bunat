import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { Course, Lesson, LessonQuiz, LessonSlide } from '../../../core/models/domain.models';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { EmptyStateComponent } from '../../../shared/components';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
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
  `,
  styles: [
    `
      .learning-shell {
        display: grid;
        grid-template-columns: 320px minmax(0, 1fr);
        gap: 1rem;
        align-items: start;
      }

      .learning-outline,
      .learning-stage {
        padding: 1.5rem;
      }

      .learning-outline {
        display: grid;
        gap: 1rem;
        position: sticky;
        top: 1rem;
      }

      .outline-list {
        display: grid;
        gap: 0.75rem;
      }

      .outline-item,
      .quiz-option-button {
        width: 100%;
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--radius-sm);
        background: var(--color-neutral-50);
        color: inherit;
        cursor: pointer;
      }

      .outline-item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.95rem 1rem;
        text-align: right;
      }

      .outline-item span {
        display: block;
        font-size: 0.88rem;
        color: var(--color-secondary-paragraph);
      }

      .outline-item.active {
        border-color: var(--color-primary-default);
        background: var(--color-primary-soft);
      }

      .outline-item:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .outline-status {
        white-space: nowrap;
        color: var(--color-secondary-paragraph);
      }

      .outline-status.success {
        color: var(--color-success-700);
      }

      .certificate-box {
        display: grid;
        gap: 0.65rem;
        padding: 1rem;
        border-radius: var(--radius-sm);
        background: linear-gradient(135deg, rgba(20, 87, 58, 0.08), rgba(15, 76, 129, 0.08));
        border: 1px solid rgba(20, 87, 58, 0.12);
      }

      .certificate-box p {
        margin: 0;
        color: var(--color-secondary-paragraph);
      }

      .stage-header,
      .slide-progress,
      .stage-actions,
      .quiz-progress {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .eyebrow {
        margin: 0 0 0.35rem;
        color: var(--color-secondary-default);
        font-weight: 700;
      }

      .stage-header h3,
      .quiz-question-panel h4,
      .slide-card h4 {
        margin: 0;
      }

      .slide-card,
      .quiz-card {
        display: grid;
        gap: 1rem;
        padding: 1.25rem;
        border: 1px solid var(--color-neutral-200);
        border-radius: 1.25rem;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 248, 0.96));
      }

      .slide-progress {
        margin: 1rem 0;
      }

      .slide-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }

      .slide-card__count {
        color: var(--color-secondary-paragraph);
      }

      .slide-card__body,
      .slide-card__notes {
        margin: 0;
        white-space: pre-wrap;
        line-height: 1.8;
      }

      .slide-card__notes {
        padding-top: 0.75rem;
        border-top: 1px dashed var(--color-neutral-200);
        color: var(--color-secondary-paragraph);
      }

      .media-frame {
        border-radius: 1rem;
        overflow: hidden;
        border: 1px solid var(--color-neutral-200);
        background: #fff;
      }

      .media-frame iframe {
        width: 100%;
        min-height: 360px;
        border: 0;
      }

      .quiz-stepper {
        display: flex;
        align-items: center;
        gap: 0.55rem;
      }

      .quiz-step {
        width: 100%;
        height: 8px;
        border-radius: 999px;
        background: var(--color-neutral-200);
      }

      .quiz-step.active {
        background: var(--color-secondary-default);
      }

      .quiz-step.done {
        background: var(--color-success-700);
      }

      .quiz-question-panel {
        display: grid;
        gap: 0.85rem;
      }

      .quiz-option-button {
        padding: 1rem 1.1rem;
        text-align: right;
        transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
      }

      .quiz-option-button.selected {
        border-color: var(--color-secondary-default);
        background: rgba(15, 76, 129, 0.08);
        box-shadow: inset 0 0 0 1px rgba(15, 76, 129, 0.18);
      }

      .quiz-result {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
        padding: 0.95rem 1rem;
        border-radius: 1rem;
        background: rgba(20, 87, 58, 0.08);
        color: var(--color-success-700);
      }

      .stage-actions {
        margin-top: 0.5rem;
      }

      @media (max-width: 1080px) {
        .learning-shell {
          grid-template-columns: 1fr;
        }

        .learning-outline {
          position: static;
        }
      }

      @media (max-width: 720px) {
        .stage-header,
        .slide-progress,
        .stage-actions,
        .quiz-progress {
          flex-direction: column;
          align-items: stretch;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly course = signal<Course | null>(null);
  protected readonly lessons = signal<Lesson[]>([]);
  protected readonly activePanel = signal<{ kind: 'lesson'; index: number } | { kind: 'final' }>({
    kind: 'lesson',
    index: 0,
  });
  protected readonly activeSlideIndex = signal(0);
  protected readonly activeQuizQuestionIndex = signal(0);
  protected readonly activeFinalQuizQuestionIndex = signal(0);
  protected readonly lessonQuizAnswers = signal<Record<string, Record<string, string>>>({});
  protected readonly finalQuizAnswers = signal<Record<string, string>>({});
  protected readonly quizError = signal('');
  protected readonly finalQuizError = signal('');
  protected readonly loadingLessonId = signal('');
  protected readonly loadingFinalQuiz = signal(false);
  protected readonly downloadingCertificate = signal(false);
  protected readonly activeLesson = computed(() => {
    const panel = this.activePanel();
    return panel.kind === 'lesson' ? this.lessons()[panel.index] || null : null;
  });
  protected readonly activeSlides = computed(() => {
    const lesson = this.activeLesson();
    return lesson ? this.resolveSlides(lesson) : [];
  });
  protected readonly canOpenFinalExam = computed(() => this.requiredLessonsCompleted());
  protected readonly canDownloadCertificate = computed(() => {
    const currentCourse = this.course();
    return !!currentCourse?.certificateEnabled && this.requiredLessonsCompleted() && this.finalQuizCompletedIfRequired();
  });

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(courseId);
    }
  }

  protected selectLesson(index: number) {
    this.activePanel.set({ kind: 'lesson', index });
    this.activeSlideIndex.set(0);
    this.activeQuizQuestionIndex.set(0);
    this.quizError.set('');
  }

  protected selectFinalExam() {
    if (!this.canOpenFinalExam()) {
      return;
    }

    this.activePanel.set({ kind: 'final' });
    this.activeFinalQuizQuestionIndex.set(0);
    this.finalQuizError.set('');
  }

  protected goToPreviousSlide() {
    this.activeSlideIndex.update((index) => Math.max(0, index - 1));
  }

  protected goToNextSlide() {
    this.activeSlideIndex.update((index) => Math.min(this.activeSlides().length - 1, index + 1));
  }

  protected canCompleteActiveLesson() {
    const lesson = this.activeLesson();
    return !!lesson && lesson.contentType !== 'quiz' && this.activeSlideIndex() === this.activeSlides().length - 1;
  }

  protected completeActiveLesson() {
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

  protected isLessonCompleted(lesson: Lesson | null) {
    return lesson?.progress?.status === 'completed';
  }

  protected selectLessonQuizAnswer(questionId: string, optionId: string) {
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

  protected selectedLessonAnswer(lessonId: string, questionId: string) {
    return this.lessonQuizAnswers()[lessonId]?.[questionId] || '';
  }

  protected hasSelectedLessonAnswer(lessonId: string, questionId: string) {
    return !!this.selectedLessonAnswer(lessonId, questionId);
  }

  protected goToPreviousQuizQuestion() {
    this.activeQuizQuestionIndex.update((index) => Math.max(0, index - 1));
  }

  protected goToNextQuizQuestion(quiz: LessonQuiz) {
    this.activeQuizQuestionIndex.update((index) => Math.min(quiz.questions.length - 1, index + 1));
  }

  protected submitActiveLessonQuiz(quiz: LessonQuiz) {
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

  protected selectFinalQuizAnswer(questionId: string, optionId: string) {
    this.finalQuizAnswers.update((answers) => ({
      ...answers,
      [questionId]: optionId,
    }));
    this.finalQuizError.set('');
  }

  protected selectedFinalAnswer(questionId: string) {
    return this.finalQuizAnswers()[questionId] || '';
  }

  protected hasSelectedFinalAnswer(questionId: string) {
    return !!this.selectedFinalAnswer(questionId);
  }

  protected goToPreviousFinalQuizQuestion() {
    this.activeFinalQuizQuestionIndex.update((index) => Math.max(0, index - 1));
  }

  protected goToNextFinalQuizQuestion(quiz: LessonQuiz) {
    this.activeFinalQuizQuestionIndex.update((index) => Math.min(quiz.questions.length - 1, index + 1));
  }

  protected submitFinalQuiz(quiz: LessonQuiz) {
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

  protected downloadCertificate() {
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

  protected contentTypeLabel(value: Lesson['contentType']) {
    return {
      article: 'مقال شرائحي',
      task: 'مهمة',
      video: 'فيديو',
      pdf: 'PDF',
      quiz: 'اختبار',
    }[value] || value;
  }

  protected objectId(item: { _id?: string; id?: string }) {
    return item._id || item.id || '';
  }

  protected isActiveLesson(index: number) {
    const panel = this.activePanel();
    return panel.kind === 'lesson' && panel.index === index;
  }

  protected safeResourceUrl(value?: string | null): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value || 'about:blank');
  }

  private requiredLessonsCompleted() {
    const requiredLessons = this.lessons().filter((lesson) => lesson.isRequired);
    return requiredLessons.every((lesson) => lesson.progress?.status === 'completed');
  }

  private finalQuizCompletedIfRequired() {
    return !this.course()?.finalQuiz || !!this.course()?.finalQuizProgress?.passed;
  }

  private resolveSlides(lesson: Lesson): LessonSlide[] {
    if (lesson.slides?.length) {
      return lesson.slides;
    }

    if (lesson.contentType === 'video' || lesson.contentType === 'pdf') {
      return [
        {
          id: `${this.objectId(lesson)}-intro`,
          title: lesson.title,
          body:
            lesson.contentType === 'video'
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

  private stripContent(value: string) {
    return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  private loadCourse(id: string) {
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

  private initializeLessonQuizAnswers(lessons: Lesson[]) {
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

  private initializeFinalQuizAnswers(course: Course) {
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
}
