import { SectionHeading } from "@/components/section-heading";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "Learn why we built the Plants vs Brainrots Wiki and how the project supports the community with data-backed tools.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container space-y-6">
      <SectionHeading
        eyebrow="About"
        as="h1"
        title="Why we built Plants vs Brainrots Wiki"
        description="A lightweight MVP focused on fast answers for players who want data-backed decisions."
      />
      <p className="max-w-3xl text-sm text-slate-300">
        Our team plays Plants vs Brainrots daily, and we wanted a central hub that keeps track of every plant, brainrot, and mutation. The goal is to
        combine verified stats with calculators that remove guesswork. This MVP is the foundation—we will keep expanding coverage as the community
        shares feedback.
      </p>
    </div>
  );
}
