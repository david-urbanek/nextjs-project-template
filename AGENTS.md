# AGENTS.md

Guidance for AI agents and developers working in this repository. `CLAUDE.md`
points here — this file is the single source of truth.

## Stack

| Concern         | Choice                                            |
| --------------- | ------------------------------------------------- |
| Framework       | Next.js 16 (App Router), React 19                 |
| Language        | TypeScript (strict)                               |
| Styling         | Tailwind CSS v4 + shadcn/ui (`base-nova`, lucide) |
| i18n            | next-intl — locales `cs` (default) + `en`         |
| Env validation  | `@t3-oss/env-nextjs` + zod                        |
| Unit tests      | Vitest + Testing Library (jsdom)                  |
| E2E tests       | Playwright                                        |
| Lint / format   | ESLint (flat config) + Prettier                   |
| Package manager | pnpm                                              |

## Commands

```bash
pnpm dev           # start dev server (Turbopack)
pnpm build         # production build
pnpm start         # serve production build
pnpm lint          # ESLint
pnpm typecheck     # tsc --noEmit
pnpm test          # Vitest (unit, run once)
pnpm test:watch    # Vitest watch mode
pnpm test:e2e      # Playwright e2e
pnpm format        # Prettier write
```

## Project structure

```
src/
  app/
    [locale]/              # locale-scoped routes (/cs/..., /en/...)
      layout.tsx           # root <html>, fonts, metadata, intl provider
      page.tsx             # home page
      not-found.tsx        # localized 404
    not-found.tsx          # global catch -> redirects to default locale
    robots.ts              # /robots.txt
    sitemap.ts             # /sitemap.xml (with hreflang alternates)
    manifest.ts            # /manifest.webmanifest
    icon.svg               # placeholder app icon (replace)
    favicon.ico            # placeholder favicon (replace)
    globals.css            # Tailwind + theme tokens
  components/
    ui/                    # shadcn/ui primitives (generated, editable)
    locale-switcher.tsx    # shared app component example
  services/                # BUSINESS LOGIC + data access (no React/UI)
  lib/                     # pure, stateless helpers (e.g. cn)
  hooks/                   # shared React hooks
  config/                  # app/brand/SEO config (site.ts)
  i18n/                    # routing, navigation, request config
  types/                   # shared TypeScript types
  env.ts                   # validated environment variables
  proxy.ts                 # next-intl locale routing (Next 16 proxy convention)
messages/                  # cs.json, en.json (translation catalogs)
specs/
  integration/             # Vitest cross-module / contract tests
  e2e/                     # Playwright browser tests
docs/                      # architecture notes + ADRs (docs/adr/)
```

Unit tests are colocated with source as `*.test.{ts,tsx}`.

### Where code goes

- **`services/`** — domain/business logic and data access (API/DB clients).
  Framework-agnostic and unit-tested. Components call services, never the reverse.
- **`lib/`** — pure, stateless utility functions only. No domain knowledge.
- **`components/ui/`** — shadcn primitives. Add via the CLI, then customize.
- **`app/`** — routing, layouts and pages only; keep logic in `services`/`lib`.
- **`config/site.ts`** — brand/SEO values consumed by metadata, sitemap,
  robots and manifest. Edit here, not in individual files.

## i18n

- Locales declared in `src/i18n/routing.ts` (`cs`, `en`; default `cs`).
- `localePrefix: "always"` — every URL is prefixed (`/cs/...`, `/en/...`).
- Add a translation key to **both** `messages/cs.json` and `messages/en.json`.
- Read strings with `useTranslations` (client) / `getTranslations` (server).
- Use `Link`, `useRouter`, `redirect` from `@/i18n/navigation` for locale-aware
  navigation — never the bare `next/navigation` equivalents in UI.
- Server components rendering a localized route call `setRequestLocale(locale)`.
- Visiting `/` redirects to a prefixed route, choosing the locale from the
  browser's `Accept-Language` (next-intl locale detection). Set
  `localeDetection: false` in `routing.ts` to always use the default locale.

## SEO & production

- Metadata (title template, description, Open Graph, Twitter, canonical +
  hreflang alternates) is generated per-locale in `app/[locale]/layout.tsx`.
- `robots.ts`, `sitemap.ts`, `manifest.ts` are dynamic — add new route paths to
  the `paths` array in `sitemap.ts`.
- Security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
  Referrer-Policy, Permissions-Policy) are set for every response in
  `next.config.ts`. Extend the CSP when adding external origins.
- Replace `src/app/icon.svg` and `src/app/favicon.ico` with real brand assets.

## Environment

- All env access goes through `src/env.ts` (validated with zod, fails fast).
- Never read `process.env.*` directly in app code — import `env` instead.
- Document new variables in `.env.example`.

## Conventions

- Add a shadcn component: `pnpm dlx shadcn@latest add <name>`.
- Keep business logic out of components; put it in `services/` and unit-test it.
- Prettier + ESLint run on commit via Husky + lint-staged.

## Skills

Agent skills are vendored under `.agents/skills/` so they travel with the repo
(`.claude/skills/` symlinks them for Claude Code). The set includes `better-ui`
and `better-layout` plus the full `mattpocock/skills` engineering + writing
collection, pinned in `skills-lock.json`.

Stack-specific skills also vendored for this template:

- `vercel-react-best-practices` — React/Next.js performance rules (RSC, bundle
  size, waterfalls, re-render) used when writing or reviewing React/Next code.
- `security-audit` — security review scoped to this stack: CSP/headers in
  `next.config.ts`, env via `src/env.ts`, server actions, dependency audit.
- `frontend-design` — distinctive visual design direction (typography, palette,
  layout) when building or restyling UI.
- `shadcn` — add/search/fix/style shadcn components and registries.

- Update: `npx skills update`
- Add more: `npx skills add <owner/repo@skill>`

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
