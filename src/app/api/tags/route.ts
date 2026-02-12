import { NextResponse } from 'next/server';
import { tagsApi, mapApiError } from '@/server';

/**
 * GET /api/tags
 * Proxies to {API_BASE_URL}/tags.
 * Cacheable — aligned with home page tag sidebar.
 */
export async function GET() {
  try {
    const { data } = await tagsApi.listTags();
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
