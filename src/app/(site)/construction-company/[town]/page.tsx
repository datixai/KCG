import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import Image from '@/components/SiteImage';
import SectionTitle from '@/components/SectionTitle';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import { getHomeServer, getServicesServer, getSettingsServer } from '@/lib/firestore-server';
import { jsonLd, townBySlug, townJsonLd, townPath, towns } from '@/lib/seo';

export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return towns.map((t) => ({ town: t.slug }));
}

type Props = { params: Promise<{ town: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = townBySlug((await params).town);
  if (!t) return {};
  const title = `Construction Company in ${t.name}, ${t.region}`;
  const description = `Construction company in ${t.name}, ${t.region}: new homes, commercial buildings, renovations and ready-mix concrete by Kashmir Construction Group. Free quotes.`;
  return {
    title,
    description,
    alternates: { canonical: townPath(t) },
    openGraph: { title: `${title} | KCG`, description, url: townPath(t), type: 'website', siteName: 'Kashmir Construction Group', images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title: `${title} | KCG`, description, images: ['/og-image.jpg'] },
  };
}

export default async function TownPage({ params }: Props) {
  const t = townBySlug((await params).town);
  if (!t) notFound();
  const [services, settings, home] = await Promise.all([getServicesServer(), getSettingsServer(), getHomeServer()]);
  const nearby = t.nearby.map(townBySlug).filter((n) => !!n);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(townJsonLd(t, services))} />

      <section className="relative overflow-hidden bg-forest-deep pb-20 pt-36 text-white sm:pt-44">
        <Image src="/images/site/plant-collage.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.2em] text-white/60">
            <a href="/" className="hover:text-gold">Home</a> <span className="mx-2">/</span> <span className="text-gold">{t.name}</span>
          </nav>
          <h1 className="font-display text-[clamp(1.75rem,9.5vw,2.25rem)] font-bold uppercase leading-[1.02] sm:text-6xl">
            Construction Company<span className="block text-gold">in {t.name}</span>
          </h1>
          <p className="mt-6 flex items-center gap-2 text-sm text-white/70"><MapPin className="size-4 text-gold" /> {t.name}, {t.region}</p>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{t.blurb}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="btn-gold">Get a Free Quote <ArrowRight className="size-4" /></a>
            <a href="/#projects" className="btn-outline">See Our Projects</a>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow={`Building in ${t.name}`} title={`Your Local\nBuilders`} />
            {t.intro.map((p) => <p key={p.slice(0, 24)} className="mt-6 text-base leading-relaxed text-charcoal/75 sm:text-lg">{p}</p>)}
          </div>
          <ul data-stagger className="grid content-center gap-4">
            {t.points.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-sm border border-forest/15 bg-white p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-forest text-gold"><Check className="size-5" /></span>
                <span><h3 className="font-semibold text-forest-deep">{p.title}</h3><span className="mt-1 block text-sm text-charcoal/70">{p.text}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-forest-deep py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="What We Do" title={`Our Services\nin ${t.name}`} dark />
          <ul data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id} className="overflow-hidden rounded-sm border border-white/10 bg-forest">
                {s.image && <div className="relative aspect-[16/10]"><Image src={s.image} alt={`${s.title} in ${t.name}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div>}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq title={`${t.name}\nQuestions`} items={t.faqs} />

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold uppercase text-forest-deep">We Also Build In</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {nearby.map((n) => (
              <li key={n.slug}>
                <a href={townPath(n)} className="flex items-center gap-2 rounded-sm border border-forest/15 bg-white px-4 py-3 font-semibold text-forest-deep transition hover:border-gold">
                  <MapPin className="size-4 text-gold-dark" /> Construction in {n.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact settings={settings} content={home.contact} />
    </>
  );
}
