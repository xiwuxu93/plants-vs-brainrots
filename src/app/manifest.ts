import type { MetadataRoute } from "next";

const siteUrl = "https://plantsvsbrainrots-game.com";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plants vs Brainrots Wiki",
    short_name: "PvB Wiki",
    description:
      "Live stock, calculators, fusion planner, and guides for Plants vs Brainrots players.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#10b981",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    scope: "/",
    lang: "en",
    id: siteUrl,
  };
}
