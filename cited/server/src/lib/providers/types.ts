import type { Platform } from '@cited/shared'

export interface ProviderQueryResult {
  platform: Platform
  available: boolean
  answer: string | null
  citedSources: string[]
  competitorBrands: string[]
  ranAt: string
}

export interface LLMProvider {
  platform: Platform
  available: boolean
  ask(prompt: string): Promise<ProviderQueryResult>
}

export function unavailableResult(platform: Platform): ProviderQueryResult {
  return {
    platform,
    available: false,
    answer: null,
    citedSources: [],
    competitorBrands: [],
    ranAt: new Date().toISOString(),
  }
}
