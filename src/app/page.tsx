import { BrainrotCard } from "@/components/brainrot-card";
import { HomeHero } from "@/components/home-hero";
import { PlantCard } from "@/components/plant-card";
import { QuickStats } from "@/components/quick-stats";
import { SectionHeading } from "@/components/section-heading";
import { brainrots, gameInfo, mutationInfo, plants } from "@/data/pvb-database";
import Link from "next/link";

const toolHighlights = [
  {
    title: "Plant Efficiency Calculator",
    description: "Balance cost, damage, and mutations to build bulletproof lanes.",
    href: "/tools/plant-calculator" as const,
  },
  {
    title: "Income Optimizer",
    description: "Find the highest-yield brainrots for every budget tier.",
    href: "/tools/efficiency" as const,
  },
  {
    title: "Rebirth Planner",
    description: "Forecast prestige gains and identify the perfect rebirth window.",
    href: "/tools/rebirth" as const,
  },
];

const guideHighlights = [
  {
    title: "Beginner Loadouts",
    description: "Step-by-step build orders that carry you to your first rebirth.",
    href: "/guides/beginner" as const,
  },
  {
    title: "Mutation Meta Deep Dive",
    description: "Understand when to invest in gold, diamond, and neon upgrades.",
    href: "/guides/advanced" as const,
  },
  {
    title: "Boss Arena Playbook",
    description: "Counter every boss pattern with recommended squad rotations.",
    href: "/guides/bosses" as const,
  },
];

export default function HomePage() {
  const featuredPlants = [...plants]
    .sort((a, b) => b.baseDmg - a.baseDmg)
    .slice(0, 3);

  const featuredBrainrots = [...brainrots]
    .sort((a, b) => b.baseIncome - a.baseIncome)
    .slice(0, 3);

  const plantMutationEntries = Object.entries(mutationInfo.plants);
  const brainrotMutationEntries = Object.entries(mutationInfo.brainrots);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I track Plants vs Brainrots stock in real time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Open the Stock Tracker to watch live restocks, status badges, and historical snapshots. It auto-refreshes every ten minutes and falls back to the latest cached data.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find complete plant and brainrot stats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Use the Plants and Brainrots databases for tier lists, mutation multipliers, seed costs, gear synergy, and quick navigation into detailed pages.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you have calculators for budget planning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. The Plant Efficiency Calculator models damage, ROI, mutation weights, and stock availability while the Fusion Planner tracks missing components and optimal farm routes.',
        },
      },
    ],
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />
      <QuickStats />

      <section className="container">
        <SectionHeading
          eyebrow="Featured"
          title="Hard-hitting plants to anchor any lineup"
          description="We track damage curves, mutation payoffs, and tier placements so you can make data-backed roster decisions."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link href="/plants" className="text-sm font-semibold text-brand-200 hover:text-white">
            View full plant database →
          </Link>
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Economy"
          title="Brainrot income leaders"
          description="Compare per-second income, weight classes, and mutation multipliers to maximize your idle gains."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredBrainrots.map((brainrot) => (
            <BrainrotCard key={brainrot.id} brainrot={brainrot} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link href="/brainrots" className="text-sm font-semibold text-purple-200 hover:text-white">
            Explore every brainrot →
          </Link>
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Tools"
          title="Command center for theorycrafters"
          description="Each calculator is purpose-built for the questions the community asks the most."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {toolHighlights.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <h3 className="text-lg font-semibold text-white">{tool.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{tool.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand-200">Open tool →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Guides"
          title="Play smarter with curated blueprints"
          description="Short, actionable guides that get straight to the moves you should make next."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {guideHighlights.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{guide.description}</p>
              <p className="mt-4 text-sm font-semibold text-purple-200">Read guide →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Mutations"
          title="Know exactly what each mutation delivers"
          description="Understand the real damage and income multipliers before you spend precious resources."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Plant Mutations</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {plantMutationEntries.map(([name, info]) => (
                <li key={name}>
                  <span className="font-semibold text-brand-200">{name.toUpperCase()}</span>
                  {": "}
                  {info.effect} · ×{info.damageMultiplier.toFixed(1)} damage
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Brainrot Mutations</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {brainrotMutationEntries.map(([name, info]) => (
                <li key={name}>
                  <span className="font-semibold text-purple-200">{name.toUpperCase()}</span>
                  {": "}
                  {info.effect} · ×{info.incomeMultiplier.toFixed(1)} income
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-8 text-center md:p-12">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Always know the newest redeem codes</h2>
          <p className="mt-4 text-sm text-slate-300">
            We monitor every update drop. Bookmark the codes hub so you never miss a free seed or cash boost.
          </p>
          <Link
            href="/codes"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            See active codes
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-200">
            Last updated {new Date(gameInfo.lastUpdated).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>
    </div>
  );
}
