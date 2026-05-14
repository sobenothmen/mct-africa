/**
 * Identité visuelle légère par enseigne (couleurs inspirées des univers de marque).
 * Classes Tailwind — garder les tokens complets pour le scan du compilateur.
 */
export const BRAND_THEMES: Record<
  string,
  {
    strip: string;
    article: string;
    inner: string;
    imageWrap: string;
    badge: string;
    title: string;
    accentDot: string;
  }
> = {
  parfois: {
    strip: "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600",
    article: "shadow-lg shadow-pink-900/10 ring-1 ring-pink-200/70",
    inner: "bg-gradient-to-br from-pink-50/90 via-white to-rose-50/50",
    imageWrap: "ring-2 ring-pink-200/80 shadow-xl shadow-pink-600/10",
    badge:
      "border border-white/30 bg-gradient-to-br from-pink-500 to-rose-600 font-semibold text-white shadow-md",
    title: "border-l-4 border-pink-500 pl-4 text-pink-950",
    accentDot: "bg-pink-500",
  },
  celio: {
    strip: "bg-gradient-to-r from-blue-800 via-blue-700 to-red-600",
    article: "shadow-lg shadow-blue-900/15 ring-1 ring-blue-200/80",
    inner: "bg-gradient-to-br from-slate-50 via-white to-blue-50/60",
    imageWrap: "ring-2 ring-blue-300/70 shadow-xl shadow-blue-900/15",
    badge:
      "border border-white/25 bg-gradient-to-br from-blue-800 to-blue-950 font-semibold text-white shadow-md",
    title: "border-l-4 border-blue-700 pl-4 text-blue-950",
    accentDot: "bg-blue-600",
  },
  zippy: {
    strip: "bg-gradient-to-r from-amber-400 via-lime-400 to-cyan-500",
    article: "shadow-lg shadow-amber-900/10 ring-1 ring-amber-200/80",
    inner: "bg-gradient-to-br from-amber-50/90 via-lime-50/40 to-cyan-50/50",
    imageWrap: "ring-2 ring-amber-300/80 shadow-xl shadow-amber-500/15",
    badge:
      "border border-white/30 bg-gradient-to-br from-amber-400 to-lime-500 font-semibold text-zinc-900 shadow-md",
    title: "border-l-4 border-lime-500 pl-4 text-lime-950",
    accentDot: "bg-lime-500",
  },
  "beauty-success": {
    strip: "bg-gradient-to-r from-violet-800 via-purple-600 to-fuchsia-600",
    article: "shadow-lg shadow-violet-900/15 ring-1 ring-violet-200/70",
    inner: "bg-gradient-to-br from-violet-50/80 via-white to-fuchsia-50/40",
    imageWrap: "ring-2 ring-violet-300/70 shadow-xl shadow-violet-700/15",
    badge:
      "border border-amber-200/40 bg-gradient-to-br from-violet-700 to-purple-900 font-semibold text-amber-50 shadow-md",
    title: "border-l-4 border-violet-600 pl-4 text-violet-950",
    accentDot: "bg-violet-600",
  },
  "women-secret": {
    strip: "bg-gradient-to-r from-rose-900 via-rose-600 to-pink-400",
    article: "shadow-lg shadow-rose-900/15 ring-1 ring-rose-200/80",
    inner: "bg-gradient-to-br from-rose-50/90 via-white to-pink-50/60",
    imageWrap: "ring-2 ring-rose-300/80 shadow-xl shadow-rose-600/15",
    badge:
      "border border-white/25 bg-gradient-to-br from-rose-800 to-rose-950 font-semibold text-rose-50 shadow-md",
    title: "border-l-4 border-rose-600 pl-4 text-rose-950",
    accentDot: "bg-rose-500",
  },
};

export function getBrandTheme(slug: string) {
  return (
    BRAND_THEMES[slug] ?? {
      strip: "bg-gradient-to-r from-slate-500 to-slate-700",
      article: "shadow-md ring-1 ring-slate-200",
      inner: "bg-white",
      imageWrap: "ring-1 ring-slate-200/60 shadow-lg",
      badge: "bg-zinc-900/85 font-semibold text-white backdrop-blur-sm",
      title: "border-l-4 border-slate-400 pl-4 text-zinc-900",
      accentDot: "bg-slate-400",
    }
  );
}
