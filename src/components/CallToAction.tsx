import Image from 'next/image';
import { ArrowRight, BadgeCheck, MessagesSquare, UserCheck } from 'lucide-react';
import SectionTitle from './SectionTitle';

const perks = [
  { icon: MessagesSquare, label: 'Free Consultation' },
  { icon: UserCheck, label: 'Expert Advice' },
  { icon: BadgeCheck, label: 'Reliable Service' },
];

export default function CallToAction() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-forest-deep py-24">
      <Image src="/images/mountains-pines.webp" alt="" fill sizes="100vw" data-parallax data-speed="14" className="scale-125 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/75 to-forest-deep/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Let's Build Together" lines={['Turning Visions', 'Into Reality']} dark />
        <p data-reveal className="mt-6 max-w-lg text-white/75">Tell us about your plot, your plans and your budget — we&apos;ll take it from foundation to finish.</p>
        <a data-reveal href="#contact" className="btn-gold mt-10">Get a Quote <ArrowRight className="size-4" /></a>
        <ul data-stagger className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm font-semibold text-white">
              <span className="grid size-11 place-items-center rounded-full border border-gold/60 text-gold"><Icon className="size-5" /></span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
