import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, HelpCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ScoreRing } from '@/components/ScoreRing'
import { Button } from '@/components/Button'
import { scoreColor } from '@/lib/utils'

const SCORE = 34

export function ScoreReveal() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const url = params.get('url') ?? 'bloom-collagen.com'
  const tagColor = scoreColor(SCORE)

  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-6">
        <Logo size="md" />
        <span className="kicker">STEP 2 OF 3 · YOUR FIRST SCORE</span>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-16">
        <div className="w-full max-w-[680px]">
          <div className="text-center">
            <span className="kicker">YOUR AI VISIBILITY SCORE</span>
            <h1 className="mt-3 text-[40px] font-extrabold leading-tight tracking-tightest text-ink md:text-[52px]">
              Here's where you stand.
            </h1>
          </div>

          <div className="mt-10 flex justify-center">
            <ScoreRing score={SCORE} size={220} stroke={16} animate />
          </div>

          <div className="mt-6 text-center">
            <div className="text-lg font-semibold text-ink">{url}</div>
            <div className="text-sm text-mid">Supplements · Beauty</div>
            <span
              className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] tracking-wider"
              style={{
                backgroundColor: `${tagColor}1a`,
                color: tagColor,
                border: `1px solid ${tagColor}55`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tagColor }} />
              CRITICAL — 7 GAPS
            </span>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Stat label="Prompts checked" value="50" />
            <Stat label="Cited in" value="3" sub="of 50 prompts" />
            <Stat label="Competitor avg" value="61" sub="/ 100" />
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full max-w-[360px]"
              onClick={() => navigate('/dashboard')}
            >
              See your full prompt report
              <ArrowRight size={16} />
            </Button>
            <button className="inline-flex items-center gap-1.5 text-sm text-mid hover:text-ink">
              <HelpCircle size={14} />
              What does this score mean?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card flex flex-col items-center p-5">
      <span className="kicker">{label.toUpperCase()}</span>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-[32px] font-extrabold tracking-tightest text-ink">{value}</span>
        {sub && <span className="text-xs text-mid">{sub}</span>}
      </div>
    </div>
  )
}
