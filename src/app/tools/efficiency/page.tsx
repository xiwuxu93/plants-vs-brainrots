import { buildPageMetadata } from "@/lib/site-metadata";
import EfficiencyClient from "./efficiency-client";

export const metadata = buildPageMetadata({
  title: "Income Optimizer",
  description: "Compare Plants vs Brainrots brainrot income builds, upgrade ROI, and mutation scaling with live data.",
  path: "/tools/efficiency",
});

export default function EfficiencyPage() {
  return <EfficiencyClient />;
}
