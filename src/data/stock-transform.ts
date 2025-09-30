import type { StockItem, StockPayload } from "@/data/stock-sample";
import { plants, brainrots } from "@/data/pvb-database";

interface CompetitorField {
  name: string;
  value: string;
}

interface CompetitorEmbed {
  title?: string;
  timestamp?: string;
  fields?: CompetitorField[];
}

interface CompetitorMessage {
  id: string;
  createdAt: string;
  embeds?: CompetitorEmbed[];
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const plantNames = new Set(plants.map((plant) => normalize(plant.name)));
const brainrotNames = new Set(brainrots.map((brainrot) => normalize(brainrot.name)));

function cleanFieldName(raw: string) {
  return raw
    .replace(/:[^:]+:/g, " ")
    .replace(/[\p{Emoji_Presentation}\p{Emoji}\p{Extended_Pictographic}]/gu, " ")
    .replace(/[•·]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseStockValue(raw: string) {
  const match = raw.match(/([+-]?\d+)/);
  if (!match) return 0;
  return Number.parseInt(match[1], 10);
}

function inferType(name: string): StockItem["type"] {
  const slug = normalize(name);
  if (plantNames.has(slug)) return "Seed";
  if (brainrotNames.has(slug)) return "Brainrot";
  if (/core|drone|gear|barrier|scanner/i.test(name)) return "Gear";
  return "Unknown";
}

export function transformCompetitorStock(messages: CompetitorMessage[]): StockPayload | null {
  if (!Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  const itemsMap = new Map<string, StockItem>();

  messages.forEach((message) => {
    const embeds = message.embeds ?? [];
    embeds.forEach((embed) => {
      const timestamp = embed.timestamp ?? message.createdAt;
      (embed.fields ?? []).forEach((field) => {
        const cleanedName = cleanFieldName(field.name);
        if (!cleanedName) {
          return;
        }
        const slug = normalize(cleanedName);
        if (itemsMap.has(slug)) {
          return;
        }
        const delta = parseStockValue(field.value);
        const status: StockItem["status"] = delta > 0 ? "in-stock" : delta < 0 ? "sold-out" : "unknown";
        itemsMap.set(slug, {
          id: slug,
          name: cleanedName,
          type: inferType(cleanedName),
          price: 0,
          stock: Math.abs(delta),
          status,
          lastSeen: timestamp,
        });
      });
    });
  });

  const items = Array.from(itemsMap.values());
  if (items.length === 0) {
    return null;
  }

  const now = new Date();
  return {
    generatedAt: now.toISOString(),
    nextRefresh: new Date(now.getTime() + 60_000).toISOString(),
    source: "plantsvsbrainrots.com/api/latest-message",
    items,
  };
}
