'use client';
import './globals.css';
import ErrorScreen from '@/components/ErrorScreen';

// Used only if the root layout itself fails, so it brings its own <html> and <body>
export default function GlobalError(props: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-forest-deep"><ErrorScreen {...props} /></body>
    </html>
  );
}
