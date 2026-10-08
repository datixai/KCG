/** Turns Firestore errors into a message the admin can act on. */
export function friendlyError(err: unknown): string {
  const e = err as { code?: string; message?: string };
  if (e.code === 'permission-denied')
    return 'Permission denied: publish firestore.rules in Firebase Console (Firestore > Rules) with your admin email.';
  return e.message || 'Something went wrong';
}
