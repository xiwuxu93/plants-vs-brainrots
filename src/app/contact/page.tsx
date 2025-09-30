import { SectionHeading } from "@/components/section-heading";

export default function ContactPage() {
  return (
    <div className="container space-y-6">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Share bug reports, missing data, or feature requests."
      />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p>Email: <a href="mailto:hello@pvb.wiki" className="text-brand-200 hover:text-white">hello@pvb.wiki</a></p>
        <p className="mt-2">Discord: <span className="text-brand-200">#plants-vs-brainrots</span></p>
        <p className="mt-2">Turnaround time: within 48 hours.</p>
      </div>
    </div>
  );
}
