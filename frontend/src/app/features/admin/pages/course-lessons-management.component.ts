import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';

import { Course, Lesson } from '../../../core/models/domain.models';
import { CoursesApiService } from '../../../core/services/courses-api.service';
import { DialogComponent, EmptyStateComponent, IconComponent } from '../../../shared/components';
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

  if (contentType === 'video' || contentType === 'pdf') {
    return contentUrl ? null : { contentMissing: true };
  }

  return contentUrl || contentHtml ? null : { contentMissing: true };
}

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

              <p class="lesson-card__meta" *ngIf="lesson.contentUrl">يوجد رابط أو ملف محفوظ لهذا الدرس.</p>
              <pre class="lesson-card__content" *ngIf="lesson.contentHtml">{{ previewText(lesson.contentHtml) }}</pre>
              <p class="lesson-card__meta" *ngIf="!lesson.contentUrl && !lesson.contentHtml">
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
          : 'أدخل بيانات الدرس وأضف المحتوى أو ارفع الملف.'
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

          <div class="field field--full">
            <label>رابط المحتوى</label>
            <input formControlName="contentUrl" placeholder="https://example.com/lesson أو سيتم تعبئته من الملف" />
            <div class="field-help">{{ lessonUrlHelpText() }}</div>
          </div>

          <div class="field field--full" *ngIf="lessonUsesTextContent()">
            <label>نص المحتوى</label>
            <textarea
              rows="8"
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
  `,
  styles: [
    `
      .panel {
        padding: 1.5rem;
      }

      .summary-strip {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-bottom: 1.25rem;
      }

      .summary-item {
        padding: 1rem;
        border-radius: var(--radius-sm);
        background: var(--color-neutral-50);
        border: 1px solid var(--color-neutral-200);
      }

      .summary-item strong {
        display: block;
        font-size: 1.25rem;
        color: var(--color-primary-text);
      }

      .summary-item span {
        color: var(--color-secondary-paragraph);
      }

      .lesson-list {
        display: grid;
        gap: 1rem;
      }

      .lesson-card {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-neutral-200);
      }

      .lesson-card__body {
        min-width: 0;
        flex: 1;
      }

      .lesson-card__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
      }

      .lesson-card p {
        margin: 0.35rem 0 0;
        color: var(--color-secondary-paragraph);
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

      .checkbox-field {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        color: var(--color-primary-text);
      }

      .status-chip.muted {
        background: var(--color-neutral-100);
        color: var(--color-secondary-paragraph);
      }

      @media (max-width: 720px) {
        .summary-strip {
          grid-template-columns: 1fr;
        }

        .lesson-card,
        .lesson-card__header {
          flex-direction: column;
          align-items: stretch;
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
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly course = signal<Course | null>(null);
  protected readonly lessons = signal<Lesson[]>([]);
  protected readonly editingLesson = signal<Lesson | null>(null);
  protected readonly deletingLesson = signal<Lesson | null>(null);
  protected readonly savingLesson = signal(false);
  protected readonly deletingLessonInFlight = signal(false);
  protected readonly uploadedLessonFileName = signal('');
  protected readonly isEditMode = computed(() => !!this.editingLesson());
  protected readonly requiredLessonsCount = computed(() => this.lessons().filter((lesson) => lesson.isRequired).length);
  protected readonly totalDurationMinutes = computed(() =>
    this.lessons().reduce((total, lesson) => total + lesson.durationMinutes, 0),
  );
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
  protected readonly lessonForm = this.fb.nonNullable.group(
    {
      title: ['', Validators.required],
      contentType: ['article' as Lesson['contentType'], Validators.required],
      order: [1, [Validators.required, Validators.min(1)]],
      durationMinutes: [10, [Validators.required, Validators.min(1)]],
      contentUrl: [''],
      contentHtml: [''],
      isRequired: [true],
    },
    { validators: lessonContentValidator },
  );

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      return;
    }

    this.loadData(courseId);
  }

  protected openCreateLessonDialog() {
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
      contentUrl: lesson.contentUrl || '',
      contentHtml: lesson.contentHtml || '',
      isRequired: lesson.isRequired,
    });
    this.uploadedLessonFileName.set('');
    clearControlState(this.lessonForm);
    this.lessonDialog().open();
  }

  protected closeLessonDialog() {
    this.uploadedLessonFileName.set('');
    this.editingLesson.set(null);
    this.lessonDialog().close();
  }

  protected openDeleteLessonDialog(lesson: Lesson) {
    this.deletingLesson.set(lesson);
    this.deleteDialog().open();
  }

  protected closeDeleteLessonDialog() {
    this.deletingLesson.set(null);
    this.deleteDialog().close();
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
    const payload = {
      courseId,
      title: formValue.title.trim(),
      contentType: formValue.contentType,
      order: Number(formValue.order),
      durationMinutes: Number(formValue.durationMinutes),
      isRequired: formValue.isRequired,
      contentUrl: formValue.contentUrl.trim() || undefined,
      contentHtml: formValue.contentHtml.trim() || undefined,
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
      .subscribe({
        next: () => {
          this.closeDeleteLessonDialog();
          this.loadData(courseId);
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

  protected contentTypeLabel(value: Lesson['contentType']) {
    return {
      video: 'فيديو',
      article: 'مقال',
      pdf: 'PDF',
      quiz: 'اختبار',
      task: 'مهمة',
    }[value] || value;
  }

  protected difficultyLabel(value: Course['difficulty']) {
    return {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    }[value] || value;
  }

  protected previewText(value?: string | null) {
    if (!value) {
      return '';
    }

    return value.length > 280 ? `${value.slice(0, 280)}...` : value;
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
