import type { Metadata } from 'next';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Not Found
      </Typography>
      <Typography variant="body1" component="p" sx={{ mb: 2 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Link href="/" underline="hover">
        Go back home
      </Link>
    </>
  );
}
