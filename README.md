# maaldo.com — Web Application

Personal portfolio web application built with Next.js, TypeScript, and Material UI.

## Tech Stack

- **Framework:** Next.js (App Router) with TypeScript strict mode
- **UI:** Material UI with custom Material Design 3 theme
- **Runtime:** Node.js 20 LTS
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier
- **Containerization:** Docker (multi-stage, standalone output)
- **CI/CD:** GitHub Actions
- **Hosting:** Azure App Service

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Run TypeScript type checking |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run api:generate` | Re-generate API client from OpenAPI spec |

## API Client Generation

The TypeScript Axios client is generated from the OpenAPI specification and committed to source control.

To re-generate:

```bash
npm run api:generate
```

This fetches the latest spec from the dev API and generates the client into `src/server/api/generated/`. The generated client is **server-only** and must never be imported by client components.

## Environment Variables

All environment variables are **server-only** (never prefixed with `NEXT_PUBLIC_`):

| Variable | Description |
|---|---|
| `API_BASE_URL` | Backend REST API base URL |
| `AUTH0_SECRET` | Auth0 session encryption secret |
| `AUTH0_CLIENT_ID` | Auth0 application client ID |
| `AUTH0_CLIENT_SECRET` | Auth0 application client secret |
| `AUTH0_ISSUER_BASE_URL` | Auth0 tenant URL |
| `AUTH0_BASE_URL` | This application's base URL |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OpenTelemetry collector endpoint |
| `OTEL_EXPORTER_OTLP_HEADERS` | OpenTelemetry auth headers |
| `OTEL_SERVICE_NAME` | Service name for telemetry |
| `OTEL_RESOURCE_ATTRIBUTES` | Resource attributes (must include `deployment.environment` and `service.namespace`) |

## Architecture

- **BFF Pattern:** All browser data requests go through `/api/*` route handlers. Only server-side code references `API_BASE_URL`.
- **Media Streaming:** Media URLs (`thumbHref`, `viewerHref`, `href`) are used directly from the API — no proxying through Next.js.
- **Server-Only Boundary:** Generated API client and `src/server/` use `import 'server-only'` to prevent client-side imports.

## Docker

```bash
docker build -t maaldocom-web .
docker run -p 8080:8080 --env-file .env.local maaldocom-web
```
