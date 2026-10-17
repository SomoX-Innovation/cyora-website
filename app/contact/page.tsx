import Link from 'next/link';
import EnquiryForm, { type FieldDef } from '@/components/EnquiryForm';
import { contactTypes } from '@/lib/enquiry';
import { isPlaceholder, site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact CYORA — Ceylon Cinnamon Enquiries',
  description: 'Contact CYORA for general, wholesale or product enquiries about Ceylon cinnamon sticks and powder from Sri Lanka.',
  path: '/contact',
});

const fields: FieldDef[] = [
  { name: 'enquiryType', label: 'Enquiry type', type: 'segmented', options: contactTypes, defaultValue: 'general' },
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company', type: 'text', autoComplete: 'organization' },
  { name: 'country', label: 'Country', type: 'text', autoComplete: 'country-name' },
  { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'How can we help?' },
];

const row = 'flex flex-col gap-2 border-t border-ink/15 py-6';
const key = 'text-[11px] uppercase tracking-[0.26em] text-ink/60';

export default function Contact() {
  return (
    <>
      <section aria-label="Contact" className="relative overflow-hidden pb-28 pt-56">
        <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute -right-20 top-16 h-[560px] w-[560px] opacity-20">
          <g fill="none" stroke="#C7A56A" strokeWidth=".6"><circle cx="200" cy="200" r="60" /><circle cx="200" cy="200" r="100" /><circle cx="200" cy="200" r="140" /><circle cx="200" cy="200" r="180" /></g>
        </svg>
        <div className="wrap relative flex flex-col gap-8">
          <p className="eyebrow rise">Contact</p>
          <h1 className="serif rise d1 max-w-[980px] text-[clamp(50px,7.4vw,110px)] leading-[.98]">Let’s begin<br /><em className="text-gold">a conversation.</em></h1>
          <p className="lede rise d2">Whether you are exploring Ceylon cinnamon for the first time or planning a regular supply, we would be glad to hear from you.</p>
        </div>
      </section>

      <section aria-labelledby="form-h" className="on-ivory bg-ivory pb-36 pt-32 text-ink">
        <div className="wrap grid items-start gap-16 md:gap-24 [grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))]">
          <div className="flex max-w-[420px] flex-col">
            <p className="eyebrow mb-8">Direct Contact</p>
            <div className={row}>
              <span className={key}>Business email</span>
              {isPlaceholder(site.email) ? (
                <span className="tbc text-base">{site.email}</span>
              ) : (
                <a href={`mailto:${site.email}`} className="font-serif text-[28px] text-ink hover:text-cinnamon">{site.email}</a>
              )}
            </div>
            <div className={row}>
              <span className={key}>WhatsApp</span>
              {site.whatsappDigits ? (
                <a href={`https://wa.me/${site.whatsappDigits}`} target="_blank" rel="noopener" className="font-serif text-[28px] text-ink hover:text-cinnamon">{site.whatsapp}</a>
              ) : (
                <span className="tbc text-base">{site.whatsapp}</span>
              )}
            </div>
            <div className={row}>
              <span className={key}>Follow CYORA</span>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
                {site.socials.map((s) =>
                  s.href ? (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener" className="text-cinnamon">{s.label}</a>
                  ) : (
                    <span key={s.label}>{s.label} <span className="tbc">{s.handle}</span></span>
                  ),
                )}
              </div>
            </div>
            <div className={`${row} border-b`}>
              <span className={key}>Origin</span>
              <p className="font-serif text-2xl italic leading-snug">Ceylon cinnamon of Sri Lankan origin — presented for the world.</p>
            </div>
            <p className="mt-7 text-sm leading-[1.7] text-ink/65">
              For detailed wholesale or export requirements, the <Link href="/export-wholesale#enquiry" className="text-cinnamon underline-offset-4 hover:underline">business enquiry form</Link> lets you share quantities, packaging and buyer type.
            </p>
          </div>
          <div>
            <h2 id="form-h" className="serif mb-9 text-[clamp(36px,3.6vw,52px)] leading-[1.06]">Send us a message</h2>
            <EnquiryForm formType="contact" fields={fields} submitLabel="Send Message" ariaLabel="Contact form" successNoun="message" />
          </div>
        </div>
      </section>
    </>
  );
}
