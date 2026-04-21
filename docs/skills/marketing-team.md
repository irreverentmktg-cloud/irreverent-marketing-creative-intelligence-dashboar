# Skill: Marketing Team

**Trigger:** `run MARKETING TEAM` or `marketing team review [input]`  
**File:** `.claude/commands/marketing-team.md`

---

## What It Does

The Marketing Team skill assembles five specialized marketing personas who collaboratively review a piece of work — a creative, brief, or performance dataset — and return a structured verdict with action items.

It's the quality gate for the pipeline. Before anything ships (or gets killed), the marketing team reviews it.

---

## The Five Team Members

| Member | Role | Primary Lens |
|--------|------|-------------|
| **Sage** | Creative Director | Hook strength, copy/visual cohesion, creative freshness |
| **Rex** | Performance Analyst | ROAS, CTR, CPC, spend efficiency, historical pattern matching |
| **Vera** | Consumer Psychologist | Psychological triggers, pain/desire mapping, cognitive load |
| **Bishop** | Brand Guardian | Voice compliance, dos/don'ts, persona fit |
| **Max** | Media Buyer | Platform fit, targeting, budget, placement suitability |

---

## When to Use It

| Situation | Use Marketing Team |
|-----------|-------------|
| Before shipping a new creative to PUBLISHER | Yes |
| After FORGE generates variants — picking the best | Yes |
| When LOOPER flags a creative as a "borderline" performer | Yes |
| When writing a new campaign brief | Yes (marketing team reviews brief before FORGE runs) |
| Strategic decisions (UGC vs. studio, new audience segment) | Yes |
| Routine LOOPER scoring of known metrics | No (data is clear enough) |

---

## Verdict Meanings

| Verdict | Meaning | Next Step |
|---------|---------|-----------|
| **SHIP IT** | Majority confidence — deploy or proceed | Tag `[PUBLISHER]` or move brief to `/briefs/active/` |
| **NEEDS WORK** | Promising but fixable issues identified | Act on action items, then re-review with marketing team or use judgment |
| **KILL IT** | Fundamental problems — don't ship | Document why in `/performance/archive/`, brief FORGE for replacement |

---

## Context Files Referenced

The team reads these files to make grounded judgments. Keep them updated.

| File | Owner | Update Cadence |
|------|-------|----------------|
| `/brand/voice.md` | Brand/Creative | When voice evolves |
| `/brand/dos-donts.md` | Creative + Performance | After each campaign cycle |
| `/brand/personas.md` | Strategy | Quarterly or when ICP shifts |
| `/performance/winners/` | LOOPER | After each scoring cycle |
| `/performance/scores/` | LOOPER | After each scoring cycle |

---

## Integration With the Pipeline

```
FORGE generates variants
        ↓
  run MARKETING TEAM (review variants)
        ↓
   SHIP IT? → PUBLISHER
   NEEDS WORK? → back to FORGE with revised brief
   KILL IT? → archive + new FORGE brief
```

The marketing team can also be inserted before FORGE:

```
  New campaign idea
        ↓
  run MARKETING TEAM (review brief)
        ↓
   Brief approved? → FORGE
   Brief needs work? → revise brief
```

---

## Example Output

```
## Marketing Team Review: "Tired of wasting ad spend?" — UGC Hook Variant A
Date: 2026-04-21

---

### Sage (Creative Director)
Hook is strong — direct, problem-aware, speaks to the persona. 
The visual B-roll in seconds 2–4 loses momentum. Needs a faster cut or a face.
- Green flag: Hook lands in under 2 seconds
- Red flag: Visual pacing drops off mid-creative
- Vote: NEEDS WORK

### Rex (Performance Analyst)
Similar hook structure to campaign-003 winner (3.9x ROAS). Format matches.
CTR benchmark for this persona segment: 2.1% — this should hit it.
- Green flag: Hook pattern matches historical winner
- Red flag: No price anchor — past data shows anchors lift ROAS 0.4x
- Vote: SHIP IT

[... remaining team members ...]

---

## Verdict: NEEDS WORK
Strong hook with proven pattern, but visual pacing and missing price anchor need fixing before shipping.

## Action Items
1. [FORGE] Re-generate B-roll sequence for seconds 2–4 — tighter cuts, more energy
2. [BRIEF] Add price anchor to CTA — reference dos-donts.md rule #4
3. [MARKETING TEAM] Re-review after FORGE revision
```

---

## Tips

- The more context you give the team, the better the verdict. Paste the full brief or creative copy rather than summarizing.
- If you're reviewing live performance, include the LOOPER score output.
- Marketing team verdicts are logged in conversation history — reference them when briefing FORGE.
