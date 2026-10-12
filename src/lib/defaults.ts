import type { Project, Service, SiteSettings } from '@/types';
import { site } from '@/config/site';

// Shown on the public site until changed from the admin panel.
export const defaultSettings: SiteSettings = {
  owner: site.owner,
  phoneDisplay: site.phoneDisplay,
  phone2Display: '+44 7440 392017',
  whatsapp: site.whatsapp,
  email: site.email,
  address: site.address,
  facebook: '',
  instagram: 'https://www.instagram.com/kashmirconstructiongroup/',
  tiktok: site.social.tiktok,
  youtube: '',
  linkedin: '',
};

export const defaultServices: Service[] = [
  { id: 'd1', icon: 'Home', title: 'Residential Construction', text: 'Modern homes built for families and communities.', image: '/images/services/residential.webp' },
  { id: 'd2', icon: 'Building2', title: 'Commercial Buildings', text: 'Offices, retail spaces and business developments.', image: '/images/services/commercial.webp' },
  { id: 'd3', icon: 'Route', title: 'Infrastructure Projects', text: 'Roads, bridges and essential community infrastructure.', image: '/images/site/site-crane-aerial.webp' },
  { id: 'd4', icon: 'Factory', title: 'Concrete & Batching Plants', text: 'Ready-mix concrete supply and batching plant installation.', image: '/images/site/plant-lowangle.webp' },
  { id: 'd5', icon: 'Settings2', title: 'Project Management', text: 'End-to-end management from design to completion.', image: '/images/site/site-install-aerial.webp' },
  { id: 'd6', icon: 'Hammer', title: 'Renovations & Extensions', text: 'Transforming and improving existing properties.', image: '/images/services/finishing.webp' },
];

// KCG's two video projects, then its own batching-plant site, then example photos to replace from the admin panel
export const MARQUEE_TEXT =
  'A modern marquee and wedding hall in Dadyal, designed with a grand illuminated entrance, a landscaped approach and spacious event halls for weddings and large functions. The video shows the 3D design visualisation of the project.';
export const BUNGALOW_TEXT =
  'A two-storey family bungalow on a hillside plot in Mirpur District, with a wide terrace, strong boundary walls and a landscaped driveway that makes the most of the views. The video is a 3D visualisation of the home.';

export const defaultProjects: Project[] = [
  { id: 'p1', title: 'Dadyal Marquee & Wedding Hall', location: 'Dadyal, Mirpur District, AJK', category: 'Commercial', image: '/images/projects/dadyal-marquee-wedding-hall.webp', video: '/videos/projects/dadyal-marquee-wedding-hall.mp4', description: MARQUEE_TEXT },
  { id: 'p2', title: 'Hillside Bungalow', location: 'Mirpur District, AJK', category: 'Residential', image: '/images/projects/hillside-bungalow-3d.webp', video: '/videos/projects/hillside-bungalow-3d.mp4', description: BUNGALOW_TEXT },
  { id: 'd1', title: 'Concrete Batching Plant', location: 'Dadyal, AJK', category: 'Industrial', image: '/images/site/plant-sunrise.webp' },
  { id: 'd2', title: 'Plant Installation', location: 'Dadyal, AJK', category: 'Industrial', image: '/images/site/site-install-aerial.webp' },
  { id: 'd3', title: 'Aggregate & Conveyor System', location: 'Dadyal, AJK', category: 'Industrial', image: '/images/site/conveyor-sunset.webp' },
  { id: 'd4', title: 'Ready-Mix Concrete Supply', location: 'Mirpur, AJK', category: 'Industrial', image: '/images/site/mixer-truck.webp' },
  { id: 'd5', title: 'Residential Villa', location: 'Chakswari, AJK', category: 'Residential', image: '/images/projects/modern-villa.webp' },
  { id: 'd6', title: 'Commercial Complex', location: 'Mirpur, AJK', category: 'Commercial', image: '/images/projects/commercial-plaza.webp' },
  { id: 'd7', title: 'Luxury Residence', location: 'Kotli, AJK', category: 'Residential', image: '/images/projects/luxury-residence.webp' },
];
