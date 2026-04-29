import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Check, Loader2 } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'

const STEPS = [
  'Scanning site content',
  'Identifying product category',
  'Building your prompt list',
]

export function Analyzing() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const url = params.get('url') ?? 'bloom-collagen.com'
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    const timers: number[] = []
    timers.push(window.setTimeout(() => setStepIdx(1), 1100))
    timers.push(window.setTimeout(() => setStepIdx(2), 2300))
    timers.push(window.setTimeout(() => setStepIdx(3), 3600))
    timers.push(
      window.setTimeout(() => {
        navigate(`/calibration?url=${encodeURIComponent(url)}`)
      }, 4200),
    )
    return () => timers.forEach((t) => clearTimeout(t))
  }, [navigate, url])

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Logo size="md" />
        <span className="kicker">ANALYZING</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-[560px]">
          <div className="text-center">
            <span className="kicker">ANALYZING</span>
            <h1 className="mt-3 text-[28px] font-bold tracking-tight text-ink">
              Analyzing{' '}
              <span className="chrome-text font-extrabold">{url}</span>
            </h1>
            <p className="mt-2 text-sm text-mid">
              We're checking 50+ prompts across ChatGPT, Perplexity, and Gemini
              for your category.
            </p>
          </div>

          <div className="card mt-10 p-8">
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-line">
              <div className="chrome-shimmer-bar absolute inset-0" />
            </div>

            <ul className="mt-8 flex flex-col gap-3">
              {STEPS.map((s, i) => {
                const done = i < stepIdx
                const active = i === stepIdx
                return (
                  <li
                    key={s}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors',
                      done
                        ? 'border-line bg-white'
                        : active
                          ? 'border-line bg-offwhite'
                          : 'border-line bg-white opacity-60',
                    )}
                  >
                    <span
                      className={cn(
                        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                        done
                          ? 'bg-score-good/15 text-score-good'
                          : active
                            ? 'bg-ink text-white'
                            : 'bg-line text-mid',
                      )}
                    >
                      {done ? (
                        <Check size={13} strokeWidth={3} />
                      ) : active ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <span className="font-mono text-[11px]">{i + 1}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'text-sm',
                        done
                          ? 'text-mid line-through decoration-line'
                          : active
                            ? 'font-semibold text-ink'
                            : 'text-mid',
                      )}
                    >
                      {s}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-6 text-center font-mono text-[11px] tracking-wider text-silver">
            DO NOT CLOSE THIS WINDOW
          </div>
        </div>
      </div>
    </div>
  )
}
