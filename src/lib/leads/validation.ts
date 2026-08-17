import { z } from "zod";

import type {
  LeadFieldErrors,
  LeadFieldName,
  LeadSubmission,
} from "./types";

const phoneCharacters = /^\+?[\d ().-]+$/;
const publicFields = new Set<LeadFieldName>([
  "name",
  "email",
  "phone",
  "websiteUrl",
  "intent",
  "projectDetails",
]);

function normalizeWebsiteUrl(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return trimmed;
  }

  return /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter your name.")
  .max(80, "Keep your name under 80 characters.")
  .refine((value) => !/[\r\n]/.test(value), "Enter your name on one line.");

const emailSchema = z
  .string()
  .trim()
  .max(254, "Enter a shorter email address.")
  .email("Enter a valid email address.")
  .transform((value) => value.toLowerCase());

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Enter a valid phone or WhatsApp number.")
  .max(32, "Enter a shorter phone or WhatsApp number.")
  .refine((value) => phoneCharacters.test(value), {
    message: "Use only numbers and common phone symbols.",
  })
  .refine((value) => {
    const digitCount = value.replace(/\D/g, "").length;
    return digitCount >= 7 && digitCount <= 15;
  }, "Enter a number containing 7 to 15 digits.");

const websiteUrlSchema = z.preprocess(
  normalizeWebsiteUrl,
  z
    .string()
    .max(2048, "Enter a shorter website URL.")
    .url("Enter a valid website URL.")
    .refine((value) => {
      try {
        const protocol = new URL(value).protocol;
        return protocol === "http:" || protocol === "https:";
      } catch {
        return false;
      }
    }, "Use an http or https website URL."),
);

const intentSchema = z.enum(["build", "redesign", "audit"]);

const projectDetailsSchema = z
  .string()
  .trim()
  .max(2000, "Please keep your details under 2000 characters.")
  .optional();

const sourcePathSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() ? value.trim() : "/"),
  z
    .string()
    .max(512)
    .refine((value) => value.startsWith("/") && !value.startsWith("//"), {
      message: "Invalid form source.",
    }),
);

const baseSchema = z.object({
  submissionId: z.string().uuid("Refresh the page and try again."),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  intent: intentSchema.optional(),
  projectDetails: projectDetailsSchema,
  sourcePath: sourcePathSchema,
});

const contactSchema = baseSchema.extend({
  kind: z.literal("contact"),
  websiteUrl: z.undefined().optional(),
});

const auditSchema = baseSchema.extend({
  kind: z.literal("audit"),
  websiteUrl: websiteUrlSchema,
});

const leadSubmissionSchema = z.discriminatedUnion("kind", [
  contactSchema,
  auditSchema,
]);

export type LeadValidationResult =
  | { success: true; data: LeadSubmission }
  | {
      success: false;
      fieldErrors: LeadFieldErrors;
      hasFormError: boolean;
    };

function formValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : undefined;
}

export function hasFilledHoneypot(formData: FormData) {
  return Boolean(formValue(formData, "companyWebsite")?.trim());
}

export function validateLeadFormData(formData: FormData): LeadValidationResult {
  const kind = formValue(formData, "kind");
  const result = leadSubmissionSchema.safeParse({
    submissionId: formValue(formData, "submissionId"),
    kind,
    name: formValue(formData, "name"),
    email: formValue(formData, "email"),
    phone: formValue(formData, "phone"),
    intent: formValue(formData, "intent") as any,
    projectDetails: formValue(formData, "projectDetails"),
    websiteUrl:
      kind === "audit" || formValue(formData, "intent") === "redesign" ? formValue(formData, "websiteUrl") : undefined,
    sourcePath: formValue(formData, "sourcePath"),
  });

  if (result.success) {
    return { success: true, data: result.data };
  }

  const flattened = result.error.flatten();
  const fieldErrors: LeadFieldErrors = {};
  let hasFormError = flattened.formErrors.length > 0;

  for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
    if (publicFields.has(field as LeadFieldName) && messages?.length) {
      fieldErrors[field as LeadFieldName] = messages;
    } else if (messages?.length) {
      hasFormError = true;
    }
  }

  return { success: false, fieldErrors, hasFormError };
}
