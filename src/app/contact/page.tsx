import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch.',
};

export default function ContactPage() {
  const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY ?? '';

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Contact
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mb: 2 }}>
        Have a question or want to say hello? Fill out the form below and I&apos;ll get back to you.
      </Typography>
      <ContactForm recaptchaSiteKey={recaptchaSiteKey} />
      {recaptchaSiteKey && (
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            Terms of Service
          </a>{' '}
          apply.
        </Typography>
      )}
    </>
  );
}
