import { ArrowRight, ExternalLink } from 'lucide-react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { ScoreRing } from '@/components/ScoreRing'

interface Competitor {
  brand: string
  score: number
  prompts: number
  topPrompt: string
}

const COMPETITORS: Competitor[] = [
  { brand: 'Vital Proteins', score: 82, prompts: 28, topPrompt: 'best collagen for joint pain' },
  { brand: 'Ancient Nutrition', score: 71, prompts: 19, topPrompt: 'multi-collagen protein' },
  { brand: 'Sports Research', score: 68, prompts: 14, topPrompt: 'hydrolyzed collagen peptides' },
  { brand: 'NeoCell', score: 54, prompts: 9, topPrompt: 'super collagen + C tablets' },
  { brand: 'Garden of Life', score: 49, prompts: 8, topPrompt: 'organic grass-fed collagen' },
  { brand: 'Bloom Collagen', score: 34, prompts: 3, topPrompt: 'unflavored marine collagen' },
]

const GAPS: { prompt: string; owner: string }[] = [
  { prompt: 'best collagen for joint pain', owner: 'Vital Proteins' },
  { prompt: 'collagen powder for hair growth', owner: 'Ancient Nutrition' },
  { prompt: 'is hydrolyzed collagen worth it', owner: 'Vital Proteins' },
  { prompt: 'multi-collagen vs single source', owner: 'Sports Research' },
  { prompt: 'collagen for menopause symptoms', owner: 'Ancient Nutrition' },
  { prompt: 'best clean-label collagen', owner: 'Garden of Life' },
]

export function DashboardCompetitors() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1100px] px-8 py-10">
        <div>
          <span className="kicker">COMPETITOR LANDSCAPE</span>
          <h1 className="mt-2 text-[34px] font-bold tracking-tightest text-ink">
            Supplements · Beauty
          </h1>
          <p className="mt-1 text-sm text-mid">
            6 brands tracked. Updated daily as AI models re-index your category.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COMPETITORS.map((c) => {
            const isYou = c.brand === 'Bloom Collagen'
            return (
              <div
                key={c.brand}
                className={
                  'card relative flex flex-col p-6 ' + (isYou ? 'ring-2 ring-ink' : '')
                }
              >
                {isYou && (
                  <span className="absolute -top-3 left-5 inline-flex items-center rounded-full bg-ink px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
                    You
                  </span>
                )}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="kicker">BRAND</div>
                    <h3 className="mt-1 text-[18px] font-semibold text-ink">{c.brand}</h3>
                  </div>
                  <ScoreRing score={c.score} size={64} stroke={6} animate={false} showLabel={false} />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4">
                  <div>
                    <div className="kicker">PROMPTS OWNED</div>
                    <div className="mt-1 text-xl font-bold text-ink">{c.prompts}</div>
                  </div>
                  <div>
                    <div className="kicker">SCORE</div>
                    <div className="mt-1 text-xl font-bold text-ink">{c.score}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="kicker">TOP PROMPT</div>
                  <p className="mt-1 line-clamp-2 text-sm text-rich">"{c.topPrompt}"</p>
                </div>

                {!isYou && (
                  <button className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm text-mid hover:border-ink hover:text-ink">
                    <ExternalLink size={13} />
                    View their playbook
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-12">
          <span className="kicker">PROMPT GAPS</span>
          <h2 className="mt-2 text-[24px] font-semibold text-ink">
            Prompts your competitors own that you don't.
          </h2>

          <div className="card mt-5 divide-y divide-line">
            {GAPS.map((g) => (
              <div
                key={g.prompt}
                className="flex items-center justify-between gap-6 px-6 py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-medium text-ink">"{g.prompt}"</div>
                  <div className="mt-1 font-mono text-[11px] tracking-wider text-mid">
                    OWNED BY · {g.owner.toUpperCase()}
                  </div>
                </div>
                <button className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white hover:bg-rich">
                  Claim it
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
