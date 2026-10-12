import Image from './SiteImage';
import BgVideo from './BgVideo';
import { safeSrc, youtubeId } from '@/lib/safe';
import type { Project } from '@/types';

/**
 * A project's main media in a fixed frame: a YouTube video, an .mp4 that plays muted when
 * on screen, or the main photo. Tall (phone) and wide videos both fit whole, with a soft
 * blurred copy of the photo filling the space around them.
 */
export default function ProjectMedia({ p, priority = false }: { p: Project; priority?: boolean }) {
  const yt = youtubeId(p.video);
  const mp4 = !yt && safeSrc(p.video) ? p.video! : '';
  const alt = `${p.title}, ${p.location}`;
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-forest-deep shadow-2xl shadow-forest-deep/25">
      {p.image && (
        <Image src={p.image} alt={mp4 || yt ? '' : alt} fill priority={priority} sizes="(min-width: 1024px) 55vw, 100vw"
          className={mp4 ? 'scale-110 object-cover opacity-50 blur-2xl' : 'object-cover'} />
      )}
      {yt ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1&playsinline=1`}
          title={alt}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : mp4 ? (
        <BgVideo src={mp4} poster={p.image} className="absolute inset-0 size-full object-contain" />
      ) : !p.image && <div className="absolute inset-0 bg-gradient-to-br from-forest-light to-forest-deep" />}
    </div>
  );
}
