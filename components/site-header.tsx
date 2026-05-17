"use client";


import Link from "next/link";
import { useState } from "react";
import { localeMeta, locales, site, type Brand, type Locale } from "@/lib/content";

type SiteHeaderProps = {
  brands: ReadonlyArray<Brand>;
  brandsLabel: string;
  locale: Locale;
  nav: ReadonlyArray<{ href: string; label: string }>;
  menuLabel: string;
  switchLanguageLabel: string;
};

export function SiteHeader({
  brands,
  brandsLabel,
  locale,
  nav,
  menuLabel,
  switchLanguageLabel,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const leadingNav = nav.filter((item) => item.href === "#accueil" || item.href === "#qui-sommes-nous");
  const trailingNav = nav.filter(
    (item) => item.href !== "#accueil" && item.href !== "#qui-sommes-nous" && item.href !== "#enseignes",
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#081527]/88 backdrop-blur-xl">
      <div className="flex min-h-[4rem] w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#accueil`}
          className="group flex flex-col gap-0.5 leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="text-2xl font-bold tracking-tight text-white">{site.name}</span>
          <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-[#c9a15d] sm:text-xs">
            {site.headerLegalLine}
          </span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {leadingNav.map((item) => (
            <a
              key={item.href}
              href={`/${locale}${item.href}`}
              className="border-b border-transparent px-1 py-2 text-sm font-medium text-white/72 transition hover:border-[#c9a15d] hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="group relative pb-3 -mb-3">
            <button
              type="button"
              className="border-b border-transparent px-1 py-2 text-sm font-medium text-white/72 transition group-hover:border-[#c9a15d] group-hover:text-white"
            >
              {brandsLabel}
            </button>
            <div className="pointer-events-none absolute left-0 top-full z-20 min-w-[14rem] translate-y-0 border border-white/8 bg-[#081527]/98 p-3 opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.28)] transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="flex flex-col gap-1">
                {brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/${locale}/brands/${brand.slug}`}
                    className="px-3 py-2 text-sm font-medium text-white/76 transition hover:bg-white/6 hover:text-white"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {trailingNav.map((item) => (
            <a
              key={item.href}
              href={`/${locale}${item.href}`}
              className="border-b border-transparent px-1 py-2 text-sm font-medium text-white/72 transition hover:border-[#c9a15d] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="sr-only">{switchLanguageLabel}</span>
          {locales.map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                item === locale
                  ? "border-[#c9a15d] bg-[#c9a15d] text-[#081527]"
                  : "border-white/16 text-white/76 hover:border-white/28 hover:text-white"
              }`}
              aria-label={`${switchLanguageLabel}: ${localeMeta[item].name}`}
            >
              {localeMeta[item].label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/14 p-2 text-white md:hidden"
          aria-expanded={open}
          aria-label={menuLabel}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{menuLabel}</span>
          {open ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/8 bg-[#081527] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-0.5">
            {leadingNav.map((item) => (
              <a
                key={item.href}
                href={`/${locale}${item.href}`}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/82 hover:bg-white/6"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c9a15d]">
              {brandsLabel}
            </div>
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/${locale}/brands/${brand.slug}`}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/82 hover:bg-white/6"
                onClick={() => setOpen(false)}
              >
                {brand.name}
              </Link>
            ))}
            {trailingNav.map((item) => (
              <a
                key={item.href}
                href={`/${locale}${item.href}`}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-white/82 hover:bg-white/6"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2 px-3">
              {locales.map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                    item === locale
                      ? "border-[#c9a15d] bg-[#c9a15d] text-[#081527]"
                      : "border-white/16 text-white/76 hover:border-white/28 hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {localeMeta[item].label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
