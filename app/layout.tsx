import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  applicationName: site.name,
  title: {
    default: `${site.name} — ${site.legalName}`,
    template: `%s — ${site.name}`,
  },
  description:
    "MCT Holding, groupe Mekadmini Cherif Trading — distributeur de franchises internationales en Mauritanie et au Sénégal : Parfois, Celio, Zippy, Beauty Success, Women’Secret.",
  keywords: [
    "MCT",
    "MCT Holding",
    "Mekadmini Cherif Trading",
    "mct-holding",
    "franchises Mauritanie",
    "retail Nouakchott",
    "Parfois Mauritanie",
    "Celio Mauritanie",
    "Zippy Mauritanie",
    "Beauty Success Mauritanie",
    "Women'Secret Mauritanie",
  ],
  alternates: siteUrl
    ? {
        canonical: "/",
      }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${site.name} — ${site.legalName}`,
    description:
      "Commerce de détail et franchises internationales à Nouakchott et dans la région.",
    url: siteUrl,
    siteName: site.name,
    locale: "fr_MR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.legalName}`,
    description:
      "Distributeur de franchises internationales en Mauritanie et au Sénégal : mode, beauté et retail premium.",
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-zinc-900">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
