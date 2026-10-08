import Hero from '@/components/Hero';
import Promises from '@/components/Promises';
import About from '@/components/About';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Marquee from '@/components/Marquee';
import WhyKcg from '@/components/WhyKcg';
import CallToAction from '@/components/CallToAction';
import Contact from '@/components/Contact';
import { getProjectsServer, getServicesServer, getSettingsServer } from '@/lib/firestore-server';

// Static page, regenerated in the background at most once a minute (admin edits show up within 60s)
export const revalidate = 60;

export default async function Home() {
  const [services, projects, settings] = await Promise.all([getServicesServer(), getProjectsServer(), getSettingsServer()]);
  return (
    <>
      <Hero />
      <Promises />
      <About />
      <Stats />
      <Services services={services} />
      <Projects projects={projects} />
      <Marquee />
      <WhyKcg />
      <CallToAction />
      <Contact settings={settings} />
    </>
  );
}
