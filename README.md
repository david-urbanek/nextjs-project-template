# Next.js Project Template

Production-ready Next.js starter: App Router + TypeScript, i18n (`cs`/`en`),
Tailwind + shadcn/ui, full SEO, security headers, env validation and a complete
test + CI setup.

## Stack

Next.js 16 · React 19 · TypeScript (strict) · Tailwind v4 · shadcn/ui ·
next-intl · Vitest · Playwright · ESLint + Prettier · pnpm

## Prerequisites

- **Node.js 20+**
- **pnpm** (`corepack enable` or `npm i -g pnpm`)

## Quick start

```bash
# 1. Use this template (or clone it)
git clone <your-repo-url> my-app
cd my-app

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
# edit .env.local — set NEXT_PUBLIC_SITE_URL

# 4. Start the dev server
pnpm dev
```

Open **http://localhost:3000** — you'll be redirected to a localized route
(`/cs` or `/en`, based on your browser language).

## Scripts

| Command           | Description                 |
| ----------------- | --------------------------- |
| `pnpm dev`        | Dev server (Turbopack)      |
| `pnpm build`      | Production build            |
| `pnpm start`      | Serve the production build  |
| `pnpm lint`       | ESLint                      |
| `pnpm typecheck`  | `tsc --noEmit`              |
| `pnpm test`       | Vitest (unit + integration) |
| `pnpm test:watch` | Vitest watch mode           |
| `pnpm test:e2e`   | Playwright e2e              |
| `pnpm format`     | Prettier write              |

First Playwright run only: `pnpm exec playwright install chromium`.

## Project structure

```
src/
  app/[locale]/    # localized routes (/cs, /en)
  services/        # business logic + data access
  lib/ hooks/      # pure helpers / shared hooks
  components/ui/   # shadcn primitives
  i18n/ config/    # routing + brand/SEO config
  env.ts proxy.ts  # validated env + locale middleware
messages/          # cs.json, en.json
specs/             # unit / integration / e2e tests
docs/              # architecture + ADRs
```

See [`AGENTS.md`](./AGENTS.md) for conventions and [`docs/`](./docs) for
architecture and decision records.

## Before going to production

- Set a real `NEXT_PUBLIC_SITE_URL` in your deploy environment.
- Replace `src/app/icon.svg` and `src/app/favicon.ico` with brand assets.
- Edit `src/config/site.ts` (name, Twitter handle).
- Tighten the CSP in `next.config.ts` for any third-party origins you add.

## Deployment

Deploys cleanly to any Node host or [Vercel](https://vercel.com/new). Ensure
`NEXT_PUBLIC_SITE_URL` is set in the environment so metadata, sitemap and robots
resolve to absolute URLs.

```
pnpm build && pnpm start
```
