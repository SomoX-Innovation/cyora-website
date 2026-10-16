import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms governing the use of the CYORA website.',
  alternates: { canonical: '/terms' },
  robots: { index: false },
};

const T = ({ children }: { children: React.ReactNode }) => <span className="tbc">{children}</span>;

export default function Terms() {
  return (
    <LegalShell title="Terms and Conditions">
      <h2>Website Terms</h2>
      <h3>Website content</h3>
      <p>Information on this website is provided for general guidance. Product specifications, availability and prices are confirmed only in a written quotation or contract.</p>
      <h3>Imagery &amp; storytelling</h3>
      <p>Some images and films on this site are illustrative and may be AI-generated, including our fictional AI brand ambassador. They are not documentary records of CYORA farms, people, facilities or operations.</p>
      <h3>Orders &amp; supply</h3>
      <p><T>[Terms of sale, Incoterms, payment, governing law and jurisdiction — to be supplied by CYORA.]</T></p>
      <h3>Intellectual property</h3>
      <p>The CYORA name, wordmark and site content belong to <T>{site.legalName}</T> unless stated otherwise.</p>
    </LegalShell>
  );
}
