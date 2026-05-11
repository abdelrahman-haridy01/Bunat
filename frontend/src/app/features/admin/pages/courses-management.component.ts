import { ChangeDetectionStrategy, Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>

      <app-dialog
        #courseDialog
        title="إضافة دورة"
        subtitle="تعريف دورة جديدة وربطها بالمهارات والمؤشرات."
        icon="book-open"
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
            <button class="btn btn-primary" type="submit" [disabled]="courseForm.invalid">حفظ الدورة</button>
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
          </div>

          <div class="dialog-actions">
            <button class="btn btn-ghost" type="button" (click)="closeLessonDialog()">إلغاء</button>
            <button class="btn btn-secondary" type="submit" [disabled]="lessonForm.invalid">إضافة درس</button>
          </div>
        </form>
      </app-dialog>
    </section>
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly courseDialog = viewChild.required<DialogComponent>('courseDialog');
  protected readonly lessonDialog = viewChild.required<DialogComponent>('lessonDialog');
  protected readonly courses = signal<any[]>([]);
  protected readonly skills = signal<any[]>([]);
  protected readonly kpis = signal<any[]>([]);
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
    { key: 'difficulty', label: 'المستوى' },
    { key: 'duration', label: 'المدة' },
    { key: 'status', label: 'الحالة' },
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

  protected readonly lessonForm = this.fb.nonNullable.group({
    courseId: ['', Validators.required],
    title: ['', Validators.required],
    contentType: ['article', Validators.required],
    order: [1, [Validators.required, Validators.min(1)]],
    durationMinutes: [10, [Validators.required, Validators.min(1)]],
    isRequired: [true],
  });

  ngOnInit() {
    this.loadData();
  }

  protected openCourseDialog() {
    clearControlState(this.courseForm);
    this.courseDialog().open();
  }

  protected closeCourseDialog() {
    this.courseDialog().close();
  }

  protected openLessonDialog() {
    clearControlState(this.lessonForm);
    this.lessonDialog().open();
  }

  protected closeLessonDialog() {
    this.lessonDialog().close();
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
      ...this.lessonForm.getRawValue(),
      contentType: this.lessonForm.getRawValue().contentType as Lesson['contentType'],
    };

    this.coursesApi.createLesson(payload).subscribe(() => {
      this.lessonForm.reset({
        courseId: payload.courseId,
        title: '',
        contentType: 'article',
        order: 1,
        durationMinutes: 10,
        isRequired: true,
      });
      this.closeLessonDialog();
    });
  }

  protected rows() {
    return this.courses().map((course) => ({
      title: course.title,
      difficulty: course.difficulty,
      duration: `${course.estimatedDurationMinutes} دقيقة`,
      status: course.status,
    }));
  }

  private loadData() {
    this.loadCourses();
    this.lookupsApi.getSkills().subscribe((response) => this.skills.set(response));
    this.lookupsApi.getKpis().subscribe((response) => this.kpis.set(response));
  }

  private loadCourses() {
    this.coursesApi.getCourses().subscribe((response) => this.courses.set(response));
  }
}
