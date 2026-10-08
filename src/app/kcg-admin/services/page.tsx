'use client';
import CollectionManager from '@/components/admin/CollectionManager';
import { serviceIcons } from '@/components/Services';

export default function ServicesAdmin() {
  return (
    <CollectionManager
      collectionName="services"
      title="Services"
      emptyHint="No services yet — the website is showing the 6 built-in services. Add your own to replace them."
      defaults={{ title: '', text: '', icon: 'HardHat', active: true }}
      fields={[
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'text', label: 'Short description', type: 'textarea' },
        { name: 'icon', label: 'Icon', type: 'select', options: Object.keys(serviceIcons) },
        { name: 'image', label: 'Photo', type: 'image' },
        { name: 'order', label: 'Display order', type: 'number' },
        { name: 'active', label: 'Show on website', type: 'checkbox' },
      ]}
      display={(r) => ({ primary: String(r.title), secondary: r.active === false ? 'Hidden' : String(r.text ?? ''), image: String(r.image ?? '') })}
    />
  );
}
