# Irreverent Marketing Creative Intelligence Dashboard

AI-powered creative intelligence platform for generating, deploying, scoring, and iterating on ad creatives at scale.

## Marketing Skills

41 marketing skills are installed at `.agents/skills/`. Use them when the task matches — they contain expert-level playbooks for marketing execution.

Key skills for this project:
- **ad-creative** — generating ad creative variants, hooks, copy
- **paid-ads** — Meta Ads, Google Ads, TikTok Ads setup and optimization
- **page-cro** — landing page conversion optimization
- **copywriting** — persuasive copy using proven frameworks
- **social-content** — short-form video, post templates, platform-specific formats
- **analytics-tracking** — GA4, Mixpanel, Segment event tracking
- **launch-strategy** — new creative or campaign launches
- **marketing-psychology** — behavioral principles to apply to creatives
- **seo-audit** — content and technical SEO
- **competitor-profiling** — analyzing competitor ads and strategy

Full list: `ls .agents/skills/`

## Pipeline Architecture

```
SCRAPER → FORGE → PUBLISHER → LOOPER → FORGE (repeat)
```

| Stage | Tool | Role |
|-------|------|------|
| SCRAPER | Pulls competitor ads, hooks, landing pages |
| FORGE | Generates creative variants via fal.ai |
| PUBLISHER | Pushes approved creatives to Meta Ads Manager |
| LOOPER | Scores live ads by ROAS/CTR/CPC, flags winners/losers |
| Dashboard | Centralizes all data, briefs, and performance |

## Product Context

When using marketing skills, check `.agents/product-marketing-context.md` if it exists for brand-specific context.

## Tools Available

- Meta Ads, Google Ads, TikTok Ads integration guides: `marketingskills/tools/integrations/`
- CLI tools for 51 marketing platforms: `marketingskills/tools/clis/`
- Tool registry: `marketingskills/tools/REGISTRY.md`
