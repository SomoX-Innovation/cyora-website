import type { ReactNode } from 'react';

export default function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <section className="pb-24 pt-52">
        <div className="wrap flex flex-col gap-7">
          <p className="eyebrow">Legal</p>
          <h1 className="serif text-[clamp(46px,6vw,88px)] leading-none">{title}</h1>
          <p className="text-sm tracking-[0.08em] text-ivory/70">Last updated: <span className="tbc">[Date]</span></p>
        </div>
      </section>
      <section className="on-ivory bg-ivory pb-32 pt-28 text-ink">
        <div className="wrap">
          <div className="max-w-[780px] [&_h2]:mb-6 [&_h2]:mt-16 [&_h2]:font-serif [&_h2]:text-[44px] [&_h2]:font-normal [&_h2]:leading-tight first:[&_h2]:mt-0 [&_h3]:mb-2.5 [&_h3]:mt-9 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:uppercase [&_h3]:tracking-[0.18em] [&_li]:text-base [&_li]:leading-[1.85] [&_li]:text-ink/80 [&_p]:text-base [&_p]:leading-[1.85] [&_p]:text-ink/80 [&_ul]:list-disc [&_ul]:pl-5">
            <p className="!mb-14 border border-dashed border-cinnamon/60 px-5 py-5 !text-sm !text-cinnamon">
              Template structure only — CYORA must complete the bracketed details and have this text reviewed by a qualified legal adviser before the site goes live.
            </p>
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
