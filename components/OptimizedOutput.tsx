'use client';

import { OptimizationOutput, LaunchTest } from '@/lib/types';

interface Props {
  output: OptimizationOutput;
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-black uppercase tracking-widest text-violet-400 mb-5 border-b border-zinc-800 pb-3">
      {children}
    </h2>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 8 ? 'text-emerald-400' : score >= 6 ? 'text-amber-400' : 'text-rose-400';
  const bg =
    score >= 8 ? 'bg-emerald-400' : score >= 6 ? 'bg-amber-400' : 'bg-rose-400';
  return (
    <div className="flex items-center gap-6">
      <span className={`text-7xl font-black tabular-nums ${color}`}>{score}</span>
      <div className="flex flex-col gap-2 flex-1">
        <div className="text-zinc-400 text-sm font-medium">Control Score / 10</div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${bg}`} style={{ width: `${score * 10}%` }} />
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }: { priority: LaunchTest['priority'] }) {
  if (priority === 'launch_first') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold rounded-full">
        <span className="w-2 h-2 bg-red-500 rounded-full" />
        Launch First
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold rounded-full">
      <span className="w-2 h-2 bg-orange-500 rounded-full" />
      Test Second
    </span>
  );
}

const SECTION_COLORS: Record<string, string> = {
  HOOK: 'border-violet-500 bg-violet-500/5',
  SETUP: 'border-blue-500 bg-blue-500/5',
  TURN: 'border-amber-500 bg-amber-500/5',
  'PRODUCT MOMENT': 'border-emerald-500 bg-emerald-500/5',
  'CLOSE A': 'border-rose-500 bg-rose-500/5',
  'CLOSE B': 'border-pink-500 bg-pink-500/5',
};

function getRewriteSectionStyle(label: string): string {
  const key = Object.keys(SECTION_COLORS).find(k => label.toUpperCase().startsWith(k));
  return key ? SECTION_COLORS[key] : 'border-zinc-600 bg-zinc-800/50';
}

export default function OptimizedOutput({ output }: Props) {
  const { metadata, controlAudit, rewrite, whatChangedAndWhy, hookVariations, productionNotes, launchRecommendation } = output;

  const copyMarkdown = () => {
    const md = buildMarkdown(output);
    navigator.clipboard.writeText(md).catch(() => {});
  };

  return (
    <div className="space-y-8 print:space-y-6">
      {/* ── Header ── */}
      <div className="border-b border-zinc-800 pb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-100 leading-tight">
              {metadata.brand}
              <span className="text-zinc-600 mx-2">—</span>
              <span className="text-zinc-300">{metadata.control}</span>
            </h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-zinc-400">
              <span>Date: {metadata.date}</span>
              <span>ICP: {metadata.icp}</span>
              <span>Stage: {metadata.stageOfAwareness}</span>
              <span className="text-violet-400 font-medium">↑ {metadata.platform}</span>
            </div>
          </div>
          <button
            onClick={copyMarkdown}
            className="shrink-0 flex items-center gap-2 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
            Copy
          </button>
        </div>
      </div>

      {/* ── Control Audit ── */}
      <section>
        <SectionHeader>Control Audit</SectionHeader>
        <Card className="mb-5">
          <p className="text-xs text-zinc-500 mb-3 font-mono">
            Original Script — verbatim · ~{controlAudit.wordCount} words · est. {controlAudit.estimatedRuntime}
          </p>
          <p className="text-sm text-zinc-300 leading-loose font-mono whitespace-pre-wrap">
            &ldquo;{controlAudit.originalScript}&rdquo;
          </p>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">What&apos;s Working</h3>
            </div>
            <div className="space-y-3">
              {controlAudit.whatsWorking.map((item, i) => (
                <div key={i} className="pl-3 border-l-2 border-emerald-500/40">
                  <p className="text-sm font-bold text-zinc-200">{item.element}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400">What&apos;s Bloated</h3>
            </div>
            <div className="space-y-3">
              {controlAudit.whatsBloated.map((item, i) => (
                <div key={i} className="pl-3 border-l-2 border-rose-500/40">
                  <p className="text-sm font-bold text-zinc-200">{item.element}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <ScoreBar score={controlAudit.score} />
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed italic">{controlAudit.scoreRationale}</p>
        </Card>
      </section>

      {/* ── Rewrite ── */}
      <section>
        <SectionHeader>Rewrite — Concise Version</SectionHeader>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-400 mb-5 font-mono">
          <span>Target: <span className="text-zinc-200">{rewrite.targetRuntime}</span></span>
          <span>Words: <span className="text-zinc-200">{rewrite.wordCount}</span></span>
          <span>Format: <span className="text-zinc-200">{rewrite.format}</span></span>
        </div>
        <div className="space-y-3">
          {rewrite.sections.map((section, i) => (
            <div
              key={i}
              className={`border-l-4 rounded-r-xl px-5 py-4 ${getRewriteSectionStyle(section.label)}`}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-300">
                  {section.label}
                </span>
                <span className="text-xs text-zinc-500 font-mono">{section.timing}</span>
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed">&ldquo;{section.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What Changed ── */}
      <section>
        <SectionHeader>What Changed and Why</SectionHeader>
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 w-1/4">Original</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 w-1/4">Rewrite</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Rationale</th>
              </tr>
            </thead>
            <tbody>
              {whatChangedAndWhy.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-zinc-900/50' : ''}>
                  <td className="px-4 py-3 text-zinc-400 text-xs align-top font-mono">{row.original}</td>
                  <td className="px-4 py-3 text-emerald-400 text-xs align-top font-mono">{row.rewrite}</td>
                  <td className="px-4 py-3 text-zinc-300 text-xs align-top leading-relaxed">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Hook Variations ── */}
      <section>
        <SectionHeader>Hook Variations — A/B Test Battery</SectionHeader>
        <p className="text-xs text-zinc-500 mb-5">
          All three hooks use the same body copy (rewrite above). One variable changed: the opening 3 seconds.
        </p>
        <div className="space-y-4">
          {hookVariations.map((hook) => {
            const isFirst = hook.id === 'A';
            return (
              <Card key={hook.id} className={isFirst ? 'border-red-500/30' : 'border-orange-500/20'}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500 mr-2">
                      Hook {hook.id}
                    </span>
                    <span className="text-sm font-bold text-zinc-200">— {hook.name}</span>
                  </div>
                  <PriorityBadge priority={isFirst ? 'launch_first' : 'test_second'} />
                </div>
                <blockquote className="text-base font-medium text-white leading-snug mb-4 pl-4 border-l-2 border-violet-500">
                  &ldquo;{hook.hook}&rdquo;
                </blockquote>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Why it works</span>
                    <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{hook.whyItWorks}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Psychological mechanism</span>
                    <p className="text-sm text-zinc-300 mt-1 leading-relaxed">{hook.psychologicalMechanism}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── Production Notes ── */}
      <section>
        <SectionHeader>Production Notes</SectionHeader>
        <Card>
          <div className="space-y-4">
            {[
              { label: 'Format', value: productionNotes.format },
              { label: 'Creator Profile', value: productionNotes.creatorProfile },
              { label: 'Delivery', value: productionNotes.delivery },
              { label: 'On-Screen Text', value: productionNotes.onScreenText },
              { label: 'Product Moment', value: productionNotes.productMoment },
              { label: 'End Card', value: productionNotes.endCard },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4 text-sm">
                <span className="shrink-0 text-zinc-500 font-bold w-36">{label}</span>
                <span className="text-zinc-300 leading-relaxed">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── Launch Recommendation ── */}
      <section>
        <SectionHeader>Launch Recommendation</SectionHeader>
        <div className="overflow-x-auto rounded-xl border border-zinc-800 mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Test</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Hook</th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Priority</th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Budget</th>
              </tr>
            </thead>
            <tbody>
              {launchRecommendation.tests.map((test, i) => (
                <tr key={test.hookId} className={i % 2 === 0 ? 'bg-zinc-900/50' : ''}>
                  <td className="px-4 py-3 font-bold text-zinc-200">Hook {test.hookId}</td>
                  <td className="px-4 py-3">
                    <p className="text-zinc-200 font-medium">{test.hookName}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{test.hookDescription}</p>
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={test.priority} />
                    <p className="text-zinc-500 text-xs mt-1">{test.priorityLabel}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-zinc-200">{test.budgetPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">
          {launchRecommendation.budgetSplitNote}
        </p>
      </section>

      {/* ── Footer ── */}
      <div className="pt-6 border-t border-zinc-800 text-center">
        <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">
          Produced from Ambrosia Creative Intelligence Pipeline
        </p>
        <p className="text-xs text-zinc-700 mt-1">Pipeline date: {metadata.date}</p>
      </div>
    </div>
  );
}

function buildMarkdown(o: OptimizationOutput): string {
  const { metadata: m, controlAudit: ca, rewrite: rw, whatChangedAndWhy, hookVariations, productionNotes: pn, launchRecommendation: lr } = o;
  const lines: string[] = [
    `# ${m.brand} — ${m.control}`,
    `**Date:** ${m.date} | **ICP:** ${m.icp} | **Stage:** ${m.stageOfAwareness} | **Platform:** ${m.platform}`,
    '',
    '---',
    '## CONTROL AUDIT',
    `**Original Script (~${ca.wordCount} words / est. ${ca.estimatedRuntime})**`,
    `> ${ca.originalScript}`,
    '',
    '**What\'s Working:**',
    ...ca.whatsWorking.map(i => `- **${i.element}** — ${i.explanation}`),
    '',
    '**What\'s Bloated:**',
    ...ca.whatsBloated.map(i => `- **${i.element}** — ${i.explanation}`),
    '',
    `**Control Score: ${ca.score}/10** — ${ca.scoreRationale}`,
    '',
    '---',
    `## REWRITE — CONCISE VERSION`,
    `*Target: ${rw.targetRuntime} | ${rw.wordCount} | ${rw.format}*`,
    '',
    ...rw.sections.flatMap(s => [`**[${s.label} — ${s.timing}]**`, `"${s.content}"`, '']),
    '---',
    '## WHAT CHANGED AND WHY',
    '| Original | Rewrite | Rationale |',
    '|---|---|---|',
    ...whatChangedAndWhy.map(r => `| ${r.original} | ${r.rewrite} | ${r.rationale} |`),
    '',
    '---',
    '## HOOK VARIATIONS — A/B TEST BATTERY',
    ...hookVariations.flatMap(h => [
      `### Hook ${h.id} — ${h.name}`,
      `> "${h.hook}"`,
      '',
      `**Why it works:** ${h.whyItWorks}`,
      '',
      `**Psychological mechanism:** ${h.psychologicalMechanism}`,
      '',
    ]),
    '---',
    '## PRODUCTION NOTES',
    `- **Format:** ${pn.format}`,
    `- **Creator Profile:** ${pn.creatorProfile}`,
    `- **Delivery:** ${pn.delivery}`,
    `- **On-Screen Text:** ${pn.onScreenText}`,
    `- **Product Moment:** ${pn.productMoment}`,
    `- **End Card:** ${pn.endCard}`,
    '',
    '---',
    '## LAUNCH RECOMMENDATION',
    '| Test | Hook | Priority | Budget |',
    '|---|---|---|---|',
    ...lr.tests.map(t => `| Hook ${t.hookId} | ${t.hookName} | ${t.priorityLabel} | ${t.budgetPercent}% |`),
    '',
    lr.budgetSplitNote,
    '',
    '---',
    '*Produced from Ambrosia Creative Intelligence Pipeline*',
    `*Pipeline date: ${m.date}*`,
  ];
  return lines.join('\n');
}
