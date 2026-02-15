import 'server-only';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

/** Buffer in seconds to refetch before actual expiry */
const EXPIRY_BUFFER_SECONDS = 60;

/**
 * Fetches and caches a client credentials token from Auth0.
 * Returns the cached token if still valid, otherwise fetches a new one.
 */
export async function getClientCredentialsToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;
  const audience = process.env.AUTH0_AUDIENCE;

  if (!domain || !clientId || !clientSecret || !audience) {
    throw new Error(
      'Missing Auth0 environment variables: AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, and AUTH0_AUDIENCE are required',
    );
  }

  const response = await fetch(`https://${domain}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      audience,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch client credentials token: ${response.status} ${response.statusText}`,
    );
  }

  const data: TokenResponse = await response.json();

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - EXPIRY_BUFFER_SECONDS) * 1000;

  return cachedToken;
}

/** Resets the cached token. Exported for testing only. */
export function resetTokenCache(): void {
  cachedToken = null;
  tokenExpiresAt = 0;
}
