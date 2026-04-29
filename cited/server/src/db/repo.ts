import { randomUUID } from 'node:crypto'
import type {
  Brand,
  CalibrationDraft,
  Platform,
  Prompt,
  PromptRun,
  ScoreSnapshot,
} from '@cited/shared'
import { dbAvailable } from './client.js'

// Repository abstraction. The server starts in `memory` mode if Supabase isn't
// configured, so you can demo the full loop without a DB. Wire SUPABASE_URL +
// SUPABASE_SERVICE_ROLE_KEY and the same calls automatically use Postgres.

export interface Repo {
  createBrand(draft: CalibrationDraft): Promise<Brand>
  getBrand(id: string): Promise<Brand | null>
  listBrands(): Promise<Brand[]>

  insertPrompts(
    brandId: string,
    prompts: Array<Omit<Prompt, 'id' | 'brandId' | 'createdAt'>>,
  ): Promise<Prompt[]>
  listPrompts(brandId: string): Promise<Prompt[]>

  recordRun(run: Omit<PromptRun, 'id'>): Promise<PromptRun>
  latestRunsForBrand(brandId: string): Promise<PromptRun[]>

  recordScore(brandId: string, snap: ScoreSnapshot): Promise<void>
  scoreHistory(brandId: string, limit?: number): Promise<ScoreSnapshot[]>
}

// ---- In-memory ------------------------------------------------------------

class MemoryRepo implements Repo {
  private brands = new Map<string, Brand>()
  private prompts = new Map<string, Prompt>()
  private runs = new Map<string, PromptRun>()
  private scores = new Map<string, ScoreSnapshot[]>()

  async createBrand(draft: CalibrationDraft): Promise<Brand> {
    const brand: Brand = {
      id: randomUUID(),
      ...draft,
      createdAt: new Date().toISOString(),
    }
    this.brands.set(brand.id, brand)
    return brand
  }

  async getBrand(id: string) {
    return this.brands.get(id) ?? null
  }

  async listBrands() {
    return Array.from(this.brands.values())
  }

  async insertPrompts(brandId: string, items: Array<Omit<Prompt, 'id' | 'brandId' | 'createdAt'>>) {
    const created: Prompt[] = items.map((p) => ({
      id: randomUUID(),
      brandId,
      text: p.text,
      awarenessStage: p.awarenessStage,
      createdAt: new Date().toISOString(),
    }))
    for (const p of created) this.prompts.set(p.id, p)
    return created
  }

  async listPrompts(brandId: string) {
    return Array.from(this.prompts.values()).filter((p) => p.brandId === brandId)
  }

  async recordRun(run: Omit<PromptRun, 'id'>): Promise<PromptRun> {
    const today = run.ranAt.slice(0, 10)
    const key = `${run.promptId}:${run.platform}:${today}`
    const existing = this.runs.get(key)
    const full: PromptRun = { id: existing?.id ?? randomUUID(), ...run }
    this.runs.set(key, full)
    return full
  }

  async latestRunsForBrand(brandId: string): Promise<PromptRun[]> {
    const promptIds = new Set(
      Array.from(this.prompts.values())
        .filter((p) => p.brandId === brandId)
        .map((p) => p.id),
    )
    const byKey = new Map<string, PromptRun>()
    for (const run of this.runs.values()) {
      if (!promptIds.has(run.promptId)) continue
      const key = `${run.promptId}:${run.platform}`
      const prev = byKey.get(key)
      if (!prev || run.ranAt > prev.ranAt) byKey.set(key, run)
    }
    return Array.from(byKey.values())
  }

  async recordScore(brandId: string, snap: ScoreSnapshot) {
    const list = this.scores.get(brandId) ?? []
    list.push(snap)
    this.scores.set(brandId, list)
  }

  async scoreHistory(brandId: string, limit = 30) {
    const list = this.scores.get(brandId) ?? []
    return list.slice(-limit)
  }
}

// ---- Supabase -------------------------------------------------------------
// Stub for now — same interface, fills in once Supabase is configured. Keeping
// the SQL out of this file deliberately; we'll add it when the migration runs.

class SupabaseRepo implements Repo {
  async createBrand(): Promise<Brand> {
    throw new Error('SupabaseRepo not yet implemented — running in memory mode')
  }
  async getBrand(): Promise<Brand | null> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async listBrands(): Promise<Brand[]> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async insertPrompts(): Promise<Prompt[]> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async listPrompts(): Promise<Prompt[]> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async recordRun(): Promise<PromptRun> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async latestRunsForBrand(): Promise<PromptRun[]> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async recordScore(): Promise<void> {
    throw new Error('SupabaseRepo not yet implemented')
  }
  async scoreHistory(): Promise<ScoreSnapshot[]> {
    throw new Error('SupabaseRepo not yet implemented')
  }
}

let _repo: Repo | null = null

export function repo(): Repo {
  if (_repo) return _repo
  _repo = dbAvailable() ? new SupabaseRepo() : new MemoryRepo()
  return _repo
}

export function repoMode(): 'memory' | 'supabase' {
  return dbAvailable() ? 'supabase' : 'memory'
}

// Type-only export so we can reference Platform from an import * if needed
export type { Platform }
