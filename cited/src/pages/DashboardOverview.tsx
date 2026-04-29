import { ArrowRight, Bell, Flame, TrendingDown, TrendingUp } from 'lucide-react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { SuggestionCard } from '@/components/SuggestionCard'
import { cn } from '@/lib/utils'

export function DashboardOverview() {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1100px] px-8 py-10">
        {/* header */}
        <div className="flex items-end justify-between">
          <div>
            <span className="kicker">{date.toUpperCase()}</span>
            <h1 className="mt-2 text-[34px] font-bold tracking-tightest text-ink">
              Good morning, Jake.
            </h1>
            <p className="mt-1 text-sm text-mid">
              Your score moved <span className="text-score-good">+4</span> overnight.
              You were cited in 2 new prompts.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm text-mid hover:border-ink hover:text-ink">
            <Bell size={14} />
            3 alerts
          </button>
        </div>

        <div className="mt-8">
          <SuggestionCard
            badge="TODAY'S PROMPT · CLAIM FIRST"
            prompt="best collagen powder for women over 40"
            highlight="best collagen powder"
            platforms={[
              { platform: 'ChatGPT', cited: false },
              { platform: 'Perplexity', cited: true },
              { platform: 'Gemini', cited: false },
              { platform: 'Claude', cited: false },
            ]}
            opportunity={92}
            recommended="Publish a comparison post: 'Marine vs bovine collagen for women over 40.' Cite 2 peer-reviewed studies on hydrolyzed collagen + skin elasticity. ChatGPT pulls cited authority links 3x more often than uncited."
            chips={['Listicle', 'Comparison', '900–1200 words', 'Schema: HowTo', 'Cite 2 studies']}
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <AlertCard
            kind="good"
            title="You were cited in ChatGPT"
            body="Your blog 'How marine collagen supports joint health' was cited in 3 new prompts overnight."
            time="2h ago"
          />
          <AlertCard
            kind="warning"
            title="Vital Proteins claimed 2 prompts"
            body="They published a clinical study summary. They now own 'collagen for joint pain'."
            time="6h ago"
          />
          <StreakCard days={7} />
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="kicker">RECENT MOVEMENT</span>
              <h2 className="mt-1 text-[20px] font-semibold text-ink">
                Prompts that moved this week
              </h2>
            </div>
            <a className="inline-flex items-center gap-1 text-sm text-mid hover:text-ink" href="/dashboard/prompts">
              View all <ArrowRight size={14} />
            </a>
          </div>

          <div className="card mt-4 divide-y divide-line">
            {MOVEMENTS.map((m) => (
              <MovementRow key={m.prompt} {...m} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

interface AlertProps {
  kind: 'good' | 'warning'
  title: string
  body: string
  time: string
}

function AlertCard({ kind, title, body, time }: AlertProps) {
  const color = kind === 'good' ? '#22c55e' : '#f59e0b'
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wider"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {kind === 'good' ? 'CITATION' : 'COMPETITOR'}
        </span>
        <span className="font-mono text-[10px] text-silver">{time.toUpperCase()}</span>
      </div>
      <h3 className="mt-3 text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-1 text-sm text-mid">{body}</p>
    </div>
  )
}

function StreakCard({ days }: { days: number }) {
  const bars = Array.from({ length: 7 }, (_, i) => i < days)
  return (
    <div className="card flex flex-col p-5">
      <div className="flex items-center justify-between">
        <span className="kicker">DAY STREAK</span>
        <Flame size={16} className="text-mid" />
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-[36px] font-extrabold tracking-tightest text-ink">{days}</span>
        <span className="text-mid">days</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {bars.map((on, i) => (
          <div
            key={i}
            className={cn(
              'h-8 rounded-sm transition-colors',
              on ? 'bg-ink' : 'bg-line',
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-xs text-mid">
        Show up daily. Compound your AI authority.
      </p>
    </div>
  )
}

interface Movement {
  prompt: string
  delta: number
  before: string
  after: string
}

const MOVEMENTS: Movement[] = [
  { prompt: 'best collagen for joint pain', delta: +12, before: 'Not cited', after: 'Cited · Perplexity' },
  { prompt: 'unflavored marine collagen', delta: +6, before: 'Cited · Perplexity', after: 'Cited · Perplexity, Gemini' },
  { prompt: 'is hydrolyzed collagen worth it', delta: -3, before: 'Cited · ChatGPT', after: 'Lost · Vital claimed it' },
  { prompt: 'cheapest grass-fed collagen', delta: +9, before: 'Not cited', after: 'Cited · ChatGPT' },
]

function MovementRow({ prompt, delta, before, after }: Movement) {
  const positive = delta >= 0
  const Icon = positive ? TrendingUp : TrendingDown
  const color = positive ? '#22c55e' : '#ef4444'
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium text-ink">{prompt}</div>
        <div className="mt-1 truncate font-mono text-[11px] tracking-wider text-mid">
          {before.toUpperCase()} → {after.toUpperCase()}
        </div>
      </div>
      <div
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[11px] tracking-wider"
        style={{ backgroundColor: `${color}1a`, color }}
      >
        <Icon size={12} />
        {positive ? '+' : ''}
        {delta}
      </div>
    </div>
  )
}
