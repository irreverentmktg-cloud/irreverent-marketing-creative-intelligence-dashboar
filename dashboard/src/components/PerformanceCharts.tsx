"use client";

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
import { weeklyReports, kpiTargets } from "@/lib/data";

export function RoasChart() {
  return (
    <div
      data-testid="roas-chart"
      className="bg-gray-800/50 border border-gray-700 rounded-xl p-5"
      style={{ height: 280 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyReports}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="week" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
          <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} domain={[0, "auto"]} />
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
  );
}

export function CtrCpcChart() {
  return (
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
  );
}
