import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Boss Battle Tactics",
  description: "Counter every Plants vs Brainrots boss with recommended squads, rotations, and timing windows.",
  path: "/guides/bosses",
});

const bosses = [
  {
    name: "The Churn",
    tactic: "Spam control plants and save burst for the 50% health phase when adds spawn.",
  },
  {
    name: "Voraxis",
    tactic: "Rotate heavy hitters across lanes to dodge the armor stacking debuff.",
  },
  {
    name: "Mindflare",
    tactic: "Prioritize Neon mutations; the bonus damage slices through the shield regeneration threshold.",
  },
];

export default function BossGuidePage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Guide"
        title="Boss battle tactics"
        description="Break every boss into predictable beats so you can pre-plan rotations and ability timing."
      />
      <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-3">
        {bosses.map((boss) => (
          <article key={boss.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-lg font-semibold text-white">{boss.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{boss.tactic}</p>
          </article>
        ))}
      </section>
      <Link href="/guides" className="text-sm font-semibold text-brand-200 hover:text-white">
        ← Back to guides
      </Link>
    </div>
  );
}
