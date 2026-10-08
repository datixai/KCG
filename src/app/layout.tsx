import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';
import { KEYWORDS } from '@/lib/seo';

// Kept within what Google shows in results (~60 / ~160 characters)
const title = `${site.name} | Builders in Dadyal, Mirpur & Kotli`;
const description =
  'Kashmir Construction Group builds homes, commercial buildings and roads, and supplies ready-mix concrete in Dadyal, Mirpur, Kotli and across Azad Kashmir.';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: '/' },
  title: { default: title, template: `%s | ${site.short}` },
  description,
  keywords: KEYWORDS,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: 'Datix AI',
  publisher: site.name,
  category: 'Construction',
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  // Search Console / Bing: set these in Vercel > Settings > Environment Variables
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
  other: { 'geo.region': 'PK-JK', 'geo.placename': 'Dadyal, Azad Kashmir', 'geo.position': '33.2226;73.7108', ICBM: '33.2226, 73.7108' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: site.name,
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
};

export const viewport: Viewport = { themeColor: '#0a2a1f', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
