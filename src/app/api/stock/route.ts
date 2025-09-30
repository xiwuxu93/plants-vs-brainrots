import { NextResponse } from "next/server";
import { generateSampleStock } from "@/data/stock-sample";
import { transformCompetitorStock } from "@/data/stock-transform";

const defaultFeed = "https://plantsvsbrainrots.com/api/latest-message";

export async function GET() {
  const feedUrl = process.env.STOCK_FEED_URL ?? defaultFeed;

  try {
    const response = await fetch(feedUrl, {
      next: { revalidate: 0 },
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const payload = await response.json();

      if (payload && Array.isArray(payload)) {
        const transformed = transformCompetitorStock(payload);
        if (transformed) {
          return NextResponse.json(transformed, { headers: { "Cache-Control": "no-store" } });
        }
      }

      if (payload && payload.items) {
        return NextResponse.json({ ...payload, source: feedUrl }, { headers: { "Cache-Control": "no-store" } });
      }
    }
  } catch (error) {
    // Silently fall back to sample data; upstream can be unavailable during build/offline runs.
  }

  const sample = generateSampleStock();
  return NextResponse.json(sample, { headers: { "Cache-Control": "no-store" } });
}
