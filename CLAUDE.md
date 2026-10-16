# CYORA website — guide for Claude Code

Premium storytelling + B2B enquiry site for **CYORA**, a Sri Lankan Ceylon cinnamon export brand
(Ceylon cinnamon sticks/rolls and pure Ceylon cinnamon powder). The audience is international importers,
distributors, wholesalers, retailers, food manufacturers and premium consumers.

## Stack
- Next.js 14.2 App Router, React 18, TypeScript (strict), Tailwind CSS 3.4, zod
- Fonts: `next/font/google` — Cormorant Garamond (display, `font-serif`) + Jost (body, `font-sans`)
- No CMS, no database. The enquiry API sends email through the Resend HTTP API.

## Commands
```bash
npm install
cp .env.example .env.local   # fill in as needed; dev works with it empty
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
npm run typecheck && npm run lint
```

## Layout
```
app/                    routes (one folder per page) + layout, sitemap.ts, robots.ts, not-found
app/api/enquiry/route.ts  POST endpoint for all three forms
components/             Nav, Footer, PageHero, Photo, Reveal, EnquiryForm, ProductGallery, Icons, JsonLd, LegalShell
lib/site.ts             ALL business details (email, WhatsApp, socials, legal name) — edit here only
lib/enquiry.ts          zod schemas + option lists shared by client forms and the API
design/                 the original canvas design files (*.dc.html) — visual reference only, not built
public/images/          real photography goes here (see public/images/README.md)
```

## Brand system (tailwind.config.ts)
| token | hex | use |
|---|---|---|
| `ink` | #10100E | deep matte black, default background |
| `gold` | #C7A56A | champagne gold accents, primary buttons |
| `ivory` | #F7F3EB | warm ivory sections + text on dark |
| `cinnamon` | #7A4227 | accents on ivory |
| `forest` | #263C30 | feature sections |

Reusable classes live in `app/globals.css` (`.wrap`, `.eyebrow`, `.lede`, `.sec`, `.btn-gold|ghost|ink|line`,
`.link-arrow`, `.tbc`, `.inp`). Sections on ivory add `on-ivory` so eyebrows/ledes/placeholders recolour.
Motion is restrained (rise on load, `Reveal` on scroll, slow `drift` on heroes, image zoom on hover) and
everything is disabled under `prefers-reduced-motion`.

## NON-NEGOTIABLE content rules
These come from the client brief. Do not break them, even if asked to "make it more convincing".
1. **Never invent facts**: no founding year, founders, family history, plantation ownership, farmer relationships,
   export destinations, customer names, volumes, prices, awards or partnerships.
2. **No unverified claims**: no certificates, lab results, "100% organic", "certified", or superiority claims.
   The Quality page has dashed "slot" boxes for verified documents only.
3. **Grade C5** may only be shown where CYORA's supplied specification confirms it.
4. **No fake testimonials or customer logos.**
5. **Unknown business details stay as visible `[bracketed]` placeholders** rendered with the `.tbc` class.
   Search the codebase for `[` inside `tbc` spans / `lib/site.ts` to find them all.
6. **AI imagery** must never be presented as documentary evidence of CYORA farms, workers or facilities.
   Use `<Photo illustrative … />` for AI-generated images so they carry an "Illustrative image" caption.
7. **Amara, the AI brand ambassador**, is fictional and must always be labelled as such. Never present her as a
   founder, employee, customer or exporter. Toggle the section with `SHOW_AMBASSADOR` in `app/page.tsx`.
8. **No invented office address or telephone number** on the Contact page.

## Images
`<Photo alt="what the shot shows" src="/images/…" />` renders an optimised `next/image`; without `src` it
renders a branded, clearly labelled placeholder. The `alt` doubles as the placeholder caption, so keep it
descriptive. Slot list and recommended sizes: `public/images/README.md`.

## Enquiry forms & security
- `EnquiryForm` (client) validates with the shared zod schema for instant feedback, then POSTs JSON to
  `/api/enquiry`. States: idle → sending (spinner, disabled) → success panel / error alert; field errors are
  announced and the first invalid field is focused.
- The API re-validates (authoritative), rejects non-JSON and >20 KB bodies, and applies spam protection:
  honeypot field `website`, a minimum fill time (2.5 s), per-IP rate limit (5 / 10 min, in memory), and
  optional Cloudflare Turnstile when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` are set.
- Email: `RESEND_API_KEY`, `ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` (server-only, never `NEXT_PUBLIC_`).
  In development without them, enquiries are logged to the console. In production without them, the API
  returns a 502 and the form shows a friendly error.
- Output is HTML-escaped; reply-to is set to the buyer's email.

## Known TODOs (good next tasks)
- [ ] Replace placeholders in `lib/site.ts` and product spec rows once CYORA confirms them.
- [ ] Add real photography to `public/images/` and pass `src` to each `<Photo>`.
- [ ] Add `/public/og.jpg` (1200×630), favicon/app icons, and wire `openGraph.images` in `app/layout.tsx`.
- [ ] Swap the in-memory rate limiter for Upstash Redis (or similar) if deploying to serverless/multi-instance.
- [ ] Turnstile: re-render the widget after "Send another" (currently relies on implicit rendering on load).
- [ ] Add Organization `email`/`contactPoint`/`logo`/`sameAs` to JSON-LD only once real details exist.
- [ ] Legal pages are templates — complete and have them reviewed by a lawyer.
- [ ] Optional: analytics (would require a consent banner — update the cookie notice first).
- [ ] Optional: Amara video player once real films exist (keep the fictional-AI disclosure).

## SEO notes
Each page exports `metadata` with an original title/description and canonical. Targeted phrases (use naturally,
no stuffing): Ceylon cinnamon exporter Sri Lanka · Sri Lankan cinnamon sticks wholesale · Ceylon cinnamon powder
supplier · Ceylon cinnamon C5 sticks (only where applicable) · bulk Ceylon cinnamon · private-label cinnamon
packaging · Sri Lankan spice export supplier. `sitemap.ts` and `robots.ts` read `NEXT_PUBLIC_SITE_URL`.
