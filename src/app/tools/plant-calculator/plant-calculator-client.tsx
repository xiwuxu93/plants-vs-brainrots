"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { SectionHeading } from "@/components/section-heading-client";
import { dropTables, mutationInfo, plants } from "@/data/pvb-database";
import type { StockPayload } from "@/data/stock-sample";

type MutationKey = keyof typeof mutationInfo.plants;

interface RecommendationItem {
  name: string;
  count: number;
  cost: number;
  damage: number;
  baseDamage: number;
  mutation: string;
  mutationBonus: number;
}

interface RecommendationResult {
  items: RecommendationItem[];
  totalCost: number;
  totalDamage: number;
}

const mutationEntries = Object.entries(mutationInfo.plants) as [MutationKey, { effect: string; damageMultiplier: number }][];
const mutationKeys = mutationEntries.map(([key]) => key);

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const projectionFactors = [0.25, 0.5, 0.75, 1];

const presets: Array<{
  label: string;
  description: string;
  weights: Partial<Record<MutationKey, number>>;
  enabled?: Partial<Record<MutationKey, boolean>>;
}> = [
  {
    label: "Balanced",
    description: "Keeps every mutation active for all-round lane coverage.",
    weights: {},
  },
  {
    label: "Burst DPS",
    description: "Boost Neon/Magma/Galaxy for boss melt phases and timers.",
    weights: { neon: 1.4, magma: 1.5, galaxy: 1.55, rainbow: 1.2, frozen: 0.8 },
  },
  {
    label: "Control",
    description: "Prioritise Frozen & Underworld to stall lanes while farming.",
    weights: { frozen: 1.5, underworld: 1.35, magma: 0.9, neon: 0.95, galaxy: 1 },
  },
  {
    label: "Budget Rush",
    description: "Disable expensive mutations and flip early stock faster.",
    weights: { neon: 0.85, magma: 0.6, galaxy: 0.6 },
    enabled: { magma: false, galaxy: false },
  },
];

const mutationResourceMap: Partial<Record<MutationKey, string[]>> = {
  neon: ["Neon Core"],
  frozen: ["Frost Grenade"],
  magma: ["Magma Core"],
  underworld: ["Underworld Ember"],
  rainbow: ["Rainbow Essence"],
  galaxy: ["Galaxy Core"],
};

function buildRecommendation(
  budget: number,
  weights: Record<MutationKey, number>,
  enabled: Record<MutationKey, boolean>,
): RecommendationResult {
  if (budget <= 0) {
    return { items: [], totalCost: 0, totalDamage: 0 };
  }

  const sorted = [...plants].sort((a, b) => b.baseDmg / b.seedCost - a.baseDmg / a.seedCost);
  const cheapestSeed = Math.min(...sorted.map((plant) => plant.seedCost));

  const items: RecommendationItem[] = [];
  let remaining = budget;

  for (const plant of sorted) {
    if (plant.seedCost > remaining) continue;

    const spendableCount = Math.floor(remaining / plant.seedCost);
    if (spendableCount <= 0) continue;

    const mutationOptions = Object.entries(plant.mutations).map(([key, dmg]) => {
      const mutationKey = key as MutationKey;
      const weight = weights[mutationKey] ?? 1;
      const enabledFlag = enabled[mutationKey] ?? true;
      return {
        key: mutationKey,
        enabled: enabledFlag,
        adjusted: dmg * weight,
        raw: dmg,
      };
    });

    const available = mutationOptions.filter((option) => option.enabled);
    const best = (available.length ? available : mutationOptions).reduce((acc, option) => {
      if (!acc || option.adjusted > acc.adjusted) return option;
      return acc;
    }, null as (typeof mutationOptions)[number] | null);

    const perUnitDamage = best ? best.adjusted : plant.baseDmg;
    const mutationLabel = best ? best.key.toUpperCase() : "BASE";
    const baseDamage = plant.baseDmg;
    const totalDamage = perUnitDamage * spendableCount;
    const mutationBonus = baseDamage ? perUnitDamage / baseDamage : 1;

    items.push({
      name: plant.name,
      count: spendableCount,
      cost: spendableCount * plant.seedCost,
      damage: totalDamage,
      baseDamage: baseDamage * spendableCount,
      mutation: mutationLabel,
      mutationBonus,
    });

    remaining -= spendableCount * plant.seedCost;
    if (remaining < cheapestSeed) {
      break;
    }
  }

  const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
  const totalDamage = items.reduce((sum, item) => sum + item.damage, 0);

  return {
    items,
    totalCost,
    totalDamage,
  };
}

export default function PlantCalculatorPage() {
  const params = useSearchParams();
  const [budget, setBudget] = useState(250000);
  const [mutationWeights, setMutationWeights] = useState<Record<MutationKey, number>>(() => {
    const initial = {} as Record<MutationKey, number>;
    mutationKeys.forEach((key) => {
      initial[key] = 1;
    });
    return initial;
  });
  const [mutationEnabled, setMutationEnabled] = useState<Record<MutationKey, boolean>>(() => {
    const initial = {} as Record<MutationKey, boolean>;
    mutationKeys.forEach((key) => {
      initial[key] = true;
    });
    return initial;
  });

  useEffect(() => {
    const stateParam = params.get("state");
    if (stateParam) {
      try {
        const decoded = JSON.parse(atob(stateParam));
        if (typeof decoded.budget === "number" && decoded.budget > 0) {
          setBudget(decoded.budget);
        }
        if (decoded.weights) {
          setMutationWeights((prev) => ({ ...prev, ...decoded.weights }));
        }
        if (decoded.enabled) {
          setMutationEnabled((prev) => ({ ...prev, ...decoded.enabled }));
        }
        return;
      } catch (error) {
        console.warn("Invalid calculator state", error);
      }
    }
    const budgetParam = Number(params.get("budget"));
    if (budgetParam && Number.isFinite(budgetParam) && budgetParam > 0) {
      setBudget(budgetParam);
    }
  }, [params]);

  const recommendation = useMemo(
    () => buildRecommendation(budget, mutationWeights, mutationEnabled),
    [budget, mutationWeights, mutationEnabled],
  );

  const { data: stock } = useSWR<StockPayload>("/api/stock", fetcher, {
    refreshInterval: 10 * 60 * 1000,
    revalidateOnFocus: false,
  });

  const stockHighlights = useMemo(() => {
    if (!stock) return [] as StockPayload["items"];
    const names = new Set(recommendation.items.map((item) => item.name.toLowerCase()));
    return stock.items.filter((item) => names.has(item.name.toLowerCase()));
  }, [stock, recommendation.items]);

  const roi = useMemo(() => {
    if (!recommendation.totalCost) return 0;
    return recommendation.totalDamage / recommendation.totalCost;
  }, [recommendation.totalCost, recommendation.totalDamage]);

  const damageSeries = useMemo(() => {
    const points = 12;
    const series: Array<{ budget: number; damage: number }> = [];
    for (let i = 1; i <= points; i++) {
      const fraction = i / points;
      const pointBudget = Math.max(1000, Math.round(budget * fraction));
      const result = buildRecommendation(pointBudget, mutationWeights, mutationEnabled);
      series.push({ budget: pointBudget, damage: result.totalDamage });
    }
    return series;
  }, [budget, mutationWeights, mutationEnabled]);

  const roiSeries = useMemo(() => {
    return damageSeries.map((point) => {
      const result = buildRecommendation(point.budget, mutationWeights, mutationEnabled);
      const value = result.totalCost ? result.totalDamage / result.totalCost : 0;
      return { budget: point.budget, roi: value };
    });
  }, [damageSeries, mutationWeights, mutationEnabled]);

  const projections = useMemo(() => {
    return projectionFactors.map((factor) => {
      const partialBudget = Math.max(1000, Math.round(budget * factor));
      const result = buildRecommendation(partialBudget, mutationWeights, mutationEnabled);
      return {
        budget: partialBudget,
        totalDamage: result.totalDamage,
        roi: result.totalCost ? result.totalDamage / result.totalCost : 0,
      };
    });
  }, [budget, mutationWeights, mutationEnabled]);

  const mutationImpact = useMemo(() => {
    return mutationKeys
      .map((mutation) => {
        if (!mutationEnabled[mutation]) {
          return { mutation, delta: 0 };
        }
        const disabled = buildRecommendation(budget, mutationWeights, { ...mutationEnabled, [mutation]: false });
        const delta = recommendation.totalDamage - disabled.totalDamage;
        return { mutation, delta };
      })
      .sort((a, b) => b.delta - a.delta)
      .slice(0, 4);
  }, [budget, mutationWeights, mutationEnabled, recommendation.totalDamage]);

  const resourceHints = useMemo(() => {
    return mutationImpact.map((impact) => {
      const resources = mutationResourceMap[impact.mutation as MutationKey] ?? [];
      const stockMatches = resources
        .map((resource) => stock?.items.find((item) => item.name.toLowerCase() === resource.toLowerCase()))
        .filter(Boolean) as StockPayload["items"];
      const dropMatches = resources
        .map((resource) => {
          const matches = dropTables
            .flatMap((table) =>
              table.drops
                .filter((drop) => drop.item.toLowerCase() === resource.toLowerCase())
                .map((drop) => ({ activity: table.activity, chance: drop.chance, rarity: drop.rarity })),
            );
          return { resource, matches };
        })
        .filter((entry) => entry.matches.length > 0);
      return { mutation: impact.mutation, delta: impact.delta, stockMatches, dropMatches };
    });
  }, [mutationImpact, stock?.items]);

  const shareLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const payload = {
      budget,
      weights: mutationWeights,
      enabled: mutationEnabled,
    };
    const url = new URL(window.location.href);
    url.searchParams.set("state", btoa(JSON.stringify(payload)));
    return url.toString();
  }, [budget, mutationWeights, mutationEnabled]);

  const lineupExport = useMemo(
    () => ({
      budget,
      mutationWeights,
      mutationEnabled,
      totalCost: recommendation.totalCost,
      totalDamage: recommendation.totalDamage,
      roi,
      damageSeries,
      roiSeries,
      lineup: recommendation.items,
      resourceHints,
    }),
    [budget, mutationWeights, mutationEnabled, recommendation, roi, damageSeries, roiSeries, resourceHints],
  );

  const copyShareLink = useCallback(() => {
    if (!shareLink) return;
    navigator.clipboard?.writeText(shareLink).catch(() => undefined);
  }, [shareLink]);

  const downloadJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(lineupExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `plant-lineup-${budget}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [lineupExport, budget]);

  const downloadCsv = useCallback(() => {
    const header = "Plant,Count,Mutation,Cost,Damage,BaseDamage\n";
    const rows = recommendation.items
      .map(
        (item) =>
          `${item.name},${item.count},${item.mutation},${item.cost},${item.damage.toFixed(2)},${item.baseDamage.toFixed(2)}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `plant-lineup-${budget}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [recommendation.items, budget]);

  const resetWeights = useCallback(() => {
    setMutationWeights(() => {
      const initial = {} as Record<MutationKey, number>;
      mutationKeys.forEach((key) => {
        initial[key] = 1;
      });
      return initial;
    });
    setMutationEnabled(() => {
      const initial = {} as Record<MutationKey, boolean>;
      mutationKeys.forEach((key) => {
        initial[key] = true;
      });
      return initial;
    });
  }, []);

  const applyPreset = useCallback((index: number) => {
    const preset = presets[index];
    setMutationWeights((prev) => {
      const next = { ...prev };
      mutationKeys.forEach((key) => {
        if (preset.weights[key] !== undefined) {
          next[key] = preset.weights[key] as number;
        }
      });
      return next;
    });
    if (preset.enabled) {
      setMutationEnabled((prev) => {
        const next = { ...prev };
        mutationKeys.forEach((key) => {
          if (preset.enabled && preset.enabled[key] !== undefined) {
            next[key] = preset.enabled[key] as boolean;
          }
        });
        return next;
      });
    }
  }, []);

  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Tool"
        as="h1"
        title="Plant efficiency calculator"
        description="Tune mutation priorities, monitor stock, and export optimized lineups that squeeze every drop of DPS from your budget."
      />

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-[1.15fr,1.2fr]">
        <div className="space-y-6">
          <form className="space-y-4 text-sm text-slate-200">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Budget</span>
              <input
                type="number"
                min={1000}
                step={1000}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value) || 0)}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
              />
            </label>
            <p className="text-xs text-slate-400">
              Adjust mutation weights to reflect your lab priorities. Disable a mutation to exclude it from calculations entirely.
            </p>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em]">
              <button
                type="button"
                onClick={copyShareLink}
                className="rounded-full border border-brand-400 px-4 py-1 text-brand-200 transition hover:border-brand-200 hover:text-white"
              >
                Copy share link
              </button>
              <button
                type="button"
                onClick={downloadJson}
                className="rounded-full border border-slate-700 px-4 py-1 text-slate-300 transition hover:border-emerald-300 hover:text-emerald-200"
              >
                Download JSON
              </button>
              <button
                type="button"
                onClick={downloadCsv}
                className="rounded-full border border-slate-700 px-4 py-1 text-slate-300 transition hover:border-amber-300 hover:text-amber-200"
              >
                Download CSV
              </button>
              <button
                type="button"
                onClick={resetWeights}
                className="rounded-full border border-slate-700 px-4 py-1 text-slate-300 transition hover:border-rose-300 hover:text-rose-200"
              >
                Reset weights
              </button>
            </div>
          </form>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
            <h3 className="text-sm font-semibold text-white">Mutation weights</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {mutationEntries.map(([mutation, info]) => (
                <div key={mutation} className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-xs text-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{mutation.toUpperCase()}</span>
                    <label className="flex items-center gap-2">
                      <span>{mutationEnabled[mutation] ? "On" : "Off"}</span>
                      <input
                        type="checkbox"
                        checked={mutationEnabled[mutation]}
                        onChange={(event) =>
                          setMutationEnabled((prev) => ({ ...prev, [mutation]: event.target.checked }))
                        }
                        className="h-3 w-3"
                      />
                    </label>
                  </div>
                  <p className="text-[0.7rem] text-slate-400">{info.effect}</p>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={mutationWeights[mutation]}
                    onChange={(event) =>
                      setMutationWeights((prev) => ({ ...prev, [mutation]: Number(event.target.value) }))
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Weight</span>
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      value={mutationWeights[mutation].toFixed(1)}
                      onChange={(event) =>
                        setMutationWeights((prev) => ({ ...prev, [mutation]: Number(event.target.value) || 0 }))
                      }
                      className="w-16 rounded border border-slate-800 bg-slate-950 px-2 py-1 text-right text-xs text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-200">
            <h3 className="text-sm font-semibold text-white">Smart presets</h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {presets.map((preset, index) => (
                <li key={preset.label}>
                  <button
                    type="button"
                    onClick={() => applyPreset(index)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-left transition hover:border-brand-400 hover:text-white"
                  >
                    <p className="font-semibold text-white">{preset.label}</p>
                    <p className="text-[0.65rem] text-slate-400">{preset.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-brand-500/40 bg-brand-500/10 p-6">
          <h3 className="text-lg font-semibold text-white">Recommended setup</h3>
          {recommendation.items.length === 0 ? (
            <p className="text-sm text-brand-100">Increase your budget to generate a lineup.</p>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-2 text-sm text-brand-100 sm:grid-cols-2">
                <div className="flex items-center justify-between">
                  <span>Total cost</span>
                  <span>${recommendation.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total damage</span>
                  <span>{recommendation.totalDamage.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Damage per $</span>
                  <span>{roi.toFixed(4)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Plant slots used</span>
                  <span>{recommendation.items.reduce((sum, item) => sum + item.count, 0)}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-brand-100">
                {recommendation.items.map((item) => (
                  <div key={`bar-${item.name}`} className="space-y-1">
                    <div className="flex justify-between">
                      <span>
                        {item.count}× {item.name}
                      </span>
                      <span>${item.cost.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-brand-500/20">
                      <div
                        className="h-full rounded-full bg-brand-400"
                        style={{ width: `${Math.min(100, (item.cost / recommendation.totalCost) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <ul className="space-y-3 text-sm text-brand-100">
                {recommendation.items.map((item) => (
                  <li key={item.name} className="rounded-xl border border-brand-400/40 bg-brand-500/10 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">
                        {item.count}× {item.name}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-brand-200">{item.mutation}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-200">
                      Damage {item.damage.toLocaleString()} · ×{item.mutationBonus.toFixed(2)} boost
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Damage & ROI projections</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">See how the lineup scales as you grow your budget</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {projections.map((projection) => (
            <article key={projection.budget} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>Budget</span>
                <span>${projection.budget.toLocaleString()}</span>
              </div>
              <p className="mt-2 text-white">Damage {projection.totalDamage.toLocaleString()}</p>
              <p className="text-xs text-slate-400">ROI ×{projection.roi.toFixed(3)}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
          <svg viewBox="0 0 480 160" className="h-40 w-full text-brand-400">
            <defs>
              <linearGradient id="damageGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(16 185 129 / 0.35)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {damageSeries.length > 0 ? (() => {
              const maxBudget = Math.max(...damageSeries.map((point) => point.budget));
              const maxDamage = Math.max(...damageSeries.map((point) => point.damage));
              const coords = damageSeries.map((point, index) => {
                const x = (point.budget / maxBudget) * 460 + 10;
                const y = 150 - (maxDamage ? (point.damage / maxDamage) * 140 : 0);
                return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
              });
              const linePath = coords.join(" ");
              const areaPath = `${linePath} L470 150 L10 150 Z`;
              return (
                <g>
                  <path d={areaPath} fill="url(#damageGradient)" stroke="none" />
                  <path d={linePath} fill="none" stroke="currentColor" strokeWidth={2} />
                </g>
              );
            })() : null}
          </svg>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
          <svg viewBox="0 0 480 160" className="h-40 w-full text-slate-300">
            {roiSeries.length > 0 ? (() => {
              const maxBudget = Math.max(...roiSeries.map((point) => point.budget));
              const maxRoi = Math.max(...roiSeries.map((point) => point.roi));
              const coords = roiSeries.map((point, index) => {
                const x = (point.budget / maxBudget) * 460 + 10;
                const y = 150 - (maxRoi ? (point.roi / maxRoi) * 140 : 0);
                return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
              });
              const path = coords.join(" ");
              return <path d={path} fill="none" stroke="currentColor" strokeWidth={2} />;
            })() : null}
          </svg>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Mutation insights</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Top boosters based on current lineup</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {mutationImpact.map((impact) => (
            <article key={impact.mutation} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-white">{impact.mutation.toUpperCase()}</p>
                <p className="text-emerald-200">+{impact.delta.toLocaleString()} dmg</p>
              </div>
              <p className="text-xs text-slate-400">{mutationInfo.plants[impact.mutation as MutationKey]?.effect}</p>
            </article>
          ))}
        </div>
        {mutationImpact.length > 0 ? (
          <p className="mt-4 text-xs text-slate-400">
            Tip: prioritise <span className="text-emerald-200">{mutationImpact[0].mutation.toUpperCase()}</span>—downgrading it would cost roughly
            {" "}
            {mutationImpact[0].delta.toLocaleString()} damage at this budget. Pair with
            {" "}
            {mutationImpact[1]?.mutation.toUpperCase() ?? ""} lanes for faster clears.
          </p>
        ) : null}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Upgrade roadmap</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Core items to farm for your top mutations</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {resourceHints.map((hint) => (
            <article key={hint.mutation} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-white">{hint.mutation.toUpperCase()}</p>
                <p className="text-emerald-200">+{hint.delta.toLocaleString()} dmg</p>
              </div>
              {hint.stockMatches.length > 0 ? (
                <div className="mt-2 text-xs text-emerald-200">
                  <p className="uppercase tracking-[0.3em] text-emerald-300">Stock</p>
                  {hint.stockMatches.map((stock) => (
                    <p key={stock.id}>
                      {stock.name}: {stock.status} • {stock.stock} units • ${stock.price.toLocaleString()}
                    </p>
                  ))}
                </div>
              ) : null}
              {hint.dropMatches.length > 0 ? (
                <div className="mt-2 text-xs text-slate-300">
                  <p className="uppercase tracking-[0.3em] text-slate-400">Drops</p>
                  {hint.dropMatches.map((entry) => (
                    <div key={entry.resource} className="space-y-1">
                      <p className="text-slate-200">{entry.resource}</p>
                      <ul className="list-disc space-y-1 pl-4">
                        {entry.matches.map((match, idx) => (
                          <li key={`${entry.resource}-${idx}`}>
                            {match.activity} — {match.chance} ({match.rarity})
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-xs text-slate-400">No direct farm data available—check future events.</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {stockHighlights.length > 0 ? (
        <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6">
          <h3 className="text-lg font-semibold text-white">Currently in stock</h3>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Synced with live stock feed</p>
          <ul className="mt-4 grid gap-3 text-sm text-emerald-100 md:grid-cols-2">
            {stockHighlights.map((item) => (
              <li key={item.id} className="rounded-xl border border-emerald-400/30 bg-slate-950/70 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-white">{item.name}</p>
                  <span className="text-xs uppercase tracking-[0.3em] text-emerald-200">{item.status}</span>
                </div>
                <p className="mt-1 text-xs text-emerald-200">
                  {item.stock} units • ${item.price.toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
