#!/bin/bash
set -euo pipefail

# Only run in Claude Code remote (web) sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "==> Ambrosia Creative Intelligence Dashboard — session start"

# Ensure the expected pipeline folder structure exists
DIRS=(
  "ads/pending"
  "ads/live"
  "ads/archive"
  "briefs/active"
  "briefs/templates"
  "performance/scores"
  "performance/winners"
  "performance/reports"
  "brand"
  "docs"
)

for dir in "${DIRS[@]}"; do
  if [ ! -d "$CLAUDE_PROJECT_DIR/$dir" ]; then
    mkdir -p "$CLAUDE_PROJECT_DIR/$dir"
    echo "  created: $dir"
  fi
done

echo "==> Pipeline directory structure ready"
echo "==> Session ready"
