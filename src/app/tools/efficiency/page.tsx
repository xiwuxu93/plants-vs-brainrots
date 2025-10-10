import type { Metadata } from "next";
import { withCanonical } from "@/lib/site-metadata";
import EfficiencyClient from "./efficiency-client";

export const metadata: Metadata = {
  ...withCanonical("/tools/efficiency"),
  title: "Income Optimizer",
  description: "Compare Plants vs Brainrots brainrot income builds, upgrade ROI, and mutation scaling with live data.",
};

export default function EfficiencyPage() {
  return <EfficiencyClient />;
}
