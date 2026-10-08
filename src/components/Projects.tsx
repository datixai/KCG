import Image from 'next/image';
import type { Project } from '@/types';
import { SectionTitle } from './Services';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Our Work" title="Featured Projects" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article key={p.id} className="reveal group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="absolute inset-0 transition duration-500 group-hover:scale-105"
                  style={{ background: `linear-gradient(${135 + i * 30}deg, #146236, #0b0d0c 60%, #f39a2b33)` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="rounded-full bg-brand-orange/90 px-3 py-1 text-xs font-semibold text-ink">{p.category}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-neutral-300">{p.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
