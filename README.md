# Jansen & Vorster

Website for Jansen & Vorster Optometrists (Melkbosstrand and Atlantis, Cape Town). Built with Next.js 16, React 19, Tailwind CSS v4, and Resend for the callback form.

## Local development

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build      # production build
pnpm lint       # ESLint
pnpm typecheck  # TypeScript
```

## Callback emails (Resend)

The “Request a Callback” form on **Why Choose Us** and **Contact Us** posts to `/api/callback`, which sends email through [Resend](https://resend.com).

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
2. Put it in `.env.local` as `RESEND_API_KEY`
3. For production, verify `jansenvorster.co.za` at [resend.com/domains](https://resend.com/domains) and set `RESEND_FROM_EMAIL` to a sender on that domain

`onboarding@resend.dev` only delivers to the email on your Resend account (testing).

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only Resend API key |
| `CALLBACK_TO_EMAIL` | Inbox that receives requests (default: `melkbos@jansenvorster.co.za`) |
| `RESEND_FROM_EMAIL` | From address, e.g. `Jansen & Vorster <noreply@jansenvorster.co.za>` |
