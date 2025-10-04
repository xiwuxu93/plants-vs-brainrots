import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(91,154,155,0.2),_transparent_60%)]" />
      <div className="container flex flex-col gap-6 py-16 text-center md:py-24">
        <span className="mx-auto rounded-full border border-brand-500/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-brand-200">
          Plants vs Brainrots Wiki
        </span>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
          Your Ultimate Strategy Companion
        </h1>
        <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
          Explore plant stats, brainrot income tables, and battle-tested tools designed to help you dominate every wave.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-brand-500/60 bg-brand-500/10 px-6 py-2 text-sm font-semibold text-brand-100 shadow-lg shadow-brand-500/10 transition hover:scale-[1.02] hover:bg-brand-500/20 hover:text-white"
          >
            Play on Roblox
          </Link>
          {/* <Link
            href="https://discord.gg/937Mfk4zGN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-indigo-400/60 bg-indigo-500/10 px-6 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/25 hover:text-white"
          >
            Join Discord
          </Link> */}
          <Link
            href="/plants"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:scale-[1.02] hover:bg-brand-400"
          >
            Browse Plants
          </Link>
          <Link
            href="/brainrots"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand-400 hover:text-white"
          >
            View Brainrots
          </Link>
        </div>
      </div>
    </section>
  );
}
