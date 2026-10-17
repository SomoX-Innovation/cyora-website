import { isPlaceholder, site } from '@/lib/site';

/**
 * /llms.txt — a plain-text summary of the site for AI assistants and answer engines (https://llmstxt.org).
 * Keep it to confirmed facts only; it follows the same content rules as the rest of the site.
 */
export const dynamic = 'force-static';

export function GET() {
  const u = site.url;
  const contact = [
    !isPlaceholder(site.email) && `- Email: ${site.email}`,
    site.whatsappDigits && `- WhatsApp: ${site.whatsapp}`,
    `- Wholesale enquiry form: ${u}/export-wholesale#enquiry`,
    `- Documentation requests: ${u}/quality-sourcing#request`,
  ].filter(Boolean);

  const body = `# CYORA

> CYORA is a Sri Lankan Ceylon cinnamon export brand. It offers Ceylon cinnamon sticks / rolls (quills) and pure Ceylon cinnamon powder — both Cinnamomum verum of Sri Lankan origin, specified as Grade C5 — to international importers, distributors, wholesalers, retailers and food manufacturers.

Key facts:
- Products: Ceylon cinnamon sticks / rolls (Grade C5); pure Ceylon cinnamon powder (Grade C5)
- Origin: Sri Lanka
- Packaging: bulk export cartons, retail packs and private-label packaging, agreed per buyer
- Samples: available on request, subject to availability and agreed terms
- Specifications and available documents are shared on request; certifications and lab results are not claimed on the website

## Contact
${contact.join('\n')}

## Pages
- [Products](${u}/products): Grade C5 Ceylon cinnamon sticks and powder, specifications, packaging and private label
- [Export & Wholesale](${u}/export-wholesale): bulk supply for importers, distributors, wholesalers, retailers and food manufacturers; enquiry form
- [Ceylon Cinnamon Guide](${u}/ceylon-cinnamon): Ceylon vs cassia, Sri Lankan cinnamon grades (Alba, Continental/C5, Mexican, Hamburg), uses, buying checklist and FAQ
- [Quality & Sourcing](${u}/quality-sourcing): how buyers can evaluate the product and which documents to request
- [Production Process](${u}/production-process): from harvest to packaging for sticks and powder
- [Our Story](${u}/our-story): Ceylon cinnamon heritage and the craft behind the quills
- [Contact](${u}/contact): general and product enquiries
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
