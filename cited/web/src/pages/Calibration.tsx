import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, Loader2, X } from 'lucide-react'
import type { CalibrationDraft } from '@cited/shared'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { api, ApiCallError } from '@/lib/api'
import { loadDraft, saveBrandId } from '@/lib/onboarding'
import { cn } from '@/lib/utils'

type Decision = 'pending' | 'confirmed' | 'rejected'
type FieldKey = Exclude<keyof CalibrationDraft, 'url' | 'name'>

const FIELDS: Array<{ key: FieldKey; label: string }> = [
  { key: 'productType', label: 'Product type' },
  { key: 'primaryClaim', label: 'Primary claim' },
  { key: 'targetBuyer', label: 'Target buyer' },
  { key: 'pricePosition', label: 'Price position' },
  { key: 'differentiator', label: 'Key differentiator' },
]

export function Calibration() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const url = params.get('url') ?? ''
  const draft = useMemo(() => loadDraft(), [])

  const [decisions, setDecisions] = useState<Record<FieldKey, Decision>>(() =>
    Object.fromEntries(FIELDS.map((f) => [f.key, 'pending'])) as Record<
      FieldKey,
      Decision
    >,
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!draft) navigate(`/?url=${encodeURIComponent(url)}`, { replace: true })
  }, [draft, navigate, url])

  if (!draft) return null

  const setDecision = (key: FieldKey, d: Decision) =>
    setDecisions((prev) => ({ ...prev, [key]: prev[key] === d ? 'pending' : d }))

  const confirmedCount = Object.values(decisions).filter(
    (d) => d === 'confirmed',
  ).length

  async function proceed() {
    setSubmitting(true)
    setError(null)
    try {
      const confirmedFields: Array<keyof CalibrationDraft> = FIELDS.filter(
        (f) => decisions[f.key] !== 'rejected',
      ).map((f) => f.key)
      const { brand } = await api.createBrand(draft!, confirmedFields)
      saveBrandId(brand.id)
      navigate('/score-reveal')
    } catch (err) {
      setError(
        err instanceof ApiCallError
          ? err.message
          : 'Something went wrong building your prompt list. Try again?',
      )
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Logo size="md" />
        <span className="kicker">{(draft.url || url).toUpperCase()}</span>
      </div>

      <div className="flex flex-1 items-start justify-center px-6 pb-20 pt-4">
        <div className="w-full max-w-[560px]">
          <div className="card p-7">
            <span className="kicker">BRAND CALIBRATION · STEP 1 OF 3</span>
            <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-tight text-ink">
              We scanned your site. Confirm what we found.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-mid">
              Tap <Check className="inline align-text-bottom" size={13} /> to
              confirm or <X className="inline align-text-bottom" size={13} /> to
              remove. We'll use this to find the right prompts for you.
            </p>

            <div className="mt-5 flex items-baseline gap-2 rounded-lg bg-offwhite px-4 py-3">
              <span className="kicker !text-[10px]">BRAND</span>
              <span className="text-sm font-semibold text-ink">{draft.name}</span>
              <span className="ml-auto text-xs text-mid">{draft.category}</span>
            </div>

            <ul className="mt-4 flex flex-col gap-3">
              {FIELDS.map((f) => {
                const decision = decisions[f.key]
                const value = draft[f.key]
                return (
                  <li
                    key={f.key}
                    className={cn(
                      'flex items-center gap-3 rounded-[9px] border bg-[#f8f8f8] px-4 py-3 transition-colors',
                      decision === 'confirmed' &&
                        'border-score-good/40 bg-score-good/5',
                      decision === 'rejected' &&
                        'border-score-critical/40 bg-score-critical/5 opacity-70',
                      decision === 'pending' && 'border-line',
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="kicker !text-[10px]">
                        {f.label.toUpperCase()}
                      </div>
                      <div
                        className={cn(
                          'mt-0.5 truncate text-sm',
                          decision === 'rejected'
                            ? 'text-mid line-through decoration-score-critical/40'
                            : 'text-rich',
                        )}
                      >
                        {value}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDecision(f.key, 'rejected')}
                        aria-label="Remove"
                        className={cn(
                          'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                          decision === 'rejected'
                            ? 'border-score-critical bg-score-critical/10 text-score-critical'
                            : 'border-line bg-white text-mid hover:border-score-critical hover:text-score-critical',
                        )}
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecision(f.key, 'confirmed')}
                        aria-label="Confirm"
                        className={cn(
                          'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                          decision === 'confirmed'
                            ? 'border-score-good bg-score-good/10 text-score-good'
                            : 'border-line bg-white text-mid hover:border-score-good hover:text-score-good',
                        )}
                      >
                        <Check size={14} strokeWidth={3} />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex items-center justify-between text-xs text-mid">
              <span className="font-mono tracking-wider">
                {confirmedCount}/{FIELDS.length} CONFIRMED
              </span>
              <span className="font-mono tracking-wider">
                ~30 SEC TO BUILD LIST
              </span>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-score-critical/30 bg-score-critical/5 px-4 py-3 text-sm text-score-critical">
                {error}
              </div>
            )}

            <Button
              onClick={proceed}
              variant="primary"
              size="lg"
              className="mt-5 w-full"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating prompt list...
                </>
              ) : (
                <>
                  Build My Prompt List
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-mid">
            Step 1 of 3 · You can edit these any time in Settings.
          </p>
        </div>
      </div>
    </div>
  )
}
