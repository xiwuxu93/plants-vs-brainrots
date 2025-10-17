import { SectionHeading } from "@/components/section-heading";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "Reach the Plants vs Brainrots team for bug reports, data updates, and feature requests.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container space-y-6">
      <SectionHeading
        eyebrow="Contact"
        as="h1"
        title="Get in touch"
        description="Share bug reports, missing data, or feature requests."
      />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p>Email: <a href="mailto:hello@plantsvsbrainrots-game.com" className="text-brand-200 hover:text-white">hello@plantsvsbrainrots-game.com</a></p>
        <p className="mt-2">Turnaround time: within 48 hours.</p>
      </div>
    </div>
  );
}
