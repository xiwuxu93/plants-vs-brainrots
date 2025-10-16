import Link from "next/link";

const primaryNav = [
  { name: "Plants", href: "/plants" },
  { name: "Brainrots", href: "/brainrots" },
  { name: "Mechanics", href: "/mechanics" },
  { name: "Cards", href: "/card" },
  { name: "Fuse Recipes", href: "/fuse-recipe" },
  { name: "Rebirth", href: "/rebirth" },
  { name: "Calculator", href: "/plants-vs-brainrots-calculator" },
];

const secondaryNav = [
  { name: "Stock", href: "/stock" },
  { name: "Events", href: "/events" },
  { name: "Drops", href: "/drops" },
  { name: "Gears", href: "/gears" },
  { name: "Gallery", href: "/gallery" },
  { name: "Codes", href: "/codes" },
];

const allNavItems = [...primaryNav, ...secondaryNav];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span role="img" aria-label="Plant">🌱</span>
          Plants vs Brainrots
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-200 md:flex">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2 py-1 transition hover:bg-slate-800">
              {item.name}
            </Link>
          ))}
          {secondaryNav.length ? (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition hover:bg-slate-800"
              >
                More
                <span aria-hidden>▾</span>
              </button>
              <div className="pointer-events-none absolute right-0 mt-2 hidden min-w-[12rem] flex-col rounded-lg border border-slate-800 bg-slate-900/95 py-2 text-sm text-slate-200 shadow-xl shadow-slate-950/30 group-hover:flex group-hover:pointer-events-auto">
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 transition hover:bg-slate-800 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </nav>
        <div className="hidden items-center md:flex">
          <Link href="/search" className="text-sm text-slate-300 hover:text-white">
            Search
          </Link>
        </div>
      </div>
      <nav className="container flex gap-4 overflow-x-auto pb-3 text-sm font-medium text-slate-200 md:hidden">
        {allNavItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md border border-slate-800 px-3 py-1">
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
