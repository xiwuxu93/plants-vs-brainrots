import { SectionHeading } from "@/components/section-heading";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Advanced Strategies",
  description: "Optimize Plants vs Brainrots mid-game with mutation sequencing, wave control, and balanced income planning.",
  path: "/guides/advanced",
});

const playbook = [
  {
    title: "Mutation sequencing",
    body: "Push Gold and Diamond for your flagship plants before sprinkling Neon upgrades. The damage multipliers stack faster than raw seed spam.",
  },
  {
    title: "Wave skip management",
    body: "Use fast-clear lanes to trigger early boss spawns, but keep one defensive lane slightly underpowered to control pacing.",
  },
  {
    title: "Brainrot diversification",
    body: "Blend Light and Heavy weights so your spawn cycles stay even. Overcommitting to heavy units can stall early rounds.",
  },
];

export default function AdvancedGuidePage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Guide"
        title="Advanced strategies"
        description="Once your roster hits Legendary rarity, tighten your timings with these proven optimizations."
      />
      <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        {playbook.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>
      <Link href="/guides" className="text-sm font-semibold text-brand-200 hover:text-white">
        ← Back to guides
      </Link>
    </div>
  );
}
