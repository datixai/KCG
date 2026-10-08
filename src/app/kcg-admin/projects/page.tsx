'use client';
import CollectionManager from '@/components/admin/CollectionManager';

export default function ProjectsAdmin() {
  return (
    <CollectionManager
      collectionName="projects"
      title="Projects"
      emptyHint="No projects yet — the website is showing sample projects. Click Add to create your first one."
      defaults={{ title: '', location: '', category: 'Residential', image: '', description: '' }}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'location', label: 'Location (e.g. Mirpur, AJK)', type: 'text' },
        { name: 'category', label: 'Category', type: 'select', options: ['Residential', 'Commercial', 'Infrastructure', 'Renovation', 'Design'] },
        { name: 'image', label: 'Photo', type: 'image' },
        { name: 'description', label: 'Description (optional)', type: 'textarea' },
        { name: 'order', label: 'Display order', type: 'number' },
      ]}
      display={(r) => ({ primary: String(r.title), secondary: `${r.category} · ${r.location}`, image: String(r.image ?? '') })}
    />
  );
}
