import type { Metadata } from "next";

export const SITE_URL = "https://plantsvsbrainrots-game.com";
export const SITE_NAME = "Plants vs Brainrots";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/icons/icon-512.png`;

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

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export const buildPageMetadata = ({
  title,
  description,
  path,
  image,
}: PageMetadataOptions): Metadata => ({
  title,
  description,
  ...withCanonical(path),
  openGraph: {
    title,
    description,
    url: canonicalUrl(path),
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: image ?? DEFAULT_OG_IMAGE,
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image ?? DEFAULT_OG_IMAGE],
  },
});
