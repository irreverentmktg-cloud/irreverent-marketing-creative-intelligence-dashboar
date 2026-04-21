"use client";

import { useState, useEffect } from "react";
import { ads, AdStatus } from "@/lib/data";
import AdCard from "@/components/AdCard";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 6;

const tabs: { label: string; value: AdStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Live", value: "live" },
  { label: "Archive", value: "archive" },
];

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState<AdStatus | "all">("all");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset page when tab changes
  const handleTabChange = (value: AdStatus | "all") => {
    setActiveTab(value);
    setPage(1);
  };

  const filtered = ads.filter((ad) => {
    const matchesTab = activeTab === "all" || ad.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      ad.campaign.toLowerCase().includes(q) ||
      ad.hookType.toLowerCase().includes(q) ||
      ad.id.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

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
        <div
          className="flex gap-1 bg-gray-800 rounded-lg p-1"
          role="tablist"
          aria-label="Ad status filter"
        >
          {tabs.map(({ label, value }) => (
            <button
              key={value}
              role="tab"
              aria-selected={activeTab === value}
              data-testid={`tab-${value}`}
              onClick={() => handleTabChange(value)}
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
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
        <>
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            data-testid="ads-grid"
          >
            {paginated.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>

          {totalPages > 1 && (
            <div
              data-testid="ads-pagination"
              className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800"
            >
              <p className="text-xs text-gray-500">
                Showing {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{" "}
                {filtered.length}
              </p>
              <div className="flex items-center gap-2">
                <button
                  data-testid="pagination-prev"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-gray-400">
                  {safePage} / {totalPages}
                </span>
                <button
                  data-testid="pagination-next"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
