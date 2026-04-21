# 🧠 Irreverent Marketing Creative Intelligence Dashboard

> AI-powered creative intelligence platform for Irreverent Marketing — built to generate, deploy, score, and iterate on ad creatives at scale.

---

## 📌 Overview

The **Creative Intelligence Dashboard** is the central hub of the Irreverent Marketing ad pipeline. It connects the full creative lifecycle:

```
SCRAPER → FORGE → PUBLISHER → LOOPER → FORGE (repeat)
```

Each tool in the pipeline feeds data into this dashboard, giving the team real-time visibility into what's working, what's dying, and what to build next.

---

## 🏗️ Pipeline Architecture

| Stage | Tool | Role |
|-------|------|------|
| 1 | **SCRAPER** | Scrapes competitor ads, landing pages, winning hooks |
| 2 | **FORGE** | Generates creative variants (images/video) via fal.ai |
| 3 | **PUBLISHER** | Pushes approved creatives live to Meta Ads Manager |
| 4 | **LOOPER** | Scores live ads by ROAS/CTR/CPC, flags winners & losers |
| ↩ | **Dashboard** | Centralizes all data, briefs, and performance for Claude |

---

## 🤖 Claude Integration

This repo is designed to be used **natively with Claude (Cowork mode)**. Claude reads and writes to this repo to:

- Load campaign briefs and creative guidelines
- Reference past winning creative structures
- Access live performance data exported by LOOPER
- Generate new briefs for FORGE based on winners
- Log deployment records from PUBLISHER

### Folder Structure for Claude

```
/ads/
  pending/       ← FORGE outputs waiting for PUBLISHER
  live/          ← Currently running ads with Meta ad_ids
  archive/       ← Retired creatives (scored, annotated)

/briefs/
  active/        ← Current campaign briefs for FORGE
  templates/     ← Reusable brief structures

/performance/
  scores/        ← LOOPER output: per-ad ROAS/CTR/CPC scores
  winners/       ← Extracted winner references for next cycle
  reports/       ← Weekly/monthly performance summaries

/brand/
  voice.md       ← Brand voice guidelines
  dos-donts.md   ← Creative rules
  personas.md    ← Target audience personas

/docs/
  pipeline.md    ← Full pipeline runbook
  skills.md      ← Index of all Claude skills in this project
```

---

## 🎯 Campaign Goals

| Metric | Target |
|--------|--------|
| ROAS | 3.5x+ |
| CTR | 2%+ |
| CPC | <$1.20 |
| Creative Refresh Cadence | Every 2 weeks |

---

## 🛠️ Skills Reference

Claude skills powering this pipeline:

| Skill | Trigger | Function |
|-------|---------|----------|
| `forge` | "run FORGE" | Generate ad creative variants via fal.ai |
| `publisher` | "run PUBLISHER" | Push creatives live to Meta Ads Manager |
| `looper` | "run LOOPER" | Score live ads & close the feedback loop |
| `marketing-team` | "run MARKETING TEAM" | Assemble 5-persona expert panel to review creatives, briefs, or performance |
| `creative-machine` | "iterate on this ad" | Systematic creative variation (10 variants) |
| `creator-discovery` | "find influencers" | Source & vet UGC creators |
| `canvas-design` | "make a design/poster" | Static visual design output |
| `github-repo` | "create a repo" | Auto-scaffold a new project repo |

---

## 🔑 Integrations

| Service | Purpose | Connected Via |
|---------|---------|---------------|
| **Meta Marketing API** | Ad deployment & performance data | PUBLISHER / LOOPER skills |
| **fal.ai** | AI image/video generation | FORGE skill |
| **Notion** | Campaign briefs & brand docs | Notion MCP |
| **Google Sheets** | Creator tracking | Sheets MCP |
| **Gmail** | Outreach & reporting | Gmail MCP |
| **Claude (Cowork)** | AI orchestration across all tools | Native |

---

## 📋 Getting Started

1. Clone this repo into your Cowork workspace folder
2. Open Claude (Cowork mode) and select this folder
3. Claude will auto-read `/docs/pipeline.md` on first load
4. Run `/forge` to generate your first creative batch
5. Run `/publisher` to push approved ads live
6. Run `/looper` after 48–72 hours to score performance and feed winners back

---

## 📁 File Naming Conventions

```
ads/pending/     → [campaign]-[hook-type]-[variant]-[YYYY-MM-DD].mp4/.jpg
ads/live/        → [ad_id]-[campaign]-[score].json
briefs/active/   → [campaign]-brief-[YYYY-MM-DD].md
performance/     → [campaign]-scores-[YYYY-MM-DD].json
```

---

## 🔄 Update Log

| Date | Action | Author |
|------|--------|--------|
| 2026-04-14 | Repo initialized with pipeline structure | Claude + Jake |
| 2026-04-21 | Added `marketing-team` skill + brand reference files | Claude |

---

*Built with Claude (Cowork mode) · Irreverent Marketing · Private Repository*
