'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ExternalLink, FolderKanban, LayoutDashboard, LogOut, Mail, Settings, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth, useRequireAuth } from '@/hooks/useAuth';
import { seedDefaultContentOnce } from '@/lib/seed';
import { friendlyError } from '@/lib/errors';

export const ADMIN = '/kcg-admin';

const nav = [
  { href: ADMIN, label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: `${ADMIN}/projects`, label: 'Projects', icon: FolderKanban },
  { href: `${ADMIN}/services`, label: 'Services', icon: Wrench },
  { href: `${ADMIN}/messages`, label: 'Messages', icon: Mail },
  { href: `${ADMIN}/settings`, label: 'Settings', icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === `${ADMIN}/login`;
  const { user, loading } = useRequireAuth(`${ADMIN}/login`);
  const { logout } = useAuth();
  const router = useRouter();

  // First visit: copy the content the website is showing into Firestore so it can be edited here
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) return;
    seedDefaultContentOnce()
      .then((n) => { if (n) toast.success(`Imported ${n} projects & services from the website`); })
      .catch((err) => toast.error(friendlyError(err), { duration: 8000 }))
      .finally(() => setReady(true));
  }, [user]);

  if (isLogin) return <>{children}</>;
  if (loading || !user || !ready)
    return (
      <div className="grid min-h-svh place-items-center">
        <div className="size-10 animate-spin rounded-full border-2 border-gold/20 border-t-gold" />
      </div>
    );

  const signOut = async () => { await logout(); router.push(`${ADMIN}/login`); };
  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <div className="flex min-h-svh">
      <aside className="fixed hidden h-full w-60 flex-col border-r border-white/10 bg-forest lg:flex">
        <Link href="/" className="flex items-center gap-3 border-b border-white/10 p-5">
          <Image src="/brand/logo-mark-light.png" alt="KCG" width={30} height={36} className="h-9 w-auto" />
          <div>
            <div className="font-display text-sm font-semibold text-white">KCG</div>
            <div className="text-xs text-neutral-500">Admin Panel</div>
          </div>
        </Link>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(({ href, label, icon: Icon, exact }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive(href, exact) ? 'bg-gold/15 text-gold' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="size-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <div className="truncate px-3 py-1 text-xs text-neutral-500">{user.email}</div>
          <a href="/" target="_blank" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-400 hover:text-gold"><ExternalLink className="size-4" /> View Website</a>
          <button onClick={signOut} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-400 hover:text-red-400"><LogOut className="size-4" /> Sign Out</button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-60">
        {/* Mobile: top bar + icon nav */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-forest px-3 py-2 lg:hidden">
          <Image src="/brand/logo-mark-light.png" alt="KCG" width={25} height={30} className="h-8 w-auto" />
          <div className="flex gap-1">
            {nav.map(({ href, label, icon: Icon, exact }) => (
              <Link key={href} href={href} aria-label={label} className={`rounded-lg p-2 ${isActive(href, exact) ? 'bg-gold/15 text-gold' : 'text-neutral-400'}`}><Icon className="size-5" /></Link>
            ))}
            <button onClick={signOut} aria-label="Sign out" className="rounded-lg p-2 text-neutral-400"><LogOut className="size-5" /></button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
