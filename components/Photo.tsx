import Image from 'next/image';
import clsx from './clsx';

export type Tone = 'dark' | 'green' | 'brown' | 'ivory';

type Props = {
  /** What the photograph should show. Used as the placeholder caption and as alt text. */
  alt: string;
  /** Path under /public (e.g. "/images/hero-plantation.jpg"). Omit to show the labelled placeholder. */
  src?: string;
  tone?: Tone;
  className?: string;
  priority?: boolean;
  sizes?: string;
  drift?: boolean;
  frame?: boolean;
  shade?: boolean;
  captionClassName?: string;
  kind?: 'Photo' | 'Video';
  children?: React.ReactNode;
};

/**
 * Photography slot. Renders an optimised next/image when `src` is provided,
 * otherwise a branded, clearly labelled placeholder.
 */
export default function Photo({
  alt, src, tone = 'dark', className, priority, sizes = '(max-width: 768px) 100vw, 50vw',
  drift, frame, shade, captionClassName, kind = 'Photo', children,
}: Props) {
  const toneClass = { dark: '', green: 'ph-green', brown: 'ph-brown', ivory: 'ph-ivory' }[tone];
  return (
    <figure className={clsx('relative isolate m-0 overflow-hidden bg-[#1A1814]', toneClass, className)}>
      <div className={clsx('zoom-target absolute inset-0', drift && 'drift')}>
        {src ? (
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        ) : (
          <div className="ph-art absolute inset-0" role="img" aria-label={`${alt} (image placeholder)`} />
        )}
      </div>
      {shade && <div className="shade pointer-events-none absolute inset-0 z-[1]" />}
      {frame && <div className={clsx('pointer-events-none absolute inset-3.5 z-[1] border', tone === 'ivory' ? 'border-cinnamon/30' : 'border-gold/20')} />}
      {!src && (
        <figcaption
          className={clsx(
            'absolute bottom-[18px] left-5 right-5 z-[2] flex flex-col gap-1 text-[11px] uppercase tracking-[0.14em]',
            tone === 'ivory' ? 'text-ink/60' : 'text-ivory/60',
            captionClassName,
          )}
        >
          <b className={clsx('font-medium tracking-[0.24em]', tone === 'ivory' ? 'text-cinnamon' : 'text-gold')}>{kind} placeholder</b>
          {alt}
        </figcaption>
      )}
      {children}
    </figure>
  );
}
