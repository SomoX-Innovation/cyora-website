import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500'], style: ['normal', 'italic'], variable: '--font-serif', display: 'swap' });
const sans = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'CYORA — Ceylon Cinnamon Exporter, Sri Lanka', template: '%s | CYORA' },
  description:
    'CYORA presents Ceylon cinnamon sticks and pure Ceylon cinnamon powder from Sri Lanka for international importers, wholesalers, distributors and food businesses.',
  applicationName: 'CYORA',
  openGraph: {
    type: 'website',
    siteName: 'CYORA',
    title: 'CYORA — Nature’s Finest. From Sri Lanka.',
    description: 'Ceylon cinnamon sticks and powder from Sri Lanka, presented for international markets. Wholesale and export enquiries welcome.',
    locale: 'en_GB',
    // TODO: add /public/og.jpg (1200×630) and reference it here once brand photography exists.
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#10100E', width: 'device-width', initialScale: 1 };

// Organization data — kept to facts that are true today. Add contact details, logo and sameAs links once confirmed.
const org = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CYORA',
  url: site.url,
  slogan: site.tagline,
  description: 'Ceylon cinnamon and Sri Lankan spice export brand.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={org} />
        <Nav />
        <main id="main" className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
