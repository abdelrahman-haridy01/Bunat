# Service Pattern

## Purpose

Reference for building a clean and maintainable service layer.

## What to reuse from the current project

- `providedIn: 'root'`
- `inject(HttpClient)`
- typed request and response interfaces
- single-responsibility services

## What should not be copied directly

- current endpoint names
- current domain-specific payloads
- business rules tied to the existing product

## Rule

A service should be:

- small
- typed
- clearly scoped
- independent from display concerns
