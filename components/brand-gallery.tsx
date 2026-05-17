"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteImage } from "@/components/site-image";

export type BrandGalleryPhoto = {
  src: string;
  alt: string;
};

export function BrandGallery({
  photos,
  intervalMs = 4500,
}: {
  photos: ReadonlyArray<BrandGalleryPhoto>;
  intervalMs?: number;
}) {
  const safePhotos = useMemo(() => photos.filter((p) => Boolean(p?.src)), [photos]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!intervalMs || intervalMs < 500) return;
    if (safePhotos.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safePhotos.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, safePhotos.length]);

  if (safePhotos.length === 0) return null;

  const current = safePhotos[index] ?? safePhotos[0]!;

  return (
    <div className="w-full">
      <div className="relative aspect-[21/9] overflow-hidden bg-[#0b1525]">
        <SiteImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          className="object-cover brightness-110 contrast-105 saturate-105 animate-[brandFade_450ms_ease-out] will-change-transform"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,21,39,0.02)_0%,rgba(8,21,39,0.08)_45%,rgba(8,21,39,0.32)_100%)]" />
      </div>

      {safePhotos.length > 1 ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {safePhotos.map((photo, i) => {
          const isActive = i === index;
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden bg-[#0b1525] transition ${
                isActive ? "outline outline-2 outline-[#c9a15d]" : "outline outline-1 outline-[var(--border-subtle)]"
              }`}
              aria-label={`Voir la photo ${i + 1}`}
              aria-current={isActive ? "true" : "false"}
            >
              <SiteImage src={photo.src} alt={photo.alt} fill className="object-cover" sizes="96px" />
              <span
                className={`absolute inset-0 transition ${
                  isActive ? "bg-transparent" : "bg-white/5 hover:bg-transparent"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>
      ) : null}
    </div>
  );
}
