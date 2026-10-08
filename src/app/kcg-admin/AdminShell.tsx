'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ExternalLink, FolderKanban, LayoutDashboard, LogOut, Mail, Settings, Wrench } from 'lucide-react';
import { useAuth, useRequireAuth } from '@/hooks/useAuth';

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

  if (isLogin) return <>{children}</>;
  if (loading || !user)
    return (
      <div className="grid min-h-svh place-items-center">
        <div className="size-10 animate-spin rounded-full border-2 border-brand-green/20 border-t-brand-green" />
      </div>
    );

  const signOut = async () => { await logout(); router.push(`${ADMIN}/login`); };
  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <div className="flex min-h-svh">
      <aside className="fixed hidden h-full w-60 flex-col border-r border-white/10 bg-ink-soft lg:flex">
        <Link href="/" className="flex items-center gap-3 border-b border-white/10 p-5">
          <Image src="/brand/logo.jpg" alt="KCG" width={36} height={36} className="rounded-full" />
          <div>
            <div className="font-display text-sm font-semibold text-white">KCG</div>
            <div className="text-xs text-neutral-500">Admin Panel</div>
          </div>
        </Link>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map(({ href, label, icon: Icon, exact }) => (
            <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${isActive(href, exact) ? 'bg-brand-green/15 text-brand-green' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="size-4" /> {label}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <div className="truncate px-3 py-1 text-xs text-neutral-500">{user.email}</div>
          <a href="/" target="_blank" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-400 hover:text-brand-orange"><ExternalLink className="size-4" /> View Website</a>
          <button onClick={signOut} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-400 hover:text-red-400"><LogOut className="size-4" /> Sign Out</button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:ml-60">
        {/* Mobile: top bar + icon nav */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink-soft px-3 py-2 lg:hidden">
          <Image src="/brand/logo.jpg" alt="KCG" width={30} height={30} className="rounded-full" />
          <div className="flex gap-1">
            {nav.map(({ href, label, icon: Icon, exact }) => (
              <Link key={href} href={href} aria-label={label} className={`rounded-lg p-2 ${isActive(href, exact) ? 'bg-brand-green/15 text-brand-green' : 'text-neutral-400'}`}><Icon className="size-5" /></Link>
            ))}
            <button onClick={signOut} aria-label="Sign out" className="rounded-lg p-2 text-neutral-400"><LogOut className="size-5" /></button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
