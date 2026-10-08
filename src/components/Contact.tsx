import { Mail, MapPin, Phone, UserRound } from 'lucide-react';
import type { SiteSettings } from '@/types';
import type { HomeContent } from '@/lib/home';
import SectionTitle from './SectionTitle';
import ContactForm from './ContactForm';

export default function Contact({ settings, content }: { settings: SiteSettings; content: HomeContent['contact'] }) {
  const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, '')}`;
  const items = [
    ...(settings.owner ? [{ icon: UserRound, label: 'Proprietor', value: settings.owner, href: '' }] : []),
    { icon: Phone, label: 'Pakistan', value: settings.phoneDisplay, href: tel(settings.phoneDisplay) },
    ...(settings.phone2Display ? [{ icon: Phone, label: 'United Kingdom', value: settings.phone2Display, href: tel(settings.phone2Display) }] : []),
    { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: 'Head Office', value: settings.address },
  ];
  return (
    <section id="contact" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SectionTitle eyebrow={content.eyebrow} title={content.title} />
          <ul data-stagger className="mt-10 space-y-3">
            {items.map(({ icon: Icon, label, value, href }) => {
              const body = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-gold transition group-hover:bg-gold group-hover:text-forest-deep"><Icon className="size-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wider text-charcoal/50">{label}</span>
                    <span className="block break-words font-semibold text-forest-deep">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? <a href={href} className="group flex items-center gap-4 rounded-sm p-3 transition hover:bg-white">{body}</a> : <div className="group flex items-center gap-4 p-3">{body}</div>}
                </li>
              );
            })}
          </ul>
        </div>
        <div data-reveal className="lg:col-span-3"><ContactForm title={content.formTitle} text={content.formText} /></div>
      </div>
    </section>
  );
}
