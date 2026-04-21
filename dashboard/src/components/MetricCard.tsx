interface MetricCardProps {
  label: string;
  value: string;
  target?: string;
  status: "good" | "warn" | "bad" | "neutral";
  trend?: string;
  "data-testid"?: string;
}

export default function MetricCard({
  label,
  value,
  target,
  status,
  trend,
  "data-testid": testId,
}: MetricCardProps) {
  const statusColors = {
    good: "border-green-500/30 bg-green-500/5",
    warn: "border-yellow-500/30 bg-yellow-500/5",
    bad: "border-red-500/30 bg-red-500/5",
    neutral: "border-gray-700 bg-gray-800/50",
  };

  const valueColors = {
    good: "text-green-400",
    warn: "text-yellow-400",
    bad: "text-red-400",
    neutral: "text-white",
  };

  return (
    <div
      data-testid={testId}
      className={`rounded-xl border p-5 ${statusColors[status]}`}
    >
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
      <p className={`text-3xl font-bold mt-1 ${valueColors[status]}`}>{value}</p>
      {target && (
        <p className="text-xs text-gray-500 mt-1">Target: {target}</p>
      )}
      {trend && (
        <p className="text-xs text-gray-400 mt-2">{trend}</p>
      )}
    </div>
  );
}
