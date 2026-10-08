import Image from './SiteImage';
import { ArrowRight } from 'lucide-react';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';
import RotatingBadge from './RotatingBadge';
import BgVideo from './BgVideo';

export default function About({ content }: { content: HomeContent['about'] }) {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionTitle eyebrow={content.eyebrow} title={content.title} />
          <div className="mt-8 space-y-4 text-base leading-relaxed text-charcoal/75 sm:text-lg">
            {content.text.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <a href="#why" className="btn-gold mt-10">Learn More <ArrowRight className="size-4" /></a>
        </div>

        {/* Site video with overlapping photo and gold diagonal */}
        <div className="relative mx-auto w-full max-w-xl pb-16 lg:pb-10">
          <div data-stripe className="stripe -top-10 right-10 h-[115%] w-4 rotate-[20deg]" />
          <div data-curtain className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-sm bg-forest shadow-2xl shadow-forest-deep/30">
            {content.video
              ? <BgVideo src={content.video} poster={content.poster} className="absolute inset-0 size-full object-cover" />
              : content.poster && <Image src={content.poster} alt="" fill sizes="(min-width: 1024px) 35vw, 80vw" className="object-cover" />}
          </div>
          <div data-reveal data-delay="0.3" className="absolute bottom-0 right-0 w-[52%] overflow-hidden rounded-sm border-[6px] border-cream shadow-2xl shadow-forest-deep/30">
            {content.image && (
              <div className="relative aspect-[4/3]">
                <Image src={content.image} alt="KCG batching plant, Dadyal" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            )}
            <div className="bg-forest p-4 sm:p-5">
              <p className="font-display text-sm font-bold uppercase leading-tight text-white sm:text-lg">
                {content.cardTitle}<span className="block text-gold">{content.cardHighlight}</span>
              </p>
            </div>
          </div>
          <RotatingBadge text={content.badge} className="absolute -left-2 top-1/2 sm:-left-6" />
        </div>
      </div>
    </section>
  );
}
