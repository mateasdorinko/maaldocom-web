import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function MediaAlbumDetailLoading() {
  return (
    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 1,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" sx={{ aspectRatio: '1', borderRadius: 1 }} />
          ))}
        </Box>
      </Box>
      <Box sx={{ width: { xs: '100%', md: 220 }, flexShrink: 0 }}>
        <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1 }} />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="text" width="90%" height={28} sx={{ mb: 0.5 }} />
        ))}
      </Box>
    </Box>
  );
}
