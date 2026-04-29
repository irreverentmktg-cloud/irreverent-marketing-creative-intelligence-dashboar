import { useState } from 'react'
import { Filter, Search } from 'lucide-react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { SuggestionCard } from '@/components/SuggestionCard'
import type { PlatformStatus } from '@/components/PlatformDots'
import { cn } from '@/lib/utils'

type FilterKey = 'all' | 'not-cited' | 'competitor' | 'locked'

const FILTERS: { key: FilterKey; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: 47 },
  { key: 'not-cited', label: 'Not cited', count: 28 },
  { key: 'competitor', label: 'Competitor-owned', count: 14 },
  { key: 'locked', label: 'Locked', count: 3 },
]

interface PromptItem {
  id: string
  prompt: string
  highlight?: string
  platforms: PlatformStatus[]
  opportunity: number
  recommended: string
  chips: string[]
  locked?: boolean
  category: FilterKey[]
}

const PROMPTS: PromptItem[] = [
  {
    id: 'p1',
    prompt: 'best collagen powder for women over 40',
    highlight: 'best collagen powder',
    platforms: [
      { platform: 'ChatGPT', cited: false },
      { platform: 'Perplexity', cited: true },
      { platform: 'Gemini', cited: false },
      { platform: 'Claude', cited: false },
    ],
    opportunity: 92,
    recommended:
      'Publish a side-by-side comparison: marine vs bovine collagen for women over 40. Cite 2 peer-reviewed studies on hydrolyzed collagen + skin elasticity.',
    chips: ['Listicle', 'Comparison', '900–1200 words', 'Schema: HowTo'],
    category: ['all', 'not-cited'],
  },
  {
    id: 'p2',
    prompt: 'collagen for joint pain that actually works',
    highlight: 'joint pain',
    platforms: [
      { platform: 'ChatGPT', cited: false },
      { platform: 'Perplexity', cited: false },
      { platform: 'Gemini', cited: false },
      { platform: 'Claude', cited: false },
    ],
    opportunity: 88,
    recommended:
      'Vital Proteins owns this. Counter with a 12-week customer outcome study + before/after testimonials. Their study is from 2018 — yours can be 2026.',
    chips: ['Outcome study', 'Long-form', 'Testimonials', 'Schema: Article'],
    category: ['all', 'not-cited', 'competitor'],
  },
  {
    id: 'p3',
    prompt: 'unflavored grass-fed collagen with no fillers',
    highlight: 'unflavored grass-fed collagen',
    platforms: [
      { platform: 'ChatGPT', cited: true },
      { platform: 'Perplexity', cited: true },
      { platform: 'Gemini', cited: false },
      { platform: 'Claude', cited: false },
    ],
    opportunity: 74,
    recommended:
      'You own ChatGPT and Perplexity here. Publish a sourcing transparency page (farm partners, lot testing) to claim Gemini and Claude.',
    chips: ['Sourcing page', 'Transparency', 'Trust signals'],
    category: ['all'],
  },
  {
    id: 'p4',
    prompt: 'hydrolyzed marine collagen vs powder',
    platforms: [
      { platform: 'ChatGPT', cited: false },
      { platform: 'Perplexity', cited: false },
      { platform: 'Gemini', cited: false },
      { platform: 'Claude', cited: false },
    ],
    opportunity: 81,
    recommended: 'Educational explainer with a clear winner. Bias toward marine (your category).',
    chips: ['Explainer', '600–900 words', 'FAQ schema'],
    category: ['all', 'not-cited'],
  },
  {
    id: 'p5',
    prompt: 'is bovine collagen better than marine',
    platforms: [
      { platform: 'ChatGPT', cited: false },
      { platform: 'Perplexity', cited: false },
      { platform: 'Gemini', cited: false },
      { platform: 'Claude', cited: false },
    ],
    opportunity: 71,
    recommended: 'Owned by Vital Proteins.',
    chips: ['LOCKED'],
    locked: true,
    category: ['all', 'locked', 'competitor'],
  },
]

export function DashboardPrompts() {
  const [filter, setFilter] = useState<FilterKey>('all')
  const [search, setSearch] = useState('')

  const filtered = PROMPTS.filter(
    (p) =>
      p.category.includes(filter) &&
      (search === '' || p.prompt.toLowerCase().includes(search.toLowerCase())),
  )

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1100px] px-8 py-10">
        <div className="flex items-end justify-between">
          <div>
            <span className="kicker">YOUR PROMPT LIST</span>
            <h1 className="mt-2 text-[34px] font-bold tracking-tightest text-ink">
              47 prompts monitored
            </h1>
          </div>
          <div className="text-right">
            <div className="font-mono text-[11px] tracking-wider text-mid">SLOTS USED</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-line">
                <div className="h-full bg-ink" style={{ width: '94%' }} />
              </div>
              <span className="font-mono text-xs text-mid">47 / 50</span>
            </div>
          </div>
        </div>

        {/* filter + search */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors',
                  filter === f.key
                    ? 'border-ink bg-ink text-white'
                    : 'border-line bg-white text-mid hover:border-ink hover:text-ink',
                )}
              >
                {f.label}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 font-mono text-[10px]',
                    filter === f.key ? 'bg-white/15 text-white' : 'bg-offwhite text-mid',
                  )}
                >
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-silver"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search prompts"
                className="h-9 w-[260px] rounded-lg border border-line bg-white pl-8 pr-3 text-sm text-ink placeholder:text-silver focus:border-ink focus:outline-none"
              />
            </div>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-white px-3 text-sm text-mid hover:border-ink hover:text-ink">
              <Filter size={14} /> Filters
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="kicker">TODAY · {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}</div>
          <div className="mt-4 flex flex-col gap-5">
            {filtered.map((p) => (
              <SuggestionCard
                key={p.id}
                prompt={p.prompt}
                highlight={p.highlight}
                platforms={p.platforms}
                opportunity={p.opportunity}
                recommended={p.recommended}
                chips={p.chips}
                locked={p.locked}
                badge={
                  p.locked
                    ? 'LOCKED · UPGRADE TO UNLOCK'
                    : p.category.includes('competitor')
                      ? 'COMPETITOR-OWNED · CLAIM IT'
                      : "TODAY'S PROMPT · CLAIM FIRST"
                }
              />
            ))}
            {filtered.length === 0 && (
              <div className="card p-10 text-center text-mid">No prompts match this filter.</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
