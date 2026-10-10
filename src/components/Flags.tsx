// Small inline flags. Windows doesn't draw flag emoji, and there is no emoji for the AJK flag
type Props = { className?: string };

export function AjkFlag({ className }: Props) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Azad Kashmir flag">
      <rect width="30" height="20" fill="#006a3b" />
      <rect width="10" height="12" fill="#f39c12" />
      {[12.9, 14.8, 16.7, 18.6].map((y) => <rect key={y} y={y} width="30" height="0.95" fill="#fff" />)}
      <circle cx="19.6" cy="6" r="3.6" fill="#fff" />
      <circle cx="20.6" cy="5.3" r="3.1" fill="#006a3b" />
      <polygon fill="#fff" points="23.3,2.4 23.7,3.5 24.9,3.5 23.9,4.2 24.3,5.3 23.3,4.6 22.3,5.3 22.7,4.2 21.7,3.5 22.9,3.5" />
    </svg>
  );
}

export function UkFlag({ className }: Props) {
  return (
    <svg viewBox="0 0 60 30" className={className} role="img" aria-label="United Kingdom flag">
      <clipPath id="uk-flag-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}
