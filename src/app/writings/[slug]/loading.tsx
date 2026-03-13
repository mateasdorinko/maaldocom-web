import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function WritingDetailLoading() {
  return (
    <Box>
      <Skeleton variant="text" width="70%" height={60} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="30%" height={20} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="90%" height={24} sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={80} height={24} />
        <Skeleton variant="rounded" width={50} height={24} />
      </Box>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={`${85 + (i % 3) * 5}%`}
          height={20}
          sx={{ mb: 0.5 }}
        />
      ))}
    </Box>
  );
}
