import type { MetadataRoute } from "next";

const siteUrl = "https://plantsvsbrainrots-game.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api/"],
    },
    sitemap: [`${siteUrl}/sitemap.xml`],
    host: siteUrl,
  };
}
