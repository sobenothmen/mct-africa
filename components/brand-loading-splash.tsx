"use client";

import { SiteImage } from "@/components/site-image";
import type { BrandSlug } from "@/lib/content";

export function BrandLoadingSplash({
  logoAlt,
  logoSrc,
  brandSlug,
  accent,
  label,
  className,
}: {
  logoAlt: string;
  logoSrc?: string;
  brandSlug?: BrandSlug;
  accent: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center bg-white px-6 ${className ?? "min-h-[70vh]"}`}
      style={{ ["--brand-accent" as never]: accent } as React.CSSProperties}
    >
      <div className="brand-loading-stage flex w-full max-w-md flex-col items-center text-center">
        <div className={`brand-loading-ring ${brandSlug ? `brand-loading-ring-${brandSlug}` : ""}`} aria-hidden>
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="brand-loading-bar"
              style={{ ["--bar-index" as never]: index } as React.CSSProperties}
            />
          ))}
        </div>

        <div className={`brand-loading-logo-frame brand-loading-logo ${brandSlug ? `brand-loading-logo-${brandSlug}` : ""}`}>
          {logoSrc ? (
            <SiteImage
              src={logoSrc}
              alt={logoAlt}
              fill
              className="brand-loading-logo-image object-contain"
              sizes="320px"
              priority
            />
          ) : (
            <span className="brand-loading-fallback-logo">
              M<span style={{ color: accent }}>C</span>T
            </span>
          )}
        </div>

        <div className="mt-10 brand-loading-label text-[12px] font-semibold uppercase tracking-[0.26em] text-slate-500">
          {label}
        </div>
      </div>
    </div>
  );
}
