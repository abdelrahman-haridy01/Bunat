# Bunat Project Full Prompt

Use this prompt as the final implementation brief for the Bunat MVP.

---

## Prompt

You are a senior full-stack engineer and system designer.

Build an MVP for an internal employee training and development system named "Bunat / بُناة".

Before generating implementation files, review and use the local project references in:
- ./docs/reference
- ./reference-snippets

Treat them as project guidance and implementation context when relevant. If they conflict with the main brief, follow the main brief and note the conflict briefly.

## Project overview

- Project name: `Bunat / بُناة`
- One-line idea: Internal employee training and development platform that links learning activity to measurable KPI improvement, gamification, and manager insights
- Project type: Internal tool / web app, not public SaaS
- Primary audience: Employees, managers, and HR/admin teams inside one organization
- Main business goal: Improve employee capability development and connect training outcomes to performance KPIs
- Core user problem to solve: Teams need one internal system to assign training, track progress, measure KPI impact, and reward engagement without relying on disconnected tools

Build the project correctly from the beginning using a scalable, maintainable, production-ready MVP approach.

## Product context

- Project summary:
  Bunat is an Arabic-first internal platform for employee learning and development. It should connect training content, course completion, KPI improvement, points, levels, badges, and manager reporting in one system with role-based dashboards for employees, managers, and HR/admin users.

- Main features:
  - JWT authentication with seeded employee, manager, admin, and HR users
  - Employee dashboard with assigned courses, progress, points, level, badges, and KPI improvement summary
  - Manager dashboard with team performance, training completion, KPI progress, top performers, and support-needed views
  - Admin/HR tools for managing users, departments, teams, courses, lessons, learning paths, KPIs, and assignments

- Nice-to-have features:
  - Simple charts for dashboards
  - Badge auto-awarding on KPI and milestone achievements
  - Learning-path based assignment flows in addition to direct course assignment

- Pages or major routes:
  - `/login`
  - `/employee/dashboard`, `/employee/courses`, `/employee/courses/:id`, `/employee/progress`
  - `/manager/dashboard`, `/manager/team`, `/manager/employees/:id`
  - `/admin/dashboard`, `/admin/users`, `/admin/courses`, `/admin/kpis`, `/admin/assignments`

- User flows that matter most:
  - User logs in, lands on the correct role-based dashboard, and views relevant progress and KPI insights
  - Admin creates courses, lessons, learning paths, and KPIs, then assigns courses to employees
  - Employee completes lessons and courses, which updates enrollment progress, points, levels, badges, and KPI-linked reports

## Technical direction

- Preferred frontend framework: Angular latest stable with standalone components and TypeScript
- Preferred backend framework: NestJS with TypeScript
- Database: MongoDB using Mongoose via `@nestjs/mongoose`
- Authentication: JWT-based authentication
- Rendering mode: CSR
- Does SEO matter: No
- Does accessibility matter as a release gate: Yes
- Expected scale: Medium
- Expected lifetime: Long-term internal product

- Sources to align with:
  - Angular standalone components: `https://angular.dev/guide/components`
  - Angular version compatibility: `https://angular.dev/reference/versions`
  - NestJS MongoDB/Mongoose: `https://docs.nestjs.com/techniques/mongodb`
  - NestJS authentication/JWT: `https://docs.nestjs.com/security/authentication`

## Design direction

- Brand personality:
  Practical, trustworthy, institutional, motivating, and performance-oriented

- Visual direction:
  Clean corporate/government-style Arabic-first interface

- Color direction:
  Calm professional colors suitable for internal enterprise use, with clear semantic status colors and strong contrast

- Typography direction:
  Arabic-first typography with good RTL readability and clean dashboard presentation

- UI tone:
  Formal, clear, and professional

- References or inspiration:
  - Internal enterprise dashboard UX patterns
  - Government/corporate Arabic admin panels
  - Clean KPI and reporting interfaces with cards, tables, progress bars, and simple charts

## Constraints

- Deadline or timeline:
  Build as an MVP with functional end-to-end flows before any advanced features

- Team size:
  Assume a small engineering team

- Must-use libraries or systems:
  - Angular latest stable with standalone components and Angular `HttpClient`
  - NestJS modules with `@nestjs/mongoose`, MongoDB, DTO validation, guards, decorators, and JWT auth

- Forbidden choices:
  - Do not add AI recommendations yet
  - Do not add payment, SaaS billing, or external LMS integrations

- Integration requirements:
  - Real REST API integration between Angular frontend and NestJS backend
  - JWT auth with role-based access control
  - No CMS requirement for MVP
  - No analytics integration requirement beyond internal KPI and reporting data

## Quality requirements

The project must be built with:

- clear architecture
- strict typing
- reusable components
- scalable folder structure
- semantic theme tokens
- responsive design
- strong accessibility
- clear loading, error, success, and empty states
- testable services and forms
- production-ready build setup
- simple, maintainable code with clear naming
- comments only when useful

## System requirements

### Roles

1. Employee
2. Manager
3. HR/Admin

### Core MVP features

1. Authentication
   - Login page
   - JWT access token
   - Role-based access control
   - Seed users for employee, manager, admin

2. Employee dashboard
   - Assigned courses
   - Progress percentage
   - Current points
   - Current level
   - Earned badges
   - KPI improvement summary

3. Manager dashboard
   - Team members list
   - Training completion per employee
   - KPI progress per employee
   - Top performers
   - Employees who need support

4. Admin/HR dashboard
   - Manage users
   - Manage departments and teams
   - Create/edit courses
   - Create lessons
   - Create learning paths
   - Create KPIs
   - Assign courses to employees

5. Courses
   - Course title, description, difficulty, duration
   - Course linked to skills and KPIs
   - Lessons inside each course
   - Lesson types: video, article, pdf, quiz placeholder
   - Mark lesson as completed

6. Enrollments
   - Assign course to user
   - Track status: `not_started`, `in_progress`, `completed`
   - Track `progressPercentage`
   - `startedAt`, `completedAt`, `dueDate`

7. KPI tracking
   - Define KPI
   - Attach KPI to course
   - Store `beforeValue` and `afterValue`
   - Calculate `improvementPercentage`
   - Show KPI impact in dashboard

8. Gamification
   - Points transactions
   - Complete lesson = `+10` points
   - Complete course = `+100` points
   - KPI achieved = `+150` points
   - Levels based on total points
   - Badges collection and user badges

## Backend requirements

Create a NestJS app with these modules:

- `auth`
- `users`
- `departments`
- `teams`
- `skills`
- `courses`
- `lessons`
- `learning-paths`
- `enrollments`
- `kpis`
- `performance-records`
- `gamification`
- `reports`
- `seed`

### MongoDB collections / schemas

`User`
- `fullName: string`
- `email: string` unique
- `passwordHash: string`
- `jobTitle: string`
- `departmentId: ObjectId`
- `teamId: ObjectId`
- `managerId: ObjectId | null`
- `role: employee | manager | admin | hr`
- `status: active | inactive`
- `pointsTotal: number`
- `levelId: ObjectId | null`
- `createdAt`, `updatedAt`

`Department`
- `name`
- `description`
- `managerId`

`Team`
- `name`
- `departmentId`
- `managerId`
- `members: ObjectId[]`

`Skill`
- `name`
- `category`
- `description`
- `level: beginner | intermediate | advanced`

`Kpi`
- `name`
- `description`
- `metricType: number | percentage | score | boolean`
- `direction: increase | decrease`
- `targetValue`
- `unit`
- `departmentId | null`
- `roleTarget | null`

`Course`
- `title`
- `description`
- `skillIds: ObjectId[]`
- `kpiIds: ObjectId[]`
- `difficulty: beginner | intermediate | advanced`
- `estimatedDurationMinutes`
- `status: draft | published | archived`
- `createdBy`

`Lesson`
- `courseId`
- `title`
- `contentType: video | article | pdf | quiz | task`
- `contentUrl | null`
- `contentHtml | null`
- `order`
- `durationMinutes`
- `isRequired`

`LearningPath`
- `title`
- `description`
- `targetRole`
- `departmentId | null`
- `courseIds: ObjectId[]`
- `skillIds: ObjectId[]`
- `kpiIds: ObjectId[]`
- `status: active | inactive`
- `createdBy`

`Enrollment`
- `userId`
- `courseId`
- `learningPathId | null`
- `assignedBy`
- `status: not_started | in_progress | completed | failed`
- `progressPercentage`
- `startedAt | null`
- `completedAt | null`
- `dueDate | null`

`LessonProgress`
- `userId`
- `courseId`
- `lessonId`
- `status: not_started | completed`
- `completedAt | null`
- `timeSpentMinutes`

`PerformanceRecord`
- `userId`
- `kpiId`
- `courseId | null`
- `learningPathId | null`
- `beforeValue`
- `afterValue`
- `improvementPercentage`
- `measuredAt`
- `measuredBy`
- `notes`

`PointsTransaction`
- `userId`
- `sourceType: course_completed | lesson_completed | quiz_passed | kpi_achieved | badge_awarded`
- `sourceId`
- `points`
- `description`
- `createdAt`

`Level`
- `name`
- `minPoints`
- `maxPoints`
- `icon`
- `order`

`Badge`
- `name`
- `description`
- `icon`
- `criteriaType: course | kpi | points | streak`
- `criteriaValue`
- `pointsReward`

`UserBadge`
- `userId`
- `badgeId`
- `awardedAt`
- `awardedBy | null`

### API endpoints

`Auth`
- `POST /auth/login`
- `GET /auth/me`

`Users`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PATCH /users/:id`
- `DELETE /users/:id`

`Courses`
- `GET /courses`
- `GET /courses/:id`
- `POST /courses`
- `PATCH /courses/:id`
- `DELETE /courses/:id`

`Lessons`
- `GET /courses/:courseId/lessons`
- `POST /lessons`
- `PATCH /lessons/:id`
- `POST /lessons/:id/complete`

`Enrollments`
- `GET /enrollments/my`
- `GET /enrollments/team`
- `POST /enrollments/assign`
- `PATCH /enrollments/:id`

`KPIs`
- `GET /kpis`
- `POST /kpis`
- `PATCH /kpis/:id`
- `POST /performance-records`

`Gamification`
- `GET /gamification/me`
- `GET /gamification/leaderboard`
- `POST /gamification/award-points`

`Reports`
- `GET /reports/employee/:userId`
- `GET /reports/team/:teamId`
- `GET /reports/manager-dashboard`
- `GET /reports/admin-dashboard`

## Frontend requirements

Build the frontend as an Angular app using standalone components, RTL layout, Arabic labels by default, route guards by role, `HttpClient`, and mock-friendly services connected to the real API.

### Routes

- `/login`
- `/employee/dashboard`
- `/employee/courses`
- `/employee/courses/:id`
- `/employee/progress`
- `/manager/dashboard`
- `/manager/team`
- `/manager/employees/:id`
- `/admin/dashboard`
- `/admin/users`
- `/admin/courses`
- `/admin/kpis`
- `/admin/assignments`

### Shared components

- `AppShellComponent`
- `SidebarComponent`
- `HeaderComponent`
- `StatCardComponent`
- `ProgressBarComponent`
- `BadgeComponent`
- `LevelCardComponent`
- `EmptyStateComponent`
- `DataTableComponent`

### Employee components

- `EmployeeDashboardComponent`
- `AssignedCoursesComponent`
- `CourseDetailsComponent`
- `MyProgressComponent`

### Manager components

- `ManagerDashboardComponent`
- `TeamOverviewComponent`
- `EmployeePerformanceComponent`
- `TopPerformersComponent`
- `NeedsSupportComponent`

### Admin components

- `AdminDashboardComponent`
- `UsersManagementComponent`
- `CoursesManagementComponent`
- `KpiManagementComponent`
- `AssignTrainingComponent`

### UI requirements

- Arabic labels
- RTL direction
- Clean government/corporate style
- Cards, tables, progress bars, simple charts
- Responsive layout
- Route guards based on role
- Store JWT in `localStorage` for MVP

## Seed data

Create a seed script that inserts:

- `1` admin
- `1` manager
- `5` employees
- `2` departments
- `2` teams
- `5` skills
- `5` KPIs
- `6` courses
- lessons for each course
- `3` levels
- `5` badges
- enrollments for employees
- sample performance records
- sample points transactions

## Important business rules

- When an employee completes a lesson:
  - create `LessonProgress`
  - add `+10` points
  - update enrollment progress

- When all required lessons in a course are completed:
  - mark enrollment completed
  - add `+100` points

- When performance `afterValue` meets KPI `targetValue`:
  - add `+150` points
  - optionally award a badge

- Level should always be calculated from `pointsTotal`

## Deliverables

1. Working backend NestJS app
2. Working Angular frontend app
3. MongoDB schemas
4. DTOs with validation
5. Guards and decorators for roles
6. Seed script
7. `README` with setup commands
8. `.env.example`
9. Basic error handling
10. Clean folder structure
11. `docker-compose.yml` for MongoDB

## Commands expected

### Backend

- `npm install`
- `npm run start:dev`
- `npm run seed`

### Frontend

- `npm install`
- `ng serve`

## Implementation constraints

- Keep code simple and maintainable
- Avoid overengineering
- Use clear naming
- Add comments only when useful
- Make the MVP functional before adding advanced features
- Do not add AI recommendations yet
- Do not add payment or SaaS billing
- Do not add external LMS integrations

## What I want from you

Generate the full project structure and implementation files.

Start with backend, then frontend, then README.

The result should be practical and implementation-ready, not a high-level essay. Use the requirements above to make concrete architectural and coding decisions. Where needed, create reasonable defaults that fit an internal Arabic-first enterprise MVP and explicitly note any assumptions.

## Output format

Produce the work in this order:

1. Backend
2. Frontend
3. README

For the backend and frontend, provide:

- concrete folder structure
- implementation files
- DTOs, schemas, services, controllers, guards, and routing setup where relevant
- validation rules
- clean naming and maintainable organization

If any requirement is incomplete or ambiguous, choose the best MVP default and state it briefly before implementing.
