import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import SecondaryLayout from '@/components/SecondaryLayout';
import MediaAlbumViewer from '@/components/MediaAlbumViewer';
import AlbumsSidebar from '@/components/AlbumsSidebar';
import AlbumHeader from '@/components/AlbumHeader';
import { resolveMediaUrl } from '@/server';
import { fetchAlbum, fetchAllAlbums } from '../shared';

export const revalidate = 600;

interface PageProps {
  params: Promise<{ urlfriendlyname: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { urlfriendlyname } = await params;
  const album = await fetchAlbum(urlfriendlyname);
  if (!album) return { title: 'Not Found' };

  return {
    title: `Media Albums > ${album.name}`,
    description: album.description || `Media Albums > ${album.name}`,
    openGraph: {
      title: album.name ?? undefined,
      description: album.description ?? undefined,
      type: 'website',
      images: resolveMediaUrl(album.thumbHref)
        ? [{ url: resolveMediaUrl(album.thumbHref)! }]
        : undefined,
    },
  };
}

export default async function MediaAlbumDetailPage({ params }: PageProps) {
  const { urlfriendlyname } = await params;

  const [album, allAlbums] = await Promise.all([fetchAlbum(urlfriendlyname), fetchAllAlbums()]);

  if (!album) notFound();

  // Redirect from GUID (or any non-canonical slug) to the canonical URL
  if (album.slug && album.slug !== urlfriendlyname) {
    redirect(`/media-albums/${album.slug}`);
  }

  const otherAlbums = allAlbums.filter((a) => a.id !== album.id);

  return (
    <SecondaryLayout sidebar={<AlbumsSidebar albums={otherAlbums} />}>
      <AlbumHeader name={album.name ?? ''} description={album.description} />

      {album.tags && album.tags.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {album.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              color="primary"
              component="a"
              href={`/tags/${encodeURIComponent(tag)}`}
              clickable
              sx={{
                color: '#fff',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            />
          ))}
        </Box>
      )}

      <MediaAlbumViewer
        media={(album.media ?? []).map((m) => ({
          ...m,
          thumbHref: resolveMediaUrl(m.thumbHref),
          viewerHref: resolveMediaUrl(m.viewerHref),
          href: resolveMediaUrl(m.href),
        }))}
        albumUrlFriendlyName={album.slug ?? urlfriendlyname}
      />
    </SecondaryLayout>
  );
}
