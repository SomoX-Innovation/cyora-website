import Link from 'next/link';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { Arrow, Box, Diamond, Globe, Leaf, Lens } from '@/components/Icons';

const values = [
  { Icon: Leaf, title: 'Sri Lankan Origin', body: 'Our products are Ceylon cinnamon from Sri Lanka — the island whose name the spice has carried for generations. Origin is where our story, and every conversation, begins.' },
  { Icon: Lens, title: 'Product-Focused Quality', body: 'We put the product first: clear identification, stated specifications, and documentation shared openly so buyers can evaluate each lot against their own requirements.' },
  { Icon: Box, title: 'Thoughtful Presentation', body: 'From retail-ready packs to bulk export cartons, presentation should protect the spice and honour it. Packaging is discussed with each partner, not imposed.' },
  { Icon: Globe, title: 'International Partnerships', body: 'We want long-term relationships built on responsiveness and straight answers — with importers, distributors and food businesses who value a reliable conversation.' },
];

const services = ['Wholesale enquiries', 'Product specifications', 'Packaging discussions', 'Export quotations', 'Sample requests, subject to availability'];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section aria-label="Introduction" className="relative flex min-h-[880px] items-end overflow-hidden md:min-h-[940px]">
        <Photo
          alt="Sri Lankan cinnamon plantation at sunrise — morning mist, lush foliage, golden light"
          src="/images/hero-plantation.jpg"
          tone="green" priority drift shade sizes="100vw"
          className="!absolute inset-0"
          captionClassName="!left-auto right-5 md:!right-14 !bottom-10 items-end text-right"
        />
        <div className="wrap relative z-[3] pb-36 pt-56">
          {/* The eyebrow sits inside the h1 so the page's main heading names what CYORA does, not only the tagline. */}
          <h1>
            <span className="eyebrow rise mb-9">Ceylon Cinnamon Exporter · Sri Lanka</span>
            <span className="serif rise d1 block max-w-[1000px] text-[clamp(56px,9vw,132px)] leading-[.96]">
              Nature’s Finest.<br /><em className="text-gold">From Sri Lanka.</em>
            </span>
          </h1>
          <p className="lede rise d2 mt-10 max-w-[560px] text-xl text-ivory/85">
            Discover the distinctive character of Ceylon cinnamon, thoughtfully presented for international markets.
          </p>
          <div className="rise d3 mt-12 flex flex-wrap gap-4">
            <Link href="/products" className="btn btn-gold">Explore Our Cinnamon</Link>
            <Link href="/export-wholesale" className="btn btn-ghost">Partner With CYORA</Link>
          </div>
        </div>
        <a href="#intro" aria-label="Scroll to brand introduction" className="rise d4 absolute bottom-9 left-1/2 z-[3] hidden min-h-[44px] -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ivory/60 md:flex">
          Scroll<span className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
        </a>
      </section>

      {/* BRAND INTRODUCTION */}
      <section id="intro" className="sec on-ivory bg-ivory text-ink">
        <div className="wrap grid items-start gap-20 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <Reveal>
            <p className="eyebrow mb-8">The House of CYORA</p>
            <h2 className="serif text-[clamp(44px,5.6vw,82px)] leading-[1.02]">Some Stories Begin<br />With a Place.</h2>
          </Reveal>
          <Reveal className="flex flex-col gap-7 pt-3">
            <p className="lede text-[21px] !text-ink">Ours begins on a tropical island, where warm rain, coastal breezes and patient hands have shaped one of the world’s most treasured spices.</p>
            <p className="lede">Ceylon cinnamon carries the character of its origin — delicate, sweetly aromatic and layered — and it is cherished for exactly that reason. At CYORA, we believe a spice this distinctive deserves to be presented with the same care that goes into making it.</p>
            <p className="lede">That is why we focus on what serious buyers ask about first: a clear origin, careful sourcing, consistent product, honest specifications and a responsible way of doing business. Beautiful presentation matters. Trust matters more.</p>
            <Link href="/our-story" className="link-arrow !text-cinnamon">Read Our Story <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section aria-labelledby="origin-h" className="grid bg-ink [grid-template-columns:repeat(auto-fit,minmax(min(560px,100%),1fr))]">
        <Photo alt="Warm sunlight filtering through a Sri Lankan cinnamon plantation" src="/images/plantation-light.jpg" tone="green" frame className="group min-h-[520px] md:min-h-[860px]" />
        <div className="flex items-center px-5 py-28 md:px-[clamp(24px,7vw,120px)]">
          <Reveal className="flex max-w-[560px] flex-col gap-8">
            <p className="eyebrow">Origin</p>
            <h2 id="origin-h" className="serif text-[clamp(42px,4.8vw,72px)] leading-[1.04]">Born From the<br />Land of Ceylon.</h2>
            <p className="lede">For centuries, the name Ceylon has travelled the world alongside cinnamon. Merchants crossed oceans for the fragrant quills of this island, and today true cinnamon — <em>Cinnamomum verum</em> — remains closely tied to Sri Lanka’s identity.</p>
            <p className="lede">It grows in the island’s humid lowlands, where the trees are cut back so that slender new shoots rise from the base. The bark is scraped, its delicate inner layer eased free, and the thin sheets are layered and rolled into quills that dry slowly in the shade.</p>
            <p className="lede">It is quiet, skilled work, and every quill carries a little of it. From those fields to a buyer’s warehouse on the other side of the world, our role is to keep that story intact.</p>
            <Link href="/ceylon-cinnamon" className="link-arrow">Ceylon vs Cassia — Read the Cinnamon Guide <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section aria-labelledby="prod-h" className="sec">
        <div className="wrap">
          <Reveal className="mb-20 flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="eyebrow mb-7">The Collection</p>
              <h2 id="prod-h" className="h-display">Two Expressions of<br />Ceylon Cinnamon.</h2>
            </div>
            <Link href="/products" className="link-arrow">View Full Catalogue <Arrow /></Link>
          </Reveal>
          <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(520px,100%),1fr))]">
            <Reveal>
              <Link href="/products#sticks" className="group flex h-full flex-col border border-gold/15 bg-[#171613] transition-colors duration-500 hover:border-gold/60">
                <Photo alt="Ceylon cinnamon quills arranged on dark natural stone" src="/images/sticks-stone.jpg" tone="brown" frame className="aspect-[5/4]" />
                <div className="flex flex-col gap-5 px-8 pb-12 pt-11 md:px-11">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs tracking-[0.32em] text-gold">PRODUCT 01</span>
                    <span className="border border-dashed border-gold/60 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-gold">Grade: C5</span>
                  </div>
                  <h3 className="serif text-[44px] leading-[1.05]">Ceylon Cinnamon<br />Sticks / Rolls</h3>
                  <p className="text-base leading-[1.75] text-ivory/75">Distinctive Ceylon cinnamon in carefully presented quill form for professional buyers and discerning customers.</p>
                  <span className="link-arrow">Explore Cinnamon Sticks <Arrow /></span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={150}>
              <Link href="/products#powder" className="group flex h-full flex-col border border-gold/15 bg-[#171613] transition-colors duration-500 hover:border-gold/60">
                <Photo alt="Fine Ceylon cinnamon powder in a premium ceramic bowl" src="/images/powder-bowl.jpg" frame className="aspect-[5/4]" />
                <div className="flex flex-col gap-5 px-8 pb-12 pt-11 md:px-11">
                  <span className="text-xs tracking-[0.32em] text-gold">PRODUCT 02</span>
                  <h3 className="serif text-[44px] leading-[1.05]">Pure Ceylon<br />Cinnamon Powder</h3>
                  <p className="text-base leading-[1.75] text-ivory/75">Finely presented Ceylon cinnamon powder for culinary applications, retail packaging, and suitable food-manufacturing uses.</p>
                  <span className="link-arrow">Explore Cinnamon Powder <Arrow /></span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section aria-labelledby="phil-h" className="sec on-ivory bg-ivory text-ink">
        <div className="wrap">
          <Reveal className="mb-20 flex flex-col items-center gap-7 text-center">
            <p className="eyebrow">The CYORA Philosophy</p>
            <h2 id="phil-h" className="h-display max-w-[900px]">More Than a Spice.<br /><em className="text-cinnamon">A Story of Origin.</em></h2>
          </Reveal>
          <Reveal className="grid gap-px border border-ink/10 bg-ink/10 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
            {values.map(({ Icon, title, body }) => (
              <div key={title} className="flex flex-col gap-5 bg-ivory px-9 pb-14 pt-12">
                <Icon className="text-cinnamon" />
                <h3 className="font-serif text-[30px] font-normal">{title}</h3>
                <p className="text-[15px] leading-[1.75] text-ink/75">{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FROM SRI LANKA TO THE WORLD */}
      <section aria-labelledby="world-h" className="sec relative overflow-hidden bg-forest">
        <svg viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 h-full w-full opacity-55">
          <g fill="none" stroke="rgba(199,165,106,.18)" strokeWidth=".6">
            <path d="M0 83h1000M0 167h1000M0 250h1000M0 333h1000M0 417h1000" />
            <path d="M83 0v500M167 0v500M250 0v500M333 0v500M417 0v500M500 0v500M583 0v500M667 0v500M750 0v500M833 0v500M917 0v500" />
          </g>
          <g fill="none" stroke="rgba(199,165,106,.45)" strokeWidth=".8" strokeDasharray="2 5">
            <path d="M724 228C600 120 420 100 300 150" /><path d="M724 228C640 90 560 70 500 110" /><path d="M724 228C820 150 880 160 930 190" />
            <path d="M724 228C620 300 420 340 260 300" /><path d="M724 228C800 320 860 360 900 380" />
          </g>
          {/* Marker at Sri Lanka's approximate position on an equirectangular grid */}
          <circle cx="724" cy="228" r="6" fill="none" stroke="#C7A56A" style={{ animation: 'pulse-ring 3.2s ease-out infinite' }} />
          <circle cx="724" cy="228" r="4" fill="#C7A56A" />
        </svg>
        <div className="wrap relative grid items-end gap-20 [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]">
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow">From Sri Lanka to the World</p>
            <h2 id="world-h" className="serif text-[clamp(40px,4.8vw,72px)] leading-[1.04]">Connecting Sri Lankan Cinnamon With Global Markets.</h2>
            <p className="lede text-ivory/85">CYORA welcomes enquiries from international importers, distributors, wholesalers, retailers and food businesses. Tell us what your market needs, and we will respond with clear information and a considered proposal.</p>
            <div><Link href="/export-wholesale#enquiry" className="btn btn-gold">Discuss Your Requirements</Link></div>
          </Reveal>
          <Reveal as="ul" className="flex flex-col border-t border-gold/30">
            {services.map((s, i) => (
              <li key={s} className="flex items-baseline gap-6 border-b border-gold/30 py-6">
                <span className="font-serif text-lg text-gold">0{i + 1}</span>
                <span className="text-lg tracking-[0.02em]">{s}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* QUALITY PREVIEW */}
      <section aria-labelledby="trust-h" className="sec">
        <div className="wrap grid items-center gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]">
          <Reveal className="grid grid-cols-2 gap-4">
            <Photo alt="Skilled cinnamon peeler working with quills (illustrative — not a CYORA facility)" src="/images/peeler.jpg" tone="brown" className="group row-span-2 aspect-[3/4]" sizes="(max-width: 768px) 50vw, 25vw" />
            <Photo alt="Palletised export cartons in warm warehouse light" src="/images/export-cartons.jpg" className="group aspect-square" sizes="(max-width: 768px) 50vw, 25vw" />
            <Photo alt="Naturally peeling cinnamon bark" src="/images/bark-peel.jpg" tone="green" className="group aspect-square" sizes="(max-width: 768px) 50vw, 25vw" />
          </Reveal>
          <Reveal className="flex flex-col gap-8">
            <p className="eyebrow">Quality &amp; Sourcing</p>
            <h2 id="trust-h" className="h-display">Trust Is Built<br />on Details.</h2>
            <p className="lede">Behind every shipment sits a set of details a professional buyer needs to see: how the product is identified, the grade and specification it is sold against, traceability where available, appropriate laboratory testing, suitable packaging and clear export documentation.</p>
            <p className="lede">We treat these as the foundation of a partnership, and we share what we have openly — so you can judge each product on evidence, not adjectives.</p>
            <div><Link href="/quality-sourcing" className="btn btn-ghost">Discover Our Approach to Quality</Link></div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section aria-labelledby="cta-h" className="relative flex min-h-[760px] items-center overflow-hidden">
        <Photo alt="Dramatic close-up of Ceylon cinnamon quills" src="/images/quills-closeup.jpg" tone="brown" sizes="100vw" className="!absolute inset-0" captionClassName="!left-auto right-5 md:!right-14 items-end text-right">
          <div className="absolute inset-0 z-[1] bg-ink/60" />
        </Photo>
        <Reveal className="wrap relative z-[3] flex flex-col items-center gap-8 py-28 text-center">
          <Diamond className="text-gold" />
          <h2 id="cta-h" className="serif max-w-[1000px] text-[clamp(40px,5.4vw,80px)] leading-[1.04]">Let’s Bring the Story of Ceylon Cinnamon to Your Market.</h2>
          <p className="lede text-ivory/85">Tell us about your business, product requirements, and target market. Let’s explore a potential partnership.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/export-wholesale#enquiry" className="btn btn-gold">Request a Wholesale Quote</Link>
            <Link href="/contact" className="btn btn-ghost">Contact CYORA</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
