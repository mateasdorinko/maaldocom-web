import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { tagsApi, mapApiError } from '@/server';
import type { GetTagDetailResponse } from '@/types/api';

export const revalidate = 300;

interface PageProps {
  params: Promise<{ name: string }>;
}

async function fetchTag(name: string): Promise<GetTagDetailResponse | null> {
  try {
    const { data } = await tagsApi.getTagByName(name);
    return data;
  } catch (error) {
    const { status } = mapApiError(error);
    if (status === 404) return null;
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const tag = await fetchTag(name);
  if (!tag) return { title: 'Not Found' };
  return {
    title: `Tags > ${tag.name}`,
    description: `Content tagged with "${tag.name}".`,
  };
}

export default async function TagDetailPage({ params }: PageProps) {
  const { name } = await params;
  const tag = await fetchTag(name);

  if (!tag) notFound();

  return (
    <>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        Tag: {tag.name}
      </Typography>
      {tag.count != null && (
        <Typography variant="body1" color="text.secondary" component="p" sx={{ mb: 2 }}>
          Found in {tag.count} item{tag.count !== 1 ? 's' : ''}.
        </Typography>
      )}

      {tag.mediaAlbums && tag.mediaAlbums.length > 0 && (
        <>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 3, fontWeight: 500, color: 'tertiary.main' }}
          >
            Media Albums
          </Typography>
          <List
            disablePadding
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {tag.mediaAlbums.map((album) => (
              <ListItem key={album.mediaAlbumId} disablePadding>
                <ListItemButton
                  href={`/media-albums/${album.urlFriendlyName}`}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemText primary={album.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {tag.media && tag.media.length > 0 && (
        <>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{ mt: 3, fontWeight: 500, color: 'tertiary.main' }}
          >
            Media
          </Typography>
          <List
            disablePadding
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {tag.media.map((m) => (
              <ListItem key={m.mediaId} disablePadding>
                <ListItemButton
                  href={`/media-albums/${m.mediaAlbumUrlFriendlyName}/media/${m.mediaId}`}
                  sx={{ borderRadius: 1 }}
                >
                  <ListItemText primary={m.name} secondary={m.mediaAlbumName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
}
