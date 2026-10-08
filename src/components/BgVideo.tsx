'use client';
import { useEffect, useRef } from 'react';
import { safeSrc } from '@/lib/safe';

/**
 * Muted, looping background video.
 * - `eager` (hero only) starts as soon as the page has finished loading, so the poster paints
 *   first and the video never delays the first view; all others download nothing until they
 *   scroll into view, so the page isn't weighed down by videos far below.
 * - Pauses when off screen, and only shows the poster image for visitors who prefer
 *   reduced motion or have Data Saver / a slow connection.
 */
export default function BgVideo({
  src, mobileSrc, poster, eager = false, className = '', ...rest
}: { src: string; mobileSrc?: string; poster?: string; eager?: boolean; className?: string } & Record<`data-${string}`, string>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lowData = conn?.saveData || /(^|-)2g|3g/.test(conn?.effectiveType ?? '');
    if (lowData || matchMedia('(prefers-reduced-motion: reduce)').matches) { video.pause(); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { rootMargin: '200px 0px' });
    const watch = () => io.observe(video);
    if (!eager || document.readyState === 'complete') watch();
    else window.addEventListener('load', watch, { once: true });
    return () => { window.removeEventListener('load', watch); io.disconnect(); };
  }, [eager]);

  const clean = safeSrc(src);
  const cleanMobile = safeSrc(mobileSrc);
  if (!clean) return null;
  return (
    <video
      ref={ref}
      className={className}
      poster={safeSrc(poster) || undefined}
      muted
      loop
      playsInline
      preload={eager ? 'metadata' : 'none'}
      aria-hidden="true"
      {...rest}
    >
      {cleanMobile && <source src={cleanMobile} type="video/mp4" media="(max-width: 767px)" />}
      <source src={clean} type="video/mp4" />
    </video>
  );
}
