"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SectionHeading } from "@/components/section-heading";
import { dropTables, fusionRecipes } from "@/data/pvb-database";

interface InventoryState {
  [item: string]: number;
}

const inputs = Array.from(
  new Set(
    fusionRecipes.flatMap((recipe) => recipe.inputs.map((input) => input.item)),
  ),
).sort();

const dropIndex = new Map<string, { activity: string; chance: string; rarity: string }[]>();
dropTables.forEach((table) => {
  table.drops.forEach((drop) => {
    const key = drop.item.toLowerCase();
    if (!dropIndex.has(key)) dropIndex.set(key, []);
    dropIndex.get(key)!.push({ activity: table.activity, chance: drop.chance, rarity: drop.rarity });
  });
});

function classifyRecipes(inventory: InventoryState) {
  const craftable: typeof fusionRecipes = [];
  const nearly: Array<{ recipe: (typeof fusionRecipes)[number]; missing: InventoryState }> = [];

  fusionRecipes.forEach((recipe) => {
    const missing: InventoryState = {};
    const canCraft = recipe.inputs.every((input) => {
      const owned = inventory[input.item] ?? 0;
      if (owned < input.count) missing[input.item] = input.count - owned;
      return owned >= input.count;
    });

    if (canCraft) {
      craftable.push(recipe);
    } else {
      nearly.push({ recipe, missing });
    }
  });

  return { craftable, nearly };
}

export default function FusionPlannerPage() {
  const params = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inventory, setInventory] = useState<InventoryState>(() => {
    const initial: InventoryState = {};
    inputs.forEach((item) => {
      initial[item] = 0;
    });
    return initial;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stateParam = params.get("state");
    const stored = window.localStorage.getItem("fusion-inventory-v1");
    let parsed: InventoryState | null = null;

    if (stateParam) {
      try {
        parsed = JSON.parse(atob(stateParam));
      } catch (error) {
        console.warn("Invalid fusion state", error);
      }
    } else if (stored) {
      try {
        parsed = JSON.parse(stored);
      } catch (error) {
        console.warn("Invalid stored fusion inventory", error);
      }
    }

    if (parsed) {
      setInventory((prev) => ({ ...prev, ...parsed }));
    }
  }, [params]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("fusion-inventory-v1", JSON.stringify(inventory));
  }, [inventory]);

  const { craftable, nearly } = useMemo(() => classifyRecipes(inventory), [inventory]);

  const shareLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("state", btoa(JSON.stringify(inventory)));
    return url.toString();
  }, [inventory]);

  const copyShareLink = useCallback(() => {
    if (!shareLink) return;
    navigator.clipboard?.writeText(shareLink).catch(() => undefined);
  }, [shareLink]);

  const resetInventory = useCallback(() => {
    const blank: InventoryState = {};
    inputs.forEach((item) => {
      blank[item] = 0;
    });
    setInventory(blank);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("state");
      router.replace(`${url.pathname}${url.search}`, { scroll: false });
      window.localStorage.removeItem("fusion-inventory-v1");
    }
  }, [router]);

  const downloadInventory = useCallback(() => {
    const blob = new Blob([JSON.stringify(inventory, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "fusion-inventory.json";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [inventory]);

  const handleImport = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (typeof parsed === "object" && parsed !== null) {
          setInventory((prev) => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.warn("Failed to import fusion inventory", error);
      }
    };
    reader.readAsText(file);
  };

  const getDropSources = (item: string) => dropIndex.get(item.toLowerCase()) ?? [];

  const taskBoard = useMemo(() => {
    const counts = new Map<string, number>();
    nearly.forEach(({ missing }) => {
      Object.entries(missing).forEach(([item, count]) => {
        counts.set(item, (counts.get(item) ?? 0) + count);
      });
    });
    const entries = Array.from(counts.entries()).map(([item, count]) => {
      const sources = getDropSources(item);
      const best = sources[0];
      return {
        item,
        count,
        best,
      };
    });
    return entries.sort((a, b) => b.count - a.count).slice(0, 8);
  }, [nearly]);

  const topFarmActivities = useMemo(() => {
    const scores = dropTables.map((table) => {
      const missingDrops = table.drops.filter((drop) => taskBoard.some((task) => task.item.toLowerCase() === drop.item.toLowerCase()));
      const score = missingDrops.reduce((sum, drop) => {
        const numericChance = Number(drop.chance.replace('%', '')) || 0;
        return sum + numericChance;
      }, 0);
      return { table, score, matches: missingDrops };
    });
    return scores
      .filter((entry) => entry.matches.length > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [taskBoard]);

  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Tool"
        title="Fusion planner"
        description="Track your components, share builds, and know exactly where to farm missing pieces."
      />

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-[1.1fr,1.2fr]">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Inventory manager</h2>
          <p className="text-sm text-slate-300">
            Enter how many copies of each fusion ingredient you currently own. The planner updates in real-time and surfaces the
            recipes you can craft today plus the ones that are one or two drops away.
          </p>
          <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
            <button
              type="button"
              onClick={copyShareLink}
              className="rounded-full border border-brand-400 px-4 py-1 text-brand-200 transition hover:border-brand-200 hover:text-white"
            >
              Copy share link
            </button>
            <button
              type="button"
              onClick={downloadInventory}
              className="rounded-full border border-slate-700 px-4 py-1 text-slate-300 transition hover:border-emerald-300 hover:text-emerald-200"
            >
              Download JSON
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full border border-slate-700 px-4 py-1 text-slate-300 transition hover:border-amber-300 hover:text-amber-200"
            >
              Import JSON
            </button>
            <button
              type="button"
              onClick={resetInventory}
              className="rounded-full border border-slate-700 px-4 py-1 text-slate-300 transition hover:border-rose-300 hover:text-rose-200"
            >
              Reset
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => handleImport(event.target.files)}
          />
          <div className="grid max-h-[420px] grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
            {inputs.map((item) => (
              <label
                key={item}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200"
              >
                <span>{item}</span>
                <input
                  type="number"
                  min={0}
                  value={inventory[item] ?? 0}
                  onChange={(event) => {
                    const value = Number(event.target.value) || 0;
                    setInventory((prev) => ({ ...prev, [item]: value }));
                  }}
                  className="w-20 rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-right text-sm text-white outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
            <h3 className="text-lg font-semibold text-white">Craftable now ({craftable.length})</h3>
            {craftable.length === 0 ? (
              <p className="mt-2 text-sm text-emerald-100">Add items to your inventory to unlock your first fusion.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm text-emerald-100">
                {craftable.map((recipe) => (
                  <li key={recipe.id} className="rounded-xl border border-emerald-400/30 bg-slate-950/60 px-4 py-3">
                    <p className="text-white">{recipe.result}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Cost ${recipe.cost.toLocaleString()} • {recipe.rarity}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">
            <h3 className="text-lg font-semibold text-white">Almost ready ({nearly.length})</h3>
            {nearly.length === 0 ? (
              <p className="mt-2 text-sm text-amber-100">Everything else needs more drops. Keep grinding raids and events.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm text-amber-100">
                {nearly.map(({ recipe, missing }) => (
                  <li key={recipe.id} className="space-y-3 rounded-xl border border-amber-400/30 bg-slate-950/60 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-white">{recipe.result}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Cost ${recipe.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Missing components</p>
                      <ul className="mt-2 grid gap-2 text-xs text-amber-100 md:grid-cols-2">
                        {Object.entries(missing).map(([item, count]) => {
                          const sources = getDropSources(item);
                          return (
                            <li key={item} className="rounded-md border border-amber-300/30 bg-slate-900/50 px-2 py-2">
                              <div className="flex items-center justify-between">
                                <span>
                                  <span className="font-semibold text-white">{count}×</span> {item}
                                </span>
                              </div>
                              {sources.length > 0 ? (
                                <div className="mt-2 space-y-1">
                                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-amber-300">Farm routes</p>
                                  <ul className="space-y-1 text-[0.7rem] text-amber-100">
                                    {sources.map((source, index) => (
                                      <li key={`${item}-${index}`}>
                                        {source.activity} · {source.chance} ({source.rarity})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <p className="mt-2 text-[0.7rem] text-amber-200">No recorded drop — watch upcoming events.</p>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h3 className="text-lg font-semibold text-white">Task board</h3>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Aggregated missing items across all target fusions</p>
        {taskBoard.length === 0 ? (
          <p className="mt-2 text-sm text-slate-300">All components accounted for. Push new recipes or event drops.</p>
        ) : (
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {taskBoard.map((task) => (
              <li key={task.item} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-white">{task.item}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Need {task.count}</p>
                </div>
                {task.best ? (
                  <p className="mt-1 text-xs text-slate-300">
                    Best farm: {task.best.activity} · {task.best.chance} ({task.best.rarity})
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-slate-400">No drop info yet — watch upcoming raids/events.</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {topFarmActivities.length > 0 ? (
        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-lg font-semibold text-white">Priority farm destinations</h3>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sorted by drop chance coverage for your missing items</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {topFarmActivities.map((entry) => (
              <article key={entry.table.id} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                <p className="text-white">{entry.table.activity}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-300">
                  {entry.matches.map((match, index) => (
                    <li key={`${entry.table.id}-${index}`}>
                      {match.item}: {match.chance} ({match.rarity})
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
