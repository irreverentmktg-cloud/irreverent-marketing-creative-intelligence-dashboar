import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

type Decision = 'pending' | 'confirmed' | 'rejected'

interface Item {
  id: string
  label: string
  value: string
}

const ITEMS: Item[] = [
  { id: 'product', label: 'Product type', value: 'Marine collagen peptide supplement' },
  { id: 'claim', label: 'Primary claim', value: 'Joint health & skin elasticity' },
  { id: 'buyer', label: 'Target buyer', value: 'Women, 35–55' },
  { id: 'price', label: 'Price position', value: 'Mid-tier · value-forward' },
  { id: 'differentiator', label: 'Key differentiator', value: 'Grass-fed, unflavored, hydrolyzed' },
]

export function Calibration() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const url = params.get('url') ?? 'bloom-collagen.com'

  const [decisions, setDecisions] = useState<Record<string, Decision>>(
    Object.fromEntries(ITEMS.map((i) => [i.id, 'pending'])),
  )

  const setDecision = (id: string, d: Decision) =>
    setDecisions((prev) => ({ ...prev, [id]: prev[id] === d ? 'pending' : d }))

  const proceed = () =>
    navigate(`/score-reveal?url=${encodeURIComponent(url)}`)

  const confirmedCount = Object.values(decisions).filter((d) => d === 'confirmed').length

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Logo size="md" />
        <span className="kicker">{url.toUpperCase()}</span>
      </div>

      <div className="flex flex-1 items-start justify-center px-6 pb-20 pt-4">
        <div className="w-full max-w-[560px]">
          <div className="card p-7">
            <span className="kicker">BRAND CALIBRATION · STEP 1 OF 3</span>
            <h1 className="mt-3 text-[26px] font-bold leading-tight tracking-tight text-ink">
              We scanned your site. Confirm what we found.
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-mid">
              Tap <Check className="inline align-text-bottom" size={13} /> to confirm or{' '}
              <X className="inline align-text-bottom" size={13} /> to remove. We'll use this to
              find the right prompts for you.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {ITEMS.map((item) => {
                const decision = decisions[item.id]
                return (
                  <li
                    key={item.id}
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
                      <div className="kicker !text-[10px]">{item.label.toUpperCase()}</div>
                      <div
                        className={cn(
                          'mt-0.5 truncate text-sm',
                          decision === 'rejected'
                            ? 'text-mid line-through decoration-score-critical/40'
                            : 'text-rich',
                        )}
                      >
                        {item.value}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDecision(item.id, 'rejected')}
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
                        onClick={() => setDecision(item.id, 'confirmed')}
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
                {confirmedCount}/{ITEMS.length} CONFIRMED
              </span>
              <span className="font-mono tracking-wider">~30 SEC TO BUILD LIST</span>
            </div>

            <Button onClick={proceed} variant="primary" size="lg" className="mt-5 w-full">
              Build My Prompt List
              <ArrowRight size={16} />
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
