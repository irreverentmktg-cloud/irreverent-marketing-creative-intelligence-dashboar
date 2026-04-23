# Skills Index

All Claude slash commands available in this project.

## Pipeline Skills

### `/forge`
**File:** `.claude/commands/forge.md`  
**Trigger phrase:** "run FORGE" or type `/forge`  
**What it does:** Reads the active campaign brief and winner references, generates 5 ad creative variants (default) across different hook types, calls fal.ai to generate visual assets, saves to `ads/pending/`.  
**Requires:** `FAL_API_KEY`, active brief in `briefs/active/`

---

### `/publisher`
**File:** `.claude/commands/publisher.md`  
**Trigger phrase:** "run PUBLISHER" or type `/publisher`  
**What it does:** Lists pending creatives, confirms targeting and budget, uploads assets to Meta, creates Ad → Ad Set → Campaign objects, moves published ads to `ads/live/`.  
**Requires:** `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`, `META_APP_ID`, `META_APP_SECRET`

---

### `/looper`
**File:** `.claude/commands/looper.md`  
**Trigger phrase:** "run LOOPER" or type `/looper`  
**What it does:** Pulls Meta Insights for all live ads, scores by ROAS/CTR/CPC, labels winners/losers, saves scores, extracts winners for next FORGE cycle, archives losers.  
**Requires:** `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`, ads in `ads/live/` with 48h+ of data

---

## Creative Tools

### `/creative-machine`
**File:** `.claude/commands/creative-machine.md`  
**Trigger phrase:** "iterate on this ad" or type `/creative-machine`  
**What it does:** Takes an existing WINNER or PERFORMING ad and generates 10 systematic variations — different hook types, formats, personas, and copy treatments. Saves to `ads/pending/`.  
**Requires:** At least one scored ad in `performance/winners/` or `ads/live/`

---

### `/canvas-design`
**File:** `.claude/commands/canvas-design.md`  
**Trigger phrase:** "make a design" / "make a poster" or type `/canvas-design`  
**What it does:** Creates a complete static ad design package — layout concept, copy layers (headline/sub/CTA), visual direction, and a fal.ai generation prompt. Optionally generates the image via fal.ai.  
**Requires:** `FAL_API_KEY` (optional — will output prompt for manual generation if not set)

---

## Sourcing Tools

### `/creator-discovery`
**File:** `.claude/commands/creator-discovery.md`  
**Trigger phrase:** "find influencers" / "find creators" or type `/creator-discovery`  
**What it does:** Defines an ideal creator profile based on the active brief and personas, sources and evaluates UGC creator candidates, scores them, drafts outreach messages. Optionally saves to Google Sheets (if Sheets MCP is connected) or sends outreach via Gmail MCP.  
**Requires:** Active campaign brief (or user provides brief inline)

---

## Infrastructure Tools

### `/github-repo`
**File:** `.claude/commands/github-repo.md`  
**Trigger phrase:** "create a repo" or type `/github-repo`  
**What it does:** Scaffolds a new GitHub repository with standard structure, README, CLAUDE.md, .gitignore, and .env.example. Supports Node.js, Next.js, Python, and static project types.  
**Requires:** GitHub MCP server connected, repo name and details from user

---

## Environment Variables Reference

| Variable | Required By | Description |
|----------|------------|-------------|
| `FAL_API_KEY` | `/forge`, `/canvas-design` | fal.ai API key for image/video generation |
| `META_ACCESS_TOKEN` | `/publisher`, `/looper` | Meta Marketing API user access token |
| `META_AD_ACCOUNT_ID` | `/publisher`, `/looper` | Meta ad account ID (format: act_XXXXXXXXX) |
| `META_APP_ID` | `/publisher` | Meta app ID |
| `META_APP_SECRET` | `/publisher` | Meta app secret |
