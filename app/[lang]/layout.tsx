import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandMarquee } from "@/components/brand-marquee";
import { FirstVisitLoader } from "@/components/first-visit-loader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { BrandRouteLoader } from "@/components/brand-route-loader";
import {
  getLocalizedContent,
  hasLocale,
  localeMeta,
  locales,
  site,
  type Locale,
} from "@/lib/content";
import { getSiteUrl } from "@/lib/seo";

const siteUrl = getSiteUrl();

function getBrandsMenuLabel(locale: Locale) {
  if (locale === "en") {
    return "Our brands";
  }

  if (locale === "ar") {
    return "علاماتنا";
  }

  return "Nos marques";
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const content = getLocalizedContent(lang);
  const languageAlternates = Object.fromEntries(
    locales.map((locale) => [locale, `/${locale}`]),
  );

  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    applicationName: site.name,
    title: {
      default: content.seo.title,
      template: `%s — ${site.name}`,
    },
    description: content.seo.description,
    keywords: [...content.seo.keywords],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...languageAlternates,
        "x-default": "/fr",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.ogDescription,
      url: siteUrl ? new URL(`/${lang}`, siteUrl).toString() : undefined,
      siteName: site.name,
      locale: localeMeta[lang].ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.twitterDescription,
    },
    category: "business",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const content = getLocalizedContent(lang as Locale);
  const keepHeaderLtr = lang === "ar";

  return (
    <div lang={lang} dir={content.meta.direction} className="min-h-full flex flex-col">
      <FirstVisitLoader />
      <BrandRouteLoader />
      {keepHeaderLtr ? (
        <div dir="ltr" className="text-left">
          <BrandMarquee brands={content.brands} />
          <SiteHeader
            brands={content.brands}
            brandsLabel={getBrandsMenuLabel(lang as Locale)}
            locale={lang}
            nav={content.nav}
            menuLabel={content.aria.menu}
            switchLanguageLabel={content.aria.switchLanguage}
          />
        </div>
      ) : (
        <>
          <BrandMarquee brands={content.brands} />
          <SiteHeader
            brands={content.brands}
            brandsLabel={getBrandsMenuLabel(lang as Locale)}
            locale={lang}
            nav={content.nav}
            menuLabel={content.aria.menu}
            switchLanguageLabel={content.aria.switchLanguage}
          />
        </>
      )}
      <div className="flex-1">{children}</div>
      <SiteFooter contact={content.contact} footer={content.footer} />
    </div>
  );
}
