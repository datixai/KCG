import type { Project, Service, SiteSettings } from '@/types';
import { site } from '@/config/site';

// Shown on the public site until changed from the admin panel.
// TODO: phone numbers are placeholders from the client's mockup — confirm the real ones.
export const defaultSettings: SiteSettings = {
  phoneDisplay: site.phoneDisplay,
  phone2Display: '+44 7440 392017',
  whatsapp: site.whatsapp,
  email: site.email,
  address: site.address,
  facebook: '',
  instagram: '',
  tiktok: site.social.tiktok,
  youtube: '',
  linkedin: '',
};

export const defaultServices: Service[] = [
  { id: 'd1', icon: 'Home', title: 'Residential Construction', text: 'Modern homes built for families and communities.', image: '/images/services/residential.webp' },
  { id: 'd2', icon: 'Building2', title: 'Commercial Buildings', text: 'Offices, retail spaces and business developments.', image: '/images/services/commercial.webp' },
  { id: 'd3', icon: 'Route', title: 'Infrastructure Projects', text: 'Roads, bridges and essential community infrastructure.', image: '/images/services/infrastructure.webp' },
  { id: 'd4', icon: 'Hammer', title: 'Renovations & Extensions', text: 'Transforming and improving existing properties.', image: '/images/services/finishing.webp' },
  { id: 'd5', icon: 'Settings2', title: 'Project Management', text: 'End-to-end management from design to completion.', image: '/images/services/grey-structure.webp' },
  { id: 'd6', icon: 'PencilRuler', title: 'Design & Planning', text: 'Innovative designs tailored to your vision.', image: '/images/services/design.webp' },
];

export const defaultProjects: Project[] = [
  { id: 'd1', title: 'Concrete Batching Plant', location: 'Dadyal, AJK', category: 'Industrial', image: '/images/projects/hero-site.webp' },
  { id: 'd2', title: 'Plant Installation', location: 'Dadyal, AJK', category: 'Industrial', image: '/images/services/infrastructure.webp' },
  { id: 'd3', title: 'Residential Villa', location: 'Muzaffarabad, AJK', category: 'Residential', image: '/images/projects/modern-villa.webp' },
  { id: 'd4', title: 'Commercial Complex', location: 'Mirpur, AJK', category: 'Commercial', image: '/images/projects/commercial-plaza.webp' },
  { id: 'd5', title: 'Luxury Residence', location: 'Dadyal, AJK', category: 'Residential', image: '/images/projects/luxury-residence.webp' },
  { id: 'd6', title: 'Grey Structure Works', location: 'Kotli, AJK', category: 'Residential', image: '/images/projects/grey-structure.webp' },
  { id: 'd7', title: 'Interior Renovation', location: 'Mirpur, AJK', category: 'Renovation', image: '/images/projects/interior-renovation.webp' },
];
