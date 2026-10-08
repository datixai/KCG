/**
 * Serves photos uploaded from the admin panel (stored in Firestore as data URLs; see src/lib/images.ts).
 * Each upload gets a new id, so responses are cached forever.
 */
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) return new Response('Not found', { status: 404 });

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/images/${id}?key=${API_KEY}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) return new Response('Not found', { status: 404 });

  const doc = await res.json();
  const match = String(doc?.fields?.data?.stringValue || '').match(/^data:(image\/[a-z+.-]+);base64,(.+)$/);
  if (!match) return new Response('Not found', { status: 404 });

  return new Response(Buffer.from(match[2], 'base64'), {
    headers: { 'Content-Type': match[1], 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
