import type { MetadataRoute } from "next";
import { plants, brainrots } from "@/data/pvb-database";

const siteUrl = "https://plantsvsbrainrots-game.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const staticRoutes = [
    "",
    "/plants",
    "/brainrots",
    "/mechanics",
    "/gears",
    "/card",
    "/fuse-recipe",
    "/rebirth",
    "/drops",
    "/events",
    "/tools/plant-calculator",
    "/tools/efficiency",
    "/tools/rebirth",
    "/codes",
    "/gallery",
    "/plants-vs-brainrots-calculator",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.7,
    lastModified,
  }));

  plants.forEach((plant) => {
    entries.push({
      url: `${siteUrl}/plants/${plant.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified,
    });
  });

  brainrots.forEach((brainrot) => {
    entries.push({
      url: `${siteUrl}/brainrots/${brainrot.slug}`,
      changeFrequency: "weekly",
      priority: 0.6,
      lastModified,
    });
  });

  return entries;
}
