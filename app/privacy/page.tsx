import type { Metadata } from 'next';
import LegalShell from '@/components/LegalShell';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy & Cookies',
  description: 'How CYORA handles personal data submitted through this website, and our use of cookies.',
  alternates: { canonical: '/privacy' },
  robots: { index: false },
};

const T = ({ children }: { children: React.ReactNode }) => <span className="tbc">{children}</span>;

export default function Privacy() {
  return (
    <LegalShell title="Privacy Policy & Cookies">
      <h2>Privacy Policy</h2>
      <h3>Who we are</h3>
      <p><T>{site.legalName}</T>, trading as CYORA, <T>[registered address / registration number]</T>. Contact: <T>[privacy email]</T>.</p>
      <h3>What we collect</h3>
      <p>When you use our enquiry or contact forms we collect the details you provide: your name, company, business email, country, buyer type, product interest, estimated quantities, packaging preferences and your message. Our server also processes your IP address briefly to protect the forms from abuse.</p>
      <h3>Why we use it</h3>
      <ul>
        <li>To respond to your enquiry and prepare quotations or product information.</li>
        <li>To manage any resulting business relationship.</li>
        <li>To protect our forms against spam and abuse.</li>
      </ul>
      <h3>Legal basis, sharing &amp; retention</h3>
      <p><T>[Legal basis for processing; service providers used (e.g. email delivery and hosting); international transfers; retention period.]</T> We do not sell your personal data.</p>
      <h3>Your rights</h3>
      <p>You may request access to, correction of or deletion of your personal data by contacting <T>[privacy email]</T>. <T>[Add rights applicable under relevant laws.]</T></p>

      <h2 id="cookies" className="scroll-mt-28">Cookie Notice</h2>
      <p>This site is designed to work with strictly necessary cookies only. We do not use advertising or analytics cookies. If optional spam protection (Cloudflare Turnstile) is enabled on our forms, it may set a functional cookie to verify that a submission comes from a person.</p>
      <p><T>[If analytics are added later, list each tool, its purpose and retention here, and request consent before setting non-essential cookies.]</T></p>
    </LegalShell>
  );
}
