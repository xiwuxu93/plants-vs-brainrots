"use client";

import useSWR from "swr";
import Image from "next/image";
import { useMemo } from "react";
import { StockItem, StockPayload } from "@/data/stock-sample";
import { SectionHeading } from "@/components/section-heading";
import { getBrainrotMedia, getPlantMedia, type MediaAsset } from "@/data/media-assets";

interface StockResponse {
  latest: StockPayload;
  history: StockPayload[];
}

type StockItemWithMedia = StockItem & { media?: MediaAsset };

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<StockResponse>);

function resolveMedia(item: StockItem): MediaAsset | undefined {
  switch (item.type) {
    case "Brainrot":
      return getBrainrotMedia(item.name);
    case "Seed":
      return getPlantMedia(item.name.replace(/\s+seed$/i, ""));
    case "Mutation":
      return getPlantMedia(item.name);
    case "Unknown":
      return getPlantMedia(item.name) ?? getBrainrotMedia(item.name);
    default:
      return undefined;
  }
}

function formatDate(value: string | number | Date | null | undefined, options: Intl.DateTimeFormatOptions) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

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

export default function StockPageClient() {
  const refreshMs = 5 * 60 * 1000;
  const { data, isLoading } = useSWR<StockResponse>("/api/stock", fetcher, {
    refreshInterval: refreshMs,
    revalidateOnFocus: true,
  });

  const lastUpdated = useMemo(() => {
    if (!data?.latest?.generatedAt) return "—";
    return formatDate(data.latest.generatedAt, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      month: "short",
      day: "numeric",
    });
  }, [data?.latest?.generatedAt]);

  const items = data?.latest?.items;
  const itemsWithMedia = useMemo<StockItemWithMedia[]>(() => {
    const list = items ?? [];
    return list.map((item) => ({
      ...item,
      media: resolveMedia(item),
    }));
  }, [items]);
  const history = data?.history ?? [];

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
          <p>
            Source: <span className="font-semibold text-white">{data?.latest?.source ?? "unavailable"}</span>
          </p>
        </div>
        {data?.latest?.message ? (
          <p className="mt-4 rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            {data.latest.message}
          </p>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 bg-slate-950/70 text-sm text-slate-200">
            {itemsWithMedia.map((item) => (
              <tr key={item.id} className="transition hover:bg-slate-900/50">
                <td className="px-4 py-3">
                  {item.media ? (
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                      <Image
                        src={item.media.image}
                        alt={item.media.alt}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-xs uppercase tracking-[0.25em] text-slate-500">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-white">{item.name}</td>
                <td className="px-4 py-3 text-slate-300">{item.type}</td>
                <td className="px-4 py-3 text-right text-slate-300">
                  {Number.isFinite(item.price) ? `$${item.price.toLocaleString()}` : "—"}
                </td>
                <td className="px-4 py-3 text-right text-slate-300">
                  {Number.isFinite(item.stock) ? item.stock : "—"}
                </td>
                <td className="px-4 py-3">
                  <StockStatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-slate-300">
                  {formatDate(item.lastSeen, {
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {!isLoading && itemsWithMedia.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-slate-400">
                  Stock data is temporarily unavailable while we restore the feed. Please check back soon.
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
          {history.slice(0, 4).map((entry, index) => (
            <article
              key={entry.generatedAt ?? index}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow shadow-slate-950/20"
            >
              <header className="text-sm text-slate-300">
                {formatDate(entry.generatedAt ?? "", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </header>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {entry.items.map((item) => {
                  const media = resolveMedia(item);
                  return (
                    <li
                      key={`${entry.generatedAt ?? index}-${item.id}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2"
                    >
                      <div className="flex items-center gap-3">
                        {media ? (
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                            <Image src={media.image} alt={media.alt} fill sizes="40px" className="object-cover" />
                          </div>
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-[10px] uppercase tracking-[0.25em] text-slate-500">
                            N/A
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{item.type}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-slate-300">
                        <p className="font-semibold text-slate-200">{Number.isFinite(item.stock) ? item.stock : "—"}</p>
                        <p>{Number.isFinite(item.price) ? `$${item.price.toLocaleString()}` : "—"}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
          {!isLoading && history.length === 0 ? (
            <p className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-400 md:col-span-2">
              No historical snapshots yet. They will appear here after the first successful refresh.
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
