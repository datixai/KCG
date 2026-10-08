import { SectionTitle } from './Services';

// Placeholder tiles — drop real photos into /public/images/projects and swap the gradient for <Image>
const projects = [
  { title: 'Modern Family Villa', place: 'Mirpur', tag: 'Residential' },
  { title: 'Commercial Plaza', place: 'Kotli', tag: 'Commercial' },
  { title: 'Hillside Residence', place: 'Muzaffarabad', tag: 'Residential' },
  { title: 'Office Complex', place: 'Bhimber', tag: 'Commercial' },
  { title: 'Road & Retaining Wall', place: 'Rawalakot', tag: 'Infrastructure' },
  { title: 'Home Renovation', place: 'Bagh', tag: 'Renovation' },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionTitle eyebrow="Our Work" title="Featured Projects" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <article key={p.title} className="reveal group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <div
                className="absolute inset-0 transition duration-500 group-hover:scale-105"
                style={{ background: `linear-gradient(${135 + i * 30}deg, #146236, #0b0d0c 60%, #f39a2b33)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="rounded-full bg-brand-orange/90 px-3 py-1 text-xs font-semibold text-ink">{p.tag}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{p.title}</h3>
                <p className="text-sm text-neutral-400">{p.place}, AJK</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
