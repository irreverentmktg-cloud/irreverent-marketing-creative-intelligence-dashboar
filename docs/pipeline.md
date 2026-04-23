# Pipeline Runbook

Full operational guide for the Irreverent Marketing creative intelligence pipeline.

## Overview

```
/forge → /publisher → [48-72 hrs] → /looper → /forge (repeat)
```

Every cycle produces new creatives, tests them live, scores the results, and feeds winners back into the next generation. The pipeline is designed to compound — each cycle should outperform the last.

---

## Stage 1: FORGE — Generate Creatives

**Trigger:** `/forge`  
**Input:** `briefs/active/`, `brand/`, `performance/winners/`  
**Output:** `ads/pending/`

Run FORGE at the start of every campaign cycle or when your current creative set is fatiguing (CTR dropping week-over-week, frequency rising).

**Checklist before running:**
- [ ] Active campaign brief exists in `briefs/active/`
- [ ] Brand guidelines are up to date (`brand/voice.md`, `brand/dos-donts.md`)
- [ ] `FAL_API_KEY` is set (for asset generation)
- [ ] Previous winner references exist in `performance/winners/` (after first cycle)

**What happens:**
1. Claude reads the brief and winner references
2. Generates 5 creative variants (default) across different hook types
3. Calls fal.ai to generate visual assets
4. Saves structured creative files to `ads/pending/`

---

## Stage 2: PUBLISHER — Push Live

**Trigger:** `/publisher`  
**Input:** `ads/pending/`  
**Output:** `ads/live/`

Run PUBLISHER once you've reviewed and approved the pending creatives. Don't publish everything blindly — pick the best 3–5 to test per cycle.

**Checklist before running:**
- [ ] `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` are set
- [ ] Assets in `ads/pending/` have `asset_url` populated
- [ ] Campaign targeting and budget confirmed
- [ ] Copy reviewed against Meta policies

**What happens:**
1. Claude lists all pending creatives for review
2. You select which to publish
3. Claude uploads assets and creates ads via Meta Marketing API
4. Published ads move to `ads/live/` with their Meta `ad_id`

---

## Stage 3: LOOPER — Score & Learn

**Trigger:** `/looper`  
**Input:** `ads/live/` (ad_ids), Meta Insights API  
**Output:** `performance/scores/`, `performance/winners/`, `ads/archive/`

Run LOOPER after 48–72 hours of live data. Running too early produces noisy data. Running too late wastes budget on losers.

**Checklist before running:**
- [ ] Ads have been live for 48–72 hours minimum
- [ ] Each ad has at least $10–20 spend
- [ ] `META_ACCESS_TOKEN` is still valid

**What happens:**
1. Claude pulls Insights data for each live ad
2. Scores each ad on ROAS (50%), CTR (30%), CPC (20%)
3. Labels each: WINNER / PERFORMING / WATCH / LOSER
4. Saves scores to `performance/scores/`
5. Extracts winners to `performance/winners/`
6. Moves losers to `ads/archive/` (optionally pauses them on Meta)

---

## Cycle Cadence

| Day | Action |
|-----|--------|
| Day 1 | Run `/forge`, review creatives, run `/publisher` |
| Day 3–4 | Run `/looper` — score first results |
| Day 7 | Run `/looper` again for weekly data |
| Day 14 | Run `/forge` again using new winners — start next cycle |

---

## Supporting Skills

These can be run at any point in the cycle:

| Skill | When to Use |
|-------|------------|
| `/creative-machine` | When a WINNER needs to be systematically varied |
| `/creator-discovery` | When you need UGC creators for the next batch |
| `/canvas-design` | When you need a static ad designed from scratch |
| `/github-repo` | When spinning up a new tool in the pipeline |

---

## Troubleshooting

**FORGE produces weak copy:**
- Update `brand/voice.md` with more specific examples
- Add a clearer brief in `briefs/active/` with the specific hook angle you want
- Provide winner references in `performance/winners/` to anchor the direction

**PUBLISHER fails:**
- Check Meta access token hasn't expired (tokens expire every 60 days)
- Verify `META_AD_ACCOUNT_ID` format is `act_XXXXXXXXX`
- Check asset files exist and are accessible at the `asset_url`

**LOOPER shows "insufficient data":**
- Wait longer — minimum $10 spend and 48 hours before scoring
- Check that the `ad_id` in `ads/live/` matches the actual Meta ad ID

**CTR dropping across all ads:**
- Creative fatigue — frequency is likely above 3.0
- Run `/forge` or `/creative-machine` immediately
- Consider new audiences via `META_AD_ACCOUNT_ID` retargeting refresh
