"use client";

import { SectionHeading } from "@/components/section-heading";
import { brainrots, plants } from "@/data/pvb-database";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const { plantResults, brainrotResults } = useMemo(() => {
    const lower = query.toLowerCase().trim();
    if (!lower) {
      return { plantResults: plants.slice(0, 5), brainrotResults: brainrots.slice(0, 5) };
    }
    return {
      plantResults: plants
        .filter((plant) => plant.name.toLowerCase().includes(lower))
        .slice(0, 8),
      brainrotResults: brainrots
        .filter((brainrot) => brainrot.name.toLowerCase().includes(lower))
        .slice(0, 8),
    };
  }, [query]);

  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Search"
        title="Find any plant, brainrot, or guide"
        description="Start typing to see instant matches across the database."
      />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search everything..."
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Plants</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {plantResults.length === 0 ? (
              <li>No plants found.</li>
            ) : (
              plantResults.map((plant) => (
                <li
                  key={plant.id}
                  className="rounded-lg border border-transparent px-3 py-2 transition hover:border-brand-400/40 hover:bg-slate-900/60"
                >
                  <Link href={`/plants/${plant.slug}`} className="flex justify-between">
                    <span className="text-white">{plant.name}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-brand-200">{plant.rarity}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="text-lg font-semibold text-white">Brainrots</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {brainrotResults.length === 0 ? (
              <li>No brainrots found.</li>
            ) : (
              brainrotResults.map((brainrot) => (
                <li
                  key={brainrot.id}
                  className="rounded-lg border border-transparent px-3 py-2 transition hover:border-purple-400/40 hover:bg-slate-900/60"
                >
                  <Link href={`/brainrots/${brainrot.slug}`} className="flex justify-between">
                    <span className="text-white">{brainrot.name}</span>
                    <span className="text-xs uppercase tracking-[0.3em] text-purple-200">{brainrot.rarity}</span>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
