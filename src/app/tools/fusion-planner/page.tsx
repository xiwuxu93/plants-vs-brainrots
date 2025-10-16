import { buildPageMetadata } from "@/lib/site-metadata";
import FusionPlannerClient from "./fusion-planner-client";

export const metadata = buildPageMetadata({
  title: "Fusion Planner",
  description: "Track Plants vs Brainrots fusion components, costs, and craftable recipes based on your inventory.",
  path: "/tools/fusion-planner",
});

export default function FusionPlannerPage() {
  return <FusionPlannerClient />;
}
