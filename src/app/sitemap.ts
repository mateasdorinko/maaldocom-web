import type { MetadataRoute } from 'next';
import { mediaAlbumsApi } from '@/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_BASE_URL || 'https://maaldo.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/media-albums',
    '/writings',
    '/contact',
    '/lab',
    '/terms',
    '/privacy',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  // Dynamic album routes
  let albumRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: albums } = await mediaAlbumsApi.listMediaAlbums();
    albumRoutes = albums.map((album) => ({
      url: `${baseUrl}/media-albums/${album.urlFriendlyName}`,
      lastModified: album.created ? new Date(album.created) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  } catch {
    // If API is unreachable, return static routes only
  }

  return [...staticRoutes, ...albumRoutes];
}
