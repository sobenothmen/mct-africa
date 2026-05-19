"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BrandLoadingSplash } from "@/components/brand-loading-splash";
import {
  getBrandLoadingInfo,
  getFallbackBrandLoadingInfo,
  parseBrandPath,
} from "@/lib/brand-loading";

export default function BrandLoading() {
  const pathname = usePathname();

  const info = useMemo(() => {
    const parsed = parseBrandPath(pathname);
    if (!parsed) return getFallbackBrandLoadingInfo();

    return getBrandLoadingInfo(parsed.lang, parsed.slug) ?? getFallbackBrandLoadingInfo(parsed.lang);
  }, [pathname]);

  return (
    <BrandLoadingSplash
      logoAlt={info.name}
      logoSrc={info.logo}
      brandSlug={info.slug}
      accent={info.accent}
      label={info.label}
      className="min-h-[calc(100vh-7rem)]"
    />
  );
}
