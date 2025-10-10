import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { withCanonical } from "@/lib/site-metadata";

export const metadata: Metadata = {
  ...withCanonical("/login"),
  title: "Login",
  description: "Sign-in features are coming soon. Browse all Plants vs Brainrots tools without an account for now.",
};

export default function LoginPage() {
  return (
    <div className="container space-y-6">
      <SectionHeading
        eyebrow="Account"
        title="Login"
        description="Account features will unlock in a future update. For now you can browse the full database without signing in."
      />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
        <p>No authentication is required during the MVP phase.</p>
        <p className="mt-2">
          Want early access to cloud saves? <Link href="/contact" className="text-brand-200 hover:text-white">Drop us a message</Link> and we will
          invite you once the feature lands.
        </p>
      </div>
    </div>
  );
}
