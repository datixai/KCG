import Image from 'next/image';
import { Clock, Coins, MountainSnow, ShieldCheck } from 'lucide-react';
import SectionTitle from './SectionTitle';

const reasons = [
  { icon: MountainSnow, title: 'Local Expertise', text: 'Deep understanding of the region and its needs.' },
  { icon: ShieldCheck, title: 'High-Quality Workmanship', text: 'Built to last using trusted materials and techniques.' },
  { icon: Clock, title: 'On-Time Project Delivery', text: 'Efficient planning and reliable execution.' },
  { icon: Coins, title: 'Competitive Pricing', text: 'Cost-effective solutions without compromising quality.' },
];

export default function WhyKcg() {
  return (
    <section id="why" className="relative grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
      {/* Dark side with diagonal gold edge */}
      <div className="relative overflow-hidden bg-forest-deep px-4 py-24 sm:px-10 lg:py-32 lg:pr-24 lg:[clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]">
        <Image src="/images/mountains-peaks.webp" alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" data-parallax data-speed="10" className="scale-125 object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-deep/60 to-forest/80" />
        <div className="relative mx-auto flex max-w-xl items-center gap-8 lg:ml-auto lg:mr-0">
          <Image data-reveal src="/brand/logo-mark-light.png" alt="" width={213} height={255} className="hidden h-36 w-auto sm:block" />
          <SectionTitle eyebrow="Why Choose KCG" lines={['Building', 'More Than', 'Structures']} dark />
        </div>
      </div>
      <div data-stripe className="stripe left-[calc(55%-3rem)] top-0 hidden h-full w-3 -rotate-[7.5deg] lg:block" />

      {/* Light side: reasons */}
      <div className="bg-cream px-4 py-20 sm:px-10 lg:py-28">
        <ol data-stagger className="mx-auto max-w-lg space-y-2 lg:ml-0">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="group flex items-start gap-5 rounded-sm border-b border-forest/10 p-5 transition hover:bg-white hover:shadow-xl hover:shadow-forest-deep/5">
              <span className="font-display text-sm font-bold text-gold-dark">{String(i + 1).padStart(2, '0')}</span>
              <Icon className="size-9 shrink-0 text-forest transition duration-500 group-hover:text-gold-dark" strokeWidth={1.4} />
              <div>
                <h3 className="font-bold text-forest-deep">{title}</h3>
                <p className="mt-1 text-sm text-charcoal/65">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
