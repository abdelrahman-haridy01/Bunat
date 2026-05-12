import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CoursesApiService } from '../../../core/services/courses-api.service';
import { Course, Lesson } from '../../../core/models/domain.models';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { DataTableComponent, DialogComponent, IconComponent } from '../../../shared/components';
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
  selector: 'app-courses-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, DialogComponent, IconComponent],
  template: `
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
            <div class="field">
              <label>المهارات</label>
              <select multiple formControlName="skillIds">
                <option *ngFor="let skill of skills()" [value]="skill._id">{{ skill.name }}</option>
              </select>
            </div>
            <div class="field">
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
  `,
  styles: [
    `
      .panel {
        padding: 1.5rem;
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly lookupsApi = inject(LookupsApiService);
  private readonly router = inject(Router);

  protected readonly courseDialog = viewChild.required<DialogComponent>('courseDialog');
  protected readonly lessonDialog = viewChild.required<DialogComponent>('lessonDialog');
  protected readonly deleteDialog = viewChild.required<DialogComponent>('deleteDialog');
  protected readonly courses = signal<Course[]>([]);
  protected readonly skills = signal<any[]>([]);
  protected readonly kpis = signal<any[]>([]);
  protected readonly editingCourse = signal<Course | null>(null);
  protected readonly deletingCourse = signal<Course | null>(null);
  protected readonly uploadedLessonFileName = signal('');
  protected readonly isEditMode = computed(() => !!this.editingCourse());
  protected readonly hasVisibleError = hasVisibleError;
  protected readonly getVisibleErrorMessage = getVisibleErrorMessage;
  protected readonly courseValidationMessages = {
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
  protected readonly lessonValidationMessages = {
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
  protected readonly columns = [
    { key: 'title', label: 'الدورة' },
    { key: 'difficultyLabel', label: 'المستوى' },
    { key: 'duration', label: 'المدة' },
    { key: 'statusLabel', label: 'الحالة' },
  ];
  protected readonly actions = [
    { key: 'view-lessons', label: 'الدروس', icon: 'eye', tone: 'secondary' as const },
    { key: 'edit', label: 'تعديل', icon: 'book-open', tone: 'ghost' as const },
    { key: 'delete', label: 'حذف', icon: 'alert', tone: 'danger' as const },
  ];

  protected readonly courseForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    difficulty: ['beginner', Validators.required],
    estimatedDurationMinutes: [60, [Validators.required, Validators.min(1)]],
    skillIds: [[] as string[]],
    kpiIds: [[] as string[]],
    status: ['published'],
  });

  protected readonly lessonForm = this.fb.nonNullable.group(
    {
      courseId: ['', Validators.required],
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
    this.loadData();
  }

  protected openCourseDialog() {
    this.editingCourse.set(null);
    this.courseForm.reset({
      title: '',
      description: '',
      difficulty: 'beginner',
      estimatedDurationMinutes: 60,
      skillIds: [],
      kpiIds: [],
      status: 'published',
    });
    clearControlState(this.courseForm);
    this.courseDialog().open();
  }

  protected closeCourseDialog() {
    this.courseDialog().close();
  }

  protected closeDeleteDialog() {
    this.deletingCourse.set(null);
    this.deleteDialog().close();
  }

  protected openLessonDialog() {
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

  protected closeLessonDialog() {
    this.uploadedLessonFileName.set('');
    this.lessonDialog().close();
  }

  protected handleTableAction(event: { key: string; row: Record<string, unknown> }) {
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

  protected openEditCourseDialog(course: Course) {
    this.editingCourse.set(course);
    this.courseForm.reset({
      title: course.title,
      description: course.description,
      difficulty: course.difficulty,
      estimatedDurationMinutes: course.estimatedDurationMinutes,
      skillIds: course.skillIds.map((item) => (typeof item === 'string' ? item : item._id || '')).filter(Boolean),
      kpiIds: course.kpiIds.map((item) => (typeof item === 'string' ? item : item._id || '')).filter(Boolean),
      status: course.status,
    });
    clearControlState(this.courseForm);
    this.courseDialog().open();
  }

  protected openDeleteDialog(course: Course) {
    this.deletingCourse.set(course);
    this.deleteDialog().open();
  }

  protected viewLessons(course: Course) {
    const courseId = course._id || course.id;
    if (!courseId) {
      return;
    }

    this.router.navigate(['/admin/courses', courseId, 'lessons']);
  }

  protected submitCourse() {
    if (this.courseForm.invalid) {
      touchAllControls(this.courseForm);
      return;
    }
    const payload: Partial<Course> = {
      ...this.courseForm.getRawValue(),
      difficulty: this.courseForm.getRawValue().difficulty as Course['difficulty'],
      status: this.courseForm.getRawValue().status as Course['status'],
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
      });
      this.closeCourseDialog();
      this.loadCourses();
    });
  }

  protected submitLesson() {
    if (this.lessonForm.invalid) {
      touchAllControls(this.lessonForm);
      return;
    }
    const payload: Partial<Lesson> & {
      courseId: string;
      title: string;
      contentType: Lesson['contentType'];
    } = {
      courseId: this.lessonForm.getRawValue().courseId,
      title: this.lessonForm.getRawValue().title.trim(),
      contentType: this.lessonForm.getRawValue().contentType as Lesson['contentType'],
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
      this.router.navigate(['/admin/courses', payload.courseId, 'lessons']);
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

  protected rows() {
    return this.courses().map((course) => ({
      courseId: course._id || course.id || '',
      title: course.title,
      difficultyLabel: this.difficultyLabel(course.difficulty),
      duration: `${course.estimatedDurationMinutes} دقيقة`,
      statusLabel: this.statusLabel(course.status),
    }));
  }

  protected confirmDelete() {
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

  private loadData() {
    this.loadCourses();
    this.lookupsApi.getSkills().subscribe((response) => this.skills.set(response));
    this.lookupsApi.getKpis().subscribe((response) => this.kpis.set(response));
  }

  private loadCourses() {
    this.coursesApi.getCourses().subscribe((response) => this.courses.set(response));
  }

  private difficultyLabel(value: Course['difficulty']) {
    return {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    }[value] || value;
  }

  private statusLabel(value: Course['status']) {
    return {
      draft: 'مسودة',
      published: 'منشورة',
      archived: 'مؤرشفة',
    }[value] || value;
  }
}
