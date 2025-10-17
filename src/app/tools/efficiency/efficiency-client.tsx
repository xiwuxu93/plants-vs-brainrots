"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { SectionHeading } from "@/components/section-heading-client";
import { brainrots, events } from "@/data/pvb-database";
import type { StockPayload } from "@/data/stock-sample";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const rankedBrainrots = [...brainrots]
  .map((brainrot) => {
    const maxIncome = Math.max(...Object.values(brainrot.mutations));
    return {
      id: brainrot.id,
      name: brainrot.name,
      rarity: brainrot.rarity,
      weight: brainrot.weight,
      tier: brainrot.tier,
      baseIncome: brainrot.baseIncome,
      maxIncome,
      efficiency: maxIncome / brainrot.baseIncome,
      bestMutation: (() => {
        const top = Object.entries(brainrot.mutations).sort((a, b) => b[1] - a[1])[0]?.[0];
        return top ? top.toUpperCase() : "BASE";
      })(),
    };
  })
  .sort((a, b) => b.efficiency - a.efficiency)
  .slice(0, 12);

export default function EfficiencyToolPage() {
  const { data: stock } = useSWR<StockPayload>("/api/stock", fetcher, {
    refreshInterval: 10 * 60 * 1000,
    revalidateOnFocus: false,
  });

  const stockMap = useMemo(() => {
    const map = new Map<string, StockPayload["items"][number]>();
    if (stock) {
      stock.items.forEach((item) => {
        map.set(item.name.toLowerCase(), item);
      });
    }
    return map;
  }, [stock]);

  const maxEfficiency = rankedBrainrots[0]?.efficiency ?? 1;
  const now = Date.now();
  const activeEvents = events.filter((event) => {
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    return now >= start && now <= end;
  });
  const incomeEvents = activeEvents.filter((event) =>
    event.modifiers.some((modifier) => /income|cash|stock/i.test(modifier)),
  );

  const strategySuggestions = useMemo(() => {
    const suggestions: string[] = [];
    rankedBrainrots.forEach((brainrot) => {
      const stockEntry = stockMap.get(brainrot.name.toLowerCase());
      if (stockEntry && (stockEntry.status === "in-stock" || stockEntry.status === "low")) {
        const eventBoost = incomeEvents[0]?.name;
        const label = eventBoost
          ? `${brainrot.name} is ${stockEntry.status} during ${eventBoost}—grab it for ${brainrot.bestMutation} scaling.`
          : `${brainrot.name} is ${stockEntry.status} (${stockEntry.stock} units).`;
        suggestions.push(label);
      }
    });
    if (suggestions.length === 0 && rankedBrainrots[0]) {
      suggestions.push(
        `No live listings detected—queue ${rankedBrainrots[0].name} (${rankedBrainrots[0].rarity}) for the next stock reset; its efficiency is ×${rankedBrainrots[0].efficiency.toFixed(
          2,
        )}.`,
      );
    }
    if (incomeEvents.length > 0) {
      suggestions.push(
        `Active income boost: ${incomeEvents
          .map((event) => `${event.name} (${event.modifiers.join(', ')})`)
          .join('; ')}. Prioritise high-efficiency brainrots to stack the modifier.`,
      );
    }
    return suggestions.slice(0, 4);
  }, [incomeEvents, stockMap]);

  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Tool"
        as="h1"
        title="Income optimizer"
        description="Prioritize the highest scaling brainrots with live stock context and active event modifiers factored in."
      />

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-sm text-slate-300">
          Sorts brainrots by mutation efficiency and highlights any units currently available in stock. Keep an eye on event modifiers that
          boost income so you can time your purchases.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.3em] text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Brainrot</th>
                <th className="px-4 py-3 text-left">Rarity</th>
                <th className="px-4 py-3 text-left">Weight</th>
                <th className="px-4 py-3 text-left">Income/sec</th>
                <th className="px-4 py-3 text-left">Best mutation</th>
                <th className="px-4 py-3 text-left">Max income</th>
                <th className="px-4 py-3 text-left">Scaling</th>
                <th className="px-4 py-3 text-left">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/70 text-sm text-slate-200">
              {rankedBrainrots.map((brainrot) => {
                const stockEntry = stockMap.get(brainrot.name.toLowerCase());
                return (
                  <tr key={brainrot.id} className="transition hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-semibold text-purple-200">{brainrot.name}</td>
                    <td className="px-4 py-3">{brainrot.rarity}</td>
                    <td className="px-4 py-3">{brainrot.weight}</td>
                    <td className="px-4 py-3">${brainrot.baseIncome.toLocaleString()}</td>
                    <td className="px-4 py-3">{brainrot.bestMutation ?? "BASE"}</td>
                    <td className="px-4 py-3">${brainrot.maxIncome.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p>×{brainrot.efficiency.toFixed(2)}</p>
                        <div className="h-2 rounded-full bg-purple-500/20">
                          <div
                            className="h-full rounded-full bg-purple-400"
                            style={{ width: `${Math.min(100, (brainrot.efficiency / maxEfficiency) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">
                      {stockEntry ? (
                        <div className="space-y-1 text-xs">
                          <p className="text-emerald-200">
                            {stockEntry.status.toUpperCase()} • {stockEntry.stock} units
                          </p>
                          <p>${stockEntry.price.toLocaleString()}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500">No listing</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Active income modifiers</h3>
        {incomeEvents.length === 0 ? (
          <p className="mt-2 text-sm text-slate-300">No income-boosting events are live right now. Check back later.</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {incomeEvents.map((event) => (
              <article key={event.id} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-emerald-200">
                  <span>{event.type}</span>
                  <span>
                    {new Date(event.endDate).toLocaleDateString()} ·
                    {" "}
                    {new Date(event.endDate).toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-2 text-white">{event.name}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
                  {event.modifiers.map((modifier) => (
                    <li key={modifier}>{modifier}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Strategy suggestions</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Quick wins based on live stock and event timers</p>
        <ul className="mt-4 space-y-2 text-sm text-slate-200">
          {strategySuggestions.map((tip, idx) => (
            <li key={idx} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              {tip}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
