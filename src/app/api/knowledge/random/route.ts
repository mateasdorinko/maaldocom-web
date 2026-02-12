import { NextResponse } from 'next/server';
import { knowledgeApi, mapApiError } from '@/server';

/**
 * GET /api/knowledge/random
 * Proxies to {API_BASE_URL}/knowledge/random.
 * No caching — polled by client every 10s.
 */
export async function GET() {
  try {
    const { data } = await knowledgeApi.getRandomKnowledge();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    const { status, body } = mapApiError(error);
    return NextResponse.json(body, { status });
  }
}
