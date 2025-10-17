import { buildPageMetadata } from "@/lib/site-metadata";
import { getStockPayload } from "@/lib/stock";
import StockPageClient from "./stock-page-client";

export const metadata = buildPageMetadata({
  title: "Stock Tracker",
  description: "Monitor real-time Plants vs Brainrots shop inventory with auto-refreshing stock updates.",
  path: "/stock",
});

export default async function StockPage() {
  const initialData = await getStockPayload();
  return <StockPageClient initialData={initialData} />;
}
