# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Production build (standalone output for Docker)
npm run lint             # ESLint with zero warnings tolerance
npm run format           # Prettier write
npm run typecheck        # tsc --noEmit
npm test                 # Vitest run (all tests)
npm run test:coverage    # Vitest with V8 coverage
npm run api:generate     # Regenerate TypeScript Axios client from OpenAPI spec
```

Run a single test file: `npx vitest run src/path/to/file.test.tsx`

## Architecture

Next.js 16 App Router with TypeScript strict mode, Material UI, and a Backend-for-Frontend (BFF) pattern.

### Server-only boundary (`src/server/`)

All code under `src/server/` uses `import 'server-only'` and must never be imported by client components. This includes:
- `src/server/api/client.ts` — Axios wrapper configured with `API_BASE_URL`, timeouts, error mapping
- `src/server/api/generated/` — Auto-generated TypeScript Axios client from OpenAPI spec (committed to source control, not generated in CI)

### BFF layer (`src/app/api/`)

All browser data requests go through `/api/*` route handlers. Route handlers are the **only** code allowed to reference `API_BASE_URL`. Client components call `/api/*` (same-origin) exclusively.

**Exception:** Media streaming URLs (`thumbHref`, `viewerHref`, `href`) returned by the API are used directly by the browser — never proxied through Next.js.

### Theme system (`src/theme/`)

- `theme.ts` — Light/dark MUI themes with custom palette extensions (`tertiary`, `outline`, `surface`, `navBar`)
- `ThemeRegistry.tsx` — Client component providing `ThemeContext` with `mode` and `toggleMode`

### Navigation shell

- `AppHeader` — Client component: sticky AppBar with navBar theme color, responsive drawer for mobile, theme toggle, auth-aware login/logout via `useUser()`
- `AppFooter` — Links to Terms and Privacy
- Root layout wraps everything in `Auth0Provider` → `AppRouterCacheProvider` → `ThemeRegistry` → flex column (header, main Container, footer)

### Layouts

Two content layouts used across pages:
- **Primary layout** — Single main content area (most pages)
- **Secondary layout** — Main content + collapsible right-side navigation (home page tags sidebar, album detail sidebar)

### Auth (`src/lib/auth0.ts`)

Auth0 v4 SDK. Env vars: `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `AUTH0_SECRET`, `APP_BASE_URL`. Middleware handles `/auth/*` routes. Server pages use `auth0.getSession()` for auth gating. Client components use `useUser()` from the Auth0Provider in root layout.

### OpenTelemetry (`src/instrumentation.ts`)

OTLP exporter activated when `OTEL_EXPORTER_OTLP_ENDPOINT` is set. All config via standard OTEL env vars. Only runs in Node.js runtime (not edge).

### SEO

`src/app/robots.ts` and `src/app/sitemap.ts` (dynamic — fetches media albums for URLs).

### Reusable components (`src/components/`)

- `LoadingState`, `EmptyState`, `ErrorState` — Use across pages and list views
- `RandomKnowledge` — Client component, SWR polling `/api/knowledge/random` every 10s
- `ContactForm` — Client component with client-side validation and honeypot
- `MediaAlbumViewer` — Client component, thumbnail grid + carousel modal

## Hard constraints

- **No `NEXT_PUBLIC_*` env vars.** All secrets (API_BASE_URL, Auth0, OTEL) are server-only.
- **No `API_BASE_URL` in client components.** Only route handlers and server utilities may use it.
- **No media proxying.** Use API-provided streaming URLs directly (`thumbHref`/`viewerHref`/`href`).
- **Server components by default.** Only use `'use client'` for interactivity (polling, carousel, forms, theme toggle).
- **Generated client is committed.** Run `npm run api:generate` manually; it is not run in CI.

## Path alias

`@/*` maps to `./src/*` (configured in both tsconfig.json and vitest.config.ts).

## Testing

Vitest + React Testing Library with jsdom. Tests go in `src/**/*.test.{ts,tsx}`. Setup file at `src/test/setup.ts` imports `@testing-library/jest-dom/vitest`.

## Containerization

Multi-stage Dockerfile using `node:20-alpine`. Uses Next.js standalone output. Production port is 8080.
