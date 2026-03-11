'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Props {
  recaptchaSiteKey: string;
}

export default function ContactForm({ recaptchaSiteKey }: Props) {
  const [status, setStatus] = React.useState<Status>('idle');
  const [errors, setErrors] = React.useState<Record<string, string[]>>({});

  // Inject the reCAPTCHA v3 script once when a site key is provided
  React.useEffect(() => {
    if (!recaptchaSiteKey) return;
    const id = 'recaptcha-script';
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, [recaptchaSiteKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');

    const fd = new FormData(e.currentTarget);
    const body: Record<string, string> = {
      email: (fd.get('email') as string) ?? '',
      subject: (fd.get('subject') as string) ?? '',
      message: (fd.get('message') as string) ?? '',
      website: (fd.get('website') as string) ?? '', // honeypot
    };

    // Client-side validation
    const clientErrors: Record<string, string[]> = {};
    if (!body.email.trim()) clientErrors.email = ['Email is required.'];
    else if (!/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(body.email.trim()))
      clientErrors.email = ['Please enter a valid email address.'];
    if (!body.subject.trim()) clientErrors.subject = ['Subject is required.'];
    if (!body.message.trim()) clientErrors.message = ['Message is required.'];
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus('idle');
      return;
    }

    // Obtain a reCAPTCHA v3 token. grecaptcha is defined as a stub immediately
    // when the script tag is added, so ready() queues safely even before the
    // library fully initialises. If the script was blocked (ad blocker, network
    // error), grecaptcha won't be defined and we bail early.
    if (recaptchaSiteKey) {
      if (window.grecaptcha) {
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
        body.recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
          action: 'contact',
        });
      } else {
        setStatus('error');
        return;
      }
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json();
        if (data.errors) setErrors(data.errors);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <Alert severity="success">Your message has been sent successfully.</Alert>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {/* Honeypot — hidden from real users, filled by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{ display: 'none' }}
      />

      <TextField
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email?.[0]}
      />
      <TextField
        name="subject"
        label="Subject"
        required
        error={!!errors.subject}
        helperText={errors.subject?.[0]}
      />
      <TextField
        name="message"
        label="Message"
        required
        multiline
        rows={5}
        error={!!errors.message}
        helperText={errors.message?.[0]}
      />

      {status === 'error' && Object.keys(errors).length === 0 && (
        <Alert severity="error">Something went wrong. Please try again later.</Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={status === 'submitting'}
        sx={{ alignSelf: 'flex-start' }}
      >
        {status === 'submitting' ? 'Sending\u2026' : 'Send Message'}
      </Button>
    </Box>
  );
}
