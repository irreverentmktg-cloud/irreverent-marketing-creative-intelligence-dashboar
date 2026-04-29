import { useEffect, useState } from 'react'
import type { BrandSummary, PromptWithStatus } from '@cited/shared'
import { api } from './api'
import { loadBrandId } from './onboarding'

export interface BrandData {
  summary: BrandSummary
  prompts: PromptWithStatus[]
}

export type BrandState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ready'; data: BrandData }
  | { kind: 'error'; message: string }

// Loads the current onboarded brand from the API, or returns 'idle' if no
// brand is in sessionStorage. Pages use 'idle' as the signal to fall back to
// demo data.
export function useBrand(): BrandState {
  const [state, setState] = useState<BrandState>(() =>
    loadBrandId() ? { kind: 'loading' } : { kind: 'idle' },
  )

  useEffect(() => {
    const id = loadBrandId()
    if (!id) return

    let cancelled = false
    api
      .getBrand(id)
      .then(({ summary, prompts }) => {
        if (cancelled) return
        setState({ kind: 'ready', data: { summary, prompts } })
      })
      .catch((err) => {
        if (cancelled) return
        setState({
          kind: 'error',
          message: err instanceof Error ? err.message : 'Failed to load brand',
        })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
