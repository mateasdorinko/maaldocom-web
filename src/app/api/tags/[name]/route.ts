import { NextResponse } from 'next/server';
import { tagsApi, mapApiError } from '@/server';

/**
 * GET /api/tags/[name]
 * Proxies to {API_BASE_URL}/tags/{name}.
 * Returns 404 when the upstream API returns 404.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  try {
    const { data } = await tagsApi.getTagByName(name);
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
