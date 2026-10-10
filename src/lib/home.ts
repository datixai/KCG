/**
 * Everything on the home page that isn't a project, service or contact detail.
 * Stored in Firestore at settings/home and edited from Admin > Home Page.
 * Multi-line "title" fields: one heading line per line, the last line is gold.
 * Comma-separated fields become lists.
 */
export interface HomeContent {
  hero: { eyebrow: string; title: string; text: string; primaryCta: string; secondaryCta: string; location: string; video: string; videoMobile: string; poster: string };
  promises: { title: string; text: string }[];
  about: { eyebrow: string; title: string; text: string; badge: string; cardTitle: string; cardHighlight: string; video: string; poster: string; image: string };
  stats: { value: number; suffix: string; label: string }[];
  services: { eyebrow: string; title: string; text: string };
  projects: { eyebrow: string; title: string };
  areas: { eyebrow: string; title: string; text: string; headOffice: string; list: string; image: string };
  why: { eyebrow: string; title: string; image: string; reasons: { title: string; text: string }[] };
  gallery: { eyebrow: string; title: string; images: string[] };
  cta: { eyebrow: string; title: string; text: string; button: string; perks: string; video: string; poster: string };
  contact: { eyebrow: string; title: string; formTitle: string; formText: string };
  footer: { blurb: string };
}

export const defaultHome: HomeContent = {
  hero: {
    eyebrow: 'Kashmir Construction Group',
    title: 'The\nFoundation\nof Modern\nKashmir',
    text: 'Delivering high-quality construction, development and infrastructure projects across Azad Kashmir and beyond.',
    primaryCta: 'Get a Quote',
    secondaryCta: 'Our Projects',
    location: 'Dadyal, Azad Kashmir',
    video: '/videos/hero-site.mp4',
    videoMobile: '/videos/hero-site-mobile.mp4',
    poster: '/videos/hero-site-poster.webp',
  },
  promises: [
    { title: 'Quality Construction', text: 'Built to the highest standards' },
    { title: 'Modern Designs', text: 'Contemporary & functional' },
    { title: 'Trusted Experts', text: 'Years of industry experience' },
    { title: 'Building Kashmir', text: 'Investing in stronger communities' },
  ],
  about: {
    eyebrow: 'About KCG',
    title: 'A Commitment\nto a Stronger\nKashmir',
    text:
      'Kashmir Construction Group (KCG) is a forward-thinking construction and development company dedicated to delivering high-quality projects across Azad Kashmir and the surrounding regions.\n\nWe combine modern construction techniques with local expertise to create sustainable, innovative and long-lasting infrastructure that supports communities and drives growth.',
    badge: 'Kashmir Construction Group •',
    cardTitle: 'Modern Equipment.',
    cardHighlight: 'Local Ambition.',
    video: '/videos/aerial-site.mp4',
    poster: '/videos/aerial-site-poster.webp',
    image: '/images/site/plant-wide.webp',
  },
  // TODO: confirm real figures with the client
  stats: [
    { value: 100, suffix: '+', label: 'Projects Completed' },
    { value: 10, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Skilled Professionals' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' },
  ],
  services: {
    eyebrow: 'Our Services',
    title: 'Complete Construction\nSolutions',
    text: 'From residential developments to large-scale infrastructure, KCG provides reliable and professional construction services tailored to your needs.',
  },
  projects: { eyebrow: 'Our Projects', title: 'Built Across\nKashmir' },
  areas: {
    eyebrow: 'Where We Work',
    title: 'Serving Kashmir\n& Beyond',
    text: 'From our base in Dadyal we deliver projects across Azad Kashmir and neighbouring Punjab, and we are growing into new regions every year.',
    headOffice: 'Dadyal',
    list: 'Dadyal, Mirpur, Chakswari, Kotli, Jhelum, Dina',
    image: '/images/site/plant-collage.webp',
  },
  why: {
    eyebrow: 'Why Choose KCG',
    title: 'Building\nMore Than\nStructures',
    image: '/videos/hero-site-poster.webp',
    reasons: [
      { title: 'Local Expertise', text: 'Deep understanding of the region and its needs.' },
      { title: 'High-Quality Workmanship', text: 'Built to last using trusted materials and techniques.' },
      { title: 'On-Time Project Delivery', text: 'Efficient planning and reliable execution.' },
      { title: 'Competitive Pricing', text: 'Cost-effective solutions without compromising quality.' },
    ],
  },
  gallery: {
    eyebrow: 'On Site',
    title: 'Our Work\nIn Action',
    images: [
      '/images/site/plant-sunrise.webp',
      '/images/site/mixer-unit.webp',
      '/images/site/conveyor-gravel.webp',
      '/images/site/mixer-truck-2.webp',
      '/images/site/site-crane-aerial.webp',
      '/images/site/silos-sunset.webp',
      '/images/site/loader-plant.webp',
      '/images/site/concrete-pour.webp',
    ],
  },
  cta: {
    eyebrow: "Let's Build Together",
    title: 'Turning Visions\nInto Reality',
    text: "Tell us about your plot, your plans and your budget. We'll take it from foundation to finish.",
    button: 'Get a Quote',
    perks: 'Free Consultation, Expert Advice, Reliable Service',
    video: '/videos/mixer-orbit.mp4',
    poster: '/videos/mixer-orbit-poster.webp',
  },
  contact: {
    eyebrow: 'Get In Touch',
    title: 'Start Your\nProject',
    formTitle: 'Request a Free Quote',
    formText: 'Fill in your details and our team will get back to you.',
  },
  footer: { blurb: 'Building homes, businesses and stronger communities across Kashmir.' },
};

type Plain = Record<string, unknown>;
const isObj = (v: unknown): v is Plain => !!v && typeof v === 'object' && !Array.isArray(v);

/** Saved values over defaults; empty strings and empty lists fall back to the default. */
export function mergeHome(saved: unknown, base: unknown = defaultHome): HomeContent {
  const merge = (b: unknown, s: unknown): unknown => {
    if (s === undefined || s === null || s === '') return b;
    if (Array.isArray(b)) {
      if (!Array.isArray(s) || !s.length) return b;
      return isObj(b[0]) ? s.map((item, i) => merge(b[i] ?? b[0], item)) : s.filter((x) => x !== '');
    }
    if (isObj(b)) {
      if (!isObj(s)) return b;
      const out: Plain = {};
      for (const k of Object.keys(b)) out[k] = merge(b[k], s[k]);
      return out;
    }
    return typeof b === 'number' ? Number(s) || 0 : s;
  };
  return merge(base, saved) as HomeContent;
}

export const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean);
export const list = (s: string) => s.split(',').map((l) => l.trim()).filter(Boolean);
