import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { site } from '@/config/site';

export default function Hero() {
  const [first, second] = site.tagline.split(',');
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pt-20">
      <Image src="/images/projects/hero-site.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,138,76,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(243,154,43,0.12),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div className="animate-fade-up text-center lg:text-left">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange sm:text-sm">Construction · Design · Development</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {first},<span className="block text-brand-green">{second}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-400 sm:text-lg lg:mx-0">{site.description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 font-semibold text-white transition hover:bg-brand-green-dark">
              Start Your Project <ArrowRight className="size-4" />
            </a>
            <a href="#projects" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:border-brand-orange hover:text-brand-orange">
              View Projects
            </a>
          </div>
        </div>
        <div className="animate-fade-up mx-auto w-64 sm:w-80 lg:w-[26rem]" style={{ animationDelay: '150ms' }}>
          <Image src="/brand/logo.jpg" alt={`${site.name} logo`} width={639} height={639} className="rounded-3xl shadow-2xl shadow-brand-green/20 ring-1 ring-white/10" priority />
        </div>
      </div>
    </section>
  );
}
