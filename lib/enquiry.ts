import { z } from 'zod';

/**
 * Enquiry schemas — shared by the client forms (instant feedback)
 * and the API route (authoritative validation).
 */

const name = z.string({ required_error: 'Please enter your full name.' }).trim().min(1, 'Please enter your full name.').max(120, 'Please shorten this field.');
const email = z
  .string({ required_error: 'Please enter your email address.' })
  .trim()
  .min(1, 'Please enter your email address.')
  .max(200)
  .email('Please enter a valid email address.');
const optionalText = (max = 160) => z.string().trim().max(max, 'Please shorten this field.').optional().default('');
const requiredText = (msg: string, max = 160) => z.string({ required_error: msg }).trim().min(1, msg).max(max, 'Please shorten this field.');
const consent = z.literal(true, { errorMap: () => ({ message: 'Please confirm consent so we can reply.' }) });
const message = (min = 10) =>
  z.string({ required_error: 'Please write a short message.' }).trim().min(min, `Please write a few words (at least ${min} characters).`).max(4000, 'Please keep your message under 4,000 characters.');

export const products = [
  { value: 'sticks', label: 'Ceylon Cinnamon Sticks / Rolls' },
  { value: 'powder', label: 'Ceylon Cinnamon Powder' },
  { value: 'both', label: 'Both products' },
] as const;

export const buyerTypes = [
  { value: 'importer', label: 'Importer' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'wholesaler', label: 'Wholesaler' },
  { value: 'retailer', label: 'Retailer' },
  { value: 'food-manufacturer', label: 'Food manufacturer' },
  { value: 'other', label: 'Other' },
] as const;

export const packagingOptions = [
  { value: 'bulk', label: 'Bulk export cartons / bags' },
  { value: 'retail', label: 'Retail-ready packs' },
  { value: 'private-label', label: 'Private-label packaging' },
  { value: 'undecided', label: 'Not decided yet' },
] as const;

export const documentTypes = [
  { value: 'specification', label: 'Product specification sheet' },
  { value: 'coa', label: 'Certificate of analysis / test report' },
  { value: 'origin', label: 'Certificate of origin' },
  { value: 'phytosanitary', label: 'Phytosanitary information' },
  { value: 'packaging', label: 'Packaging & storage specification' },
  { value: 'export-docs', label: 'Export document list for my country' },
  { value: 'technical', label: 'Technical question' },
] as const;

export const contactTypes = [
  { value: 'general', label: 'General' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'product', label: 'Product' },
] as const;

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as unknown as [T[number]['value'], ...T[number]['value'][]];

const pick = <T extends readonly { value: string }[]>(list: T, msg: string) =>
  z.enum(values(list), { errorMap: () => ({ message: msg }) });

export const wholesaleSchema = z.object({
  formType: z.literal('wholesale'),
  name,
  company: requiredText('Please enter your company name.'),
  email,
  country: requiredText('Please enter your country.', 80),
  buyerType: pick(buyerTypes, 'Please choose your buyer type.'),
  product: pick(products, 'Please choose a product of interest.'),
  quantity: requiredText('Please give an estimated quantity — a range is fine.', 120),
  packaging: z.union([pick(packagingOptions, 'Please choose a packaging option.'), z.literal('')]).optional().default(''),
  requirements: optionalText(4000),
  consent,
});

export const documentsSchema = z.object({
  formType: z.literal('documents'),
  name,
  company: requiredText('Please enter your company name.'),
  email,
  product: pick(products, 'Please choose a product.'),
  document: pick(documentTypes, 'Please choose the document you need.'),
  country: optionalText(80),
  message: message(10),
  consent,
});

export const contactSchema = z.object({
  formType: z.literal('contact'),
  enquiryType: pick(contactTypes, 'Please choose an enquiry type.'),
  name,
  email,
  company: optionalText(),
  country: optionalText(80),
  message: message(10),
  consent,
});

export const enquirySchema = z.discriminatedUnion('formType', [wholesaleSchema, documentsSchema, contactSchema]);

export type Enquiry = z.infer<typeof enquirySchema>;
export type FormType = Enquiry['formType'];

export const schemaFor = { wholesale: wholesaleSchema, documents: documentsSchema, contact: contactSchema } as const;

/** Flatten zod issues to { field: firstMessage }. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export const labelFor = (list: readonly { value: string; label: string }[], v: string) =>
  list.find((o) => o.value === v)?.label ?? v;
