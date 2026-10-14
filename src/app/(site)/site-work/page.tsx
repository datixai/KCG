import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import Image from '@/components/SiteImage';
import ProjectMedia from '@/components/ProjectMedia';
import Contact from '@/components/Contact';
import { getHomeServer, getSettingsServer, getSiteWorkServer } from '@/lib/firestore-server';
import { jsonLd, SITE_URL } from '@/lib/seo';

// Everything here comes from Admin > Site Work
export const revalidate = 60;

const description = 'Real footage from Kashmir Construction Group sites: our batching plant, crews and machinery at work across Dadyal, Mirpur and Azad Kashmir.';

export const metadata: Metadata = {
  title: 'Site Work',
  description,
  alternates: { canonical: '/site-work' },
  openGraph: { title: 'Site Work | Kashmir Construction Group', description, url: '/site-work', type: 'website', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Site Work | Kashmir Construction Group', description, images: ['/og-image.jpg'] },
};

export default async function SiteWorkPage() {
  const [work, settings, home] = await Promise.all([getSiteWorkServer(), getSettingsServer(), getHomeServer()]);

  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Site Work', item: `${SITE_URL}/site-work` },
      ] },
      ...work.videos.filter((v) => v.video.startsWith('/')).map((v) => ({
        '@type': 'VideoObject',
        name: v.title || 'KCG site work',
        description: v.description || `Kashmir Construction Group site work${v.location ? ` in ${v.location}` : ''}.`,
        contentUrl: `${SITE_URL}${v.video}`,
        ...(v.image.startsWith('/') && { thumbnailUrl: `${SITE_URL}${v.image}` }),
        uploadDate: '2026-10-15',
      })),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structured)} />

      <section className="relative overflow-hidden bg-forest-deep pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
        <Image src="/images/site/plant-collage.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.2em] text-white/60">
            <a href="/" className="hover:text-gold">Home</a> <span className="mx-2">/</span> <span className="text-gold">{work.title}</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{work.eyebrow}</p>
          <h1 className="font-display text-[clamp(1.75rem,9.5vw,2.25rem)] font-bold uppercase leading-[1.02] sm:text-6xl">{work.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">{work.text}</p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {work.videos.length === 0 ? (
            <p className="text-center text-charcoal/60">Site videos will appear here soon.</p>
          ) : (
            <ul className="grid gap-10 md:grid-cols-2 md:gap-12 xl:grid-cols-3">
              {work.videos.map((v, i) => (
                <li key={`${v.video}-${i}`} data-reveal>
                  <ProjectMedia p={{ id: String(i), title: v.title || 'Site work', location: v.location, category: '', image: v.image, video: v.video }} priority={i === 0} />
                  {v.title && <h2 className="mt-5 font-display text-2xl font-bold uppercase leading-tight text-forest-deep">{v.title}</h2>}
                  {v.location && <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-charcoal/75"><MapPin className="size-4 text-gold-dark" /> {v.location}</p>}
                  {v.description && <p className="mt-3 leading-relaxed text-charcoal/75">{v.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <Contact settings={settings} content={home.contact} />
    </>
  );
}
