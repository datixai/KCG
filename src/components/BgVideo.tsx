'use client';
import { useEffect, useRef } from 'react';

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

  return (
    <video ref={ref} className={className} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" {...rest}>
      {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
