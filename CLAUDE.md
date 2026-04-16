# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is a **data and briefing repository**, not a software project. There is no build system, test suite, or server. Claude operates here in Cowork mode — reading briefs and performance data, writing new briefs, logging deployments, and orchestrating the ad pipeline.

## Pipeline

```
SCRAPER → FORGE → PUBLISHER → LOOPER → FORGE (repeat)
```

| Stage | Role |
|-------|------|
| SCRAPER | Scrapes competitor ads, landing pages, winning hooks |
| FORGE | Generates creative variants via fal.ai |
| PUBLISHER | Pushes approved creatives to Meta Ads Manager |
| LOOPER | Scores live ads by ROAS/CTR/CPC; flags winners & losers |
| Dashboard (this repo) | Central hub: briefs, performance data, brand guidelines |

## Folder conventions

```
/ads/pending/        ← FORGE outputs awaiting PUBLISHER  [campaign]-[hook]-[variant]-[YYYY-MM-DD].mp4/.jpg
/ads/live/           ← Running ads with Meta ad_ids       [ad_id]-[campaign]-[score].json
/ads/archive/        ← Retired creatives (scored, annotated)
/briefs/active/      ← Current campaign briefs for FORGE  [campaign]-brief-[YYYY-MM-DD].md
/briefs/templates/   ← Reusable brief structures
/performance/scores/ ← LOOPER output: per-ad ROAS/CTR/CPC
/performance/winners/← Extracted winner references for next cycle
/performance/reports/← Weekly/monthly summaries
/brand/              ← voice.md, dos-donts.md, personas.md
/docs/               ← pipeline.md runbook, skills.md index
```

## Campaign targets

| Metric | Target |
|--------|--------|
| ROAS | 3.5x+ |
| CTR | 2%+ |
| CPC | <$1.20 |
| Creative refresh | Every 2 weeks |

## Installed skills

### Arcads external API (`arcads-external-api`)
Calls `https://external-api.arcads.ai` to generate video/image assets. Requires `ARCADS_API_KEY` in `.env`.

**Session start:** Read `plugins/arcads-claude-code/MASTER_CONTEXT.template.md` (or `MASTER_CONTEXT.md` if it exists at repo root). If `.env` doesn't exist, copy `.env.example` → `.env` and prompt for the key.

Key API behaviors to remember:
- Auth: HTTP Basic — `ARCADS_API_KEY` as username, empty password
- Nano Banana image endpoint uses uppercase: `POST /V2/images/generate`
- Veo 3.1: `startFrame` and `referenceImages` are mutually exclusive; always append `"No subtitles, no captions, no text overlays."` to every prompt
- Sora 2: `refImageAsBase64` is style reference only — does not preserve face/pose
- Every session that generates assets should create/reuse a folder named `"Arcads API - YYYY-MM-DD"` via `POST /v1/folders`
- Polling: `GET /v1/assets/{id}` → `pending` → `generated|failed`
- UGC prompts must include camera imperfection block and skin realism block (see `MASTER_CONTEXT.template.md`)
- Influencer recreation is always two-step: generate still → user approval → animate. Never skip approval.

Full prompt libraries: `plugins/arcads-claude-code/skills/arcads-external-api/prompting/prompt-library/`
Pre-built AI influencer references: `plugins/arcads-claude-code/references/influencers/`

### Seedance 2.0 × Higgsfield (15 skills)
Prompt-engineering skills for Higgsfield — no API, no key needed. Skills: `01-cinematic`, `02-3d-cgi`, `03-cartoon`, `04-comic-to-video`, `05-fight-scenes`, `06-motion-design-ad`, `07-ecommerce-ad`, `08-anime-action`, `09-product-360`, `10-music-video`, `11-social-hook`, `12-brand-story`, `13-fashion-lookbook`, `14-food-beverage`, `15-real-estate`.

### Playwright (`playwright-skill`)
Browser automation. Chromium is pre-installed at `/opt/pw-browsers` (`PLAYWRIGHT_BROWSERS_PATH` is set). Always use `headless: false` by default. Write test scripts to `/tmp/playwright-test-*.js`, never to the skill directory. Run via:
```bash
cd plugins/playwright-skill/skills/playwright-skill && node run.js '<inline code or script path>'
```

## Integrations

| Service | Purpose |
|---------|---------|
| Meta Marketing API | Ad deployment & performance (via PUBLISHER/LOOPER skills) |
| fal.ai | AI image/video generation (via FORGE skill) |
| Notion MCP | Campaign briefs & brand docs |
| Google Sheets MCP | Creator tracking |
| Gmail MCP | Outreach & reporting |
| Arcads API | AI video/image generation (key pending) |

## Environment setup

```bash
cp .env.example .env
# Paste ARCADS_API_KEY into .env
```
