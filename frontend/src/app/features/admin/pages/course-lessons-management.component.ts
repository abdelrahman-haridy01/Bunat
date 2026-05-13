import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { Course, Lesson, LessonQuiz, LessonSlide } from '../../../core/models/domain.models';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { DialogComponent, EmptyStateComponent, IconComponent } from '../../../shared/components';
import {
  clearControlState,
  getVisibleErrorMessage,
  hasVisibleError,
  touchAllControls,
} from '../../../shared/utils/form-validation';

type EditableSlide = LessonSlide;
type EditableQuizOption = { id: string; text: string };
type EditableQuizQuestion = {
  id: string;
  prompt: string;
  options: EditableQuizOption[];
  correctOptionId: string;
};

@Component({
  selector: 'app-course-lessons-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogComponent, EmptyStateComponent, IconComponent],
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
  `,
  styles: [
    `
      .panel {
        padding: 1.5rem;
      }

      .summary-strip {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1rem;
        margin-bottom: 1.25rem;
      }

      .summary-item,
      .final-exam-card,
      .slide-preview,
      .builder__header,
      .builder-card {
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--radius-sm);
        background: var(--color-neutral-50);
      }

      .summary-item {
        padding: 1rem;
      }

      .summary-item strong {
        display: block;
        font-size: 1.2rem;
      }

      .summary-item span,
      .field-help,
      .lesson-card__meta,
      .final-exam-card p,
      .slide-preview p {
        color: var(--color-secondary-paragraph);
      }

      .final-exam-card,
      .lesson-card,
      .builder__header,
      .builder-card__header,
      .quiz-option-card {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .final-exam-card {
        padding: 1rem;
        margin-bottom: 1rem;
      }

      .lesson-list,
      .builder {
        display: grid;
        gap: 1rem;
      }

      .lesson-card {
        padding: 1rem;
        border: 1px solid var(--color-neutral-200);
        border-radius: var(--radius-sm);
      }

      .lesson-card__body {
        flex: 1;
        min-width: 0;
      }

      .lesson-card__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .lesson-card p {
        margin: 0.35rem 0 0;
      }

      .slide-preview {
        margin-top: 0.9rem;
        padding: 0.9rem;
      }

      .slide-preview strong {
        display: block;
        margin-bottom: 0.35rem;
      }

      .lesson-card__actions,
      .builder-card__actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .checkbox-field {
        display: flex;
        align-items: center;
        gap: 0.65rem;
      }

      .field--full {
        grid-column: 1 / -1;
      }

      .builder__header,
      .builder-card {
        padding: 1rem;
      }

      .builder-card {
        display: grid;
      }

      .quiz-card {
        gap: 0.9rem;
      }

      .quiz-option-card {
        align-items: center;
      }

      .quiz-option-card input:first-child {
        flex: 1;
      }

      .quiz-option-card__correct {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        white-space: nowrap;
      }

      .quiz-metrics {
        display: flex;
        align-items: center;
        gap: 0.65rem;
      }

      .quiz-metrics input {
        width: 88px;
      }

      .builder__footer {
        display: flex;
        justify-content: flex-start;
      }

      .status-chip.muted {
        background: var(--color-neutral-100);
        color: var(--color-secondary-paragraph);
      }

      @media (max-width: 860px) {
        .summary-strip {
          grid-template-columns: 1fr 1fr;
        }

        .final-exam-card,
        .lesson-card,
        .lesson-card__header,
        .builder__header,
        .builder-card__header,
        .quiz-option-card {
          flex-direction: column;
          align-items: stretch;
        }
      }

      @media (max-width: 640px) {
        .summary-strip {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseLessonsManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly coursesApi = inject(CoursesApiService);

  protected readonly lessonDialog = viewChild.required<DialogComponent>('lessonDialog');
  protected readonly finalExamDialog = viewChild.required<DialogComponent>('finalExamDialog');
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly course = signal<Course | null>(null);
  protected readonly lessons = signal<Lesson[]>([]);
  protected readonly editingLesson = signal<Lesson | null>(null);
  protected readonly deletingLesson = signal<Lesson | null>(null);
  protected readonly savingLesson = signal(false);
  protected readonly savingFinalQuiz = signal(false);
  protected readonly deletingLessonInFlight = signal(false);
  protected readonly slides = signal<EditableSlide[]>([]);
  protected readonly slidesValidationError = signal('');
  protected readonly legacyConversionNotice = signal('');
  protected readonly quizQuestions = signal<EditableQuizQuestion[]>([]);
  protected readonly quizPassingScore = signal(70);
  protected readonly quizValidationError = signal('');
  protected readonly finalQuizQuestions = signal<EditableQuizQuestion[]>([]);
  protected readonly finalQuizPassingScore = signal(70);
  protected readonly finalQuizValidationError = signal('');
  protected readonly isEditMode = computed(() => !!this.editingLesson());
  protected readonly requiredLessonsCount = computed(() => this.lessons().filter((lesson) => lesson.isRequired).length);
  protected readonly totalDurationMinutes = computed(() =>
    this.lessons().reduce((total, lesson) => total + lesson.durationMinutes, 0),
  );
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly lessonValidationMessages = {
    title: { required: 'أدخل عنوان الدرس.' },
    order: { required: 'أدخل ترتيب الدرس.' },
    durationMinutes: { required: 'أدخل مدة الدرس.' },
  };

  protected readonly lessonForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    contentType: ['article' as Lesson['contentType'], Validators.required],
    order: [1, [Validators.required, Validators.min(1)]],
    durationMinutes: [10, [Validators.required, Validators.min(1)]],
    isRequired: [true],
  });

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadData(courseId);
    }
  }

  protected openCreateLessonDialog() {
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

  protected openEditLessonDialog(lesson: Lesson) {
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
    } else {
      const { slides, notice } = this.buildEditableSlidesFromLesson(lesson);
      this.slides.set(slides);
      this.resetQuizBuilder();
      this.legacyConversionNotice.set(notice);
    }

    clearControlState(this.lessonForm);
    this.lessonDialog().open();
  }

  protected closeLessonDialog() {
    this.editingLesson.set(null);
    this.lessonDialog().close();
  }

  protected openFinalExamDialog() {
    this.loadFinalQuizBuilder(this.course()?.finalQuiz || null);
    this.finalExamDialog().open();
  }

  protected closeFinalExamDialog() {
    this.finalExamDialog().close();
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
    const isQuiz = this.isQuizContentType();
    const quiz = isQuiz ? this.buildQuizPayload(this.quizQuestions(), this.quizPassingScore(), this.quizValidationError) : null;
    const slides = isQuiz ? [] : this.buildSlidesPayload();
    if ((isQuiz && !quiz) || (!isQuiz && !slides)) {
      return;
    }

    const payload: Partial<Lesson> & { courseId: string; title: string; contentType: Lesson['contentType'] } = {
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

  protected saveFinalQuiz() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId || this.savingFinalQuiz()) {
      return;
    }

    const finalQuiz = this.buildQuizPayload(
      this.finalQuizQuestions(),
      this.finalQuizPassingScore(),
      this.finalQuizValidationError,
    );
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

  protected removeFinalQuiz() {
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

  protected openDeleteLessonDialog(lesson: Lesson) {
    this.deletingLesson.set(lesson);
    this.deleteDialog().open();
  }

  protected closeDeleteLessonDialog() {
    this.deletingLesson.set(null);
    this.deleteDialog().close();
  }

  protected confirmDeleteLesson() {
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

  protected isQuizContentType() {
    return this.lessonForm.controls.contentType.value === 'quiz';
  }

  protected addSlide() {
    this.slides.update((currentSlides) => [...currentSlides, this.createEmptySlide()]);
    this.slidesValidationError.set('');
  }

  protected removeSlide(slideIndex: number) {
    this.slides.update((currentSlides) =>
      currentSlides.length === 1 ? currentSlides : currentSlides.filter((_, index) => index !== slideIndex),
    );
  }

  protected moveSlide(slideIndex: number, direction: -1 | 1) {
    this.slides.update((currentSlides) => this.moveItem(currentSlides, slideIndex, direction));
  }

  protected updateSlideField(slideIndex: number, key: keyof EditableSlide, event: Event) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | null)?.value || '';
    this.slides.update((currentSlides) =>
      currentSlides.map((slide, index) =>
        index === slideIndex
          ? {
              ...slide,
              [key]: value,
            }
          : slide,
      ),
    );
    this.slidesValidationError.set('');
  }

  protected addQuizQuestion() {
    this.quizQuestions.update((questions) => [...questions, this.createEmptyQuizQuestion()]);
    this.quizValidationError.set('');
  }

  protected removeQuizQuestion(questionIndex: number) {
    this.quizQuestions.update((questions) =>
      questions.length === 1 ? questions : questions.filter((_, index) => index !== questionIndex),
    );
  }

  protected moveQuizQuestion(questionIndex: number, direction: -1 | 1) {
    this.quizQuestions.update((questions) => this.moveItem(questions, questionIndex, direction));
  }

  protected updateQuizQuestionPrompt(questionIndex: number, event: Event) {
    const value = (event.target as HTMLInputElement | null)?.value || '';
    this.quizQuestions.update((questions) =>
      questions.map((question, index) => (index === questionIndex ? { ...question, prompt: value } : question)),
    );
    this.quizValidationError.set('');
  }

  protected addQuizOption(questionIndex: number) {
    this.quizQuestions.update((questions) =>
      questions.map((question, index) =>
        index === questionIndex ? { ...question, options: [...question.options, this.createEmptyQuizOption()] } : question,
      ),
    );
  }

  protected removeQuizOption(questionIndex: number, optionIndex: number) {
    this.quizQuestions.update((questions) =>
      questions.map((question, index) => {
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
      }),
    );
  }

  protected updateQuizOptionText(questionIndex: number, optionIndex: number, event: Event) {
    const value = (event.target as HTMLInputElement | null)?.value || '';
    this.quizQuestions.update((questions) =>
      questions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: question.options.map((option, currentIndex) =>
                currentIndex === optionIndex ? { ...option, text: value } : option,
              ),
            }
          : question,
      ),
    );
  }

  protected setCorrectQuizOption(questionIndex: number, optionId: string) {
    this.quizQuestions.update((questions) =>
      questions.map((question, index) =>
        index === questionIndex ? { ...question, correctOptionId: optionId } : question,
      ),
    );
  }

  protected updateQuizPassingScore(event: Event) {
    this.quizPassingScore.set(this.normalizeScoreInput(event));
    this.quizValidationError.set('');
  }

  protected addFinalQuizQuestion() {
    this.finalQuizQuestions.update((questions) => [...questions, this.createEmptyQuizQuestion()]);
    this.finalQuizValidationError.set('');
  }

  protected removeFinalQuizQuestion(questionIndex: number) {
    this.finalQuizQuestions.update((questions) =>
      questions.length === 1 ? questions : questions.filter((_, index) => index !== questionIndex),
    );
  }

  protected moveFinalQuizQuestion(questionIndex: number, direction: -1 | 1) {
    this.finalQuizQuestions.update((questions) => this.moveItem(questions, questionIndex, direction));
  }

  protected updateFinalQuizQuestionPrompt(questionIndex: number, event: Event) {
    const value = (event.target as HTMLInputElement | null)?.value || '';
    this.finalQuizQuestions.update((questions) =>
      questions.map((question, index) => (index === questionIndex ? { ...question, prompt: value } : question)),
    );
    this.finalQuizValidationError.set('');
  }

  protected addFinalQuizOption(questionIndex: number) {
    this.finalQuizQuestions.update((questions) =>
      questions.map((question, index) =>
        index === questionIndex ? { ...question, options: [...question.options, this.createEmptyQuizOption()] } : question,
      ),
    );
  }

  protected removeFinalQuizOption(questionIndex: number, optionIndex: number) {
    this.finalQuizQuestions.update((questions) =>
      questions.map((question, index) => {
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
      }),
    );
  }

  protected updateFinalQuizOptionText(questionIndex: number, optionIndex: number, event: Event) {
    const value = (event.target as HTMLInputElement | null)?.value || '';
    this.finalQuizQuestions.update((questions) =>
      questions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              options: question.options.map((option, currentIndex) =>
                currentIndex === optionIndex ? { ...option, text: value } : option,
              ),
            }
          : question,
      ),
    );
  }

  protected setCorrectFinalQuizOption(questionIndex: number, optionId: string) {
    this.finalQuizQuestions.update((questions) =>
      questions.map((question, index) =>
        index === questionIndex ? { ...question, correctOptionId: optionId } : question,
      ),
    );
  }

  protected updateFinalQuizPassingScore(event: Event) {
    this.finalQuizPassingScore.set(this.normalizeScoreInput(event));
    this.finalQuizValidationError.set('');
  }

  protected resolveSlides(lesson: Lesson) {
    return lesson.slides?.length ? lesson.slides : this.buildEditableSlidesFromLesson(lesson).slides;
  }

  protected previewText(value?: string | null) {
    const normalizedValue = String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return normalizedValue.length > 180 ? `${normalizedValue.slice(0, 180)}...` : normalizedValue;
  }

  protected contentTypeLabel(value: Lesson['contentType']) {
    return {
      article: 'مقال',
      task: 'مهمة',
      video: 'فيديو',
      pdf: 'PDF',
      quiz: 'اختبار',
    }[value] || value;
  }

  protected difficultyLabel(value: Course['difficulty']) {
    return {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    }[value] || value;
  }

  protected quizSummaryLabel(quiz: LessonQuiz | null) {
    if (!quiz) {
      return 'لا يوجد اختبار';
    }

    return `${quiz.questions.length} أسئلة • اجتياز من ${quiz.passingScorePercentage}%`;
  }

  private buildSlidesPayload() {
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

  private buildQuizPayload(
    questions: EditableQuizQuestion[],
    passingScore: number,
    errorSignal: WritableSignal<string>,
  ): LessonQuiz | null {
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

  private loadQuizBuilder(quiz: LessonQuiz | null) {
    this.quizQuestions.set(this.normalizeQuizQuestions(quiz));
    this.quizPassingScore.set(quiz?.passingScorePercentage ?? 70);
    this.quizValidationError.set('');
  }

  private loadFinalQuizBuilder(quiz: LessonQuiz | null) {
    this.finalQuizQuestions.set(this.normalizeQuizQuestions(quiz));
    this.finalQuizPassingScore.set(quiz?.passingScorePercentage ?? 70);
    this.finalQuizValidationError.set('');
  }

  private normalizeQuizQuestions(quiz: LessonQuiz | null) {
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

  private buildEditableSlidesFromLesson(lesson: Lesson) {
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
            body:
              lesson.contentType === 'video'
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

  private buildLegacyContentHtml(slides: EditableSlide[]) {
    return slides
      .map((slide) => `<h3>${slide.title}</h3><p>${slide.body}</p>`)
      .join('\n')
      .trim();
  }

  private pickLegacyContentUrl(slides: EditableSlide[]) {
    return slides.find((slide) => slide.mediaUrl?.trim())?.mediaUrl?.trim() || undefined;
  }

  private normalizeScoreInput(event: Event) {
    const value = Number((event.target as HTMLInputElement | null)?.value || 0);
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  private moveItem<T>(items: T[], index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) {
      return items;
    }

    const nextItems = [...items];
    const [item] = nextItems.splice(index, 1);
    nextItems.splice(nextIndex, 0, item);
    return nextItems;
  }

  private resetSlides() {
    this.slides.set([this.createEmptySlide()]);
    this.slidesValidationError.set('');
  }

  private resetQuizBuilder() {
    this.quizQuestions.set([this.createEmptyQuizQuestion()]);
    this.quizPassingScore.set(70);
    this.quizValidationError.set('');
  }

  private createEmptySlide(): EditableSlide {
    return {
      id: crypto.randomUUID(),
      title: '',
      body: '',
      mediaUrl: null,
      notes: null,
    };
  }

  private createEmptyQuizQuestion(): EditableQuizQuestion {
    const firstOption = this.createEmptyQuizOption();
    const secondOption = this.createEmptyQuizOption();
    return {
      id: crypto.randomUUID(),
      prompt: '',
      correctOptionId: firstOption.id,
      options: [firstOption, secondOption],
    };
  }

  private createEmptyQuizOption(): EditableQuizOption {
    return {
      id: crypto.randomUUID(),
      text: '',
    };
  }

  private objectId(item: { _id?: string; id?: string }) {
    return item._id || item.id || '';
  }

  private loadData(courseId: string) {
    forkJoin({
      course: this.coursesApi.getCourse(courseId),
      lessons: this.coursesApi.getLessons(courseId),
    }).subscribe(({ course, lessons }) => {
      this.course.set(course);
      this.lessons.set(lessons);
    });
  }
}
