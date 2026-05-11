# Migration Plan

## Purpose

This document describes what should be moved from the current project, what should be rebuilt, and in what order.

## Move first

- the architecture
- `tsconfig` standards
- the `core / features / shared` split
- routing patterns
- service layer patterns

## Rebuild instead of copying directly

- page content
- visual branding
- colors and product identity
- any component tightly coupled to the Riyadh Dictionary domain

## Reuse as patterns

- layout pattern
- SEO and SSR pattern
- form handling pattern
- service layer pattern
- dialog and feedback pattern

## Adoption plan in 5 steps

1. Create the new project with a clean structure only.
2. Move the general standards before moving components.
3. Create shared primitives instead of copying domain-specific components.
4. Rebuild only the pages that the new product actually needs.
5. Enable quality checks early: build, tests, accessibility, and performance.

## Key decision

If a part needs heavy cleanup before reuse, do not copy it. Rebuild it more cleanly.
