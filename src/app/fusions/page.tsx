import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { fusionRecipes } from "@/data/pvb-database";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/fusions"),
  title: "Fusion Recipes",
  description: "Track every Plants vs Brainrots fusion recipe with inputs, costs, and unlock requirements.",
};

export default function FusionsPage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Database"
        title="Fusion recipes"
        description="Plan your lab sessions with a full breakdown of inputs, costs, and unlock requirements for every fusion currently tracked."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {fusionRecipes.map((recipe) => (
          <article
            key={recipe.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm shadow-slate-950/30"
          >
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{recipe.rarity}</p>
              <h2 className="text-xl font-semibold text-white">{recipe.result}</h2>
              <p className="text-sm text-slate-300">Unlock: {recipe.unlock}</p>
            </header>

            <dl className="mt-4 space-y-2 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <dt className="uppercase tracking-[0.2em] text-slate-400">Cost</dt>
                <dd>${recipe.cost.toLocaleString()}</dd>
              </div>
            </dl>

            <section className="mt-4">
              <h3 className="text-xs uppercase tracking-[0.3em] text-slate-400">Required inputs</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-200">
                {recipe.inputs.map((input) => (
                  <li key={`${recipe.id}-${input.item}`}>
                    <span className="font-semibold text-white">{input.count}×</span> {input.item}
                  </li>
                ))}
              </ul>
            </section>

            {recipe.notes ? (
              <p className="mt-4 text-sm text-slate-300">{recipe.notes}</p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
