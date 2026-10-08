import Image from 'next/image';
import type { HomeContent } from '@/lib/home';

export default function Stats({ stats, background }: { stats: HomeContent['stats']; background: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-20 sm:py-24">
      {background && <Image src={background} alt="" fill sizes="100vw" data-parallax data-speed="15" className="scale-125 object-cover opacity-25" />}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest/70 to-forest-deep/85" />
      <div data-stagger className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={`${s.label}-${i}`} className="border-white/15 text-center lg:border-r lg:last:border-r-0">
            <div className="font-display text-5xl font-bold text-gold sm:text-6xl">
              <span data-count={s.value} data-suffix={s.suffix}>{s.value}{s.suffix}</span>
            </div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
