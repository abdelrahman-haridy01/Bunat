# Implementation Reference

## Purpose

This document summarizes the implementation patterns from the current Angular project that are worth reusing.

## Routing

Prefer:

- `loadComponent()` for page routes
- route metadata
- route-level SEO where relevant

Benefits:

- lazy loading
- page isolation
- easier metadata management

## State management

Use for local state:

- `signal()`
- `computed()`

Use RxJS where the problem is actually stream-based, not as a default for everything.

## Services

Carry this principle forward:

- one service, one responsibility
- network logic belongs in services
- external integrations stay isolated
- components orchestrate UI, not infrastructure

## Forms

Recommended standard for the next project:

- `ReactiveFormsModule`
- centralized validators when useful
- shared error message conventions
- reusable wrappers for external verification such as reCAPTCHA

## SEO and SSR

If the new project is public-facing, keep:

- a centralized `SeoService`
- route metadata
- SSR
- `robots.txt`
- `sitemap.xml`
- canonical URLs, Open Graph, Twitter cards, and JSON-LD

## Performance patterns

Reuse:

- `NgOptimizedImage`
- `@defer` for non-critical content
- `OnPush`
- lazy routes

## Working rule

If a pattern does not clearly improve performance, maintainability, or clarity, do not carry it over automatically.
