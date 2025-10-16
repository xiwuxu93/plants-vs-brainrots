import { buildPageMetadata } from "@/lib/site-metadata";
import PlantCalculatorClient from "./plant-calculator-client";

export const metadata = buildPageMetadata({
  title: "Plant Efficiency Calculator",
  description: "Model Plants vs Brainrots plant lineups with mutation weighting, budget sliders, and live stock data.",
  path: "/tools/plant-calculator",
});

export default function PlantCalculatorPage() {
  return <PlantCalculatorClient />;
}
