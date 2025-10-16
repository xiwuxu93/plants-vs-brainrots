import { buildPageMetadata } from "@/lib/site-metadata";
import StockPageClient from "./stock-page-client";

export const metadata = buildPageMetadata({
  title: "Stock Tracker",
  description: "Monitor real-time Plants vs Brainrots shop inventory with auto-refreshing stock updates.",
  path: "/stock",
});

export default function StockPage() {
  return <StockPageClient />;
}
