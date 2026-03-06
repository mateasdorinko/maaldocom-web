import type { MetadataRoute } from 'next';

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/media-albums', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/writings', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/lab', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_BASE_URL || 'https://maaldo.com';

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
