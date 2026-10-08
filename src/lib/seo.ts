/**
 * Search setup: keywords, the towns we target, and structured data (JSON-LD) that tells
 * Google, Bing and AI answer engines (ChatGPT, Perplexity, Google AI Overviews) who KCG is,
 * where it works and what it does.
 */
import { site } from '@/config/site';
import type { Service, SiteSettings } from '@/types';

export const SITE_URL = site.url;

// Head office on the Kallar Syedan – Dadyal Road
export const GEO = { latitude: 33.2226, longitude: 73.7108 };

export const KEYWORDS = [
  'construction company Dadyal',
  'construction company Mirpur',
  'construction company Mirpur Azad Kashmir',
  'construction company Kotli',
  'builders in Mirpur',
  'builders in Dadyal',
  'house construction Mirpur',
  'house construction Kotli',
  'home builders Azad Kashmir',
  'contractor Mirpur AJK',
  'construction company AJK',
  'construction company Azad Kashmir',
  'ready mix concrete Mirpur',
  'concrete batching plant Dadyal',
  'commercial construction Mirpur',
  'construction company Chakswari',
  'construction company Jhelum',
  'build a house in Mirpur from UK',
  'Kashmir Construction Group',
  'KCG Dadyal',
];

export interface Town {
  slug: string;
  name: string;
  region: string;
  /** One-line summary for cards and meta descriptions. */
  blurb: string;
  /** Unique copy for the town page, one paragraph per item. */
  intro: string[];
  /** Local points we cover on the page. */
  points: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  nearby: string[];
}

const AJK = 'Azad Kashmir';

/** Towns with their own landing page. The order here is the order shown on the site. */
export const towns: Town[] = [
  {
    slug: 'dadyal',
    name: 'Dadyal',
    region: AJK,
    blurb: 'Our head office and batching plant are in Dadyal, so we can be on any site in town the same day.',
    intro: [
      'Kashmir Construction Group is based in Dadyal. Our office and concrete batching plant are on the Kallar Syedan – Dadyal Road, so projects in Dadyal get our quickest response, our own ready-mix concrete and a team that knows the local ground and suppliers.',
      'We build new family homes, shops and plazas, extensions and renovations across Dadyal and the villages around it, and we manage the whole job from drawings and approvals to the final finish.',
    ],
    points: [
      { title: 'Local head office', text: 'Visit us, see the plant and meet the team before you commit.' },
      { title: 'Our own ready-mix concrete', text: 'Concrete from our Dadyal plant, poured fresh and on schedule.' },
      { title: 'Families building from abroad', text: 'Clear quotes and regular photo and video updates on WhatsApp, wherever you live.' },
    ],
    faqs: [
      { q: 'Where is the Kashmir Construction Group office in Dadyal?', a: `Our office is at ${site.address}. You are welcome to visit.` },
      { q: 'Do you supply ready-mix concrete in Dadyal?', a: 'Yes. We run our own concrete batching plant in Dadyal and supply ready-mix concrete for our projects and for other builders in the area.' },
      { q: 'Can you build my house in Dadyal while I live in the UK?', a: 'Yes. Many of our clients live overseas. We agree the design and price up front and keep you updated with photos and videos on WhatsApp throughout the build.' },
    ],
    nearby: ['mirpur', 'chakswari', 'islamgarh', 'kotli'],
  },
  {
    slug: 'mirpur',
    name: 'Mirpur',
    region: AJK,
    blurb: 'Homes, plazas and ready-mix concrete across Mirpur city, New Mirpur and the Mangla area.',
    intro: [
      'Mirpur is one of the fastest-growing cities in Azad Kashmir, and many of the families building here live in the UK. Kashmir Construction Group builds modern homes, commercial plazas and extensions across Mirpur, New Mirpur City and the villages around Mangla Lake.',
      'Our batching plant in nearby Dadyal supplies ready-mix concrete to Mirpur sites, and one project manager stays with your build from the first drawing to handover.',
    ],
    points: [
      { title: 'Homes for overseas families', text: 'A fixed scope, a clear price and progress updates on WhatsApp for clients in the UK and abroad.' },
      { title: 'Commercial and plazas', text: 'Shops, offices and mixed-use plazas built to last.' },
      { title: 'Ready-mix concrete', text: 'Concrete delivered to Mirpur sites from our Dadyal plant.' },
    ],
    faqs: [
      { q: 'Do you build houses in Mirpur, Azad Kashmir?', a: 'Yes. We build new homes, extensions and renovations across Mirpur, New Mirpur City and the Mangla area.' },
      { q: 'Can I build a house in Mirpur from the UK?', a: 'Yes. We work with many UK-based families. Contact us on WhatsApp at +44 7440 392017 to discuss your plot and plans.' },
      { q: 'Do you deliver ready-mix concrete to Mirpur?', a: 'Yes. Our batching plant in Dadyal supplies ready-mix concrete to sites in Mirpur.' },
    ],
    nearby: ['dadyal', 'khari-sharif', 'islamgarh', 'bhimber'],
  },
  {
    slug: 'kotli',
    name: 'Kotli',
    region: AJK,
    blurb: 'Building on Kotli’s hillside plots with the right foundations, drainage and retaining walls.',
    intro: [
      'Kotli’s hilly ground and sloping plots need careful planning. Kashmir Construction Group builds homes, commercial buildings and access roads across Kotli city and the surrounding villages, with foundations, retaining walls and drainage designed for the terrain.',
      'From site survey to the final finish we manage the whole project, so you deal with one team and one point of contact.',
    ],
    points: [
      { title: 'Sloping and hillside plots', text: 'Retaining walls, cut-and-fill and drainage planned before we build.' },
      { title: 'Homes and commercial', text: 'Family homes, shops and offices across Kotli and its villages.' },
      { title: 'Roads and infrastructure', text: 'Access roads, culverts and site works for private and community projects.' },
    ],
    faqs: [
      { q: 'Do you work in Kotli, Azad Kashmir?', a: 'Yes. We build homes, commercial buildings and infrastructure across Kotli city and the surrounding villages.' },
      { q: 'Can you build on a sloping plot in Kotli?', a: 'Yes. We plan retaining walls, foundations and drainage for hillside plots before construction starts.' },
      { q: 'How do I get a quote for a project in Kotli?', a: 'Send us your plot location and plans through the contact form or on WhatsApp and we will arrange a site visit.' },
    ],
    nearby: ['chakswari', 'dadyal', 'islamgarh', 'mirpur'],
  },
  {
    slug: 'chakswari',
    name: 'Chakswari',
    region: AJK,
    blurb: 'New homes and renovations in Chakswari, a short drive from our Dadyal base.',
    intro: [
      'Chakswari is a short drive from our Dadyal head office, so our team and our concrete reach your site quickly. We build new family homes, renovate and extend existing houses, and put up shops and small commercial buildings across Chakswari and its villages.',
      'Many Chakswari families live in the UK, and we make it easy to build from abroad with a clear price, a set timeline and regular updates.',
    ],
    points: [
      { title: 'Close to our base', text: 'Quick site visits and fast concrete delivery from Dadyal.' },
      { title: 'Renovations and extensions', text: 'Modernise or extend your family home without starting again.' },
      { title: 'Updates from abroad', text: 'Photo and video progress reports on WhatsApp.' },
    ],
    faqs: [
      { q: 'Do you build houses in Chakswari?', a: 'Yes. We build new homes and renovate or extend existing houses across Chakswari and its villages.' },
      { q: 'How far is Chakswari from your office?', a: 'Chakswari is a short drive from our Dadyal head office, so we can visit sites quickly.' },
    ],
    nearby: ['dadyal', 'islamgarh', 'kotli', 'mirpur'],
  },
  {
    slug: 'islamgarh',
    name: 'Islamgarh',
    region: AJK,
    blurb: 'House construction, extensions and commercial builds in Islamgarh and nearby villages.',
    intro: [
      'Kashmir Construction Group builds in Islamgarh and the villages between Mirpur, Dadyal and Chakswari. We handle new homes, extensions, boundary walls, shops and small plazas, with our own ready-mix concrete from Dadyal.',
      'You get one team for the whole job: design, approvals, construction and finishing.',
    ],
    points: [
      { title: 'New homes', text: 'Modern family homes built to a clear plan and price.' },
      { title: 'Shops and plazas', text: 'Small commercial buildings for local businesses.' },
      { title: 'One team', text: 'Design, construction and finishing managed by KCG.' },
    ],
    faqs: [
      { q: 'Do you work in Islamgarh?', a: 'Yes. We build homes and commercial buildings in Islamgarh and the surrounding villages.' },
      { q: 'Do you provide the concrete as well?', a: 'Yes. Ready-mix concrete comes from our own batching plant in Dadyal.' },
    ],
    nearby: ['dadyal', 'chakswari', 'mirpur', 'kotli'],
  },
  {
    slug: 'khari-sharif',
    name: 'Khari Sharif',
    region: AJK,
    blurb: 'Homes and community buildings in Khari Sharif and the villages east of Mirpur.',
    intro: [
      'Kashmir Construction Group builds homes, shops and community buildings in Khari Sharif and the villages around it. Being close to Mirpur and Dadyal, your site is well within reach of our team and our batching plant.',
      'Whether you are building a new house, adding a floor or renovating, we plan the work properly and keep you informed at every stage.',
    ],
    points: [
      { title: 'Homes and extensions', text: 'New houses, extra floors and renovations.' },
      { title: 'Community buildings', text: 'Halls, schools and community projects built with care.' },
      { title: 'Reliable concrete', text: 'Ready-mix delivered from our Dadyal plant.' },
    ],
    faqs: [
      { q: 'Do you build in Khari Sharif?', a: 'Yes. We build homes, extensions and community buildings in Khari Sharif and nearby villages.' },
      { q: 'Can you add a floor to my existing house?', a: 'Yes. We check the existing structure first, then plan and build the extension safely.' },
    ],
    nearby: ['mirpur', 'dadyal', 'bhimber', 'islamgarh'],
  },
  {
    slug: 'bhimber',
    name: 'Bhimber',
    region: AJK,
    blurb: 'Residential, commercial and infrastructure work in Bhimber and Samahni.',
    intro: [
      'Kashmir Construction Group takes on residential, commercial and infrastructure work in Bhimber and the surrounding area, including Samahni and Barnala.',
      'We plan each project in detail before we start, give you a clear price and manage the build through to handover.',
    ],
    points: [
      { title: 'Residential', text: 'New homes and renovations for families.' },
      { title: 'Commercial', text: 'Shops, offices and plazas.' },
      { title: 'Infrastructure', text: 'Roads, drainage and site works.' },
    ],
    faqs: [
      { q: 'Do you take projects in Bhimber?', a: 'Yes. We work in Bhimber and the surrounding area, including Samahni and Barnala.' },
      { q: 'What kind of projects do you take on?', a: 'Homes, commercial buildings, renovations, infrastructure and ready-mix concrete supply.' },
    ],
    nearby: ['mirpur', 'khari-sharif', 'jhelum', 'dadyal'],
  },
  {
    slug: 'jhelum',
    name: 'Jhelum',
    region: 'Punjab',
    blurb: 'Bringing our Kashmir construction team to homes and commercial projects in Jhelum.',
    intro: [
      'From our base across the river in Dadyal, Kashmir Construction Group builds homes, commercial buildings and infrastructure in Jhelum city and the surrounding area.',
      'You get the same team, standards and project management we bring to every KCG project, with one point of contact from start to finish.',
    ],
    points: [
      { title: 'Homes', text: 'New houses, extensions and renovations.' },
      { title: 'Commercial', text: 'Shops, offices, plazas and warehouses.' },
      { title: 'Project management', text: 'Planning, approvals, suppliers and site supervision.' },
    ],
    faqs: [
      { q: 'Do you work in Jhelum, Punjab?', a: 'Yes. We build homes and commercial buildings in Jhelum city and the surrounding area.' },
      { q: 'Can you manage my whole project in Jhelum?', a: 'Yes. We handle planning, approvals, suppliers and site supervision through to handover.' },
    ],
    nearby: ['dina', 'mirpur', 'dadyal', 'bhimber'],
  },
  {
    slug: 'dina',
    name: 'Dina',
    region: 'Punjab',
    blurb: 'Construction for homes and businesses in Dina and along the GT Road near Mangla.',
    intro: [
      'Dina sits on the GT Road close to Mangla, within easy reach of our Dadyal base. Kashmir Construction Group builds homes, shops and commercial buildings in Dina and the surrounding villages.',
      'We agree the plan and price before we start and keep you updated until the keys are handed over.',
    ],
    points: [
      { title: 'Homes', text: 'Family homes and extensions.' },
      { title: 'Roadside commercial', text: 'Shops, showrooms and plazas along the GT Road.' },
      { title: 'Clear pricing', text: 'A detailed quote before any work begins.' },
    ],
    faqs: [
      { q: 'Do you build in Dina?', a: 'Yes. We build homes and commercial buildings in Dina and the surrounding villages.' },
      { q: 'Do you build shops and showrooms on the GT Road?', a: 'Yes. We build roadside shops, showrooms and plazas in the Dina area.' },
    ],
    nearby: ['jhelum', 'mirpur', 'dadyal', 'khari-sharif'],
  },
];

export const townBySlug = (slug: string) => towns.find((t) => t.slug === slug);
export const townPath = (t: Town) => `/construction-company/${t.slug}`;

/** General questions shown on the home page (and marked up as FAQPage). */
export const homeFaqs = [
  { q: 'Where does Kashmir Construction Group work?', a: `We are based in Dadyal and build across Azad Kashmir and nearby Punjab, including ${towns.map((t) => t.name).join(', ')}.` },
  { q: 'What services does KCG offer?', a: 'Residential construction, commercial buildings, infrastructure, ready-mix concrete and batching plants, project management, and renovations and extensions.' },
  { q: 'Can I build a house in Azad Kashmir while living in the UK?', a: 'Yes. Many of our clients live in the UK and abroad. We agree the design and price up front and send regular photo and video updates on WhatsApp.' },
  { q: 'How do I get a quote?', a: 'Fill in the contact form, call +92 345 5546831 or message us on WhatsApp at +44 7440 392017. Consultations are free.' },
];

/* ---------- Structured data ---------- */

const ORG_ID = `${SITE_URL}/#organization`;

export function businessJsonLd(settings: SiteSettings, services: Service[]) {
  const phones = [settings.phoneDisplay, settings.phone2Display].filter(Boolean).map((p) => p.replace(/[^\d+]/g, ''));
  const sameAs = [settings.facebook, settings.instagram, settings.tiktok, settings.youtube, settings.linkedin].filter((u) => /^https:\/\//.test(u || ''));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['GeneralContractor', 'LocalBusiness'],
        '@id': ORG_ID,
        name: site.name,
        alternateName: ['KCG', 'Kashmir Construction Group Dadyal', 'KCG Azad Kashmir'],
        description: site.description,
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo-full-light.png`,
        image: `${SITE_URL}/og-image.jpg`,
        telephone: phones[0],
        email: settings.email || site.email,
        ...(settings.owner && { founder: { '@type': 'Person', name: settings.owner } }),
        priceRange: '$$',
        currenciesAccepted: 'PKR, GBP',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Paagliyan, Dhangali, Kallar Syedan – Dadyal Road',
          addressLocality: 'Dadyal',
          addressRegion: 'Azad Jammu and Kashmir',
          addressCountry: 'PK',
        },
        geo: { '@type': 'GeoCoordinates', ...GEO },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`,
        areaServed: [
          ...towns.map((t) => ({ '@type': 'City', name: t.name, containedInPlace: { '@type': 'AdministrativeArea', name: t.region } })),
          { '@type': 'AdministrativeArea', name: 'Azad Jammu and Kashmir' },
        ],
        contactPoint: phones.map((telephone, i) => ({
          '@type': 'ContactPoint', telephone, contactType: i === 0 ? 'customer service' : 'sales',
          areaServed: i === 0 ? 'PK' : 'GB', availableLanguage: ['English', 'Urdu', 'Punjabi'],
        })),
        knowsAbout: ['House construction', 'Commercial construction', 'Ready-mix concrete', 'Concrete batching plants', 'Infrastructure', 'Renovation', 'Project management'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Construction services',
          itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })),
        },
        ...(sameAs.length && { sameAs }),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: site.name,
        inLanguage: 'en',
        publisher: { '@id': ORG_ID },
      },
    ],
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function townJsonLd(t: Town, services: Service[]) {
  const url = `${SITE_URL}${townPath(t)}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: `Construction Company in ${t.name}`, item: url },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `Construction services in ${t.name}`,
        serviceType: 'Construction',
        description: t.blurb,
        url,
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'City', name: t.name, containedInPlace: { '@type': 'AdministrativeArea', name: t.region } },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `Construction services in ${t.name}`,
          itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${s.title} in ${t.name}` } })),
        },
      },
      { ...faqJsonLd(t.faqs), '@context': undefined },
    ],
  };
}

/** Safe to drop into a <script> tag: stops "</script>" in admin-entered text from breaking out. */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });
