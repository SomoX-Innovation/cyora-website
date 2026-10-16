import Link from 'next/link';
import { isPlaceholder, site } from '@/lib/site';
import { SocialIcon } from './Icons';

const explore = [
  { href: '/', label: 'Home' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/production-process', label: 'Production Process' },
  { href: '/quality-sourcing', label: 'Quality & Sourcing' },
  { href: '/export-wholesale', label: 'Export & Wholesale' },
  { href: '/contact', label: 'Contact' },
];

const productLinks = [
  { href: '/products#sticks', label: 'Ceylon Cinnamon Sticks' },
  { href: '/products#powder', label: 'Ceylon Cinnamon Powder' },
  { href: '/export-wholesale#enquiry', label: 'Request a Quote' },
];

const h4 = 'mb-5 text-[11px] font-normal uppercase tracking-[0.3em] text-gold';
const li = 'inline-flex min-h-[32px] items-center text-sm text-ivory/70 hover:text-gold';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-[#0B0B0A] pb-10 pt-28 text-ivory/70">
      <div className="wrap">
        <div className="grid gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(200px,100%),1fr))]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-serif text-[34px] tracking-[0.42em] text-ivory hover:text-gold">CYORA</Link>
            <p className="font-serif text-[22px] italic text-ivory">{site.tagline}</p>
            <p className="text-sm leading-relaxed">Rooted in Sri Lankan heritage.<br />Crafted for the world.</p>
          </div>
          <div>
            <h2 className={h4}>Explore</h2>
            <ul className="flex flex-col gap-1.5">{explore.map((l) => <li key={l.href}><Link className={li} href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className={h4}>Products</h2>
            <ul className="flex flex-col gap-1.5">{productLinks.map((l) => <li key={l.href}><Link className={li} href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className={h4}>Business Enquiries</h2>
            <ul className="flex flex-col gap-1.5">
              <li>
                {isPlaceholder(site.email) ? (
                  <Link className={li} href="/contact"><span className="tbc">{site.email}</span></Link>
                ) : (
                  <a className={li} href={`mailto:${site.email}`}>{site.email}</a>
                )}
              </li>
              <li>
                {site.whatsappDigits ? (
                  <a className={li} href={`https://wa.me/${site.whatsappDigits}`} rel="noopener" target="_blank">WhatsApp {site.whatsapp}</a>
                ) : (
                  <Link className={li} href="/contact"><span className="tbc">WhatsApp {site.whatsapp}</span></Link>
                )}
              </li>
            </ul>
            <h2 className={`${h4} mt-8`}>Follow</h2>
            <ul className="flex gap-4">
              {site.socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a className={li} href={s.href} target="_blank" rel="noopener" aria-label={s.label}><SocialIcon name={s.label} /></a>
                  ) : (
                    <Link className={li} href="/contact" aria-label={`${s.label} — to be confirmed`}><SocialIcon name={s.label} /></Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-24 flex flex-wrap justify-between gap-5 border-t border-ivory/10 pt-8 text-xs tracking-[0.08em] text-ivory/60">
          <span>CYORA · Ceylon cinnamon of Sri Lankan origin · © {new Date().getFullYear()} <span className="tbc">{site.legalName}</span></span>
          <span className="flex gap-7">
            <Link href="/privacy" className="hover:text-gold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold">Terms and Conditions</Link>
            <Link href="/privacy#cookies" className="hover:text-gold">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
