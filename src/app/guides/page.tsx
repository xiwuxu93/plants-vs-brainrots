import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/guides"),
  title: "Guides Hub",
  description: "Browse Plants vs Brainrots strategy guides for beginners, advanced players, and boss battles.",
};

const guides = [
  {
    href: "/guides/beginner" as const,
    title: "Beginner guide",
    readingTime: "7 min read",
    summary: "Unlock your first power spikes with lane fundamentals, early economy loops, and smart mutation unlocks.",
  },
  {
    href: "/guides/advanced" as const,
    title: "Advanced strategies",
    readingTime: "9 min read",
    summary: "Optimize mid-game routing, wave skip planning, and mutation stacking for faster clears.",
  },
  {
    href: "/guides/bosses" as const,
    title: "Boss battle tactics",
    readingTime: "6 min read",
    summary: "Break down boss mechanics and counter them with recommended loadouts and timing windows.",
  },
];

const quickTips = [
  "Always keep one lane free to funnel your highest burst plants.",
  "Brainrot income fuels your mutation rush—balance offense and economy.",
  "Track code drops and event rotations; many guides assume bonus modifiers are active.",
];

export default function GuidesPage() {
  return (
    <div className="container space-y-12">
      <SectionHeading
        eyebrow="Guides"
        title="Playbooks that keep you ahead of the meta"
        description="These guides will expand as we gather more high-level data. For launch, each one delivers the essential moves to speed up your progression."
      />

      <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {guides.map((guide) => (
            <article key={guide.href} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-brand-400">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                <span>{guide.readingTime}</span>
                <span>Updated weekly</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{guide.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{guide.summary}</p>
              <Link
                href={guide.href}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 hover:text-white"
              >
                Read guide →
              </Link>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 text-sm text-brand-100">
          <h3 className="text-lg font-semibold text-white">Quick reference</h3>
          <ul className="mt-3 space-y-3 list-disc pl-5">
            {quickTips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-brand-200">Want to contribute a guide? Ping the team on Discord.</p>
        </aside>
      </section>
    </div>
  );
}
