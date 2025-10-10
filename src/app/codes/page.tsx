import type { Metadata } from "next";
import { withCanonical } from "@/lib/site-metadata";
import CodesPageClient from "./codes-page-client";

export const metadata: Metadata = {
  ...withCanonical("/codes"),
  title: "Codes",
  description: "Claim the latest Plants vs Brainrots redeem codes, track expiration dates, and learn how to redeem rewards.",
};

export default function CodesPage() {
  return <CodesPageClient />;
}
