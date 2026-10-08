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
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} blurb={home.footer.blurb} />
      <BackToTop />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
      <Motion />
    </>
  );
}
