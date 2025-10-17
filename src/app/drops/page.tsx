import { SectionHeading } from "@/components/section-heading";
import { dropTables } from "@/data/pvb-database";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Drop Tables",
  description: "Browse Plants vs Brainrots drop rates, reward rarities, and recommended power levels for every farming activity.",
  path: "/drops",
});

const rarityColor: Record<string, string> = {
  Common: "text-slate-300",
  Rare: "text-emerald-200",
  Epic: "text-purple-200",
  Legendary: "text-amber-200",
  Mythic: "text-rose-200",
  Secret: "text-cyan-200",
};

export default function DropsPage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Loot"
        as="h1"
        title="Drop tables"
        description="Plan your farming routes with real drop rates and power requirements for every core activity."
      />

      <div className="space-y-6">
        {dropTables.map((table) => (
          <article
            key={table.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow shadow-slate-950/30"
          >
            <header className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">{table.activity}</h2>
                <p className="text-sm text-slate-300">Recommended power: {table.recommendedPower.toLocaleString()}</p>
              </div>
            </header>

            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800">
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-[0.3em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Rarity</th>
                    <th className="px-4 py-3">Chance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 bg-slate-950/70 text-sm text-slate-200">
                  {table.drops.map((drop) => (
                    <tr key={`${table.id}-${drop.item}`}>
                      <td className="px-4 py-3 text-white">{drop.item}</td>
                      <td className={`px-4 py-3 ${rarityColor[drop.rarity] ?? "text-slate-300"}`}>{drop.rarity}</td>
                      <td className="px-4 py-3 text-slate-300">{drop.chance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
