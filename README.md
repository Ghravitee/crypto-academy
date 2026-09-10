# Crypto Academy

A one-month, live-taught Web3 course: crypto basics, spotting rug pulls and
phishing, bubble maps, Solidity, and building a trading bot. Classes run
live on Zoom, 2-3× a week, up to 2 hours each — every paid student gets
their own personal class link, sent by an admin from the dashboard.
Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase + Paystack.

## Stack

| Layer     | Tool                                  |
|-----------|----------------------------------------|
| Frontend  | Next.js (App Router), TypeScript, Tailwind CSS v4 |
| Auth + DB | Supabase (Postgres + Row Level Security) |
| Classes   | Live on Zoom — personal links assigned per student from /admin |
| Payments  | Paystack (webhook-driven unlock)       |
| Icons     | lucide-react                           |
| Hosting   | Vercel                                 |

## Project structure

```
app/
  (auth)/login, (auth)/signup      — auth pages
  page.tsx                         — landing page (fetches course + FAQs from Supabase, with fallback content)
  dashboard/                       — student dashboard: upcoming/past classes, personal Zoom link (protected)
  admin/                           — admin overview: stats, schedule classes (protected, role-gated)
  admin/sessions/[id]/             — per-class roster: paste + send each student's personal Zoom link
  courses/                         — public course catalog
  api/enroll/                      — starts a Paystack checkout
  api/webhooks/paystack/           — unlocks access after payment
  api/admin/sessions/              — admin: create a class session
  api/admin/session-links/         — admin: assign + send a personal Zoom link
components/
  landing/                         — schedule stub, curriculum list, FAQ accordion
  admin/                           — new-session form, link-assignment row
lib/
  supabase/                        — browser / server / middleware clients
  paystack/                        — signature verification + API calls
  admin.ts                         — shared admin-role check for server routes
types/
  database.ts                      — hand-written types (regenerate once live)
supabase/
  schema.sql                       — full DB schema + RLS policies
proxy.ts                           — session refresh + route protection (Next's middleware convention)
```

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Create a Supabase project** at supabase.com, then run `supabase/schema.sql`
   in the SQL Editor (Dashboard → SQL Editor → New query → paste → Run).

3. **Copy environment variables**
   ```
   cp .env.local.example .env.local
   ```
   Fill in the Supabase and Paystack keys (see comments in the file for
   where to find each one).

4. **Run locally**
   ```
   npm run dev
   ```

5. **Regenerate types** once your schema is live in Supabase (replaces the
   hand-written placeholder in `types/database.ts`):
   ```
   npx supabase gen types typescript --project-id <your-project-id> > types/database.ts
   ```

## Payment flow

1. Student clicks "Enroll" → `POST /api/enroll` initializes a Paystack
   transaction and returns a checkout URL.
2. Student pays on Paystack's hosted page.
3. Paystack calls `POST /api/webhooks/paystack`. The route:
   - verifies the `x-paystack-signature` header (HMAC SHA512) so only
     genuine Paystack requests are trusted,
   - re-verifies the transaction directly against Paystack's API (never
     trusts the webhook payload alone),
   - inserts an `enrollments` row using the Supabase **service role** key
     (bypasses RLS — this is the only place enrollments should be written).
4. Set the webhook URL in the Paystack dashboard to:
   `https://<your-domain>/api/webhooks/paystack`

## How the Zoom link flow works

1. Admin schedules a class from `/admin` (course, class number, title,
   date/time) — this writes a row to `class_sessions`.
2. Admin opens that class's roster at `/admin/sessions/[id]`, which lists
   everyone with an active enrollment in that course.
3. Admin pastes each student's **personal** Zoom registration link (Zoom's
   "Registration required" setting generates a unique join URL per
   registrant — use that, not the one shared meeting link) and hits Send.
4. The student sees it on `/dashboard` once sent, with a "Join" button. It
   never appears anywhere public, and RLS means a student can only ever
   query their own link — not anyone else's.

This is manual by design for now (paste-and-send), matching a cohort of a
few hundred people. If volume grows, the natural next step is scripting the
Zoom registration API to generate + assign links in bulk instead of pasting
one at a time.

## Still to wire up

- Welcome + "your link is ready" emails (Resend is a good fit — both the
  webhook route and the session-links route have `TODO`s marking where).
- FAQ and course content are admin-editable in the schema (`faqs`,
  `courses` tables) — building an actual admin form for them is the next
  step; for now, edit rows directly in Supabase's table editor.
- Payment integration is fully wired (see below) but untested against a
  real Paystack account — swap in real keys and test in Paystack's test
  mode before going live.
- Visual design is a first real pass, not final — logo is still a text
  placeholder pending the client's actual logo file.
