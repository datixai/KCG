import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { getProjectsServer, getServicesServer, getSettingsServer } from '@/lib/firestore-server';

// Static page, regenerated in the background at most once a minute (admin edits show up within 60s)
export const revalidate = 60;

export default async function Home() {
  const [services, projects, settings] = await Promise.all([getServicesServer(), getProjectsServer(), getSettingsServer()]);
  return (
    <>
      <Hero />
      <Services services={services} />
      <About />
      <Projects projects={projects} />
      <Contact settings={settings} />
    </>
  );
}
