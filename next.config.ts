import type { NextConfig } from 'next';

// API media hosts that serve thumbHref / viewerHref / href directly to the
// browser.  Listed once and reused in both `images.remotePatterns` and CSP.
const apiMediaHosts = [
  'app-maaldocomapi-dev-cus.azurewebsites.net',
  'app-maaldocomapi-tst-cus.azurewebsites.net',
  'api.maaldo.com',
];

// In development, API_BASE_URL is typically http://localhost:5164.
// Extract the origin so the CSP permits media loaded directly from the API.
const apiBaseUrl = process.env.API_BASE_URL;
const devMediaOrigin =
  apiBaseUrl && !apiBaseUrl.startsWith('https') ? new URL(apiBaseUrl).origin : null;

// Content-Security-Policy — permissive baseline.
// MUI emotion requires 'unsafe-inline' for style-src.
// Next.js requires 'unsafe-inline' for script-src (no nonce support yet in
// App Router static headers).  'unsafe-eval' kept for dev HMR; tighten later.
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval'`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: ${apiMediaHosts.map((h) => `https://${h}`).join(' ')}${devMediaOrigin ? ` ${devMediaOrigin}` : ''}`,
  `media-src 'self' blob: ${apiMediaHosts.map((h) => `https://${h}`).join(' ')}${devMediaOrigin ? ` ${devMediaOrigin}` : ''}`,
  `font-src 'self'`,
  `connect-src 'self' https://*.auth0.com`,
  `frame-src 'self' https://*.auth0.com`,
  `frame-ancestors 'none'`,
  `form-action 'self'`,
  `base-uri 'self'`,
];

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: cspDirectives.join('; '),
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      ...apiMediaHosts.map((hostname) => ({
        protocol: 'https' as const,
        hostname,
      })),
      { protocol: 'https' as const, hostname: 'localhost' },
    ],
  },

  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
