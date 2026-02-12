import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch.',
};

export default function ContactPage() {
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
      <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600 }}>
        Have a question or want to say hello? Fill out the form below and I&apos;ll get back to you.
      </Typography>
      <ContactForm />
    </>
  );
}
