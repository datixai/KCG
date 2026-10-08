import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/useAuth';
import AdminShell from './AdminShell';

// Kept out of search engines via metadata, not robots.txt (which would publish the URL)
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-svh bg-forest-deep text-neutral-200">
        <AdminShell>{children}</AdminShell>
      </div>
      <Toaster position="top-center" toastOptions={{ style: { background: '#0f3b2c', color: '#fff', border: '1px solid rgba(255,255,255,.1)' } }} />
    </AuthProvider>
  );
}
