import { StockItem, StockPayload, StockStatus } from "@/data/stock-sample";
import { loadCachedStock, loadStockHistory, saveStockPayload } from "./stock-cache";

export const STOCK_CACHE_TAG = "stock";
export const STOCK_REVALIDATE_SECONDS = 300; // 5 minutes

interface UpstreamItem {
  id?: string;
  name?: string;
  type?: string;
  price?: number | string | null;
  stock?: number | string | null;
  status?: string | null;
  lastSeen?: string | number | Date | null;
}

interface UpstreamResponse {
  generatedAt?: string;
  nextRefresh?: string;
  items?: UpstreamItem[];
  source?: string;
  [key: string]: unknown;
}

const TYPE_MAP: Record<string, StockItem["type"]> = {
  seed: "Seed",
  seeds: "Seed",
  plant: "Seed",
  brainrot: "Brainrot",
  brainrots: "Brainrot",
  gear: "Gear",
  gears: "Gear",
  mutation: "Mutation",
  mutations: "Mutation",
};

const STATUS_MAP: Record<string, StockStatus> = {
  instock: "in-stock",
  "in-stock": "in-stock",
  available: "in-stock",
  low: "low",
  lowstock: "low",
  soldout: "sold-out",
  "sold-out": "sold-out",
  unavailable: "sold-out",
};

function toNumber(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return NaN;
  if (typeof value === "number") return value;
  const clean = value.replace(/[^0-9.-]/g, "");
  if (!clean) return NaN;
  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function normalizeItem(item: UpstreamItem, index: number): StockItem {
  const rawType = item.type?.toLowerCase() ?? "unknown";
  const rawStatus = item.status?.toLowerCase() ?? "unknown";
  const price = toNumber(item.price);
  const stock = toNumber(item.stock);

  return {
    id: item.id || `stock-${index}`,
    name: item.name || "Unknown Item",
    type: TYPE_MAP[rawType] ?? "Unknown",
    price: Number.isFinite(price) ? price : NaN,
    stock: Number.isFinite(stock) ? stock : NaN,
    status: STATUS_MAP[rawStatus] ?? "unknown",
    lastSeen: item.lastSeen ? new Date(item.lastSeen).toISOString() : new Date().toISOString(),
  };
}

async function fetchUpstreamStock(feedUrl: string): Promise<StockPayload> {
  const response = await fetch(feedUrl, {
    headers: {
      "user-agent": "pvb-stock-sync/1.0",
    },
    next: {
      revalidate: STOCK_REVALIDATE_SECONDS,
      tags: [STOCK_CACHE_TAG],
    },
  });

  if (!response.ok) {
    throw new Error(`Stock upstream responded with ${response.status}`);
  }

  const data = (await response.json()) as UpstreamResponse;
  const nowIso = new Date().toISOString();
  const items = Array.isArray(data.items)
    ? data.items.map((item, index) => normalizeItem(item, index))
    : [];

  return {
    generatedAt: data.generatedAt ? new Date(data.generatedAt).toISOString() : nowIso,
    nextRefresh: data.nextRefresh ? new Date(data.nextRefresh).toISOString() : new Date(Date.now() + STOCK_REVALIDATE_SECONDS * 1000).toISOString(),
    source: "upstream",
    items,
  };
}

interface FetchStockOptions {
  bypassCache?: boolean;
}

export async function fetchStockData({ bypassCache = false }: FetchStockOptions = {}): Promise<StockPayload> {
  const feedUrl = process.env.STOCK_FEED_URL;

  if (!feedUrl) {
    const now = new Date();
    return {
      generatedAt: now.toISOString(),
      nextRefresh: new Date(now.getTime() + STOCK_REVALIDATE_SECONDS * 1000).toISOString(),
      source: "unavailable",
      items: [],
      message: "Stock feed is temporarily unavailable. We're working to restore the data feed.",
    };
  }

  try {
    if (bypassCache) {
      const response = await fetch(feedUrl, {
        headers: {
          "user-agent": "pvb-stock-sync/1.0",
        },
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Stock upstream responded with ${response.status}`);
      }
      const data = (await response.json()) as UpstreamResponse;
      const now = new Date();
      return {
        generatedAt: now.toISOString(),
        nextRefresh: new Date(now.getTime() + STOCK_REVALIDATE_SECONDS * 1000).toISOString(),
        source: "upstream",
        items: Array.isArray(data.items) ? data.items.map((item, index) => normalizeItem(item, index)) : [],
      };
    }

    return await fetchUpstreamStock(feedUrl);
  } catch (error) {
    console.error("Failed to load upstream stock feed", error);
    return {
      generatedAt: new Date().toISOString(),
      nextRefresh: new Date(Date.now() + STOCK_REVALIDATE_SECONDS * 1000).toISOString(),
      source: "unavailable",
      items: [],
      message: "Stock feed is temporarily unavailable. We're working to restore the data feed.",
    };
  }
}

export async function getStockPayload(): Promise<{ latest: StockPayload; history: StockPayload[]; hash?: string }> {
  const cachedRecord = await loadCachedStock();
  const cached = cachedRecord?.payload;

  const fresh = await fetchStockData();
  if (fresh.source === "upstream" && fresh.items.length > 0) {
    const result = await saveStockPayload(fresh);
    const history = await loadStockHistory(result.hash);
    return { latest: result.payload, history, hash: result.hash };
  }

  if (cached) {
    const history = await loadStockHistory(cachedRecord?.hash);
    return { latest: cached, history, hash: cachedRecord?.hash };
  }

  const history = await loadStockHistory();
  return { latest: fresh, history };
}

export async function refreshStockPayload() {
  const cachedRecord = await loadCachedStock();
  const cached = cachedRecord?.payload;
  const fresh = await fetchStockData({ bypassCache: true });

  if (fresh.source === "upstream" && fresh.items.length > 0) {
    const result = await saveStockPayload(fresh);
    const history = await loadStockHistory(result.hash);
    return { payload: result.payload, history, changed: result.changed } as const;
  }

  if (cached) {
    const history = await loadStockHistory(cachedRecord?.hash);
    return { payload: cached, history, changed: false } as const;
  }

  const history = await loadStockHistory();
  return { payload: fresh, history, changed: false } as const;
}
