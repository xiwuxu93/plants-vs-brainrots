"use client";

import { SectionHeading } from "@/components/section-heading";
import { codeHistory, gameInfo } from "@/data/pvb-database";

const siteUrl = "https://plantsvsbrainrots-game.com";

interface CodeItem {
  code: string;
  reward: string;
  status: "Active" | "Expired";
  notes?: string;
}

const activeCodes: CodeItem[] = [
  { code: "PLANTPOWER", reward: "10,000 Cash", status: "Active", notes: "New player boost" },
  { code: "BRAINROTBLITZ", reward: "3 Neon Seeds", status: "Active" },
  { code: "FUSIONWEEK", reward: "25% Mutation Discount", status: "Active", notes: "Ends Sunday" },
];

const expiredCodes: CodeItem[] = [
  { code: "SPOOKYSEASON", reward: "Pumpkin skin", status: "Expired", notes: "Expired Oct 12" },
];

export default function CodesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Plants vs Brainrots Codes',
    itemListElement: codeHistory.map((code, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}/codes`,
      item: {
        '@type': 'Offer',
        name: code.code,
        description: code.reward,
        availability: code.status.toLowerCase() === 'active' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        validFrom: code.addedAt,
        validThrough: code.expiresAt ?? undefined,
      },
    })),
  };

  return (
    <div className="container space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SectionHeading
        eyebrow="Codes"
        title="Redeem codes hub"
        description="We monitor official drops so you can redeem every boost before it disappears."
      />

      <section className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-6">
        <p className="text-sm text-emerald-100">
          Last updated {new Date(gameInfo.lastUpdated).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-emerald-200">Active codes</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {activeCodes.map((code) => (
            <article key={code.code} className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-4 text-sm text-emerald-100">
              <p className="text-lg font-semibold text-white">{code.code}</p>
              <p className="mt-1 text-emerald-200">{code.reward}</p>
              {code.notes ? <p className="mt-2 text-xs text-emerald-300">{code.notes}</p> : null}
              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(code.code).catch(() => {
                      /* noop in MVP */
                    });
                  }
                }}
                className="mt-3 inline-flex items-center justify-center rounded-full border border-emerald-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-50 hover:bg-emerald-500/20"
              >
                Copy code
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Expired codes</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {codeHistory
            .filter((code) => code.status.toLowerCase() !== "active")
            .map((code) => (
              <article key={code.code} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="text-lg font-semibold text-slate-200">{code.code}</p>
                <p className="mt-1 text-slate-400">{code.reward}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Added {new Date(code.addedAt).toLocaleDateString()} • Expired {code.expiresAt ? new Date(code.expiresAt).toLocaleDateString() : "—"}
                </p>
              </article>
            ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">All codes timeline</p>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {codeHistory.map((code) => (
            <div key={code.code} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              <div>
                <p className="text-white">{code.code}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{code.reward}</p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>
                  Added {new Date(code.addedAt).toLocaleDateString()} · {code.expiresAt ? `Expires ${new Date(code.expiresAt).toLocaleDateString()}` : "No expiry"}
                </p>
                <p className={`mt-1 font-semibold ${code.status.toLowerCase() === "active" ? "text-emerald-200" : "text-rose-200"}`}>
                  {code.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
