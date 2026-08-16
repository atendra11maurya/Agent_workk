# CodeAux agency website

Private-launch website for CodeAux, built with Next.js, React Server Components,
TypeScript and Tailwind CSS for Vercel.

## Local development

Requires Node.js 22.13 or later.

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run lint
npm run typecheck
npm test
```

## Configuration

Copy `.env.example` to an ignored `.env.local` and add only the values that are
available. Booking falls back to the contact section, WhatsApp and social links
remain hidden when absent, and analytics is a no-op without a valid GA4 ID.

Lead capture requires `SUPABASE_URL` and a server-only
`SUPABASE_SECRET_KEY`. Apply
`supabase/migrations/20260816010000_create_leads.sql` before enabling the forms.
Resend notification values are optional; captured leads remain stored if email
delivery fails.

## Vercel deployment

Create or link a Vercel project from the repository root, then add the values
from `.env.example` in Vercel's Environment Variables settings. Keep secrets
such as `SUPABASE_SECRET_KEY` and Resend credentials server-only; only
`NEXT_PUBLIC_*` values are exposed to the browser.

```bash
npx vercel
npx vercel --prod
```

## Proof content

The five projects, three video reviews and before/after comparison are explicit
demo slots. Replace them in `src/data/site.ts` only with approved, verified
client content. The discriminated content types prevent placeholder records from
silently becoming published proof.

## Hosting

The site is configured for Vercel. The lead database is Supabase, and its access
controls are configured independently in Supabase.
