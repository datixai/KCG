import { revalidatePath, revalidateTag } from 'next/cache';
import { ADMIN_EMAILS } from '@/config/admins';

/**
 * Called by the admin panel after every save or delete, so the website shows the change
 * straight away instead of within the usual minute. Only a signed-in admin can trigger it:
 * the Firebase login token is checked with Google before anything happens.
 */
export async function POST(req: Request) {
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer /, '');
  if (!token || token.length > 4096) return Response.json({ ok: false }, { status: 401 });

  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ idToken: token }),
    cache: 'no-store',
  }).catch(() => null);
  const user = res?.ok ? (await res.json()).users?.[0] : null;
  const isAdmin = user && ADMIN_EMAILS.includes(String(user.email).toLowerCase())
    && (user.providerUserInfo ?? []).some((p: { providerId?: string }) => p.providerId === 'password');
  if (!isAdmin) return Response.json({ ok: false }, { status: 403 });

  revalidateTag('content');
  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}
