# Cited has moved

This subfolder is no longer the source of truth.

The Cited app now lives in its own dedicated repo:

→ **https://github.com/irreverentmktg-cloud/Cited**

That repo has the latest working code (Hono + TypeScript + React + Vite +
Supabase), the schema actually applied to the live Supabase project, and
the BYO API key migration scaffold.

Anything in this `cited/` subfolder is a frozen snapshot from before the
split and should be considered read-only / archival. Don't make changes
here — they won't flow upstream.

If you have a local clone of this monorepo with uncommitted changes in
`cited/`, those changes have already been committed to the new repo on
branch `claude/migrate-cited-from-monorepo`. You can safely discard the
local `cited/` working-tree changes:

```bash
git restore cited/
git clean -fd cited/   # if you also want to drop untracked files
```
