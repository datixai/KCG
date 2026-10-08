import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { townPath, towns } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...towns.map((t, i) => ({
      url: `${site.url}${townPath(t)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      // Dadyal, Mirpur and Kotli are the main targets
      priority: i < 3 ? 0.9 : 0.7,
    })),
  ];
}
