import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';

export const metadata: Metadata = {
  title: 'Writings',
  description: 'Articles, notes, and other written content.',
};

export default function WritingsPage() {
  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Writings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Coming at some point.... on the backlog.
      </Typography>
    </>
  );
}
