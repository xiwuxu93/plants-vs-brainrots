import { SectionHeading } from "@/components/section-heading";
import { gameInfo } from "@/data/pvb-database";
import { rebirthRows } from "@/data/rebirth";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Rebirth Planner",
  description: "Estimate Plants vs Brainrots rebirth multipliers and plan the ideal reset window with milestone guidance.",
  path: "/tools/rebirth",
});

const milestones = [
  {
    title: "Capture your baseline",
    description: "Record current $/s, boss level, and highest plant tier so you can measure the rebound after rebirth.",
  },
  {
    title: "Confirm the requirements",
    description: "Cross-check cash and brainrot needs using our rebirth table before you dismantle your roster.",
  },
  {
    title: "Plot the rebuild",
    description: "List the first five purchases post-reset so you sprint back to your pre-rebirth income curve.",
  },
];

const nextRebirthTarget = rebirthRows[0];

export default function RebirthToolPage() {
  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Tool"
        title="Rebirth planner"
        description="Use this worksheet to decide when to reset, what to stockpile, and how to stabilise income during the next cycle."
      />

      <section className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            Start by capturing a snapshot of your lane setup: current $/s, highest boss cleared, and the plant tiers anchoring each tile. That
            baseline tells you how quickly the next cycle needs to rebuild before it surpasses your previous peak.
          </p>
          <p>
            Next, compare what you own against the official requirements below. If you are missing a brainrot, add it to a farming list along
            with its drop table. Finally, script a five-step rebuild plan so you know exactly what to purchase once the reset lands.
          </p>
        </div>
        <aside className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-6 text-sm text-purple-100">
          <p className="text-xs uppercase tracking-[0.3em] text-purple-200">Next milestone</p>
          <p className="mt-2 font-semibold text-white">{nextRebirthTarget.stage}</p>
          <ul className="mt-3 space-y-1 text-xs text-purple-100/90">
            <li>Cash: {nextRebirthTarget.cashDisplay ?? "—"}</li>
            <li>Brainrots: {nextRebirthTarget.brainrotRequirement ?? "—"}</li>
            <li>Reward: {nextRebirthTarget.rewards || "—"}</li>
          </ul>
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
