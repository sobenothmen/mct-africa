"use client";

import { SiteImage } from "@/components/site-image";
import { type LocalizedContent, type Locale } from "@/lib/content";

type HeroBannerProps = Pick<LocalizedContent, "heroHighlights" | "hero" | "brands"> & {
  locale: Locale;
};

export function HeroBanner({ heroHighlights, hero, brands, locale }: HeroBannerProps) {
  const isArabic = locale === "ar";

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[var(--background)] text-slate-950"
      dir={isArabic ? "ltr" : undefined}
    >
      <HeroBackdrop />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden xl:block xl:w-[40vw] 2xl:w-[44vw]">
        <div className="h-full w-full bg-[#0f1f34]" />
      </div>

      <div className="relative w-full px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pb-12 lg:pt-22">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_34rem] xl:items-stretch xl:gap-0">
          <div
            className={`max-w-5xl px-2 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-7 ${
              isArabic ? "text-right" : "text-left"
            }`}
            dir={isArabic ? "rtl" : undefined}
          >
            <div className="max-w-4xl">
              <h1 className="font-serif text-[2.85rem] leading-[0.98] tracking-[-0.04em] text-[#111827] sm:text-[3.7rem] lg:text-[4.35rem]">
                {hero.titleLead}
                <span className="mt-2 block text-[#c8a86a]">{hero.titleAccent}</span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-[1.7] text-[#394454] sm:text-lg">
                {hero.description}
              </p>
            </div>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {heroHighlights.map((stat) => (
                <div key={stat.label} className="space-y-4">
                  <MetricIcon label={stat.label} />
                  <div>
                    <p className="font-serif text-[2.85rem] font-semibold leading-none tracking-[-0.04em] text-[#111827]">
                      {stat.value}
                      {stat.suffix ? <span>{stat.suffix}</span> : null}
                    </p>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#111827]">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-sm text-[#525d6d]">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#qui-sommes-nous"
                className="inline-flex min-w-[15rem] items-center justify-center rounded-sm bg-[#0f1f34] px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#0b1728]"
              >
                {hero.exploreBrands}
              </a>
              <a
                href="#enseignes"
                className="inline-flex min-w-[15rem] items-center justify-center rounded-sm bg-[#f8f0e2] px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#c1a063] transition hover:bg-[#f3e8d4]"
              >
                {hero.contactUs}
              </a>
            </div>
          </div>

          <div className="hidden xl:block xl:pl-12">
            <div className="flex h-full min-h-[29rem] flex-col justify-between overflow-hidden bg-[#0f1f34] px-0 py-0 text-white">
              <div className="group relative min-h-[17rem] w-full">
                <SiteImage
                  src="/images/mct-team-office.png"
                  alt="Employés MCT en réunion de travail dans un bureau"
                  fill
                  className="object-cover object-[center_20%] transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1280px) 100vw, 34rem"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,19,33,0.04)_0%,rgba(8,19,33,0.08)_38%,rgba(8,19,33,0.74)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d7b57a]">
                    Équipe MCT
                  </p>
                  <p className="mt-2 max-w-sm text-[1.05rem] font-semibold leading-tight text-white">
                    MCT au quotidien, entre coordination, analyse et développement des enseignes
                  </p>
                </div>
              </div>
              <div className="px-10 pb-8 pt-7">
                <div className="flex items-center gap-4">
                  <p className="shrink-0 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white">
                    {hero.representedBrands}
                  </p>
                  <div className="h-px flex-1 bg-white/12" aria-hidden />
                </div>
                <BrandLogoGrid brands={brands} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,168,106,0.08),transparent_34%),linear-gradient(180deg,#fffdf9_0%,#ffffff_52%,#f8fbff_100%)]" />
      <div className="absolute left-[8%] top-[10%] h-48 w-48 rounded-full bg-white/95 blur-3xl" />
      <div className="absolute right-[10%] top-[16%] h-56 w-56 rounded-full bg-[#eef4fb]/70 blur-3xl" />
    </div>
  );
}

function BrandLogoGrid({ brands }: { brands: HeroBannerProps["brands"] }) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7">
      {brands.map((brand) => (
        <div
          key={brand.slug}
          className="flex min-h-[2.75rem] items-center justify-center px-2 text-center"
        >
          <BrandWordmark slug={brand.slug} name={brand.name} />
        </div>
      ))}
    </div>
  );
}

function BrandWordmark({
  slug,
  name,
}: {
  slug: HeroBannerProps["brands"][number]["slug"];
  name: string;
}) {
  if (slug === "parfois") {
    return (
      <span className="text-[1.08rem] font-light uppercase tracking-[0.3em] text-white">
        {name}
      </span>
    );
  }

  if (slug === "celio") {
    return (
      <span className="text-[1.22rem] font-semibold lowercase tracking-[0.02em] text-white">
        celio*
      </span>
    );
  }

  if (slug === "zippy") {
    return (
      <span className="text-[1.2rem] font-black lowercase tracking-[-0.04em] text-white">
        zippy
      </span>
    );
  }

  if (slug === "beauty-success") {
    return (
      <span className="text-[0.84rem] font-semibold uppercase tracking-[0.18em] text-white">
        Beauty Success
      </span>
    );
  }

  return <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white">{name}</span>;
}

function MetricIcon({ label }: { label: string }) {
  const common = {
    className: "h-11 w-11 text-[#1c2430]",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true,
  } as const;

  if (label === "PAYS" || label === "COUNTRIES" || label === "بلدان") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path strokeLinecap="round" d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.4 3.4 8.5S14.2 18.1 12 20.5M12 3.5C9.8 5.9 8.6 8.9 8.6 12s1.2 6.1 3.4 8.5" />
      </svg>
    );
  }

  if (label === "ANNÉES" || label === "YEARS" || label === "سنوات") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-3.3-6.9" />
      </svg>
    );
  }

  if (label === "BOUTIQUES" || label === "STORES" || label === "متاجر") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.5h15l-1.2-4H5.7l-1.2 4ZM6 9.5v8h12v-8M9 17.5V13h6v4.5" />
      </svg>
    );
  }

  if (label === "COLLABORATEURS" || label === "COLLABORATORS" || label === "متعاونون") {
    return (
      <svg {...common}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 11a2.8 2.8 0 1 0 0-5.6A2.8 2.8 0 0 0 8 11Zm8 0a2.8 2.8 0 1 0 0-5.6A2.8 2.8 0 0 0 16 11ZM4 18a4 4 0 0 1 8 0M12 18a4 4 0 0 1 8 0" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m7 4 9 9-5 5-6-6V7l2-3Z" />
      <circle cx="9.2" cy="8.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
