"use client";

import Script from "next/script";
import { useEffect } from "react";

import { track } from "@/src/lib/analytics";

export interface AnalyticsProps {
  enabled?: boolean;
  measurementId?: string | null;
  nonce?: string;
  sendPageView?: boolean;
}

const GA4_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export default function Analytics({
  enabled = true,
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  nonce,
  sendPageView = true,
}: AnalyticsProps) {
  const ga4Id = measurementId?.trim();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const trigger = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-analytics-event]",
      );

      if (!trigger?.dataset.analyticsEvent) {
        return;
      }

      track(trigger.dataset.analyticsEvent, {
        placement: trigger.dataset.analyticsPlacement,
        project: trigger.dataset.analyticsProject,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!enabled || !ga4Id || !GA4_ID_PATTERN.test(ga4Id)) {
    return null;
  }

  const serializedId = JSON.stringify(ga4Id);
  const serializedConfig = JSON.stringify({
    anonymize_ip: true,
    send_page_view: sendPageView,
  });

  return (
    <>
      <Script
        id="codeaux-ga4-library"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script
        id="codeaux-ga4-initialization"
        strategy="afterInteractive"
        nonce={nonce}
      >
        {`window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
window.gtag('js', new Date());
window.gtag('config', ${serializedId}, ${serializedConfig});`}
      </Script>
    </>
  );
}
