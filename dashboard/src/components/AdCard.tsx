import { Ad } from "@/lib/data";
import { Video, ImageIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-500/20 text-green-400 border-green-500/30" :
    score >= 50 ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
    "bg-red-500/20 text-red-400 border-red-500/30";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${color}`}>
      {score}
    </span>
  );
}

function MetricPill({ label, value, target, higherIsBetter }: {
  label: string; value: number; target: number; higherIsBetter: boolean;
}) {
  const ok = higherIsBetter ? value >= target : value <= target;
  const Icon = ok ? TrendingUp : TrendingDown;
  return (
    <div className="flex items-center gap-1 text-xs">
      <Icon size={11} className={ok ? "text-green-400" : "text-red-400"} />
      <span className="text-gray-500">{label}:</span>
      <span className={ok ? "text-green-400 font-medium" : "text-red-400 font-medium"}>
        {label === "CPC" ? `$${value.toFixed(2)}` : `${value.toFixed(1)}${label === "ROAS" ? "x" : "%"}`}
      </span>
    </div>
  );
}

interface AdCardProps {
  ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
  const statusColors: Record<string, string> = {
    live: "bg-green-500/10 text-green-400 border-green-500/20",
    pending: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    archive: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  return (
    <div
      data-testid={`ad-card-${ad.id}`}
      className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {ad.format === "video" ? (
            <Video size={14} className="text-violet-400 shrink-0" />
          ) : (
            <ImageIcon size={14} className="text-blue-400 shrink-0" />
          )}
          <span className="text-sm font-medium text-white truncate">{ad.campaign}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {ad.score !== undefined && <ScoreBadge score={ad.score} />}
          <span className={`text-xs px-2 py-0.5 rounded border ${statusColors[ad.status]}`}>
            {ad.status}
          </span>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-400 space-y-0.5">
        <p><span className="text-gray-500">Hook:</span> {ad.hookType}</p>
        <p><span className="text-gray-500">Variant:</span> {ad.variant} · {ad.date}</p>
        {ad.metaAdId && (
          <p><span className="text-gray-500">Meta ID:</span> {ad.metaAdId}</p>
        )}
      </div>

      {(ad.roas !== undefined || ad.ctr !== undefined || ad.cpc !== undefined) && (
        <div className="mt-3 pt-3 border-t border-gray-700 flex flex-wrap gap-3">
          {ad.roas !== undefined && (
            <MetricPill label="ROAS" value={ad.roas} target={3.5} higherIsBetter={true} />
          )}
          {ad.ctr !== undefined && (
            <MetricPill label="CTR" value={ad.ctr} target={2.0} higherIsBetter={true} />
          )}
          {ad.cpc !== undefined && (
            <MetricPill label="CPC" value={ad.cpc} target={1.2} higherIsBetter={false} />
          )}
        </div>
      )}
    </div>
  );
}
