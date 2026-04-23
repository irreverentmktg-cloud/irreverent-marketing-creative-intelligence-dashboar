Create a static visual ad design — poster, banner, or social graphic — with full copy and fal.ai generation prompt.

## When to Use

Use this skill when you need a static image ad (not a video script). Outputs a complete design brief + fal.ai prompt ready for generation.

## Steps

1. **Gather requirements**
   - Ask the user (or read from `briefs/active/`):
     - What is the ad promoting? (product, offer, event, etc.)
     - What size/format? (default options below)
     - What's the primary goal? (clicks, awareness, conversions)
     - Any specific visual style preferences?
   
   Default format options:
   | Format | Dimensions | Use Case |
   |--------|-----------|---------|
   | Feed Square | 1080×1080 | Instagram/Facebook Feed |
   | Feed Portrait | 1080×1350 | Instagram Feed (more real estate) |
   | Story/Reel | 1080×1920 | Stories, Reels, TikTok |
   | Banner | 1200×628 | Facebook Feed, link ads |

2. **Load brand context**
   - Read `brand/voice.md` for tone and messaging style
   - Read `brand/dos-donts.md` for visual and copy rules
   - Read `brand/personas.md` for audience context

3. **Design the layout concept**
   Define a clear visual hierarchy:
   - **Zone 1 — Hook (top 30%)**: Attention-grabbing headline or visual element
   - **Zone 2 — Value (middle 40%)**: Supporting visual, product shot, or proof point
   - **Zone 3 — CTA (bottom 30%)**: Call to action, offer, or brand lockup

4. **Write all copy layers**
   - Headline (max 40 chars, punchy)
   - Subheadline (max 80 chars, supporting)
   - Body copy (max 125 chars, optional)
   - CTA button text (2–4 words)
   - Fine print (if needed — offer terms, etc.)

5. **Define the visual direction**
   Write a detailed visual direction covering:
   - Color palette (primary, secondary, accent)
   - Typography style (bold/clean/handwritten/etc.)
   - Photography / illustration style
   - Lighting and mood
   - Background treatment
   - Key visual elements to include
   - Elements to avoid

6. **Craft the fal.ai generation prompt**
   Write a precise fal.ai prompt:
   ```
   [style descriptor], [subject], [composition], [lighting], [color palette], 
   [mood], advertising photography, high quality, [format]
   
   Negative prompt: text, watermark, blurry, low quality, amateur
   ```

7. **Generate the image** (if `FAL_API_KEY` is set)
   - Call fal.ai `fal-ai/flux/dev` with the crafted prompt
   - Retrieve and display the generated image URL
   - If generation fails, output the full prompt for manual use

8. **Output the complete design package**
   Display to the user:
   - All copy layers (headline, sub, body, CTA)
   - Visual direction summary
   - fal.ai prompt used
   - Generated image URL (or manual generation instructions)
   - Recommended next step: save to `ads/pending/` and run `/publisher`

9. **Save to `ads/pending/`**
   Ask user: "Save this to ads/pending/ for publishing? (yes/no)"
   If yes, save as: `ads/pending/[campaign]-canvas-[YYYY-MM-DD].json`

## Notes
- Text in images should be minimal — Meta penalizes heavy text overlays
- High-contrast, single focal point designs outperform busy layouts
- Always test both square and story formats for the same creative concept
