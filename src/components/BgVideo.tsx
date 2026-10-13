'use client';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { safeSrc } from '@/lib/safe';

/**
 * Muted, looping background video.
 * - `eager` (hero only) starts as soon as the page has finished loading, so the poster paints
 *   first and the video never delays the first view; all others download nothing until they
 *   scroll into view, so the page isn't weighed down by videos far below.
 * - Pauses when off screen, and only shows the poster image for visitors who prefer
 *   reduced motion, have Data Saver on or are on a very slow (2G) connection.
 * - `tapToPlay` (project videos): if the video can't start on its own (any of the above, or the
 *   phone blocks autoplay, e.g. iPhone Low Power Mode), a play button appears instead.
 */
export default function BgVideo({
  src, mobileSrc, poster, eager = false, tapToPlay = false, className = '', ...rest
}: { src: string; mobileSrc?: string; poster?: string; eager?: boolean; tapToPlay?: boolean; className?: string } & Record<`data-${string}`, string>) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lowData = conn?.saveData || /^(slow-2g|2g)$/.test(conn?.effectiveType ?? '');
    if (lowData || matchMedia('(prefers-reduced-motion: reduce)').matches) { video.pause(); setBlocked(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().then(() => setBlocked(false)).catch(() => setBlocked(true));
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
  const video = (
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
  if (!tapToPlay) return video;
  return (
    <>
      {video}
      {blocked && (
        <button
          type="button"
          onClick={() => { const v = ref.current; if (v) { v.preload = 'auto'; v.play().then(() => setBlocked(false)).catch(() => {}); } }}
          className="absolute inset-0 grid place-items-center bg-forest-deep/20 transition hover:bg-forest-deep/10"
          aria-label="Play video"
        >
          <span className="grid size-16 place-items-center rounded-full bg-gold text-forest-deep shadow-2xl shadow-black/40 transition hover:scale-110">
            <Play className="ml-1 size-7 fill-current" />
          </span>
        </button>
      )}
    </>
  );
}
