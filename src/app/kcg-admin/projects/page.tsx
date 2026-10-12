'use client';
import CollectionManager from '@/components/admin/CollectionManager';

export default function ProjectsAdmin() {
  return (
    <CollectionManager
      collectionName="projects"
      title="Projects"
      emptyHint="No projects yet. The website is showing sample projects. Click Add to create your first one."
      defaults={{ title: '', location: '', category: 'Residential', image: '', video: '', gallery: [], description: '', showOnHome: true }}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'location', label: 'Location (e.g. Mirpur, AJK)', type: 'text' },
        { name: 'category', label: 'Category', type: 'select', options: ['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Renovation', 'Design'] },
        { name: 'image', label: 'Main photo (also shown while the video loads)', type: 'image' },
        { name: 'video', label: 'Video (optional)', type: 'link', hint: 'Paste a YouTube link (easiest: upload the video to YouTube as Unlisted), or a link to an .mp4 file. Videos are too large to upload here directly.' },
        { name: 'gallery', label: 'More photos (optional)', type: 'images' },
        { name: 'description', label: 'Details about the project', type: 'textarea' },
        { name: 'showOnHome', label: 'Show in the moving row on the home page', type: 'checkbox' },
        { name: 'order', label: 'Display order', type: 'number' },
      ]}
      display={(r) => ({ primary: String(r.title), secondary: `${r.category} · ${r.location}${r.video ? ' · video' : ''}${r.showOnHome === false ? ' · not on home page' : ''}`, image: String(r.image ?? '') })}
    />
  );
}
