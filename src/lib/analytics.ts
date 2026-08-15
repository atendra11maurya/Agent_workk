export const analyticsEvents = {
  bookCallClick: "book_call_click",
  leadFormStart: "lead_form_start",
  leadFormSubmit: "lead_form_submit",
  portfolioInteraction: "portfolio_interaction",
  websiteAuditClick: "website_audit_click",
  whatsappClick: "whatsapp_click",
} as const;

export type AnalyticsEventName =
  (typeof analyticsEvents)[keyof typeof analyticsEvents] | (string & {});

export type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsParameters = Record<string, AnalyticsValue>;
type DataLayerEntry = IArguments | Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEntry[];
    gtag?: (...args: unknown[]) => void;
  }
}

function removeUndefinedValues(parameters: AnalyticsParameters) {
  return Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );
}

/**
 * Sends a provider-neutral conversion event when an analytics provider exists.
 * Calls are intentionally ignored during SSR and when analytics is unconfigured.
 */
export function track(
  eventName: AnalyticsEventName,
  parameters: AnalyticsParameters = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedName = eventName.trim();
  if (!normalizedName) {
    return;
  }

  const payload = removeUndefinedValues(parameters);

  if (typeof window.gtag === "function") {
    window.gtag("event", normalizedName, payload);
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: normalizedName, ...payload });
  }
}
