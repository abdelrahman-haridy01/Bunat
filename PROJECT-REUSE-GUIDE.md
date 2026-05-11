# Project Reuse Guide

## Purpose

This document captures what should be reused from `riyadh-frontend` when starting a new project. The goal is not to copy the current product as-is, but to reuse its best patterns in:

- design
- implementation
- quality
- reusable structure
- areas that need improvement before reuse

---

## 1. Current Project Summary

The current project is built with:

- Angular 21
- TypeScript strict mode
- SSR with `@angular/ssr` and `Express`
- Tailwind CSS 4
- `ksaa-dga-ui` as a UI library
- feature-based structure under `src/app/features`
- standalone components
- lazy loading with `loadComponent()`
- signals and `computed()` for local state
- a centralized SEO service
- client hydration after SSR
- multiple environments: `dev`, `beta`, `prod`

This makes it a strong reference for:

- corporate websites
- content platforms
- service portals
- multi-page web applications
- SEO-sensitive public websites

---

## 2. What Should Be Reused

### 2.1 Design Patterns

#### Layered UI composition

The project is organized around:

- a shared layout
- a fixed header and footer
- feature pages
- small page sections

This is worth reusing because it:

- improves reuse
- prevents oversized pages
- makes visual updates safer

#### Design system plus local styling

The project uses:

- reusable components from `ksaa-dga-ui`
- component-level CSS
- limited global styling in `src/styles.css`

This is a good model because it gives:

- visual consistency
- faster implementation
- room for product-specific customization

#### Section-based page structure

The home page is composed of independent sections such as:

- hero
- about
- statistics
- platforms
- banners
- supporting content sections

This pattern works for almost any project type because each section can be built, tested, and improved independently.

#### Responsive, optimized media

The project uses `NgOptimizedImage` in key places, plus optimized static assets such as `webp` images. This is worth reusing in any project that cares about:

- load speed
- Core Web Vitals
- mobile experience

---

### 2.2 Implementation Patterns

#### Clear project structure

The strongest reusable structure is:

- `core/`
  - foundational services
  - layout
  - shared app-level constants
  - enums and framework-level concerns
- `features/`
  - each business feature or top-level page in its own folder
- `shared/`
  - reusable components
  - validators
  - constants
  - shared services

This is a strong baseline for medium and large Angular applications.

#### Route-level lazy loading

`src/app/app.routes.ts` uses `loadComponent()` for most routes. This should be a default pattern in new projects because it:

- improves performance
- reduces initial bundle size
- isolates page concerns

#### Signals for local state

The project uses:

- `signal()`
- `computed()`

especially for:

- loading states
- error states
- dialog state
- derived values

This is a strong pattern for modern Angular because it keeps local state simple and explicit.

#### Single-responsibility services

Good examples in the project include:

- `SeoService`
- `SearchService`
- `RecaptchaService`
- `UserFeedbackService`

This is the pattern to reuse:

- one service, one responsibility
- UI logic stays in components
- API and integration logic stays in services

#### Isolated external integrations

Integrations such as:

- reCAPTCHA
- SEO metadata
- API access

are isolated in shared components or services. This is valuable because it:

- reduces duplication
- makes replacements easier later
- improves maintainability

#### SSR and SEO as first-class architecture

The project includes:

- SSR
- `robots.txt`
- `sitemap.xml`
- route metadata
- canonical URLs
- Open Graph tags
- Twitter cards
- JSON-LD

If the new project is public-facing, this should be treated as core architecture, not a late enhancement.

#### Centralized messages and constants

Files such as:

- `shared/constants/messages.ts`
- `shared/constants/patterns.ts`

are worth reusing as a pattern because they:

- avoid duplicated validation messages
- simplify content updates
- make localization easier later

---

### 2.3 Quality Patterns

#### Strict TypeScript and Angular settings

The project already uses:

- `strict: true`
- `noImplicitReturns`
- `noFallthroughCasesInSwitch`
- `strictTemplates: true`
- `strictInjectionParameters: true`

These should be carried into any new project without compromise.

#### `OnPush` change detection

Many important components already use `ChangeDetectionStrategy.OnPush`, which is good because it:

- improves performance
- reduces unnecessary checks
- encourages cleaner component design

#### Explicit UI states

The project uses:

- loading
- success
- empty
- error

This should be considered mandatory in any new UI flow that depends on data.

#### Structured forms with validation

The project uses:

- reactive forms in several areas
- validators
- explicit error messaging
- reCAPTCHA before submission

This pattern is suitable for:

- contact forms
- registration forms
- request forms
- feedback forms
- issue reporting flows

#### Test presence

The project includes `33` test files. That is a useful signal that testing exists, but for a new project the more important takeaway is:

- keep tests from the beginning
- expand beyond creation tests
- cover behavior, validation, and services

---

## 3. Reusable Building Blocks

These parts should be reused directly as patterns:

### Project structure

```text
src/app/
  core/
    constants/
    enums/
    layouts/
    services/
  features/
    home/
    about/
    contact/
    ...
  shared/
    components/
    constants/
    services/
    validations/
```

### Component standards

- components stay small and focused
- pages are composed from smaller sections
- services do not contain display logic
- local state uses `signal`
- derived state uses `computed`
- static images use `NgOptimizedImage`
- routing goes through Angular Router

### Page standards

Each page should have:

- its own route
- a clear title
- SEO metadata when needed
- loading state when needed
- error state
- empty state for data-driven pages
- at least a basic test

### Service standards

Each new service should have:

- a clear name
- one responsibility
- typed request and response models
- no coupling to display concerns

---

## 4. What Should Be Improved Before Reuse

### Standardize forms

The current codebase mixes:

- reactive forms
- template-driven forms in some simpler areas

For a new project, it is better to standardize on:

- reactive forms only

This improves consistency, testing, and maintainability.

### Improve test depth

Although the project has a decent number of test files, many are still simple creation tests.

The next project should add:

- behavior tests
- validator tests
- service tests
- user flow tests
- accessibility checks where possible

### Apply image optimization consistently

`NgOptimizedImage` is used in many important places, but not every static image follows the same standard.

In a new project:

- all eligible static images should use `NgOptimizedImage`

### Strengthen environment reliability

Practical verification showed that build and test execution currently fail because local dependencies do not match the machine architecture, especially:

- `esbuild`
- `lightningcss`

This means the next project should define from day one:

- the Node version
- dependency installation rules
- architecture consistency across machines
- a clean reinstall process when the environment changes

### Define CI quality gates early

The repository includes infrastructure files such as `azure-pipelines-beta.yml`, but the next project should explicitly define quality gates early:

- lint
- test
- build
- optional accessibility audit
- optional Lighthouse or performance checks

### Raise accessibility from guideline to gate

The project includes useful accessibility signals such as:

- `aria-label`
- `role="alert"`
- structured form markup

In the next project, accessibility should be enforced more formally through:

- AXE checks
- keyboard flow review
- contrast review
- decorative image review
- dialog and focus behavior review

---

## 5. How to Use This Project for Any New Project Type

### If the new project is a corporate website

Reuse:

- SSR
- route-level SEO
- global layout
- reusable sections
- contact form patterns
- sitemap and robots setup

### If the new project is a content or search platform

Reuse:

- lazy routes
- search/result patterns
- loading, empty, and error states
- dynamic metadata
- image optimization

### If the new project is a service portal or form-heavy application

Reuse:

- service isolation
- validators
- centralized messages
- dialog patterns
- reCAPTCHA wrapper pattern

### If the new project is general and not yet defined

Reuse these principles first:

- project structure
- separation of responsibilities
- signals for local state
- strict typing
- centralized SEO where needed
- reusable shared components
- early quality gates

---

## 6. Recommended Blueprint for the Next Project

### Phase 1: Architecture baseline

- create the Angular app with a clean structure
- enable strict mode
- prepare `core`, `features`, and `shared`
- set up the main layout
- configure routing with lazy loading
- create environment files

### Phase 2: Quality baseline

- verify local build
- set up unit tests
- document the Node version
- define CI
- document run and build commands

### Phase 3: UI baseline

- adopt a design system or UI kit
- define spacing, colors, and typography
- create reusable primitives
- support mobile behavior from the beginning

### Phase 4: Data and integration baseline

- typed services
- clear interfaces
- shared error handling
- standard loading patterns

### Phase 5: Performance and accessibility baseline

- AXE checks
- `NgOptimizedImage`
- `@defer` for non-critical content
- SEO support if the project is public

---

## 7. Quick Adoption Checklist

Adopt these from this project:

- feature-based architecture
- `core / features / shared` split
- standalone components
- route lazy loading
- signals and computed state
- strict TypeScript configuration
- centralized SEO service
- SSR when public visibility matters
- reusable feedback and dialog patterns
- centralized messages and validators

Improve these before using them as standards:

- test depth
- form standardization
- environment reliability
- automated accessibility checks
- CI quality gates

---

## 8. Executive Summary

The main value of this project is not in copying its pages or product-specific content. The value is in reusing:

1. a scalable architectural structure
2. a modern Angular implementation style based on lazy loading, signals, and isolated services
3. a solid quality baseline that should be strengthened further with better tests, environment stability, and accessibility enforcement

In practical terms:

- reuse the method
- rebuild the product-specific parts
- treat this repository as a strong starting reference, not a final template

---

## 9. Current Verification Notes

The project was reviewed through its structure, core files, routes, services, pages, and supporting logic.

Practical verification was attempted with:

- `npm run build:prod`
- `npm test -- --watch=false`

Both failed due to a local environment issue caused by dependency architecture mismatch, especially:

- `esbuild`
- `lightningcss`

So the conclusions in this guide are reliable for:

- architecture
- organization
- implementation patterns

But they are not yet fully confirmed by successful build and test execution on the current machine until the dependency installation is fixed.
