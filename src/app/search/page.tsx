import type { Metadata } from "next";
import { withCanonical } from "@/lib/site-metadata";
import SearchPageClient from "./search-page-client";

export const metadata: Metadata = {
  ...withCanonical("/search"),
  title: "Search",
  description: "Search the Plants vs Brainrots database for plants, brainrots, and guides instantly.",
};

export default function SearchPage() {
  return <SearchPageClient />;
}
