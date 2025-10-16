import { gameInfo } from "@/data/pvb-database";

const stats = [
  {
    label: "Plants",
    value: gameInfo.totalPlants,
    description: "Sturdy defenders and heavy hitters",
  },
  {
    label: "Brainrots",
    value: gameInfo.totalBrainrots,
    description: "Income sources tracked to the credit",
  },
  {
    label: "Tools",
    value: 3,
    description: "Calculators tailored for every strategy",
  },
  {
    label: "Mechanics",
    value: 3,
    description: "Cards, fuse machine, and rebirth loops",
  },
];

export function QuickStats() {
  return (
    <section className="container grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center shadow shadow-slate-950/30"
        >
          <p className="text-4xl font-bold text-white">{stat.value}</p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">
            {stat.label}
          </p>
          <p className="mt-3 text-xs text-slate-400">{stat.description}</p>
        </div>
      ))}
    </section>
  );
}
