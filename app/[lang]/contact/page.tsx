import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { SiteImage } from "@/components/site-image";
import { getLocalizedContent, hasLocale, type Locale } from "@/lib/content";

const nouakchottMap = {
  lat: 18.079,
  lon: -15.965,
  zoom: 13,
} as const;

function osmEmbedUrl({ lat, lon, zoom }: { lat: number; lon: number; zoom: number }) {
  const bbox = [
    lon - 0.06,
    lat - 0.045,
    lon + 0.06,
    lat + 0.045,
  ]
    .map((v) => v.toFixed(6))
    .join(",");

  const marker = `${lat.toFixed(6)},${lon.toFixed(6)}`;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}#map=${zoom}/${lat.toFixed(
    6,
  )}/${lon.toFixed(6)}`;
}

function osmLinkUrl({ lat, lon, zoom }: { lat: number; lon: number; zoom: number }) {
  return `https://www.openstreetmap.org/?mlat=${lat.toFixed(6)}&mlon=${lon.toFixed(6)}#map=${zoom}/${lat.toFixed(
    6,
  )}/${lon.toFixed(6)}`;
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const content = getLocalizedContent(lang as Locale);

  return (
    <main className="-mt-[4rem] bg-white">
      <section className="relative overflow-hidden bg-[#081527] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,161,93,0.14),transparent_32%),linear-gradient(180deg,rgba(8,21,39,0.88)_0%,rgba(8,21,39,0.96)_100%)]" />
        <div className="relative grid min-h-[28rem] w-full gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex items-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#d7b57a]">
                {content.home.contactEyebrow}
              </p>
              <h1 className="mt-5 font-serif text-[3rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-[4rem]">
                {content.home.contactTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                {content.hero.missionBody}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={`/${lang}#enseignes`}
                  className="inline-flex min-w-[14rem] items-center justify-center bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#081527] transition hover:bg-[#f4ead8]"
                >
                  {content.hero.exploreBrands}
                </Link>
                <Link
                  href={`/${lang}`}
                  className="inline-flex min-w-[14rem] items-center justify-center border border-white/16 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-white/6"
                >
                  {content.hero.contactUs}
                </Link>
              </div>
            </div>
          </div>
          <div className="relative min-h-[18rem]">
            <SiteImage
              src="/images/contact-visits-partnerships.png"
              alt="Espace de visite et partenariats — MCT"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,21,39,0.12)_0%,rgba(8,21,39,0.04)_45%,rgba(8,21,39,0.32)_100%)]" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-18 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="border-t border-[#c9a15d]/35 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b68d49]">
              {content.footer.contactHeading}
            </h2>
            <div className="mt-8">
              <ContactForm locale={lang as Locale} />
            </div>
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
                      href={`tel:${phone.replace(/\\s/g, "")}`}
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

          <div className="border-t border-[#c9a15d]/35 pt-8">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b68d49]">Maps</h2>
            <p className="mt-4 text-sm leading-7 text-[#5b6979]">{content.contact.addressLines.join(", ")}</p>
            <div className="mt-8 overflow-hidden border border-[var(--border-subtle)] bg-white shadow-[0_20px_80px_rgba(16,35,58,0.08)]">
              <iframe
                title="MCT location map"
                className="h-[22rem] w-full"
                src={osmEmbedUrl(nouakchottMap)}
                loading="lazy"
              />
            </div>
            <div className="mt-4">
              <a
                href={osmLinkUrl(nouakchottMap)}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-[#10233a] underline underline-offset-4 hover:text-[#b68d49]"
              >
                Open in OpenStreetMap
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
