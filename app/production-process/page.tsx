import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'From Harvest to Packaging — Our Production Process',
  description:
    'How Ceylon cinnamon becomes a CYORA product: harvest, scrape, peel and roll, dry and grade, inspect, then pack — for sticks and powder, ready for bulk export or private-label packaging.',
  path: '/production-process',
});

type Step = { n: string; id: string; title: string; body: string; src: string; alt: string; tone: 'green' | 'brown' | 'dark' };

const steps: Step[] = [
  {
    n: '01', id: 'harvest', title: 'Harvest',
    body: 'Cinnamon trees are coppiced, so that slender shoots grow from the base. Mature shoots are cut, typically after rains when the bark lifts more easily.',
    src: '/images/hero-plantation.jpg', alt: 'Cinnamon plantation at sunrise, where mature shoots are cut for harvest', tone: 'green',
  },
  {
    n: '02', id: 'scrape', title: 'Scrape',
    body: 'The rough outer bark is scraped away, and the stem is rubbed with a brass rod to loosen the thin, fragrant inner bark.',
    src: '/images/bark-peel.jpg', alt: 'Close-up of a cinnamon stem with its outer bark scraped away', tone: 'green',
  },
  {
    n: '03', id: 'peel-roll', title: 'Peel & Roll',
    body: 'Peelers ease the inner bark free in delicate sheets, then layer smaller pieces inside larger ones to form long, slender quills.',
    src: '/images/peeler.jpg', alt: 'Skilled cinnamon peeler easing inner bark free and rolling it into quills', tone: 'brown',
  },
  {
    n: '04', id: 'dry-grade', title: 'Dry & Grade',
    body: 'Quills dry slowly in the shade, then are sorted and graded — in Sri Lanka, grades such as C5 are defined largely by quill diameter.',
    src: '/images/quills-closeup.jpg', alt: 'Dried Ceylon cinnamon quills sorted by diameter for grading', tone: 'brown',
  },
  {
    n: '05', id: 'inspect', title: 'Inspect',
    body: 'Each batch is checked by hand against its stated grade and specification — diameter, colour and aroma — before it moves on to packing.',
    src: '/images/inspection.jpg', alt: 'Hands inspecting Ceylon cinnamon quills against natural light', tone: 'brown',
  },
  {
    n: '06', id: 'pack', title: 'Pack',
    body: 'Finished sticks and powder are packed to order — bulk export cartons, retail-ready packs, or your own private-label design — ready for shipment.',
    src: '/images/packaging-black-gold.jpg', alt: 'Finished cinnamon packaging: matte-black packs with gold branding, beside export cartons', tone: 'dark',
  },
];

const split = 'wrap grid items-center gap-12 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]';
const h2 = 'serif text-[clamp(38px,4.4vw,62px)] leading-[1.04]';

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Ceylon cinnamon is produced, from harvest to packaging',
  description: 'The stages Ceylon cinnamon passes through on its way to becoming CYORA sticks and powder, as practised in Sri Lanka.',
  step: steps.map((s) => ({ '@type': 'HowToStep', name: s.title, text: s.body })),
};

export default function ProductionProcess() {
  return (
    <>
      <JsonLd data={howToLd} />

      <PageHero
        eyebrow="Production Process"
        image={{ alt: 'Sri Lankan cinnamon plantation at dawn', tone: 'green', src: '/images/landscape-dawn.jpg' }}
        title={<>From Harvest<br /><em className="text-gold">to Packaging.</em></>}
        lede="Six stages carry Ceylon cinnamon from the field to a sealed pack — unhurried, skilled work practised the same way across Sri Lanka."
      >
        <ol aria-label="Stages" className="flex flex-wrap gap-x-8 gap-y-1">
          {steps.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-flex min-h-[44px] items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-ivory/75 hover:text-gold">
                <span className="text-gold">{s.n}</span>{s.title}
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {steps.map((s, i) => {
        const ivory = i % 2 === 0;
        return (
          <section key={s.id} id={s.id} className={`sec scroll-mt-24 ${ivory ? 'on-ivory bg-ivory text-ink' : ''}`}>
            <div className={split}>
              <Reveal className={i % 2 === 1 ? 'md:order-2' : undefined}>
                <Photo alt={s.alt} src={s.src} tone={s.tone} frame className="group aspect-[4/5]" />
              </Reveal>
              <Reveal className={`flex flex-col gap-6 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                <span aria-hidden="true" className={`font-serif text-[64px] font-light leading-none md:text-[88px] ${ivory ? 'text-cinnamon/25' : 'text-gold/30'}`}>{s.n}</span>
                <p className="eyebrow">Stage {s.n}</p>
                <h2 className={h2}>{s.title}</h2>
                <p className={`lede text-[19px] ${ivory ? '!text-ink' : ''}`}>{s.body}</p>
              </Reveal>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="next-h" className="sec">
        <Reveal className="wrap flex flex-col items-center gap-8 text-center">
          <p className="eyebrow">From Our Process to Your Order</p>
          <h2 id="next-h" className="h-display max-w-[900px]">See the Finished Products, or Ask About a Specific Lot.</h2>
          <p className="lede max-w-[680px]">Every stage above is carried out per lot, with grade and specification stated — never implied. Request documentation for a specific batch, or go straight to our product catalogue.</p>
          <div className="mt-3 flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn btn-gold">View Our Products</Link>
            <Link href="/quality-sourcing#request" className="btn btn-ghost">Request Documentation</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
