# Quality Reference

## Purpose

This document defines what "good quality" should mean when using the current project as a reference.

## Strong quality signals already present

- strict TypeScript settings
- `strictTemplates`
- `strictInjectionParameters`
- `OnPush` in important components
- basic unit test coverage
- explicit `loading / error / empty` states

## Minimum baseline for the next project

- local build works
- local tests work
- Node version is documented
- CI includes at least build and test
- basic accessibility review exists
- basic performance review exists for public pages

## Weak areas to improve in the next project

- many tests are still basic creation tests
- static image optimization is not fully consistent everywhere
- practical verification is currently blocked by a local dependency issue

## Current verification notes

The following commands were attempted:

- `npm run build:prod`
- `npm test -- --watch=false`

Both failed because installed dependencies do not match the current machine architecture, especially:

- `esbuild`
- `lightningcss`

## Short quality checklist

- is TypeScript strict
- does each data-driven page support loading, error, and empty states
- are key images optimized
- are forms testable
- are services typed
- does CI catch breakage early
- has accessibility been verified
