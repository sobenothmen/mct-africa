import type { MetadataRoute } from "next";
import { locales } from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl() ?? "http://localhost:3000";

  return locales.map((locale) => ({
    url: new URL(`/${locale}`, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "fr" ? 1 : 0.9,
  }));
}
