"use client";

import { useState } from "react";
import { ads, AdStatus } from "@/lib/data";
import AdCard from "@/components/AdCard";
import { Filter } from "lucide-react";

const tabs: { label: string; value: AdStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Live", value: "live" },
  { label: "Archive", value: "archive" },
];

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState<AdStatus | "all">("all");
  const [search, setSearch] = useState("");

  const filtered = ads.filter((ad) => {
    const matchesTab = activeTab === "all" || ad.status === activeTab;
    const matchesSearch =
      !search ||
      ad.campaign.includes(search.toLowerCase()) ||
      ad.hookType.includes(search.toLowerCase()) ||
      ad.id.includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const counts: Record<string, number> = {
    all: ads.length,
    pending: ads.filter((a) => a.status === "pending").length,
    live: ads.filter((a) => a.status === "live").length,
    archive: ads.filter((a) => a.status === "archive").length,
  };

  return (
    <div data-testid="ads-page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Ads</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your creative pipeline across all stages
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1" role="tablist" aria-label="Ad status filter">
          {tabs.map(({ label, value }) => (
            <button
              key={value}
              role="tab"
              aria-selected={activeTab === value}
              data-testid={`tab-${value}`}
              onClick={() => setActiveTab(value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === value
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {label}
              <span className="ml-1.5 text-xs opacity-70">{counts[value]}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 flex-1 max-w-xs">
          <Filter size={14} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search campaigns, hooks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="ads-search"
            className="bg-transparent text-sm text-gray-300 placeholder:text-gray-600 outline-none w-full"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          data-testid="ads-empty"
          className="text-center py-16 text-gray-500"
        >
          <p className="text-lg">No ads match your filter</p>
          <p className="text-sm mt-1">Try adjusting the search or status tab</p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          data-testid="ads-grid"
        >
          {filtered.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}
