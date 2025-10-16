import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MechanicHero, MechanicNotice, MechanicStepList } from "@/components/mechanics";
import { cards } from "@/data/cards";
import { fusions } from "@/data/fusions";
import { rebirthRows } from "@/data/rebirth";
import { buildPageMetadata } from "@/lib/site-metadata";
import OverviewArtwork from "@/assets/media/all-plants-and-brainrots-plants-vs-brainrots.webp";

export const metadata: Metadata = buildPageMetadata({
  title: "Core Mechanics Overview",
  description:
    "One hub for the Plants vs Brainrots card system, fuse machine, and rebirth loop—complete with quick links into detailed guides and tools.",
  path: "/mechanics",
});

const heroStats = [
  {
    label: "Cards tracked",
    value: `${cards.length}`,
    detail: "Drop rates synced from the live card packs",
  },
  {
    label: "Fuse recipes",
    value: `${fusions.length}`,
    detail: "Plant + brainrot combos catalogued in the machine",
  },
  {
    label: "Rebirth stages",
    value: `${rebirthRows.length}`,
    detail: "Each reset stacks +50% luck and +50% money",
  },
];

const roadmapSteps = [
  {
    title: "Secure your economy",
    description: "Start with the card system to stack income multipliers and guarantee rare spawn chances.",
  },
  {
    title: "Expand your roster",
    description: "Use the fuse machine to turn spare plants and brainrots into exclusives that anchor late-game lanes.",
  },
  {
    title: "Lock permanent gains",
    description: "Rebirth once your income curve plateaus so you can loop the cycle with higher base multipliers.",
  },
];

const mechanicCards = [
  {
    title: "Card system",
    href: "/card" as const,
    summary: "Drop rates, effect breakdowns, and deck templates to stabilise both damage and cash.",
    highlight: `${cards.filter((card) => ["Legendary", "Mythic", "Secret", "Godly", "Limited"].includes(card.rarity)).length} Legendary+ cards tracked`,
  },
  {
    title: "Fuse machine",
    href: "/fuse-recipe" as const,
    summary: "All plant + brainrot combinations with unlock milestones and no-refund warnings.",
    highlight: `${fusions.filter((fusion) => ["Legendary", "Mythic", "Secret", "Godly", "Limited"].includes(fusion.rarity)).length} high-rarity fusions`,
  },
  {
    title: "Rebirth loop",
    href: "/rebirth" as const,
    summary: "Stage-by-stage requirements, boss unlocks, and an actionable prep checklist for each reset.",
    highlight: `Final boss: ${rebirthRows[rebirthRows.length - 1]?.boss ?? "TBA"}`,
  },
];

export default function MechanicsOverviewPage() {
  return (
    <div className="container space-y-12 py-10">
      <MechanicHero
        eyebrow="Systems"
        title="Master the core mechanics"
        description="Follow this roadmap to balance income, power spikes, and permanent bonuses without juggling multiple tabs."
        stats={heroStats}
        media={
          <Image
            src={OverviewArtwork}
            alt="Plants vs Brainrots mechanics overview"
            className="h-auto w-72 rounded-3xl border border-slate-800 object-cover shadow-2xl shadow-slate-950/40"
            priority
          />
        }
      />

      <MechanicStepList title="Suggested progression" steps={roadmapSteps} />

      <section className="grid gap-6 md:grid-cols-3">
        {mechanicCards.map((mechanic) => (
          <Link
            key={mechanic.href}
            href={mechanic.href}
            className="group flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition hover:border-brand-400 hover:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{mechanic.title}</p>
            <p className="text-lg font-semibold text-white">{mechanic.summary}</p>
            <p className="text-sm text-brand-200">{mechanic.highlight}</p>
            <span className="mt-auto text-sm font-semibold text-brand-200 group-hover:text-white">Open guide →</span>
          </Link>
        ))}
      </section>

      <MechanicNotice tone="info" title="Bring the calculators with you">
        Cross-reference the mechanics with our
        {" "}
        <Link href="/plants-vs-brainrots-calculator" className="font-semibold text-white hover:text-brand-200">
          strategy calculators
        </Link>
        {" "}
        to model income, plant efficiency, and post-rebirth recovery windows.
      </MechanicNotice>
    </div>
  );
}
