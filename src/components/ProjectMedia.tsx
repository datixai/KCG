'use client';
import { useState } from 'react';
import Image from './SiteImage';
import BgVideo from './BgVideo';
import { safeSrc, youtubeId } from '@/lib/safe';
import type { Project } from '@/types';

// Wide videos keep their exact shape; very tall (phone) videos are trimmed a little to 4:5
const MIN_RATIO = 0.8;
const MAX_RATIO = 2.4;

/**
 * A project's main media: a YouTube video, an .mp4 that plays muted when on screen, or the
 * main photo. Video frames take the video's own shape (read from its cover photo), so the
 * video fills the frame with no empty bands and without zooming in.
 */
export default function ProjectMedia({ p, priority = false }: { p: Project; priority?: boolean }) {
  const yt = youtubeId(p.video);
  const mp4 = !yt && safeSrc(p.video) ? p.video! : '';
  const alt = `${p.title}, ${p.location}`;
  const [ratio, setRatio] = useState(16 / 9);
  const frame = Math.min(MAX_RATIO, Math.max(MIN_RATIO, ratio));

  if (yt)
    return (
      <div className="relative aspect-video overflow-hidden rounded-sm bg-forest-deep shadow-2xl shadow-forest-deep/25">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1&playsinline=1&mute=1`}
          title={alt}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    );

  if (mp4)
    return (
      <div
        className={`relative mx-auto overflow-hidden rounded-sm bg-forest-deep shadow-2xl shadow-forest-deep/25 ${frame < 1 ? 'max-w-[440px]' : ''}`}
        style={{ aspectRatio: frame }}
      >
        {p.image && (
          <Image src={p.image} alt="" fill priority={priority} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover"
            onLoad={(e) => { const i = e.currentTarget; if (i.naturalWidth && i.naturalHeight) setRatio(i.naturalWidth / i.naturalHeight); }} />
        )}
        <BgVideo tapToPlay src={mp4} poster={p.image} className="absolute inset-0 size-full object-cover" />
      </div>
    );

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-forest-deep shadow-2xl shadow-forest-deep/25">
      {p.image
        ? <Image src={p.image} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        : <div className="absolute inset-0 bg-gradient-to-br from-forest-light to-forest-deep" />}
    </div>
  );
}
