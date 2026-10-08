import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

// The admin area is kept out of search results with noindex metadata, not listed here
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${site.url}/sitemap.xml` };
}
