import { SectionHeading } from "@/components/section-heading";
import { getPlantById, mutationInfo, plants } from "@/data/pvb-database";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PlantDetailPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: PlantDetailPageProps): Metadata {
  const plant = getPlantById(Number(params.id));
  if (!plant) {
    return {
      title: "Plant not found",
    };
  }
  return {
    title: `${plant.name} | Plants vs Brainrots`,
    description: `Stats, mutations, and strategies for ${plant.name} in Plants vs Brainrots.`,
  };
}

export default function PlantDetailPage({ params }: PlantDetailPageProps) {
  const plant = getPlantById(Number(params.id));
  if (!plant) {
    notFound();
  }

  const mutationEntries = Object.entries(plant.mutations)
    .map(([name, value]) => ({
      name,
      value,
      multiplier: mutationInfo.plants[name]?.damageMultiplier ?? null,
      effect: mutationInfo.plants[name]?.effect ?? "",
    }))
    .sort((a, b) => a.value - b.value);

  const baselineDps = plant.baseDmg;

  return (
    <div className="container space-y-10">
      <nav className="text-xs uppercase tracking-[0.3em] text-slate-400">
        <Link href="/" className="hover:text-brand-200">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/plants" className="hover:text-brand-200">Plants</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{plant.name}</span>
      </nav>

      <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Plant overview"
            title={plant.name}
            description="Fine-tune lane coverage with complete damage, cost, and mutation data."
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <StatBlock label="Rarity" value={plant.rarity} />
            <StatBlock label="Tier" value={plant.tier} />
            <StatBlock label="Seed cost" value={`$${plant.seedCost.toLocaleString()}`} />
            <StatBlock label="Base damage" value={baselineDps.toLocaleString()} />
            <StatBlock label="Damage per cost" value={plant.costPerDmg.toFixed(1)} helpText="Lower is better" />
            {plant.specialEffect ? <StatBlock label="Signature effect" value={plant.specialEffect} /> : null}
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-brand-500/40 bg-brand-500/10 p-6">
          <h3 className="text-lg font-semibold text-white">Quick build notes</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-brand-100">
            <li>Best mutation: {mutationEntries[mutationEntries.length - 1]?.name.toUpperCase()}</li>
            <li>Upgrade priority: unlock Neon once your economy stabilizes.</li>
            <li>Pairs well with high slow/control lanes to maximize uptime.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
        <h2 className="text-xl font-semibold text-white">Mutation scaling</h2>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.3em] text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Mutation</th>
                <th className="px-4 py-3 text-left">Damage</th>
                <th className="px-4 py-3 text-left">Multiplier</th>
                <th className="px-4 py-3 text-left">Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/70 text-sm text-slate-200">
              {mutationEntries.map((mutation) => (
                <tr key={mutation.name} className="transition hover:bg-slate-900/50">
                  <td className="px-4 py-3 font-semibold text-brand-200">{mutation.name.toUpperCase()}</td>
                  <td className="px-4 py-3">{mutation.value.toLocaleString()}</td>
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

function StatBlock({ label, value, helpText }: { label: string; value: string | number; helpText?: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
      {helpText ? <p className="text-xs text-slate-400">{helpText}</p> : null}
    </div>
  );
}
