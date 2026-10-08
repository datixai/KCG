import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BackToTop from '@/components/BackToTop';
import Motion from '@/components/Motion';
import { getHomeServer, getServicesServer, getSettingsServer } from '@/lib/firestore-server';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services, home] = await Promise.all([getSettingsServer(), getServicesServer(), getHomeServer()]);
  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-sm bg-gold px-4 py-2 font-semibold text-forest-deep focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} blurb={home.footer.blurb} />
      <BackToTop />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
      <Motion />
    </>
  );
}
