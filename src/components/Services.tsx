import Image from 'next/image';
import { Building2, Home, HardHat, Ruler, Paintbrush, Truck, Hammer, Wrench, type LucideIcon } from 'lucide-react';
import type { Service } from '@/types';

// Icon names the admin panel can choose from
export const serviceIcons: Record<string, LucideIcon> = { Home, Building2, Ruler, HardHat, Paintbrush, Truck, Hammer, Wrench };

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="What We Do" title="Our Services" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, icon, title, text, image }) => {
            const Icon = serviceIcons[icon] ?? HardHat;
            return (
              <div key={id} className="reveal group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:-translate-y-1 hover:border-brand-green/50">
                {image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-soft to-transparent" />
                  </div>
                )}
                <div className={`p-6 sm:p-8 ${image ? 'relative -mt-12' : ''}`}>
                  <div className="mb-5 inline-flex rounded-xl bg-brand-green/90 p-3 text-white shadow-lg transition group-hover:bg-brand-orange">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange sm:text-sm">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
