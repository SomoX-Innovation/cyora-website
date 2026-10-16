type P = { className?: string };

export const Arrow = ({ className }: P) => (
  <svg width="28" height="10" viewBox="0 0 28 10" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
    <path d="M0 5h26M22 1l4 4-4 4" />
  </svg>
);

export const Leaf = ({ className }: P) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <path d="M8 32C8 18 18 8 33 7c0 15-10 25-25 25z" /><path d="M8 32 24 16" />
  </svg>
);

export const Lens = ({ className }: P) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <circle cx="17" cy="17" r="10" /><path d="m25 25 9 9M13 17h8M17 13v8" />
  </svg>
);

export const Box = ({ className }: P) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <path d="M6 14 20 7l14 7v14l-14 7-14-7z" /><path d="M6 14l14 7 14-7M20 21v14" />
  </svg>
);

export const Globe = ({ className }: P) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <circle cx="20" cy="20" r="14" /><path d="M6 20h28M20 6c5 4 5 24 0 28M20 6c-5 4-5 24 0 28" />
  </svg>
);

export const Info = ({ className }: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={className}>
    <circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <circle cx="22" cy="22" r="20" /><path d="m14 22 6 6 11-12" />
  </svg>
);

export const Alert = ({ className }: P) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className={className}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v6M12 16v.5" />
  </svg>
);

export const Doc = ({ className }: P) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4M9 12h7M9 16h5" />
  </svg>
);

export const Flask = ({ className }: P) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={className}>
    <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
  </svg>
);

export const Play = ({ className }: P) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const Diamond = ({ className }: P) => (
  <svg width="56" height="12" viewBox="0 0 56 12" fill="none" stroke="currentColor" aria-hidden="true" className={className}>
    <path d="M0 6h22M34 6h22" /><path d="M28 1l5 5-5 5-5-5z" />
  </svg>
);

export const Menu = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 8h18M3 16h18" />}
  </svg>
);

export const SocialIcon = ({ name }: { name: string }) => {
  if (name === 'Instagram')
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" />
      </svg>
    );
  if (name === 'LinkedIn')
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
      </svg>
    );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
    </svg>
  );
};
