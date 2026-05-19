import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteImage } from "@/components/site-image";
import { RichParagraph } from "@/components/rich-text";
import {
  getBrandSlugs,
  getLocalizedContent,
  hasLocale,
  isBrandSlug,
  localeMeta,
  locales,
  site,
  type Locale,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

function getBrandMedia(slug: string, fallback: { src: string; alt: string }) {
  if (slug === "celio") {
    return {
      hero: { src: "/images/brands/celio/facade.jpeg", alt: "Façade de la boutique Celio" },
      feature: {
        src: "/images/brands/celio/interior-panorama.jpeg",
        alt: "Boutique Celio - panorama intérieur",
      },
      gallery: [
        { src: "/images/brands/celio/facade.jpeg", alt: "Façade de la boutique Celio" },
        { src: "/images/brands/celio/interior-1.jpeg", alt: "Boutique Celio - espace de vente" },
        { src: "/images/brands/celio/interior-3.jpeg", alt: "Boutique Celio - vue d'ensemble" },
      ],
    } as const;
  }

  if (slug === "parfois") {
    return {
      hero: { src: "/images/brands/parfois/hero.jpeg", alt: "Parfois - vitrine de la boutique" },
      feature: { src: "/images/brands/parfois/feature.jpeg", alt: "Parfois - façade" },
      gallery: [
        { src: "/images/brands/parfois/gallery-1.jpeg", alt: "Parfois - façade" },
        { src: "/images/brands/parfois/gallery-2.jpeg", alt: "Parfois - intérieur du magasin" },
        { src: "/images/brands/parfois/feature.jpeg", alt: "Parfois - entrée de boutique" },
      ],
    } as const;
  }

  if (slug === "zippy") {
    return {
      hero: { src: "/images/brands/zippy/facade.jpeg", alt: "Façade de la boutique Zippy" },
      feature: {
        src: "/images/brands/zippy/interior-1.jpeg",
        alt: "Boutique Zippy - intérieur du magasin",
      },
      gallery: [
        { src: "/images/brands/zippy/facade.jpeg", alt: "Façade de la boutique Zippy" },
        { src: "/images/brands/zippy/interior-1.jpeg", alt: "Boutique Zippy - intérieur du magasin" },
      ],
    } as const;
  }

  if (slug === "beauty-success") {
    return {
      hero: { src: "/images/brands/beauty-success/facade-day.jpeg", alt: "Beauty Success - façade" },
      feature: {
        src: "/images/brands/beauty-success/facade-day.jpeg",
        alt: "Beauty Success - enseigne et façade",
      },
      gallery: [
        { src: "/images/brands/beauty-success/facade-day.jpeg", alt: "Beauty Success - façade" },
        { src: "/images/brands/beauty-success/gallery-1.jpeg", alt: "Beauty Success - façade et identité lumineuse" },
        { src: "/images/brands/beauty-success/gallery-2.jpeg", alt: "Beauty Success - façade et logo lumineux" },
      ],
    } as const;
  }

  return {
    hero: fallback,
    feature: fallback,
    gallery: [fallback],
  } as const;
}

type BrandGalleryLocation = {
  city: string;
  countryFlag: string;
  venue?: string;
};

function getBrandGalleryLocations(slug: string): readonly BrandGalleryLocation[] {
  const nouakchott = { city: "Nouakchott", countryFlag: "🇲🇷" } as const;
  const dakarSeaPlaza = { city: "Dakar", venue: "Sea Plaza", countryFlag: "🇸🇳" } as const;

  if (slug === "parfois") {
    return [nouakchott, nouakchott, dakarSeaPlaza];
  }

  return [nouakchott, nouakchott, nouakchott];
}

function getBrandCta(locale: Locale) {
  if (locale === "ar") {
    return { primary: "اكتشف المتجر", secondary: "عرض الصور" };
  }
  if (locale === "en") {
    return { primary: "Explore the store", secondary: "View gallery" };
  }
  return { primary: "Découvrir la boutique", secondary: "Voir la galerie" };
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getBrandSlugs().map((slug) => ({
      lang,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isBrandSlug(slug)) {
    return {};
  }

  const content = getLocalizedContent(lang as Locale);
  const brand = content.brands.find((item) => item.slug === slug);

  if (!brand) {
    return {};
  }

  const title = `${brand.name} — ${site.name}`;
  const description = brand.body[0] ?? content.seo.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/brands/${slug}`,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}/brands/${slug}`])),
        "x-default": `/fr/brands/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      locale: localeMeta[lang].ogLocale,
      type: "article",
      url: absoluteUrl(`/${lang}/brands/${slug}`),
      images: brand.image ? [{ url: brand.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang) || !isBrandSlug(slug)) {
    notFound();
  }

  const content = getLocalizedContent(lang as Locale);
  const brand = content.brands.find((item) => item.slug === slug);

  if (!brand) {
    notFound();
  }

  const media = getBrandMedia(brand.slug, { src: brand.image, alt: brand.imageAlt });
  const galleryLocations = getBrandGalleryLocations(brand.slug);
  const cta = getBrandCta(lang as Locale);
  const servedCountries = brand.countries
    .map((code) => content.heroCountries.find((country) => country.code === code)?.name)
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="-mt-[4rem] bg-white text-slate-950">
      <section className="relative w-full overflow-hidden bg-[#081527] text-white">
        <SiteImage
          src={media.hero.src}
          alt={media.hero.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,21,39,0.86)_0%,rgba(8,21,39,0.62)_38%,rgba(8,21,39,0.22)_72%,rgba(8,21,39,0.08)_100%)]" />
        <div className="relative w-full px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-18">
            <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <div className="max-w-xl">
                <div className="relative h-12 w-48 sm:h-14 sm:w-56">
                  <SiteImage
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                    sizes="224px"
                  />
                </div>
              <h1 className="mt-8 font-serif text-[2.85rem] leading-[0.98] tracking-[-0.04em] text-white sm:text-[3.5rem] lg:text-[4rem]">
                {brand.name}
              </h1>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#boutique"
                  className="inline-flex min-w-[15rem] items-center justify-center bg-[#c9a15d] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#081527] transition hover:bg-[#d7b57a]"
                >
                    {cta.primary}
                  </a>
                  <a
                    href="#espace"
                    className="inline-flex min-w-[15rem] items-center justify-center border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/10"
                  >
                    {cta.secondary}
                  </a>
                </div>
                <div className="mt-10 h-px w-full bg-white/14" aria-hidden />
              </div>
              <div className="hidden lg:block" aria-hidden />
            </div>
        </div>
      </section>

      <section id="boutique" className="w-full scroll-mt-24 bg-white px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div className="space-y-6">
              {brand.body.slice(0, 2).map((paragraph, idx) => (
                <RichParagraph key={idx} text={paragraph} />
              ))}

              <div className="mt-10 grid gap-7 sm:grid-cols-2">
                <FeatureStat
                  icon="pin"
                  label={content.hero.presenceLabel}
                  value={servedCountries || "—"}
                  accent={brand.slug === "celio" ? "celio" : "gold"}
                />
                <FeatureStat
                  icon="calendar"
                  label={content.hero.sinceLabel}
                  value={brand.year}
                  accent={brand.slug === "celio" ? "celio" : "gold"}
                />
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1525]">
              <SiteImage
                src={media.feature.src}
                alt={media.feature.alt}
                fill
                className="object-cover brightness-110 contrast-105 saturate-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,21,39,0.04)_0%,rgba(8,21,39,0.30)_100%)]" />
            </div>
          </div>
        </div>
      </section>

      <section id="espace" className="w-full scroll-mt-24 bg-white px-4 pb-22 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[88rem]">
          <div className="border-t border-[var(--border-subtle)] pt-12">
            <div className="grid gap-6 lg:grid-cols-3">
              {media.gallery.map((photo, index) => {
                const location = galleryLocations[index] ?? galleryLocations[galleryLocations.length - 1];

                return (
                <figure key={photo.src} className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0b1525]">
                    <SiteImage
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover brightness-110 contrast-105 saturate-105 transition duration-500 hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <figcaption className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                      <FeatureIcon kind="pin" />
                    </span>
                    <span>
                      {location.city}
                      {location.venue ? ` · ${location.venue}` : ""}
                    </span>
                    <span className="text-base leading-none" aria-label={`Drapeau ${location.city}`}>
                      {location.countryFlag}
                    </span>
                  </figcaption>
                </figure>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureStat({
  icon,
  label,
  value,
  accent,
}: {
  icon: "partner" | "pin" | "calendar";
  label: string;
  value: string;
  accent: "gold" | "celio";
}) {
  const accentBg = accent === "celio" ? "bg-[#101827]" : "bg-[#0f1f34]";
  const accentLine = accent === "celio" ? "bg-[#ff2b2b]" : "bg-[#c9a15d]";

  return (
    <div className="group relative overflow-hidden bg-white px-5 py-4 shadow-[0_18px_60px_rgba(16,35,58,0.08)]">
      <div className={`absolute inset-x-0 top-0 h-0.5 ${accentLine}`} aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,161,93,0.10),transparent_42%)] opacity-60" />

      <div className="relative flex items-start gap-4">
      <span
        className={`mt-0.5 inline-flex h-11 w-11 items-center justify-center ${accentBg} text-white`}
        aria-hidden
      >
        <FeatureIcon kind={icon} />
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-[#10233a]">
          <span>{value}</span>
          {accent === "celio" ? <CelioStarMark /> : null}
        </p>
      </div>
      </div>
    </div>
  );
}

function FeatureIcon({ kind }: { kind: "partner" | "pin" | "calendar" }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (kind === "partner") {
    return (
      <svg {...common}>
        <path d="M16 11a3 3 0 1 0-6 0v1a3 3 0 0 0 6 0v-1Z" />
        <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
        <path d="M9 6.5a3 3 0 1 0 6 0" />
      </svg>
    );
  }

  if (kind === "calendar") {
    return (
      <svg {...common}>
        <path d="M8 3v3M16 3v3" />
        <path d="M4.5 7.5h15" />
        <path d="M6 5.5h12a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 18 20.5H6A1.5 1.5 0 0 1 4.5 19V7A1.5 1.5 0 0 1 6 5.5Z" />
        <path d="M8.5 11h3M8.5 14.5h7" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 21s6-5.1 6-10a6 6 0 1 0-12 0c0 4.9 6 10 6 10Z" />
      <path d="M12 11.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" />
    </svg>
  );
}

function CelioStarMark() {
  return (
    <span className="inline-flex items-center" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l1.8 6.3L20 6.8l-3.9 4.2L20 17.2l-6.2-1.5L12 22l-1.8-6.3L4 17.2l3.9-6.2L4 6.8l6.2 1.5L12 2Z"
          fill="#ff2b2b"
        />
      </svg>
    </span>
  );
}
