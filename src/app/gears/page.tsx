import { SectionHeading } from "@/components/section-heading";
import { gears } from "@/data/pvb-database";

const rarityColor: Record<string, string> = {
  Common: "text-slate-300",
  Rare: "text-emerald-200",
  Epic: "text-purple-200",
  Legendary: "text-amber-200",
  Mythic: "text-rose-200",
  Secret: "text-cyan-200",
};

export default function GearsPage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Database"
        title="Gear arsenal"
        description="Track every active ability item and plan rotations before raids or admin abuse timers hit."
      />

      <div className="overflow-hidden rounded-2xl border border-slate-800">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-900/80 text-left text-xs uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="px-4 py-3">Gear</th>
              <th className="px-4 py-3">Rarity</th>
              <th className="px-4 py-3 text-right">Cost</th>
              <th className="px-4 py-3 text-right">Cooldown</th>
              <th className="px-4 py-3">Effect</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60 bg-slate-950/70 text-sm text-slate-200">
            {gears.map((gear) => (
              <tr key={gear.id} className="transition hover:bg-slate-900/50">
                <td className="px-4 py-3 font-semibold text-white">{gear.name}</td>
                <td className={`px-4 py-3 ${rarityColor[gear.rarity] ?? "text-slate-300"}`}>{gear.rarity}</td>
                <td className="px-4 py-3 text-right text-slate-300">${gear.cost.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-slate-300">{gear.cooldown}s</td>
                <td className="px-4 py-3 text-slate-200">{gear.effect}</td>
                <td className="px-4 py-3 text-slate-300">{gear.source}</td>
                <td className="px-4 py-3 text-slate-300">{gear.notes ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
