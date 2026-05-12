import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { DialogComponent, EmptyStateComponent, IconComponent } from '../../../shared/components';
import { Course, Lesson } from '../../../core/models/domain.models';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import {
  clearControlState,
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

function lessonContentValidator(control: AbstractControl): ValidationErrors | null {
  const contentType = control.get('contentType')?.value as Lesson['contentType'] | undefined;
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

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmptyStateComponent, DialogComponent, IconComponent],
  template: `
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
  `,
  styles: [
    `
      .panel {
        padding: 1.5rem;
      }

      .lesson-list {
        display: grid;
        gap: 1rem;
      }

      .lesson-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-neutral-200);
      }

      .lesson-card p {
        margin: 0.35rem 0 0;
        color: var(--color-secondary-paragraph);
      }

      .lesson-card__body {
        min-width: 0;
      }

      .lesson-card__meta {
        font-size: 0.92rem;
      }

      .lesson-card__content {
        margin: 0.85rem 0 0;
        padding: 0.85rem;
        white-space: pre-wrap;
        border-radius: var(--radius-sm);
        background: var(--color-neutral-50);
        border: 1px solid var(--color-neutral-200);
        color: var(--color-primary-text);
        font-family: inherit;
      }

      .lesson-card__meta.status {
        color: var(--color-success-700);
      }

      .quiz-panel {
        margin-top: 1rem;
        display: grid;
        gap: 0.85rem;
      }

      .quiz-panel__summary {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        color: var(--color-secondary-paragraph);
        font-size: 0.92rem;
      }

      .quiz-question {
        display: grid;
        gap: 0.55rem;
        padding: 0.9rem;
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--radius-sm);
        background: var(--color-neutral-50);
      }

      .quiz-option {
        display: flex;
        align-items: flex-start;
        gap: 0.55rem;
        color: var(--color-primary-text);
      }

      .lesson-card__actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .field--full {
        grid-column: 1 / -1;
      }

      .field-help {
        margin-top: 0.45rem;
        font-size: 0.9rem;
        color: var(--color-secondary-paragraph);
      }

      @media (max-width: 720px) {
        .lesson-card {
          flex-direction: column;
          align-items: stretch;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly coursesApi = inject(CoursesApiService);

  protected readonly lessonDialog = viewChild.required<DialogComponent>('lessonDialog');
  protected readonly course = signal<Course | null>(null);
  protected readonly lessons = signal<Lesson[]>([]);
  protected readonly loadingLessonId = signal('');
  protected readonly savingLesson = signal(false);
  protected readonly uploadedLessonFileName = signal('');
  protected readonly quizAnswers = signal<Record<string, Record<string, string>>>({});
  protected readonly quizErrors = signal<Record<string, string>>({});
  protected readonly readOnlyLessons = computed(() => !!this.route.snapshot.data['readOnlyLessons']);
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly lessonValidationMessages = {
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
  protected readonly lessonForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    contentType: ['article', Validators.required],
    order: [1, [Validators.required, Validators.min(1)]],
    durationMinutes: [10, [Validators.required, Validators.min(1)]],
    contentUrl: [''],
    contentHtml: [''],
    isRequired: [true],
  }, { validators: lessonContentValidator });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.loadCourse(id);
  }

  protected complete(lesson: Lesson) {
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

  protected selectQuizAnswer(lessonId: string, questionId: string, optionId: string) {
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

  protected selectedQuizAnswer(lessonId: string, questionId: string) {
    return this.quizAnswers()[lessonId]?.[questionId] || '';
  }

  protected quizLocked(lesson: Lesson) {
    const lessonId = this.objectId(lesson);
    return !lessonId || !!lesson.progress?.quizPassed || this.loadingLessonId() === lessonId;
  }

  protected submitQuiz(lesson: Lesson) {
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

  protected openLessonDialog() {
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

  protected closeLessonDialog() {
    this.uploadedLessonFileName.set('');
    this.lessonDialog().close();
  }

  protected submitLesson() {
    if (this.lessonForm.invalid || this.savingLesson()) {
      touchAllControls(this.lessonForm);
      return;
    }

    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      return;
    }

    const formValue = this.lessonForm.getRawValue();
    const payload: Partial<Lesson> & {
      courseId: string;
      title: string;
      contentType: Lesson['contentType'];
    } = {
      title: formValue.title.trim(),
      courseId,
      contentType: formValue.contentType as Lesson['contentType'],
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

  protected lessonUsesTextContent() {
    return this.lessonForm.controls.contentType.value !== 'video' && this.lessonForm.controls.contentType.value !== 'pdf';
  }

  protected lessonUrlHelpText() {
    return this.lessonUsesTextContent()
      ? 'اختياري إذا كتبت نص المحتوى، ومطلوب إذا كنت تريد فتح ملف أو رابط خارجي.'
      : 'مطلوب لهذا النوع. يمكنك لصق رابط مباشر أو اختيار ملف من جهازك.';
  }

  protected hasLessonContentError() {
    const { contentType, contentUrl, contentHtml } = this.lessonForm.controls;
    return this.lessonForm.hasError('contentMissing') && (contentType.touched || contentUrl.touched || contentHtml.touched);
  }

  protected lessonContentErrorMessage() {
    return this.lessonUsesTextContent()
      ? 'أضف نص المحتوى أو رابطاً أو ملفاً للدرس.'
      : 'أضف رابط المحتوى أو ارفع ملفاً لهذا الدرس.';
  }

  protected onLessonFileSelected(event: Event) {
    const input = event.target as HTMLInputElement | null;
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
      } else {
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

  protected objectId(item: { _id?: string; id?: string }) {
    return item._id || item.id || '';
  }

  protected contentTypeLabel(value: Lesson['contentType']) {
    return {
      video: 'فيديو',
      article: 'مقال',
      pdf: 'PDF',
      quiz: 'اختبار',
      task: 'مهمة',
    }[value] || value;
  }

  protected difficultyLabel(value: string) {
    return {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    }[value] || value;
  }

  private loadCourse(id: string) {
    forkJoin({
      course: this.coursesApi.getCourse(id),
      lessons: this.coursesApi.getLessons(id),
    }).subscribe(({ course, lessons }) => {
      this.initializeQuizAnswers(lessons);
      this.course.set(course);
      this.lessons.set(lessons);
    });
  }

  private initializeQuizAnswers(lessons: Lesson[]) {
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
}
