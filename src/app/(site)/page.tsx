import Hero from '@/components/Hero';
import Promises from '@/components/Promises';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Areas from '@/components/Areas';
import Marquee from '@/components/Marquee';
import WhyKcg from '@/components/WhyKcg';
import Gallery from '@/components/Gallery';
import CallToAction from '@/components/CallToAction';
import Contact from '@/components/Contact';
import { getHomeServer, getProjectsServer, getServicesServer, getSettingsServer } from '@/lib/firestore-server';

// Static page, regenerated in the background at most once a minute (admin edits show up within 60s)
export const revalidate = 60;

export default async function Home() {
  const [services, projects, settings, home] = await Promise.all([getServicesServer(), getProjectsServer(), getSettingsServer(), getHomeServer()]);
  return (
    <>
      <Hero content={home.hero} />
      <Promises items={home.promises} />
      <About content={home.about} />
      <Stats stats={home.stats} background={home.about.poster} />
      <Services services={services} content={home.services} />
      <Projects projects={projects} content={home.projects} />
      <Areas content={home.areas} />
      <Marquee text={home.marquee} />
      <WhyKcg content={home.why} />
      <Gallery content={home.gallery} />
      <CallToAction content={home.cta} />
      <Contact settings={settings} content={home.contact} />
    </>
  );
}
