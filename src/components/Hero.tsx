import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { site } from '@/config/site';

export default function Hero() {
  const [first, second] = site.tagline.split(',');
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-20">
      <Image src="/images/projects/hero-site.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,138,76,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(243,154,43,0.12),transparent_55%)]" />
      <div className="animate-fade-up relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange sm:text-sm">Construction · Design · Development</p>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
          {first},<span className="block text-brand-green">{second}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-300 sm:text-lg">{site.description}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3.5 font-semibold text-white transition hover:bg-brand-green-dark">
            Start Your Project <ArrowRight className="size-4" />
          </a>
          <a href="#projects" className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:border-brand-orange hover:text-brand-orange">
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
