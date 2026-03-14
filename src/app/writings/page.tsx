import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { writingsApi } from '@/server';
import type { GetWritingResponse } from '@/types/api';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Writings',
  description: 'Articles, notes, and other written content.',
};

async function fetchWritings(): Promise<GetWritingResponse[]> {
  try {
    const { data } = await writingsApi.listWritings();
    return data;
  } catch {
    return [];
  }
}

export default async function WritingsPage() {
  const writings = await fetchWritings();

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

      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        Articles, notes, and other things on my mind.
      </Typography>

      {writings.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No writings yet.
        </Typography>
      ) : (
        <Box>
          {writings.map((writing, index) => (
            <Box key={writing.id}>
              {index > 0 && <Divider sx={{ my: 3 }} />}
              <Box sx={{ py: index === 0 ? 0 : undefined }}>
                <Link
                  href={`/writings/${writing.slug}`}
                  underline="hover"
                  color="inherit"
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ fontWeight: 600, color: 'primary.light' }}
                  >
                    {writing.title}
                  </Typography>
                </Link>
                {writing.created && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {new Date(writing.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                )}
                {writing.blurb && (
                  <Typography variant="body2" color="text.secondary">
                    {writing.blurb}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
