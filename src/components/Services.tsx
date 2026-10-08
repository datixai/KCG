import { Building2, Home, HardHat, Ruler, Paintbrush, Truck } from 'lucide-react';

const services = [
  { icon: Home, title: 'Residential Construction', text: 'Custom homes and villas built to last with quality materials.' },
  { icon: Building2, title: 'Commercial Projects', text: 'Plazas, offices and shops delivered on time and on budget.' },
  { icon: Ruler, title: 'Architecture & Design', text: 'Modern designs, 3D plans and approvals handled end to end.' },
  { icon: HardHat, title: 'Grey Structure', text: 'Strong foundations and structural work by experienced teams.' },
  { icon: Paintbrush, title: 'Finishing & Renovation', text: 'Interiors, tiles, paint and complete renovations.' },
  { icon: Truck, title: 'Infrastructure', text: 'Roads, retaining walls and civil works across AJK.' },
];

export default function Services() {
  return (
    <section id="services" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="What We Do" title="Our Services" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="reveal group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:-translate-y-1 hover:border-brand-green/50 sm:p-8">
              <div className="mb-5 inline-flex rounded-xl bg-brand-green/15 p-3 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                <Icon className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{text}</p>
            </div>
          ))}
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
