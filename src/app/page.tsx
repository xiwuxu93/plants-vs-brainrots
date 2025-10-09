import { BrainrotCard } from "@/components/brainrot-card";
import { HomeHero } from "@/components/home-hero";
import { PlantCard } from "@/components/plant-card";
import { QuickStats } from "@/components/quick-stats";
import { SectionHeading } from "@/components/section-heading";
import {
  brainrots,
  codeHistory,
  events,
  gameInfo,
  mutationInfo,
  plants,
  stockHistory,
} from "@/data/pvb-database";
import Link from "next/link";

const toolHighlights = [
  {
    title: "Calculator Suite",
    description: "Mirror the community-favorite multi-tool for brainrots, plants, and cash planning.",
    href: "/plants-vs-brainrots-calculator" as const,
  },
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

const featureHighlights = [
  {
    title: "Strategic plant lanes",
    description:
      "Pair burst damage with slows, shields, and income plants to counter every meme-inspired wave.",
    emoji: "🌱",
  },
  {
    title: "Brainrot economy",
    description:
      "Convert defeated enemies into passive income and scale your farm for late-game fusions.",
    emoji: "💰",
  },
  {
    title: "Mutation mastery",
    description:
      "Track multipliers and plan diamond, neon, and event-exclusive upgrades before you spend.",
    emoji: "🧬",
  },
  {
    title: "Co-op readiness",
    description:
      "Prepare gear rotations, raid utilities, and countdown timelines so squads never miss an event.",
    emoji: "🤝",
  },
];

const officialLinks = [
  {
    title: "Roblox game",
    description: "Jump straight into the Plants vs Brainrots experience on Roblox.",
    href: "https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots" as const,
  },
  // {
  //   title: "Discord server",
  //   description: "Join traders and get real-time stock alerts from the community.",
  //   href: "https://discord.gg/937Mfk4zGN" as const,
  // },
];

function formatDateTime(value: string | Date, options: Intl.DateTimeFormatOptions) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

export default function HomePage() {
  const featuredPlants = [...plants]
    .sort((a, b) => b.baseDmg - a.baseDmg)
    .slice(0, 3);

  const featuredBrainrots = [...brainrots]
    .sort((a, b) => b.baseIncome - a.baseIncome)
    .slice(0, 3);

  const plantMutationEntries = Object.entries(mutationInfo.plants);
  const brainrotMutationEntries = Object.entries(mutationInfo.brainrots);

  const activeCodes = [...codeHistory]
    .filter((entry) => entry.status.toLowerCase() === "active")
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
  const latestCodes = activeCodes.slice(0, 3);

  const lastStockTimestamp = stockHistory[0]?.timestamp ?? null;
  const lastStockDisplay = lastStockTimestamp
    ? formatDateTime(lastStockTimestamp, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const sortedEvents = events
    .map((event) => ({ ...event, start: new Date(event.startDate) }))
    .filter((event) => !Number.isNaN(event.start.getTime()))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  const nextEvent = sortedEvents.find((event) => event.start.getTime() > Date.now()) ?? sortedEvents[0];
  const nextEventStartDisplay = nextEvent
    ? formatDateTime(nextEvent.start, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const nextEventEndDisplay = nextEvent?.endDate
    ? formatDateTime(nextEvent.endDate, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

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
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Link
            href="/stock"
            className="group rounded-3xl border border-emerald-500/30 bg-slate-900/70 p-6 transition hover:border-emerald-400/70 hover:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300">Live services</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Real-time stock tracker</h2>
            <p className="mt-3 text-sm text-slate-300">
              Leave the dashboard open to monitor restocks, rotation timers, and event-limited seeds the second they flip.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-200">
              Last refresh {lastStockDisplay}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 group-hover:text-white">
              View stock →
            </p>
          </Link>
          <Link
            href="/events"
            className="rounded-3xl border border-purple-500/30 bg-slate-900/70 p-6 transition hover:border-purple-400/60 hover:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-purple-200">Next event</p>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {nextEvent ? nextEvent.name : "No event scheduled"}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {nextEvent && nextEventStartDisplay
                ? `${nextEventStartDisplay}${nextEventEndDisplay ? ` · Ends ${nextEventEndDisplay}` : ""}`
                : "Check the events hub for the latest schedule."}
            </p>
            {nextEvent?.modifiers?.length ? (
              <ul className="mt-4 space-y-1 text-xs text-slate-400">
                {nextEvent.modifiers.slice(0, 3).map((modifier) => (
                  <li key={modifier}>• {modifier}</li>
                ))}
              </ul>
            ) : null}
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-200 hover:text-white">
              Event timeline →
            </p>
          </Link>
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Codes"
          title="Latest active drops"
          description="Redeem these verified codes for free cash and boosts, then bookmark the hub for future updates."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {latestCodes.length === 0 ? (
            <p className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300 md:col-span-3">
              No active codes right now. We will post fresh drops as soon as they land.
            </p>
          ) : (
            latestCodes.map((code) => (
              <article
                key={code.code}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-300"
              >
                <p className="text-lg font-semibold text-white">{code.code}</p>
                <p className="mt-1 text-slate-300">{code.reward}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                  Added {formatDateTime(code.addedAt, { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </article>
            ))
          )}
        </div>
        <div className="mt-6 text-right">
          <Link href="/codes" className="text-sm font-semibold text-brand-200 hover:text-white">
            See every code →
          </Link>
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-500">
          Data sync {formatDateTime(gameInfo.lastUpdated, { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Official"
          title="Official game channels"
          description="Hop into the Roblox experience or join the community that tracks every restock and mutation."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {officialLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-brand-400/60 hover:bg-slate-900"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{link.title}</p>
              <p className="mt-2 text-base text-slate-200">{link.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand-200">Open link →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="Overview"
          title="What is Plants vs Brainrots?"
          description="A meme-fueled tower defense where every defeat powers your economy."
        />
        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
            <p>
              Plants vs Brainrots reimagines classic lane defense through the lens of internet culture. Collect seeds,
              reinforce your garden, and turn defeated brainrots into passive income that bankrolls high-tier fusions.
            </p>
            <p className="mt-4">
              Our hub pulls in live stock snapshots, curated loadouts, and calculators so strategists always know their
              next upgrade before wave timers tick down.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featureHighlights.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-sm text-slate-300"
              >
                <p className="text-2xl">{feature.emoji}</p>
                <p className="mt-2 text-base font-semibold text-white">{feature.title}</p>
                <p className="mt-2">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
    </div>
  );
}
