import type { MetadataRoute } from "next";
import { plants, brainrots } from "@/data/pvb-database";

const siteUrl = "https://plantsvsbrainrots-game.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/stock",
    "/plants",
    "/brainrots",
    "/gears",
    "/fusions",
    "/drops",
    "/events",
    "/guides",
    "/guides/beginner",
    "/guides/advanced",
    "/guides/bosses",
    "/tools",
    "/tools/plant-calculator",
    "/tools/efficiency",
    "/tools/fusion-planner",
    "/tools/rebirth",
    "/codes",
    "/gallery",
    "/plants-vs-brainrots-calculator",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  plants.forEach((plant) => {
    entries.push({
      url: `${siteUrl}/plants/${plant.id}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  brainrots.forEach((brainrot) => {
    entries.push({
      url: `${siteUrl}/brainrots/${brainrot.id}`,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  return entries;
}
