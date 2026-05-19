import {
  getLocalizedContent,
  hasLocale,
  isBrandSlug,
  type BrandSlug,
  type Locale,
} from "@/lib/content";

export type BrandLoadingInfo = {
  lang: Locale;
  slug?: BrandSlug;
  logo?: string;
  name: string;
  accent: string;
  label: string;
};

function getBrandLoadingLogo(slug: BrandSlug, defaultLogo: string) {
  if (slug === "beauty-success") return "/images/logos/loading-sent/beauty-success.png";
  if (slug === "parfois") return "/images/logos/loading-sent/parfois.png";
  if (slug === "celio") return "/images/logos/loading-sent/celio.png";
  return defaultLogo;
}

export function getBrandLoadingAccent(slug: string) {
  if (slug === "celio") return "#111111";
  if (slug === "zippy") return "#ff1212";
  if (slug === "beauty-success") return "#ef4d8f";
  if (slug === "parfois") return "#111827";
  return "#c9a15d";
}

export function getBrandLoadingLabel() {
  return "LOADING...";
}

export function getFallbackBrandLoadingInfo(lang: string = "fr"): BrandLoadingInfo {
  const locale = hasLocale(lang) ? lang : "fr";

  return {
    lang: locale,
    logo: undefined,
    name: "MCT Holding",
    accent: "#c9a15d",
    label: getBrandLoadingLabel(),
  };
}

export function getBrandLoadingInfo(lang: string, slug: string): BrandLoadingInfo | null {
  if (!hasLocale(lang) || !isBrandSlug(slug)) {
    return null;
  }

  const content = getLocalizedContent(lang);
  const brand = content.brands.find((item) => item.slug === slug);

  if (!brand) {
    return null;
  }

  return {
    lang,
    slug,
    logo: getBrandLoadingLogo(slug, brand.logo),
    name: brand.name,
    accent: getBrandLoadingAccent(slug),
    label: getBrandLoadingLabel(),
  };
}

export function parseBrandPath(pathname: string | null | undefined) {
  if (!pathname) return null;

  const [, lang = "", slug = ""] = pathname.match(/^\/([^/]+)\/brands\/([^/?#]+)/) ?? [];

  if (!hasLocale(lang) || !isBrandSlug(slug)) {
    return null;
  }

  return { lang, slug };
}
