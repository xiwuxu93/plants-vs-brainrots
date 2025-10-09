import type { Metadata } from 'next';
import Script from 'next/script';
import CalculatorClient from './calculator-client';

const pageUrl = 'https://plantsvsbrainrots-game.com/plants-vs-brainrots-calculator';

export const metadata: Metadata = {
  title: 'Plants vs Brainrots Calculator',
  description:
    'Free Plants vs Brainrots calculators and tools covering brainrot income, plant growth, fusion planning, and cash forecasting.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Plants vs Brainrots Calculator - Game Tools & Strategy',
    description:
      'Access calculators for brainrot income, fusion recipes, growth timers, and cash forecasts inspired by the popular Plants vs Brainrots tools.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plants vs Brainrots Calculator',
    description:
      'Suite of Plants vs Brainrots calculators for income planning, plant stats, and fusion combinations.',
  },
};

export default function PlantsVsBrainrotsCalculatorPage() {
  return (
    <>
      <Script
        id="plants-vs-brainrots-calculator-script"
        src="/plants-vs-brainrots-calculator/script.js"
        strategy="afterInteractive"
      />
      <CalculatorClient />
    </>
  );
}
