import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getSafeBookingHref,
  getWhatsappHref,
} from "../app/components/SiteChrome";
import { pricing, projects, videoProof } from "../src/data/site";
import { analyticsEvents, track } from "../src/lib/analytics";
import {
  getConfiguredSiteUrl,
  getRequestSiteUrl,
} from "../src/lib/site-url";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("site content states", () => {
  it("keeps every proof placeholder explicit and free of published claims", () => {
    expect(projects).toHaveLength(5);
    expect(videoProof).toHaveLength(3);

    for (const project of projects) {
      expect(project.status).toBe("placeholder");
      expect(project).toMatchObject({
        visibility: "visible",
        reason: "awaiting-verified-content",
      });
      expect(project).not.toHaveProperty("client");
      expect(project).not.toHaveProperty("results");
    }

    for (const proof of videoProof) {
      expect(proof.status).toBe("placeholder");
      expect(proof).not.toHaveProperty("quote");
      expect(proof).not.toHaveProperty("clientName");
      expect(proof).not.toHaveProperty("videoSrc");
    }
  });

  it("retains the approved entry price", () => {
    expect(pricing[0].price).toMatchObject({
      kind: "from",
      currency: "INR",
      amount: 50_000,
    });
  });
});

describe("CTA and environment fallbacks", () => {
  it("falls booking back to contact and hides invalid WhatsApp numbers", () => {
    expect(getSafeBookingHref(undefined, "#contact")).toBe("#contact");
    expect(getSafeBookingHref("javascript:alert(1)", "#contact")).toBe(
      "#contact",
    );
    expect(getSafeBookingHref("https://cal.example/codeaux", "#contact")).toBe(
      "https://cal.example/codeaux",
    );
    expect(getWhatsappHref(undefined)).toBeNull();
    expect(getWhatsappHref("+91 98765 43210")).toMatch(
      /^https:\/\/wa\.me\/919876543210/,
    );
  });

  it("uses a valid configured site URL or the incoming deployment host", () => {
    vi.stubEnv("SITE_URL", "https://codeaux.example/path");
    expect(getConfiguredSiteUrl()).toBe("https://codeaux.example");

    vi.stubEnv("SITE_URL", "");
    const requestHeaders = new Headers({
      "x-forwarded-host": "private-codeaux.sites.example",
      "x-forwarded-proto": "https",
    });
    expect(getRequestSiteUrl(requestHeaders)).toBe(
      "https://private-codeaux.sites.example",
    );
  });
});

describe("analytics adapter", () => {
  it("is a no-op without a browser provider", () => {
    expect(() => track(analyticsEvents.bookCallClick)).not.toThrow();
  });

  it("forwards provider-neutral events to an available data layer", () => {
    const dataLayer: Array<Record<string, unknown>> = [];
    vi.stubGlobal("window", { dataLayer });

    track(analyticsEvents.websiteAuditClick, { placement: "hero" });

    expect(dataLayer).toEqual([
      {
        event: "website_audit_click",
        placement: "hero",
      },
    ]);
  });
});
