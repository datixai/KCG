import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SectionTitle from './SectionTitle';
import RotatingBadge from './RotatingBadge';

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow="About KCG" lines={['A Commitment', 'to a Stronger', 'Kashmir']} />
          <div data-reveal className="mt-8 space-y-4 text-base leading-relaxed text-charcoal/75 sm:text-lg">
            <p>
              Kashmir Construction Group (KCG) is a forward-thinking construction and development company dedicated to
              delivering high-quality projects across Azad Kashmir and the surrounding regions.
            </p>
            <p>
              We combine modern construction techniques with local expertise to create sustainable, innovative and
              long-lasting infrastructure that supports communities and drives growth.
            </p>
          </div>
          <a data-reveal href="#why" className="btn-gold mt-10">Learn More <ArrowRight className="size-4" /></a>
        </div>

        {/* Overlapping photos with gold diagonal */}
        <div className="relative mx-auto w-full max-w-xl pb-16 lg:pb-10">
          <div data-stripe className="stripe -top-10 right-10 h-[115%] w-4 rotate-[20deg]" />
          <div data-curtain className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-sm shadow-2xl shadow-forest-deep/30">
            <Image src="/images/kashmir-village.webp" alt="Building in the valleys of Kashmir" fill sizes="(min-width: 1024px) 35vw, 80vw" data-parallax data-speed="6" className="scale-110 object-cover" />
          </div>
          <div data-reveal data-delay="0.3" className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-sm border-[6px] border-cream shadow-2xl shadow-forest-deep/30">
            <div className="relative aspect-[4/3]">
              <Image src="/images/projects/grey-structure.webp" alt="KCG structure under construction" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="bg-forest p-4 sm:p-5">
              <p className="font-display text-sm font-bold uppercase leading-tight text-white sm:text-lg">
                Modern Equipment.<span className="block text-gold">Local Ambition.</span>
              </p>
            </div>
          </div>
          <RotatingBadge className="absolute -left-2 top-1/2 sm:-left-6" />
        </div>
      </div>
    </section>
  );
}
