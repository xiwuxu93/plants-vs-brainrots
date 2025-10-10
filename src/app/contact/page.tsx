import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/contact"),
  title: "Contact",
  description: "Reach the Plants vs Brainrots team for bug reports, data updates, and feature requests.",
};

export default function ContactPage() {
  return (
    <div className="container space-y-6">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Share bug reports, missing data, or feature requests."
      />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p>Email: <a href="mailto:hello@plantsvsbrainrots-game.com" className="text-brand-200 hover:text-white">hello@plantsvsbrainrots-game.com</a></p>
        <p className="mt-2">Discord: <span className="text-brand-200">#plants-vs-brainrots</span></p>
        <p className="mt-2">Turnaround time: within 48 hours.</p>
      </div>
    </div>
  );
}
