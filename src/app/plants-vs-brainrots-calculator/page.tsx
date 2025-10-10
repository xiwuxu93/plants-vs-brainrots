import type { Metadata } from "next";
import Script from "next/script";
import CalculatorClient from "./calculator-client";
import { canonicalUrl, withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/plants-vs-brainrots-calculator"),
  title: "Plants vs Brainrots Calculator",
  description:
    "Free Plants vs Brainrots calculators and tools covering brainrot income, plant growth, fusion planning, and cash forecasting.",
  openGraph: {
    title: "Plants vs Brainrots Calculator - Game Tools & Strategy",
    description:
      "Access calculators for brainrot income, fusion recipes, growth timers, and cash forecasts inspired by the popular Plants vs Brainrots tools.",
    url: canonicalUrl("/plants-vs-brainrots-calculator"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
