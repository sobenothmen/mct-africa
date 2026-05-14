import Image from "next/image";
import { getBrandTheme } from "@/lib/brand-themes";
import {
  brands,
  contact,
  heritage,
  introParagraphs,
  site,
  team,
  visionMission,
} from "@/lib/content";
import { RichParagraph } from "@/components/rich-text";
import { absoluteUrl } from "@/lib/seo";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    alternateName: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon"),
    description:
      "Distributeur de franchises internationales en Mauritanie et au Sénégal dans les secteurs mode, beauté et retail.",
    foundingDate: "2017",
    areaServed: ["MR", "SN"],
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLines[0],
      addressLocality: "Nouakchott",
      addressCountry: "MR",
    },
    contactPoint: [
      ...contact.phones.map((phone) => ({
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        areaServed: ["MR", "SN"],
        availableLanguage: ["fr"],
      })),
      ...contact.emails.map((email) => ({
        "@type": "ContactPoint",
        email,
        contactType: "customer service",
        areaServed: ["MR", "SN"],
        availableLanguage: ["fr"],
      })),
    ],
    knowsAbout: brands.map((brand) => brand.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
      <section
        id="accueil"
        className="relative flex min-h-[85vh] items-end overflow-hidden bg-zinc-900"
      >
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-200/90">
            Franchises internationales · Retail · Mauritanie et région
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block text-5xl font-semibold sm:text-6xl md:text-7xl">{site.name}</span>
            <span className="mt-3 block text-lg font-medium uppercase tracking-[0.12em] text-zinc-200 sm:text-xl md:text-2xl">
              {site.headerLegalLine}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
            {site.fullName} — développement d’enseignes premium, qualité produit et expérience client à la hauteur
            des marques que nous représentons.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#enseignes"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
            >
              Découvrir nos enseignes
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <section id="qui-sommes-nous" className="scroll-mt-20 border-b border-zinc-200/80 bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                Notre histoire
              </h2>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                Une trajectoire de croissance
              </p>
              <div className="mt-8 space-y-5">
                {introParagraphs.map((p, idx) => (
                  <RichParagraph key={idx} text={p} />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl ring-1 ring-zinc-200/60">
                <Image
                  src="/images/about-1.jpg"
                  alt="Univers retail MCT"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl ring-1 ring-zinc-200/60 sm:mt-12">
                <Image
                  src="/images/about-2.jpg"
                  alt="Espace boutique"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-200/60 lg:order-2">
              <Image
                src="/images/heritage.jpg"
                alt="Présence locale"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="lg:order-1">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                {heritage.title}
              </h2>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
                Acteur clé du commerce en Mauritanie
              </p>
              <div className="mt-8 space-y-5">
                {heritage.paragraphs.map((p, idx) => (
                  <p key={idx} className="leading-relaxed text-zinc-600">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="scroll-mt-20 bg-stone-100/80">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-200/60 lg:min-h-0">
              <Image
                src="/images/vision-mission.jpg"
                alt="Vision MCT"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                Vision & mission
              </h2>
              <div className="mt-8 space-y-10">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">Vision</h3>
                  <p className="mt-2 leading-relaxed text-zinc-600">{visionMission.vision}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">Mission</h3>
                  <p className="mt-2 leading-relaxed text-zinc-600">{visionMission.mission}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">Objectifs</h3>
                  <ul className="mt-4 list-disc space-y-3 pl-5 text-zinc-600 marker:text-blue-600">
                    {visionMission.objectives.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="enseignes" className="scroll-mt-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-800">
              Nos enseignes
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Des marques internationales, une exigence locale
            </p>
            <p className="mt-4 leading-relaxed text-zinc-600">
              Parfumerie Fashion, franchises retail et beauté : nous sélectionnons des enseignes reconnues pour
              enrichir l’offre disponible en Mauritanie et dans la sous-région.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-16">
            {brands.map((b, i) => {
              const t = getBrandTheme(b.slug);
              return (
                <article key={b.slug} className={`overflow-hidden rounded-2xl ${t.article}`}>
                  <div className={`h-1.5 w-full ${t.strip}`} aria-hidden />
                  <div
                    className={`grid gap-10 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-10 ${t.inner}`}
                  >
                    <div
                      className={`relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg ${t.imageWrap} ${i % 2 === 1 ? "lg:col-start-2 lg:row-start-1" : ""}`}
                    >
                      <Image
                        src={b.image}
                        alt={b.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div
                        className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs backdrop-blur-sm ${t.badge}`}
                      >
                        {b.year}
                      </div>
                    </div>
                    <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className={`h-2 w-2 shrink-0 rounded-full ${t.accentDot}`} aria-hidden />
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                          Partenaire retail
                        </span>
                      </div>
                      <h3 className={`text-2xl font-bold tracking-tight sm:text-3xl ${t.title}`}>{b.name}</h3>
                      <div className="mt-6 space-y-4">
                        {b.body.map((para, idx) => (
                          <p key={idx} className="leading-relaxed text-zinc-600">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="equipe" className="scroll-mt-20 border-y border-zinc-200/80 bg-stone-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-800">Notre équipe</h2>
          <p className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Direction et expertise
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-zinc-200/60 transition hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] bg-zinc-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <p className="font-semibold text-zinc-900">{member.name}</p>
                  <p className="mt-1 text-sm text-blue-900/90">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                Nous contacter
              </h2>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                Visites & partenariats
              </p>
              <dl className="mt-10 space-y-8">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Adresse</dt>
                  <dd className="mt-2 text-lg text-zinc-800">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Téléphone</dt>
                  <dd className="mt-2 flex flex-col gap-2">
                    {contact.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="text-lg font-medium text-blue-900 hover:text-blue-800"
                      >
                        {p}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">E-mail</dt>
                  <dd className="mt-2 flex flex-col gap-2">
                    {contact.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} className="text-zinc-800 underline-offset-4 hover:underline">
                        {e}
                      </a>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Heures de bureau
                  </dt>
                  <dd className="mt-2 text-lg text-zinc-800">{contact.hours}</dd>
                </div>
              </dl>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-200/60 lg:min-h-0">
              <Image
                src="/images/contact.jpeg"
                alt="MCT — contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
