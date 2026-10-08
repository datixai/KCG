import { CheckCircle2 } from 'lucide-react';
import { SectionTitle } from './Services';

// TODO: replace with real figures
const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '150+', label: 'Projects Completed' },
  { value: '50+', label: 'Skilled Workers' },
  { value: '100%', label: 'Client Satisfaction' },
];
const points = ['Licensed & experienced engineers', 'Transparent pricing, no hidden costs', 'On-time project delivery', 'Quality materials guaranteed'];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Who We Are" title="About KCG" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="text-base leading-relaxed text-neutral-400 sm:text-lg">
              Kashmir Construction Group is a trusted name in building across Azad Jammu &amp; Kashmir. From family homes to
              commercial plazas, we combine local expertise with modern engineering to deliver structures that stand the test of time.
            </p>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-neutral-200">
                  <CheckCircle2 className="size-5 shrink-0 text-brand-green" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="reveal rounded-2xl border border-white/10 bg-gradient-to-br from-brand-green/10 to-transparent p-6 text-center sm:p-8">
                <div className="font-display text-3xl font-bold text-brand-orange sm:text-4xl">{s.value}</div>
                <div className="mt-2 text-xs text-neutral-400 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
