import type { Metadata } from "next";
import { withCanonical } from "@/lib/site-metadata";
import StockPageClient from "./stock-page-client";

export const metadata: Metadata = {
  ...withCanonical("/stock"),
  title: "Stock Tracker",
  description: "Monitor real-time Plants vs Brainrots shop inventory with auto-refreshing stock updates.",
};

export default function StockPage() {
  return <StockPageClient />;
}
