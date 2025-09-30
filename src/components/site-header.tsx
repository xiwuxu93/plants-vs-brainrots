import Link from "next/link";

const navItems = [
  { name: "Stock", href: "/stock" },
  { name: "Plants", href: "/plants" },
  { name: "Brainrots", href: "/brainrots" },
  { name: "Events", href: "/events" },
  { name: "Drops", href: "/drops" },
  { name: "Gears", href: "/gears" },
  { name: "Fusions", href: "/fusions" },
  { name: "Tools", href: "/tools" },
  { name: "Guides", href: "/guides" },
  { name: "Gallery", href: "/gallery" },
  { name: "Codes", href: "/codes" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span role="img" aria-label="Plant">🌱</span>
          Plants vs Brainrots
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2 py-1 transition hover:bg-slate-800">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/search" className="text-sm text-slate-300 hover:text-white">
            Search
          </Link>
          <Link href="/login" className="rounded-full border border-brand-400 px-4 py-1 text-sm text-brand-200 transition hover:border-brand-200 hover:text-white">
            Sign In
          </Link>
        </div>
      </div>
      <nav className="container flex gap-4 overflow-x-auto pb-3 text-sm font-medium text-slate-200 md:hidden">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md border border-slate-800 px-3 py-1">
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
