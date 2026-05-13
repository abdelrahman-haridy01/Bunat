# Bunat / بُناة

Arabic-first internal employee training and development MVP built as:

- `backend/`: NestJS + MongoDB + Mongoose + JWT
- `frontend/`: Angular standalone app + RTL UI + real REST API integration

## What is included

- JWT authentication with role-aware routing
- Employee dashboard, course tracking, lesson completion, points, levels, badges
- Manager dashboard with team oversight, top performers, and support-needed view
- Admin/HR dashboard with user, course, KPI, and assignment management
- MongoDB seed script with realistic Arabic sample data
- `docker-compose.yml` for local MongoDB
- strict TypeScript configuration on both apps

## Project structure

```text
.
├── backend
│   ├── src
│   │   ├── auth
│   │   ├── common
│   │   ├── courses
│   │   ├── departments
│   │   ├── enrollments
│   │   ├── gamification
│   │   ├── kpis
│   │   ├── learning-paths
│   │   ├── lessons
│   │   ├── performance-records
│   │   ├── reports
│   │   ├── seed
│   │   ├── skills
│   │   ├── teams
│   │   └── users
│   └── package.json
├── frontend
│   ├── src
│   │   ├── app
│   │   │   ├── core
│   │   │   ├── features
│   │   │   └── shared
│   │   └── environments
│   └── package.json
├── docker-compose.yml
└── .env.example
```

## Local setup

### 1. Start MongoDB

```bash
docker compose up -d
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Install and run backend

```bash
cd backend
npm install
npm run seed
npm run start:dev
```

Backend runs on `http://localhost:3000/api`.

### 4. Install and run frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:4200`.

## Seeded accounts

All seeded accounts use:

```text
Password123!
```

Available users:

- `admin@bunat.local` — Admin
- `hr@bunat.local` — HR
- `manager@bunat.local` — Manager
- `content@bunat.local` — Course Manager
- `manager.lang@bunat.local` — Manager
- `manager.culture@bunat.local` — Manager
- `manager.tech@bunat.local` — Manager
- `employee1@bunat.local` — Employee
- `employee2@bunat.local` — Employee
- `employee3@bunat.local` — Employee
- `employee4@bunat.local` — Employee
- `employee5@bunat.local` — Employee
- `employee6@bunat.local` — Employee
- `employee7@bunat.local` — Employee
- `employee8@bunat.local` — Employee
- `employee9@bunat.local` — Employee

## Main backend endpoints

- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `GET /api/courses`
- `GET /api/courses/:id`
- `GET /api/courses/:courseId/lessons`
- `POST /api/lessons/:id/complete`
- `GET /api/enrollments/my`
- `GET /api/enrollments/team`
- `POST /api/enrollments/assign`
- `GET /api/kpis`
- `POST /api/performance-records`
- `GET /api/gamification/me`
- `GET /api/reports/manager-dashboard`
- `GET /api/reports/admin-dashboard`

## Main frontend routes

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

## Business rules implemented

- Completing a lesson creates or updates `LessonProgress`
- First completion of a lesson awards `+10` points
- Completing all required lessons marks the enrollment complete and awards `+100` points
- KPI target achievement through `PerformanceRecord` awards `+150` points
- User level is updated from total points after each points transaction
- Points-based badges are auto-evaluated during gamification updates

## Assumptions

- `hr` is kept as a distinct role from `admin`, although admin pages are shared
- Charts are represented with lightweight KPI cards and progress visuals instead of an external chart library in this MVP
- Lesson content uses URL or inline HTML placeholders rather than file upload flows
- Learning paths are modeled in the backend and seeded, but the primary admin UI in this MVP focuses on direct course assignment

## Reference alignment

Applied from local references:

- Angular feature-based structure: `core / features / shared`
- standalone components and route-level lazy loading
- typed single-responsibility API services
- semantic theme tokens and explicit loading/empty states

Intentional deviation:

- The reference material includes SSR/SEO guidance for public websites. This MVP uses CSR only because Bunat is an internal tool and the main brief explicitly says SEO does not matter.

## Verification note

The workspace did not include installed dependencies, so I could not run `npm install`, build, or test commands inside this session. The implementation is wired for those commands and should be verified locally after dependency installation.
