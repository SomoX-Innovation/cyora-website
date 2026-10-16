import type { ReactNode } from 'react';
import Photo, { type Tone } from './Photo';

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  image: { alt: string; src?: string; tone?: Tone };
  children?: ReactNode;
  minH?: string;
};

export default function PageHero({ eyebrow, title, lede, image, children, minH = 'min-h-[700px]' }: Props) {
  return (
    <section aria-label={eyebrow} className={`relative flex items-end overflow-hidden ${minH}`}>
      <Photo {...image} priority drift shade sizes="100vw" className="!absolute inset-0" captionClassName="!left-auto right-5 md:!right-14 !bottom-10 items-end text-right" />
      <div className="wrap relative z-[3] flex flex-col gap-8 pb-24 pt-48">
        <p className="eyebrow rise">{eyebrow}</p>
        <h1 className="serif rise d1 max-w-[1050px] text-[clamp(48px,7.4vw,110px)] leading-[.98]">{title}</h1>
        {lede && <p className="lede rise d2 text-ivory/85">{lede}</p>}
        {children && <div className="rise d2 flex flex-wrap gap-4">{children}</div>}
      </div>
    </section>
  );
}
