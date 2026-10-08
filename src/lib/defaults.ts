import type { Project, Service, SiteSettings } from '@/types';
import { site } from '@/config/site';

// Shown on the public site until content is added from the admin panel
export const defaultSettings: SiteSettings = {
  phoneDisplay: site.phoneDisplay,
  whatsapp: site.whatsapp,
  email: site.email,
  address: site.address,
};

export const defaultServices: Service[] = [
  { id: 'd1', icon: 'Home', title: 'Residential Construction', text: 'Custom homes and villas built to last with quality materials.', image: '/images/services/residential.webp' },
  { id: 'd2', icon: 'Building2', title: 'Commercial Projects', text: 'Plazas, offices and shops delivered on time and on budget.', image: '/images/services/commercial.webp' },
  { id: 'd3', icon: 'Ruler', title: 'Architecture & Design', text: 'Modern designs, 3D plans and approvals handled end to end.', image: '/images/services/design.webp' },
  { id: 'd4', icon: 'HardHat', title: 'Grey Structure', text: 'Strong foundations and structural work by experienced teams.', image: '/images/services/grey-structure.webp' },
  { id: 'd5', icon: 'Paintbrush', title: 'Finishing & Renovation', text: 'Interiors, tiles, paint and complete renovations.', image: '/images/services/finishing.webp' },
  { id: 'd6', icon: 'Truck', title: 'Infrastructure', text: 'Roads, retaining walls and civil works across AJK.', image: '/images/services/infrastructure.webp' },
];

export const defaultProjects: Project[] = [
  { id: 'd1', title: 'Modern Family Villa', location: 'Mirpur', category: 'Residential', image: '/images/projects/modern-villa.webp' },
  { id: 'd2', title: 'Commercial Plaza', location: 'Kotli', category: 'Commercial', image: '/images/projects/commercial-plaza.webp' },
  { id: 'd3', title: 'Luxury Residence', location: 'Muzaffarabad', category: 'Residential', image: '/images/projects/luxury-residence.webp' },
  { id: 'd4', title: 'Office Building', location: 'Bhimber', category: 'Commercial', image: '/images/projects/office-building.webp' },
  { id: 'd5', title: 'Grey Structure Villa', location: 'Rawalakot', category: 'Residential', image: '/images/projects/grey-structure.webp' },
  { id: 'd6', title: 'Interior Renovation', location: 'Bagh', category: 'Renovation', image: '/images/projects/interior-renovation.webp' },
];
