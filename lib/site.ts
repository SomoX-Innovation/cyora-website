/**
 * Single source of truth for business details.
 * Values in [brackets] are placeholders awaiting confirmation by CYORA —
 * replace them here and they update across the whole site.
 */
export const site = {
  name: 'CYORA',
  tagline: 'Nature’s Finest. From Sri Lanka.',
  message: 'Rooted in Sri Lankan heritage. Crafted for the world.',
  /** Canonical origin used for canonical URLs, sitemap, Open Graph and JSON-LD. No trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cyoracinnamon.com').replace(/\/+$/, ''),
  email: 'sales@cyoracinnamon.com',
  whatsapp: '+94 77 959 7106',
  /** Digits only, e.g. "94771234567". Leave empty until confirmed — the link is hidden while empty. */
  whatsappDigits: '94779597106',
  legalName: '[Registered company name]',
  responseTime: '[response time to confirm]',
  socials: [
    { label: 'Instagram', handle: '[@handle]', href: '' },
    { label: 'LinkedIn', handle: '[page]', href: '' },
    { label: 'Facebook', handle: '[page]', href: '' },
  ],
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/products', label: 'Our Products' },
  { href: '/production-process', label: 'Production Process' },
  { href: '/quality-sourcing', label: 'Quality & Sourcing' },
  { href: '/export-wholesale', label: 'Export & Wholesale' },
  { href: '/contact', label: 'Contact' },
] as const;

/** True when a value is still a [placeholder]. */
export const isPlaceholder = (v: string) => /^\[.*\]$/.test(v.trim()) || v.trim() === '';
