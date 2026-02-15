import { NextResponse } from 'next/server';
import { authenticatedApiClient, SystemApi, mapApiError } from '@/server';

/** Shape of the contact form submission from the browser */
interface ContactFormBody {
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot field — if filled, a bot submitted the form */
  website?: string;
}

/**
 * POST /api/contact
 * Forwards to {API_BASE_URL}/system/mail.
 *
 * - Honeypot: if `website` field is non-empty, silently discard and return
 *   a generic success response so bots don't know they were caught.
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

    // Basic server-side validation
    const errors: Record<string, string[]> = {};
    if (!body.email?.trim()) {
      errors.email = ['Email is required.'];
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
    await new SystemApi(authenticatedApiClient).postMail({
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
