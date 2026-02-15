import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { mediaAlbumsApi, resolveMediaUrl } from '@/server';
import type { GetMediaAlbumResponse } from '@/types/api';

export const metadata: Metadata = {
  title: 'Media Albums',
  description: 'Browse photo and video albums.',
};

export const revalidate = 300;

async function fetchAlbums(): Promise<GetMediaAlbumResponse[]> {
  try {
    const { data } = await mediaAlbumsApi.listMediaAlbums();
    return data;
  } catch {
    return [];
  }
}

export default async function MediaAlbumsPage() {
  const albums = await fetchAlbums();

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Media Albums
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
        A collection of pictures and videos from various events and moments.
      </Typography>

      <Paper
        component="a"
        href="/media-albums/hotshots"
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          px: 2,
          py: 1,
          mb: 3,
          borderRadius: 2,
          bgcolor: 'navBar',
          color: '#fff',
          textDecoration: 'none',
          '&:hover': { opacity: 0.92 },
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          HotShots
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{
            color: '#fff',
            borderColor: 'rgba(255,255,255,0.6)',
            textTransform: 'none',
            flexShrink: 0,
            '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          View Album
        </Button>
      </Paper>

      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 500, color: 'tertiary.main' }}
      >
        Featured Albums
      </Typography>

      {albums.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No albums yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 200px))',
            gap: 2,
          }}
        >
          {albums.map((album) => (
            <Card key={album.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardActionArea href={`/media-albums/${album.urlFriendlyName}`} sx={{ flex: 1 }}>
                {resolveMediaUrl(album.thumbHref) ? (
                  <CardMedia
                    component="img"
                    image={resolveMediaUrl(album.thumbHref)!}
                    alt={album.name ?? ''}
                    sx={{ aspectRatio: '4/3', objectFit: 'contain', bgcolor: 'action.hover' }}
                  />
                ) : (
                  <Box
                    sx={{
                      aspectRatio: '4/3',
                      bgcolor: 'action.hover',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No thumbnail
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {album.name}
                  </Typography>
                  {album.created && (
                    <Typography variant="caption" color="text.secondary">
                      {new Date(album.created).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
