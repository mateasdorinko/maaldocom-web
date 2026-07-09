import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import SecondaryLayout from '@/components/SecondaryLayout';
import MediaAlbumViewer from '@/components/MediaAlbumViewer';
import AlbumsSidebar from '@/components/AlbumsSidebar';
import AlbumHeader from '@/components/AlbumHeader';
import { resolveMediaUrl } from '@/server';
import { fetchAlbum, fetchAllAlbums } from '../../../shared';

export const revalidate = 600;

interface PageProps {
  params: Promise<{ urlfriendlyname: string; mediaId: string }>;
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
      images: resolveMediaUrl(mediaItem?.thumbHref)
        ? [{ url: resolveMediaUrl(mediaItem?.thumbHref)! }]
        : undefined,
    },
  };
}

export default async function MediaDeepLinkPage({ params }: PageProps) {
  const { urlfriendlyname, mediaId } = await params;

  const [album, allAlbums] = await Promise.all([fetchAlbum(urlfriendlyname), fetchAllAlbums()]);

  if (!album) notFound();

  // Redirect to canonical URL if slug is a GUID
  if (album.slug && album.slug !== urlfriendlyname) {
    redirect(`/media-albums/${album.slug}/media/${mediaId}`);
  }

  const otherAlbums = allAlbums.filter((a) => a.id !== album.id);

  return (
    <SecondaryLayout sidebar={<AlbumsSidebar albums={otherAlbums} />}>
      <AlbumHeader name={album.name ?? ''} description={album.description} />

      <MediaAlbumViewer
        media={(album.media ?? []).map((m) => ({
          ...m,
          thumbHref: resolveMediaUrl(m.thumbHref),
          viewerHref: resolveMediaUrl(m.viewerHref),
          href: resolveMediaUrl(m.href),
        }))}
        albumUrlFriendlyName={album.slug ?? urlfriendlyname}
        initialMediaId={mediaId}
      />
    </SecondaryLayout>
  );
}
