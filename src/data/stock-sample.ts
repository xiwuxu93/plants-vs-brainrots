export type StockStatus = "in-stock" | "low" | "sold-out" | "unknown";

export interface StockItem {
  id: string;
  name: string;
  type: "Seed" | "Brainrot" | "Gear" | "Mutation" | "Unknown";
  price: number;
  stock: number;
  status: StockStatus;
  lastSeen: string;
}

export interface StockPayload {
  generatedAt: string;
  nextRefresh: string;
  source: string;
  items: StockItem[];
}

const seed = Date.now();

function randomFluctuation(base: number, variance = 0.15) {
  const random = Math.sin(base + seed) * 0.5 + 0.5;
  const diff = variance * base;
  return Math.max(0, Math.round(base + diff * (random - 0.5) * 2));
}

const baseItems: Omit<StockItem, "stock" | "lastSeen">[] = [
  {
    id: "tomatiro-seed",
    name: "Tomatiro Seed",
    type: "Seed",
    price: 125000000,
    status: "low",
  },
  {
    id: "svinino-bombondino",
    name: "Svinino Bombondino",
    type: "Brainrot",
    price: 750000,
    status: "in-stock",
  },
  {
    id: "guardian-barrier-gear",
    name: "Guardian Barrier",
    type: "Gear",
    price: 300000,
    status: "sold-out",
  },
  {
    id: "neon-core",
    name: "Neon Core",
    type: "Mutation",
    price: 450000,
    status: "low",
  },
  {
    id: "fusion-core",
    name: "Fusion Core",
    type: "Gear",
    price: 520000,
    status: "in-stock",
  },
];

export function generateSampleStock(): StockPayload {
  const now = new Date();
  const items: StockItem[] = baseItems.map((item, index) => ({
    ...item,
    stock: randomFluctuation(50 - index * 5, 0.3),
    lastSeen: new Date(now.getTime() - index * 12 * 60 * 1000).toISOString(),
  }));

  return {
    generatedAt: now.toISOString(),
    nextRefresh: new Date(now.getTime() + 10 * 60 * 1000).toISOString(),
    source: process.env.STOCK_FEED_URL ? "upstream" : "sample",
    items,
  };
}
