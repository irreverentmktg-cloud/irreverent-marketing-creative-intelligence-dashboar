# Irreverent Marketing Creative Intelligence Dashboard

AI-powered ad creative pipeline. Claude orchestrates the full lifecycle: brief → generate → publish → score → iterate.

## Pipeline Flow

```
/forge → /publisher → /looper → /forge (repeat)
```

## Key Directories

| Path | Purpose |
|------|---------|
| `briefs/active/` | Current campaign briefs (input to /forge) |
| `briefs/templates/` | Reusable brief structures |
| `ads/pending/` | FORGE outputs waiting for /publisher |
| `ads/live/` | Running ads with Meta ad_ids |
| `ads/archive/` | Retired creatives with scores |
| `performance/scores/` | LOOPER output: per-ad ROAS/CTR/CPC |
| `performance/winners/` | Extracted winner references for next cycle |
| `performance/reports/` | Weekly/monthly summaries |
| `brand/voice.md` | Brand voice guidelines |
| `brand/dos-donts.md` | Creative rules |
| `brand/personas.md` | Target audience personas |

## File Naming Conventions

- `ads/pending/` → `[campaign]-[hook-type]-[variant]-[YYYY-MM-DD].json`
- `ads/live/` → `[ad_id]-[campaign]-[score].json`
- `briefs/active/` → `[campaign]-brief-[YYYY-MM-DD].md`
- `performance/` → `[campaign]-scores-[YYYY-MM-DD].json`

## Performance Targets

| Metric | Target |
|--------|--------|
| ROAS | 3.5x+ |
| CTR | 2%+ |
| CPC | <$1.20 |
| Creative Refresh | Every 2 weeks |

## Available Skills

Run these slash commands in any Claude Code session pointed at this repo:

- `/forge` — Generate ad creative variants via fal.ai
- `/publisher` — Push approved creatives to Meta Ads Manager
- `/looper` — Score live ads and feed winners back into the pipeline
- `/creative-machine` — Generate 10 systematic variations of an existing ad
- `/creator-discovery` — Source and vet UGC creators
- `/canvas-design` — Create static visual ad designs
- `/github-repo` — Scaffold a new project repository

## Required Environment Variables

```
FAL_API_KEY=           # fal.ai image/video generation
META_ACCESS_TOKEN=     # Meta Marketing API
META_AD_ACCOUNT_ID=    # Meta ad account (format: act_XXXXXXXXX)
META_APP_ID=           # Meta app ID
META_APP_SECRET=       # Meta app secret
```

## On Session Start

1. Check `briefs/active/` for any open campaign briefs
2. Check `ads/pending/` for creatives awaiting publication
3. Check `performance/scores/` for recent scores needing review
4. Refer to `brand/voice.md`, `brand/dos-donts.md`, and `brand/personas.md` before generating any creative
