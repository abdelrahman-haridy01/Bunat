# Reference Hub

This directory is the entry point for reusing the best parts of the current project in any new project.

## How to use this folder

- Start here.
- Read the main guide first: [PROJECT-REUSE-GUIDE.md](/Users/abdelrahmanharidy/Documents/GitHub/riyadh-frontend/PROJECT-REUSE-GUIDE.md)
- Then use the focused documents below depending on the decision you are making.

## Contents

- [architecture.md](</Users/abdelrahmanharidy/Documents/GitHub/riyadh-frontend/docs/reference/architecture.md>)
  - project structure, responsibility split, `core / features / shared`
- [design.md](</Users/abdelrahmanharidy/Documents/GitHub/riyadh-frontend/docs/reference/design.md>)
  - UI principles, layout, sections, design system, responsive behavior
- [implementation.md](</Users/abdelrahmanharidy/Documents/GitHub/riyadh-frontend/docs/reference/implementation.md>)
  - Angular patterns, signals, routing, services, forms, SSR and SEO
- [quality.md](</Users/abdelrahmanharidy/Documents/GitHub/riyadh-frontend/docs/reference/quality.md>)
  - code quality, testing, performance, accessibility, current risks
- [migration-plan.md](</Users/abdelrahmanharidy/Documents/GitHub/riyadh-frontend/docs/reference/migration-plan.md>)
  - what to move first, what to rebuild, and how to adopt the patterns

## Recommended structure when moved into a new project

```text
docs/
  reference/
    README.md
    architecture.md
    design.md
    implementation.md
    quality.md
    migration-plan.md
reference-snippets/
  README.md
  layout-pattern/
  seo-ssr-pattern/
  form-pattern/
  service-pattern/
```

## Working rule

- reuse the method first, not the code first
- do not copy anything into the new project until you decide:
  - whether it is truly reusable
  - whether it is domain-specific
  - whether it should be simplified before reuse
