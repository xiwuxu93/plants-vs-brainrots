import { NextResponse } from "next/server";
import { getStockPayload } from "@/lib/stock";

export async function GET() {
  const data = await getStockPayload();
  return NextResponse.json(data, {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
