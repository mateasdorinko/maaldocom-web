import { auth0 } from '@/lib/auth0';

export async function middleware(req: Parameters<typeof auth0.middleware>[0]) {
  return auth0.middleware(req);
}

export const config = {
  matcher: ['/auth/:path*'],
};
