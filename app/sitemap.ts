import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/our-story', '/products', '/production-process', '/quality-sourcing', '/export-wholesale', '/contact'];
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : r === '/products' || r === '/export-wholesale' ? 0.9 : 0.7,
  }));
}
