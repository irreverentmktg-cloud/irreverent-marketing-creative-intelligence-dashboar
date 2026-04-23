Generate ad creative variants for the current campaign using fal.ai.

## Steps

1. **Load context**
   - Read all files in `briefs/active/` — identify the active campaign brief
   - Read `brand/voice.md`, `brand/dos-donts.md`, and `brand/personas.md`
   - Check `performance/winners/` for any winner references to inform the new creative direction

2. **Confirm brief with user**
   - Summarize the campaign goal, target persona, key hook, and offer
   - Ask: "Ready to generate? How many variants would you like? (default: 5)"

3. **Generate creative variants**
   - For each variant, define:
     - `hook_type`: one of [pain-point, curiosity, social-proof, transformation, direct-offer]
     - `format`: one of [static-image, video-script, carousel]
     - `hook_line`: the opening line (first 3 seconds if video, headline if static)
     - `body_copy`: supporting copy (max 125 chars for Meta)
     - `cta`: call to action
     - `visual_direction`: detailed description for fal.ai image generation prompt
     - `fal_prompt`: the exact fal.ai generation prompt to use
   - Ensure each variant targets a different hook type
   - All variants must comply with `brand/dos-donts.md`

4. **Call fal.ai** (if `FAL_API_KEY` is set)
   - For static-image variants: call fal.ai `fal-ai/flux/dev` with the `fal_prompt`
   - Save returned image URLs or local paths into the creative record
   - If `FAL_API_KEY` is not set, flag the visual_direction for manual generation and continue

5. **Save outputs to `ads/pending/`**
   - Create one JSON file per variant:
     ```
     ads/pending/[campaign]-[hook-type]-[variant-number]-[YYYY-MM-DD].json
     ```
   - Each file contains:
     ```json
     {
       "campaign": "",
       "hook_type": "",
       "format": "",
       "hook_line": "",
       "body_copy": "",
       "cta": "",
       "visual_direction": "",
       "fal_prompt": "",
       "asset_url": "",
       "status": "pending",
       "created_at": ""
     }
     ```

6. **Report to user**
   - List all generated variants with their hook types and hook lines
   - Flag any that need manual asset creation
   - Prompt: "Run `/publisher` when you're ready to push these live."

## Notes
- Never use claims that violate Meta ad policies (no guaranteed results, no before/after medical claims)
- Always check `brand/dos-donts.md` before finalizing copy
- Video scripts should have a hook in the first 3 seconds
