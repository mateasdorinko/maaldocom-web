import { NextResponse } from 'next/server';
import { authenticatedApiClient, SystemApi, mapApiError } from '@/server';

/** Shape of the contact form submission from the browser */
interface ContactFormBody {
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot field — if filled, a bot submitted the form */
  website?: string;
  /** reCAPTCHA v3 token — present when RECAPTCHA_SITE_KEY is configured */
  recaptchaToken?: string;
}

const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

/**
 * Verifies a reCAPTCHA v3 token against Google's API.
 * Returns true if the token is valid and the score meets the threshold.
 */
async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
  const params = new URLSearchParams({ secret: secretKey, response: token });
  const res = await fetch(RECAPTCHA_VERIFY_URL, { method: 'POST', body: params });
  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean; score: number };
  return data.success && data.score >= RECAPTCHA_SCORE_THRESHOLD;
}

/**
 * POST /api/contact
 * Forwards to {API_BASE_URL}/system/mail.
 *
 * - Honeypot: if `website` field is non-empty, silently discard and return
 *   a generic success response so bots don't know they were caught.
 * - reCAPTCHA v3: if RECAPTCHA_SECRET_KEY is set, verifies the token and
 *   rejects submissions with a score below the threshold.
 * - Maps form field names to the API's PostMailRequest shape
 *   (email → from, message → body).
 * - Must be no-store.
 */
export async function POST(request: Request) {
  const headers = { 'Cache-Control': 'no-store' };

  try {
    const body: ContactFormBody = await request.json();

    // Honeypot check — silently succeed without calling upstream
    if (body.website) {
      return NextResponse.json(
        { message: 'Your message has been sent successfully.' },
        { status: 200, headers },
      );
    }

    // reCAPTCHA verification — only when the secret key is configured
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecretKey) {
      if (!body.recaptchaToken) {
        return NextResponse.json(
          { title: 'Verification failed', status: 400, errors: {} },
          { status: 400, headers },
        );
      }
      const passed = await verifyRecaptcha(body.recaptchaToken, recaptchaSecretKey);
      if (!passed) {
        return NextResponse.json(
          { title: 'Verification failed', status: 400, errors: {} },
          { status: 400, headers },
        );
      }
    }

    // Basic server-side validation
    const errors: Record<string, string[]> = {};
    if (!body.email?.trim()) {
      errors.email = ['Email is required.'];
    } else if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(body.email.trim())) {
      errors.email = ['Please enter a valid email address.'];
    }
    if (!body.subject?.trim()) {
      errors.subject = ['Subject is required.'];
    }
    if (!body.message?.trim()) {
      errors.message = ['Message is required.'];
    }
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { title: 'Validation failed', status: 400, errors },
        { status: 400, headers },
      );
    }

    // Forward to upstream API
    await new SystemApi(undefined, undefined, authenticatedApiClient).postMail({
      from: body.email!.trim(),
      subject: body.subject!.trim(),
      body: body.message!.trim(),
    });

    return NextResponse.json(
      { message: 'Your message has been sent successfully.' },
      { status: 200, headers },
    );
  } catch (error) {
    const { status, body } = mapApiError(error);
    return NextResponse.json(body, { status, headers });
  }
}
