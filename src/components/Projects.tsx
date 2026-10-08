import Image from 'next/image';
import { ArrowRight, MapPin, MoveRight } from 'lucide-react';
import type { Project } from '@/types';
import SectionTitle from './SectionTitle';

/**
 * Desktop: the section pins and the cards scroll sideways as you scroll down (see Motion.tsx).
 * Mobile: a swipeable row with snap points.
 */
export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" data-hscroll className="relative overflow-hidden bg-forest py-24 sm:py-28 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(224,166,59,0.12),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <SectionTitle eyebrow="Our Projects" lines={['Built Across', 'Kashmir']} dark />
        <div data-reveal className="flex items-center gap-6">
          <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50 lg:flex">Scroll <MoveRight className="size-4 animate-pulse text-gold" /></span>
          <a href="#contact" className="btn-gold">Start Your Project <ArrowRight className="size-4" /></a>
        </div>
      </div>

      <div
        data-hscroll-track
        className="relative mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:snap-none lg:overflow-visible lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        {projects.map((p, i) => (
          <article key={p.id} className="group relative w-[82vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              {p.image ? (
                <Image src={p.image} alt={p.title} fill sizes="(min-width: 1024px) 30vw, 82vw" className="object-cover transition duration-700 group-hover:scale-110" />
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
        ))}
        {/* End card */}
        <a href="#contact" className="group grid w-[82vw] shrink-0 snap-start place-items-center rounded-sm border border-gold/40 sm:w-[46vw] lg:w-[24vw]">
          <span className="text-center">
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-gold text-forest-deep transition duration-500 group-hover:scale-110 group-hover:-rotate-45"><ArrowRight className="size-8" /></span>
            <span className="mt-6 block font-display text-2xl font-bold uppercase text-white">Your Project<span className="block text-gold">Next?</span></span>
          </span>
        </a>
      </div>
    </section>
  );
}
