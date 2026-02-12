import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { mediaAlbumsApi } from '@/server';
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

      {albums.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No albums yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          {albums.map((album) => (
            <Card key={album.id} sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardActionArea href={`/media-albums/${album.urlFriendlyName}`} sx={{ flex: 1 }}>
                {album.thumbHref ? (
                  <CardMedia
                    component="img"
                    image={album.thumbHref}
                    alt={album.name ?? ''}
                    sx={{ aspectRatio: '4/3', objectFit: 'cover' }}
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
