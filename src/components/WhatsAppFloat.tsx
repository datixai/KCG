import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat({ whatsapp }: { whatsapp: string }) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
