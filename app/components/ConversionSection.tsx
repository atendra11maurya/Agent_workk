"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { submitLead } from "@/app/actions/submit-lead";
import {
  initialLeadFormState,
  type LeadFieldName,
  type LeadFormState,
} from "@/src/lib/leads/types";
import { analyticsEvents, track } from "@/src/lib/analytics";

export type ConversionSectionProps = {
  className?: string;
  sourcePath?: string;
  whatsappHref: string | null;
  contactEmailHref: string | null;
  phoneNumber?: string;
  available?: boolean;
  unavailableMessage?: string;
};

const inputClassName =
  "min-h-14 w-full border border-dashed border-[#aeb6c2] bg-transparent px-4 py-3 text-base text-[#050608] outline-none transition placeholder:text-[#687281] focus:border-[#050608] disabled:opacity-55";

function newSubmissionId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex
    .slice(6, 8)
    .join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10).join("")}`;
}

function firstErrorFor(state: LeadFormState, field: LeadFieldName) {
  return state.status === "error" ? state.fieldErrors?.[field]?.[0] : undefined;
}

export function ConversionSection({
  className = "",
  sourcePath = "/#contact",
  whatsappHref,
  contactEmailHref,
  phoneNumber,
  available = true,
  unavailableMessage = "Online enquiries are temporarily unavailable — please contact us directly.",
}: ConversionSectionProps) {
  const [intent, setIntent] = useState<"build" | "redesign" | "audit">("build");

  const [state, formAction, pending] = useActionState(
    submitLead,
    initialLeadFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const submissionIdRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const hasTrackedStart = useRef(false);

  useEffect(() => {
    if (state.status === "idle") {
      return;
    }

    if (state.status === "success") {
      const eventName =
        intent === "audit"
          ? analyticsEvents.leadFormSubmit
          : analyticsEvents.leadFormSubmit;
      track(eventName, { kind: intent === "audit" ? "audit" : "contact", source_path: sourcePath });
      formRef.current?.reset();
      if (submissionIdRef.current) {
        submissionIdRef.current.value = "";
      }
      statusRef.current?.focus();
      return;
    }

    const firstInvalidField = Object.keys(state.fieldErrors ?? {})[0];
    const control = firstInvalidField
      ? formRef.current?.elements.namedItem(firstInvalidField)
      : null;

    if (control && "focus" in control && typeof control.focus === "function") {
      control.focus();
    } else {
      statusRef.current?.focus();
    }
  }, [intent, sourcePath, state]);

  const nameError = firstErrorFor(state, "name");
  const emailError = firstErrorFor(state, "email");
  const phoneError = firstErrorFor(state, "phone");
  const websiteError = firstErrorFor(state, "websiteUrl");

  function ensureSubmissionId() {
    if (submissionIdRef.current && !submissionIdRef.current.value) {
      submissionIdRef.current.value = newSubmissionId();
    }
  }

  function trackFormStart() {
    if (hasTrackedStart.current || !available) {
      return;
    }
    hasTrackedStart.current = true;
    track(analyticsEvents.leadFormStart, { kind: intent === "audit" ? "audit" : "contact", source_path: sourcePath });
  }

  const resolvedKind = intent === "audit" ? "audit" : "contact";

  return (
    <div className={`conversion-box ${className}`.trim()}>
      <div className="conversion-box__direct">
        <span className="conversion-micro-label">TALK TO US DIRECTLY</span>

        <div className="conversion-direct-actions">
          {whatsappHref && (
            <a
              className="button button-whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="whatsapp_click"
              data-analytics-placement="contact_section"
            >
              WhatsApp →
            </a>
          )}
          {phoneNumber && (
            <a
              className="button button-call"
              href={`tel:${phoneNumber.replace(/\D/g, "")}`}
              data-analytics-event="call_click"
              data-analytics-placement="contact_section"
            >
              Call Us ↗
            </a>
          )}
          {!phoneNumber && contactEmailHref && (
            <a
              className="button button-call"
              href={contactEmailHref}
              data-analytics-event="email_click"
              data-analytics-placement="contact_section"
            >
              Email Us ↗
            </a>
          )}
        </div>

        <p className="conversion-direct-trust">
          Usually replies quickly
        </p>
      </div>

      <div className="conversion-divider" aria-hidden="true">
        <span>OR SEND DETAILS</span>
      </div>

      <form
        ref={formRef}
        action={formAction}
        className="conversion-form"
        aria-label="Contact CodeAux"
        aria-busy={pending}
        onFocusCapture={trackFormStart}
        onSubmit={ensureSubmissionId}
        noValidate
      >
        <input type="hidden" name="kind" value={resolvedKind} />
        <input type="hidden" name="intent" value={intent} />
        <input ref={submissionIdRef} type="hidden" name="submissionId" />
        <input type="hidden" name="sourcePath" value={sourcePath} />

        <div
          className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor="contact-company-website">Company website</label>
          <input
            id="contact-company-website"
            name="companyWebsite"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            data-lpignore="true"
          />
        </div>

        <fieldset className="conversion-fieldset" disabled={!available || pending}>
          <div className="grid gap-4 mb-4">
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-[#050608]" htmlFor="contact-name">
                Name
              </label>
              <input
                className={inputClassName}
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={80}
                required
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "contact-name-error" : undefined}
              />
              {nameError ? (
                <p id="contact-name-error" className="text-sm text-[#ff9b9b]">
                  {nameError}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#050608]" htmlFor="contact-email">
                  Email
                </label>
                <input
                  className={inputClassName}
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  aria-invalid={Boolean(emailError)}
                  aria-describedby={emailError ? "contact-email-error" : undefined}
                />
                {emailError ? (
                  <p id="contact-email-error" className="text-sm text-[#ff9b9b]">
                    {emailError}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-[#050608]" htmlFor="contact-phone">
                  Phone
                </label>
                <input
                  className={inputClassName}
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={32}
                  aria-invalid={Boolean(phoneError)}
                  aria-describedby={phoneError ? "contact-phone-error" : undefined}
                />
                {phoneError ? (
                  <p id="contact-phone-error" className="text-sm text-[#ff9b9b]">
                    {phoneError}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="grid gap-3 mb-6">
            <span className="text-sm font-semibold text-[#050608]">What can we help you with?</span>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-[#050608] font-medium text-sm">
                <input
                  type="radio"
                  name="intent_radio"
                  checked={intent === "build"}
                  onChange={() => setIntent("build")}
                  className="w-4 h-4 accent-[#050608]"
                />
                Build a website
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#050608] font-medium text-sm">
                <input
                  type="radio"
                  name="intent_radio"
                  checked={intent === "redesign"}
                  onChange={() => setIntent("redesign")}
                  className="w-4 h-4 accent-[#050608]"
                />
                Redesign my website
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-[#050608] font-medium text-sm">
                <input
                  type="radio"
                  name="intent_radio"
                  checked={intent === "audit"}
                  onChange={() => setIntent("audit")}
                  className="w-4 h-4 accent-[#050608]"
                />
                Free website audit
              </label>
            </div>
          </div>

          <div className="grid gap-2 mb-6">
            <label className="text-sm font-semibold text-[#050608]" htmlFor="contact-website-url">
              Website URL (optional)
            </label>
            <input
              className={inputClassName}
              id="contact-website-url"
              name="websiteUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="yourwebsite.com"
              maxLength={2048}
              aria-invalid={Boolean(websiteError)}
              aria-describedby={websiteError ? "contact-website-url-error" : undefined}
            />
            {websiteError ? (
              <p id="contact-website-url-error" className="text-sm text-[#ff9b9b]">
                {websiteError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 mt-2">
            <button
              type="submit"
              className="form-submit-button flex items-center justify-center gap-2"
              disabled={pending}
            >
              [ Send Enquiry → ]
            </button>
          </div>
        </fieldset>

        {!available && state.status !== "success" ? (
          <div className="mt-4 rounded-xl border border-amber-300/25 bg-amber-300/10 p-3 text-sm leading-6 text-amber-100 text-center">
            {unavailableMessage}
          </div>
        ) : null}

        <div
          ref={statusRef}
          className={`min-h-6 text-sm leading-6 mt-3 text-center ${
            state.status === "error" ? "text-[#ff9b9b]" : "text-[#a9c0ff]"
          }`}
          role={state.status === "error" ? "alert" : "status"}
          aria-live={state.status === "error" ? "assertive" : "polite"}
          aria-atomic="true"
          tabIndex={-1}
        >
          {pending
            ? "Sending your enquiry…"
            : state.status === "idle"
              ? null
              : state.message}
        </div>
      </form>
    </div>
  );
}
