import { Mail, MapPin, Phone } from 'lucide-react';
import type { SiteSettings } from '@/types';
import { SectionTitle } from './Services';
import ContactForm from './ContactForm';

export default function Contact({ settings }: { settings: SiteSettings }) {
  const items = [
    { icon: Phone, label: 'Call Us', value: settings.phoneDisplay, href: `tel:${settings.phoneDisplay.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: 'Location', value: settings.address },
  ];
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Get In Touch" title="Start Your Project" />
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {items.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} className="reveal flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:border-brand-green/50">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-orange" />
                <div className="min-w-0">
                  <div className="text-sm text-neutral-500">{label}</div>
                  <div className="break-words font-medium text-white">{value}</div>
                </div>
              </a>
            ))}
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
