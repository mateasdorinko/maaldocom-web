import Typography from '@mui/material/Typography';

export default function AlbumHeader({
  name,
  description,
}: {
  name: string;
  description?: string | null;
}) {
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' } }}
      >
        {name}
      </Typography>

      {description && (
        <Typography variant="body1" color="text.secondary" component="p" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
    </>
  );
}
