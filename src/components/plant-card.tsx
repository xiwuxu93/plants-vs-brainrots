import { Plant } from "@/data/pvb-database";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  const topMutations = Object.entries(plant.mutations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2);

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/40">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-3 py-1 text-xs uppercase tracking-wide text-brand-200">
          {plant.rarity}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{plant.name}</h3>
          <p className="text-sm text-slate-300">Tier {plant.tier}</p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm text-slate-300">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Seed Cost</dt>
            <dd>${plant.seedCost.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Base Damage</dt>
            <dd>{plant.baseDmg}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Damage / Cost</dt>
            <dd>{plant.costPerDmg.toFixed(1)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Best Mutation</dt>
            <dd>{topMutations[0] ? topMutations[0][0].toUpperCase() : "NONE"}</dd>
          </div>
        </dl>
        {plant.specialEffect ? (
          <p className="text-sm text-slate-200">{plant.specialEffect}</p>
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
        <div className="flex -space-x-2 overflow-hidden">
          {topMutations.map(([mutation]) => (
            <span
              key={mutation}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-500 bg-brand-500/20 text-[0.65rem] font-semibold uppercase text-brand-100"
            >
              {mutation.slice(0, 2).toUpperCase()}
            </span>
          ))}
        </div>
        <Link href={`/plants/${plant.id}`} className="inline-flex items-center gap-1 text-sm text-brand-200 hover:text-white">
          View Stats
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
