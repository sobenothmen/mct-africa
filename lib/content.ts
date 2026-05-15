export const site = {
  /** Marque affichée publiquement */
  name: "MCT Holding",
  /** Sigle court utilisé pour l'icône et les variantes courtes */
  shortName: "MCT",
  /** Raison sociale / dénomination légale */
  legalName: "Mekadmini Cherif Trading",
  /** Ligne sous le logo (affichée en capitales sur le site) */
  headerLegalLine: "MEKADMINI CHERIF TRADING",
  locale: "fr-MR",
} as const;

export const nav = [
  { href: "#accueil", label: "Accueil" },
  { href: "#qui-sommes-nous", label: "Qui sommes-nous" },
  { href: "#vision", label: "Vision & mission" },
  { href: "#enseignes", label: "Enseignes" },
  { href: "#equipe", label: "Équipe" },
  { href: "#contact", label: "Contact" },
] as const;

export const introParagraphs = [
  "M.C.T est une société SARL fondée en 2017 en Mauritanie par deux associés, chacun avec sa propre expertise. Nous avons débuté en ouvrant une parfumerie de luxe, **Parfumerie Fashion**, où l’on trouve les grandes marques. La même année, nous avons acquis la franchise **Parfois**, suivie de **Celio** en 2019.",
  "En 2021, nous avons lancé **Zippy**, spécialisée dans les produits pour bébés et nourrissons. En 2023, nous avons inauguré le premier institut de beauté en Mauritanie avec la franchise **Beauty Success** (parfumerie & institut). Nous avons signé avec le groupe espagnol **Tendam** pour l’enseigne **Women’Secret** (2026). Nous sommes également au **Sénégal** avec **Parfois**.",
  "Avec une équipe d’environ 50 collaborateurs, nous poursuivons notre croissance en tant que pionniers dans l’acquisition de franchises internationales et développons continuellement notre gamme de choix.",
];

export const heritage = {
  title: "Qui sommes-nous ?",
  paragraphs: [
    "Présents en Mauritanie depuis plus de 32 ans, notre groupe est un acteur clé du commerce général, spécialisé dans le développement de franchises internationales reconnues.",
    "Nous nous engageons à offrir aux Mauritaniens des produits authentiques et de qualité, accessibles localement, tout en proposant une alternative fiable aux articles de bas de gamme et contrefaits.",
    "À travers des espaces de vente modernes et une expérience client soignée, nous contribuons à la modernisation et au dynamisme du marché mauritanien.",
  ],
};

export const visionMission = {
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
};

export type Brand = {
  slug: string;
  name: string;
  year: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const brands: Brand[] = [
  {
    slug: "parfois",
    name: "Parfois",
    year: "2017",
    image: "/images/parfois.jpg",
    imageAlt: "Parfumerie et accessoires Parfois",
    body: [
      "En mai 2017, nous avons acquis la franchise Parfois en Mauritanie. Nous concentrons nos efforts sur la fréquence de réapprovisionnement et la réduction des ruptures de stock, pour une expérience d’achat optimale et une disponibilité constante des articles.",
      "Nous sommes également au Sénégal avec l’enseigne Parfois, à Dakar et à Saly, avec trois magasins depuis 2023.",
    ],
  },
  {
    slug: "celio",
    name: "Celio",
    year: "2019",
    image: "/images/celio.jpg",
    imageAlt: "Mode masculine Celio",
    body: [
      "En 2019, nous avons acquis la franchise Celio : une étape majeure, un succès sur les plans financier et commercial.",
      "Nous avons élargi notre offre, attiré de nouveaux clients et fidélisé notre base. Notre magasin a connu une forte augmentation de fréquentation, avec un triplement du nombre de clients par rapport à l’année précédente.",
      "Objectif : positionner Celio comme une référence incontournable de la mode masculine, avec des actions marketing ciblées pour la visibilité et la réputation de la marque.",
    ],
  },
  {
    slug: "zippy",
    name: "Zippy",
    year: "2021",
    image: "/images/zippy.jpg",
    imageAlt: "Univers bébé et enfant Zippy",
    body: [
      "En 2021, acquisition de la franchise Zippy, spécialisée dans les produits pour bébés et nourrissons, pour répondre aux besoins des parents et des enfants de la naissance à la préadolescence.",
      "Notre ambition : être le leader de ce segment avec des produits de haute qualité, la sécurité et le confort des enfants, et une expérience d’achat exceptionnelle pour les parents — service personnalisé et stocks constamment renouvelés.",
    ],
  },
  {
    slug: "beauty-success",
    name: "Beauty Success",
    year: "2023",
    image: "/images/beauty-success.jpg",
    imageAlt: "Beauty Success — cosmétiques et institut",
    body: [
      "En mars 2023, lancement de Beauty Success : premier acteur sur le marché mauritanien à proposer une gamme exclusive de produits et services de beauté — cosmétiques, parfums, maquillage, soins, accessoires, et institut de beauté spécialisé.",
      "Objectif : être le leader du secteur beauté en Mauritanie, avec des produits et services de haute qualité adaptés aux attentes de nos clients.",
    ],
  },
  {
    slug: "women-secret",
    name: "Women’Secret",
    year: "2026",
    image: "/images/women-secret.png",
    imageAlt: "Women’Secret — lingerie et mode féminine",
    body: [
      "Partenariat avec le groupe espagnol Tendam pour l’enseigne Women’Secret, avec l’ouverture du premier magasin à Nouakchott.",
      "Faire de cette enseigne une référence incontournable du secteur féminin à Nouakchott, en étant les premiers à proposer ce concept.",
    ],
  },
];

export const team = [
  {
    name: "Chekib Mekadmini",
    role: "Directeur général",
    image: "/images/team-1.jpg",
  },
  {
    name: "Lotfi Cherif",
    role: "Directeur commercial",
    image: "/images/team-2.jpg",
  },
  {
    name: "Mouna Ghedamsi",
    role: "Gérante",
    image: "/images/team-4.jpg",
  },
  {
    name: "Ayam Ouasli",
    role: "Responsable communication",
    image: "/images/team-3.png",
  },
] as const;

export const contact = {
  addressLines: ["Avenue Moktar Ould Daddah", "Nouakchott, Mauritanie"],
  phones: ["+222 36 33 69 19", "+222 36 14 46 14"],
  emails: ["cherif.med.lotfi@hotmail.com", "mouna.ghedamsi@gmail.com"],
  hours: "Lundi – Vendredi · 09h30 – 20h00",
};
