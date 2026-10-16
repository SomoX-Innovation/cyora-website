import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Photo from '@/components/Photo';
import ProductGallery, { type GalleryItem } from '@/components/ProductGallery';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Ceylon Cinnamon Sticks & Powder — Wholesale Products',
  description:
    'Ceylon cinnamon sticks / quills and pure Ceylon cinnamon powder from Sri Lanka for wholesale, bulk export and private-label packaging. Request specifications and a quote.',
  alternates: { canonical: '/products' },
};

/**
 * Specification values — replace each [placeholder] with CYORA-verified data.
 * Never publish a grade (e.g. C5), moisture value or certification that has not been confirmed.
 */
const sticksSpecs: [string, string][] = [
  ['Grade / specification', 'C5'],
  ['Lengths & dimensions', '3 inch'],
  ['Moisture', '[Coming soon]'],
  ['Packaging options', 'Bulk cartons, retail packs, private-label'],
  ['Net weight options', '100 g per unit'],
  ['Minimum order', '1 unit'],
  ['Samples', 'Available'],
];

const powderSpecs: [string, string][] = [
  ['Powder specification', 'Grade C5 — mesh size and colour: [Coming soon]'],
  ['Packaging options', 'Lined bulk bags, cartons, retail jars or pouches, private-label'],
  ['Net weight options', '100 g per unit'],
  ['Minimum order', '1 unit'],
  ['Samples', 'Available'],
];

// The CYORA packs carry "Grade C5", "100% Natural" and "No added chemicals" — confirmed by CYORA as verified.
const sticksGallery: GalleryItem[] = [
  { tone: 'dark', short: 'Pack', alt: 'CYORA Ceylon Cinnamon Rolls 100 g pouch in matte black and gold, on dark stone beside loose quills', src: '/images/cinnamonrolls.jpg' },
  { tone: 'brown', short: 'On stone', alt: 'Ceylon cinnamon quills arranged on dark natural stone', src: '/images/sticks-stone.jpg' },
  { tone: 'green', short: 'Bark', alt: 'Close-up of naturally peeling cinnamon bark', src: '/images/bark-peel.jpg' },
  { tone: 'brown', short: 'Detail', alt: 'Macro of layered quill ends showing fine bark', src: '/images/quills-closeup.jpg' },
];

const powderGallery: GalleryItem[] = [
  { tone: 'dark', short: 'Pack', alt: 'CYORA Ceylon Cinnamon Powder 100 g pouch in matte black and gold, on dark stone beside a bowl of powder', src: '/images/cinnamonpowder.jpg' },
  { tone: 'brown', short: 'Bowl', alt: 'Fine Ceylon cinnamon powder in a premium ceramic bowl', src: '/images/powder-bowl.jpg' },
  { tone: 'ivory', short: 'Texture', alt: 'Macro of powder texture on ivory linen', src: '/images/powder-linen.jpg' },
  { tone: 'ivory', short: 'Bulk', alt: 'Lined bulk carton prepared for export', src: '/images/bulk-carton.jpg' },
];

const isTbc = (v: string) => v.startsWith('[');

function Specs({ rows, light }: { rows: [string, string][]; light?: boolean }) {
  const line = light ? 'border-ink/15' : 'border-gold/30';
  return (
    <dl className={`flex flex-col border-t ${line}`}>
      {rows.map(([k, v]) => (
        <div key={k} className={`grid gap-1.5 border-b py-[18px] sm:grid-cols-[minmax(150px,220px)_1fr] sm:gap-6 ${line}`}>
          <dt className={`pt-0.5 text-[11px] uppercase tracking-[0.24em] ${light ? 'text-ink/60' : 'text-ivory/60'}`}>{k}</dt>
          <dd className="text-[15px] leading-relaxed">{isTbc(v) ? <span className="tbc">{v}</span> : v}</dd>
        </div>
      ))}
    </dl>
  );
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center border border-dashed border-current px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] opacity-90">{children}</span>
);

// Product structured data: only name, description, brand and origin — no prices, ratings or certifications.
const productLd = (name: string, description: string, anchor: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name,
  description,
  brand: { '@type': 'Brand', name: 'CYORA' },
  countryOfOrigin: 'LK',
  url: `${site.url}/products#${anchor}`,
});

export default function Products() {
  return (
    <>
      <JsonLd data={productLd('Ceylon Cinnamon Sticks / Rolls', 'Ceylon cinnamon in quill form from Sri Lanka for professional buyers.', 'sticks')} />
      <JsonLd data={productLd('Pure Ceylon Cinnamon Powder', 'Ceylon cinnamon powder from Sri Lanka for culinary, retail and food-manufacturing uses.', 'powder')} />

      <PageHero
        eyebrow="The Catalogue"
        image={{ alt: 'Cinnamon products carefully arranged on dark wood', tone: 'brown', src: '/images/products-wood.jpg' }}
        title={<>Our Ceylon<br /><em className="text-gold">Cinnamon.</em></>}
        lede="Two products, presented for professional buyers. Specifications are confirmed per lot — fields marked in gold are awaiting CYORA’s verified data."
      >
        <a href="#sticks" className="btn btn-ghost">A · Cinnamon Sticks</a>
        <a href="#powder" className="btn btn-ghost">B · Cinnamon Powder</a>
      </PageHero>

      <section id="sticks" aria-labelledby="sticks-h" className="sec scroll-mt-24">
        <div className="wrap grid items-start gap-12 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(500px,100%),1fr))]">
          <Reveal><ProductGallery items={sticksGallery} label="Cinnamon sticks gallery" /></Reveal>
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow">Product A</p>
            <h2 id="sticks-h" className="serif text-[clamp(42px,4.6vw,66px)] leading-[1.02]">Ceylon Cinnamon<br />Sticks / Rolls</h2>
            <div className="flex flex-wrap gap-2.5 text-gold">
              <Pill>Origin: Sri Lanka</Pill>
              <Pill>Grade: C5</Pill>
            </div>
            <p className="lede">Distinctive Ceylon cinnamon in carefully presented quill form for professional buyers and discerning customers. Thin, layered bark rolled into slender quills, with the gentle, sweet aroma Ceylon cinnamon is known for.</p>
            <p className="lede text-base">Suited to importers, wholesalers, specialist retailers and private-label ranges seeking whole Sri Lankan cinnamon sticks.</p>
            <Specs rows={sticksSpecs} />
            <div className="flex flex-wrap gap-3.5">
              <Link href="/export-wholesale#enquiry" className="btn btn-gold">Request a Quote</Link>
              <Link href="/quality-sourcing#request" className="btn btn-ghost">Request Specifications</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="powder" aria-labelledby="powder-h" className="sec scroll-mt-24">
        <div className="wrap grid items-start gap-12 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(500px,100%),1fr))]">
          <Reveal className="flex flex-col gap-8 md:order-1">
            <p className="eyebrow">Product B</p>
            <h2 id="powder-h" className="serif text-[clamp(42px,4.6vw,66px)] leading-[1.02]">Pure Ceylon<br />Cinnamon Powder</h2>
            <div className="flex flex-wrap gap-2.5 text-gold">
              <Pill>Origin: Sri Lanka</Pill>
              <Pill>Grade: C5</Pill>
            </div>
            <p className="lede">Finely presented Ceylon cinnamon powder for culinary applications, retail packaging, and suitable food-manufacturing uses. Ground from Ceylon cinnamon, carrying its warm, delicate and sweetly aromatic profile.</p>
            <p className="lede text-base">For bakeries, beverage and confectionery producers, spice brands and retailers seeking Ceylon cinnamon powder from Sri Lanka.</p>
            <Specs rows={powderSpecs} />
            <div className="flex flex-wrap gap-3.5">
              <Link href="/export-wholesale#enquiry" className="btn btn-gold">Request a Quote</Link>
              <Link href="/quality-sourcing#request" className="btn btn-ghost">Request Specifications</Link>
            </div>
          </Reveal>
          <Reveal className="md:order-2"><ProductGallery items={powderGallery} label="Cinnamon powder gallery" /></Reveal>
        </div>
      </section>

      <section aria-labelledby="pack-h" className="sec">
        <div className="wrap grid items-center gap-20 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <Reveal><Photo alt="Packaging concept: unbranded matte-black boxes and pouches with gold linework, beside plain export cartons" src="/images/packaging-black-gold.jpg" frame className="group aspect-[16/10]" /></Reveal>
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow">Packaging &amp; Private Label</p>
            <h2 id="pack-h" className="serif text-[clamp(38px,4vw,58px)] leading-[1.05]">Presented for your shelf, or your warehouse.</h2>
            <p className="lede">Bulk export cartons, retail-ready packs or your own private-label design — packaging is agreed with each buyer, alongside labelling and market requirements.</p>
            <div><Link href="/export-wholesale#enquiry" className="btn btn-gold">Discuss Packaging</Link></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
