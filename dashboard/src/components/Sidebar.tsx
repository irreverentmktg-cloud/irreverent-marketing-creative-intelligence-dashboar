"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  FileText,
  BarChart2,
  Palette,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/ads", label: "Ads", icon: Image },
  { href: "/briefs", label: "Briefs", icon: FileText },
  { href: "/performance", label: "Performance", icon: BarChart2 },
  { href: "/brand", label: "Brand", icon: Palette },
];

const pipelineTools = [
  { label: "SCRAPER", ok: true, lastRun: "2026-04-20" },
  { label: "FORGE", ok: true, lastRun: "2026-04-18" },
  { label: "PUBLISHER", ok: true, lastRun: "2026-04-18" },
  { label: "LOOPER", ok: false, lastRun: "2026-04-14" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      data-testid="sidebar"
      className="w-56 min-h-screen bg-gray-900 text-white flex flex-col border-r border-gray-800"
    >
      <div className="px-5 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Zap className="text-violet-400" size={20} />
          <span className="font-bold text-sm leading-tight">
            Creative
            <br />
            Intelligence
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Irreverent Marketing</p>
      </div>

      <nav
        className="flex-1 px-3 py-4 space-y-1"
        aria-label="Main navigation"
      >
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              data-testid={`nav-${label.toLowerCase()}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-gray-800">
        <div className="text-xs text-gray-500">
          <p className="font-medium text-gray-400">Pipeline Status</p>
          <div className="mt-2 space-y-2">
            {pipelineTools.map(({ label, ok, lastRun }) => (
              <div key={label}>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      ok ? "bg-green-400" : "bg-yellow-400"
                    }`}
                    aria-label={ok ? "active" : "idle"}
                  />
                  <span className="font-medium text-gray-400">{label}</span>
                  <span
                    className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${
                      ok
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {ok ? "active" : "idle"}
                  </span>
                </div>
                <p
                  data-testid={`pipeline-lastrun-${label.toLowerCase()}`}
                  className="text-[10px] text-gray-600 pl-3.5 mt-0.5"
                >
                  Last run {lastRun}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
