import type {
  Brand,
  Platform,
  PromptRun,
  PromptWithStatus,
  ScoreSnapshot,
} from '@cited/shared'
import { PLATFORMS } from '@cited/shared'
import { repo } from '../db/repo.js'
import { providers } from './providers/index.js'
import { buildSnapshot, detectCitation, opportunityScore } from './score.js'

// Run every prompt for a brand against every available provider, write results
// to the repo, then snapshot a daily score. Runs sequentially per provider to
// stay friendly to rate limits.
export async function runScoreCycle(brand: Brand): Promise<{
  snapshot: ScoreSnapshot
  prompts: PromptWithStatus[]
}> {
  const r = repo()
  const prompts = await r.listPrompts(brand.id)

  const promptResults: PromptWithStatus[] = []

  for (const prompt of prompts) {
    const runs = emptyRunsMap()

    for (const platform of PLATFORMS) {
      const provider = providers[platform]
      if (!provider.available) {
        runs[platform] = null
        continue
      }
      try {
        const result = await provider.ask(prompt.text)
        const detection = detectCitation(brand, result)
        const persisted = await r.recordRun({
          promptId: prompt.id,
          platform,
          status: detection.cited ? 'cited' : 'not-cited',
          rank: detection.rank,
          competitors: result.competitorBrands,
          recommendedContent: null,
          rawAnswer: result.answer,
          ranAt: result.ranAt,
        })
        runs[platform] = persisted
      } catch (err) {
        const persisted = await r.recordRun({
          promptId: prompt.id,
          platform,
          status: 'error',
          rank: null,
          competitors: [],
          recommendedContent: null,
          rawAnswer: err instanceof Error ? err.message : String(err),
          ranAt: new Date().toISOString(),
        })
        runs[platform] = persisted
      }
    }

    promptResults.push({
      prompt,
      runs,
      opportunityScore: opportunityScore(runs),
    })
  }

  const snapshot = buildSnapshot(promptResults, 0)
  await r.recordScore(brand.id, snapshot)

  return { snapshot, prompts: promptResults }
}

function emptyRunsMap(): Record<Platform, PromptRun | null> {
  return {
    claude: null,
    chatgpt: null,
    perplexity: null,
    gemini: null,
  }
}
