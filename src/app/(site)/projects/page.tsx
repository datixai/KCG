import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import Image from '@/components/SiteImage';
import SectionTitle from '@/components/SectionTitle';
import ProjectMedia from '@/components/ProjectMedia';
import Contact from '@/components/Contact';
import { getHomeServer, getProjectsServer, getSettingsServer } from '@/lib/firestore-server';
import { jsonLd, SITE_URL } from '@/lib/seo';

// Everything here comes from Admin > Projects, refreshed at most once a minute
export const revalidate = 60;

const description = 'Homes, marquees, commercial buildings and batching plants built by Kashmir Construction Group in Dadyal, Mirpur, Kotli and across Azad Kashmir. Videos, photos and project details.';

export const metadata: Metadata = {
  title: 'Our Projects',
  description,
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Our Projects | Kashmir Construction Group', description, url: '/projects', type: 'website', images: [{ url: '/og-image.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: 'Our Projects | Kashmir Construction Group', description, images: ['/og-image.jpg'] },
};

export default async function ProjectsPage() {
  const [projects, settings, home] = await Promise.all([getProjectsServer(), getSettingsServer(), getHomeServer()]);

  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Our Projects', item: `${SITE_URL}/projects` },
      ] },
      { '@type': 'ItemList', name: 'Kashmir Construction Group projects', itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem', position: i + 1, name: p.title, description: p.description || `${p.category} project in ${p.location}`,
      })) },
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
            <a href="/" className="hover:text-gold">Home</a> <span className="mx-2">/</span> <span className="text-gold">Projects</span>
          </nav>
          <h1 className="font-display text-[clamp(1.75rem,9.5vw,2.25rem)] font-bold uppercase leading-[1.02] sm:text-6xl">
            Our <span className="text-gold">Projects</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">Homes, marquees, commercial buildings and batching plants we have built and designed across Azad Kashmir.</p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{projects.length} {projects.length === 1 ? 'Project' : 'Projects'}</p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:space-y-28 sm:px-6">
          {projects.length === 0 && <p className="text-center text-charcoal/60">Projects will appear here soon.</p>}
          {projects.map((p, i) => {
            const gallery = (p.gallery ?? []).filter(Boolean);
            return (
              <article key={p.id} id={`project-${p.id}`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
                <div data-reveal className={`lg:col-span-7 ${i % 2 ? 'lg:order-2' : ''}`}>
                  <ProjectMedia p={p} priority={i === 0} />
                </div>
                <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(200,142,37,0.5)]">{String(i + 1).padStart(2, '0')}</span>
                    {p.category && <span className="rounded-sm bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-forest-deep">{p.category}</span>}
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight text-forest-deep sm:text-4xl">{p.title}</h2>
                  {p.location && <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-charcoal/75"><MapPin className="size-4 text-gold-dark" /> {p.location}</p>}
                  {p.description && <p className="mt-5 leading-relaxed text-charcoal/75">{p.description}</p>}
                  {gallery.length > 0 && (
                    <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                      {gallery.map((src, g) => (
                        <li key={`${src}-${g}`} className="relative aspect-square overflow-hidden rounded-sm bg-forest">
                          <a href={src} target="_blank" rel="noopener" aria-label={`Open photo ${g + 1} of ${p.title}`} className="group block size-full">
                            <Image src={src} alt={`${p.title}, photo ${g + 1}`} fill sizes="(min-width: 1024px) 12vw, 30vw" className="object-cover transition duration-500 group-hover:scale-110" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a href="#contact" className="btn-gold mt-8">Discuss a Similar Project</a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-forest py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle eyebrow="Your Project Next" title={'Planning Something\nSimilar?'} dark center />
          <p className="mx-auto mt-5 max-w-xl text-white/75">Tell us about your plot and plans. We build homes, marquees, plazas and more across Dadyal, Mirpur, Kotli and the surrounding areas.</p>
        </div>
      </section>

      <Contact settings={settings} content={home.contact} />
    </>
  );
}
