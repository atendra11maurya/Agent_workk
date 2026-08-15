"use server";

import { createResendLeadNotifier } from "@/src/lib/leads/notifier";
import { createSupabaseLeadRepository } from "@/src/lib/leads/repository";
import { processLeadSubmission } from "@/src/lib/leads/service";
import type { LeadFormState, LeadKind } from "@/src/lib/leads/types";
import {
  hasFilledHoneypot,
  validateLeadFormData,
} from "@/src/lib/leads/validation";

function successMessage(kind: LeadKind) {
  return kind === "audit"
    ? "Thanks — your website audit request is safely received. We'll be in touch soon."
    : "Thanks — your enquiry is safely received. We'll be in touch soon.";
}
export async function submitLead(
  _previousState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (hasFilledHoneypot(formData)) {
    return {
      status: "success",
      message: "Thanks — your enquiry is safely received. We'll be in touch soon.",
    };
  }

  const validation = validateLeadFormData(formData);
  if (!validation.success) {
    return {
      status: "error",
      message: validation.hasFormError
        ? "Please refresh the page and try submitting again."
        : "Please check the highlighted fields and try again.",
      fieldErrors: validation.fieldErrors,
    };
  }

  const repository = createSupabaseLeadRepository();
  if (!repository) {
    return {
      status: "error",
      message:
        "The enquiry form is temporarily unavailable because secure lead storage is not configured. Please use another contact option on this page.",
    };
  }

  const result = await processLeadSubmission(validation.data, {
    repository,
    notifier: createResendLeadNotifier(),
  });

  if (result.kind === "storage_failed") {
    return {
      status: "error",
      message:
        "We couldn't safely save your enquiry right now. Please try again or use another contact option on this page.",
    };
  }

  return {
    status: "success",
    message: successMessage(validation.data.kind),
  };
}
