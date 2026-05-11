# Design Reference

## Purpose

This document captures the UI and design decisions that are worth reusing regardless of project type.

## Design principles extracted from the current project

- build the UI in clear layers
- split pages into independent sections
- use a design system with controlled local customization
- treat responsive behavior as part of the design, not a late fix

## Theme tokens and color system

The current project already relies on design tokens exposed through the shared UI library and consumed in local styles via CSS variables. This should be documented and preserved as a pattern in the next project.

### Token model to keep

The next project should define and document tokens at these levels:

- brand tokens
- semantic UI tokens
- text tokens
- surface tokens
- border tokens
- state tokens
- focus tokens

### Recommended token categories

Use names similar to:

- brand
  - `--color-primary-default`
  - `--color-primary-sa-flag`
  - `--color-brand-light`
- text
  - `--color-display`
  - `--color-default`
  - `--color-primary-paragraph`
  - `--color-secondary-paragraph`
- surface
  - `--color-card`
  - `--color-neutral-50`
  - `--color-neutral-100`
  - `--color-body`
- border
  - `--color-neutral-200`
  - `--color-neutral-secondary`
  - `--color-field-border`
  - `--color-field-border-focus`
- state
  - `--color-success`
  - `--color-success-light`
  - `--color-info`
  - `--color-info-light`
  - `--color-error-default`
  - `--color-error-light`
- on-color
  - `--color-white`
  - `--color-link-oncolor`
  - `--color-oncolor-primary`

### Representative tokens already used in this project

The project currently uses token names such as:

- `--color-brand-light`
- `--color-primary-sa-flag`
- `--color-primary-default`
- `--color-display`
- `--color-default`
- `--color-primary-paragraph`
- `--color-secondary-paragraph`
- `--color-neutral-50`
- `--color-neutral-100`
- `--color-neutral-200`
- `--color-gray-200`
- `--color-card`
- `--color-link-oncolor`
- `--color-error-default`

Representative values currently provided by the UI library include:

- `--color-brand-light: rgb(243, 252, 246)`
- `--color-primary-sa-flag: rgb(20, 87, 58)`
- `--color-primary-default: rgb(27, 131, 84)`
- `--color-display: rgb(31, 42, 55)`
- `--color-default: rgb(22, 22, 22)`
- `--color-primary-paragraph: rgb(56, 66, 80)`
- `--color-secondary-paragraph: rgb(108, 115, 127)`
- `--color-neutral-50: rgb(249, 250, 251)`
- `--color-neutral-100: rgb(243, 244, 246)`
- `--color-neutral-200: rgb(229, 231, 235)`
- `--color-card: rgb(255, 255, 255)`
- `--color-error-default: rgb(180, 35, 24)`

### How the current project applies tokens

At the project level, tokens are already consumed in places such as:

- `src/styles.css`
  - `.icon-bg` uses `--color-brand-light`
  - `.text-primary` uses `--color-primary-sa-flag`
  - accordion borders use `--color-gray-200`
- page and component styles
  - section backgrounds often use `--color-brand-light`
  - action elements often use `--color-primary-default`
  - content text often uses `--color-display`, `--color-default`, and paragraph tokens
  - error messaging uses `--color-error-default`

### Recommended documentation rule for the next project

For the next project, document theme tokens explicitly in the design docs and keep them as the source of truth instead of scattering raw color values across components.

Prefer:

- semantic token usage in component CSS
- a single source for token definitions
- explicit mapping from brand colors to semantic UI roles

Avoid:

- hard-coded hex or rgb values in feature components unless justified
- mixing Tailwind utility colors and CSS variable tokens without a clear rule
- introducing one-off colors that bypass the token system

## Useful patterns

### Application shell

- `Header`
- main page content
- `Footer`

This pattern fits corporate sites, service portals, and content platforms.

### Section-based pages

Instead of building one oversized page, split it into sections such as:

- hero
- statistics
- content blocks
- forms
- banners

Benefits:

- faster development
- easier testing and iteration
- more flexible page composition

### Design system plus local CSS

For the next project, the preferred model is:

- a shared design system or UI library
- component-level styling
- a small and deliberate global stylesheet
- documented theme tokens for color, surfaces, borders, and states

## What should carry into the next project

- the shared layout pattern
- section-based page composition
- optimized image usage
- clear spacing and visual hierarchy
- semantic theme tokens and a documented color system

## What to be careful about

- do not put large amounts of behavior into global CSS
- do not let components depend on unclear styling side effects
- do not mix domain-specific components with generic UI primitives
- do not bypass the token system with arbitrary raw colors
