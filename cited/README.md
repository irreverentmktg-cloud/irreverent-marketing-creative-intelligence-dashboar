# Cited — AEO Platform UI

Marketing site + product UI shell for **Cited**, the Answer Engine Optimization platform.

This is the Lovable-replacement build: the eight screens from the brief, all wired together as a Vite + React + TypeScript + Tailwind app. No backend yet — that's Claude (Cowork)'s job per the brief.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3
- React Router 6
- lucide-react (icons)
- Inter + DM Mono via Google Fonts

## Run it

```bash
cd cited
npm install
npm run dev
```

Open http://localhost:5173.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves the production build
npm run typecheck
```

## Routes

| Route | Screen |
|---|---|
| `/` | Landing |
| `/analyzing` | Analyzing transition |
| `/calibration` | Brand Calibration (onboarding 1) |
| `/score-reveal` | First Score Reveal (onboarding 2) |
| `/dashboard` | Dashboard · Overview |
| `/dashboard/prompts` | Dashboard · Prompts feed |
| `/dashboard/competitors` | Dashboard · Competitors |
| `/dashboard/settings` | Dashboard · Settings |

The flow on the landing page (URL input → Analyzing → Calibration → Score Reveal → Dashboard) is wired end-to-end so you can demo it.

## Design tokens

Defined in `tailwind.config.js`:

- Monochrome palette: `ink`, `rich`, `mid`, `silver`, `line`, `offwhite`
- Score colors (only used on score rings, score numbers, status pills): `score.critical` / `score.warning` / `score.good`
- Chrome gradient: `bg-chrome` (buttons), `chrome-text` utility (gradient text)
- Card shadow utility: `shadow-card`
- Shimmer keyframe: `chrome-shimmer-bar` class in `index.css`

Fonts: `font-sans` (Inter) and `font-mono` (DM Mono).

## Components

`src/components/` contains the reusable building blocks:

- `Button` — primary / chrome / ghost variants
- `Logo` — Cited wordmark with chrome-gradient period
- `ScoreRing` — animated SVG ring, color-coded by tier
- `PlatformDots` — ChatGPT / Perplexity / Gemini / Claude cited indicators
- `SuggestionCard` — the vidIQ-style daily prompt card (supports `locked` state)
- `Nav`, `Footer` — landing chrome
- `Sidebar`, `DashboardLayout` — logged-in shell
- `UrlInput` — hero CTA

## What's intentionally faked

- All data is hard-coded sample data (Bloom Collagen as the demo brand).
- "Sign in" / "Start free" jump straight to the dashboard.
- The analyzing screen is a 4-second timed sequence, not a real scrape.
- No auth, no Supabase, no API. The brief calls those out as Claude (Cowork) backend work.
