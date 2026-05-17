import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteImage } from "@/components/site-image";
import { RichParagraph } from "@/components/rich-text";
import { getBrandTheme } from "@/lib/brand-themes";
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

  const theme = getBrandTheme(brand.slug);
  const servedCountries = brand.countries
    .map((code) => content.heroCountries.find((country) => country.code === code)?.name)
    .filter(Boolean)
    .join(" · ");

  return (
    <main className="-mt-[4rem] bg-white">
      <section className="bg-white">
        <div className="relative overflow-hidden bg-[#081527] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,161,93,0.16),transparent_30%),linear-gradient(180deg,rgba(8,21,39,0.88)_0%,rgba(8,21,39,0.96)_100%)]" />
          <div className="relative grid min-h-[34rem] w-full gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex items-end px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-14">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b57a]">
                  {content.home.brandPartnerLabel}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="relative h-10 w-44 bg-white/90 p-2">
                    <SiteImage
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      className="object-contain"
                      sizes="176px"
                    />
                  </div>
                </div>
                <h1 className="mt-5 font-serif text-[3rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-[4rem] lg:text-[5rem]">
                  {brand.name}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
                  {brand.body[0]}
                </p>
                <div className="mt-10 flex flex-wrap gap-8 border-t border-white/12 pt-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7b57a]">
                      {content.hero.sinceLabel}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{brand.year}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7b57a]">
                      {content.hero.presenceLabel}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{servedCountries}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7b57a]">
                      {content.hero.franchiseLabel}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{site.shortName}</p>
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={`/${lang}#enseignes`}
                    className="inline-flex min-w-[14rem] items-center justify-center bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#081527] transition hover:bg-[#f4ead8]"
                  >
                    {content.hero.contactUs}
                  </Link>
                  <Link
                    href={`/${lang}`}
                    className="inline-flex min-w-[14rem] items-center justify-center border border-white/16 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/6"
                  >
                    {content.hero.exploreBrands}
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative min-h-[20rem]">
              <SiteImage
                src={brand.image}
                alt={brand.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,21,39,0.16)_0%,rgba(8,21,39,0.06)_40%,rgba(8,21,39,0.34)_100%)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-18 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-6 border-t border-[#c9a15d]/45 pt-8">
            {brand.body.map((paragraph, idx) => (
              <RichParagraph key={idx} text={paragraph} />
            ))}
          </div>
          <div className={`overflow-hidden ${theme.article}`}>
            <div className={`h-1.5 w-full ${theme.strip}`} aria-hidden />
            <div className={`grid gap-8 p-6 sm:p-8 ${theme.inner}`}>
              <div className="flex items-center justify-between gap-6">
                <div className="relative h-9 w-40 bg-white p-2 shadow-sm">
                  <SiteImage
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {content.home.brandPartnerLabel}
                </div>
              </div>
              <div className={`relative aspect-[16/11] overflow-hidden shadow-lg ${theme.imageWrap}`}>
                <SiteImage
                  src={brand.image}
                  alt={brand.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${theme.accentDot}`} aria-hidden />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{servedCountries}</span>
                </div>
                <h2 className={`text-2xl font-bold tracking-tight sm:text-3xl ${theme.title}`}>
                  {brand.name}
                </h2>
                <p className="mt-5 leading-8 text-zinc-600">{brand.body[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
