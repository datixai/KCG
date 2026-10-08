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
  { id: 'd1', icon: 'Home', title: 'Residential Construction', text: 'Custom homes and villas built to last with quality materials.' },
  { id: 'd2', icon: 'Building2', title: 'Commercial Projects', text: 'Plazas, offices and shops delivered on time and on budget.' },
  { id: 'd3', icon: 'Ruler', title: 'Architecture & Design', text: 'Modern designs, 3D plans and approvals handled end to end.' },
  { id: 'd4', icon: 'HardHat', title: 'Grey Structure', text: 'Strong foundations and structural work by experienced teams.' },
  { id: 'd5', icon: 'Paintbrush', title: 'Finishing & Renovation', text: 'Interiors, tiles, paint and complete renovations.' },
  { id: 'd6', icon: 'Truck', title: 'Infrastructure', text: 'Roads, retaining walls and civil works across AJK.' },
];

export const defaultProjects: Project[] = [
  { id: 'd1', title: 'Modern Family Villa', location: 'Mirpur', category: 'Residential' },
  { id: 'd2', title: 'Commercial Plaza', location: 'Kotli', category: 'Commercial' },
  { id: 'd3', title: 'Hillside Residence', location: 'Muzaffarabad', category: 'Residential' },
  { id: 'd4', title: 'Office Complex', location: 'Bhimber', category: 'Commercial' },
  { id: 'd5', title: 'Road & Retaining Wall', location: 'Rawalakot', category: 'Infrastructure' },
  { id: 'd6', title: 'Home Renovation', location: 'Bagh', category: 'Renovation' },
];
