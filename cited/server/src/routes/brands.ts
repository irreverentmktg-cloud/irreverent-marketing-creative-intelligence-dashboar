import type {
  BrandSummary,
  Platform,
  PromptRun,
  PromptWithStatus,
} from '@cited/shared'
import { PLATFORMS } from '@cited/shared'
import { Hono } from 'hono'
import { repo } from '../db/repo.js'
import { runScoreCycle } from '../lib/runner.js'
import { buildSnapshot, opportunityScore } from '../lib/score.js'

export const brandRoutes = new Hono()

brandRoutes.get('/brands', async (c) => {
  const list = await repo().listBrands()
  return c.json({ brands: list })
})

brandRoutes.get('/brands/:id', async (c) => {
  const id = c.req.param('id')
  const r = repo()
  const brand = await r.getBrand(id)
  if (!brand) return c.json({ error: 'not_found', message: 'Brand not found' }, 404)

  const prompts = await r.listPrompts(brand.id)
  const runs = await r.latestRunsForBrand(brand.id)

  const promptStatuses: PromptWithStatus[] = prompts.map((prompt) => {
    const runMap = emptyRunMap()
    for (const run of runs) {
      if (run.promptId === prompt.id) runMap[run.platform] = run
    }
    return {
      prompt,
      runs: runMap,
      opportunityScore: opportunityScore(runMap),
    }
  })

  const current = buildSnapshot(promptStatuses, 0)
  const history = await r.scoreHistory(brand.id)

  const summary: BrandSummary = {
    brand,
    current,
    history,
  }
  return c.json({ summary, prompts: promptStatuses })
})

brandRoutes.get('/brands/:id/prompts', async (c) => {
  const id = c.req.param('id')
  const r = repo()
  const brand = await r.getBrand(id)
  if (!brand) return c.json({ error: 'not_found', message: 'Brand not found' }, 404)

  const prompts = await r.listPrompts(brand.id)
  const runs = await r.latestRunsForBrand(brand.id)

  const list: PromptWithStatus[] = prompts.map((prompt) => {
    const runMap = emptyRunMap()
    for (const run of runs) {
      if (run.promptId === prompt.id) runMap[run.platform] = run
    }
    return {
      prompt,
      runs: runMap,
      opportunityScore: opportunityScore(runMap),
    }
  })
  return c.json({ prompts: list })
})

brandRoutes.post('/brands/:id/refresh', async (c) => {
  const id = c.req.param('id')
  const brand = await repo().getBrand(id)
  if (!brand) return c.json({ error: 'not_found', message: 'Brand not found' }, 404)
  const result = await runScoreCycle(brand)
  return c.json({ snapshot: result.snapshot })
})

function emptyRunMap(): Record<Platform, PromptRun | null> {
  return Object.fromEntries(PLATFORMS.map((p) => [p, null])) as Record<
    Platform,
    PromptRun | null
  >
}
