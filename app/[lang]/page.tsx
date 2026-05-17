import Link from "next/link";
import { SiteImage } from "@/components/site-image";
import { HeroBanner } from "@/components/hero-banner";
import { RichParagraph } from "@/components/rich-text";
import { getLocalizedContent, hasLocale, type Locale } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { notFound } from "next/navigation";

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const content = getLocalizedContent(lang as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: content.seo.title,
    alternateName: ["MCT Holding", "MCT"],
    legalName: "Mekadmini Cherif Trading",
    url: absoluteUrl(`/${lang}`),
    logo: absoluteUrl("/icon"),
    description: content.seo.organizationDescription,
    foundingDate: "2017",
    inLanguage: lang,
    areaServed: ["MR", "SN"],
    address: {
      "@type": "PostalAddress",
      streetAddress: content.contact.addressLines[0],
      addressLocality: "Nouakchott",
      addressCountry: "MR",
    },
    contactPoint: [
      ...content.contact.phones.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: ["MR", "SN"],
        availableLanguage: ["fr", "en", "ar"],
      })),
      ...content.contact.emails.map((email) => ({
        "@type": "ContactPoint",
        email,
        contactType: "customer service",
        areaServed: ["MR", "SN"],
        availableLanguage: ["fr", "en", "ar"],
      })),
    ],
    knowsAbout: content.brands.map((brand) => brand.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="-mt-[4.25rem]">
        <HeroBanner
          heroHighlights={content.heroHighlights}
          hero={content.hero}
          brands={content.brands}
          locale={lang}
        />

        <section
          id="qui-sommes-nous"
          className="scroll-mt-20 border-y border-[var(--border-subtle)] bg-white"
        >
          <div className="w-full px-4 py-18 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[88rem] border-t border-[#c9a15d]/35 px-0 py-10">
              <div className="grid gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b68d49]">
                    {content.home.historyEyebrow}
                  </h2>
                  <p className="mt-4 text-3xl font-semibold tracking-tight text-[#10233a] sm:text-4xl lg:text-[2.85rem]">
                    {content.home.historyTitle}
                  </p>
                  <div className="mt-8 space-y-5 text-[1.02rem] leading-8 text-slate-600">
                    {content.home.introParagraphs.map((paragraph, idx) => (
                      <RichParagraph key={idx} text={paragraph} />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-xl">
                    <SiteImage
                      src="/images/trajectory-croissance-v5.png"
                      alt="Une trajectoire de croissance de MCT (2017–2026) avec présence par pays"
                      fill
                      className="object-contain p-3 sm:p-4"
                      sizes="(max-width: 1024px) 100vw, 520px"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-18 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
                <div className="relative aspect-[16/11] overflow-hidden shadow-xl lg:order-2">
                  <SiteImage
                    src="/images/history-heritage-slide.png"
                    alt="Visuel de présentation illustrant l'authenticité, la qualité et le développement des franchises en Mauritanie"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 600px"
                  />
                </div>
                <div className="bg-[#10233a] px-6 py-8 text-white shadow-[0_18px_60px_rgba(16,35,58,0.22)] lg:order-1 sm:px-8">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d7b57a]">
                    {content.home.heritageTitle}
                  </h2>
                  <p className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {content.home.heritageSubtitle}
                  </p>
                  <div className="mt-7 space-y-5">
                    {content.home.heritageParagraphs.map((paragraph, idx) => (
                      <p key={idx} className="leading-8 text-white/74">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vision" className="scroll-mt-20 bg-white">
          <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden border-t border-[#c9a15d]/45 bg-[#0b182a] shadow-[0_24px_90px_rgba(8,21,39,0.24)]">
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[320px] lg:min-h-full">
                  <SiteImage
                    src="/images/vision-mauritania.png"
                    alt="Mauritanie — vision et mission de MCT"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,19,33,0.08)_0%,rgba(8,19,33,0.28)_100%)]" />
                </div>
                <div className="px-6 py-10 text-white sm:px-8 lg:px-10">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d7b57a]">
                    {content.home.visionEyebrow}
                  </h2>
                  <div className="mt-8 space-y-8">
                    <div className="border-t border-white/12 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold text-white">{content.home.visionLabel}</h3>
                      <p className="mt-3 leading-8 text-white/72">{content.home.vision}</p>
                    </div>
                    <div className="border-t border-white/12 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold text-white">{content.home.missionLabel}</h3>
                      <p className="mt-3 leading-8 text-white/72">{content.home.mission}</p>
                    </div>
                    <div className="border-t border-white/12 bg-white/5 p-5">
                      <h3 className="text-lg font-semibold text-white">{content.home.objectivesLabel}</h3>
                      <ul className="mt-4 list-disc space-y-3 pl-5 text-white/72 marker:text-[#d7b57a]">
                        {content.home.objectives.map((item, idx) => (
                          <li key={idx} className="leading-7">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="enseignes" className="scroll-mt-20">
          <div className="w-full bg-white px-4 py-18 sm:px-6 lg:px-8">
            <div className="px-2 sm:px-0">
              <div className="max-w-3xl">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d7b57a]">
                  {content.home.brandsEyebrow}
                </h2>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#10233a] sm:text-4xl">
                  {content.home.brandsTitle}
                </p>
              </div>
              <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {content.brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/${lang}/brands/${brand.slug}`}
                    className="group block py-3"
                    aria-label={`${content.aria.showBrand} ${brand.name}`}
                  >
                    <div className="relative h-18 overflow-hidden sm:h-20">
                      <SiteImage
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        fill
                        className="object-contain transition duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 20vw"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-white">
          <div className="w-full px-4 py-18 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
              <div className="border-t border-[#c9a15d]/45 bg-white px-6 py-8 shadow-[0_20px_80px_rgba(16,35,58,0.08)] sm:px-8">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b68d49]">
                  {content.home.contactEyebrow}
                </h2>
                <p className="mt-4 text-3xl font-semibold tracking-tight text-[#10233a] sm:text-4xl">
                  {content.home.contactTitle}
                </p>
                <dl className="mt-10 space-y-8">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {content.home.addressLabel}
                    </dt>
                    <dd className="mt-3 text-lg text-zinc-800">
                      {content.contact.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {content.home.phoneLabel}
                    </dt>
                    <dd className="mt-2 flex flex-col gap-2">
                      {content.contact.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="text-lg font-medium text-[#10233a] transition hover:text-[#b68d49]"
                        >
                          {phone}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {content.home.emailLabel}
                    </dt>
                    <dd className="mt-2 flex flex-col gap-2">
                      {content.contact.emails.map((email) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className="text-zinc-800 underline-offset-4 hover:text-[#b68d49] hover:underline"
                        >
                          {email}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {content.home.hoursLabel}
                    </dt>
                    <dd className="mt-2 text-lg text-zinc-800">{content.contact.hours}</dd>
                  </div>
                </dl>
              </div>
              <div className="relative min-h-[320px] overflow-hidden shadow-[0_20px_80px_rgba(16,35,58,0.18)] lg:min-h-0">
                <SiteImage
                  src="/images/contact.jpeg"
                  alt="MCT contact"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
