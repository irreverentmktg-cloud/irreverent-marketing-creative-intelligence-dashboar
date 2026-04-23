Push approved creatives from `ads/pending/` live to Meta Ads Manager.

## Prerequisites

Ensure these environment variables are set before running:
- `META_ACCESS_TOKEN`
- `META_AD_ACCOUNT_ID` (format: `act_XXXXXXXXX`)
- `META_APP_ID`
- `META_APP_SECRET`

If any are missing, stop and tell the user which variables need to be configured.

## Steps

1. **List pending creatives**
   - Read all `.json` files in `ads/pending/`
   - Display a table: filename | campaign | hook_type | format | hook_line | status
   - Ask user: "Which creatives should I publish? (enter numbers, or 'all')"

2. **Confirm campaign targeting** (for each selected creative)
   - Ask the user to confirm or provide:
     - Target audience (age range, interests, custom audiences)
     - Placements (Feed, Stories, Reels, etc.)
     - Budget (daily or lifetime)
     - Campaign objective (CONVERSIONS, TRAFFIC, AWARENESS)
     - Start date / end date (optional)

3. **Upload creative asset to Meta**
   - For image ads: `POST /act_{ad_account_id}/adimages` with the asset
   - For video ads: `POST /act_{ad_account_id}/advideos` with the asset
   - Capture the returned `image_hash` or `video_id`

4. **Create Ad objects in Meta**
   - Create Campaign → Ad Set → Ad Creative → Ad in sequence
   - Use the Meta Marketing API v19.0+
   - Ad Creative spec:
     ```json
     {
       "name": "[campaign]-[hook_type]-[date]",
       "object_story_spec": {
         "page_id": "<PAGE_ID>",
         "link_data": {
           "message": "<body_copy>",
           "link": "<landing_page_url>",
           "call_to_action": { "type": "<cta_type>" },
           "image_hash": "<image_hash>"
         }
       }
     }
     ```

5. **Move published creatives to `ads/live/`**
   - Rename/move the file: `ads/live/[ad_id]-[campaign]-live.json`
   - Update the JSON with:
     ```json
     {
       "ad_id": "",
       "ad_set_id": "",
       "campaign_id": "",
       "status": "live",
       "published_at": "",
       "targeting": {},
       "budget": {}
     }
     ```
   - Remove the original from `ads/pending/`

6. **Report results**
   - List each published ad with its Meta `ad_id` and live status
   - Prompt: "Run `/looper` after 48–72 hours to score performance."

## Notes
- Never publish creatives with `status: "draft"` — only publish `status: "pending"` with confirmed assets
- If Meta API returns an error, log it and skip that creative rather than aborting the whole batch
- Double-check copy against Meta's ad policies before submission
