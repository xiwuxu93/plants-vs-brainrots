import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getPlantMedia } from "@/data/media-assets";
import { plants, rarityOrder } from "@/data/pvb-database";
import Link from "next/link";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Plants Database",
  description:
    "Filter every Plants vs Brainrots plant by rarity, tier, seed cost, damage, and mutation scaling to plan your next lineup.",
  path: "/plants",
});

const sorts: Record<string, (a: typeof plants[number], b: typeof plants[number]) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  seedCost: (a, b) => a.seedCost - b.seedCost,
  baseDmg: (a, b) => b.baseDmg - a.baseDmg,
  costPerDmg: (a, b) => a.costPerDmg - b.costPerDmg,
};

function FilteredPlantsTable({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : "";
  const rarity = typeof searchParams.rarity === "string" ? searchParams.rarity : "all";
  const sort = typeof searchParams.sort === "string" && (searchParams.sort === "rarity" || sorts[searchParams.sort])
    ? searchParams.sort
    : "name";

  const filteredPlants = plants
    .filter((plant) => {
      const matchesQuery = plant.name.toLowerCase().includes(query);
      const matchesRarity = rarity === "all" || plant.rarity === rarity;
      return matchesQuery && matchesRarity;
    })
    .sort((a, b) => {
      if (sort === "rarity") {
        const aIndex = rarityOrder.indexOf(a.rarity);
        const bIndex = rarityOrder.indexOf(b.rarity);
        return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
          (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
      }
      const sorter = sorts[sort];
      return sorter ? sorter(a, b) : sorts.name(a, b);
    });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/70">
          <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-400">
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Rarity</th>
            <th className="px-4 py-3">Tier</th>
            <th className="px-4 py-3">Seed Cost</th>
            <th className="px-4 py-3">Damage</th>
            <th className="px-4 py-3">Cost / Damage</th>
            <th className="px-4 py-3">Mutations</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60 bg-slate-950/60 text-sm text-slate-200">
          {filteredPlants.map((plant) => (
            <tr key={plant.id} className="transition hover:bg-slate-900/40">
              <td className="px-4 py-3">
                {(() => {
                  const media = getPlantMedia(plant.name);
                  if (!media) {
                    return (
                      <span className="text-xs text-slate-500">No art</span>
                    );
                  }
                  return (
                    <Image
                      src={media.image}
                      alt={media.alt || plant.name}
                      className="h-12 w-12 rounded-lg border border-slate-800 object-cover"
                    />
                  );
                })()}
              </td>
              <td className="px-4 py-3">
                <Link href={`/plants/${plant.slug}`} className="font-semibold text-white hover:text-brand-200">
                  {plant.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-300">{plant.rarity}</td>
              <td className="px-4 py-3 text-slate-300">{plant.tier}</td>
              <td className="px-4 py-3 text-slate-300">${plant.seedCost.toLocaleString()}</td>
              <td className="px-4 py-3 text-slate-300">{plant.baseDmg}</td>
              <td className="px-4 py-3 text-slate-300">{plant.costPerDmg.toFixed(1)}</td>
              <td className="px-4 py-3 text-slate-300">
                {Object.keys(plant.mutations)
                  .map((mutation) => mutation.toUpperCase())
                  .join(" · ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredPlants.length === 0 ? (
        <div className="p-6 text-center text-sm text-slate-400">No plants found. Adjust your filters and try again.</div>
      ) : null}
    </div>
  );
}

interface PlantsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function PlantsPage({ searchParams }: PlantsPageProps) {
  return (
    <div className="container space-y-10">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Database"
          title="Plants database"
          description="Compare seeds, tiers, and mutation breakpoints to build optimized lanes. Use filters to pinpoint the exact plant you need."
        />
        <form className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-200 md:grid-cols-4">
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Search</span>
            <input
              name="q"
              defaultValue={typeof searchParams.q === "string" ? searchParams.q : ""}
              placeholder="Search plants..."
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Rarity</span>
            <select
              name="rarity"
              defaultValue={typeof searchParams.rarity === "string" ? searchParams.rarity : "all"}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
            >
              <option value="all">All</option>
              {rarityOrder
                .filter((rarity) => plants.some((plant) => plant.rarity === rarity))
                .map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Sort by</span>
            <select
              name="sort"
              defaultValue={typeof searchParams.sort === "string" ? searchParams.sort : "name"}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
            >
              <option value="name">Name</option>
              <option value="rarity">Rarity</option>
              <option value="seedCost">Seed cost</option>
              <option value="baseDmg">Damage</option>
              <option value="costPerDmg">Efficiency</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center self-end rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
          >
            Apply filters
          </button>
        </form>
      </div>
      <Suspense fallback={<p className="text-sm text-slate-400">Loading plants...</p>}>
        <FilteredPlantsTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
