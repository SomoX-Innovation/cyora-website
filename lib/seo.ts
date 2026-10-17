import type { Metadata } from 'next';

/** Default share card (public/og.jpg, 1200×630). */
const ogImage = {
  url: '/og.jpg',
  width: 1200,
  height: 630,
  alt: 'CYORA Ceylon Cinnamon Rolls, Grade C5 — Ceylon cinnamon sticks and powder from Sri Lanka',
};

/** Open Graph / Twitter fields shared by every page. A page's `openGraph` replaces the root one, so these are repeated per page. */
export const ogBase = { type: 'website' as const, siteName: 'CYORA', locale: 'en_GB', images: [ogImage] };
export const twitterBase = { card: 'summary_large_image' as const, images: [ogImage] };

/** Title, description, canonical and matching Open Graph / Twitter tags for an indexable page. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...ogBase, title: `${title} | CYORA`, description, url: path },
    twitter: { ...twitterBase, title: `${title} | CYORA`, description },
  };
}
