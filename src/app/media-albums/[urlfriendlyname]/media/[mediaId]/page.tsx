import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SecondaryLayout from '@/components/SecondaryLayout';
import MediaAlbumViewer from '@/components/MediaAlbumViewer';
import { mediaAlbumsApi, mapApiError } from '@/server';
import type { GetMediaAlbumDetailResponse, GetMediaAlbumResponse } from '@/types/api';

export const revalidate = 600;

interface PageProps {
  params: Promise<{ urlfriendlyname: string; mediaId: string }>;
}

async function fetchAlbum(slug: string): Promise<GetMediaAlbumDetailResponse | null> {
  try {
    const { data } = await mediaAlbumsApi.getMediaAlbumByName(slug);
    return data;
  } catch (error) {
    const { status } = mapApiError(error);
    if (status === 404) return null;
    throw error;
  }
}

async function fetchAllAlbums(): Promise<GetMediaAlbumResponse[]> {
  try {
    const { data } = await mediaAlbumsApi.listMediaAlbums();
    return data;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { urlfriendlyname, mediaId } = await params;
  const album = await fetchAlbum(urlfriendlyname);
  if (!album) return { title: 'Not Found' };

  const mediaItem = album.media?.find((m) => m.id === mediaId);
  const title = mediaItem?.fileName
    ? `${mediaItem.fileName} — ${album.name}`
    : (album.name ?? 'Media');

  return {
    title,
    description: mediaItem?.description || album.description || `Media in ${album.name}`,
    openGraph: {
      title,
      description: mediaItem?.description ?? undefined,
      type: 'website',
      images: mediaItem?.thumbHref ? [{ url: mediaItem.thumbHref }] : undefined,
    },
  };
}

export default async function MediaDeepLinkPage({ params }: PageProps) {
  const { urlfriendlyname, mediaId } = await params;

  const [album, allAlbums] = await Promise.all([fetchAlbum(urlfriendlyname), fetchAllAlbums()]);

  if (!album) notFound();

  // Redirect to canonical URL if slug is a GUID
  if (album.urlFriendlyName && album.urlFriendlyName !== urlfriendlyname) {
    redirect(`/media-albums/${album.urlFriendlyName}/media/${mediaId}`);
  }

  const otherAlbums = allAlbums.filter((a) => a.id !== album.id);

  return (
    <SecondaryLayout
      sidebar={
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            More Media Albums
          </Typography>
          {otherAlbums.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No other albums.
            </Typography>
          ) : (
            <List disablePadding dense>
              {otherAlbums.map((a) => (
                <ListItem key={a.id} disablePadding>
                  <ListItemButton
                    href={`/media-albums/${a.urlFriendlyName}`}
                    sx={{ borderRadius: 1, py: 0.5 }}
                  >
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.875rem' }}>
                      {a.name}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </>
      }
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', sm: '2.75rem', md: '3.75rem' } }}
      >
        {album.name}
      </Typography>

      {album.description && (
        <Typography variant="body1" color="text.secondary" paragraph>
          {album.description}
        </Typography>
      )}

      <MediaAlbumViewer
        media={album.media ?? []}
        albumUrlFriendlyName={album.urlFriendlyName ?? urlfriendlyname}
        initialMediaId={mediaId}
      />
    </SecondaryLayout>
  );
}
