import type { Metadata, Viewport } from 'next';
import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });

export const metadata: Metadata = {
  title: { default: `${site.name} | Construction in Azad Kashmir`, template: `%s | ${site.short}` },
  description: site.description,
  icons: { icon: '/brand/logo.jpg', apple: '/brand/logo.jpg' },
  openGraph: { title: site.name, description: site.description, images: ['/brand/logo.jpg'], type: 'website' },
};

export const viewport: Viewport = { themeColor: '#0b0d0c', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>{children}</body>
    </html>
  );
}
