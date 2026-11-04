# 1. Template stack and project structure

- Status: accepted
- Date: 2026-11-04

## Context

We need a reusable, production-ready Next.js starter: typed, localized,
SEO-complete and secure by default, with a structure that scales without
over-engineering.

## Decision

- **Next.js 16 App Router + React 19 + TypeScript (strict)**.
- **Layered structure**: `app/` (routing only), `services/` (business logic),
  `lib/` (pure helpers), `components/ui` (shadcn), `hooks/`, `types/`, `config/`.
  Feature-slicing is deferred until the app is large enough to need it.
- **i18n via next-intl**, locales `cs` (default) + `en`, `localePrefix: "always"`
  (`/cs`, `/en`), locale detection on.
- **Styling**: Tailwind CSS v4 + shadcn/ui (`base-nova`).
- **SEO**: per-locale metadata (OG/Twitter/hreflang) + dynamic `robots`,
  `sitemap`, `manifest`.
- **Security headers** (CSP, HSTS, frame, nosniff, referrer, permissions) on
  every response via `next.config.ts`.
- **Env** validated with `@t3-oss/env-nextjs` + zod.
- **Testing**: all tests under `specs/` — Vitest `specs/unit` (mirrors `src/`) +
  Vitest `specs/integration` + Playwright `specs/e2e`.
- **Tooling**: ESLint flat + Prettier, Husky + lint-staged, GitHub Actions CI.

## Consequences

- Business logic stays testable and decoupled from React.
- Every test type has one home under `specs/`; `specs/unit` mirrors `src/`.
- Tightening the CSP for third-party origins is a conscious, explicit step.
