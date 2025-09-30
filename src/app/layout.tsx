import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const siteUrl = "https://plantsvsbrainrots-game.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Plants vs Brainrots Wiki",
    template: "%s | Plants vs Brainrots",
  },
  description:
    "Strategy companion for Plants vs Brainrots with data-driven tools, fusion planning, live stock tracking, and event timelines.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Plants vs Brainrots Wiki",
    description:
      "Strategy companion for Plants vs Brainrots with data-driven tools, fusion planning, live stock tracking, and event timelines.",
    siteName: "Plants vs Brainrots",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Plants vs Brainrots Wiki",
    description:
      "Live stock, calculators, fusion planner, and event tracker for Plants vs Brainrots players.",
  },
  manifest: "/manifest.webmanifest",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <head>
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4855228928819714"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="google-analytics"
          src="https://www.googletagmanager.com/gtag/js?id=G-GND80V39W6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GND80V39W6');
          `}
        </Script>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <SiteHeader />
        <main className="flex-1 pb-16 pt-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
