import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_BASE_URL || 'https://maaldo.com';

  return [
    '',
    '/media-albums',
    '/writings',
    '/contact',
    '/lab',
    '/terms',
    '/privacy',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
