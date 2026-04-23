Source, evaluate, and shortlist UGC creators for ad creative production.

## When to Use

Use this skill when you need real human creators to film UGC-style video ads — testimonials, product demos, lifestyle content, or talking-head hooks.

## Steps

1. **Define the brief**
   - Ask the user (or read from `briefs/active/`):
     - Campaign / product being promoted
     - Creator type needed (e.g., fitness influencer, mom, professional, Gen Z)
     - Content format (talking-head, demo, lifestyle b-roll, unboxing)
     - Budget per creator
     - Turnaround time needed
     - Any geographic requirements

2. **Generate a creator profile**
   Based on `brand/personas.md`, define the ideal creator profile:
   - Age range
   - Aesthetics / vibe
   - Platform presence (TikTok, Instagram, YouTube)
   - Follower range (nano: 1K–10K, micro: 10K–100K, macro: 100K+)
   - Content style keywords
   - Red flags to avoid

3. **Source creator candidates**
   - Search the web for creators matching the profile using: platform + niche + follower range keywords
   - Look for creators who have previously created sponsored content in the same category
   - Check for authentic engagement (comments vs. likes ratio >3%)
   - Target platforms: TikTok, Instagram Reels, YouTube Shorts

4. **Evaluate each candidate**
   For each creator found, score on:

   | Criteria | Weight | Notes |
   |----------|--------|-------|
   | Audience fit | 30% | Does their audience match our persona? |
   | Engagement rate | 25% | ER > 3% is strong for micro |
   | Content quality | 25% | Production, authenticity, hook quality |
   | Brand safety | 20% | No controversy, past policy violations |

   Overall score: 0–100

5. **Build the shortlist**
   Output a table of the top 5–10 creators:

   | Creator | Platform | Followers | ER | Fit Score | Profile URL | Notes |
   |---------|----------|-----------|-----|-----------|-------------|-------|

6. **Draft outreach messages**
   For each shortlisted creator, write a personalized outreach DM:
   - Reference something specific from their content
   - State the campaign briefly (no full brief yet)
   - Mention compensation range
   - Clear CTA (reply to express interest)
   - Keep under 150 words

7. **Save to Google Sheets** (if Sheets MCP is connected)
   - Append creators to the Creator Tracking sheet with all scored fields
   - If Sheets MCP is not connected, save a local file: `performance/reports/creator-discovery-[YYYY-MM-DD].json`

8. **Report to user**
   - Display shortlist and outreach messages
   - Ask: "Which creators should I send outreach to? (or 'all')"
   - If Gmail MCP is connected, send the outreach DMs via email where email addresses are available

## Notes
- Always prioritize authentic engagement over raw follower count
- Nano and micro creators typically outperform macro for direct response ads
- Request usage rights in all outreach — unlimited paid media usage for 12 months minimum
