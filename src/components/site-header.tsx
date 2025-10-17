"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const primaryNav = [
  { name: "Plants", href: "/plants" },
  { name: "Stock", href: "/stock" },
  { name: "Brainrots", href: "/brainrots" },
  { name: "Mechanics", href: "/mechanics" },
  { name: "Cards", href: "/card" },
  { name: "Fuse Recipes", href: "/fuse-recipe" },
  { name: "Rebirth", href: "/rebirth" },
  { name: "Calculator", href: "/plants-vs-brainrots-calculator" },
];

const secondaryNav = [
  { name: "Events", href: "/events" },
  { name: "Drops", href: "/drops" },
  { name: "Gears", href: "/gears" },
  { name: "Gallery", href: "/gallery" },
  { name: "Codes", href: "/codes" },
];

const allNavItems = [...primaryNav, ...secondaryNav];
const mobileNavItems = [...allNavItems, { name: "Search", href: "/search" }];

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuCloseTimer = useRef<ReturnType<typeof setTimeout>>();

  const clearMoreMenuCloseTimer = () => {
    if (moreMenuCloseTimer.current) {
      clearTimeout(moreMenuCloseTimer.current);
      moreMenuCloseTimer.current = undefined;
    }
  };

  const openMoreMenu = () => {
    clearMoreMenuCloseTimer();
    setMoreMenuOpen(true);
  };

  const scheduleMoreMenuClose = () => {
    clearMoreMenuCloseTimer();
    moreMenuCloseTimer.current = setTimeout(() => {
      setMoreMenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      clearMoreMenuCloseTimer();
    };
  }, []);

  useEffect(() => {
    if (!moreMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!moreMenuRef.current || moreMenuRef.current.contains(event.target as Node)) {
        return;
      }
      setMoreMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [moreMenuOpen]);

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <span role="img" aria-label="Plant">🌱</span>
          Plants vs Brainrots
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium text-slate-200 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2 py-1 transition hover:bg-slate-800 ${
                isActive(pathname, item.href) ? "bg-slate-800 text-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          {secondaryNav.length ? (
            <div
              ref={moreMenuRef}
              className="relative"
              onMouseEnter={openMoreMenu}
              onMouseLeave={scheduleMoreMenuClose}
              onFocusCapture={openMoreMenu}
              onBlurCapture={(event) => {
                const nextFocus = event.relatedTarget as Node | null;
                if (!moreMenuRef.current?.contains(nextFocus)) {
                  setMoreMenuOpen(false);
                }
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (moreMenuOpen) {
                    setMoreMenuOpen(false);
                    return;
                  }
                  openMoreMenu();
                }}
                onFocus={openMoreMenu}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setMoreMenuOpen(false);
                    (event.currentTarget as HTMLButtonElement).blur();
                  }
                }}
                aria-expanded={moreMenuOpen}
                aria-haspopup="menu"
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm transition hover:bg-slate-800 ${
                  moreMenuOpen ? "bg-slate-800 text-white" : ""
                }`}
              >
                More
                <span aria-hidden>{moreMenuOpen ? "▴" : "▾"}</span>
              </button>
              <div
                role="menu"
                aria-label="Secondary navigation"
                className={`absolute right-0 mt-2 min-w-[12rem] rounded-lg border border-slate-800 bg-slate-900/95 py-2 text-sm text-slate-200 shadow-xl shadow-slate-950/30 transition ${
                  moreMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                }`}
                onMouseEnter={openMoreMenu}
                onMouseLeave={scheduleMoreMenuClose}
              >
                {secondaryNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-4 py-2 transition hover:bg-slate-800 hover:text-white ${
                      isActive(pathname, item.href) ? "bg-slate-800 text-white" : ""
                    }`}
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
        <button
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          className="inline-flex items-center justify-center rounded-md border border-slate-800 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-700 hover:text-white md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-site-nav"
        >
          <span className="sr-only">{mobileMenuOpen ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden className="uppercase tracking-[0.3em]">
            {mobileMenuOpen ? "Close" : "Menu"}
          </span>
        </button>
      </div>
      <nav
        id="mobile-site-nav"
        className={`container gap-2 pb-4 text-sm font-medium text-slate-200 md:hidden ${
          mobileMenuOpen ? "flex flex-col" : "hidden"
        }`}
      >
        {mobileNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md border border-slate-800 px-3 py-2 transition hover:border-slate-700 hover:text-white ${
              isActive(pathname, item.href) ? "bg-slate-900 text-white" : "bg-slate-950"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
