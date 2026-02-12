import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { auth0 } from '@/lib/auth0';

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Experiments, tools, and side projects.',
};

export default async function LabPage() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Lab
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
          This area contains experiments, tools, and side projects. Sign in to access the lab.
        </Typography>
        <Button variant="contained" href="/auth/login" size="large" sx={{ mt: 1 }}>
          Sign in
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Lab
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome back, {session.user.name ?? session.user.email ?? 'user'}. More coming soon.
      </Typography>
    </Box>
  );
}
