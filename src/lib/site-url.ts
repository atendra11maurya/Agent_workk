const LOCAL_SITE_URL = "http://localhost:3000";

export function getConfiguredSiteUrl() {
  const value = process.env.SITE_URL?.trim();

  if (!value) {
    return LOCAL_SITE_URL;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.origin
      : LOCAL_SITE_URL;
  } catch {
    return LOCAL_SITE_URL;
  }
}

export function getRequestSiteUrl(headersList: Headers) {
  if (process.env.SITE_URL?.trim()) {
    return getConfiguredSiteUrl();
  }

  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");

  return host ? `${protocol}://${host}` : LOCAL_SITE_URL;
}
