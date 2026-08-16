"use client";

import { useActionState, useEffect, useRef } from "react";

import { submitLead } from "@/app/actions/submit-lead";
import {
  initialLeadFormState,
  type LeadFieldName,
  type LeadFormState,
  type LeadKind,
} from "@/src/lib/leads/types";
import { analyticsEvents, track } from "@/src/lib/analytics";

export type LeadFormProps = {
  kind: LeadKind;
  className?: string;
  sourcePath?: string;
  submitLabel?: string;
  available?: boolean;
  unavailableMessage?: string;
};

const inputClassName =
  "min-h-14 w-full rounded-2xl border border-white/15 bg-[#0b0e13] px-4 py-3 text-base text-[#f5f7fa] outline-none transition placeholder:text-[#687281] hover:border-white/25 focus:border-[#2f6bff] focus:ring-2 focus:ring-[#2f6bff]/35 disabled:cursor-not-allowed disabled:opacity-55";

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

export function LeadForm({
  kind,
  className = "",
  sourcePath = "/",
  submitLabel,
  available = true,
  unavailableMessage =
    "The enquiry form is temporarily unavailable. Please use another contact option on this page.",
}: LeadFormProps) {
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
      track(analyticsEvents.leadFormSubmit, { kind, source_path: sourcePath });
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
  }, [kind, sourcePath, state]);

  const nameError = firstErrorFor(state, "name");
  const emailError = firstErrorFor(state, "email");
  const phoneError = firstErrorFor(state, "phone");
  const websiteError = firstErrorFor(state, "websiteUrl");
  const resolvedSubmitLabel =
    submitLabel ?? (kind === "audit" ? "Get My Free Audit" : "Send Enquiry");

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
    track(analyticsEvents.leadFormStart, { kind, source_path: sourcePath });
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className={`grid gap-5 ${className}`.trim()}
      aria-label={kind === "audit" ? "Website audit request" : "Contact CodeAux"}
      aria-busy={pending}
      onFocusCapture={trackFormStart}
      onSubmit={ensureSubmissionId}
      noValidate
    >
      <input type="hidden" name="kind" value={kind} />
      <input ref={submissionIdRef} type="hidden" name="submissionId" />
      <input type="hidden" name="sourcePath" value={sourcePath} />

      <div
        className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${kind}-company-website`}>Company website</label>
        <input
          id={`${kind}-company-website`}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
        />
      </div>

      {!available ? (
        <p className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
          {unavailableMessage}
        </p>
      ) : null}

      <fieldset className="grid gap-5" disabled={!available || pending}>
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor={`${kind}-name`}>
            Name
          </label>
          <input
            className={inputClassName}
            id={`${kind}-name`}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? `${kind}-name-error` : undefined}
          />
          {nameError ? (
            <p id={`${kind}-name-error`} className="text-sm text-[#ff9b9b]">
              {nameError}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor={`${kind}-email`}>
              Email
            </label>
            <input
              className={inputClassName}
              id={`${kind}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? `${kind}-email-error` : undefined}
            />
            {emailError ? (
              <p id={`${kind}-email-error`} className="text-sm text-[#ff9b9b]">
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor={`${kind}-phone`}>
              Phone / WhatsApp
            </label>
            <input
              className={inputClassName}
              id={`${kind}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={32}
              required
              aria-invalid={Boolean(phoneError)}
              aria-describedby={phoneError ? `${kind}-phone-error` : undefined}
            />
            {phoneError ? (
              <p id={`${kind}-phone-error`} className="text-sm text-[#ff9b9b]">
                {phoneError}
              </p>
            ) : null}
          </div>
        </div>

        {kind === "audit" ? (
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-[#f5f7fa]" htmlFor="audit-website-url">
              Website URL
            </label>
            <input
              className={inputClassName}
              id="audit-website-url"
              name="websiteUrl"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="yourwebsite.com"
              maxLength={2048}
              required
              aria-invalid={Boolean(websiteError)}
              aria-describedby={websiteError ? "audit-website-url-error" : undefined}
            />
            {websiteError ? (
              <p id="audit-website-url-error" className="text-sm text-[#ff9b9b]">
                {websiteError}
              </p>
            ) : null}
          </div>
        ) : null}

        <button
          className="min-h-14 rounded-full bg-[#2f6bff] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#477cff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#79a0ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050608] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-55"
          type="submit"
          disabled={!available || pending}
        >
          {pending ? "Sending…" : resolvedSubmitLabel}
        </button>
      </fieldset>

      <div
        ref={statusRef}
        className={`min-h-6 text-sm leading-6 ${
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
  );
}
