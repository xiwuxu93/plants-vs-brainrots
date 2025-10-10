import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/guides/beginner"),
  title: "Beginner Guide",
  description: "Step-by-step Plants vs Brainrots beginner roadmap covering lane setups, income, and first rebirth timing.",
};

const steps = [
  {
    title: "Secure your lanes",
    details: [
      "Open with low-cost Rare plants such as Cactus and Strawberry to cover early waves.",
      "Drop a control plant (Pumpkin or similar) on every third tile to slow pushers.",
      "Upgrade to Epic-tier anchors before investing in mutations.",
    ],
  },
  {
    title: "Build a reliable economy",
    details: [
      "Aim to unlock at least two Light brainrots within the first ten minutes.",
      "Mutate to Gold early; the 2× income boost speeds up every other unlock.",
      "Keep one lane free of upgrades so you can funnel seeds for emergency buys.",
    ],
  },
  {
    title: "Plan your first rebirth",
    details: [
      "Hold off until you can afford both The Gazini and The Trali plants—this unlocks rebirth access.",
      "Snapshot your damage and income before rebirthing so you can compare post-reset gains.",
      "Use the rebirth planner (coming soon) to check the payback window.",
    ],
  },
];

export default function BeginnerGuidePage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Guide"
        title="Beginner roadmap"
        description="Master the fundamentals in your first few hours so every upgrade decision compounds."
      />
      <section className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        {steps.map((step) => (
          <article key={step.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-lg font-semibold text-white">{step.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
              {step.details.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <Link href="/guides" className="text-sm font-semibold text-brand-200 hover:text-white">
        ← Back to guides
      </Link>
    </div>
  );
}
