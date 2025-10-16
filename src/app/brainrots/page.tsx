import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getBrainrotMedia } from "@/data/media-assets";
import { brainrots, rarityOrder } from "@/data/pvb-database";
import Link from "next/link";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Brainrot Database",
  description:
    "Compare Plants vs Brainrots brainrots by income, rarity, and weight class to maximize passive cash flow and fusion resources.",
  path: "/brainrots",
});

const sorts: Record<string, (a: typeof brainrots[number], b: typeof brainrots[number]) => number> = {
  name: (a, b) => a.name.localeCompare(b.name),
  baseIncome: (a, b) => b.baseIncome - a.baseIncome,
};

function FilteredBrainrotsTable({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const query = typeof searchParams.q === "string" ? searchParams.q.toLowerCase() : "";
  const rarity = typeof searchParams.rarity === "string" ? searchParams.rarity : "all";
  const weight = typeof searchParams.weight === "string" ? searchParams.weight : "all";
  const sort = typeof searchParams.sort === "string" && (searchParams.sort === "rarity" || sorts[searchParams.sort])
    ? searchParams.sort
    : "baseIncome";

  const filteredBrainrots = brainrots
    .filter((brainrot) => {
      const matchesQuery = brainrot.name.toLowerCase().includes(query);
      const matchesRarity = rarity === "all" || brainrot.rarity === rarity;
      const matchesWeight = weight === "all" || brainrot.weight === weight;
      return matchesQuery && matchesRarity && matchesWeight;
    })
    .sort((a, b) => {
      if (sort === "rarity") {
        const aIndex = rarityOrder.indexOf(a.rarity);
        const bIndex = rarityOrder.indexOf(b.rarity);
        return (aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex) -
          (bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex);
      }
      const sorter = sorts[sort];
      return sorter ? sorter(a, b) : sorts.baseIncome(a, b);
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
            <th className="px-4 py-3">Weight</th>
            <th className="px-4 py-3">Income/sec</th>
            <th className="px-4 py-3">Mutations</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-900/60 bg-slate-950/60 text-sm text-slate-200">
          {filteredBrainrots.map((brainrot) => (
            <tr key={brainrot.id} className="transition hover:bg-slate-900/40">
              <td className="px-4 py-3">
                {(() => {
                  const media = getBrainrotMedia(brainrot.name);
                  if (!media) {
                    return (
                      <span className="text-xs text-slate-500">No art</span>
                    );
                  }
                  return (
                    <Image
                      src={media.image}
                      alt={media.alt || brainrot.name}
                      className="h-12 w-12 rounded-lg border border-slate-800 object-cover"
                    />
                  );
                })()}
              </td>
              <td className="px-4 py-3">
                <Link href={`/brainrots/${brainrot.slug}`} className="font-semibold text-white hover:text-purple-200">
                  {brainrot.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-300">{brainrot.rarity}</td>
              <td className="px-4 py-3 text-slate-300">{brainrot.tier}</td>
              <td className="px-4 py-3 text-slate-300">{brainrot.weight}</td>
              <td className="px-4 py-3 text-slate-300">${brainrot.baseIncome.toLocaleString()}</td>
              <td className="px-4 py-3 text-slate-300">
                {Object.entries(brainrot.mutations)
                  .map(([mutation, value]) => `${mutation.toUpperCase()} ($${value.toLocaleString()})`)
                  .join(" · ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBrainrots.length === 0 ? (
        <div className="p-6 text-center text-sm text-slate-400">No brainrots found. Adjust your filters and try again.</div>
      ) : null}
    </div>
  );
}

interface BrainrotsPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function BrainrotsPage({ searchParams }: BrainrotsPageProps) {
  const weights = Array.from(new Set(brainrots.map((brainrot) => brainrot.weight))).sort();

  return (
    <div className="container space-y-10">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Database"
          title="Brainrot income hub"
          description="Track every idle income source with mutation scaling, tier placement, and weight class for balanced rosters."
        />
        <form className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-200 md:grid-cols-4">
          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Search</span>
            <input
              name="q"
              defaultValue={typeof searchParams.q === "string" ? searchParams.q : ""}
              placeholder="Search brainrots..."
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Rarity</span>
            <select
              name="rarity"
              defaultValue={typeof searchParams.rarity === "string" ? searchParams.rarity : "all"}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            >
              <option value="all">All</option>
              {rarityOrder
                .filter((rarity) => brainrots.some((brainrot) => brainrot.rarity === rarity))
                .map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Weight</span>
            <select
              name="weight"
              defaultValue={typeof searchParams.weight === "string" ? searchParams.weight : "all"}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            >
              <option value="all">All</option>
              {weights.map((weight) => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Sort by</span>
            <select
              name="sort"
              defaultValue={typeof searchParams.sort === "string" ? searchParams.sort : "baseIncome"}
              className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-100 outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400"
            >
              <option value="baseIncome">Income</option>
              <option value="name">Name</option>
              <option value="rarity">Rarity</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center self-end rounded-full bg-purple-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-400"
          >
            Apply filters
          </button>
        </form>
      </div>
      <Suspense fallback={<p className="text-sm text-slate-400">Loading brainrots...</p>}>
        <FilteredBrainrotsTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
