import clsx from "clsx";
import type { ReactNode } from "react";

interface MechanicHeroStat {
  label: string;
  value: string;
  detail?: string;
}

interface MechanicHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  stats?: MechanicHeroStat[];
  media?: ReactNode;
  children?: ReactNode;
}

export function MechanicHero({ eyebrow, title, description, stats, media, children }: MechanicHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-6 py-10 md:px-10 md:py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(91,154,155,0.18),_transparent_65%)]" />
      <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-brand-500/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-brand-200">
            {eyebrow}
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{title}</h1>
            <p className="max-w-2xl text-base text-slate-300 md:text-lg">{description}</p>
          </div>
          {children}
          {stats && stats.length > 0 ? (
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-white">{stat.value}</dd>
                  {stat.detail ? <p className="mt-1 text-xs text-slate-400">{stat.detail}</p> : null}
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        {media ? (
          <div className="flex items-center justify-center">
            <div className="relative flex h-full w-full max-w-sm items-center justify-center">
              {media}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface MechanicStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface MechanicStepListProps {
  title?: string;
  steps: MechanicStep[];
  className?: string;
}

export function MechanicStepList({ title, steps, className }: MechanicStepListProps) {
  return (
    <section className={clsx("space-y-4", className)}>
      {title ? <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2> : null}
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-brand-400/40 bg-brand-500/10 text-sm font-semibold text-brand-200">
              {step.icon ?? index + 1}
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-300">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

interface MechanicNoticeProps {
  tone?: "info" | "warning" | "success";
  title?: string;
  children: ReactNode;
}

const toneStyles: Record<Required<MechanicNoticeProps>["tone"], string> = {
  info: "border-sky-400/40 bg-sky-500/10 text-sky-100",
  warning: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  success: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
};

const toneIcons: Record<Required<MechanicNoticeProps>["tone"], string> = {
  info: "ℹ️",
  warning: "⚠️",
  success: "✅",
};

export function MechanicNotice({ tone = "info", title, children }: MechanicNoticeProps) {
  return (
    <div className={clsx("flex items-start gap-3 rounded-2xl border p-4 text-sm", toneStyles[tone])}>
      <span className="text-lg" aria-hidden>
        {toneIcons[tone]}
      </span>
      <div className="space-y-1">
        {title ? <p className="text-sm font-semibold text-white">{title}</p> : null}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
