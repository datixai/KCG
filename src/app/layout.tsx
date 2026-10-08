import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: '/' },
  title: { default: `${site.name} | Construction in Azad Kashmir`, template: `%s | ${site.short}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: '/',
    siteName: site.name,
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', title: site.name, description: site.description, images: ['/og-image.jpg'] },
};

export const viewport: Viewport = { themeColor: '#0a2a1f', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
