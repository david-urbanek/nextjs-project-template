---
name: security-audit
description: Security audit for this Next.js 16 / React 19 template. Use when reviewing code for vulnerabilities, hardening headers/CSP, auditing env/secret handling, checking server actions and route handlers, or before shipping. Covers CSP in next.config.ts, env via src/env.ts, dependency audit, and client-bundle secret leakage.
---

# Security Audit

Evidence-first security review scoped to this repo's stack (Next.js 16 App Router,
React 19 Server Components, next-intl, zod env, pnpm). Report findings as
`severity — file:line — issue — fix`. Only report what you verified by reading
code; mark inferences `[INFERENCE]`.

## Process

Run the passes below in order. Each pass lists what to grep/read and the failure
it catches. Finish with a prioritized findings table.

### 1. CSP & security headers (`next.config.ts`)

- Headers live in `securityHeaders`, applied to `/:path*` via `headers()`.
- Verify every external origin the app talks to (analytics, fonts, image CDN,
  API) is reflected in the matching CSP directive (`script-src`, `style-src`,
  `img-src`, `font-src`, `connect-src`, `frame-src`). A new `<script>`,
  `fetch()`, or remote image with no CSP entry is a finding.
- `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'` must stay.
- Flag any widening of `script-src`/`style-src` beyond `'unsafe-inline'`/
  `'unsafe-eval'` (already needed by Next runtime); recommend nonces if a
  stricter policy is required.
- Confirm HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy` are present and not weakened.

### 2. Environment & secrets (`src/env.ts`, `.env*`)

- All env access MUST go through `src/env.ts` (validated with zod). Grep for
  direct `process.env.` outside `src/env.ts` and config files — each is a finding.
- Any secret (API key, DB URL, token) MUST be a **server** var in `env.ts`, never
  under `NEXT_PUBLIC_*`. `NEXT_PUBLIC_*` values are inlined into the client
  bundle — treat them as public.
- `.env*` files (except `.env.example`) must be gitignored. New vars must be
  documented in `.env.example` with no real value.

### 3. Secret leakage into client bundles

- Grep client components (`"use client"`) and `src/components/`, `src/hooks/` for
  server-only values (`env.<SERVER_VAR>`, service clients, secrets passed as
  props from server to client component).
- Data serialized from a Server Component to a client component is visible in the
  HTML payload — flag any secret, internal ID, or over-broad object crossing that
  boundary (ties to `server-serialization`).

### 4. Server actions & route handlers

- Every server action (`"use server"`) and route handler under `src/app/**/route.ts`
  MUST authenticate and authorize independently — they are public HTTP endpoints.
  An unauthenticated mutation is a high-severity finding.
- Validate all inputs with zod at the boundary; never trust client-supplied IDs
  for authorization (check ownership server-side).
- Check for open redirects (user-controlled `redirect()` target) and SSRF
  (user-controlled `fetch` URL).

### 5. Injection, XSS & data access

- Flag `dangerouslySetInnerHTML`; require sanitization or removal.
- In `src/services/` (data access) check for string-built SQL / unparameterized
  queries and missing authorization on reads/writes.
- Verify user-controlled values are not interpolated into shell, file paths, or
  template strings.

### 6. Dependencies

- Run `pnpm audit --prod` and surface high/critical advisories with the fix
  version. Note any pinned vulnerable transitive deps.
- Check `pnpm outdated` for security-relevant framework updates (next, react).

### 7. i18n-specific

- `next-intl` navigation must use `@/i18n/navigation` helpers; a raw
  `next/navigation` redirect with a user-controlled, unprefixed target can be an
  open-redirect vector.

## Output

A single prioritized table:

| Severity | Location | Issue | Fix |
|---|---|---|---|

Severity = critical / high / medium / low. End with the exact commands run
(`pnpm audit`, greps) so the audit is reproducible. If a pass found nothing,
say so explicitly — do not omit it.
