import Link from 'next/link';
import Image from 'next/image';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-forest-deep px-4 text-center text-white">
      <span aria-hidden="true" className="pointer-events-none absolute select-none font-display text-[38vw] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(224,166,59,0.15)]">404</span>
      <div className="relative">
        <Image src="/brand/logo-mark-light.png" alt="Kashmir Construction Group" width={213} height={255} className="mx-auto h-20 w-auto" priority />
        <h1 className="mt-8 font-display text-4xl font-bold uppercase sm:text-5xl">
          This page is <span className="text-gold">under construction</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <Link href="/" className="btn-gold mt-10">Back to Home</Link>
      </div>
    </main>
  );
}
