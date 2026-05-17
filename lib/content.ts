export const locales = ["fr", "en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const site = {
  name: "MCT Holding",
  shortName: "MCT",
  legalName: "Mekadmini Cherif Trading",
  headerLegalLine: "MEKADMINI CHERIF TRADING",
} as const;

export const localeMeta = {
  fr: { code: "fr", label: "FR", name: "Français", direction: "ltr", ogLocale: "fr_MR" },
  en: { code: "en", label: "EN", name: "English", direction: "ltr", ogLocale: "en_US" },
  ar: { code: "ar", label: "AR", name: "العربية", direction: "rtl", ogLocale: "ar_MR" },
} as const;

export type LocaleMeta = (typeof localeMeta)[Locale];

export type CountryCode = "MR" | "SN";

const brandCatalog = [
  {
    slug: "parfois",
    name: "Parfois",
    year: "2017",
    image: "/images/parfois.jpg",
    logo: "/images/logos/parfois.jpg",
    countries: ["MR", "SN"] as const,
  },
  {
    slug: "celio",
    name: "Celio",
    year: "2019",
    image: "/images/celio.jpg",
    logo: "/images/logos/celio.png",
    countries: ["MR"] as const,
  },
  {
    slug: "zippy",
    name: "Zippy",
    year: "2021",
    image: "/images/zippy.jpg",
    logo: "/images/logos/zippy.png",
    countries: ["MR"] as const,
  },
  {
    slug: "beauty-success",
    name: "Beauty Success",
    year: "2023",
    image: "/images/beauty-success.jpg",
    logo: "/images/logos/beauty-success.png",
    countries: ["MR"] as const,
  },
] as const;

export type BrandSlug = (typeof brandCatalog)[number]["slug"];

export type Brand = {
  slug: BrandSlug;
  name: string;
  year: string;
  image: string;
  logo: string;
  imageAlt: string;
  countries: readonly CountryCode[];
  body: ReadonlyArray<string>;
};

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  imageClassName?: string;
};

export type LocalizedContent = {
  locale: Locale;
  meta: LocaleMeta;
  nav: ReadonlyArray<{ href: string; label: string }>;
  heroHighlights: ReadonlyArray<{ value: string; suffix: string; label: string; detail: string }>;
  heroCountries: ReadonlyArray<{ code: CountryCode; name: string; flag: string }>;
  hero: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    regionLabel: string;
    representedBrands: string;
    exploreBrands: string;
    contactUs: string;
    presenceLabel: string;
    flagshipLabel: string;
    sinceLabel: string;
    franchiseLabel: string;
    missionTitle: string;
    missionEyebrow: string;
    missionBody: string;
    missionCta: string;
    primaryCountryDetail: string;
    secondaryCountryDetail: string;
  };
  home: {
    introParagraphs: ReadonlyArray<string>;
    historyEyebrow: string;
    historyTitle: string;
    heritageTitle: string;
    heritageSubtitle: string;
    heritageParagraphs: ReadonlyArray<string>;
    visionEyebrow: string;
    visionTitle: string;
    visionLabel: string;
    missionLabel: string;
    objectivesLabel: string;
    vision: string;
    mission: string;
    objectives: ReadonlyArray<string>;
    brandsEyebrow: string;
    brandsTitle: string;
    brandsDescription: string;
    brandPartnerLabel: string;
    teamEyebrow: string;
    teamTitle: string;
    contactEyebrow: string;
    contactTitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
  };
  footer: {
    contactHeading: string;
    rights: string;
  };
  aria: {
    menu: string;
    showBrand: string;
    switchLanguage: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: ReadonlyArray<string>;
    ogDescription: string;
    twitterDescription: string;
    organizationDescription: string;
  };
  contact: {
    addressLines: ReadonlyArray<string>;
    phones: ReadonlyArray<string>;
    emails: ReadonlyArray<string>;
    hours: string;
  };
  team: ReadonlyArray<TeamMember>;
  brands: ReadonlyArray<Brand>;
};

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getBrandSlugs(): BrandSlug[] {
  return brandCatalog.map((brand) => brand.slug);
}

export function isBrandSlug(value: string): value is BrandSlug {
  return brandCatalog.some((brand) => brand.slug === value);
}

function getCountryName(locale: Locale, code: CountryCode) {
  const names = {
    MR: {
      fr: "Mauritanie",
      en: "Mauritania",
      ar: "موريتانيا",
    },
    SN: {
      fr: "Sénégal",
      en: "Senegal",
      ar: "السنغال",
    },
  } as const;

  return names[code][locale];
}

const sharedContact = {
  addressLines: ["Avenue Moktar Ould Daddah", "Nouakchott, Mauritanie"],
  phones: ["+222 36 33 69 19", "+222 36 14 46 14"],
  emails: ["contact@mct-holding.com", "cherif.med.lotfi@hotmail.com", "mouna.ghedamsi@gmail.com"],
} as const;

const sharedTeam = [
  { name: "Chakib Mekadmini", image: "/images/team-chekib.jpeg", imageClassName: "object-[center_22%]" },
  { name: "Lotfi Cherif", image: "/images/team-lotfi.jpeg", imageClassName: "object-center" },
  { name: "Mouna Ghedamsi", image: "/images/team-mouna.png" },
  { name: "Ayam Ouasli", image: "/images/team-ayam.jpeg" },
] as const;

const localizedContent = {
  fr: {
    nav: [
      { href: "#accueil", label: "Accueil" },
      { href: "#qui-sommes-nous", label: "Qui sommes-nous" },
      { href: "#vision", label: "Vision & mission" },
      { href: "#enseignes", label: "Partenaires retail" },
      { href: "/contact", label: "Contact" },
    ],
    heroHighlights: [
      { value: "2", suffix: "", label: "PAYS", detail: "Mauritanie, Sénégal" },
      { value: "32", suffix: "+", label: "ANNÉES", detail: "De présence" },
      { value: "50", suffix: "+", label: "COLLABORATEURS", detail: "Passionnés" },
      { value: "4", suffix: "", label: "MARQUES", detail: "Internationales" },
    ],
    hero: {
      badge: "Partenaires retail · Mauritanie & Sénégal",
      titleLead: "Partenaire retail",
      titleAccent: "Afrique de l’Ouest",
      description:
        "Un groupe qui développe et opère des franchises internationales de prêt-à-porter en Mauritanie et au Sénégal.",
      regionLabel: "Retail en Afrique de l'Ouest",
      representedBrands: "Marques représentées",
      exploreBrands: "Découvrir le groupe",
      contactUs: "Nos franchises",
      presenceLabel: "Présence",
      flagshipLabel: "Enseigne phare",
      sinceLabel: "Depuis",
      franchiseLabel: "Franchise",
      missionTitle: "Retail, marques et développement régional.",
      missionEyebrow: "Notre mission",
      missionBody:
        "Offrir le meilleur de la mode internationale en créant de la valeur durable pour nos partenaires, nos équipes et nos communautés.",
      missionCta: "En savoir plus",
      primaryCountryDetail: "Opérations phares",
      secondaryCountryDetail: "Déploiement régional",
    },
    home: {
      introParagraphs: [
        "M.C.T est une société fondée en 2017 en Mauritanie par deux associés, chacun avec sa propre expertise. Nous avons débuté en ouvrant une parfumerie de luxe, **Parfumerie Fashion**, où l’on trouve les grandes marques. La même année, nous avons acquis la franchise **Parfois**, suivie de **Celio** en 2019.",
        "En 2021, nous avons lancé **Zippy**, spécialisée dans les produits destinés aux nourrissons, bébés et enfants de 0 à 14 ans. En 2023, nous avons inauguré le premier institut de beauté en Mauritanie avec la franchise **Beauty Success** (parfumerie & institut). Nous sommes également au **Sénégal** avec **Parfois**.",
        "Avec une équipe d’environ 50 collaborateurs, nous poursuivons notre croissance en tant que pionniers dans l’acquisition de franchises internationales et développons continuellement notre gamme de choix.",
      ],
      historyEyebrow: "Notre histoire",
      historyTitle: "Une trajectoire de croissance",
      heritageTitle: "Qui sommes-nous ?",
      heritageSubtitle: "Acteur clé du commerce en Mauritanie",
      heritageParagraphs: [
        "Présents en Mauritanie depuis plus de 32 ans, notre groupe est un acteur clé du commerce général, spécialisé dans le développement de franchises internationales reconnues.",
        "Nous nous engageons à offrir aux Mauritaniens des produits authentiques et de qualité, accessibles localement, tout en proposant une alternative fiable aux articles de bas de gamme et contrefaits.",
        "À travers des espaces de vente modernes et une expérience client soignée, nous contribuons à la modernisation et au dynamisme du marché mauritanien.",
      ],
      visionEyebrow: "Vision & mission",
      visionTitle: "Vision & mission",
      visionLabel: "Vision",
      missionLabel: "Mission",
      objectivesLabel: "Objectifs",
      vision:
        "Être le leader du marché mauritanien en acquérant des franchises d’enseignes internationales renommées, offrant des produits de qualité et une expérience d’achat exceptionnelle.",
      mission:
        "Fournir aux Mauritaniens un accès facile à des produits de qualité issus de marques internationalement reconnues, adaptés à leurs préférences et à leurs besoins.",
      objectives: [
        "Enrichir le marché en introduisant de nouvelles franchises internationales renommées.",
        "Offrir des produits conformes aux normes internationales et aux attentes des consommateurs mauritaniens.",
        "Améliorer l’expérience client grâce à des espaces de vente de qualité et un service haut de gamme.",
        "Élargir notre sélection de marques et de produits, et favoriser la croissance par des stratégies efficaces, l’innovation et l’adaptation aux tendances du marché.",
      ],
      brandsEyebrow: "Partenaires retail",
      brandsTitle: "Des marques internationales, une exigence locale",
      brandsDescription:
        "Parfumerie Fashion, franchises retail et beauté : nous sélectionnons des enseignes reconnues pour enrichir l’offre disponible en Mauritanie et dans la sous-région.",
      brandPartnerLabel: "Partenaire retail",
      teamEyebrow: "Notre équipe",
      teamTitle: "Direction et expertise",
      contactEyebrow: "Nous contacter",
      contactTitle: "Visites & partenariats",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      emailLabel: "E-mail",
      hoursLabel: "Heures de bureau",
    },
    footer: {
      contactHeading: "Coordonnées",
      rights: "Tous droits réservés.",
    },
    aria: {
      menu: "Menu",
      showBrand: "Afficher",
      switchLanguage: "Changer de langue",
    },
    seo: {
      title: "MCT Holding — Mekadmini Cherif Trading",
      description:
        "MCT Holding, groupe Mekadmini Cherif Trading — distributeur de franchises internationales en Mauritanie et au Sénégal : Parfois, Celio, Zippy, Beauty Success.",
      keywords: [
        "MCT",
        "MCT Holding",
        "Mekadmini Cherif Trading",
        "franchises Mauritanie",
        "retail Nouakchott",
        "Parfois Mauritanie",
        "Celio Mauritanie",
        "Zippy Mauritanie",
        "Beauty Success Mauritanie",
      ],
      ogDescription: "Commerce de détail et franchises internationales à Nouakchott et dans la région.",
      twitterDescription:
        "Distributeur de franchises internationales en Mauritanie et au Sénégal : mode, beauté et retail premium.",
      organizationDescription:
        "Distributeur de franchises internationales en Mauritanie et au Sénégal dans les secteurs mode, beauté et retail.",
    },
    contact: {
      ...sharedContact,
      hours: "Lundi – Vendredi · 09h30 – 20h00",
    },
    teamRoles: [
      "Directeur général",
      "Directeur commercial",
      "Gérante",
      "Responsable communication",
    ],
    brandCopy: {
      parfois: {
        imageAlt: "Parfumerie et accessoires Parfois",
        body: [
          "En mai 2017, M.C.T a acquis la franchise Parfois en Mauritanie. Depuis, le groupe met l’accent sur une gestion optimisée des approvisionnements afin de garantir une disponibilité constante des produits et une expérience d’achat fluide et qualitative.",
          "Dans le cadre de son développement régional, M.C.T est également présent au Sénégal avec l’enseigne Parfois, à Dakar et à Saly, où trois magasins sont exploités depuis 2023.",
        ],
      },
      celio: {
        imageAlt: "Mode masculine Celio",
        body: [
          "En 2019, M.C.T a acquis la franchise Celio, marquant une étape importante dans le développement du groupe et consolidant sa position dans le secteur du retail en Mauritanie.",
          "Cette collaboration a permis d’élargir l’offre proposée, d’attirer une nouvelle clientèle et de renforcer la fidélisation des clients existants. Le magasin a enregistré une forte croissance de sa fréquentation, avec un nombre de visiteurs multiplié par trois par rapport à l’année précédente.",
          "L’objectif est de positionner Celio comme une référence incontournable de la mode masculine en Mauritanie, grâce à une stratégie marketing ciblée et au renforcement de la visibilité de la marque.",
        ],
      },
      zippy: {
        imageAlt: "Univers bébé et enfant Zippy",
        body: [
          "En 2021, M.C.T a acquis la franchise Zippy, enseigne spécialisée dans les produits destinés aux nourrissons, bébés et enfants de 0 à 14 ans.",
          "Cette implantation répond aux besoins des familles en proposant des produits alliant qualité, sécurité et confort pour les enfants, de la naissance à la préadolescence.",
          "L’ambition du groupe est de devenir le leader de ce segment en Mauritanie, en offrant une expérience d’achat premium aux parents, portée par un service personnalisé et des collections régulièrement renouvelées.",
        ],
      },
      "beauty-success": {
        imageAlt: "Beauty Success — cosmétiques et institut",
        body: [
          "En mars 2023, M.C.T a lancé Beauty Success, devenant ainsi le premier acteur du marché mauritanien à proposer un concept réunissant parfumerie, cosmétiques et institut de beauté sous une franchise internationale reconnue.",
          "L’enseigne propose une sélection exclusive de parfums, produits de beauté, maquillage, soins et accessoires, ainsi qu’un institut spécialisé offrant des prestations professionnelles.",
          "L’objectif est de faire de Beauty Success une référence incontournable du secteur de la beauté en Mauritanie, à travers des produits et des services répondant aux plus hauts standards de qualité.",
        ],
      },
    },
  },
  en: {
    nav: [
      { href: "#accueil", label: "Home" },
      { href: "#qui-sommes-nous", label: "About us" },
      { href: "#vision", label: "Vision & mission" },
      { href: "#enseignes", label: "Retail partners" },
      { href: "/contact", label: "Contact" },
    ],
    heroHighlights: [
      { value: "2", suffix: "", label: "COUNTRIES", detail: "Mauritania, Senegal" },
      { value: "32", suffix: "+", label: "YEARS", detail: "Of presence" },
      { value: "50", suffix: "+", label: "COLLABORATORS", detail: "Committed" },
      { value: "4", suffix: "", label: "BRANDS", detail: "International" },
    ],
    hero: {
      badge: "Retail partners · Mauritania & Senegal",
      titleLead: "Retail partner",
      titleAccent: "across West Africa",
      description:
        "A group that develops and operates international ready-to-wear franchises in Mauritania and Senegal.",
      regionLabel: "West Africa Retail",
      representedBrands: "Represented brands",
      exploreBrands: "Discover the group",
      contactUs: "Our franchises",
      presenceLabel: "Presence",
      flagshipLabel: "Featured brand",
      sinceLabel: "Since",
      franchiseLabel: "Franchise",
      missionTitle: "Retail, brands, and regional growth.",
      missionEyebrow: "Our mission",
      missionBody:
        "Deliver the best of international fashion while creating durable value for our partners, teams, and communities.",
      missionCta: "Learn more",
      primaryCountryDetail: "Flagship operations",
      secondaryCountryDetail: "Regional expansion",
    },
    home: {
      introParagraphs: [
        "M.C.T is a limited liability company founded in Mauritania in 2017 by two partners, each bringing distinct expertise. We began by opening a luxury perfume store, **Parfumerie Fashion**, offering leading international brands. In the same year, we secured the **Parfois** franchise, followed by **Celio** in 2019.",
        "In 2021, we launched **Zippy**, specializing in products for babies and infants. In 2023, we opened Mauritania’s first beauty institute through the **Beauty Success** franchise (perfumery & institute). We are also present in **Senegal** with **Parfois**.",
        "With a team of around 50 employees, we continue to grow as pioneers in acquiring international franchises and steadily expanding our portfolio.",
      ],
      historyEyebrow: "Our story",
      historyTitle: "A growth trajectory",
      heritageTitle: "Who are we?",
      heritageSubtitle: "A key player in commerce in Mauritania",
      heritageParagraphs: [
        "With more than 32 years of presence in Mauritania, our group is a key player in general trade, specializing in the development of recognized international franchises.",
        "We are committed to giving Mauritanian consumers local access to authentic, high-quality products while offering a reliable alternative to low-end and counterfeit goods.",
        "Through modern retail spaces and a carefully designed customer experience, we contribute to the modernization and momentum of the Mauritanian market.",
      ],
      visionEyebrow: "Vision & mission",
      visionTitle: "Vision & mission",
      visionLabel: "Vision",
      missionLabel: "Mission",
      objectivesLabel: "Objectives",
      vision:
        "To become the leader of the Mauritanian market by acquiring renowned international franchises and delivering quality products with an outstanding shopping experience.",
      mission:
        "To give Mauritanian consumers easy access to quality products from internationally recognized brands, tailored to their preferences and needs.",
      objectives: [
        "Enrich the market by introducing new renowned international franchises.",
        "Provide products that meet international standards and the expectations of Mauritanian consumers.",
        "Enhance the customer experience through quality retail spaces and premium service.",
        "Expand our brand and product portfolio while driving growth through effective strategies, innovation, and adaptation to market trends.",
      ],
      brandsEyebrow: "Retail partners",
      brandsTitle: "International brands, local standards",
      brandsDescription:
        "Parfumerie Fashion, retail and beauty franchises: we select recognized brands to enrich the offer available in Mauritania and across the sub-region.",
      brandPartnerLabel: "Retail partner",
      teamEyebrow: "Our team",
      teamTitle: "Leadership and expertise",
      contactEyebrow: "Contact us",
      contactTitle: "Visits & partnerships",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      hoursLabel: "Business hours",
    },
    footer: {
      contactHeading: "Contact details",
      rights: "All rights reserved.",
    },
    aria: {
      menu: "Menu",
      showBrand: "Show",
      switchLanguage: "Switch language",
    },
    seo: {
      title: "MCT Holding — Mekadmini Cherif Trading",
      description:
        "MCT Holding, the Mekadmini Cherif Trading group — distributor of international franchises in Mauritania and Senegal: Parfois, Celio, Zippy, Beauty Success.",
      keywords: [
        "MCT",
        "MCT Holding",
        "Mekadmini Cherif Trading",
        "franchises in Mauritania",
        "retail Nouakchott",
        "Parfois Mauritania",
        "Celio Mauritania",
        "Zippy Mauritania",
        "Beauty Success Mauritania",
      ],
      ogDescription: "Retail and international franchises in Nouakchott and across the region.",
      twitterDescription:
        "Distributor of international franchises in Mauritania and Senegal: fashion, beauty, and premium retail.",
      organizationDescription:
        "Distributor of international franchises in Mauritania and Senegal across fashion, beauty, and retail.",
    },
    contact: {
      ...sharedContact,
      hours: "Monday – Friday · 09:30 – 20:00",
    },
    teamRoles: [
      "Chief Executive Officer",
      "Commercial Director",
      "Manager",
      "Communications Manager",
    ],
    brandCopy: {
      parfois: {
        imageAlt: "Parfois perfumes and accessories",
        body: [
          "In May 2017, M.C.T acquired the Parfois franchise in Mauritania. Since then, the group has focused on optimized replenishment management to ensure product availability and a smooth, high-quality shopping experience.",
          "As part of its regional development, M.C.T is also present in Senegal with Parfois in Dakar and Saly, where three stores have been operating since 2023.",
        ],
      },
      celio: {
        imageAlt: "Celio menswear",
        body: [
          "In 2019, M.C.T acquired the Celio franchise, marking an important step in the group’s development and strengthening its position in Mauritania’s retail sector.",
          "This partnership broadened the offering, attracted new customers, and reinforced loyalty among existing ones. Store traffic rose sharply, with the number of visitors tripling compared with the previous year.",
          "The objective is to position Celio as a leading reference in men’s fashion in Mauritania through a targeted marketing strategy and stronger brand visibility.",
        ],
      },
      zippy: {
        imageAlt: "Zippy baby and children universe",
        body: [
          "In 2021, M.C.T acquired the Zippy franchise, a brand specializing in products for newborns, babies, and children aged 0 to 14.",
          "This launch addresses family needs by offering products that combine quality, safety, and comfort for children from birth to pre-adolescence.",
          "The group’s ambition is to become the leader in this segment in Mauritania by delivering a premium shopping experience for parents through personalized service and frequently renewed collections.",
        ],
      },
      "beauty-success": {
        imageAlt: "Beauty Success cosmetics and beauty institute",
        body: [
          "In March 2023, M.C.T launched Beauty Success, becoming the first player in the Mauritanian market to offer a concept combining perfumery, cosmetics, and a beauty institute under a recognized international franchise.",
          "The brand offers an exclusive selection of perfumes, beauty products, makeup, skincare, and accessories, along with a specialized institute delivering professional treatments.",
          "The objective is to establish Beauty Success as a leading benchmark in Mauritania’s beauty sector through products and services that meet the highest quality standards.",
        ],
      },
    },
  },
  ar: {
    nav: [
      { href: "#accueil", label: "الرئيسية" },
      { href: "#qui-sommes-nous", label: "من نحن" },
      { href: "#vision", label: "الرؤية والرسالة" },
      { href: "#enseignes", label: "شركاء التجزئة" },
      { href: "/contact", label: "اتصل بنا" },
    ],
    heroHighlights: [
      { value: "2", suffix: "", label: "بلدان", detail: "موريتانيا، السنغال" },
      { value: "32", suffix: "+", label: "سنوات", detail: "من الحضور" },
      { value: "50", suffix: "+", label: "متعاونون", detail: "شغوفون" },
      { value: "4", suffix: "", label: "علامات", detail: "دولية" },
    ],
    hero: {
      badge: "شركاء التجزئة · موريتانيا والسنغال",
      titleLead: "الريادة في تجارة الأزياء",
      titleAccent: "في غرب أفريقيا",
      description:
        "مجموعة تطور وتدير امتيازات دولية للملابس الجاهزة في موريتانيا والسنغال.",
      regionLabel: "تجزئة غرب أفريقيا",
      representedBrands: "العلامات الممثلة",
      exploreBrands: "اكتشف المجموعة",
      contactUs: "امتيازاتنا",
      presenceLabel: "التواجد",
      flagshipLabel: "العلامة الأبرز",
      sinceLabel: "منذ",
      franchiseLabel: "امتياز",
      missionTitle: "التجزئة والعلامات والتوسع الإقليمي.",
      missionEyebrow: "مهمتنا",
      missionBody:
        "تقديم أفضل ما في الموضة العالمية مع خلق قيمة مستدامة لشركائنا وفرقنا ومجتمعاتنا.",
      missionCta: "اعرف المزيد",
      primaryCountryDetail: "العمليات الرئيسية",
      secondaryCountryDetail: "التوسع الإقليمي",
    },
    home: {
      introParagraphs: [
        "M.C.T هي شركة ذات مسؤولية محدودة تأسست في موريتانيا سنة 2017 على يد شريكين يتمتع كل واحد منهما بخبرة خاصة. بدأنا بافتتاح متجر عطور فاخر **Parfumerie Fashion** يضم كبرى العلامات العالمية. وفي السنة نفسها حصلنا على امتياز **Parfois** ثم **Celio** سنة 2019.",
        "وفي سنة 2021 أطلقنا **Zippy** المتخصصة في منتجات الرضع والأطفال. وفي سنة 2023 افتتحنا أول معهد تجميل في موريتانيا عبر امتياز **Beauty Success** (عطور ومعهد). ونحن حاضرون أيضًا في **السنغال** عبر **Parfois**.",
        "وبفريق يضم نحو 50 موظفًا، نواصل نمونا بصفتنا من الرواد في استقطاب الامتيازات الدولية، ونوسع باستمرار محفظة العلامات التي نمثلها.",
      ],
      historyEyebrow: "قصتنا",
      historyTitle: "مسار من النمو",
      heritageTitle: "من نحن؟",
      heritageSubtitle: "فاعل رئيسي في التجارة في موريتانيا",
      heritageParagraphs: [
        "مع حضور يمتد لأكثر من 32 سنة في موريتانيا، تُعد مجموعتنا فاعلًا رئيسيًا في التجارة العامة، ومتخصصة في تطوير امتيازات دولية معروفة.",
        "نلتزم بتوفير منتجات أصلية وعالية الجودة للمستهلك الموريتاني محليًا، مع تقديم بديل موثوق للسلع منخفضة الجودة والمقلدة.",
        "ومن خلال فضاءات بيع عصرية وتجربة عميل مدروسة، نساهم في تحديث السوق الموريتاني وتعزيز حيويته.",
      ],
      visionEyebrow: "الرؤية والرسالة",
      visionTitle: "الرؤية والرسالة",
      visionLabel: "الرؤية",
      missionLabel: "الرسالة",
      objectivesLabel: "الأهداف",
      vision:
        "أن نصبح رواد السوق الموريتاني من خلال اقتناء امتيازات لعلامات دولية مرموقة وتقديم منتجات عالية الجودة وتجربة شراء استثنائية.",
      mission:
        "إتاحة وصول سهل للمستهلكين في موريتانيا إلى منتجات عالية الجودة من علامات معترف بها عالميًا بما يلائم تفضيلاتهم واحتياجاتهم.",
      objectives: [
        "إغناء السوق بإدخال امتيازات دولية مرموقة جديدة.",
        "توفير منتجات مطابقة للمعايير الدولية ولتوقعات المستهلك الموريتاني.",
        "تحسين تجربة العميل عبر مساحات بيع ذات جودة وخدمة راقية.",
        "توسيع محفظة العلامات والمنتجات ودعم النمو من خلال استراتيجيات فعالة والابتكار والتكيف مع اتجاهات السوق.",
      ],
      brandsEyebrow: "شركاء التجزئة",
      brandsTitle: "علامات دولية بمعايير محلية عالية",
      brandsDescription:
        "Parfumerie Fashion وامتيازات التجزئة والجمال: نختار علامات معروفة لإثراء العرض المتاح في موريتانيا وعلى مستوى المنطقة الفرعية.",
      brandPartnerLabel: "شريك تجزئة",
      teamEyebrow: "فريقنا",
      teamTitle: "القيادة والخبرة",
      contactEyebrow: "اتصل بنا",
      contactTitle: "الزيارات والشراكات",
      addressLabel: "العنوان",
      phoneLabel: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      hoursLabel: "ساعات العمل",
    },
    footer: {
      contactHeading: "بيانات الاتصال",
      rights: "جميع الحقوق محفوظة.",
    },
    aria: {
      menu: "القائمة",
      showBrand: "عرض",
      switchLanguage: "تغيير اللغة",
    },
    seo: {
      title: "MCT Holding — Mekadmini Cherif Trading",
      description:
        "MCT Holding، مجموعة Mekadmini Cherif Trading — موزع لامتيازات دولية في موريتانيا والسنغال: Parfois وCelio وZippy وBeauty Success.",
      keywords: [
        "MCT",
        "MCT Holding",
        "Mekadmini Cherif Trading",
        "امتيازات في موريتانيا",
        "التجزئة نواكشوط",
        "Parfois موريتانيا",
        "Celio موريتانيا",
        "Zippy موريتانيا",
        "Beauty Success موريتانيا",
      ],
      ogDescription: "التجزئة والامتيازات الدولية في نواكشوط وعلى مستوى المنطقة.",
      twitterDescription:
        "موزع لامتيازات دولية في موريتانيا والسنغال في مجالات الموضة والجمال والتجزئة الراقية.",
      organizationDescription:
        "موزع لامتيازات دولية في موريتانيا والسنغال في قطاعات الموضة والجمال والتجزئة.",
    },
    contact: {
      ...sharedContact,
      hours: "الاثنين – الجمعة · 09:30 – 20:00",
    },
    teamRoles: [
      "المدير العام",
      "المدير التجاري",
      "المديرة",
      "مسؤولة الاتصال",
    ],
    brandCopy: {
      parfois: {
        imageAlt: "عطور وإكسسوارات Parfois",
        body: [
          "في مايو 2017 حصلت M.C.T على امتياز Parfois في موريتانيا. ومنذ ذلك الحين ركزت المجموعة على تحسين إدارة التوريد لضمان توفر المنتجات باستمرار وتقديم تجربة شراء سلسة وعالية الجودة.",
          "وفي إطار توسعها الإقليمي، تتواجد M.C.T أيضًا في السنغال عبر Parfois في داكار وسالي، حيث يتم تشغيل ثلاثة متاجر منذ سنة 2023.",
        ],
      },
      celio: {
        imageAlt: "أزياء رجالية من Celio",
        body: [
          "في سنة 2019 حصلت M.C.T على امتياز Celio، وهو ما شكل محطة مهمة في تطور المجموعة وعزز موقعها في قطاع التجزئة في موريتانيا.",
          "وقد ساهم هذا التعاون في توسيع العرض، واستقطاب عملاء جدد، وتعزيز ولاء العملاء الحاليين. كما عرف المتجر نموًا قويًا في الإقبال، حيث تضاعف عدد الزوار ثلاث مرات مقارنة بالسنة السابقة.",
          "ويتمثل الهدف في ترسيخ Celio كمرجع أساسي في الأزياء الرجالية في موريتانيا من خلال استراتيجية تسويق موجهة وتعزيز حضور العلامة.",
        ],
      },
      zippy: {
        imageAlt: "عالم Zippy للرضع والأطفال",
        body: [
          "في سنة 2021 حصلت M.C.T على امتياز Zippy، وهي علامة متخصصة في منتجات المواليد والرضع والأطفال من 0 إلى 14 سنة.",
          "ويستجيب هذا التواجد لاحتياجات الأسر من خلال تقديم منتجات تجمع بين الجودة والسلامة والراحة للأطفال من الولادة إلى ما قبل المراهقة.",
          "وتطمح المجموعة إلى أن تصبح الرائد في هذا القطاع في موريتانيا عبر توفير تجربة شراء متميزة للآباء والأمهات، مدعومة بخدمة شخصية وتشكيلات تتجدد باستمرار.",
        ],
      },
      "beauty-success": {
        imageAlt: "Beauty Success لمستحضرات التجميل ومعهد التجميل",
        body: [
          "في مارس 2023 أطلقت M.C.T علامة Beauty Success، لتصبح أول فاعل في السوق الموريتاني يقدم مفهومًا يجمع بين العطور ومستحضرات التجميل ومعهد التجميل ضمن امتياز دولي معروف.",
          "وتوفر العلامة تشكيلة حصرية من العطور ومنتجات الجمال والمكياج والعناية والإكسسوارات، إضافة إلى معهد متخصص يقدم خدمات احترافية.",
          "ويتمثل الهدف في جعل Beauty Success مرجعًا أساسيًا في قطاع الجمال في موريتانيا من خلال منتجات وخدمات تستجيب لأعلى معايير الجودة.",
        ],
      },
    },
  },
} as const;

export function getLocalizedContent(locale: Locale): LocalizedContent {
  const content = localizedContent[locale];

  return {
    locale,
    meta: localeMeta[locale],
    nav: content.nav,
    heroHighlights: content.heroHighlights,
    heroCountries: [
      { code: "MR", name: getCountryName(locale, "MR"), flag: "🇲🇷" },
      { code: "SN", name: getCountryName(locale, "SN"), flag: "🇸🇳" },
    ],
    hero: content.hero,
    home: content.home,
    footer: content.footer,
    aria: content.aria,
    seo: content.seo,
    contact: content.contact,
    team: sharedTeam.map((member, index) => ({
      ...member,
      role: content.teamRoles[index] ?? "",
    })),
    brands: brandCatalog.map((brand) => ({
      ...brand,
      imageAlt: content.brandCopy[brand.slug].imageAlt,
      body: content.brandCopy[brand.slug].body,
    })),
  };
}
