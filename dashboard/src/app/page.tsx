import { ads, weeklyReports, kpiTargets } from "@/lib/data";
import MetricCard from "@/components/MetricCard";
import AdCard from "@/components/AdCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  const liveAds = ads.filter((a) => a.status === "live");
  const pendingAds = ads.filter((a) => a.status === "pending");

  const avgRoas = liveAds.reduce((s, a) => s + (a.roas ?? 0), 0) / (liveAds.length || 1);
  const avgCtr = liveAds.reduce((s, a) => s + (a.ctr ?? 0), 0) / (liveAds.length || 1);
  const avgCpc = liveAds.reduce((s, a) => s + (a.cpc ?? 0), 0) / (liveAds.length || 1);

  const latest = weeklyReports[weeklyReports.length - 1];

  return (
    <div data-testid="overview-page">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-gray-400 text-sm mt-1">
          Creative Intelligence Dashboard · Week of {latest.week}
        </p>
      </div>

      <section aria-labelledby="kpi-heading" className="mb-8">
        <h2 id="kpi-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Live Performance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Avg ROAS"
            value={`${avgRoas.toFixed(2)}x`}
            target={`${kpiTargets.roas}x`}
            status={avgRoas >= kpiTargets.roas ? "good" : "warn"}
            trend={`${liveAds.length} ads running`}
            data-testid="metric-roas"
          />
          <MetricCard
            label="Avg CTR"
            value={`${avgCtr.toFixed(1)}%`}
            target={`${kpiTargets.ctr}%`}
            status={avgCtr >= kpiTargets.ctr ? "good" : "warn"}
            data-testid="metric-ctr"
          />
          <MetricCard
            label="Avg CPC"
            value={`$${avgCpc.toFixed(2)}`}
            target={`$${kpiTargets.cpc}`}
            status={avgCpc <= kpiTargets.cpc ? "good" : "warn"}
            data-testid="metric-cpc"
          />
          <MetricCard
            label="Pending Review"
            value={String(pendingAds.length)}
            status="neutral"
            trend="Awaiting PUBLISHER"
            data-testid="metric-pending"
          />
        </div>
      </section>

      <section aria-labelledby="spend-heading" className="mb-8">
        <h2 id="spend-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          This Week
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Total Spend"
            value={`$${latest.totalSpend.toLocaleString()}`}
            status="neutral"
            data-testid="metric-spend"
          />
          <MetricCard
            label="Revenue"
            value={`$${latest.totalRevenue.toLocaleString()}`}
            status="neutral"
            data-testid="metric-revenue"
          />
          <MetricCard
            label="New Creatives"
            value={String(latest.newCreatives)}
            status="neutral"
            data-testid="metric-new-creatives"
          />
          <MetricCard
            label="Ads Running"
            value={String(latest.adsRunning)}
            status="neutral"
            data-testid="metric-ads-running"
          />
        </div>
      </section>

      <section aria-labelledby="pipeline-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="pipeline-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Pipeline Status
          </h2>
          <Link
            href="/ads"
            className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            View all ads <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="rounded-xl bg-blue-500/5 border border-blue-500/20 p-4">
            <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-3">
              Pending ({pendingAds.length})
            </h3>
            <div className="space-y-3">
              {pendingAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-green-500/5 border border-green-500/20 p-4">
            <h3 className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-3">
              Live ({liveAds.length})
            </h3>
            <div className="space-y-3">
              {liveAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gray-500/5 border border-gray-700 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Top Winner
            </h3>
            {ads
              .filter((a) => a.score !== undefined)
              .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
              .slice(0, 1)
              .map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
