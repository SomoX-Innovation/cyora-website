import { NextResponse } from 'next/server';
import {
  buyerTypes,
  contactTypes,
  documentTypes,
  enquirySchema,
  fieldErrors,
  labelFor,
  packagingOptions,
  products,
  type Enquiry,
} from '@/lib/enquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* ---------- Rate limiting ----------
 * In-memory, per server instance. Good enough for a single Node server;
 * on serverless/multi-instance hosting swap for a shared store (e.g. Upstash Redis).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const MIN_FILL_MS = 2500; // humans don't complete a business form in under ~2.5s

async function verifyTurnstile(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured
  if (typeof token !== 'string' || !token) return false;
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const data = (await res.json().catch(() => ({}))) as { success?: boolean };
  return data.success === true;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function describe(e: Enquiry): { subject: string; rows: [string, string][] } {
  switch (e.formType) {
    case 'wholesale':
      return {
        subject: `Business enquiry — ${e.company} (${e.country})`,
        rows: [
          ['Name', e.name], ['Company', e.company], ['Email', e.email], ['Country', e.country],
          ['Buyer type', labelFor(buyerTypes, e.buyerType)], ['Product', labelFor(products, e.product)],
          ['Estimated quantity', e.quantity], ['Packaging', e.packaging ? labelFor(packagingOptions, e.packaging) : '—'],
          ['Additional requirements', e.requirements || '—'],
        ],
      };
    case 'documents':
      return {
        subject: `Document request — ${labelFor(documentTypes, e.document)} — ${e.company}`,
        rows: [
          ['Name', e.name], ['Company', e.company], ['Email', e.email], ['Product', labelFor(products, e.product)],
          ['Document', labelFor(documentTypes, e.document)], ['Destination', e.country || '—'], ['Message', e.message],
        ],
      };
    case 'contact':
      return {
        subject: `${labelFor(contactTypes, e.enquiryType)} enquiry — ${e.name}`,
        rows: [
          ['Type', labelFor(contactTypes, e.enquiryType)], ['Name', e.name], ['Email', e.email],
          ['Company', e.company || '—'], ['Country', e.country || '—'], ['Message', e.message],
        ],
      };
  }
}

async function deliver(e: Enquiry) {
  const { subject, rows } = describe(e);
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!key || !to || !from) {
    if (process.env.NODE_ENV === 'production') throw new Error('Email delivery is not configured');
    console.info('[enquiry:dev] email not configured — logging instead\n', subject, Object.fromEntries(rows));
    return;
  }

  const html = `<h2 style="font-family:Georgia,serif">${esc(subject)}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td style="color:#7A4227;vertical-align:top"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: e.email, subject, html, text }),
  });
  if (!res.ok) throw new Error(`Email provider responded ${res.status}`);
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

  if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
    return NextResponse.json({ ok: false, message: 'Unsupported request.' }, { status: 415 });
  }
  const raw = await req.text();
  if (raw.length > 20_000) return NextResponse.json({ ok: false, message: 'Request too large.' }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Spam traps: honeypot field and implausibly fast submissions get a silent "success".
  const startedAt = Number(body.startedAt);
  if ((typeof body.website === 'string' && body.website.length > 0) || (startedAt && Date.now() - startedAt < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, message: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, message: 'Spam check failed. Please refresh and try again.' }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: fieldErrors(parsed.error) }, { status: 422 });
  }

  try {
    await deliver(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[enquiry] delivery failed', err);
    return NextResponse.json({ ok: false, message: 'We could not send your enquiry right now. Please try again shortly.' }, { status: 502 });
  }
}
