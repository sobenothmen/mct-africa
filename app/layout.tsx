import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s — ${site.name}`,
  },
  description:
    "Mekadmini Cherif Trading (MCT) — distributeur de franchises internationales en Mauritanie et au Sénégal : Parfois, Celio, Zippy, Beauty Success, Women’Secret.",
  openGraph: {
    title: `${site.name} — ${site.fullName}`,
    description:
      "Commerce de détail et franchises internationales à Nouakchott et dans la région.",
    locale: "fr_MR",
    type: "website",
  },
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
