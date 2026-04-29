import { useState } from 'react'
import { Mail, Plus, Slack, UserPlus } from 'lucide-react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

interface ProfileField {
  label: string
  value: string
}

const PROFILE_FIELDS: ProfileField[] = [
  { label: 'Brand name', value: 'Bloom Collagen' },
  { label: 'Website', value: 'bloom-collagen.com' },
  { label: 'Product type', value: 'Marine collagen peptide supplement' },
  { label: 'Primary claim', value: 'Joint health & skin elasticity' },
  { label: 'Target buyer', value: 'Women, 35–55' },
  { label: 'Price position', value: 'Mid-tier · value-forward' },
  { label: 'Differentiator', value: 'Grass-fed, unflavored, hydrolyzed' },
]

const TEAM = [
  { name: 'Jake McKenzie', email: 'jake@bloomcollagen.com', role: 'Owner' },
  { name: 'Maya Rivera', email: 'maya@bloomcollagen.com', role: 'Editor' },
]

export function DashboardSettings() {
  const [notifications, setNotifications] = useState({
    daily: true,
    citation: true,
    competitor: true,
    weekly: false,
    slack: false,
  })

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1100px] px-8 py-10">
        <div>
          <span className="kicker">SETTINGS</span>
          <h1 className="mt-2 text-[34px] font-bold tracking-tightest text-ink">
            Brand & account
          </h1>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* LEFT */}
          <div className="flex flex-col gap-8">
            {/* Profile */}
            <section className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="kicker">BRAND PROFILE</span>
                  <h2 className="mt-1 text-[18px] font-semibold text-ink">
                    Calibration data
                  </h2>
                </div>
                <Button variant="ghost" size="sm">
                  Re-scan site
                </Button>
              </div>
              <ul className="mt-5 divide-y divide-line">
                {PROFILE_FIELDS.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="kicker !text-[10px]">{f.label.toUpperCase()}</div>
                      <div className="mt-0.5 truncate text-sm text-rich">{f.value}</div>
                    </div>
                    <button className="text-sm text-mid hover:text-ink">Edit</button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Notifications */}
            <section className="card p-6">
              <span className="kicker">NOTIFICATIONS</span>
              <h2 className="mt-1 text-[18px] font-semibold text-ink">
                What we email you about
              </h2>
              <div className="mt-5 flex flex-col divide-y divide-line">
                <Toggle
                  label="Daily prompt digest"
                  description="One email each morning with today's high-opportunity prompt."
                  checked={notifications.daily}
                  onChange={(v) => setNotifications((n) => ({ ...n, daily: v }))}
                />
                <Toggle
                  label="Citation alerts"
                  description="The moment ChatGPT, Perplexity or Gemini cite you."
                  checked={notifications.citation}
                  onChange={(v) => setNotifications((n) => ({ ...n, citation: v }))}
                />
                <Toggle
                  label="Competitor moves"
                  description="When a tracked brand claims a new prompt."
                  checked={notifications.competitor}
                  onChange={(v) => setNotifications((n) => ({ ...n, competitor: v }))}
                />
                <Toggle
                  label="Weekly recap"
                  description="Friday afternoon — what changed in your category."
                  checked={notifications.weekly}
                  onChange={(v) => setNotifications((n) => ({ ...n, weekly: v }))}
                />
                <Toggle
                  label="Slack alerts"
                  description={
                    <span className="inline-flex items-center gap-1.5">
                      <Slack size={12} />
                      Pipe alerts into your team workspace.
                    </span>
                  }
                  checked={notifications.slack}
                  onChange={(v) => setNotifications((n) => ({ ...n, slack: v }))}
                />
              </div>
            </section>

            {/* Team */}
            <section className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="kicker">TEAM</span>
                  <h2 className="mt-1 text-[18px] font-semibold text-ink">Members</h2>
                </div>
                <Button variant="chrome" size="sm">
                  <UserPlus size={14} /> Invite
                </Button>
              </div>
              <ul className="mt-5 divide-y divide-line">
                {TEAM.map((m) => (
                  <li
                    key={m.email}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-offwhite text-sm font-semibold text-ink">
                        {m.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink">{m.name}</div>
                        <div className="text-xs text-mid">{m.email}</div>
                      </div>
                    </div>
                    <span className="rounded-full border border-line bg-offwhite px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mid">
                      {m.role}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* RIGHT */}
          <aside className="flex flex-col gap-6">
            <div className="card p-6">
              <span className="kicker">PLAN</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-[28px] font-extrabold tracking-tightest text-ink">
                  Starter
                </span>
                <span className="text-mid">$99/mo</span>
              </div>
              <p className="mt-1 text-xs text-mid">Renews May 28, 2026.</p>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="kicker">PROMPT SLOTS</span>
                  <span className="font-mono text-[11px] text-mid">47 / 50</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-ink" style={{ width: '94%' }} />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="kicker">CONTENT DRAFTS</span>
                  <span className="font-mono text-[11px] text-mid">3 / 5</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-ink" style={{ width: '60%' }} />
                </div>
              </div>

              <Button variant="primary" size="md" className="mt-6 w-full">
                Upgrade to Growth
              </Button>
              <button className="mt-2 w-full text-xs text-mid hover:text-ink">
                Manage billing
              </button>
            </div>

            <div className="card p-6">
              <span className="kicker">QUICK ACTIONS</span>
              <div className="mt-3 flex flex-col gap-2">
                <button className="inline-flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-sm text-rich hover:border-ink hover:text-ink">
                  <span className="inline-flex items-center gap-2">
                    <Plus size={14} /> Add a prompt
                  </span>
                  <span className="font-mono text-[11px] text-mid">3 left</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm text-rich hover:border-ink hover:text-ink">
                  <Mail size={14} /> Email this report
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  )
}

interface ToggleProps {
  label: string
  description: React.ReactNode
  checked: boolean
  onChange: (value: boolean) => void
}

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <div>
        <div className="text-sm font-medium text-ink">{label}</div>
        <div className="mt-0.5 text-xs text-mid">{description}</div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          checked ? 'bg-ink' : 'bg-line',
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  )
}
