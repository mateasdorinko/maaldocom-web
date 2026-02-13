'use client';

import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import useSWR from 'swr';
import type { GetKnowledgeResponse } from '@/types/api';

const fetcher = (url: string): Promise<GetKnowledgeResponse> => fetch(url).then((r) => r.json());

export default function RandomKnowledge() {
  const { data, isLoading } = useSWR('/api/knowledge/random', fetcher, {
    refreshInterval: 10_000,
  });

  if (isLoading || !data) {
    return (
      <Paper variant="outlined" sx={{ p: 3, my: 2 }}>
        <Skeleton variant="text" width="90%" height={28} />
        <Skeleton variant="text" width="40%" height={20} sx={{ mt: 1 }} />
      </Paper>
    );
  }

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 1, fontWeight: 500, color: 'tertiary.main' }}>
        How about a little random knowledge...
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, my: 2, mt: 3 }}>
        {data.title && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            - {data.title}
          </Typography>
        )}
        {data.quote && (
          <Typography variant="body1" component="blockquote" sx={{ fontStyle: 'italic', m: 0 }}>
            &ldquo;{data.quote}&rdquo;
          </Typography>
        )}
      </Paper>
    </>
  );
}
