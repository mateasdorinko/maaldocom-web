# Spec for Writings Feature

branch: writings-feature
figma_component (if used): N/A

## Summary

Add a Writings section to the web application. A list page at `/writings` displays all available writings fetched from the API via the BFF pattern. Clicking a writing title navigates to a detail page at `/writings/[slug]`. The API client proxy must be regenerated before implementation begins.

## Functional Requirements

- Regenerate the TypeScript Axios client from the updated OpenAPI spec (`npm run api:generate`) before building any API-dependent code.
- Add a BFF route handler at `src/app/api/writings/route.ts` that fetches the writings list from the external API using the generated client and the appropriate API client instance (authenticated or unauthenticated per access requirements).
- Add a BFF route handler at `src/app/api/writings/[slug]/route.ts` that fetches a single writing by slug.
- Create a server component page at `src/app/writings/page.tsx` that calls `/api/writings` and renders a list of writings.
- Each writing in the list displays: title (as a clickable link), created date, and blurb.
  - The created date should be formatted in a human-readable way (e.g. "June 1, 2024").
  - Use contrasting typography styles for the title, date, and blurb to create a clear visual hierarchy consistent with the rest of the site.
- The link for each writing in the list navigates to `/writings/[slug]` using the writing's slug.
- Create a server component page at `src/app/writings/[slug]/page.tsx` that calls `/api/writings/[slug]` and renders the writing detail.
- The writing detail page displays: title, created date, blurb, tags, body, and comments.
  - Tags are rendered with the same styling as tags elsewhere on the site
- Comments are rendered at the very bottom of the detail page.
  - Each comment displays the comment author, comment created date, and the comment body.
  - The created date should be formatted in a human-readable way (e.g. "June 1, 2024").
  - Use contrasting typography styles for the comment author, comment created date, and comment body to create a clear visual hierarchy consistent with the rest of the site.
- The body content is stored as Markdown and rendered using `react-markdown` with a custom components map that maps Markdown elements (headings, paragraphs, lists, links, etc.) to the appropriate MUI Typography and other MUI components, consistent with the rest of the site's styling.
- Use `LoadingState`, `EmptyState`, and `ErrorState` components where appropriate on both pages.

## Figma Design Reference (only if referenced)

N/A

## Possible Edge Cases

- A writing slug that does not exist should return a 404 page.
- A writing with no comments should render the comments section gracefully (No comments).
- A writing with no tags should not render a broken tags section.
- The body field may be empty or null; the UI should handle this without error.
- Very long body content should remain readable and not break the layout.
- Created date formatting should be consistent with dates displayed elsewhere on the site.

## Acceptance Criteria

- `/writings` renders a list of writings with title (linked), created date, and blurb for each item.
- Clicking a writing title navigates to `/writings/[slug]`.
- `/writings/[slug]` renders the full writing with title, created date, blurb, tags, body, and comments.
- Comments appear below all other content.
- Body content is rendered using Markdown-to-MUI mapping and visually matches the typography used on other content pages.
- No `NEXT_PUBLIC_*` env vars are introduced; all API calls go through BFF route handlers.
- `API_BASE_URL` is not referenced in any client component.
- All data fetching follows the BFF pattern established elsewhere in the codebase.
- The regenerated API client is committed to source control.

## Open Questions

- Should the writings list endpoint require authentication, or is it publicly accessible? This determines whether to use `apiClient` or `authenticatedApiClient` in the route handlers. Neither writings list nor detail endpoints should require authentication, as the content is meant to be publicly accessible.
- Should tags on the detail page be rendered as plain text labels, MUI Chips, or links that filter writings by tag? Answered above.
- Is pagination required on the writings list page, or should all writings be returned in a single request? Single request.
- Should comments support nested/threaded replies, or are they a flat list? Flat list for now. We may support hierarchical comments in the future.
- Is there a desired sort order for the writings list (e.g. newest first)? Newest first.

## Testing Guidelines

Create tests as needed following the same patterns used in other pages/components. An example would be any tests created
for MediaAlbums list and detail pages.
