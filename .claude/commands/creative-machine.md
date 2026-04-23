Generate 10 systematic variations of an existing ad creative to find the next winner.

## When to Use

Use this skill when you have a PERFORMING or WINNER ad and want to squeeze more signal from it by testing structured variations — different hooks, angles, formats, and copy treatments on the same core offer.

## Steps

1. **Select the source ad**
   - If the user specified an ad, load it from `ads/live/` or `performance/winners/`
   - Otherwise, list the top 5 scored ads from `performance/scores/` and ask the user to pick one
   - Display: hook_type | hook_line | ROAS | CTR | score

2. **Read brand context**
   - Load `brand/voice.md`, `brand/dos-donts.md`, `brand/personas.md`

3. **Generate 10 variations across these dimensions**

   | # | Variation Type | Description |
   |---|---------------|-------------|
   | 1 | Hook rewrite — pain-point angle | Lead with the problem the persona feels |
   | 2 | Hook rewrite — curiosity angle | Open with a surprising or counterintuitive statement |
   | 3 | Hook rewrite — social proof angle | Lead with a customer result or testimonial |
   | 4 | Hook rewrite — transformation angle | Before/after framing |
   | 5 | Hook rewrite — direct offer angle | Lead with the offer itself |
   | 6 | Format switch — video script | Convert to a 15-second UGC-style video script |
   | 7 | Format switch — carousel | Break into 3–5 slide carousel structure |
   | 8 | CTA variation | Same hook, different CTA (urgency, curiosity, soft) |
   | 9 | Persona shift | Rewrite for a different persona from `brand/personas.md` |
   | 10 | Length variation | Compress copy to <50 chars or expand to long-form |

4. **Output each variation as a structured creative**
   - For each of the 10:
     - `variation_type`: (from table above)
     - `hook_line`: opening line
     - `body_copy`: supporting copy
     - `cta`: call to action
     - `visual_direction`: image/video direction for fal.ai
     - `fal_prompt`: ready-to-use fal.ai prompt

5. **Save to `ads/pending/`**
   - File: `ads/pending/[campaign]-creative-machine-[1-10]-[YYYY-MM-DD].json`
   - Same JSON structure as `/forge` output
   - Set `status: "pending"`

6. **Report to user**
   - Show all 10 variations in a table: # | variation_type | hook_line | cta
   - Ask: "Which ones should I generate assets for via fal.ai? (enter numbers or 'all')"
   - Generate fal.ai images for selected variants (if `FAL_API_KEY` is set)
   - Prompt: "Run `/publisher` to push approved variants live."

## Notes
- The goal is structured hypothesis testing — each variation isolates one variable
- If the source ad has no `visual_direction`, infer one from the hook_line and persona
- Creative Machine is most effective after at least one LOOPER cycle has run
