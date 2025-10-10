import type { Metadata } from "next";

export const SITE_URL = "https://plantsvsbrainrots-game.com";

const ensureLeadingSlash = (path: string) => {
  if (!path) return "";
  return path.startsWith("/") ? path : `/${path}`;
};

export const canonicalUrl = (path = "") => {
  const normalized = ensureLeadingSlash(path);
  return normalized ? `${SITE_URL}${normalized}` : SITE_URL;
};

export const withCanonical = (path = ""): Pick<Metadata, "alternates"> => ({
  alternates: {
    canonical: canonicalUrl(path),
  },
});
