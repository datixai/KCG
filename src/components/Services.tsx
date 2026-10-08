import Image from 'next/image';
import { ArrowRight, Building2, Factory, Hammer, HardHat, Home, Paintbrush, PencilRuler, Route, Ruler, Settings2, Truck, Wrench, type LucideIcon } from 'lucide-react';
import type { Service } from '@/types';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

// Icon names the admin panel can choose from
export const serviceIcons: Record<string, LucideIcon> = {
  Home, Building2, Route, Hammer, Settings2, PencilRuler, Factory, HardHat, Ruler, Paintbrush, Truck, Wrench,
};

export default function Services({ services, content }: { services: Service[]; content: HomeContent['services'] }) {
  return (
    <section id="services" className="relative overflow-hidden bg-cream-dark/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <SectionTitle eyebrow={content.eyebrow} title={content.title} />
          <p data-reveal className="max-w-md text-base leading-relaxed text-charcoal/70 lg:justify-self-end">{content.text}</p>
        </div>

        <div data-stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, icon, title, text, image }, i) => {
            const Icon = serviceIcons[icon] ?? HardHat;
            return (
              <article key={id} className="group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-lg shadow-forest-deep/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-forest-deep/15">
                <div className="flex items-start justify-between p-7 pb-5">
                  <Icon className="size-10 text-gold-dark transition duration-500 group-hover:scale-110" strokeWidth={1.4} />
                  <span className="font-display text-3xl font-bold text-forest/10">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="px-7 text-lg font-bold text-forest-deep">{title}</h3>
                {image && (
                  <div className="relative mt-5 aspect-[16/10] overflow-hidden">
                    <Image src={image} alt={title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-forest-deep/0 transition duration-500 group-hover:bg-forest-deep/20" />
                  </div>
                )}
                <div className="flex flex-1 items-end justify-between gap-4 p-7">
                  <p className="text-sm leading-relaxed text-charcoal/65">{text}</p>
                  <a href="#contact" aria-label={`Ask about ${title}`} className="grid size-10 shrink-0 place-items-center rounded-full border border-gold text-gold-dark transition group-hover:bg-gold group-hover:text-forest-deep">
                    <ArrowRight className="size-4 transition group-hover:-rotate-45" />
                  </a>
                </div>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
