import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { getPlantById, getPlantByName, getPlantBySlug, mutationInfo, toSlug } from "@/data/pvb-database";
import { getPlantMedia } from "@/data/media-assets";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { withCanonical } from "@/lib/site-metadata";

interface PlantDetailPageProps {
  params: { slug: string };
}

function resolvePlant(identifier: string) {
  const decoded = decodeURIComponent(identifier);

  if (/^\d+$/.test(decoded)) {
    return getPlantById(Number(decoded));
  }

  return getPlantBySlug(decoded) ?? getPlantByName(decoded);
}

export function generateMetadata({ params }: PlantDetailPageProps): Metadata {
  const plant = resolvePlant(params.slug);

  if (!plant) {
    return { title: "Plant not found" };
  }

  return {
    title: `${plant.name} | Plants vs Brainrots`,
    description: `Stats, mutations, and strategies for ${plant.name} in Plants vs Brainrots.`,
    ...withCanonical(`/plants/${plant.slug}`),
  };
}

export default function PlantDetailPage({ params }: PlantDetailPageProps) {
  const plant = resolvePlant(params.slug);

  if (!plant) {
    notFound();
  }

  const canonicalSlug = plant.slug;
  if (toSlug(params.slug) !== canonicalSlug) {
    redirect(`/plants/${canonicalSlug}`);
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
  const bestMutation = mutationEntries[mutationEntries.length - 1] ?? null;
  const earliestMutation = mutationEntries[0] ?? null;
  const damageGain = bestMutation ? bestMutation.value - baselineDps : null;
  const media = getPlantMedia(plant.name);

  return (
    <div className="container space-y-10">
      <nav className="text-xs uppercase tracking-[0.3em] text-slate-400">
        <Link href="/" className="hover:text-brand-200">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/plants" className="hover:text-brand-200">
          Plants
        </Link>
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
            <StatBlock
              label="Damage per cost"
              value={plant.costPerDmg.toFixed(1)}
              helpText="Lower is better"
            />
            {plant.specialEffect ? <StatBlock label="Signature effect" value={plant.specialEffect} /> : null}
          </div>
        </div>
        <div className="space-y-4">
          {media ? (
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-2">
                <Image
                  src={media.image}
                  alt={media.alt || plant.name}
                  className="h-56 w-full rounded-xl object-cover md:h-full"
                  priority
                  sizes="(min-width: 1024px) 320px, 100vw"
                />
              </div>
              <p className="text-center text-xs uppercase tracking-[0.3em] text-slate-400">
                {media.alt || `${plant.name} artwork`}
              </p>
            </div>
          ) : null}
          <div className="space-y-4 rounded-2xl border border-brand-500/40 bg-brand-500/10 p-6">
            <h3 className="text-lg font-semibold text-white">Quick build notes</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-brand-100">
              <li>
                {bestMutation
                  ? `${bestMutation.name.toUpperCase()} peaks at ${bestMutation.value.toLocaleString()} damage${
                      bestMutation.multiplier ? ` (×${bestMutation.multiplier.toFixed(1)})` : ""
                    }, giving roughly ${
                      damageGain && damageGain > 0
                        ? `+${damageGain.toLocaleString()} over baseline.`
                        : "a flat profile."
                    }`
                  : "No mutation data recorded yet."}
              </li>
              <li>
                {`Seed cost $${plant.seedCost.toLocaleString()} for ${baselineDps.toLocaleString()} base damage works out to ${plant.costPerDmg.toFixed(1)} damage per cash — plan upgrades around that efficiency breakpoint.`}
              </li>
              <li>
                {plant.specialEffect
                  ? `Signature effect: ${plant.specialEffect}`
                  : earliestMutation
                  ? `${earliestMutation.name.toUpperCase()} comes online first at ${earliestMutation.value.toLocaleString()} damage, so slot it for early farming lanes.`
                  : "Rotate this plant in lanes that can supply external crowd control."}
              </li>
            </ul>
          </div>
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
                  <td className="px-4 py-3">
                    {mutation.multiplier ? `×${mutation.multiplier.toFixed(1)}` : "—"}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {mutation.effect || "No additional effect documented."}
                  </td>
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
