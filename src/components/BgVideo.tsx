'use client';
import { useEffect, useRef } from 'react';
import { safeSrc } from '@/lib/safe';

/**
 * Muted, looping background video. Plays only while on screen (saves battery and data),
 * shows the poster for visitors who prefer reduced motion, and can serve a lighter file on phones.
 */
export default function BgVideo({
  src, mobileSrc, poster, className = '', ...rest
}: { src: string; mobileSrc?: string; poster?: string; className?: string } & Record<`data-${string}`, string>) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { video.pause(); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const clean = safeSrc(src);
  const cleanMobile = safeSrc(mobileSrc);
  if (!clean) return null;
  return (
    <video ref={ref} className={className} poster={safeSrc(poster) || undefined} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" {...rest}>
      {cleanMobile && <source src={cleanMobile} type="video/mp4" media="(max-width: 767px)" />}
      <source src={clean} type="video/mp4" />
    </video>
  );
}
