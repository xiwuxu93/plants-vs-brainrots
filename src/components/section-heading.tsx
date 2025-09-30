"use client";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-6 space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm text-slate-300">{description}</p> : null}
    </div>
  );
}
