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
  "min-h-14 w-full rounded-2xl border border-white/15 bg-[#0b0e13] px-4 py-3 text-base text-[#f5f7fa] outline-none transition placeholder:text-[#687281] hover:border-white/25 focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/35 disabled:cursor-not-allowed disabled:opacity-55";

const textareaClassName =
  "min-h-24 w-full resize-y rounded-2xl border border-white/15 bg-[#0b0e13] px-4 py-3 text-base text-[#f5f7fa] outline-none transition placeholder:text-[#687281] hover:border-white/25 focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/35 disabled:cursor-not-allowed disabled:opacity-55";

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
  const projectDetailsError = firstErrorFor(state, "projectDetails");

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

  const submitLabel =
    intent === "build"
      ? "Send Project Enquiry →"
      : intent === "redesign"
        ? "Discuss My Redesign →"
        : "Get My Free Audit →";

  const resolvedKind = intent === "audit" ? "audit" : "contact";

  return (
    <div className={`conversion-box ${className}`.trim()}>
      <div className="conversion-box__direct">
        <span className="conversion-micro-label">TALK TO US DIRECTLY</span>
        <p className="conversion-direct-support">
          Have a project in mind? Skip the form and talk to us directly.
        </p>

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
              WhatsApp Us →
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
          No sales pressure. Just tell us what you're trying to build.
        </p>
      </div>

      <div className="conversion-divider" aria-hidden="true">
        <span>OR SEND YOUR REQUIREMENTS</span>
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
              <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-name">
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
                <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-email">
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
                <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-phone">
                  Phone / WhatsApp <span className="text-[#687281] font-normal">(optional)</span>
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

          <div className="grid gap-3 mb-5">
            <span className="text-sm font-semibold text-[#f5f7fa]">What can we help you with?</span>
            <div className="intent-selector">
              <button
                type="button"
                className={`intent-pill ${intent === "build" ? "active" : ""}`}
                onClick={() => setIntent("build")}
                aria-pressed={intent === "build"}
              >
                Build a new website
              </button>
              <button
                type="button"
                className={`intent-pill ${intent === "redesign" ? "active" : ""}`}
                onClick={() => setIntent("redesign")}
                aria-pressed={intent === "redesign"}
              >
                Redesign my website
              </button>
              <button
                type="button"
                className={`intent-pill ${intent === "audit" ? "active" : ""}`}
                onClick={() => setIntent("audit")}
                aria-pressed={intent === "audit"}
              >
                Free website audit
              </button>
            </div>
          </div>

          <div className="intent-conditional-area mb-6">
            {intent === "build" && (
              <div className="grid gap-4 intent-fade-in">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-project-details">
                    Tell us briefly what you're looking to build
                  </label>
                  <textarea
                    className={textareaClassName}
                    id="contact-project-details"
                    name="projectDetails"
                    placeholder="E.g. restaurant website, company website, portfolio, e-commerce site..."
                    maxLength={2000}
                    aria-invalid={Boolean(projectDetailsError)}
                  />
                  {projectDetailsError && (
                    <p className="text-sm text-[#ff9b9b]">{projectDetailsError}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-website-url">
                    Existing website URL <span className="text-[#687281] font-normal">(optional)</span>
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
              </div>
            )}

            {intent === "redesign" && (
              <div className="grid gap-4 intent-fade-in">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-website-url">
                    Current Website URL
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
                    required
                    aria-invalid={Boolean(websiteError)}
                    aria-describedby={websiteError ? "contact-website-url-error" : undefined}
                  />
                  {websiteError ? (
                    <p id="contact-website-url-error" className="text-sm text-[#ff9b9b]">
                      {websiteError}
                    </p>
                  ) : null}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-project-details">
                    What would you like to improve?
                  </label>
                  <textarea
                    className={textareaClassName}
                    id="contact-project-details"
                    name="projectDetails"
                    placeholder="Tell us what's currently not working or what you'd like to improve."
                    maxLength={2000}
                    aria-invalid={Boolean(projectDetailsError)}
                  />
                  {projectDetailsError && (
                    <p className="text-sm text-[#ff9b9b]">{projectDetailsError}</p>
                  )}
                </div>
              </div>
            )}

            {intent === "audit" && (
              <div className="grid gap-4 intent-fade-in">
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-website-url">
                    Website URL
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
                    required
                    aria-invalid={Boolean(websiteError)}
                    aria-describedby={websiteError ? "contact-website-url-error" : undefined}
                  />
                  {websiteError ? (
                    <p id="contact-website-url-error" className="text-sm text-[#ff9b9b]">
                      {websiteError}
                    </p>
                  ) : null}
                  <div className="mt-1 text-sm text-[#687281]">
                    <span className="font-semibold block mb-1">Your audit will review:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
                      <li>• CTA clarity</li>
                      <li>• Trust & messaging</li>
                      <li>• Mobile usability</li>
                      <li>• Conversion structure</li>
                      <li>• Website speed</li>
                      <li>• Lead-gen opportunities</li>
                    </ul>
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="contact-project-details">
                    What's your biggest concern? <span className="text-[#687281] font-normal">(optional)</span>
                  </label>
                  <textarea
                    className={textareaClassName}
                    id="contact-project-details"
                    name="projectDetails"
                    placeholder="E.g. low enquiries, outdated design, slow website, poor mobile experience..."
                    maxLength={2000}
                    aria-invalid={Boolean(projectDetailsError)}
                  />
                  {projectDetailsError && (
                    <p className="text-sm text-[#ff9b9b]">{projectDetailsError}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            className="form-submit-button"
            type="submit"
            disabled={!available || pending}
          >
            {pending ? "Sending…" : submitLabel}
          </button>
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
