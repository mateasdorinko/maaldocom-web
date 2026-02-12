import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Terms of Use',
};

export default function TermsPage() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Terms of Use
      </Typography>
      <Typography variant="body1" paragraph>
        This website is a personal portfolio. Content is provided as-is for informational purposes.
        Media content is owned by the site author unless otherwise noted.
      </Typography>
      <Typography variant="body1" paragraph>
        By using this site you agree not to scrape, reproduce, or redistribute content without
        permission.
      </Typography>
    </>
  );
}
