import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/products', '/export-wholesale', '/ceylon-cinnamon', '/our-story', '/production-process', '/quality-sourcing', '/contact'];
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : r === '/products' || r === '/export-wholesale' ? 0.9 : r === '/ceylon-cinnamon' ? 0.8 : 0.7,
  }));
}
