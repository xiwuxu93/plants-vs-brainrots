import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/tools"),
  title: "Tools",
  description: "Access Plants vs Brainrots calculators for plant efficiency, fusion planning, income optimization, and rebirth prep.",
};

const tools = [
  {
    href: "/tools/plant-calculator" as const,
    title: "Plant Efficiency Calculator",
    description: "Punch in your budget and instantly see the optimal mix of plants and mutations.",
    status: "Interactive prototype",
  },
  {
    href: "/tools/efficiency" as const,
    title: "Income Optimizer",
    description: "Compare brainrot builds, weigh upgrade ROI, and discover income breakpoints.",
    status: "MVP available",
  },
  {
    href: "/tools/fusion-planner" as const,
    title: "Fusion Planner",
    description: "Track owned components and reveal which fusion recipes you can craft right now.",
    status: "New",
  },
  {
    href: "/tools/rebirth" as const,
    title: "Rebirth Planner",
    description: "Estimate next-cycle gains and pinpoint the profit cliff where rebirthing pays off.",
    status: "Coming soon",
  },
];

const checklist = [
  "Budget-aware recommendations that account for mutation scaling",
  "Live stock insights with planning utilities",
  "Shareable build summaries for community theorycrafting",
];

export default function ToolsPage() {
  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Tools"
        title="Strategy calculators built for fast iteration"
        description="Every calculator is designed to answer the questions players ask before every boss cycle and rebirth reset."
      />

      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {tools.map((tool) => (
            <article
              key={tool.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
                <span className="rounded-full border border-brand-400/40 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brand-200">
                  {tool.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{tool.description}</p>
              <Link
                href={tool.href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 hover:text-white"
              >
                Open tool →
              </Link>
            </article>
          ))}
        </div>
        <aside className="flex flex-col gap-4 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-6">
          <h3 className="text-lg font-semibold text-white">What the MVP delivers</h3>
          <ul className="list-disc space-y-3 pl-5 text-sm text-brand-100">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-200">Share your feedback in Discord →</p>
        </aside>
      </section>
    </div>
  );
}
