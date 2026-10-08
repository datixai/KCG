import { Building2, Handshake, HardHat, Users } from 'lucide-react';
import type { HomeContent } from '@/lib/home';

const icons = [HardHat, Building2, Handshake, Users];

export default function Promises({ items }: { items: HomeContent['promises'] }) {
  return (
    <section className="relative border-y border-gold/20 bg-forest-deep">
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, text }, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div key={`${title}-${i}`} className="group flex items-center gap-4 border-white/10 px-4 py-7 sm:px-6 lg:border-r lg:last:border-r-0 [&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b">
              <Icon className="size-9 shrink-0 text-gold transition duration-500 group-hover:-translate-y-1 group-hover:scale-110 sm:size-11" strokeWidth={1.4} />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white sm:text-sm">{title}</p>
                <p className="mt-1 text-[11px] text-white/55 sm:text-xs">{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
