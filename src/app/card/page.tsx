import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MechanicHero, MechanicNotice, MechanicStepList } from "@/components/mechanics";
import { SectionHeading } from "@/components/section-heading";
import { cardsGuide, cards, cardSections, relatedGuides } from "@/data/cards";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Card Drop Rates & Strategies",
  description:
    "Comprehensive look at every Plants vs Brainrots card with drop chances, effects, and strategic tips for building the strongest decks.",
  path: "/card",
});

const rarityStyles: Record<string, string> = {
  Common: "bg-slate-600 text-white",
  Uncommon: "bg-emerald-600 text-white",
  Rare: "bg-blue-600 text-white",
  Epic: "bg-purple-600 text-white",
  Legendary: "bg-amber-500 text-slate-900",
  Mythic: "bg-pink-600 text-white",
  Secret: "bg-rose-600 text-white",
  Godly: "bg-orange-600 text-white",
  Limited: "bg-teal-600 text-white",
};

const formatChance = (chanceText: string, chance: number | null) => {
  if (chanceText) return chanceText;
  if (typeof chance === "number") return `${chance.toFixed(2)}%`;
  return "—";
};

const formatTimestamp = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const getRarityClass = (rarity: string) => rarityStyles[rarity] ?? "bg-slate-700 text-white";

function GuideSection({ section }: { section: (typeof cardSections)[number] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2>
      {section.intro.map((paragraph, index) => (
        <p key={index} className="text-sm text-slate-300">
          {paragraph}
        </p>
      ))}
      {section.entries.map((entry, index) => (
        <div key={entry.title ?? `entry-${index}`} className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-5">
          {entry.title ? <h3 className="text-lg font-semibold text-white">{entry.title}</h3> : null}
          {entry.body.map((paragraph, pIndex) => (
            <p key={pIndex} className="text-sm text-slate-300">
              {paragraph}
            </p>
          ))}
          {entry.lists?.map((list, listIndex) => {
            const Tag = (list.type === "ordered" ? "ol" : "ul") as "ol" | "ul";
            return (
              <Tag
                key={`${entry.title ?? `entry-${index}`}-${listIndex}`}
                className="list-inside space-y-1 text-sm text-slate-200"
                style={list.type === "ordered" ? { listStyleType: "decimal" } : { listStyleType: "disc" }}
              >
                {list.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="pl-1">
                    {item}
                  </li>
                ))}
              </Tag>
            );
          })}
        </div>
      ))}
      {section.notes.map((note, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg border border-blue-500/40 bg-blue-500/10 p-4 text-sm text-blue-100"
        >
          <span aria-hidden="true">⚠️</span>
          <span>{note}</span>
        </div>
      ))}
    </section>
  );
}

const heroStats = (() => {
  const total = cards.length;
  const highTierCount = cards.filter((card) => ["Epic", "Legendary", "Mythic", "Secret", "Godly", "Limited"].includes(card.rarity)).length;
  const legendaryPlus = cards.filter((card) => ["Legendary", "Mythic", "Secret", "Godly", "Limited"].includes(card.rarity)).length;
  const firstLegendary = cards.find((card) => card.rarity === "Legendary");
  return [
    {
      label: "Cards tracked",
      value: `${total}`,
      detail: "Synced with the in-game card pack pool",
    },
    {
      label: "Epic+ share",
      value: `${Math.round((highTierCount / total) * 100)}%`,
      detail: `${highTierCount} premium drops across all packs`,
    },
    {
      label: "Legendary+ cards",
      value: `${legendaryPlus}`,
      detail: "Legendary, Mythic, Secret, Godly, Limited",
    },
    {
      label: "Legendary headliner",
      value: firstLegendary ? firstLegendary.name : "—",
      detail: firstLegendary ? firstLegendary.description : "Updated each sync",
    },
  ];
})();

const deckBuildingSteps = [
  {
    title: "Lock the economy core",
    description: "Prioritise income boosters (Brainrot Blessing, Bloom Bank) before stacking damage cards so your cash flow explodes.",
  },
  {
    title: "Add control and burst",
    description: "Layer crowd-control cards (Whirlwind, Freezing Field) with burst picks (Toxic Cloud) for boss stability.",
  },
  {
    title: "Reserve flex slots",
    description: "Keep at least one slot for event or mutation synergy cards so you can pivot to limited-time drops quickly.",
  },
];

export default function CardGuidePage() {
  const lastUpdated = formatTimestamp(cardsGuide.generatedAt);
  const collageCards = cards.slice(0, 3);

  return (
    <div className="container space-y-12 py-10">
      <MechanicHero
        eyebrow="Cards"
        title="Card drop rates & deck planning"
        description="Track every card released in Plants vs Brainrots, understand how to unlock them, and stack effects for the strongest defensive loadouts."
        stats={heroStats}
        media={
          <div className="relative flex h-64 w-full max-w-xs items-center justify-center">
            {collageCards.map((card, index) => (
              <Image
                key={card.slug}
                src={card.image ?? "/og.png"}
                alt={`${card.name} card art`}
                width={120}
                height={160}
                unoptimized
                className="absolute h-40 w-28 rounded-xl border border-slate-800 object-cover shadow-xl shadow-slate-950/40"
                style={{
                  transform: `translate(${index * 18 - 18}px, ${index * 10 - 10}px) rotate(${index === 1 ? 4 : index === 2 ? -6 : -2}deg)`,
                  zIndex: collageCards.length - index,
                }}
             />
           ))}
         </div>
        }
      >
        {lastUpdated ? (
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Updated {lastUpdated}</p>
        ) : null}
        {(cardsGuide.cardNote || cardsGuide.cardCta) ? (
          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200 md:flex-row md:items-center md:justify-between">
            {cardsGuide.cardNote ? <p className="md:max-w-xl">{cardsGuide.cardNote}</p> : null}
            {cardsGuide.cardCta ? (
              <a
                href={cardsGuide.cardCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-brand-300 px-4 py-2 text-sm text-brand-200 transition hover:border-brand-200 hover:text-white"
              >
                {cardsGuide.cardCta.label}
              </a>
            ) : null}
          </div>
        ) : null}
        <Link href="/mechanics" className="mt-4 inline-flex text-sm font-semibold text-brand-200 hover:text-white">
          Back to mechanics hub →
        </Link>
      </MechanicHero>

      <MechanicStepList title="How to build a reliable deck" steps={deckBuildingSteps} />
      <MechanicNotice tone="info" title="Pack odds & pity tracking">
        Drop percentages come from the in-game Shiny Card Pack interface. Legendary+ odds shift with events, so bookmark this page and check the
        events timeline frequently to catch limited rotations.
      </MechanicNotice>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">All cards</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.25em] text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Card</th>
                  <th className="px-4 py-3 text-left">Rarity</th>
                  <th className="px-4 py-3 text-left">Chance</th>
                  <th className="px-4 py-3 text-left">Effect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 bg-slate-950/60 text-sm text-slate-200">
                {cards.map((card) => (
                  <tr key={card.slug} className="transition hover:bg-slate-900/50">
                    <td className="px-4 py-3">
                      {card.image ? (
                        <Image
                          src={card.image}
                          alt={`${card.name} card art`}
                          width={48}
                          height={64}
                          className="mx-auto h-16 w-12 rounded-md border border-slate-800 object-cover"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xs text-slate-500">No art</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-white">{card.name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getRarityClass(card.rarity)}`}>
                        {card.rarity}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-slate-100">
                      {formatChance(card.chanceText, card.chance)}
                    </td>
                    <td className="px-4 py-3 text-slate-300">{card.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 p-4 md:hidden">
            {cards.map((card) => (
              <div key={card.slug} className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <div className="flex items-center gap-3">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={`${card.name} card art`}
                      width={48}
                      height={64}
                      className="h-16 w-12 rounded-md border border-slate-800 object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xs text-slate-500">No art</span>
                  )}
                  <div>
                    <p className="text-base font-semibold text-white">{card.name}</p>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getRarityClass(card.rarity)}`}>
                      {card.rarity}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-slate-200">
                  <p className="font-mono text-brand-200">Drop chance: {formatChance(card.chanceText, card.chance)}</p>
                  <p className="text-slate-300">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-10">
          {cardSections.map((section) => (
            <GuideSection key={section.title} section={section} />
          ))}
        </div>
        <aside className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-white">Related guides</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {relatedGuides.map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} className="group block rounded-lg border border-slate-800 p-3 transition hover:border-brand-400 hover:bg-slate-900/60">
                  <p className="font-semibold text-white group-hover:text-brand-200">{guide.title}</p>
                  <p className="text-xs text-slate-400">{guide.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
