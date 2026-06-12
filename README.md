# Maestro — Lima Home Services Marketplace

A bilingual (Spanish 🇵🇪 / English) home-services marketplace prototype for Lima, Peru —
plumbers, electricians, painters and carpenters, bookable in minutes. Built as a
VC demo: it runs end-to-end with **zero credentials** on in-repo seed data and
deploys cleanly to Vercel.

> Spanish is the default language; an **ES / EN** toggle in the header switches
> the entire UI. The choice persists via a cookie (no `localStorage`).

---

## 1. Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — mobile-first, orange (`#F97316`) primary, green (`#16A34A`) trust accents, Inter font
- **next-intl** — locale routing (`/es`, `/en`) + message catalogs
- **Supabase** — optional Postgres backing (graceful fallback to seed data)
- **Meta WhatsApp Cloud API** — booking + handyman notifications (stubbed without keys)
- **Culqi** — payments (stubbed)

## 2. Features

- 4 trades · 12 sub-categories · 36 services · 5 verified Lima maestros (seed data)
- Service catalogue with live "available pros" panel
- Handyman profiles: bio, specialties, coverage zones, star reviews
- Checkout with Lima districts, validation, platform-fee summary (prices in `S/`)
- Booking confirmation + simulated WhatsApp alerts
- In-app chat thread with simulated replies
- Full ES/EN toggle on every page

## 3. Getting Started

```bash
pnpm install
cp .env.example .env   # optional — app runs without any keys
pnpm dev               # http://localhost:3000  → redirects to /es
```

`pnpm build && pnpm start` for a production build.

## 4. Environment Variables

All optional for the demo. See `.env.example`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Back the app with Supabase instead of seed data |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes (future) |
| `WHATSAPP_PHONE_NUMBER_ID` / `WHATSAPP_ACCESS_TOKEN` | Send real WhatsApp messages |
| `WHATSAPP_VERIFY_TOKEN` | Webhook verification handshake |
| `NEXT_PUBLIC_CULQI_PUBLIC_KEY` | Culqi checkout (stubbed) |

When Supabase / WhatsApp keys are absent the app falls back to seed data and
logs the WhatsApp messages it *would* send.

## 5. Project Structure

```
src/
  app/
    [locale]/
      layout.tsx                 # <html>, Inter font, header/footer, intl provider
      page.tsx                   # Homepage (hero, trades, top pros, how-it-works)
      servicios/[trade]/page.tsx # Service catalogue
      maestro/[id]/page.tsx      # Handyman profile
      checkout/page.tsx          # Checkout
      confirmacion/[bookingId]/  # Confirmation
      chat/[bookingId]/page.tsx  # Chat thread
      not-found.tsx              # Localized 404
    api/
      bookings/route.ts          # Create booking + notify
      whatsapp/webhook/route.ts  # Meta verify (GET) + inbound (POST)
    not-found.tsx                # Root 404
  components/                    # Header, cards, forms, chat, language toggle
  lib/                           # data access, supabase, whatsapp, culqi, format, types
  data/seed.ts                   # Trades, services, handymen, reviews
  i18n/                          # next-intl routing + request config
messages/{es,en}.json            # UI copy
supabase/schema.sql              # Optional DB schema
```

## 6. Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel → **New Project** → import the repo. Framework auto-detects as Next.js.
3. (Optional) add the env vars from `.env.example` under **Settings → Environment Variables**.
4. Deploy. No keys are required for the demo to work.

## 7. Architecture

```
                ┌─────────────────────────────┐
   Browser ───► │  Next.js App Router (Vercel) │
   /es, /en     │                              │
                │  Pages (Server Components)   │
                │      │                       │
                │      ▼                        │
                │  lib/data.ts  ──► Supabase?  │──► (if configured)
                │      │  fallback             │
                │      ▼                        │
                │  data/seed.ts (4·12·36·5)    │
                │                              │
                │  /api/bookings ──► culqi.ts  │ (stub charge)
                │        │       └─► whatsapp.ts│──► Meta Cloud API
                │        ▼                      │     (or stub log)
                │  confirmation ─► chat thread │
                └─────────────────────────────┘
```

## 8. VC Demo Script (2 minutes)

1. **Land on the homepage** (`/es`). Point out trust badges and the four trades.
   Flip the header toggle to **EN** — the whole UI switches instantly.
2. **Tap "Gasfitería"** → the catalogue. Select *Reparación de fuga en caño*;
   the right panel shows available verified maestros with ratings.
3. **Open Carlos Mendoza's profile** — 15 years, 4.9★, coverage zones, reviews.
   Hit **Reservar ahora**.
4. **Checkout** — fill name, WhatsApp number, address, pick a Lima district and
   date. Note the transparent `S/` pricing with platform fee. Tap **Pagar con Culqi**.
5. **Confirmation** — booking code, "WhatsApp sent" note (check the server log to
   see the simulated message). Tap **Chatear con el maestro**.
6. **Chat** — send a message; the maestro replies. Close: *"All on seed data, no
   backend required — Supabase, WhatsApp and Culqi drop in with env vars."*

---

*Hecho en Lima, Perú · Demonstration prototype.*
