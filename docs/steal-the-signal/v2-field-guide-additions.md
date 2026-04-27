# Steal the Signal — V2 Additions

> This document captures all additions to the field guide since the original release.
> Status: Draft for V2 PDF integration
> Updated: 2026-04-27

---

## POSITIONING UPDATE (Core Reframe)

The V1 guide leads with: *"You don't have a creative problem. You have a visibility problem."*

V2 extends this to include the full flywheel:

> **"Turn customer pain into high-converting creative assets — without guessing."**

The guide doesn't just teach you to see what's working. It teaches you to convert that signal into production-ready creative. The intelligence is the input. The creative is the output.

**Updated tagline sequence:**
1. You don't have a creative problem. You have a visibility problem. *(M·00 — the entry reframe)*
2. The market already told you what to make. You just need to know how to read it. *(M·03–04 — the vault and scoring)*
3. Turn customer pain into high-converting creative — without guessing. *(M·06 — the output)*

---

## NEW MODULE ADDITION: M·01B — THE FORMAT INTELLIGENCE LAYER

*Insert between M·01 and M·02 in V2, or add as §07 to M·03 (Swipe Vault).*

---

### MODULE · 01B · THE FORMAT LAYER

**The Format Intelligence Layer**

What Motion does with live performance data, you can do with the Ad Library.

---

#### Why Format Is the Third Signal

Duration tells you how long an ad survived. Variant count tells you how actively they're testing. Format tells you *what container the winning creative lives in* — and that's the most underused signal in the library.

A brand running sixteen 15-second video ads, all surviving 45+ days, is telling you something important: **their category rewards short video.** A brand running nothing but static image carousels in the Steal tier is telling you the opposite. You don't need impression data to read this. You need a vault column and a filter.

This is what Motion — the creative analytics platform — does with live ROAS and hook-rate data. You're going to do the same thing with the only data the Library gives you: what survived.

---

#### The Extended Format Schema

Add these four columns to your Swipe Vault (extend the M·03 schema):

| Column | Type | Values |
|---|---|---|
| `format_type` | select | static_image / video / carousel / collection / text_only |
| `video_length` | select | 0–6s / 7–15s / 16–30s / 31–60s / 60s+ / n/a |
| `creative_style` | select | ugc / studio / talking_head / screen_record / animation / text_motion / product_demo / unboxing |
| `aspect_ratio` | select | 9:16 / 1:1 / 4:5 / 16:9 / unknown |

**Why each field earns its column:**

**`format_type`** — The base container. Tells you which creative format the platform is rewarding in your category. If 80% of your Steal tier is video and you're running all static, that's the brief direction.

**`video_length`** — The most skipped insight. A category full of 7–15s ads is a category where hooks are everything and you have no time to educate. A category full of 31–60s ads is a category that rewards storytelling. Don't fight the category's patience.

**`creative_style`** — The production style that's surviving. UGC-style outperforming studio? That's a signal about trust and authenticity in your category. Talking head outperforming b-roll? That's a founder-credibility signal.

**`aspect_ratio`** — 9:16 dominance = the brand is prioritizing Reels and Stories. 1:1 dominance = feed-first strategy. This tells you where they're concentrating spend, not just what they're spending on.

---

#### How to Capture Format Fields

**From M·01 (no-tool path):** Add to the Claude scrape prompt. Extend the v1.0 prompt with:

```
Additional fields to extract for every ad:

15. format_type     (static_image | video | carousel | collection | text_only)
16. video_length    (0-6s | 7-15s | 16-30s | 31-60s | 60s+ | n/a for non-video)
17. creative_style  (ugc | studio | talking_head | screen_record | animation |
                     text_motion | product_demo | unboxing — your best read)
18. aspect_ratio    (9:16 | 1:1 | 4:5 | 16:9 | unknown)
```

**From M·02 (Apify path):** The JSON output includes `publisher_platform` which indicates placement, and `snapshot.cards` structure reveals carousel vs. single. Video vs. static comes from the media type in `snapshot`. Add to the flatten prompt:

```
Additional columns to extract:
format_type — detect from snapshot structure: does snapshot.cards[0] contain video_hd_url? = video. 
Multiple cards = carousel. Single image = static_image.
video_length — if video, extract duration from snapshot if available; else "unknown"
creative_style — your inference from visual_notes field
aspect_ratio — extract from snapshot dimensions if available; else "unknown"
```

---

#### The Format Intelligence Read

Once your vault has these four columns, run these three reads monthly:

**Read 1: Format dominance in the Steal tier**

Filter: tier = Steal. Group by format_type. Count.

> "What format is producing the most long-running ads in my category?"

If the answer is 9:16 video, your next brief should be 9:16 video — not because it's trendy, because the library just told you it's paying.

**Read 2: Video length pattern**

Filter: format_type = video, tier = Steal or Study. Group by video_length. Count.

> "How much time does my category give me to make a case?"

If 7–15s dominates, your hook is everything. First six words must work. If 31–60s dominates, you have room to tell a story — and your competitors know it.

**Read 3: Creative style vs. hook type correlation**

Filter: tier = Steal. Pivot: hook_type × creative_style.

> "Which production style is paired with which hook type among the winners?"

Common finding: UGC style pairs with problem-aware hooks (authenticity sells the problem). Studio pairs with outcome hooks (aspirational aesthetic supports the transformation). If you find this in your vault, that's a specific creative direction — not a general one.

---

#### The Format Brief Extension

Add a 13th field to the M·06 Structural DNA Brief:

```
13 · FORMAT SPECIFICATION

Target format_type:
Target video_length (if video):
Target creative_style:
Target aspect_ratio:

Rationale: [one line — what the vault's format intelligence tells you]
```

**Example:**
```
13 · FORMAT SPECIFICATION

Target format_type: video
Target video_length: 7–15s
Target creative_style: ugc
Target aspect_ratio: 9:16

Rationale: 6 of 8 Steal-tier ads in this category are 9:16 UGC video under 15 seconds.
The category is rewarding authentic, fast, feed-native creative.
```

---

#### Format Scoring Addition (Optional — extends M·04)

Add a fourth lens to the scoring rubric:

**Lens Four · Format Signal (0–3)**

| Condition | Points |
|---|---|
| Format matches the dominant format in the Steal tier (same type + same style) | 3 |
| Format matches type but not style (e.g., video but studio vs. category UGC) | 2 |
| Format is in the category but underrepresented in Steal tier | 1 |
| Format directly contradicts what's winning (static-only in a video-dominant category) | 0 |

**Updated composite:** Duration (0–5) + Variants (0–4) + Clarity (0–8) + Format (0–3) = **0–20 total**

**Updated tier bands:**
- 15–20: Steal
- 11–14: Study
- 6–10: Skip
- 0–5: Ignore

---

## POSITIONING UPDATE FOR ALL LISTINGS AND CONTENT

Replace all instances of: *"Reverse-engineer competitor ads"*
With: *"Turn competitor intelligence into high-converting creative"*

Replace: *"Know what's working before you spend"*
With: *"Know what to make before you make it"*

New banner statement for all platforms:
> **"The creative machine that runs on stolen signal."**

---

## UPDATED AUTO-SCORE PROMPT (V2 — includes format lens)

```
PROMPT · AUTO-SCORE THE VAULT · V2.0

You are scoring competitor ads using the Steal the Signal V2 rubric.
Attached is my swipe vault CSV. Return it unchanged except for four 
scoring columns you will fill in for every row:

duration_points   (0–5, based on days_active)
variant_points    (0–4, based on variant_count)
clarity_points    (0–8, based on the clarity rubric)
format_points     (0–3, based on format signal vs. Steal-tier dominance)

Then add two derived columns:
score = sum of all four
tier  = "Steal" if 15+, "Study" if 11–14, "Skip" if 6–10, "Ignore" if 0–5

Duration points:
90+ days = 5 · 60–89 = 4 · 30–59 = 3 · 14–29 = 2 · 7–13 = 1 · <7 = 0

Variant points:
10+ = 4 · 5–9 = 3 · 3–4 = 2 · 2 = 1 · 1 = 0

Clarity rubric (0–2 each):
A. Hook sharpness — first 6 words commit to one clean hook type
B. Offer clarity — offer in headline or first line
C. Visual clarity — frame 1 reads in under one second
D. CTA match — CTA verb matches the ad's job

Format signal (0–3):
Identify the dominant format_type + creative_style combination in the Steal tier 
of this vault. Then score each ad:
3 = matches dominant format type AND creative style
2 = matches type, different style
1 = different type, present in category
0 = contradicts what's winning

Return the full CSV with six new columns appended. No preamble. CSV only.
```

---

## UPDATED SCRAPE PROMPT (V2 — includes format fields)

```
PROMPT · META LIBRARY SCRAPE · V2.0

[All V1 fields 1-14 unchanged]

Additional fields:

15. format_type     (static_image | video | carousel | collection | text_only)
16. video_length    (0-6s | 7-15s | 16-30s | 31-60s | 60s+ | n/a)
17. creative_style  (ugc | studio | talking_head | screen_record | animation |
                     text_motion | product_demo | unboxing)
18. aspect_ratio    (9:16 | 1:1 | 4:5 | 16:9 | unknown)

For creative_style: use your best inference from visual_notes. 
Does it look self-shot? ugc. Professional lighting/set? studio. 
Person speaking to camera? talking_head. Screen being recorded? screen_record.

Output as 18-column CSV. First row headers. No commentary.
```

---

*V2 additions authored: 2026-04-27*
*Integration target: Steal the Signal Field Guide V2*
*Affects: M·01 prompt, M·03 schema, M·04 scoring, M·06 brief template*
