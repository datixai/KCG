import Image from './SiteImage';
import { ArrowRight, Building2, Factory, Hammer, HardHat, Home, Paintbrush, PencilRuler, Route, Ruler, Settings2, Truck, Wrench, type LucideIcon } from 'lucide-react';
import type { Service } from '@/types';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';

// Icon names the admin panel can choose from
export const serviceIcons: Record<string, LucideIcon> = {
  Home, Building2, Route, Hammer, Settings2, PencilRuler, Factory, HardHat, Ruler, Paintbrush, Truck, Wrench,
};

/** Heading stays pinned on the left while the service list scrolls past on the right (desktop). */
export default function Services({ services, content }: { services: Service[]; content: HomeContent['services'] }) {
  return (
    <section id="services" className="relative bg-cream-dark/60 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden="true" className="block font-display text-[7rem] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(200,142,37,0.45)] sm:text-[9rem]">
            {String(services.length).padStart(2, '0')}
          </span>
          <SectionTitle title={content.title} className="-mt-6 sm:-mt-10" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal/70">{content.text}</p>
          <a href="#contact" className="group mt-8 inline-flex items-center gap-3 border-b-2 border-gold pb-1 font-semibold text-forest-deep transition hover:text-gold-dark">
            Discuss your project <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        <div data-stagger className="grid gap-6 sm:grid-cols-2">
          {services.map(({ id, icon, title, text, image }, i) => {
            const Icon = serviceIcons[icon] ?? HardHat;
            return (
              <article key={id} className={`group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-lg shadow-forest-deep/5 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-forest-deep/15 ${i % 2 === 1 ? 'sm:translate-y-12' : ''}`}>
                {image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={image} alt={title} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute left-4 top-4 grid size-11 place-items-center rounded-sm bg-forest-deep/85 text-gold backdrop-blur-sm">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-forest-deep">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{text}</p>
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
