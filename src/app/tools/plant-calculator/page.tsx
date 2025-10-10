import type { Metadata } from "next";
import { withCanonical } from "@/lib/site-metadata";
import PlantCalculatorClient from "./plant-calculator-client";

export const metadata: Metadata = {
  ...withCanonical("/tools/plant-calculator"),
  title: "Plant Efficiency Calculator",
  description: "Model Plants vs Brainrots plant lineups with mutation weighting, budget sliders, and live stock data.",
};

export default function PlantCalculatorPage() {
  return <PlantCalculatorClient />;
}
