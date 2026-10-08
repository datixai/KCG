import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.short,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a2a1f',
    theme_color: '#0a2a1f',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
