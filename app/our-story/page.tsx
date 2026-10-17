import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { Arrow } from '@/components/Icons';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Our Story — Ceylon Cinnamon Heritage',
  description: 'The land of Ceylon, the cinnamon heritage of Sri Lanka and the craft of turning bark into quills — the story behind CYORA’s Ceylon cinnamon.',
  path: '/our-story',
});

const chapters = [
  ['land', 'I', 'The Land'], ['heritage', 'II', 'Heritage'], ['quill', 'III', 'Bark to Quill'],
  ['character', 'IV', 'Character'], ['sourcing', 'V', 'Sourcing'], ['vision', 'VI', 'Vision'],
] as const;

const steps = [
  ['01 — Harvest', 'Cinnamon trees are coppiced, so that slender shoots grow from the base. Mature shoots are cut, typically after rains when the bark lifts more easily.'],
  ['02 — Scrape', 'The rough outer bark is scraped away, and the stem is rubbed with a brass rod to loosen the thin, fragrant inner bark.'],
  ['03 — Peel & roll', 'Peelers ease the inner bark free in delicate sheets, then layer smaller pieces inside larger ones to form long, slender quills.'],
  ['04 — Dry & grade', 'Quills dry slowly in the shade, then are sorted and graded — in Sri Lanka, grades such as C5 are defined largely by quill diameter.'],
];

const Chap = ({ n, light }: { n: string; light?: boolean }) => (
  <span aria-hidden="true" className={`font-serif text-[80px] font-light leading-[.8] md:text-[120px] ${light ? 'text-cinnamon/25' : 'text-gold/30'}`}>{n}</span>
);

const split = 'wrap grid items-center gap-12 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(460px,100%),1fr))]';
const h2 = 'serif text-[clamp(40px,4.6vw,68px)] leading-[1.04]';

export default function OurStory() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        minH="min-h-[820px]"
        image={{ alt: 'Sri Lankan landscape — misty green hills and coastal lowlands at dawn', tone: 'green', src: '/images/landscape-dawn.jpg' }}
        title={<>Rooted in Sri Lankan heritage.<br /><em className="text-gold">Crafted for the world.</em></>}
      >
        <ol aria-label="Chapters" className="flex flex-wrap gap-x-8 gap-y-1">
          {chapters.map(([id, n, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="inline-flex min-h-[44px] items-center gap-2.5 text-xs uppercase tracking-[0.2em] text-ivory/75 hover:text-gold">
                <span className="text-gold">{n}</span>{label}
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      <section id="land" className="sec on-ivory scroll-mt-24 bg-ivory text-ink">
        <div className={split}>
          <Reveal className="flex flex-col gap-7">
            <Chap n="I" light />
            <p className="eyebrow">Chapter One</p>
            <h2 className={h2}>The Land of Ceylon</h2>
            <p className="lede text-[21px] !text-ink">Long before it appeared on any label, Ceylon was a place — an island in the Indian Ocean, warm, green and rain-washed.</p>
            <p className="lede">Monsoon rains sweep in from the sea. Rivers wind through low hills toward the coast. In the humid air of the southern and western lowlands, the soil and the seasons create conditions in which the cinnamon tree has long been at home.</p>
            <p className="lede">Mornings arrive softly here, in mist and birdsong, and that gentleness seems to find its way into the spice itself.</p>
          </Reveal>
          <Reveal><Photo alt="Cinnamon plantation in tropical morning mist" src="/images/plantation-light.jpg" tone="green" frame className="group aspect-[4/5]" /></Reveal>
        </div>
      </section>

      <section id="heritage" className="sec scroll-mt-24">
        <div className={split}>
          <Reveal><Photo alt="Close-up of a cinnamon tree with naturally peeling bark" src="/images/bark-peel.jpg" tone="green" frame className="group aspect-[4/5]" /></Reveal>
          <Reveal className="flex flex-col gap-7">
            <Chap n="II" />
            <p className="eyebrow">Chapter Two</p>
            <h2 className={h2}>The Cinnamon Heritage of Sri Lanka</h2>
            <p className="lede">Cinnamon has been part of the island’s story for centuries. It drew merchants across the Indian Ocean and shaped trade routes between East and West, and for long periods it was among the most coveted goods in the world.</p>
            <p className="lede">Through all of that history, the knowledge of how to grow, cut and peel the bark has been passed down — hand to hand, season to season. Today the words “Ceylon cinnamon” still point to one place of origin: Sri Lanka.</p>
            <blockquote className="mt-3 font-serif text-3xl italic leading-snug text-ivory">“A spice that carries the name of its island wherever it goes.”</blockquote>
          </Reveal>
        </div>
      </section>

      <section id="quill" className="sec on-ivory scroll-mt-24 bg-ivory text-ink">
        <div className="wrap">
          <Reveal className="mb-16 flex max-w-[760px] flex-col gap-6">
            <Chap n="III" light />
            <p className="eyebrow">Chapter Three</p>
            <h2 className={h2}>From Bark to Quill</h2>
            <p className="lede">Turning a branch into a quill is unhurried, skilled handwork. Here, broadly, is how the craft unfolds in Sri Lanka.</p>
          </Reveal>
          <Reveal className="mb-16">
            <Photo src="/images/peeler.jpg" alt="Skilled Sri Lankan cinnamon peeler working with cinnamon quills (illustrative — not a CYORA facility)" tone="brown" frame className="group aspect-[4/3] md:aspect-[21/8]" sizes="100vw" />
          </Reveal>
          <Reveal as="ol" className="grid gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(250px,100%),1fr))]">
            {steps.map(([t, b]) => (
              <li key={t} className="flex flex-col gap-3.5 border-t border-ink/20 pt-6">
                <span className="font-serif text-[26px] text-cinnamon">{t}</span>
                <p className="text-[15px] leading-[1.75] text-ink/75">{b}</p>
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-14">
            <Link href="/production-process" className="link-arrow !text-cinnamon">See the Full Production Process <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      <section id="character" className="sec scroll-mt-24 bg-forest">
        <div className={split}>
          <Reveal className="flex flex-col gap-7">
            <Chap n="IV" />
            <p className="eyebrow">Chapter Four</p>
            <h2 className={h2}>The Character of Ceylon Cinnamon</h2>
            <p className="lede text-ivory/85">Break a Ceylon quill and you will notice it first in the hand: fine, papery layers rolled one inside another, light enough to crumble between the fingers.</p>
            <p className="lede text-ivory/85">Then the aroma — gentle, sweet and warm, with a delicate, almost floral complexity. It is quieter and more nuanced than the thick, hard bark of cassia, the cinnamon most often found on supermarket shelves, and it is widely noted for naturally containing far lower levels of coumarin.</p>
            <p className="lede text-ivory/85">It is a spice for people who notice the difference.</p>
          </Reveal>
          <Reveal><Photo alt="Macro of a layered Ceylon quill cross-section beside fine powder" src="/images/quill-powder-macro.jpg" frame className="group aspect-square" /></Reveal>
        </div>
      </section>

      <section id="sourcing" className="sec on-ivory scroll-mt-24 bg-ivory text-ink">
        <div className={split}>
          <Reveal><Photo alt="Hands inspecting Ceylon cinnamon quills in warm natural light" src="/images/inspection.jpg" tone="brown" frame className="group aspect-[4/5]" /></Reveal>
          <Reveal className="flex flex-col gap-7">
            <Chap n="V" light />
            <p className="eyebrow">Chapter Five</p>
            <h2 className={h2}>Our Approach to Sourcing</h2>
            <p className="lede">We believe good sourcing is mostly a matter of discipline: knowing what a product is, where it comes from and what it has been tested for — and saying so plainly.</p>
            <ul className="flex flex-col gap-4">
              {[
                'Products identified clearly as Ceylon cinnamon of Sri Lankan origin.',
                'Grades and specifications stated per lot, never implied.',
                'Traceability and test documentation shared where available.',
                'Fair, respectful dealings with everyone in the supply chain.',
              ].map((t) => (
                <li key={t} className="flex gap-4 text-base leading-[1.7] text-ink/80"><span className="text-cinnamon">—</span>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="vision" className="sec scroll-mt-24">
        <Reveal className="wrap flex flex-col items-center gap-8 text-center">
          <Chap n="VI" />
          <p className="eyebrow">Chapter Six</p>
          <h2 className="h-display max-w-[980px]">Our Vision for International Partnerships</h2>
          <p className="lede max-w-[720px]">We want to be the kind of partner an importer is glad to call: responsive, precise about specifications, honest about what we can and cannot supply, and invested in helping your customers fall in love with true Ceylon cinnamon.</p>
          <p className="lede max-w-[720px]">Whether you are building a retail range, sourcing for food manufacturing or distributing to specialist buyers, we would like to hear what you are trying to achieve.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-gold">Start a Conversation With CYORA</Link>
            <Link href="/products" className="btn btn-ghost">View Our Products</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
