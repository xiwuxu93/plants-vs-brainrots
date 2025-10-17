import type { Metadata } from "next";
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
} from "@/data/pvb-database";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Game Database & Tools",
  description:
    "Strategy companion for Plants vs Brainrots with data-driven tools, fusion planning, live stock tracking, and event timelines.",
  path: "/",
});

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

const mechanicHighlights = [
  {
    title: "Card system essentials",
    description: "See live drop odds, recommended combos, and deck templates before you roll packs.",
    href: "/card" as const,
  },
  {
    title: "Fuse machine roadmap",
    description: "Track every plant + brainrot recipe, unlock requirement, and cautionary note.",
    href: "/fuse-recipe" as const,
  },
  {
    title: "Rebirth checklist",
    description: "Review cash and brainrot requirements plus rebuild plans for each stage.",
    href: "/rebirth" as const,
  },
];

const featureHighlights = [
  {
    title: "Strategic plant placement",
    description:
      "Lay out lanes that balance slows, burst, and shields so every wave stalls before it reaches your base.",
    emoji: "🌱",
  },
  {
    title: "Income generation system",
    description:
      "Collect defeated brainrots and convert them into passive income to bankroll high-tier seeds and upgrades.",
    emoji: "💰",
  },
  {
    title: "Plant fusion mechanics",
    description:
      "Fuse duplicate plants into advanced forms—like Mr. Carrot—to unlock dramatic damage spikes.",
    emoji: "🔄",
  },
  {
    title: "Rarity progression",
    description:
      "Climb through Common, Rare, Mythic, Secret, and Godly plants, each bringing unique abilities to your roster.",
    emoji: "⭐",
  },
  {
    title: "Rebirth bonuses",
    description:
      "Reset at the right moment to lock in permanent +50% money and luck, accelerating every future run.",
    emoji: "🌀",
  },
  {
    title: "Meme-inspired enemies",
    description:
      "Square off against viral characters and internet jokes that keep every defense scenario lighthearted.",
    emoji: "🎭",
  },
];

const officialLinks = [
  {
    title: "Roblox game",
    description: "Jump straight into the Plants vs Brainrots experience on Roblox.",
    href: "https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots" as const,
  },
  {
    title: "Roblox community",
    description: "Follow Yo Gurt Studio announcements from the official Roblox community hub.",
    href: "https://www.roblox.com/communities/34869880/Yo-Gurt-Studio" as const,
  },
];

const faqItems = [
  {
    question: "How do I start playing Plants vs Brainrots?",
    answer:
      "Purchase seeds from the in-game shop, plant them in your garden, and let them automatically defend each lane. Scoop up defeated brainrots to generate money for stronger seeds.",
  },
  {
    question: "What is the most effective strategy for beginners?",
    answer:
      "Blend low-cost slows in front with heavy hitters in the back. This mix stretches waves while your high-damage plants melt brainrots safely.",
  },
  {
    question: "How does the plant fusion system work?",
    answer:
      "Visit the fuse machine with duplicate plants to create empowered versions. For example combining charitos upgrades the result into Mr. Carrot for a huge DPS bump.",
  },
  {
    question: "When should I consider rebirthing?",
    answer:
      "Wait until you own late-game plants like The Gazini and The Trali and feel your progression slowing. The +50% money and luck bonus is worth it once those checkpoints are met.",
  },
  {
    question: "Can I play without spending Robux?",
    answer:
      "Yes. Everything in Plants vs Brainrots can be earned for free, though premium purchases like the Carnivorous Godly Plant speed up unlocks.",
  },
  {
    question: "How is this different from other Brainrot games?",
    answer:
      "Plants vs Brainrots focuses on lane defense and tower strategy. Other Brainrot games lean into tycoon or pet sim mechanics, so plan on defending waves here.",
  },
];

function formatDateTime(value: string | Date, options: Intl.DateTimeFormatOptions) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

function getCountdown(target: Date) {
  const diffMs = target.getTime() - Date.now();
  if (diffMs <= 0) return null;

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
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
  const nextEventCountdown = nextEvent ? getCountdown(nextEvent.start) : null;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeHero />
      <div className="container">
        <div className="flex flex-col gap-3 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-sm text-emerald-100 shadow shadow-emerald-500/10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3 md:items-center">
            <span role="img" aria-label="Stock alert" className="text-lg">
              📦
            </span>
            <div>
              <p className="font-semibold text-white">Real-time shop tracker is live.</p>
              <p className="mt-1 text-emerald-200 md:mt-0 md:text-sm">
                Watch restocks, rotation swaps, and stock counts without refreshing Discord logs.
              </p>
            </div>
          </div>
          <Link
            href="/stock"
            className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100 transition hover:border-emerald-200 hover:text-white md:text-sm"
          >
            Open stock tracker →
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="flex flex-col gap-3 rounded-3xl border border-brand-500/40 bg-brand-500/10 px-6 py-4 text-sm text-brand-100 shadow shadow-brand-500/10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span role="img" aria-label="sparkles" className="text-lg">
              ✨
            </span>
            <p className="font-semibold text-white">Data pulled from the live Roblox experience and refreshed with every sync.</p>
          </div>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-full border border-brand-400 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-200 transition hover:border-brand-200 hover:text-white"
          >
            Search the database →
          </Link>
        </div>
      </div>
      <QuickStats />

      <section className="container">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Link
            href="/fuse-recipe"
            className="group rounded-3xl border border-sky-500/30 bg-slate-900/70 p-6 transition hover:border-sky-400/70 hover:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-sky-200">Fuse machine</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">All fusion combos at a glance</h2>
            <p className="mt-3 text-sm text-slate-300">
              Browse every plant + brainrot combination, unlock requirement, and rarity multiplier before you fuel the machine.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-200 group-hover:text-white">
              Explore recipes →
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
            {nextEventCountdown ? (
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-500">
                Starts in {nextEventCountdown.days}d {nextEventCountdown.hours}h {nextEventCountdown.minutes}m
              </p>
            ) : null}
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
              Plants vs Brainrots is a tower defense game from Yo Gurt Studio on Roblox that remixes classic lane defense
              with meme-fueled Brainrot enemies. Plant seeds, fortify each tile, and unleash combos that keep waves pinned
              long enough for your damage anchors to shred them.
            </p>
            <p className="mt-4">
              Every defeated enemy can be dropped into your base to print passive income, which rolls straight into higher
              rarity plants, fusion recipes, and rebirth perks. This hub mirrors the latest community wiki so you can track
              restocks, plan fusions, and theorycraft without digging through multiple sources.
            </p>
            <Link href="/mechanics" className="mt-4 inline-flex text-sm font-semibold text-brand-200 hover:text-white">
              Explore the core mechanics →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          eyebrow="Mechanics"
          title="Dial in your core systems"
          description="Jump straight into the card system, fuse machine, and rebirth loop with data-backed primers."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mechanicHighlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-brand-400 hover:shadow-lg hover:shadow-brand-500/10"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand-200">Open system →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container">
        <SectionHeading
          eyebrow="FAQ"
          title="Plants vs Brainrots essentials"
          description="Direct answers to the latest questions coming from the official community."
        />
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-brand-400/50"
            >
              <summary className="cursor-pointer text-base font-semibold text-white marker:text-brand-300">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-slate-300">
                {item.answer}
              </p>
            </details>
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
