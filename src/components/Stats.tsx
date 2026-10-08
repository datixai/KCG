import Image from 'next/image';

// TODO: confirm real figures with the client
const stats = [
  { value: 100, suffix: '+', label: 'Projects Completed' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Skilled Professionals' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-forest-deep py-20 sm:py-24">
      <Image src="/images/mountains-peaks.webp" alt="" fill sizes="100vw" data-parallax data-speed="15" className="scale-125 object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest/60 to-forest-deep/80" />
      <div data-stagger className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-4 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-white/15 text-center lg:border-r lg:last:border-r-0">
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
