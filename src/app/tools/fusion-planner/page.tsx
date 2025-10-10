import type { Metadata } from "next";
import { withCanonical } from "@/lib/site-metadata";
import FusionPlannerClient from "./fusion-planner-client";

export const metadata: Metadata = {
  ...withCanonical("/tools/fusion-planner"),
  title: "Fusion Planner",
  description: "Track Plants vs Brainrots fusion components, costs, and craftable recipes based on your inventory.",
};

export default function FusionPlannerPage() {
  return <FusionPlannerClient />;
}
