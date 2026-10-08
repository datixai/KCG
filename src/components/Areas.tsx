import Image from './SiteImage';
import { MapPin } from 'lucide-react';
import { list, type HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

/** Towns KCG works in, with the head office highlighted. */
export default function Areas({ content }: { content: HomeContent['areas'] }) {
  const towns = list(content.list);
  return (
    <section id="areas" className="relative overflow-hidden bg-cream py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow={content.eyebrow} title={content.title} />
          <p data-reveal className="mt-6 max-w-lg text-base leading-relaxed text-charcoal/70 sm:text-lg">{content.text}</p>
          <ul data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {towns.map((t) => {
              const hq = t.toLowerCase() === content.headOffice.toLowerCase();
              return (
                <li key={t} className={`group flex items-center gap-2.5 rounded-sm border px-4 py-3.5 transition hover:-translate-y-1 hover:shadow-lg ${hq ? 'border-gold bg-forest text-white' : 'border-forest/15 bg-white text-forest-deep hover:border-gold'}`}>
                  <MapPin className={`size-5 shrink-0 ${hq ? 'text-gold' : 'text-gold-dark'}`} />
                  <span className="font-semibold">{t}{hq && <span className="block text-[10px] font-medium uppercase tracking-wider text-gold">Head Office</span>}</span>
                </li>
              );
            })}
          </ul>
        </div>
        {content.image && (
          <div data-curtain className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl shadow-forest-deep/20">
            <Image src={content.image} alt="The region KCG serves" fill sizes="(min-width: 1024px) 45vw, 100vw" data-parallax data-speed="6" className="scale-110 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 to-transparent" />
            <p className="absolute bottom-6 left-6 font-display text-2xl font-bold uppercase text-white">{towns.length} Towns<span className="block text-gold">& Growing</span></p>
          </div>
        )}
      </div>
    </section>
  );
}
