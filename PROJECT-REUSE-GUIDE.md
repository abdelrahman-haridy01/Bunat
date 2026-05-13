# Bunat Canonical Project Spec

Last canonical update: `2026-05-13`

This file is the single source of truth for rebuilding, continuing, or extending **Bunat / بُناة**. Paste this entire file into any AI agent when you want it to recreate the same project or continue the same product direction.

## 1. How To Use This File

- Treat this file as the canonical brief for the project.
- If the repository already exists, align with the codebase and update this file when the implementation changes.
- If you add a feature in any future session, update this file in the same session before stopping.
- Do not downgrade the stack, remove Arabic-first behavior, or change the role model unless explicitly requested.
- When this file conflicts with the original MVP prompt, prefer this file because it reflects the **current implemented product**, not only the original plan.

## 2. Instruction To Any AI Agent

You are building or continuing **Bunat / بُناة**, an Arabic-first internal employee learning and performance platform.

Your job is to preserve the current product exactly unless the user explicitly asks for a change.

Non-negotiable rules:

- Build a **real full-stack app**, not a mockup.
- Frontend must be **Angular standalone** and **RTL Arabic-first**.
- Backend must be **NestJS + MongoDB + Mongoose + JWT**.
- Preserve the current roles: `employee`, `manager`, `admin`, `hr`, `course_manager`.
- Preserve the current modules, route structure, business rules, seed data direction, and UI shell.
- Preserve the current AI authoring feature: per-user AI settings plus AI-generated course drafts.
- Preserve the current gamification rules, final quiz logic, and certificate flow.
- CSR only. Do not introduce SSR.
- Do not add payments, SaaS billing, public SEO architecture, or external LMS integrations.
- If you change routes, schemas, permissions, or business rules, update this file.

## 3. Project Identity

- Name: `Bunat / بُناة`
- Product type: internal training and development web application
- Audience: employees, managers, HR/admin teams, and course/content managers inside one organization
- Core idea: connect learning activity to measurable KPI improvement, gamification, and manager/admin reporting
- Language direction: Arabic-first UI, RTL layout, Arabic content by default
- Product tone: institutional, clear, practical, performance-oriented
- Rendering mode: CSR only
- SEO importance: not relevant

## 4. Current Implemented Scope

This is the current implemented scope, not the older simplified brief:

- JWT authentication
- Role-based Angular routing and role-aware dashboards
- Public landing page at `/home`
- Employee workspace
- Manager workspace
- Admin/HR workspace
- Dedicated `course_manager` workspace under `/content`
- CRUD for users, teams, departments, skills, KPIs, courses, lessons, learning paths, and enrollments
- Lesson completion tracking
- Lesson quiz attempts
- Course final quiz attempts
- Gamification with points, levels, badges, leaderboard, and transaction history
- KPI performance records and reporting
- Certificate PDF generation for eligible completed courses
- Per-user AI provider settings
- AI-generated course drafts using OpenAI or Gemini
- Seed script with Arabic sample org structure, users, courses, learning paths, progress, points, badges, and KPI records

## 5. Tech Stack

### Frontend

- Angular `21`
- TypeScript `5.9`
- Standalone components
- Angular Router with `loadComponent()`
- Angular `HttpClient`
- Signals for local state
- Custom shared components
- `ksaa-dga-ui` package is present locally as `frontend/ksaa-dga-ui-1.1.3.tgz`
- Global RTL styling and Arabic typography

### Backend

- NestJS `11`
- TypeScript `5.8`
- MongoDB
- Mongoose `8`
- JWT auth with `@nestjs/jwt`
- DTO validation with `class-validator` and Nest `ValidationPipe`
- `pdf-lib` for certificate PDF generation

### Infrastructure

- Docker Compose for local MongoDB
- `.env.example` at repo root
- Frontend default API base URL: `http://localhost:3000/api`
- Backend default port: `3000`
- Frontend default port: `4200`

## 6. Repository Shape

```text
.
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── courses/
│   │   ├── departments/
│   │   ├── enrollments/
│   │   ├── gamification/
│   │   ├── kpis/
│   │   ├── learning-paths/
│   │   ├── lessons/
│   │   ├── performance-records/
│   │   ├── reports/
│   │   ├── seed/
│   │   ├── skills/
│   │   ├── teams/
│   │   └── users/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── features/
│   │   │   └── shared/
│   │   └── environments/
│   └── package.json
├── docker-compose.yml
├── README.md
├── NEW-PROJECT-FULL-PROMPT.md
└── PROJECT-REUSE-GUIDE.md
```

## 7. UX And Design Rules

- Entire app is RTL by default.
- Primary font stack starts with `IBM Plex Sans Arabic`.
- UI language is primarily Arabic.
- Use a clean corporate Arabic dashboard style.
- Reuse the current color direction:
  - primary green `#14573a`
  - secondary blue `#0f4c81`
  - light neutral dashboard surfaces
- Use soft gradients and card-based layout.
- Use the current shell pattern:
  - left-side role-based sidebar
  - top page header with title and eyebrow
  - card panels for content blocks
- Do not replace the current UI with generic dark-mode SaaS styling.
- Keep loading, success, error, and empty states explicit.
- Charts remain lightweight KPI visuals and cards, not heavy charting libraries unless explicitly requested.

## 8. Frontend Architecture

### Core frontend behavior

- Standalone Angular app
- Router-based role separation
- `authInterceptor` adds `Authorization: Bearer <token>`
- `apiFeedbackInterceptor` shows success and error toast messages for API mutations
- Auth session stored in localStorage using:
  - `bunat_token`
  - `bunat_user`

### Shared UI building blocks

The shared layer should continue to include reusable components such as:

- `AppShellComponent`
- `SidebarComponent`
- `HeaderComponent`
- `DialogComponent`
- `DataTableComponent`
- `StatCardComponent`
- `ProgressBarComponent`
- `DashboardChartCardComponent`
- `BadgeComponent`
- `LevelCardComponent`
- `ToastOutletComponent`
- `EmptyStateComponent`
- `IconComponent`

### Frontend route map

Public routes:

- `/home`
- `/login`

Employee routes:

- `/employee/dashboard`
- `/employee/courses`
- `/employee/courses/:id`
- `/employee/progress`

Manager routes:

- `/manager/dashboard`
- `/manager/team`
- `/manager/employees/:id`

Admin/HR routes:

- `/admin/dashboard`
- `/admin/users`
- `/admin/employees/:id/report`
- `/admin/teams`
- `/admin/courses`
- `/admin/courses/:id/lessons`
- `/admin/kpis`
- `/admin/assignments`
- `/admin/settings`

Course manager routes:

- `/content/courses`
- `/content/courses/:id/lessons`
- `/content/settings`

### Navigation model by role

- `employee`: dashboard, courses, progress
- `manager`: dashboard, team
- `admin` and `hr`: dashboard, users, teams, courses, KPIs, assignments, settings
- `course_manager`: courses, settings

### Frontend feature expectations

- `landing.component.ts` explains the product narrative publicly
- login redirects users to their role home
- employee pages focus on assigned learning and personal progress
- manager pages focus on team oversight and employee performance detail
- admin/HR pages focus on management and reporting
- course manager pages focus on course authoring and AI settings
- courses management includes:
  - manual course CRUD
  - manual lesson CRUD
  - AI draft generation flow
- AI settings page is available to `admin`, `hr`, and `course_manager`

## 9. Backend Architecture

### Global backend behavior

- Global prefix: `/api`
- Global validation:
  - `whitelist: true`
  - `transform: true`
  - `forbidNonWhitelisted: true`
- CORS origin defaults to `http://localhost:4200`

### Backend modules

- `auth`
- `users`
- `departments`
- `teams`
- `skills`
- `kpis`
- `courses`
- `lessons`
- `learning-paths`
- `enrollments`
- `performance-records`
- `gamification`
- `reports`
- `seed`
- `ai`

## 10. Roles And Access Model

- `employee`: learner-facing views, own enrollments, own gamification, own certificates, own course participation
- `manager`: team dashboards, team enrollments, employee performance visibility, assignment and KPI recording abilities
- `admin`: full platform administration
- `hr`: nearly same admin surface as admin
- `course_manager`: content creation and AI settings, but not general people management

Important rule:

- Keep `course_manager` as a distinct role. Do not merge it into `admin` or `hr`.

## 11. API Surface

All routes below are under `/api`.

### Auth

- `POST /auth/login`
- `GET /auth/me`

### Users

- `GET /users/me/ai-settings` for `admin`, `hr`, `course_manager`
- `PATCH /users/me/ai-settings` for `admin`, `hr`, `course_manager`
- `DELETE /users/me/ai-settings/api-key` for `admin`, `hr`, `course_manager`
- `GET /users` for `admin`, `hr`, `manager`
- `GET /users/:id` for `admin`, `hr`, `manager`
- `POST /users` for `admin`, `hr`
- `PATCH /users/:id` for `admin`, `hr`
- `DELETE /users/:id` for `admin`, `hr`

### Departments

- `GET /departments` for `admin`, `hr`, `manager`
- `POST /departments` for `admin`, `hr`
- `PATCH /departments/:id` for `admin`, `hr`

### Teams

- `GET /teams` for `admin`, `hr`, `manager`
- `POST /teams` for `admin`, `hr`
- `PATCH /teams/:id` for `admin`, `hr`
- `DELETE /teams/:id` for `admin`, `hr`

### Skills

- `GET /skills` for `admin`, `hr`, `manager`
- `POST /skills` for `admin`, `hr`
- `PATCH /skills/:id` for `admin`, `hr`

### KPIs

- `GET /kpis` for `admin`, `hr`, `manager`
- `POST /kpis` for `admin`, `hr`
- `PATCH /kpis/:id` for `admin`, `hr`
- `DELETE /kpis/:id` for `admin`, `hr`

### Courses

- `GET /courses` for `admin`, `hr`, `course_manager`, `manager`, `employee`
- `GET /courses/:id` for `admin`, `hr`, `course_manager`, `manager`, `employee`
- `POST /courses` for `admin`, `hr`, `course_manager`
- `PATCH /courses/:id` for `admin`, `hr`, `course_manager`
- `DELETE /courses/:id` for `admin`, `hr`, `course_manager`
- `POST /courses/:id/final-quiz-attempt` for `employee`, `manager`, `admin`, `hr`
- `GET /courses/:id/certificate` for `employee`, `manager`, `admin`, `hr`, `course_manager`

### Lessons

- `GET /courses/:courseId/lessons` for `employee`, `manager`, `admin`, `hr`, `course_manager`
- `POST /lessons` for `admin`, `hr`, `course_manager`
- `PATCH /lessons/:id` for `admin`, `hr`, `course_manager`
- `DELETE /lessons/:id` for `admin`, `hr`, `course_manager`
- `POST /lessons/:id/complete` for `employee`, `manager`, `admin`, `hr`
- `POST /lessons/:id/quiz-attempt` for `employee`, `manager`, `admin`, `hr`

### Learning paths

- `GET /learning-paths` for `admin`, `hr`, `manager`
- `POST /learning-paths` for `admin`, `hr`
- `PATCH /learning-paths/:id` for `admin`, `hr`

### Enrollments

- `GET /enrollments/my` for `employee`, `manager`, `admin`, `hr`
- `GET /enrollments/team` for `manager`, `admin`, `hr`
- `POST /enrollments/assign` for `admin`, `hr`, `manager`
- `PATCH /enrollments/:id` for `admin`, `hr`, `manager`
- `DELETE /enrollments/:id` for `admin`, `hr`, `manager`

### Performance records

- `POST /performance-records` for `admin`, `hr`, `manager`

### Gamification

- `GET /gamification/me` for `employee`, `manager`, `admin`, `hr`
- `GET /gamification/leaderboard` for `employee`, `manager`, `admin`, `hr`
- `POST /gamification/award-points` for `admin`, `hr`, `manager`

### Reports

- `GET /reports/employee/:userId` for `employee`, `manager`, `admin`, `hr`
- `GET /reports/team/:teamId` for `manager`, `admin`, `hr`
- `GET /reports/manager-dashboard` for `manager`, `admin`, `hr`
- `GET /reports/admin-dashboard` for `admin`, `hr`

### AI

- `POST /ai/course-drafts` for `admin`, `hr`, `course_manager`

## 12. Domain Model

Keep these collections and relationships.

### `User`

- `fullName`
- `email`
- `passwordHash`
- `jobTitle`
- `departmentId`
- `teamId`
- `managerId`
- `role`
- `status`
- `pointsTotal`
- `levelId`
- timestamps

### `UserAiSettings`

- one record per user
- `userId` unique
- `provider`: `openai | gemini`
- `encryptedApiKey`
- `model`
- `baseUrl`
- `language`
- `defaultLessonCount`
- `defaultFinalExamQuestionCount`

### `Department`

- `name`
- `description`
- `managerId`

### `Team`

- `name`
- `departmentId`
- `managerId`
- `members[]`

### `Skill`

- `name`
- `category`
- `description`
- `level`

### `Kpi`

- `name`
- `description`
- `metricType`
- `direction`
- `targetValue`
- `unit`
- `departmentId`
- `roleTarget`

### `Course`

- `title`
- `description`
- `skillIds[]`
- `kpiIds[]`
- `difficulty`
- `estimatedDurationMinutes`
- `status`
- `finalQuiz`
- `certificateEnabled`
- `createdBy`

### `Lesson`

- `courseId`
- `title`
- `contentType`: `video | article | pdf | quiz | task`
- `contentUrl`
- `contentHtml`
- `slides[]`
- `quiz`
- `order`
- `durationMinutes`
- `isRequired`

### `LessonProgress`

- tracks one user + one lesson progress
- includes status, attempts, time spent, quiz results, and submitted answers

### `LearningPath`

- `title`
- `description`
- `targetRole`
- `departmentId`
- `courseIds[]`
- `skillIds[]`
- `kpiIds[]`
- `status`
- `createdBy`

### `Enrollment`

- `userId`
- `courseId`
- `learningPathId`
- `assignedBy`
- `status`
- `progressPercentage`
- `startedAt`
- `completedAt`
- `dueDate`
- `finalQuizProgress`

Unique constraint:

- `userId + courseId` must be unique

### `PerformanceRecord`

- `userId`
- `kpiId`
- `courseId`
- `learningPathId`
- `beforeValue`
- `afterValue`
- `improvementPercentage`
- `measuredAt`
- `measuredBy`
- `notes`

### `Level`

- `name`
- `minPoints`
- `maxPoints`
- `icon`
- `order`

### `Badge`

- `name`
- `description`
- `icon`
- `criteriaType`
- `criteriaValue`
- `pointsReward`

### `UserBadge`

- `userId`
- `badgeId`
- `awardedAt`
- `awardedBy`

Unique constraint:

- `userId + badgeId` must be unique

### `PointsTransaction`

- `userId`
- `sourceType`
- `sourceId`
- `points`
- `description`

### `CourseCertificate`

- `certificateNumber`
- `userId`
- `courseId`
- `enrollmentId`
- `issuedAt`

Unique constraints:

- `certificateNumber` unique
- `userId + courseId` unique

## 13. Core Business Rules

### Authentication and session

- users authenticate with email and password
- backend returns JWT plus safe user profile
- frontend stores token and user in localStorage
- role home redirects:
  - `employee` -> `/employee/dashboard`
  - `manager` -> `/manager/dashboard`
  - `admin` and `hr` -> `/admin/dashboard`
  - `course_manager` -> `/content/courses`

### Lesson and course progress

- learner lesson views must not expose correct quiz answers
- non-quiz lessons are completed through `/lessons/:id/complete`
- quiz lessons are completed only through `/lessons/:id/quiz-attempt`
- completing a non-quiz lesson updates or creates lesson progress
- passing a quiz lesson marks that lesson completed
- course progress is synchronized after lesson completion or quiz attempt
- required lessons determine completion

### Progress percentage formula

- if a course has no final quiz:
  - progress = percentage of completed lessons
- if a course has a final quiz:
  - lessons contribute `90%`
  - passing the final quiz contributes the last `10%`
- enrollment is `completed` only when all required lessons are completed and the final quiz is passed when present

### Points and gamification

- non-quiz lesson first completion: `+10`
- lesson quiz first pass: `+25`
- course final quiz first pass: `+25`
- course completion first time: `+100`
- KPI target achieved: `+150`
- points transactions are deduplicated by `userId + sourceType + sourceId`
- user level updates whenever points change
- points badges are auto-evaluated after point updates

### Levels

- `مبتدئ`: `0` to `199`
- `متقدم`: `200` to `499`
- `قائد تعلم`: `500+`

### Seeded badges

- `أول خطوة` at `50` points
- `متعلم نشط` at `150` points
- `منجز` at `300` points
- `أثر ملموس` for KPI impact
- `استمرارية` for more than one completed course

### KPI rules

- `improvementPercentage = ((afterValue - beforeValue) / denominator) * 100`
- if `beforeValue` is `0`, denominator becomes `1`
- target achieved logic:
  - `increase`: `afterValue >= targetValue`
  - `decrease`: `afterValue <= targetValue`

### Certificate rules

- certificate download allowed only if:
  - course exists
  - learner exists
  - enrollment exists
  - `course.certificateEnabled === true`
  - enrollment status is `completed`
- first download creates a `CourseCertificate` record
- later downloads reuse the existing record

### Assignment rules

- do not allow assigning a course with zero lessons
- reassigning the same course to the same user updates the existing enrollment instead of creating duplicates

## 14. AI Authoring Feature

This is part of the live product and must be preserved.

### Who can use it

- `admin`
- `hr`
- `course_manager`

### Settings behavior

- AI settings are stored per user
- providers:
  - `openai`
  - `gemini`
- default models:
  - OpenAI: `gpt-4o-mini`
  - Gemini: `gemini-2.5-flash`
- stored API keys are encrypted using `AI_SETTINGS_ENCRYPTION_KEY`
- if that key is missing, backend falls back to `JWT_SECRET`, then `'change-me'`
- settings UI allows:
  - provider
  - API key
  - model
  - base URL
  - language
  - default lesson count
  - default final exam question count

### AI course draft behavior

- endpoint: `POST /api/ai/course-drafts`
- generated result returns structured JSON only
- output includes:
  - course title and description
  - lessons
  - slides
  - optional final quiz
- generated course is normalized into:
  - `status: draft`
  - `certificateEnabled: false`
- OpenAI path uses the Responses API
- Gemini path uses `generateContent`

## 15. Seed Dataset Snapshot

Keep the seeded data realistic, Arabic, and organization-shaped.

### Seed summary

- `16` users
- `8` departments
- `8` teams
- `10` skills
- `10` KPIs
- `10` courses
- `6` learning paths
- multiple enrollments, lesson progress records, KPI records, points transactions, and awarded badges

### Shared seed password

- all seeded users use: `Password123!`

### Seeded user accounts

- `admin@bunat.local`
- `hr@bunat.local`
- `manager@bunat.local`
- `content@bunat.local`
- `manager.lang@bunat.local`
- `manager.culture@bunat.local`
- `manager.tech@bunat.local`
- `employee1@bunat.local`
- `employee2@bunat.local`
- `employee3@bunat.local`
- `employee4@bunat.local`
- `employee5@bunat.local`
- `employee6@bunat.local`
- `employee7@bunat.local`
- `employee8@bunat.local`
- `employee9@bunat.local`

### Seeded departments

- `قطاع البرامج التعليمية`
- `قطاع الحوسبة اللغوية`
- `قطاع البرامج الثقافية`
- `قسم التواصل`
- `قسم الموارد البشرية`
- `قسم التقنية`
- `قسم الأمن السيبراني`
- `قسم المحاسبة`

### Seeded teams

- `فريق تصميم المسارات التعليمية`
- `فريق النماذج اللغوية العربية`
- `فريق المبادرات الثقافية`
- `فريق التواصل المؤسسي`
- `فريق شؤون الموظفين`
- `فريق المنصات والتكاملات`
- `فريق الحوكمة الأمنية`
- `فريق المالية والتقارير`

### Seeded courses

- `تصميم البرامج التعليمية المؤثرة`
- `قياس أثر التدريب المؤسسي`
- `أساسيات الحوسبة اللغوية العربية`
- `إدارة المبادرات والبرامج الثقافية`
- `الاتصال المؤسسي وصناعة الرسائل`
- `التوظيف المبني على الكفاءات`
- `تشغيل المنصات الرقمية الداخلية`
- `الأمن السيبراني للفرق التشغيلية`
- `الضبط المالي وإقفال التقارير`
- `خارطة التميز الوظيفي`

### Seeded learning paths

- `مسار البرامج التعليمية`
- `مسار الحوسبة اللغوية`
- `مسار البرامج الثقافية والتواصل`
- `مسار الموارد البشرية`
- `مسار التقنية والأمن السيبراني`
- `مسار المحاسبة والضبط المالي`

### Special seeded flagship course

`خارطة التميز الوظيفي` is the most customized seeded course and should stay that way.

Important details:

- published course
- `certificateEnabled: true`
- has a course-level final quiz
- contains multi-slide lessons
- contains both regular learning content and quiz/task content
- lessons include:
  - intro video
  - dimensions article
  - concepts quiz
  - personal improvement task
  - final lesson quiz
  - practical PDF reference

### Default seeded lesson pattern for the other regular courses

For the non-flagship courses, the seed currently creates:

- lesson 1: intro video
- lesson 2: application article
- lesson 3: short quiz

## 16. Local Setup

### Environment variables

Root `.env.example`:

- `BACKEND_PORT=3000`
- `MONGODB_URI=mongodb://localhost:27017/bunat`
- `JWT_SECRET=change-me`
- `JWT_EXPIRES_IN=1d`
- `FRONTEND_URL=http://localhost:4200`
- `AI_SETTINGS_ENCRYPTION_KEY=change-me-too`

### Run flow

1. Start MongoDB:

```bash
docker compose up -d
```

2. Create env file:

```bash
cp .env.example .env
```

3. Run backend:

```bash
cd backend
npm install
npm run seed
npm run start:dev
```

4. Run frontend:

```bash
cd frontend
npm install
npm start
```

## 17. Guardrails And Non-Goals

- no SSR
- no payment or billing
- no external LMS integration
- no multi-tenant SaaS redesign
- no public SEO architecture
- no replacing Arabic-first UX with English-first defaults
- no removing current AI settings feature
- no collapsing `course_manager` into another role
- no replacing real REST integration with fake local mock data unless explicitly asked

## 18. Required Update Protocol For Future Sessions

Whenever a feature is added, changed, or removed, update this file before ending the session.

At minimum update the relevant parts of:

- section `4. Current Implemented Scope`
- section `8. Frontend Architecture`
- section `11. API Surface`
- section `12. Domain Model`
- section `13. Core Business Rules`
- section `14. AI Authoring Feature` if affected
- section `15. Seed Dataset Snapshot` if sample data changes
- section `19. Change Log`

If the change adds a new page, API, role rule, schema field, or business rule, it must be documented here.

## 19. Change Log

### 2026-05-13

- Replaced the old generic reuse notes with a canonical Bunat project spec.
- Updated the document to reflect the real current implementation.
- Captured the current role model including `course_manager`.
- Captured the AI settings and AI course draft feature.
- Captured final quiz, certificate, gamification, and reporting behavior.
- Added a mandatory update protocol for future sessions.
