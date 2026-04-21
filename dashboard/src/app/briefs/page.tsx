import { briefs } from "@/lib/data";
import { FileText, CheckCircle, Archive, Target } from "lucide-react";

const statusIcons = {
  active: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  template: { icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  archived: { icon: Archive, color: "text-gray-400", bg: "bg-gray-500/10 border-gray-700" },
};

export default function BriefsPage() {
  const active = briefs.filter((b) => b.status === "active");
  const templates = briefs.filter((b) => b.status === "template");

  return (
    <div data-testid="briefs-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Briefs</h1>
        <p className="text-gray-400 text-sm mt-1">
          Campaign briefs and templates for FORGE
        </p>
      </div>

      <section aria-labelledby="active-briefs" className="mb-8">
        <h2 id="active-briefs" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Active Briefs ({active.length})
        </h2>
        <div className="space-y-4">
          {active.map((brief) => {
            const { bg } = statusIcons[brief.status];
            return (
              <div
                key={brief.id}
                data-testid={`brief-card-${brief.id}`}
                className={`rounded-xl border p-5 ${bg}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{brief.campaign}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Created {brief.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
                    active
                  </span>
                </div>

                <p className="text-sm text-gray-300 mt-3">{brief.objective}</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Target Audience
                    </p>
                    <p className="text-sm text-gray-300">{brief.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      KPI Targets
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-300">ROAS <span className="text-violet-400 font-medium">{brief.kpis.roas}x</span></span>
                      <span className="text-gray-300">CTR <span className="text-violet-400 font-medium">{brief.kpis.ctr}%</span></span>
                      <span className="text-gray-300">CPC <span className="text-violet-400 font-medium">${brief.kpis.cpc}</span></span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Hooks ({brief.hooks.length})
                  </p>
                  <ul className="space-y-1" data-testid={`brief-hooks-${brief.id}`}>
                    {brief.hooks.map((hook, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <Target size={12} className="text-violet-400 mt-0.5 shrink-0" />
                        {hook}
                      </li>
                    ))}
                  </ul>
                </div>

                {brief.forgeRun && (
                  <p className="text-xs text-gray-500 mt-4">
                    Last FORGE run: <span className="text-gray-400">{brief.forgeRun}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="templates-heading">
        <h2 id="templates-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Templates ({templates.length})
        </h2>
        <div className="space-y-4">
          {templates.map((brief) => (
            <div
              key={brief.id}
              data-testid={`brief-card-${brief.id}`}
              className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white">{brief.campaign}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Template</p>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 shrink-0">
                  template
                </span>
              </div>
              <p className="text-sm text-gray-300 mt-3">{brief.objective}</p>
              <ul className="mt-3 space-y-1">
                {brief.hooks.map((hook, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-blue-400">·</span> {hook}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
