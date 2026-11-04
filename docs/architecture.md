# Architecture

## Overview

Production Next.js (App Router) template. Requests flow:

```
request
  -> src/proxy.ts            # next-intl: detect/redirect locale, rewrite
  -> src/app/[locale]/...    # localized routes (RSC)
     -> services/            # business logic + data access (no React)
     -> components/          # presentation (ui/ = shadcn primitives)
  -> next.config.ts headers  # security headers on every response
```

## Layers

- **`app/`** — routing, layouts, pages, metadata and file-based SEO routes
  (`robots.ts`, `sitemap.ts`, `manifest.ts`). No business logic.
- **`services/`** — framework-agnostic domain logic and data access. Unit-tested.
- **`lib/`** — pure, stateless helpers (no domain knowledge).
- **`components/`** — presentation; `components/ui/` holds shadcn primitives.
- **`i18n/`** — next-intl routing/navigation/request config; catalogs in
  `messages/`.
- **`config/`**, **`env.ts`** — brand/SEO config and validated environment.

## Boundaries

- Components call services; services never import components.
- App code reads env only through `src/env.ts` (validated, fails fast).
- UI navigation uses the locale-aware helpers from `@/i18n/navigation`.

See `adr/` for the decisions behind these choices.
