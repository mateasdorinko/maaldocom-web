import { NextResponse } from 'next/server';

/**
 * GET /api/health
 * Shallow health check — confirms the Next.js process is alive and serving requests.
 */
export function GET() {
  return NextResponse.json({ status: 'healthy' });
}
