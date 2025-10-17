import { SectionHeading } from "@/components/section-heading";
import { events } from "@/data/pvb-database";
import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata = buildPageMetadata({
  title: "Event Tracker",
  description: "Track current and upcoming Plants vs Brainrots events with modifiers, timers, and exclusive rewards.",
  path: "/events",
});

function formatRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return `${startDate.toLocaleString()} → ${endDate.toLocaleString()}`;
}

export default function EventsPage() {
  return (
    <div className="container space-y-10">
      <SectionHeading
        eyebrow="Live Ops"
        as="h1"
        title="Event tracker"
        description="Keep tabs on every timed event, raid, and seasonal update so you never miss exclusive rewards."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow shadow-slate-950/30"
          >
            <header className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{event.type}</p>
              <h2 className="text-xl font-semibold text-white">{event.name}</h2>
              <p className="text-sm text-slate-300">{formatRange(event.startDate, event.endDate)}</p>
            </header>

            <section className="mt-4 space-y-3 text-sm text-slate-200">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Modifiers</p>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {event.modifiers.map((modifier) => (
                    <li key={modifier}>{modifier}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rewards</p>
                <ul className="mt-1 list-disc space-y-1 pl-4">
                  {event.rewards.map((reward) => (
                    <li key={reward}>{reward}</li>
                  ))}
                </ul>
              </div>
            </section>

            {event.notes ? <p className="mt-4 text-sm text-slate-300">{event.notes}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
