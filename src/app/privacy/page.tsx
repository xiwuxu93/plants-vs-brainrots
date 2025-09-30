import { SectionHeading } from "@/components/section-heading";

export default function PrivacyPage() {
  return (
    <div className="container space-y-6">
      <SectionHeading
        eyebrow="Privacy"
        title="Privacy overview"
        description="We keep things simple—no logins required for the MVP and no trackers beyond basic analytics."
      />
      <p className="max-w-3xl text-sm text-slate-300">
        Plants vs Brainrots Wiki stores no personally identifiable information. If you opt in to beta testing, we only collect aggregate usage stats
        to improve the calculators. You may request deletion of any contributed data at any time by emailing hello@plantsvsbrainrots-game.com.
      </p>
    </div>
  );
}
