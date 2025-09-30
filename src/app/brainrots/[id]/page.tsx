import { SectionHeading } from "@/components/section-heading";
import { brainrots, getBrainrotById, mutationInfo } from "@/data/pvb-database";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BrainrotDetailPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: BrainrotDetailPageProps): Metadata {
  const brainrot = getBrainrotById(Number(params.id));
  if (!brainrot) {
    return {
      title: "Brainrot not found",
    };
  }
  return {
    title: `${brainrot.name} | Plants vs Brainrots`,
    description: `Income tiers, weight class, and best mutations for ${brainrot.name}.`,
  };
}

export default function BrainrotDetailPage({ params }: BrainrotDetailPageProps) {
  const brainrot = getBrainrotById(Number(params.id));
  if (!brainrot) {
    notFound();
  }

  const mutationEntries = Object.entries(brainrot.mutations)
    .map(([name, value]) => ({
      name,
      value,
      multiplier: mutationInfo.brainrots[name]?.incomeMultiplier ?? null,
      effect: mutationInfo.brainrots[name]?.effect ?? "",
    }))
    .sort((a, b) => a.value - b.value);

  const bestMutation = mutationEntries[mutationEntries.length - 1]?.name ?? "";

  return (
    <div className="container space-y-10">
      <nav className="text-xs uppercase tracking-[0.3em] text-slate-400">
        <Link href="/" className="hover:text-purple-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/brainrots" className="hover:text-purple-200">Brainrots</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{brainrot.name}</span>
      </nav>

      <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Brainrot profile"
            title={brainrot.name}
            description="Dial in income scaling and mutation timing for faster rebirth cycles."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <StatBlock label="Rarity" value={brainrot.rarity} />
            <StatBlock label="Tier" value={brainrot.tier} />
            <StatBlock label="Weight" value={brainrot.weight} />
            <StatBlock label="Base income" value={`$${brainrot.baseIncome.toLocaleString()}/sec`} />
            <StatBlock label="Best mutation" value={bestMutation.toUpperCase()} />
            <StatBlock label="Max income" value={`$${mutationEntries[mutationEntries.length - 1]?.value.toLocaleString()}/sec`} />
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-purple-500/40 bg-purple-500/10 p-6">
          <h3 className="text-lg font-semibold text-white">Run management tips</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-purple-100">
            <li>Prioritize {bestMutation.toUpperCase()} mutation during double-income events.</li>
            <li>Combine with Legendary Heavy plants to balance lane weight.</li>
            <li>Reinvest earnings once upgrade ROI drops below 250%.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <h2 className="text-xl font-semibold text-white">Income scaling by mutation</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.3em] text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Mutation</th>
                <th className="px-4 py-3 text-left">Income/sec</th>
                <th className="px-4 py-3 text-left">Multiplier</th>
                <th className="px-4 py-3 text-left">Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/70 text-sm text-slate-200">
              {mutationEntries.map((mutation) => (
                <tr key={mutation.name} className="transition hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-semibold text-purple-200">{mutation.name.toUpperCase()}</td>
                  <td className="px-4 py-3">${mutation.value.toLocaleString()}</td>
                  <td className="px-4 py-3">{mutation.multiplier ? `×${mutation.multiplier.toFixed(1)}` : "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{mutation.effect || "No additional effect documented."}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
