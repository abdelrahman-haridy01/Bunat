import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CoursesApiService } from '../../../core/services/courses-api.service';
import { Course, Lesson } from '../../../core/models/domain.models';
import { LookupsApiService } from '../../../core/services/lookups-api.service';
import { DataTableComponent } from '../../../shared/components';

@Component({
  selector: 'app-courses-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent],
  template: `
    <section class="page-grid">
      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">إضافة دورة</h2>
            <p class="section-subtitle">تعريف دورة جديدة وربطها بالمهارات والمؤشرات.</p>
          </div>
        </div>

        <form class="page-grid" [formGroup]="courseForm" (ngSubmit)="submitCourse()">
          <div class="form-grid">
            <div class="field">
              <label>عنوان الدورة</label>
              <input formControlName="title" />
            </div>
            <div class="field">
              <label>المستوى</label>
              <select formControlName="difficulty">
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>
            <div class="field">
              <label>المدة التقديرية</label>
              <input type="number" formControlName="estimatedDurationMinutes" />
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
            <textarea rows="4" formControlName="description"></textarea>
          </div>

          <button class="btn btn-primary" type="submit">حفظ الدورة</button>
        </form>
      </article>

      <article class="card panel">
        <div class="panel-header">
          <div>
            <h2 class="section-title">إضافة درس</h2>
            <p class="section-subtitle">إثراء الدورات القائمة بدروس قابلة للتتبع.</p>
          </div>
        </div>

        <form class="form-grid" [formGroup]="lessonForm" (ngSubmit)="submitLesson()">
          <div class="field">
            <label>الدورة</label>
            <select formControlName="courseId">
              <option *ngFor="let course of courses()" [value]="course._id || course.id">{{ course.title }}</option>
            </select>
          </div>
          <div class="field">
            <label>عنوان الدرس</label>
            <input formControlName="title" />
          </div>
          <div class="field">
            <label>نوع المحتوى</label>
            <select formControlName="contentType">
              <option value="video">فيديو</option>
              <option value="article">مقال</option>
              <option value="pdf">PDF</option>
              <option value="quiz">اختبار</option>
              <option value="task">مهمة</option>
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
          <button class="btn btn-secondary" type="submit">إضافة درس</button>
        </form>
      </article>

      <article class="card panel">
        <h2 class="section-title">الدورات الحالية</h2>
        <app-data-table [columns]="columns" [rows]="rows()" />
      </article>
    </section>
  `,
  styles: ['.panel { padding:1.5rem; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesManagementComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly lookupsApi = inject(LookupsApiService);

  protected readonly courses = signal<any[]>([]);
  protected readonly skills = signal<any[]>([]);
  protected readonly kpis = signal<any[]>([]);
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
    estimatedDurationMinutes: [60, Validators.required],
    skillIds: [[] as string[]],
    kpiIds: [[] as string[]],
    status: ['published'],
  });

  protected readonly lessonForm = this.fb.nonNullable.group({
    courseId: ['', Validators.required],
    title: ['', Validators.required],
    contentType: ['article', Validators.required],
    order: [1, Validators.required],
    durationMinutes: [10, Validators.required],
    isRequired: [true],
  });

  ngOnInit() {
    this.loadData();
  }

  protected submitCourse() {
    if (this.courseForm.invalid) {
      return;
    }
    const payload: Partial<Course> = {
      ...this.courseForm.getRawValue(),
      difficulty: this.courseForm.getRawValue().difficulty as Course['difficulty'],
      status: this.courseForm.getRawValue().status as Course['status'],
    };

    this.coursesApi.createCourse(payload).subscribe(() => {
      this.courseForm.patchValue({ title: '', description: '', estimatedDurationMinutes: 60 });
      this.loadCourses();
    });
  }

  protected submitLesson() {
    if (this.lessonForm.invalid) {
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
      this.lessonForm.patchValue({ title: '', order: 1, durationMinutes: 10 });
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
