import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import EnquiryForm, { type FieldDef } from '@/components/EnquiryForm';
import { buyerTypes, packagingOptions, products } from '@/lib/enquiry';
import { isPlaceholder, site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Export & Wholesale — Bulk Ceylon Cinnamon Supplier',
  description:
    'Sri Lankan spice export enquiries: bulk Ceylon cinnamon sticks and powder for importers, distributors, wholesalers, retailers, private-label and food manufacturers.',
  path: '/export-wholesale',
});

const services = [
  ['Importer & distributor enquiries', 'Ongoing supply of Ceylon cinnamon for your market, planned around your volumes, timelines and documentation needs.'],
  ['Wholesale product sourcing', 'Ceylon cinnamon sticks and powder in bulk formats, with specifications stated per lot.'],
  ['Retail & private-label packaging', 'Discuss retail-ready formats or private-label cinnamon packaging under your own brand.'],
  ['Food-manufacturing enquiries', 'Cinnamon powder and sticks for suitable food and beverage applications, matched to your ingredient specification.'],
  ['Product samples', 'Evaluate the product before you commit. Samples are offered subject to availability and agreed terms.'],
  ['Export quotations', 'Clear quotations based on product, quantity, packaging and destination. [Incoterms offered to confirm]'],
  ['Packaging & shipping discussions', 'Carton formats, labelling, palletisation and shipping arrangements, agreed with you in advance.'],
] as const;

const steps = [
  ['Enquire', 'Share your business, product, quantity and target market.'],
  ['Specify', 'We confirm specifications, packaging and documents available.'],
  ['Sample', 'Evaluate a sample, subject to availability.'],
  ['Quote', 'Receive a written quotation for your requirements.'],
  ['Ship', 'Production, documentation and shipment as agreed.'],
];
const roman = ['I', 'II', 'III', 'IV', 'V'];

const fields: FieldDef[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company name', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'country', label: 'Country', type: 'text', required: true, autoComplete: 'country-name' },
  { name: 'buyerType', label: 'Buyer type', type: 'select', required: true, options: buyerTypes, placeholder: 'Select buyer type' },
  { name: 'product', label: 'Product of interest', type: 'select', required: true, options: products, placeholder: 'Select a product' },
  { name: 'quantity', label: 'Estimated order quantity', type: 'text', required: true, placeholder: 'e.g. 500 kg per month' },
  { name: 'packaging', label: 'Preferred packaging', type: 'select', options: packagingOptions, placeholder: 'Select packaging' },
  { name: 'requirements', label: 'Additional requirements', type: 'textarea', placeholder: 'Specifications, certifications your market requires, destination port, timelines…' },
];

export default function ExportWholesale() {
  return (
    <>
      <PageHero
        eyebrow="Export & Wholesale"
        minH="min-h-[760px]"
        image={{ alt: 'Palletised export cartons in warm warehouse light', src: '/images/export-cartons.jpg' }}
        title={<>Your Sri Lankan Cinnamon<br /><em className="text-gold">Supply Partner.</em></>}
        lede="Bulk Ceylon cinnamon sticks and powder for importers, distributors, wholesalers, retailers and food manufacturers — with clear specifications and straightforward communication."
      >
        <a href="#enquiry" className="btn btn-gold">Send a Business Enquiry</a>
        <Link href="/products" className="btn btn-ghost">View Products</Link>
      </PageHero>

      <section aria-labelledby="svc-h" className="sec">
        <div className="wrap">
          <Reveal className="mb-16 flex max-w-[820px] flex-col gap-6">
            <p className="eyebrow">How We Can Work Together</p>
            <h2 id="svc-h" className="serif text-[clamp(40px,4.6vw,66px)] leading-[1.04]">From a first sample to a full container.</h2>
          </Reveal>
          <Reveal className="grid gap-px border border-gold/20 bg-gold/20 [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
            {services.map(([t, b], i) => (
              <div key={t} className="flex flex-col gap-4 bg-ink px-9 pb-12 pt-11 transition-colors duration-500 hover:bg-[#171613]">
                <span className="tbc tracking-[0.3em]">0{i + 1}</span>
                <h3 className="font-serif text-[30px] font-normal leading-[1.1]">{t}</h3>
                <p className="text-[15px] leading-[1.75] text-ivory/70">
                  {b.includes('[') ? <>{b.split('[')[0]}<span className="tbc">[{b.split('[')[1]}</span></> : b}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="proc-h" className="bg-forest py-28">
        <div className="wrap">
          <Reveal as="h2" id="proc-h" className="serif mb-16 text-[clamp(36px,4vw,56px)] leading-[1.06]">A clear path to your first order.</Reveal>
          <Reveal as="ol" className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
            {steps.map(([t, b], i) => (
              <li key={t} className="flex flex-col gap-3 border-t border-ivory/30 pt-6">
                <span className="font-serif text-[22px] text-gold">{roman[i]}</span>
                <h3 className="text-lg font-normal tracking-[0.04em]">{t}</h3>
                <p className="text-sm leading-[1.7] text-ivory/80">{b}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="enquiry" aria-labelledby="enq-h" className="sec on-ivory scroll-mt-24 bg-ivory text-ink">
        <div className="wrap grid items-start gap-16 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
          <Reveal className="flex max-w-[440px] flex-col gap-6">
            <p className="eyebrow">Business Enquiry</p>
            <h2 id="enq-h" className="serif text-[clamp(40px,4.4vw,62px)] leading-[1.04]">Tell us about your requirements.</h2>
            <p className="lede text-base">The more you share about your market and application, the more useful our reply will be. Every enquiry is read by a person.</p>
            <div className="flex flex-col gap-3.5 border-t border-ink/15 pt-6">
              <span className="text-[11px] uppercase tracking-[0.24em] text-ink/60">Prefer to talk directly?</span>
              {isPlaceholder(site.email) ? (
                <span className="tbc text-[15px]">{site.email}</span>
              ) : (
                <a href={`mailto:${site.email}`} className="text-[15px] text-cinnamon hover:underline">{site.email}</a>
              )}
              {site.whatsappDigits ? (
                <a href={`https://wa.me/${site.whatsappDigits}`} target="_blank" rel="noopener" className="text-[15px] text-cinnamon hover:underline">WhatsApp {site.whatsapp}</a>
              ) : (
                <span className="tbc text-[15px]">WhatsApp {site.whatsapp}</span>
              )}
            </div>
          </Reveal>
          <div>
            <EnquiryForm formType="wholesale" fields={fields} submitLabel="Send Business Enquiry" ariaLabel="Business enquiry form" successNoun="enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}
