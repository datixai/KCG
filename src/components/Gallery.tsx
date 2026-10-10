import Image from './SiteImage';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

// Bento layout: some tiles span two columns/rows on larger screens (with matching image sizes).
// Each set of 8 fills exactly 4 rows of 4, so there's never a gap at the end.
const tiles = [
  { span: 'sm:col-span-2 sm:row-span-2', sizes: '(min-width: 640px) 50vw, 100vw' },
  { span: '', sizes: '(min-width: 640px) 25vw, 50vw' },
  { span: '', sizes: '(min-width: 640px) 25vw, 50vw' },
  { span: 'sm:row-span-2', sizes: '(min-width: 640px) 25vw, 50vw' },
  { span: '', sizes: '(min-width: 640px) 25vw, 50vw' },
  { span: '', sizes: '(min-width: 640px) 25vw, 50vw' },
  { span: '', sizes: '(min-width: 640px) 25vw, 50vw' },
  { span: '', sizes: '(min-width: 640px) 25vw, 50vw' },
];

/** Photos from KCG's own sites. */
export default function Gallery({ content }: { content: HomeContent['gallery'] }) {
  if (!content.images.length) return null;
  return (
    <section id="gallery" className="relative bg-cream-dark/60 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle title={content.title} />
          <p className="max-w-xs border-l-2 border-gold pl-4 text-sm text-charcoal/65">Real photos from our own sites, no stock images.</p>
        </div>
        <div data-stagger className="mt-14 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4 sm:gap-4">
          {content.images.map((src, i) => {
            const t = tiles[i % tiles.length];
            return (
              <figure key={`${src}-${i}`} className={`group relative overflow-hidden rounded-sm bg-forest ${t.span}`}>
                <Image src={src} alt="Kashmir Construction Group site work in Dadyal, Azad Kashmir" fill sizes={t.sizes} className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
