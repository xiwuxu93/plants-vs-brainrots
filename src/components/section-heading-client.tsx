"use client";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
}

const headingStyles: Record<NonNullable<SectionHeadingProps["as"]>, string> = {
  h1: "text-3xl font-bold text-white md:text-4xl",
  h2: "text-2xl font-semibold text-white md:text-3xl",
  h3: "text-xl font-semibold text-white md:text-2xl",
};

export function SectionHeading({ eyebrow, title, description, as = "h2" }: SectionHeadingProps) {
  const HeadingTag = as;
  return (
    <div className="mb-6 space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-300">
          {eyebrow}
        </p>
      ) : null}
      <HeadingTag className={headingStyles[as]}>{title}</HeadingTag>
      {description ? <p className="max-w-2xl text-sm text-slate-300">{description}</p> : null}
    </div>
  );
}
