"use client";

import { useEffect, useRef, useState } from "react";
import { BrandLoadingSplash } from "@/components/brand-loading-splash";
import { usePathname } from "next/navigation";
import { getBrandLoadingInfo, parseBrandPath, type BrandLoadingInfo } from "@/lib/brand-loading";

const minVisibleMs = 760;

export function BrandRouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [activeInfo, setActiveInfo] = useState<BrandLoadingInfo | null>(null);
  const hideTimer = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const lastKey = useRef<string>("");

  useEffect(() => {
    const showForPath = (targetPathname: string) => {
      const parsed = parseBrandPath(targetPathname);
      if (!parsed) return;

      const info = getBrandLoadingInfo(parsed.lang, parsed.slug);
      if (!info) return;

      const key = `${info.lang}/${info.slug}`;
      if (key === lastKey.current && visible) return;

      lastKey.current = key;
      startTime.current = Date.now();

      if (hideTimer.current) window.clearTimeout(hideTimer.current);

      window.requestAnimationFrame(() => {
        setActiveInfo(info);
        setVisible(true);
      });
    };

    const hideAfterMinimum = () => {
      if (!visible) return;

      const elapsed = Date.now() - startTime.current;
      const delay = Math.max(minVisibleMs - elapsed, 0);

      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), delay);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      showForPath(url.pathname);
    };

    document.addEventListener("click", handleDocumentClick, true);

    const parsedCurrent = parseBrandPath(pathname);
    if (parsedCurrent) {
      hideAfterMinimum();
    } else {
      lastKey.current = "";
      window.requestAnimationFrame(() => setVisible(false));
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [pathname, visible]);

  if (!visible || !activeInfo) return null;

  return (
    <div
      className="fixed left-0 right-0 z-[200] brand-route-overlay"
      role="status"
      aria-label="Loading"
    >
      <BrandLoadingSplash
        logoAlt={activeInfo.name}
        logoSrc={activeInfo.logo}
        brandSlug={activeInfo.slug}
        accent={activeInfo.accent}
        label={activeInfo.label}
        className="min-h-[calc(100vh-7rem)]"
      />
    </div>
  );
}
