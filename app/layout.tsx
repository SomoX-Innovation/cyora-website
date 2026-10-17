import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { isPlaceholder, site } from '@/lib/site';
import { ogBase, twitterBase } from '@/lib/seo';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-sans', display: 'swap' });

const title = 'CYORA — Ceylon Cinnamon Exporter & Supplier, Sri Lanka';
const description =
  'CYORA is a Sri Lankan Ceylon cinnamon export brand: Grade C5 Ceylon cinnamon sticks and pure Ceylon cinnamon powder for importers, wholesalers, distributors, retailers and food manufacturers.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s | CYORA' },
  description,
  applicationName: 'CYORA',
  openGraph: { ...ogBase, title, description, url: '/' },
  twitter: { ...twitterBase, title, description },
  alternates: { canonical: '/' },
  // Search Console / Bing Webmaster Tools HTML-tag verification (optional; DNS verification works too).
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = { themeColor: '#10100E', width: 'device-width', initialScale: 1 };

// Organization + WebSite data — kept to facts that are true today. sameAs fills in as social links are added to lib/site.ts.
const orgId = `${site.url}/#organization`;
const sameAs = site.socials.map((s) => s.href).filter(Boolean);
const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: 'CYORA',
      url: site.url,
      logo: `${site.url}/icon.jpg`,
      slogan: site.tagline,
      description:
        'Sri Lankan export brand for Ceylon cinnamon (Cinnamomum verum): Ceylon cinnamon sticks / quills and pure Ceylon cinnamon powder for international importers, distributors, wholesalers, retailers and food manufacturers.',
      address: { '@type': 'PostalAddress', addressCountry: 'LK' },
      knowsAbout: ['Ceylon cinnamon', 'Cinnamomum verum', 'Ceylon cinnamon sticks', 'Ceylon cinnamon powder', 'Sri Lankan spices', 'Cinnamon export'],
      ...(!isPlaceholder(site.email) && { email: site.email }),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        ...(!isPlaceholder(site.email) && { email: site.email }),
        ...(site.whatsappDigits && { telephone: `+${site.whatsappDigits}` }),
        url: `${site.url}/contact`,
      },
      ...(sameAs.length > 0 && { sameAs }),
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, name: 'CYORA', url: site.url, inLanguage: 'en', publisher: { '@id': orgId } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={ld} />
        <Nav />
        <main id="main" className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
