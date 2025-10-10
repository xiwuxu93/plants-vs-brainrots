import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { gameInfo } from "@/data/pvb-database";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/tools/rebirth"),
  title: "Rebirth Planner",
  description: "Estimate Plants vs Brainrots rebirth multipliers and plan the ideal reset window with milestone guidance.",
};

const milestones = [
  {
    title: "Track your current cycle",
    description: "Log your passive income, lane strength, and upgrade tiers before locking in a rebirth.",
  },
  {
    title: "Project post-rebirth gains",
    description: "Estimate the bonus damage and income you will unlock so you know if the reset is worth it.",
  },
  {
    title: "Forecast payback windows",
    description: "See how many runs it takes to recoup the reset cost and surpass your previous peak.",
  },
];

export default function RebirthToolPage() {
  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Tool"
        title="Rebirth planner"
        description="The full planner is in development. This outline shows what the MVP will cover and how you can prepare your data."
      />

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            We are currently mapping the inputs needed for precise rebirth recommendations. That includes your highest-tier plants, current
            idle income, and mutation ownership. The first release will support quick comparisons so you can answer, &ldquo;If I rebirth now, when do I
            get back to my current power?&rdquo;
          </p>
          <p>
            Want to help shape it? Head to the Discord server and drop your spreadsheets or the exact questions you want answered. We will bake
            them directly into the planner workflows.
          </p>
        </div>
        <aside className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 text-sm text-purple-100">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200">Game requirement</p>
          <p className="mt-2 font-semibold text-white">{gameInfo.rebirthRequirement}</p>
          <p className="mt-4 text-xs text-purple-200">Last verified {gameInfo.lastUpdated}</p>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {milestones.map((milestone) => (
          <article key={milestone.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{milestone.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
