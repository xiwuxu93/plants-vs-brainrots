import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { refreshStockPayload, STOCK_CACHE_TAG } from "@/lib/stock";

export async function GET() {
  const { payload, history, changed } = await refreshStockPayload();
  revalidateTag(STOCK_CACHE_TAG);
  return NextResponse.json({
    status: "ok",
    generatedAt: payload.generatedAt,
    items: payload.items.length,
    changed,
    history: history.length,
  });
}
