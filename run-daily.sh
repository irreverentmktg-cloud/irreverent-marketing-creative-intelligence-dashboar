#!/bin/bash
# Daily runner for Lovable automation.
# Add to cron with: crontab -e
# Example — run every day at 9 AM:
#   0 9 * * * /path/to/run-daily.sh >> /path/to/lovable-auto.log 2>&1

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=== $(date) — Starting Lovable daily automation ==="
node lovable-auto.js
echo "=== $(date) — Done ==="
