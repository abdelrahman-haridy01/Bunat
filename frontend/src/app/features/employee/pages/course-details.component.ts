import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { EmptyStateComponent } from '../../../shared/components';
import { Course, Lesson } from '../../../core/models/domain.models';
import { CoursesApiService } from '../../../core/services/courses-api.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, EmptyStateComponent],
  template: `
    <section class="page-grid">
      <article class="card panel" *ngIf="course(); else loadingState">
        <div class="panel-header">
          <div>
            <h2 class="section-title">{{ course()?.title }}</h2>
            <p class="section-subtitle">{{ course()?.description }}</p>
          </div>
          <span class="status-chip info">{{ difficultyLabel(course()?.difficulty || 'beginner') }}</span>
        </div>

        <div class="lesson-list" *ngIf="lessons().length; else noLessons">
          <article class="lesson-card" *ngFor="let lesson of lessons()">
            <div>
              <strong>{{ lesson.title }}</strong>
              <p>{{ lesson.contentType }} • {{ lesson.durationMinutes }} دقيقة</p>
            </div>
            <button class="btn btn-primary" type="button" (click)="complete(lesson)" [disabled]="loadingLessonId() === objectId(lesson)">
              {{ loadingLessonId() === objectId(lesson) ? 'جارٍ الحفظ...' : 'إتمام الدرس' }}
            </button>
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
        description="الدورة مخصصة لك، لكن لم تتم إضافة دروس لها بعد من لوحة الإدارة."
      />
    </ng-template>
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
  private readonly route = inject(ActivatedRoute);
  private readonly coursesApi = inject(CoursesApiService);

  protected readonly course = signal<Course | null>(null);
  protected readonly lessons = signal<Lesson[]>([]);
  protected readonly loadingLessonId = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.loadCourse(id);
  }

  protected complete(lesson: Lesson) {
    const lessonId = this.objectId(lesson);
    if (!lessonId) {
      return;
    }

    this.loadingLessonId.set(lessonId);
    this.coursesApi.completeLesson(lessonId, lesson.durationMinutes).subscribe({
      complete: () => this.loadingLessonId.set(''),
    });
  }

  protected objectId(item: { _id?: string; id?: string }) {
    return item._id || item.id || '';
  }

  protected difficultyLabel(value: string) {
    return {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم',
    }[value] || value;
  }

  private loadCourse(id: string) {
    this.coursesApi.getCourse(id).subscribe((course) => {
      this.course.set(course);
      this.lessons.set(course.lessons || []);
    });
  }
}
