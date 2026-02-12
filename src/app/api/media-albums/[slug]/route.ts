import { NextResponse } from 'next/server';
import { mediaAlbumsApi, mapApiError } from '@/server';

/**
 * GET /api/media-albums/[slug]
 * Proxies to {API_BASE_URL}/media-albums/{slug}.
 * Accepts both urlfriendlyname and GUID; the upstream API resolves either.
 * Returns 404 when the upstream API returns 404.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    // The upstream API handles both GUIDs and url-friendly names on the same path
    const { data } = await mediaAlbumsApi.getMediaAlbumByName(slug);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const { status, body } = mapApiError(error);
    return NextResponse.json(body, { status });
  }
}
