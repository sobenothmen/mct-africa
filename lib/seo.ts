function normalizeSiteUrl(value?: string) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim().replace(/\/+$/, "");

  if (!trimmed) {
    return undefined;
  }

  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function getSiteUrl() {
  const configuredSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  const vercelProductionUrl = normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL);

  if (vercelProductionUrl) {
    return vercelProductionUrl;
  }

  const vercelUrl = normalizeSiteUrl(process.env.VERCEL_URL);

  if (vercelUrl) {
    return vercelUrl;
  }

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  return undefined;
}

export function absoluteUrl(path = "/") {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return undefined;
  }

  return new URL(path, `${siteUrl}/`).toString();
}
