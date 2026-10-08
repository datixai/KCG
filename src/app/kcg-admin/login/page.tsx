'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { ADMIN } from '../AdminShell';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) router.replace(ADMIN); }, [user, router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBusy(true);
    try {
      await login(String(data.get('email')), String(data.get('password')));
    } catch {
      toast.error('Wrong email or password');
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-svh place-items-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-2xl border border-white/10 bg-ink-soft p-8">
        <div className="mb-2 flex flex-col items-center gap-3">
          <Image src="/brand/logo.jpg" alt="KCG" width={72} height={72} className="rounded-full" priority />
          <h1 className="font-display text-xl font-bold text-white">Admin Login</h1>
        </div>
        <input name="email" type="email" required autoComplete="username" placeholder="Email" className="admin-input" />
        <input name="password" type="password" required autoComplete="current-password" placeholder="Password" className="admin-input" />
        <button disabled={busy} className="admin-btn w-full justify-center">{busy ? 'Signing in…' : 'Sign In'}</button>
      </form>
    </div>
  );
}
