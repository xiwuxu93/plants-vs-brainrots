"use client";

import { SectionHeading } from "@/components/section-heading-client";
import { codeHistory, gameInfo } from "@/data/pvb-database";

const siteUrl = "https://plantsvsbrainrots-game.com";
const redeemSteps = [
  "Click the Shop button (red basket icon) on the left edge of your screen.",
  "Inside the Shop menu, select the Rewards tab.",
  "Choose the Codes option to open the redemption panel.",
  "Enter a working code from the list above.",
  "Hit Claim to receive the reward instantly.",
];

const rewardHighlights = [
  {
    title: "Free Cash",
    emoji: "💰",
    description: "Most codes award cash that you can invest into new seeds, upgrades, and stronger defenders.",
  },
  {
    title: "Starter Boosts",
    emoji: "🚀",
    description: "Launch a fresh account with extra resources that make the opening waves far easier to clear.",
  },
  {
    title: "Event Rewards",
    emoji: "🎉",
    description: "Limited drops during updates or holidays often hand out premium loot or larger currency bundles.",
  },
  {
    title: "Community Bonuses",
    emoji: "🤝",
    description: "Developers occasionally celebrate milestones with celebratory codes for the whole player base.",
  },
];

function formatDate(
  input: string | null,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" },
) {
  if (!input) return "—";
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, options).format(date);
}

export default function CodesPageClient() {
  const activeCodes = codeHistory.filter((entry) => entry.status.toLowerCase() === "active");
  const expiredCodes = codeHistory.filter((entry) => entry.status.toLowerCase() !== "active");
  const sortedCodes = [...codeHistory].sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
  );

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Plants vs Brainrots Codes",
    itemListElement: sortedCodes.map((code, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/codes`,
      item: {
        "@type": "Offer",
        name: code.code,
        description: code.reward,
        availability:
          code.status.toLowerCase() === "active" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        validFrom: code.addedAt,
        validThrough: code.expiresAt ?? undefined,
      },
    })),
  };

  const lastUpdatedDisplay = formatDate(gameInfo.lastUpdated, { month: "long", year: "numeric" });

  const handleCopy = (value: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {
        /* clipboard silently fails in unsupported browsers */
      });
    }
  };

  return (
    <div className="container space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <SectionHeading
        eyebrow="Codes"
        as="h1"
        title="Redeem codes hub"
        description="Copy the latest Plants vs Brainrots codes, claim them in-game, and stack rewards before they expire."
      />

      <section className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-6 text-sm text-emerald-100">
        <div className="flex flex-wrap items-center justify-between gap-3 text-base">
          <p className="font-semibold text-white">🎉 All codes are active and working!</p>
          <p className="text-emerald-200">Last updated {lastUpdatedDisplay}</p>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-500/40 bg-slate-950/60">
          <table className="w-full divide-y divide-emerald-500/20 text-left text-sm">
            <thead className="bg-emerald-500/10 text-xs uppercase tracking-[0.3em] text-emerald-200">
              <tr>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Reward</th>
                <th className="px-4 py-3">Date Added</th>
                <th className="px-4 py-3 text-right">Copy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {activeCodes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-emerald-200">
                    No active codes right now. Check back soon.
                  </td>
                </tr>
              ) : (
                activeCodes.map((code) => (
                  <tr key={code.code} className="transition hover:bg-emerald-500/10">
                    <td className="px-4 py-3 text-lg font-semibold text-white">{code.code}</td>
                    <td className="px-4 py-3 text-emerald-200">{code.reward}</td>
                    <td className="px-4 py-3 text-emerald-200">{formatDate(code.addedAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleCopy(code.code)}
                        className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-50 hover:bg-emerald-500/20"
                      >
                        Copy
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Expired codes</p>
        {expiredCodes.length === 0 ? (
          <p className="mt-4 text-sm text-slate-300">
            No expired codes to report. We&apos;ll list retired promos as soon as one lapses.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {expiredCodes.map((code) => (
              <article key={code.code} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="text-lg font-semibold text-slate-100">{code.code}</p>
                <p className="mt-1 text-slate-400">{code.reward}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Added {formatDate(code.addedAt)}
                  {code.expiresAt ? ` • Expired ${formatDate(code.expiresAt)}` : null}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Complete code archive</p>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {sortedCodes.map((code) => (
            <div
              key={code.code}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3"
            >
              <div>
                <p className="text-white">{code.code}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{code.reward}</p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>Added {formatDate(code.addedAt)}</p>
                <p className={`mt-1 font-semibold ${code.status.toLowerCase() === "active" ? "text-emerald-200" : "text-rose-200"}`}>
                  {code.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">How to redeem codes</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {redeemSteps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Step {index + 1}</p>
              <p className="mt-2 text-sm text-slate-200">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-400">
          Tip: codes are time-sensitive and can stop working during content updates. Claim new ones as soon as you see them.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">What you can get from codes</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {rewardHighlights.map((reward) => (
            <article
              key={reward.title}
              className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100"
            >
              <header className="flex items-center gap-3">
                <span className="text-xl">{reward.emoji}</span>
                <h3 className="text-lg font-semibold text-white">{reward.title}</h3>
              </header>
              <p className="mt-3 text-sm">{reward.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
