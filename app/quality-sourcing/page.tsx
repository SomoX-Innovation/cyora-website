import PageHero from '@/components/PageHero';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import EnquiryForm, { type FieldDef } from '@/components/EnquiryForm';
import { Doc, Flask } from '@/components/Icons';
import { documentTypes, products } from '@/lib/enquiry';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Quality & Sourcing — Ceylon Cinnamon Specifications',
  description:
    'How to evaluate CYORA’s Ceylon cinnamon: origin, product specifications, traceability where available, laboratory documentation, packaging and export documents. Request documents online.',
  path: '/quality-sourcing',
});

const pillars = [
  ['Product origin', 'Each product is identified as Ceylon cinnamon (Cinnamomum verum) of Sri Lankan origin. Supporting origin documentation can be discussed per shipment.', 'origin details, certificate of origin'],
  ['Product identification & specifications', 'Grades, dimensions, moisture and other parameters are stated per product and per lot — never implied by a label. Specification sheets are shared on request.', 'product specification sheet'],
  ['Sourcing & traceability', 'Where traceability information is available — such as sourcing region or lot references — we share it. Where it is not, we say so rather than fill the gap with assumptions.', 'lot and sourcing information, where available'],
  ['Laboratory testing & food-safety documents', 'Appropriate testing depends on your market and application. Available test reports and food-safety documentation can be requested; specific tests can be discussed for your requirements.', 'available test reports, certificate of analysis'],
  ['Packaging & storage', 'Cinnamon is sensitive to moisture, light and odour. Packaging formats, inner liners and recommended storage conditions are agreed in advance with each buyer.', 'packaging specification, storage guidance'],
  ['Export documentation', 'Typical export shipments may involve documents such as a commercial invoice, packing list, certificate of origin and phytosanitary certificate. Requirements vary by destination and are confirmed per order.', 'export document list for your country'],
  ['Your quality requirements', 'Share your own specification, testing protocol or retailer standard. We will review it and tell you honestly which requirements can be met and how.', 'your buyer specification'],
] as const;

const fields: FieldDef[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email', full: true },
  { name: 'product', label: 'Product', type: 'select', required: true, options: products, placeholder: 'Select a product' },
  { name: 'document', label: 'Document needed', type: 'select', required: true, options: documentTypes, placeholder: 'Select a document' },
  { name: 'country', label: 'Destination country', type: 'text', autoComplete: 'country-name', full: true },
  { name: 'message', label: 'Your question or requirements', type: 'textarea', required: true },
];

export default function Quality() {
  return (
    <>
      <PageHero
        eyebrow="Quality & Sourcing"
        image={{ alt: 'Hands inspecting cinnamon quills against natural light', tone: 'brown', src: '/images/inspection.jpg' }}
        title={<>Trust Is Built<br /><em className="text-gold">on Details.</em></>}
        lede="A guide to how buyers can evaluate our Ceylon cinnamon — and the documentation you can request from us before, and with, every order."
      >
        <a href="#request" className="btn btn-gold">Request Documents</a>
      </PageHero>

      <section aria-labelledby="pillars-h" className="sec">
        <div className="wrap">
          <Reveal className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <h2 id="pillars-h" className="serif max-w-[760px] text-[clamp(40px,4.6vw,66px)] leading-[1.04]">Seven questions every serious buyer should ask.</h2>
            <p className="lede max-w-[440px] text-base">We would rather you ask them of us than assume. Where information is not yet available, we will tell you plainly.</p>
          </Reveal>
          <ol className="flex flex-col">
            {pillars.map(([title, body, ask], i) => (
              <Reveal as="li" key={title} className="grid items-start gap-4 border-t border-gold/25 py-12 last:border-b md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12">
                <span className="font-serif text-[56px] font-light leading-none text-gold/55">0{i + 1}</span>
                <h3 className="font-serif text-[34px] font-normal leading-[1.1]">{title}</h3>
                <div>
                  <p className="text-base leading-[1.8] text-ivory/75">{body}</p>
                  <p className="mt-3.5 text-xs uppercase tracking-[0.2em] text-gold">{i === 6 ? 'Send us: ' : 'Ask for: '}{ask}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Verified documents: add real, current certificates and reports only. */}
      <section aria-labelledby="docs-h" className="bg-forest py-28">
        <div className="wrap grid items-center gap-16 [grid-template-columns:repeat(auto-fit,minmax(min(420px,100%),1fr))]">
          <Reveal className="flex flex-col gap-6">
            <p className="eyebrow">Verified Documents</p>
            <h2 id="docs-h" className="serif text-[clamp(36px,4vw,56px)] leading-[1.06]">Only what we can show you.</h2>
            <p className="lede text-ivory/85">Certificates, test results and compliance statements appear here only once they have been supplied and verified. Until then, we provide documentation directly on request.</p>
          </Reveal>
          <Reveal className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
            <div className="flex min-h-[200px] flex-col justify-between gap-4 border border-dashed border-gold/55 p-6">
              <Doc className="text-gold" />
              <span className="tbc">[Certificate slot — add only verified documents supplied by CYORA]</span>
            </div>
            <div className="flex min-h-[200px] flex-col justify-between gap-4 border border-dashed border-gold/55 p-6">
              <Flask className="text-gold" />
              <span className="tbc">[Lab report slot — add only genuine, current test results]</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="request" aria-labelledby="req-h" className="sec on-ivory scroll-mt-24 bg-ivory text-ink">
        <div className="wrap grid items-start gap-16 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(360px,100%),1fr))]">
          <Reveal className="flex max-w-[440px] flex-col gap-6">
            <p className="eyebrow">Documentation Request</p>
            <h2 id="req-h" className="serif text-[clamp(40px,4.4vw,62px)] leading-[1.04]">Request documents or ask a technical question.</h2>
            <p className="lede text-base">Tell us which product and documents you need, and anything specific about your market. We will reply by email with what is available.</p>
            <Photo alt="Palletised export cartons in warm warehouse light" src="/images/export-cartons.jpg" tone="green" frame className="group mt-3 aspect-[4/3]" />
          </Reveal>
          <div>
            <EnquiryForm formType="documents" fields={fields} submitLabel="Send Request" ariaLabel="Documentation request form" successNoun="request" />
          </div>
        </div>
      </section>
    </>
  );
}
