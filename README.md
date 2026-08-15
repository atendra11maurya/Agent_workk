# CodeAux agency website

Private-launch website for CodeAux, built with Vinext, React Server Components,
TypeScript and Tailwind CSS for the OpenAI Sites / Cloudflare runtime.

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

## Proof content

The five projects, three video reviews and before/after comparison are explicit
demo slots. Replace them in `src/data/site.ts` only with approved, verified
client content. The discriminated content types prevent placeholder records from
silently becoming published proof.

## Hosting

`.openai/hosting.json` intentionally keeps D1 and R2 unused. The lead database is
Supabase and access control is configured through the private Sites deployment.
