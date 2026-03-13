# Plan: Writings Feature

## Context
Add the Writings section to the web application. A placeholder page already exists at `src/app/writings/page.tsx` and the nav link is already present in `AppHeader`. The external API has been updated to include writings endpoints, so the generated client must be regenerated first. The feature includes a list page (`/writings`) and a detail page (`/writings/[slug]`), both server-rendered, with Markdown body content rendered via `react-markdown` mapped to MUI components.

**Pattern note:** The spec references BFF route handlers (`/api/writings/*`) with server component pages calling them. However, the established pattern in this codebase (see `src/app/media-albums/page.tsx`) is for server components to call the generated API client directly — BFF route handlers exist only for client components making runtime browser requests. Since both writings pages are fully server-rendered with no client-side polling, this plan follows the direct API pattern. No BFF route handlers are needed.

---

## Steps

### 1. Install `react-markdown`
```
npm install react-markdown
```
This is the only new dependency. Check for ESM compatibility issues with `next.config.ts` (`transpilePackages` may be needed).

### 2. Regenerate the API client
```
npm run api:generate
```
Commits the updated `src/server/api/generated/` directory to source control.

### 3. Add `writingsApi` singleton — `src/server/api/client.ts`
After regeneration, import the new `WritingsApi` class and add:
```
export const writingsApi = new WritingsApi(apiClient);
```
Then re-export it from `src/server/index.ts`.

### 4. Update the writings list page — `src/app/writings/page.tsx`
Replace the placeholder with a full server component:
- Add `export const revalidate = 300`
- Fetch writings list via `writingsApi` (method TBD after regeneration, likely `listWritings()`)
- Render a list where each item shows: title (linked to `/writings/{slug}`), formatted created date, and blurb
- Use `notFound()` on errors, empty state inline message if the list is empty
- Typography hierarchy: `h3`/`h1` for page heading, `h5` or `subtitle1` for writing title, `caption` for date, `body2` for blurb
- Date formatted with `new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })`
- No `MUI Card` needed; a simple `Box` per item with `Divider` separators is sufficient (simpler than album grid)
- Add `generateMetadata` export

### 5. Create the writings detail page — `src/app/writings/[slug]/page.tsx`
New server component:
- `export const revalidate = 600`
- Fetch by slug via `writingsApi` (likely `getWritingBySlug(slug)`)
- Call `notFound()` if 404; rethrow other errors
- Render: `Typography h3/h1` title, formatted created date, `body1` blurb, tags as MUI Chips (same pattern as album detail — `color="primary"`, `href="/tags/{tag}"`, `clickable`), `WritingBody` for body, comments section at bottom
- Comments: flat list, each showing author, formatted date, and body text with clear Typography hierarchy
- Add `generateMetadata` using the writing title and blurb
- A right sidebar will display the other writings as a list of links (similar to the "Other Albums" sidebar on album detail pages). This can be implemented by fetching the full writings list again and filtering out the current writing, or by adding a new API method that returns all writings except the current one.

### 6. Create the writing detail loading skeleton — `src/app/writings/[slug]/loading.tsx`
Skeleton matching the detail page shape: title skeleton, date skeleton, body text skeletons, chip skeletons for tags. Follow the same `Skeleton` pattern as `src/app/media-albums/[urlfriendlyname]/loading.tsx`.

### 7. Create `WritingBody` component — `src/components/WritingBody.tsx`
Server component (no `'use client'` needed):
- Props: `body: string | null | undefined`
- Renders nothing if body is empty/null
- Uses `react-markdown` with a `components` map:
  - `h1`–`h4` → MUI `Typography` with appropriate variants (`h4`–`h6`)
  - `p` → MUI `Typography variant="body1"` with `sx={{ mb: 1.5 }}`
  - `a` → MUI `Link` with `target="_blank" rel="noopener"` for external links
  - `ul`/`ol` → native element with MUI typography sizing via `sx`
  - `li` → MUI `Typography` component as `li`
  - `blockquote` → MUI `Paper` with left border styling
  - `code` → MUI `Typography` with monospace font

---

## Critical Files

| File | Action |
|---|---|
| `src/server/api/generated/` | Regenerated — do not manually edit |
| `src/server/api/client.ts` | Add `writingsApi` singleton (line ~55) |
| `src/server/index.ts` | Re-export `writingsApi` |
| `src/app/writings/page.tsx` | Replace placeholder with list page |
| `src/app/writings/[slug]/page.tsx` | New — detail page |
| `src/app/writings/[slug]/loading.tsx` | New — skeleton loader |
| `src/components/WritingBody.tsx` | New — Markdown-to-MUI renderer |
| `package.json` | Add `react-markdown` |

**Reference files (read, do not modify):**
- `src/app/media-albums/page.tsx` — list page pattern
- `src/app/media-albums/[urlfriendlyname]/page.tsx` — detail + tags/chips pattern
- `src/app/media-albums/[urlfriendlyname]/loading.tsx` — skeleton pattern

---

## Tests
Follow the pattern in `src/components/MediaAlbumViewer.test.tsx` and `src/app/api/contact/route.test.ts`.

Create `src/app/writings/page.test.tsx`:
- Renders title, date, and blurb for each writing in the mocked response
- Renders empty state message when API returns `[]`
- Each writing title links to the correct `/writings/{slug}` path

Create `src/app/writings/[slug]/page.test.tsx`:
- Renders all fields: title, date, blurb, tags, body, comments
- Calls `notFound()` when API returns 404
- Renders gracefully with empty tags and empty comments arrays

Create `src/components/WritingBody.test.tsx`:
- Renders `null`/empty body without error
- Renders headings mapped to correct MUI Typography variants
- Renders links as MUI Link elements

---

## Verification
1. Run `npm run api:generate` and confirm new API classes/models appear in `src/server/api/generated/`
2. Run `npm run typecheck` — must pass with zero errors
3. Run `npm run lint` — must pass with zero warnings
4. Run `npm test` — all tests pass
5. Run `npm run dev` and manually verify:
   - `/writings` renders a list of writings with correct fields and linked titles
   - `/writings/{slug}` renders the full detail with formatted Markdown body
   - Tags link to `/tags/{name}`
   - An unknown slug returns the 404 page
