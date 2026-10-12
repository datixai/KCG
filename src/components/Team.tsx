import Image from './SiteImage';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

/** The people behind KCG. Members, photos and text all come from Admin > Home Page > Our Team. */
export default function Team({ content }: { content: HomeContent['team'] }) {
  if (!content.members.length) return null;
  return (
    <section id="team" className="relative overflow-hidden bg-cream-dark/60 py-16 sm:py-20 lg:py-16">
      {/* Large screens: heading on the left, people on the right, so the section fits one screen */}
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14">
        <div>
          <SectionTitle eyebrow={content.eyebrow} title={content.title} />
          {content.text && <p className="mt-6 max-w-md border-l-2 border-gold pl-4 text-sm leading-relaxed text-charcoal/75 sm:text-base">{content.text}</p>}
        </div>

        {/* Cards keep one size and centre themselves, so 1, 2, 3 or more people all sit neatly */}
        <ul data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(250px,300px))] justify-center gap-6 sm:gap-8 lg:justify-end">
          {content.members.map((m, i) => (
            <li key={`${m.name}-${i}`} className="group overflow-hidden rounded-sm bg-white shadow-lg shadow-forest-deep/10 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-forest-deep/20">
              <div className="relative aspect-[4/5] overflow-hidden bg-forest">
                {m.image && (
                  <Image src={m.image} alt={`${m.name}, ${m.role.split('\n')[0]}, Kashmir Construction Group`} fill sizes="(min-width: 640px) 300px, 90vw"
                    className="object-cover object-[50%_20%] transition duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-deep/95 via-forest-deep/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-white">{m.name}</h3>
                  {m.role && (
                    <ul className="mt-1.5 space-y-0.5">
                      {m.role.split('\n').map((r) => r.trim()).filter(Boolean).map((r) => <li key={r} className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{r}</li>)}
                    </ul>
                  )}
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </div>
              {m.bio && <p className="p-5 text-sm leading-relaxed text-charcoal/75">{m.bio}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
