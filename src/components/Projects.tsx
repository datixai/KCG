import Image from './SiteImage';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Project } from '@/types';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <article className="group relative w-[78vw] shrink-0 sm:w-[44vw] lg:w-[28vw] xl:w-[24vw]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        {p.image ? (
          <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 28vw, 78vw" className="object-cover transition duration-700 group-hover:scale-110" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-forest-light to-forest-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/20 to-transparent opacity-90" />
        <span className="absolute left-5 top-5 rounded-sm bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-deep">{p.category}</span>
        <span className="absolute right-5 top-4 font-display text-4xl font-bold text-white/25">{String(i + 1).padStart(2, '0')}</span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white">{p.title}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-white/75"><MapPin className="size-4 text-gold" /> {p.location}</p>
          {p.description && <p className="mt-3 line-clamp-2 text-sm text-white/60">{p.description}</p>}
        </div>
      </div>
    </article>
  );
}

/** Projects glide continuously from right to left, in order (01, 02, …); hovering pauses them. */
export default function Projects({ projects, content }: { projects: Project[]; content: HomeContent['projects'] }) {
  // Repeat short lists so the moving row is always wider than the screen
  const row = projects.length ? Array.from({ length: Math.ceil(5 / projects.length) }, () => projects).flat() : [];
  const seconds = Math.max(30, row.length * 7);

  return (
    <section id="projects" className="relative overflow-hidden bg-forest py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(224,166,59,0.12),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} dark />
        <a href="#contact" className="btn-gold">Start Your Project <ArrowRight className="size-4" /></a>
      </div>

      <div className="group/row relative mt-14 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 pr-6 group-hover/row:[animation-play-state:paused]" style={{ animationDuration: `${seconds}s` }}>
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-6" aria-hidden={copy === 1}>
              {row.map((p, i) => <Card key={`${copy}-${p.id}-${i}`} p={p} i={i % projects.length} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
