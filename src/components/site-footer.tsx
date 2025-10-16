import Link from "next/link";

const footerLinks = [
  { name: "About", href: "/about" as const },
  { name: "Contact", href: "/contact" as const },
  { name: "Privacy", href: "/privacy" as const }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8">
      <div className="container flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Plants vs Brainrots Wiki. All rights reserved.</p>
        <nav className="flex flex-wrap gap-4">
          {footerLinks.map((link) => {
            const isExternal = link.href.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-200"
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link key={link.name} href={link.href} className="hover:text-brand-200">
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
