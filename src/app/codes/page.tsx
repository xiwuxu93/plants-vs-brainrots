import { buildPageMetadata } from "@/lib/site-metadata";
import CodesPageClient from "./codes-page-client";

export const metadata = buildPageMetadata({
  title: "Codes",
  description: "Claim the latest Plants vs Brainrots redeem codes, track expiration dates, and learn how to redeem rewards.",
  path: "/codes",
});

export default function CodesPage() {
  return <CodesPageClient />;
}
