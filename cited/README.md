# Cited

Answer Engine Optimization for DTC brands. Tells you which AI models are
citing you, which prompts you're invisible in, and what to do about it.

## Layout

This is an npm workspaces monorepo:

```
cited/
  web/          React + Vite + Tailwind frontend
  server/       Hono + TypeScript API
  shared/       Types shared between web and server
```

## Run it locally

You need Node 18+ and an Anthropic API key.

```bash
cd cited
npm install                       # installs web, server, shared together
cp server/.env.example server/.env
# edit server/.env — set ANTHROPIC_API_KEY at minimum

# in one terminal:
npm run dev:server                # http://localhost:8787

# in another:
npm run dev:web                   # http://localhost:5173
```

The web dev server proxies `/api/*` to the API server, so you can hit
`http://localhost:5173/` and the whole stack works end-to-end.

## What works today

- **`POST /api/analyze`** — scrapes a URL, asks Claude to extract
  product/category/claims/buyer/price/differentiator
- **`POST /api/brands`** — confirms calibration, generates a 50-prompt list
  with Claude, runs the first score cycle
- **`GET /api/brands/:id`** — current score + prompts with per-platform
  citation status
- **`POST /api/brands/:id/refresh`** — re-runs the score cycle

The Claude provider runs against Claude Opus 4.7 with the web search tool. The
ChatGPT, Perplexity, and Gemini providers are stubs that report
`available: false` until you wire their API keys — drop the implementation
into `server/src/lib/providers/` and they'll activate.

## What's not built yet

- Persistent storage. The server runs in **memory mode** by default; data is
  lost on restart. Once you set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
  it'll switch to Postgres, but the SupabaseRepo methods need to be filled in
  — see `server/src/db/repo.ts`.
- Auth. Endpoints are open. Add Supabase auth or a session token before
  shipping.
- Nightly cron. The runner exists; wire `POST /api/brands/:id/refresh` to a
  Railway cron schedule.
- Competitor extraction. Provider results return an empty `competitorBrands`
  array — needs a Claude post-processing step.

## Deploy

Server target: Railway (or Fly, or Render). Set the env vars from
`server/.env.example` and deploy `server/`. Web can ship to Vercel or
Netlify; point its `/api/*` to the server's public URL.
