import Image from 'next/image';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

// Bento layout: some tiles span two columns/rows on larger screens
const spans = ['sm:col-span-2 sm:row-span-2', '', '', 'sm:row-span-2', '', 'sm:col-span-2', '', ''];

/** Photos from KCG's own sites. */
export default function Gallery({ content }: { content: HomeContent['gallery'] }) {
  if (!content.images.length) return null;
  return (
    <section id="gallery" className="relative bg-cream-dark/60 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} />
        <div data-stagger className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
          {content.images.map((src, i) => (
            <figure key={`${src}-${i}`} className={`group relative overflow-hidden rounded-sm bg-forest ${spans[i % spans.length]}`}>
              <Image src={src} alt="KCG construction site" fill sizes="(min-width: 640px) 50vw, 50vw" className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
