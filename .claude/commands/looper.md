Score all live ads by ROAS, CTR, and CPC — flag winners and losers, and feed insights back into the creative pipeline.

## Prerequisites

Ensure these environment variables are set:
- `META_ACCESS_TOKEN`
- `META_AD_ACCOUNT_ID`

## Steps

1. **Load live ads**
   - Read all `.json` files in `ads/live/`
   - Extract the `ad_id` from each file

2. **Pull performance data from Meta**
   - Call Meta Insights API for each ad:
     ```
     GET /{ad_id}/insights?fields=spend,impressions,clicks,ctr,cpc,actions,action_values&date_preset=lifetime
     ```
   - Extract:
     - `spend` (total ad spend)
     - `impressions`
     - `clicks`
     - `ctr` (click-through rate)
     - `cpc` (cost per click)
     - `purchase_roas` (from `action_values` where `action_type = purchase`)
   - If an ad has less than $10 spend, flag as "insufficient data" and skip scoring

3. **Score each ad**
   Apply this scoring logic:

   | Metric | Target | Weight |
   |--------|--------|--------|
   | ROAS | 3.5x+ | 50% |
   | CTR | 2%+ | 30% |
   | CPC | <$1.20 | 20% |

   - ROAS score: `min(roas / 3.5, 1.0) * 50`
   - CTR score: `min(ctr / 2.0, 1.0) * 30`
   - CPC score: `max(0, (1.20 - cpc) / 1.20) * 20`
   - Total score: sum (0–100)

   Labels:
   - 80–100: WINNER
   - 60–79: PERFORMING
   - 40–59: WATCH
   - 0–39: LOSER

4. **Save scores to `performance/scores/`**
   - File: `performance/scores/[campaign]-scores-[YYYY-MM-DD].json`
   - Structure:
     ```json
     {
       "scored_at": "",
       "campaign": "",
       "ads": [
         {
           "ad_id": "",
           "hook_type": "",
           "hook_line": "",
           "spend": 0,
           "roas": 0,
           "ctr": 0,
           "cpc": 0,
           "score": 0,
           "label": "WINNER|PERFORMING|WATCH|LOSER"
         }
       ]
     }
     ```

5. **Extract winners to `performance/winners/`**
   - For every ad labeled WINNER or PERFORMING:
     - Save a winner reference: `performance/winners/[ad_id]-winner.json`
     - Include: hook_type, hook_line, body_copy, visual_direction, score, roas, ctr, cpc
   - These files are automatically read by `/forge` on the next cycle

6. **Archive losers**
   - Move LOSER ads from `ads/live/` to `ads/archive/`
   - Append `"archived_reason": "low-performance"` and final scores to the file
   - Optionally: ask user "Pause these ads on Meta? (yes/no)" and call `POST /{ad_id}?status=PAUSED` if confirmed

7. **Report to user**
   - Show a ranked table: ad | hook_type | ROAS | CTR | CPC | score | label
   - Highlight winners in the summary
   - State total spend reviewed and blended ROAS
   - Prompt: "Run `/forge` to generate the next creative batch based on these winners."

## Notes
- Run LOOPER after 48–72 hours of live ad data for meaningful results
- Always check for "insufficient data" flags before making decisions
- Winner references persist across cycles — `/forge` learns from them automatically
