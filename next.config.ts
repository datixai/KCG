import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV !== 'production';
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

// Which sources the browser may load. Next.js needs inline scripts/styles; dev mode also needs
// eval and the hot-reload websocket. Firebase talks to googleapis.com.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "media-src 'self' https:",
  `connect-src 'self' https://*.googleapis.com${isDev ? ' ws: wss:' : ''}`,
  `frame-src ${authDomain ? `https://${authDomain}` : "'none'"}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Only our own images go through the optimizer; pasted links from other sites are shown
  // as-is (see components/SiteImage.tsx), so strangers can't use our server to fetch images.
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizePackageImports: ['lucide-react'] },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
        ],
      },
      { source: '/brand/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
      { source: '/videos/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=2592000' }] },
    ];
  },
};
export default nextConfig;
