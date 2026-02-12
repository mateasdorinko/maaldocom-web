import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        This site uses cookies for authentication (Auth0 session cookies) and theme preference only.
        No third-party analytics or tracking scripts are loaded.
      </Typography>
      <Typography variant="body1" paragraph>
        The contact form collects your email address, subject, and message solely to respond to your
        inquiry. This data is not shared with third parties.
      </Typography>
      <Typography variant="body1" paragraph>
        Server-side telemetry (OpenTelemetry) is used for operational monitoring and contains no
        personally identifiable information.
      </Typography>
    </>
  );
}
