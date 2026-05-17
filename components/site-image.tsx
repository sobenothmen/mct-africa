import Image, { type ImageProps } from "next/image";

/** Qualité JPEG/WebP/AVIF servie par l’optimiseur Next.js */
export const IMAGE_QUALITY = 90;

type SiteImageProps = ImageProps & {
  quality?: number;
};

/**
 * Image Next.js avec qualité élevée par défaut et rendu photo net.
 */
export function SiteImage({
  quality = IMAGE_QUALITY,
  className,
  alt,
  ...props
}: SiteImageProps) {
  return (
    <Image
      alt={alt}
      quality={quality}
      className={className ? `${className} site-image` : "site-image"}
      {...props}
    />
  );
}
