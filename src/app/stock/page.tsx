"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { StockItem, StockPayload } from "@/data/stock-sample";
import { stockHistory } from "@/data/pvb-database";
import { SectionHeading } from "@/components/section-heading";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function StockStatusBadge({ status }: { status: StockItem["status"] }) {
  const config: Record<StockItem["status"], { label: string; className: string }> = {
    "in-stock": { label: "In Stock", className: "bg-emerald-500/15 text-emerald-200 border-emerald-400/40" },
    low: { label: "Low", className: "bg-amber-500/15 text-amber-200 border-amber-400/40" },
    "sold-out": { label: "Sold Out", className: "bg-rose-500/15 text-rose-200 border-rose-400/40" },
    unknown: { label: "Unknown", className: "bg-slate-500/15 text-slate-200 border-slate-400/40" },
  };

  const { label, className } = config[status] ?? config.unknown;
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${className}`}>
      {label}
    </span>
  );
}

export default function StockPage() {
  const refreshMs = 10 * 60 * 1000;
  const { data, isLoading } = useSWR<StockPayload>("/api/stock", fetcher, {
    refreshInterval: refreshMs,
    revalidateOnFocus: true,
  });

  const lastUpdated = useMemo(() => {
    if (!data?.generatedAt) return "—";
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(data.generatedAt));
  }, [data?.generatedAt]);

  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Live"
        title="Stock tracker"
        description="Streaming stock snapshots from the Roblox experience. Leave this tab open to catch restocks, limited rotations, and event drops the minute they flip."
      />

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
          <p>
            Last update: <span className="font-semibold text-white">{lastUpdated}</span>
          </p>
          {/* <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Source: {data?.source ?? "sample"} • Auto refresh every 10 minutes
          </p> */}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 bg-slate-950/70 text-sm text-slate-200">
            {(data?.items ?? []).map((item) => (
              <tr key={item.id} className="transition hover:bg-slate-900/50">
                <td className="px-4 py-3 font-semibold text-white">{item.name}</td>
                <td className="px-4 py-3 text-slate-300">{item.type}</td>
                <td className="px-4 py-3 text-right text-slate-300">${item.price.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{item.stock}</td>
                <td className="px-4 py-3">
                  <StockStatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {new Intl.DateTimeFormat(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    day: "numeric",
                  }).format(new Date(item.lastSeen))}
                </td>
              </tr>
            ))}
            {!isLoading && (data?.items ?? []).length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-400">
                  No stock information available. Check back soon.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        {isLoading ? (
          <div className="p-6 text-center text-sm text-slate-400">Connecting to stock tracker…</div>
        ) : null}
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Recent stock history</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {stockHistory.map((entry) => (
            <article
              key={entry.timestamp}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow shadow-slate-950/20"
            >
              <header className="text-sm text-slate-300">
                {new Intl.DateTimeFormat(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(entry.timestamp))}
              </header>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {entry.items.map((item) => {
                  const changeClass = item.change >= 0 ? "text-emerald-200" : "text-rose-200";
                  return (
                    <li
                      key={`${entry.timestamp}-${item.id}`}
                      className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2"
                    >
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.type}</p>
                      </div>
                      <div className="text-right text-sm text-slate-300">
                        <p className={`font-semibold ${changeClass}`}>
                          {item.change >= 0 ? "+" : ""}
                          {item.change}
                        </p>
                        <p>${item.price.toLocaleString()}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
