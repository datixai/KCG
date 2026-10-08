import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { getSettingsServer } from '@/lib/firestore-server';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettingsServer();
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp} />
    </>
  );
}
