import Image from "next/image";
import { mediaAssets, type MediaCategory } from "@/data/media-assets";
import { SectionHeading } from "@/components/section-heading";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Gallery",
  description: "Download Plants vs Brainrots character art, fusion renders, and in-game scene captures.",
  path: "/gallery",
});

const categoryMeta: Array<{
  id: MediaCategory;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    id: "plant",
    title: "Plant Gallery",
    description: "Every defensive anchor currently confirmed in the Roblox experience.",
    accent: "from-emerald-500/10 via-slate-900 to-slate-950",
  },
  {
    id: "brainrot",
    title: "Brainrot Gallery",
    description: "Income units and support characters captured straight from gameplay.",
    accent: "from-purple-500/10 via-slate-900 to-slate-950",
  },
  {
    id: "fusion brainrot",
    title: "Fusion Brainrots",
    description: "Hybrid evolutions unlocked through lab fusions.",
    accent: "from-amber-500/10 via-slate-900 to-slate-950",
  },
  {
    id: "scene",
    title: "In-Game Scenes",
    description: "Context shots that showcase UI, shop flows, and live setups.",
    accent: "from-cyan-500/10 via-slate-900 to-slate-950",
  },
];

const grouped = categoryMeta.map((meta) => ({
  ...meta,
  items: mediaAssets.filter((asset) => asset.category === meta.id),
}));

export default function GalleryPage() {
  return (
    <div className="container space-y-16">
      <header className="space-y-4 text-center">
        <SectionHeading
          eyebrow="Media"
          as="h1"
          title="Plants vs Brainrots visual compendium"
          description="Browse every asset we have extracted so you can wire up cards, guides, and promo art without digging through folders."
        />
      </header>

      {grouped.map((section) => (
        <section key={section.id} className="space-y-6">
          <div className="space-y-3">
            <div className={`rounded-3xl border border-slate-800 bg-gradient-to-br ${section.accent} p-6`}>
              <h2 className="text-2xl font-semibold text-white md:text-3xl">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{section.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                {section.items.length} assets
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((asset) => (
              <figure
                key={asset.slug}
                className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow shadow-slate-950/40 transition hover:border-brand-400"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={asset.image}
                    alt={asset.alt || asset.name}
                    placeholder="blur"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="space-y-2 p-4">
                  <h3 className="text-lg font-semibold text-white">{asset.name}</h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{section.title}</p>
                  {asset.alt ? (
                    <p className="text-sm text-slate-300">{asset.alt}</p>
                  ) : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
