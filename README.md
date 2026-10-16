# CYORA — Ceylon Cinnamon Website

Next.js + TypeScript + Tailwind website for CYORA, a Sri Lankan Ceylon cinnamon export brand.

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Continue with Claude Code
```bash
cd cyora-website
claude
```
Claude Code reads `CLAUDE.md` automatically — it contains the architecture, brand system, the content rules
from the brief (no invented facts, certificates or testimonials), and a TODO list of next tasks.

Good first prompts:
- "Read CLAUDE.md, run the dev server and walk me through the site structure."
- "Here are our real contact details: … Update lib/site.ts."
- "I've added photos to public/images — wire them into the Photo components."
- "Set up deployment to Vercel and configure the Resend email env vars."

## Pages
Home · Our Story · Our Products · Quality & Sourcing · Export & Wholesale · Contact · Privacy · Terms

## Deploy
Any Node host works (Vercel, Netlify, Render, a VPS). Set the variables from `.env.example`.
