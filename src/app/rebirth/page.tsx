import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MechanicHero, MechanicNotice, MechanicStepList } from "@/components/mechanics";
import {
  rebirthGuide,
  rebirthRows,
  rebirthSections,
  rebirthRelatedGuides,
  rebirthFaqs,
} from "@/data/rebirth";
import { buildPageMetadata } from "@/lib/site-metadata";
import DragonfrutinaDolphinita from "@/assets/media/dragonfrutina-dolphinita-plants-vs-brainrots.png";

export const metadata: Metadata = buildPageMetadata({
  title: "Rebirth Requirements & Strategy",
  description:
    "Full breakdown of every Plants vs Brainrots rebirth stage with costs, required brainrots, unlocks, and planning advice so you never waste a reset.",
  path: "/rebirth",
});

const formatTimestamp = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const formatCash = (cash: number | null, fallback: string | null) => {
  if (typeof cash === "number" && Number.isFinite(cash)) {
    return `$${cash.toLocaleString()}`;
  }
  return fallback ?? "—";
};

const heroStats = (() => {
  const firstStage = rebirthRows[0];
  const finalStage = rebirthRows[rebirthRows.length - 1];
  return [
    {
      label: "Rebirth stages",
      value: `${rebirthRows.length}`,
      detail: "Each reset stacks +50% luck and +50% money",
    },
    {
      label: "Next requirement",
      value: firstStage.brainrotRequirement ?? "Check table",
      detail: firstStage.cashDisplay ?? "Farm cash before reset",
    },
    {
      label: "Final boss unlock",
      value: finalStage?.boss ?? "—",
      detail: finalStage ? `Unlocked at ${finalStage.stage}` : "",
    },
  ];
})();

const plannerSteps = [
  {
    title: "Snapshot your progress",
    description: "Record $/s, highest boss, and anchor plants so you can benchmark the rebound after rebirth.",
  },
  {
    title: "Secure the requirements",
    description: "Farm the listed brainrots and cash before you reset—use drop tables or trading to close gaps quickly.",
  },
  {
    title: "Script the rebuild",
    description: "Plan the first five purchases once you spawn so you sprint back to your previous income curve.",
  },
];

function GuideSection({ title, intro, entries, notes }: (typeof rebirthSections)[number]) {
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
          className="flex items-start gap-3 rounded-lg border border-brand-400/40 bg-brand-500/10 p-4 text-sm text-brand-100"
        >
          <span aria-hidden>💡</span>
          <span>{note}</span>
        </div>
      ))}
    </section>
  );
}

function FaqSection() {
  const faqsWithAnswers = rebirthFaqs.filter((faq) => faq.answer);
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

export default function RebirthPage() {
  const lastUpdated = formatTimestamp(rebirthGuide.generatedAt);

  return (
    <div className="container space-y-12 py-10">
      <MechanicHero
        eyebrow="Rebirth"
        title="Rebirth requirements & planning"
        description="Every rebirth tier laid out with costs, required brainrots, and the unlocks you gain so you can time each reset perfectly."
        stats={heroStats}
        media={
          <Image
            src={DragonfrutinaDolphinita}
            alt="Dragonfrutina Dolphinita fusion"
            className="h-auto w-60 rounded-3xl border border-slate-800 object-cover shadow-2xl shadow-slate-950/40"
            priority
          />
        }
      >
        {lastUpdated ? (
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Updated {lastUpdated}</p>
        ) : null}
        {rebirthGuide.intro.map((paragraph, index) => (
          <p key={index} className="max-w-3xl text-sm text-slate-300">
            {paragraph}
          </p>
        ))}
        {rebirthGuide.note ? (
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-200">
            {rebirthGuide.note}
          </div>
        ) : null}
        <Link href="/mechanics" className="mt-4 inline-flex text-sm font-semibold text-brand-200 hover:text-white">
          Back to mechanics hub →
        </Link>
      </MechanicHero>

      <MechanicStepList steps={plannerSteps} />
      <MechanicNotice tone="warning" title="What resets?">
        Cash, stored brainrots, boss levels, and spawner upgrades all wipe on rebirth. Plants, inventory items, purchased gears, and prior rebirth
        bonuses stay with you—use that to rebuild faster each cycle.
      </MechanicNotice>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Rebirth stages</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900/80 text-xs uppercase tracking-[0.25em] text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">Stage</th>
                  <th className="px-4 py-3 text-left">Cash</th>
                  <th className="px-4 py-3 text-left">Required brainrots</th>
                  <th className="px-4 py-3 text-left">Rewards</th>
                  <th className="px-4 py-3 text-left">Unlocks</th>
                  <th className="px-4 py-3 text-left">Boss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 bg-slate-950/60 text-sm text-slate-200">
                {rebirthRows.map((row) => (
                  <tr key={row.stage} className="transition hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-semibold text-white">{row.stage}</td>
                    <td className="px-4 py-3 text-slate-100">{formatCash(row.cash, row.cashDisplay)}</td>
                    <td className="px-4 py-3">{row.brainrotRequirement ?? '—'}</td>
                    <td className="px-4 py-3">{row.rewards || '—'}</td>
                    <td className="px-4 py-3">{row.unlocks || '—'}</td>
                    <td className="px-4 py-3">{row.boss || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-2 p-4 md:hidden">
            {rebirthRows.map((row) => (
              <div key={row.stage} className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="text-base font-semibold text-white">{row.stage}</p>
                <div className="text-sm text-slate-300">
                  <p>
                    <span className="font-semibold text-slate-100">Cash:</span> {formatCash(row.cash, row.cashDisplay)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">Brainrots:</span> {row.brainrotRequirement ?? '—'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">Rewards:</span> {row.rewards || '—'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">Unlocks:</span> {row.unlocks || '—'}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-100">Boss:</span> {row.boss || '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-10">
          {rebirthSections.map((section) => (
            <GuideSection key={section.title} {...section} />
          ))}
          <FaqSection />
        </div>
        <aside className="space-y-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-white">Related guides</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            {rebirthRelatedGuides.map((guide) => (
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

      <MechanicNotice tone="success">
        Ready to commit? Jump to the
        {" "}
        <Link href="/tools/rebirth" className="font-semibold text-white hover:text-brand-200">
          rebirth planner worksheet
        </Link>
        {" "}
        to keep a running log of your baseline and rebuild priorities.
      </MechanicNotice>
    </div>
  );
}
