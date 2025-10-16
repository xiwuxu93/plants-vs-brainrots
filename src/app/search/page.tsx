import { buildPageMetadata } from "@/lib/site-metadata";
import SearchPageClient from "./search-page-client";

export const metadata = buildPageMetadata({
  title: "Search",
  description: "Search the Plants vs Brainrots database for plants, brainrots, guides, and tools instantly.",
  path: "/search",
});

export default function SearchPage() {
  return <SearchPageClient />;
}
