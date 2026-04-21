"use client";

import { weeklyReports, performanceScores, kpiTargets } from "@/lib/data";
import MetricCard from "@/components/MetricCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";

export default function PerformancePage() {
  const latest = weeklyReports[weeklyReports.length - 1];
  const prev = weeklyReports[weeklyReports.length - 2];

  const roas_trend = ((latest.avgRoas - prev.avgRoas) / prev.avgRoas) * 100;
  const ctr_trend = ((latest.avgCtr - prev.avgCtr) / prev.avgCtr) * 100;
  const cpc_trend = ((latest.avgCpc - prev.avgCpc) / prev.avgCpc) * 100;

  const top3 = [...performanceScores]
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 3);

  return (
    <div data-testid="performance-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Performance</h1>
        <p className="text-gray-400 text-sm mt-1">
          ROAS, CTR, and CPC trends powered by LOOPER
        </p>
      </div>

      <section aria-labelledby="perf-kpis" className="mb-8">
        <h2 id="perf-kpis" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Latest Week Summary
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Avg ROAS"
            value={`${latest.avgRoas.toFixed(1)}x`}
            target={`${kpiTargets.roas}x`}
            status={latest.avgRoas >= kpiTargets.roas ? "good" : "warn"}
            trend={`${roas_trend >= 0 ? "+" : ""}${roas_trend.toFixed(0)}% vs prev week`}
            data-testid="perf-metric-roas"
          />
          <MetricCard
            label="Avg CTR"
            value={`${latest.avgCtr.toFixed(1)}%`}
            target={`${kpiTargets.ctr}%`}
            status={latest.avgCtr >= kpiTargets.ctr ? "good" : "warn"}
            trend={`${ctr_trend >= 0 ? "+" : ""}${ctr_trend.toFixed(0)}% vs prev week`}
            data-testid="perf-metric-ctr"
          />
          <MetricCard
            label="Avg CPC"
            value={`$${latest.avgCpc.toFixed(2)}`}
            target={`$${kpiTargets.cpc}`}
            status={latest.avgCpc <= kpiTargets.cpc ? "good" : "warn"}
            trend={`${cpc_trend <= 0 ? "" : "+"}${cpc_trend.toFixed(0)}% vs prev week`}
            data-testid="perf-metric-cpc"
          />
          <MetricCard
            label="Total Revenue"
            value={`$${latest.totalRevenue.toLocaleString()}`}
            status="neutral"
            trend={`Spend: $${latest.totalSpend.toLocaleString()}`}
            data-testid="perf-metric-revenue"
          />
        </div>
      </section>

      <section aria-labelledby="roas-chart-heading" className="mb-8">
        <h2 id="roas-chart-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          ROAS Trend (6 weeks)
        </h2>
        <div
          data-testid="roas-chart"
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-5"
          style={{ height: 280 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyReports}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                domain={[0, "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: 8,
                  color: "#F9FAFB",
                }}
              />
              <ReferenceLine
                y={kpiTargets.roas}
                stroke="#A78BFA"
                strokeDasharray="4 4"
                label={{ value: "Target", fill: "#A78BFA", fontSize: 11 }}
              />
              <Line
                type="monotone"
                dataKey="avgRoas"
                name="ROAS"
                stroke="#34D399"
                strokeWidth={2}
                dot={{ fill: "#34D399", r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section aria-labelledby="ctr-cpc-chart-heading" className="mb-8">
        <h2 id="ctr-cpc-chart-heading" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          CTR &amp; CPC Trends (6 weeks)
        </h2>
        <div
          data-testid="ctr-cpc-chart"
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-5"
          style={{ height: 280 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyReports}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: 8,
                  color: "#F9FAFB",
                }}
              />
              <Legend wrapperStyle={{ color: "#9CA3AF", fontSize: 12 }} />
              <Line
                type="monotone"
                dataKey="avgCtr"
                name="CTR %"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ fill: "#60A5FA", r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="avgCpc"
                name="CPC $"
                stroke="#F87171"
                strokeWidth={2}
                dot={{ fill: "#F87171", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section aria-labelledby="top-performers">
        <h2 id="top-performers" className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Top Performers
        </h2>
        <div className="overflow-x-auto">
          <table
            data-testid="top-performers-table"
            className="w-full text-sm"
          >
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-800">
                <th className="text-left pb-3 font-medium">Ad ID</th>
                <th className="text-left pb-3 font-medium">Campaign</th>
                <th className="text-right pb-3 font-medium">ROAS</th>
                <th className="text-right pb-3 font-medium">CTR</th>
                <th className="text-right pb-3 font-medium">CPC</th>
                <th className="text-right pb-3 font-medium">Spend</th>
                <th className="text-right pb-3 font-medium">Conversions</th>
              </tr>
            </thead>
            <tbody>
              {top3.map((score, i) => (
                <tr
                  key={score.adId}
                  data-testid={`top-performer-row-${i}`}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30"
                >
                  <td className="py-3 text-gray-400 font-mono text-xs">{score.adId}</td>
                  <td className="py-3 text-gray-300">{score.campaign}</td>
                  <td className="py-3 text-right">
                    <span className={`font-medium ${score.roas >= kpiTargets.roas ? "text-green-400" : "text-yellow-400"}`}>
                      {score.roas}x
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={score.ctr >= kpiTargets.ctr ? "text-green-400" : "text-yellow-400"}>
                      {score.ctr}%
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={score.cpc <= kpiTargets.cpc ? "text-green-400" : "text-red-400"}>
                      ${score.cpc.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 text-right text-gray-400">${score.spend}</td>
                  <td className="py-3 text-right text-gray-400">{score.conversions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
