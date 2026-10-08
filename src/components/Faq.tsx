import { Plus } from 'lucide-react';
import SectionTitle from './SectionTitle';

/** Questions and answers as native <details>, so they open without JavaScript and stay readable to search engines. */
export default function Faq({ title, items, className = 'bg-white' }: { title: string; items: { q: string; a: string }[]; className?: string }) {
  return (
    <section id="faq" className={`py-24 sm:py-28 ${className}`}>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
        <SectionTitle eyebrow="FAQ" title={title} />
        <div data-stagger className="divide-y divide-forest/15 border-y border-forest/15">
          {items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-forest-deep [&::-webkit-details-marker]:hidden">
                <h3>{f.q}</h3>
                <Plus className="mt-1 size-5 shrink-0 text-gold-dark transition group-open:rotate-45" />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
