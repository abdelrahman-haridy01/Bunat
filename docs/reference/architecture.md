# Architecture Reference

## Purpose

This document defines the architectural baseline that is worth carrying into a new project.

## Recommended structure

```text
src/app/
  core/
    constants/
    enums/
    layouts/
    services/
  features/
    <feature-name>/
  shared/
    components/
    constants/
    services/
    validations/
```

## Why this structure works

- `core`
  - application-wide foundations
- `features`
  - each business feature or top-level page owns its logic
- `shared`
  - reusable building blocks used across features

## What to reuse from the current project

- `MainLayout` as the application shell
- `Header` and `Footer` as independent shared UI pieces
- separation between app-wide services and feature services
- separated constants, messages, and shared validation rules

## Rules for the next project

- keep business logic out of layout code
- do not turn `shared` into a dumping ground
- each folder in `features` should map to a real product capability
- if a component is used by only one feature, keep it inside that feature

## Key decision

Adopt feature-based architecture from the start. Reorganizing into it later is expensive.
