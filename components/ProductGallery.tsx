'use client';

import { useState } from 'react';
import Photo, { type Tone } from './Photo';
import clsx from './clsx';

export type GalleryItem = { alt: string; short: string; tone: Tone; src?: string };

export default function ProductGallery({ items, label, light }: { items: GalleryItem[]; label: string; light?: boolean }) {
  const [i, setI] = useState(0);
  const cur = items[i];
  return (
    <div>
      <Photo key={i} {...cur} frame className="group fade-in aspect-square" sizes="(max-width: 768px) 100vw, 640px" />
      <p className="sr-only" aria-live="polite">Showing image {i + 1} of {items.length}: {cur.alt}</p>
      <div role="group" aria-label={label} className="mt-3 grid grid-cols-4 gap-3">
        {items.map((it, idx) => (
          <button
            key={it.short}
            type="button"
            aria-pressed={idx === i}
            aria-label={`Show image: ${it.alt}`}
            onClick={() => setI(idx)}
            className={clsx(
              'relative aspect-square overflow-hidden border transition-colors',
              idx === i
                ? light ? 'border-cinnamon ring-1 ring-inset ring-cinnamon' : 'border-gold ring-1 ring-inset ring-gold'
                : light ? 'border-ink/15 hover:border-ink/40' : 'border-gold/20 hover:border-gold/60',
            )}
          >
            <Photo alt={it.alt} src={it.src} tone={it.tone} className="!absolute inset-0 [&_figcaption]:hidden" sizes="160px" />
            <span className={clsx('absolute inset-x-2 bottom-2 z-[2] text-left text-[9px] uppercase leading-tight tracking-[0.14em]', it.tone === 'ivory' ? 'text-ink/70' : 'text-ivory/75')}>
              {it.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
