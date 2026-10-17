import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import { Arrow, Diamond } from '@/components/Icons';
import { isPlaceholder, site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ceylon Cinnamon vs Cassia, Grades & Buying Guide',
  description:
    'What Ceylon cinnamon (Cinnamomum verum) is, how it differs from cassia, how Sri Lankan quills are graded — Alba, C5 and more — and what to ask when buying in bulk.',
  path: '/ceylon-cinnamon',
});

/*
 * General, verifiable information about Ceylon cinnamon. Statements about CYORA itself are limited to confirmed facts
 * (Sri Lankan origin, Grade C5, packaging options, samples). Sources for the general facts: Germany's Federal Institute
 * for Risk Assessment (BfR) on coumarin; Sri Lanka Standards Institution SLS 81 on quill grading.
 */

const comparison = [
  ['Botanical name', 'Cinnamomum verum (syn. C. zeylanicum)', 'Cinnamomum cassia and related species'],
  ['Main origin', 'Sri Lanka', 'China, Indonesia and Vietnam'],
  ['Quill structure', 'Many thin, papery layers rolled together', 'One thick layer of bark, curled inward'],
  ['Texture', 'Brittle — breaks and grinds easily', 'Hard and woody'],
  ['Colour', 'Light tan to golden brown', 'Darker, reddish brown'],
  ['Flavour & aroma', 'Delicate, sweet and layered', 'Strong, pungent and spicy'],
  ['Coumarin', 'Low levels', 'Considerably higher levels'],
] as const;

const grades = [
  ['Alba', 'The finest, thinnest quills — up to about 6 mm in diameter.'],
  ['Continental', 'Fine quills, with grades such as C5 and C4. CYORA’s products are specified as Grade C5.'],
  ['Mexican', 'Medium-thickness quills, graded with M designations.'],
  ['Hamburg', 'The thickest, coarsest quills, graded with H designations.'],
] as const;
const roman = ['I', 'II', 'III', 'IV'];

const uses = [
  ['Baking & desserts', 'Cakes, pastries, puddings, custards and fruit dishes, where a gentle, sweet warmth is wanted.'],
  ['Hot drinks', 'Tea, coffee, mulled drinks and spiced milk — whole quills infuse slowly and cleanly.'],
  ['Savoury cooking', 'Curries, rice dishes, stews and spice blends.'],
  ['Food manufacturing', 'Bakery, confectionery, beverage and seasoning applications, matched to an agreed ingredient specification.'],
] as const;

const ask = [
  ['Species & origin', 'Confirmation that the product is Cinnamomum verum of Sri Lankan origin.'],
  ['Grade & specification', 'The grade and a written specification sheet for the product you are buying.'],
  ['Lot parameters', 'Values such as moisture, stated per lot rather than implied by a label.'],
  ['Laboratory reports', 'Test reports relevant to your market and application.'],
  ['Packaging & storage', 'Packaging format, inner liners and storage guidance.'],
  ['Export documents', 'The documents your destination requires, confirmed before shipment.'],
] as const;

const contactParts = [
  !isPlaceholder(site.email) && `email ${site.email}`,
  site.whatsappDigits && `message ${site.whatsapp} on WhatsApp`,
  'use the enquiry forms on this website',
].filter(Boolean) as string[];
const contactAnswer = `You can ${contactParts.slice(0, -1).join(', ')}${contactParts.length > 1 ? ' or ' : ''}${contactParts[contactParts.length - 1]}.`;

// Answers are plain text so the same copy feeds the FAQPage structured data.
const faqs: { q: string; a: string; link?: [href: string, label: string] }[] = [
  {
    q: 'What is Ceylon cinnamon?',
    a: 'Ceylon cinnamon is the dried inner bark of Cinnamomum verum, a tree native to Sri Lanka. Often called “true cinnamon”, it is known for thin, layered quills and a delicate, sweet flavour.',
  },
  {
    q: 'What is the difference between Ceylon cinnamon and cassia?',
    a: 'Ceylon cinnamon (Cinnamomum verum) comes mainly from Sri Lanka and forms thin, brittle quills made of many papery layers, with a delicate, sweet flavour. Cassia comes from related species grown mainly in China, Indonesia and Vietnam; its quills are a single thick, hard layer with a stronger, more pungent flavour. Both are often sold simply as “cinnamon”.',
  },
  {
    q: 'Why is it called Ceylon cinnamon?',
    a: 'Ceylon was the name of Sri Lanka until 1972. The spice kept the name, and “Ceylon cinnamon” is still used for cinnamon of the Cinnamomum verum species, particularly from Sri Lanka.',
  },
  {
    q: 'Does Ceylon cinnamon contain less coumarin than cassia?',
    a: 'Germany’s Federal Institute for Risk Assessment (BfR) describes Ceylon cinnamon as containing only low levels of coumarin, while cassia contains considerably more. Levels vary between samples, so buyers with specific requirements should ask for laboratory test reports.',
  },
  {
    q: 'What does Grade C5 mean?',
    a: 'Sri Lanka grades cinnamon quills under its national standard, SLS 81, mainly by quill diameter. Grades fall into four groups — Alba, Continental, Mexican and Hamburg — from finest to coarsest. C5 is a grade in the Continental group. CYORA’s cinnamon sticks and powder are specified as Grade C5.',
    link: ['/products', 'View product specifications'],
  },
  {
    q: 'How should cinnamon be stored?',
    a: 'Keep cinnamon in airtight packaging in a cool, dry, dark place, away from strong odours. Whole quills generally hold their aroma longer than powder.',
  },
  {
    q: 'Does CYORA supply Ceylon cinnamon wholesale and for export?',
    a: 'Yes. CYORA offers Ceylon cinnamon sticks and pure Ceylon cinnamon powder from Sri Lanka to importers, distributors, wholesalers, retailers and food manufacturers. Quotations are based on product, quantity, packaging and destination.',
    link: ['/export-wholesale#enquiry', 'Send a wholesale enquiry'],
  },
  {
    q: 'Can CYORA supply private-label cinnamon packaging?',
    a: 'Packaging options include bulk cartons, retail packs and private-label packaging. Format, labelling and market requirements are agreed with each buyer.',
    link: ['/products', 'See packaging options'],
  },
  {
    q: 'Can I request a sample?',
    a: 'Yes. Samples can be requested so you can evaluate the product before ordering, subject to availability and agreed terms.',
    link: ['/export-wholesale#enquiry', 'Request a sample'],
  },
  {
    q: 'Which export documents can be provided?',
    a: 'Export shipments typically involve documents such as a commercial invoice, packing list, certificate of origin and phytosanitary certificate. Requirements vary by destination and are confirmed per order.',
    link: ['/quality-sourcing#request', 'Request documents'],
  },
  { q: 'How do I contact CYORA?', a: contactAnswer, link: ['/contact', 'Contact CYORA'] },
];

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const h2 = 'serif text-[clamp(40px,4.6vw,66px)] leading-[1.04]';

export default function CeylonCinnamonGuide() {
  return (
    <>
      <JsonLd data={faqLd} />

      <PageHero
        eyebrow="Ceylon Cinnamon Guide"
        image={{ alt: 'Dramatic close-up of Ceylon cinnamon quills', tone: 'brown', src: '/images/quills-closeup.jpg' }}
        title={<>Ceylon Cinnamon,<br /><em className="text-gold">Explained.</em></>}
        lede="A buyer’s guide to true cinnamon — what it is, how it differs from cassia, how Sri Lankan quills are graded, and what to ask before you buy."
      >
        <a href="#compare" className="btn btn-ghost">Ceylon vs Cassia</a>
        <a href="#grades" className="btn btn-ghost">Grades</a>
        <a href="#faq" className="btn btn-ghost">FAQ</a>
      </PageHero>

      {/* WHAT IS IT */}
      <section aria-labelledby="what-h" className="sec on-ivory bg-ivory text-ink">
        <div className="wrap grid items-center gap-12 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]">
          <Reveal className="flex flex-col gap-7">
            <p className="eyebrow">The Basics</p>
            <h2 id="what-h" className={h2}>What is Ceylon cinnamon?</h2>
            <p className="lede text-[21px] !text-ink">Ceylon cinnamon is the dried inner bark of <em>Cinnamomum verum</em> — often called “true cinnamon” — a tree native to Sri Lanka.</p>
            <p className="lede">The name comes from Ceylon, as Sri Lanka was known until 1972. The bark is peeled in fine sheets, layered and rolled into slender quills, which gives Ceylon cinnamon its delicate texture and its warm, sweet, gently complex aroma.</p>
            <p className="lede">Much of the cinnamon traded worldwide is in fact cassia, from related <em>Cinnamomum</em> species. Both are often labelled simply “cinnamon”, which is why serious buyers ask about species and origin first.</p>
          </Reveal>
          <Reveal><Photo alt="Macro of a layered Ceylon quill cross-section beside fine powder" src="/images/quill-powder-macro.jpg" tone="ivory" frame className="group aspect-square" /></Reveal>
        </div>
      </section>

      {/* CEYLON VS CASSIA */}
      <section id="compare" aria-labelledby="compare-h" className="sec scroll-mt-24">
        <div className="wrap">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="flex max-w-[760px] flex-col gap-6">
              <p className="eyebrow">Ceylon vs Cassia</p>
              <h2 id="compare-h" className={h2}>Two spices sold as cinnamon.</h2>
            </div>
            <p className="lede max-w-[440px] text-base">Side by side, the differences are easy to see, feel and taste — and they matter to anyone buying for a specific market or recipe.</p>
          </Reveal>
          <Reveal>
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Ceylon cinnamon compared with cassia</caption>
              <thead className="hidden md:table-header-group">
                <tr className="border-b border-gold/40">
                  <td />
                  <th scope="col" className="py-5 pr-8 text-xs font-normal uppercase tracking-[0.28em] text-gold">Ceylon cinnamon</th>
                  <th scope="col" className="py-5 text-xs font-normal uppercase tracking-[0.28em] text-ivory/60">Cassia</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([k, ceylon, cassia]) => (
                  <tr key={k} className="grid grid-cols-2 gap-x-6 gap-y-3 border-b border-gold/20 py-6 md:table-row md:py-0">
                    <th scope="row" className="col-span-2 text-[11px] font-normal uppercase tracking-[0.24em] text-ivory/60 md:w-[220px] md:py-7 md:pr-8 md:align-top">{k}</th>
                    <td className="font-serif text-[22px] leading-snug text-ivory md:py-7 md:pr-8 md:align-top md:text-[26px]">
                      <span className="mb-1 block font-sans text-[10px] uppercase tracking-[0.24em] text-gold md:hidden">Ceylon</span>
                      {ceylon}
                    </td>
                    <td className="text-[15px] leading-relaxed text-ivory/65 md:py-7 md:align-top">
                      <span className="mb-1 block text-[10px] uppercase tracking-[0.24em] text-ivory/50 md:hidden">Cassia</span>
                      {cassia}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-[760px] text-xs leading-relaxed text-ivory/60">
              Coumarin comparison as described by Germany’s Federal Institute for Risk Assessment (BfR). Levels vary between samples — ask for laboratory reports where your market requires them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* GRADES */}
      <section id="grades" aria-labelledby="grades-h" className="scroll-mt-24 bg-forest py-28 md:py-36">
        <div className="wrap grid items-start gap-16 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow">Grading</p>
            <h2 id="grades-h" className="serif text-[clamp(36px,4vw,56px)] leading-[1.06]">How Sri Lankan cinnamon is graded.</h2>
            <p className="lede text-ivory/85">Sri Lanka grades cinnamon quills under its national standard, SLS 81, mainly by quill diameter, together with appearance and quality. Broken pieces and the bark of thinner shoots are traded separately as quillings, featherings and chips.</p>
            <p className="lede text-ivory/85">CYORA’s cinnamon sticks and powder are specified as <span className="text-gold">Grade C5</span>, in the Continental group. Specification sheets are shared on request.</p>
            <div><Link href="/products" className="btn btn-ghost">View Product Specifications</Link></div>
          </Reveal>
          <Reveal as="ol" aria-label="Quill grade groups, finest to coarsest" className="flex flex-col border-t border-ivory/30">
            {grades.map(([name, body], i) => (
              <li key={name} className="grid grid-cols-[48px_1fr] gap-4 border-b border-ivory/30 py-7">
                <span aria-hidden="true" className="font-serif text-[22px] text-gold">{roman[i]}</span>
                <div>
                  <h3 className="font-serif text-[30px] font-normal leading-[1.1]">{name}</h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-ivory/80">{body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* USES */}
      <section aria-labelledby="uses-h" className="sec on-ivory bg-ivory text-ink">
        <div className="wrap">
          <Reveal className="mb-16 flex max-w-[820px] flex-col gap-6">
            <p className="eyebrow">In the Kitchen &amp; Beyond</p>
            <h2 id="uses-h" className={h2}>How Ceylon cinnamon is used.</h2>
          </Reveal>
          <Reveal className="grid gap-px border border-ink/10 bg-ink/10 [grid-template-columns:repeat(auto-fit,minmax(min(260px,100%),1fr))]">
            {uses.map(([title, body]) => (
              <div key={title} className="flex flex-col gap-4 bg-ivory px-9 pb-12 pt-11">
                <h3 className="font-serif text-[30px] font-normal leading-[1.1]">{title}</h3>
                <p className="text-[15px] leading-[1.75] text-ink/75">{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* BUYING IN BULK */}
      <section aria-labelledby="buy-h" className="sec">
        <div className="wrap grid items-start gap-16 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow">Buying in Bulk</p>
            <h2 id="buy-h" className={h2}>What to ask a Ceylon cinnamon supplier.</h2>
            <p className="lede">Whether you import by the container or buy for a private-label range, these are the details that separate a clear offer from a vague one. We expect to be asked all of them.</p>
            <Link href="/quality-sourcing" className="link-arrow">Our Approach to Quality <Arrow /></Link>
          </Reveal>
          <Reveal as="ol" className="flex flex-col border-t border-gold/30">
            {ask.map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[48px_1fr] gap-4 border-b border-gold/30 py-6">
                <span aria-hidden="true" className="font-serif text-lg text-gold">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-normal tracking-[0.02em]">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.7] text-ivory/70">{body}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="sec on-ivory scroll-mt-24 bg-ivory text-ink">
        <div className="wrap grid items-start gap-16 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
          <Reveal className="flex max-w-[440px] flex-col gap-6">
            <p className="eyebrow">Questions</p>
            <h2 id="faq-h" className="serif text-[clamp(40px,4.4vw,62px)] leading-[1.04]">Frequently asked questions.</h2>
            <p className="lede text-base">Short answers to what buyers most often ask about Ceylon cinnamon and about working with CYORA.</p>
          </Reveal>
          <div className="border-t border-ink/15">
            {faqs.map(({ q, a, link }) => (
              <details key={q} className="group border-b border-ink/15">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-6 py-6 font-serif text-[24px] leading-[1.25] hover:text-cinnamon [&::-webkit-details-marker]:hidden">
                  {q}
                  <span
                    aria-hidden="true"
                    className="relative mt-2.5 h-3.5 w-3.5 shrink-0 text-cinnamon transition-transform duration-300 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current group-open:rotate-45"
                  />
                </summary>
                <div className="flex flex-col items-start gap-3 pb-7 pr-10">
                  <p className="text-[15px] leading-[1.8] text-ink/75">{a}</p>
                  {link && <Link href={link[0]} className="link-arrow !text-cinnamon">{link[1]} <Arrow /></Link>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="guide-cta-h" className="sec">
        <Reveal className="wrap flex flex-col items-center gap-8 text-center">
          <Diamond className="text-gold" />
          <h2 id="guide-cta-h" className="serif max-w-[900px] text-[clamp(38px,4.8vw,68px)] leading-[1.05]">Sourcing Ceylon cinnamon for your market?</h2>
          <p className="lede text-ivory/85">Tell us your product, quantity, packaging and destination, and we will reply with clear information and a considered proposal.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/export-wholesale#enquiry" className="btn btn-gold">Request a Wholesale Quote</Link>
            <Link href="/products" className="btn btn-ghost">View Our Products</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
