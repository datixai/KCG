import { ArrowRight, BadgeCheck, MessagesSquare, UserCheck } from 'lucide-react';
import { list, type HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';
import BgVideo from './BgVideo';

const icons = [MessagesSquare, UserCheck, BadgeCheck];

export default function CallToAction({ content }: { content: HomeContent['cta'] }) {
  return (
    <section className="relative flex min-h-[75svh] items-center overflow-hidden bg-forest-deep py-24">
      {content.video && <BgVideo src={content.video} poster={content.poster} className="absolute inset-0 size-full object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/75 to-forest-deep/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow={content.eyebrow} title={content.title} dark />
        <p data-reveal className="mt-6 max-w-lg text-white/80">{content.text}</p>
        <a data-reveal href="#contact" className="btn-gold mt-10">{content.button} <ArrowRight className="size-4" /></a>
        <ul data-stagger className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
          {list(content.perks).map((label, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={label} className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="grid size-11 place-items-center rounded-full border border-gold/60 text-gold"><Icon className="size-5" /></span>
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
