import { createHash } from "node:crypto";
import { kv } from "@vercel/kv";
import { StockPayload } from "@/data/stock-sample";

const STOCK_LATEST_KEY = "stock:latest";
const STOCK_HISTORY_INDEX_KEY = "stock:history";
const STOCK_HISTORY_LIMIT = 5;

interface CachedStockRecord extends StockPayload {
  hash: string;
}

function computeHash(payload: StockPayload) {
  const hash = createHash("sha256");
  hash.update(JSON.stringify(payload.items));
  return hash.digest("hex");
}

function hasKv() {
  return Boolean(
    process.env.KV_REST_API_URL &&
      process.env.KV_REST_API_TOKEN &&
      process.env.KV_REST_API_READ_ONLY_TOKEN
  );
}

export async function loadCachedStock(): Promise<{
  payload: StockPayload;
  hash: string;
} | null> {
  if (!hasKv()) return null;
  const record = await kv.get<CachedStockRecord>(STOCK_LATEST_KEY);
  if (!record) return null;
  const { hash: _hash, ...payload } = record;
  return { payload, hash: record.hash };
}

async function appendHistory(record: CachedStockRecord) {
  await kv.zadd(STOCK_HISTORY_INDEX_KEY, {
    score: new Date(record.generatedAt).getTime(),
    member: record.hash,
  });
  await kv.set(`${STOCK_HISTORY_INDEX_KEY}:${record.hash}`, record);

  const total = await kv.zcard(STOCK_HISTORY_INDEX_KEY);
  if (total > STOCK_HISTORY_LIMIT) {
    const excess = await kv.zrange(
      STOCK_HISTORY_INDEX_KEY,
      0,
      total - STOCK_HISTORY_LIMIT - 1
    );
    if (excess.length > 0) {
      await kv.zrem(STOCK_HISTORY_INDEX_KEY, ...excess);
      const keysToDelete = excess.map(
        (hash) => `${STOCK_HISTORY_INDEX_KEY}:${hash}`
      );
      if (keysToDelete.length > 0) {
        await kv.del(...keysToDelete);
      }
    }
  }
}

export async function saveStockPayload(payload: StockPayload) {
  if (!hasKv()) {
    return { changed: false, payload, hash: computeHash(payload) } as const;
  }

  const newHash = computeHash(payload);
  const existing = await kv.get<CachedStockRecord>(STOCK_LATEST_KEY);

  if (existing && existing.hash === newHash) {
    return { changed: false, payload, hash: newHash } as const;
  }

  const record: CachedStockRecord = { ...payload, hash: newHash };
  await kv.set(STOCK_LATEST_KEY, record);
  await appendHistory(record);
  return { changed: true, payload, hash: newHash } as const;
}

export async function loadStockHistory(excludeHash?: string) {
  if (!hasKv()) return [] as StockPayload[];
  const members = await kv.zrange(
    STOCK_HISTORY_INDEX_KEY,
    0,
    STOCK_HISTORY_LIMIT - 1,
    { rev: true }
  );
  const payloads: StockPayload[] = [];

  for (const hash of members) {
    if (hash === excludeHash) continue;
    const record = await kv.get<CachedStockRecord>(
      `${STOCK_HISTORY_INDEX_KEY}:${hash}`
    );
    if (!record) continue;
    const { hash: _ignored, ...payload } = record;
    payloads.push(payload);
  }

  return payloads;
}
