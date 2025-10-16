import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MechanicHero, MechanicNotice, MechanicStepList } from "@/components/mechanics";
import {
  fusionGuide,
  fusions,
  fusionSections,
  fusionRelatedGuides,
  fusionFaqs,
} from "@/data/fusions";
import { buildPageMetadata } from "@/lib/site-metadata";
import NoobiniCactusini from "@/assets/media/noobini-cactusini-plants-vs-brainrots.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Fuse Recipes & Unlock Requirements",
  description:
    "All Plants vs Brainrots fuse recipes in one place with unlock steps, usage tips, and important warnings before you commit components.",
  path: "/fuse-recipe",
});

const formatTimestamp = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const rarityOrder = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Mythic",
  "Secret",
  "Godly",
  "Limited",
];

const highestRarity = fusions.reduce((best, fusion) => {
  if (!best) return fusion;
  const currentIndex = rarityOrder.indexOf(fusion.rarity);
  const bestIndex = rarityOrder.indexOf(best.rarity);
  return currentIndex > bestIndex ? fusion : best;
}, fusions[0]);

const heroStats = [
  {
    label: "Fusions tracked",
    value: `${fusions.length}`,
    detail: "Complete machine recipes sourced from the live game",
  },
  {
    label: "Rarest result",
    value: highestRarity ? highestRarity.result : "—",
    detail: highestRarity ? highestRarity.rarity : "",
  },
  {
    label: "Unlock milestone",
    value: "Rebirth 1",
    detail: "Fuse Machine becomes available after your first reset",
  },
];

const fusionSteps = [
  {
    title: "Unlock the machine",
    description: "Rebirth once, then speak to the Fuse Machine attendant on the right side of the spawn island.",
  },
  {
    title: "Queue the recipe",
    description: "Place the plant and brainrot listed below, confirm the cash requirement, and start the timer (3–5 minutes).",
  },
  {
    title: "Claim immediately",
    description: "Collect the fused unit as soon as the timer ends—items left in the machine do not auto-transfer to your inventory.",
  },
];

function GuideSection({
  title,
  intro,
  entries,
  notes,
}: (typeof fusionSections)[number]) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {intro.map((paragraph, index) => (
        <p key={index} className="text-sm text-slate-300">
          {paragraph}
        </p>
      ))}
      {entries.map((entry, index) => (
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
      {notes.map((note, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100"
        >
          <span aria-hidden>⚠️</span>
          <span>{note}</span>
        </div>
      ))}
    </section>
  );
}

function FaqSection() {
  const faqsWithAnswers = fusionFaqs.filter((faq) => faq.answer);
  if (faqsWithAnswers.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-white md:text-3xl">Frequently asked questions</h2>
      <div className="space-y-3">
        {faqsWithAnswers.map((faq) => (
          <details key={faq.question} className="group rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-white group-open:text-brand-200">
              {faq.question}
            </summary>
            <p className="mt-2 text-sm text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function FuseRecipePage() {
  const lastUpdated = formatTimestamp(fusionGuide.generatedAt);

  return (
    <div className="container space-y-12 py-10">
      <MechanicHero
        eyebrow="Fuse machine"
        title="Fuse recipes & unlock instructions"
        description="Know exactly which plant + brainrot combinations create every fused unit, plus the requirements to unlock and operate the machine efficiently."
        stats={heroStats}
        media={
          <Image
            src={NoobiniCactusini}
            alt="Noobini Cactusini fused brainrot"
            className="h-auto w-60 rounded-3xl border border-slate-800 object-cover shadow-2xl shadow-slate-950/40"
            priority
          />
        }
      >
        {lastUpdated ? (
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Updated {lastUpdated}</p>
        ) : null}
        {fusionGuide.intro.map((paragraph, index) => (
          <p key={index} className="max-w-3xl text-sm text-slate-300">
            {paragraph}
          </p>
        ))}
        {fusionGuide.fusionNote ? (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200">
            {fusionGuide.fusionNote}
          </div>
        ) : null}
        <Link href="/mechanics" className="mt-4 inline-flex text-sm font-semibold text-brand-200 hover:text-white">
          Back to mechanics hub →
        </Link>
      </MechanicHero>

      <MechanicStepList title="Fusion workflow" steps={fusionSteps} />
      <MechanicNotice tone="warning" title="No refunds">
        Once you place inputs inside the Fuse Machine the items are consumed—even if you log off mid-timer. Make sure you have inventory space
        and the build slot ready before you confirm the recipe.
      </MechanicNotice>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">All fuse recipes</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.25em] text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">Fused brainrot</th>
                  <th className="px-4 py-3 text-left">Plant</th>
                  <th className="px-4 py-3 text-left">Brainrot</th>
                  <th className="px-4 py-3 text-left">Rarity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 bg-slate-950/60 text-sm text-slate-200">
                {fusions.map((fusion) => (
                  <tr key={fusion.slug} className="transition hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-semibold text-white">{fusion.fused}</td>
                    <td className="px-4 py-3">{fusion.plant}</td>
                    <td className="px-4 py-3">{fusion.brainrot}</td>
                    <td className="px-4 py-3 text-slate-100">{fusion.rarity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 p-4 md:hidden">
            {fusions.map((fusion) => (
              <div key={fusion.slug} className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-base font-semibold text-white">{fusion.fused}</p>
                <div className="text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-100">Plant:</span> {fusion.plant}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">Brainrot:</span> {fusion.brainrot}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">Rarity:</span> {fusion.rarity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-10">
          {fusionSections.map((section) => (
            <GuideSection key={section.title} {...section} />
          ))}
          <FaqSection />
        </div>
        <aside className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-white">Related guides</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {fusionRelatedGuides.map((guide) => (
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
