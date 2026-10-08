import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import BackToTop from '@/components/BackToTop';
import Motion from '@/components/Motion';
import { getServicesServer, getSettingsServer } from '@/lib/firestore-server';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettingsServer(), getServicesServer()]);
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <BackToTop />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
      <Motion />
    </>
  );
}
