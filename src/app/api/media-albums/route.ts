import { NextResponse } from 'next/server';
import { mediaAlbumsApi, mapApiError } from '@/server';

/**
 * GET /api/media-albums
 * Proxies to {API_BASE_URL}/media-albums.
 * Cacheable — revalidate 300s aligned with media albums list page.
 */
export async function GET() {
  try {
    const { data } = await mediaAlbumsApi.listMediaAlbums();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    const { status, body } = mapApiError(error);
    return NextResponse.json(body, { status });
  }
}
