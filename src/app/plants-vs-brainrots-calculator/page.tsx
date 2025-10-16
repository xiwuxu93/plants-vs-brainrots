import type { Metadata } from "next";
import Script from "next/script";
import CalculatorClient from "./calculator-client";
import { buildPageMetadata, canonicalUrl } from "@/lib/site-metadata";

const baseMetadata = buildPageMetadata({
  title: "Plants vs Brainrots Calculator",
  description:
    "Free Plants vs Brainrots calculators and tools covering brainrot income, plant growth, fusion planning, and cash forecasting.",
  path: "/plants-vs-brainrots-calculator",
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...(baseMetadata.openGraph ?? {}),
    title: "Plants vs Brainrots Calculator - Game Tools & Strategy",
    description:
      "Access calculators for brainrot income, fusion recipes, growth timers, and cash forecasts inspired by the popular Plants vs Brainrots tools.",
    url: canonicalUrl("/plants-vs-brainrots-calculator"),
    type: "website",
  },
  twitter: {
    ...(baseMetadata.twitter ?? {}),
    title: "Plants vs Brainrots Calculator",
    description:
      "Suite of Plants vs Brainrots calculators for income planning, plant stats, and fusion combinations.",
  },
};

export default function PlantsVsBrainrotsCalculatorPage() {
  return (
    <>
      <Script id="plants-vs-brainrots-calculator-script" src="/plants-vs-brainrots-calculator/script.js" strategy="afterInteractive" />
      <CalculatorClient />
    </>
  );
}
