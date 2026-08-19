export type LeadKind = "contact" | "audit";

export type LeadSubmission = {
  submissionId: string;
  kind: LeadKind;
  intent?: "build" | "redesign" | "audit";
  projectDetails?: string;
  name: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  sourcePath: string;
};

export type StoredLead = LeadSubmission & {
  id: string;
};

export type LeadFieldName = "name" | "email" | "phone" | "websiteUrl" | "intent" | "projectDetails";

export type LeadFieldErrors = Partial<Record<LeadFieldName, string[]>>;

export type LeadFormState =
  | {
      status: "idle";
      message: "";
      fieldErrors?: never;
    }
  | {
      status: "success";
      message: string;
      fieldErrors?: never;
    }
  | {
      status: "error";
      message: string;
      fieldErrors?: LeadFieldErrors;
    };

export const initialLeadFormState: LeadFormState = {
  status: "idle",
  message: "",
};

export type LeadCreationResult =
  | { kind: "created"; id: string }
  | { kind: "duplicate" };

export type NotificationUpdate =
  | { status: "sent"; providerId: string }
  | { status: "failed"; errorCode: "not_configured" | "provider_error" };

export interface LeadRepository {
  create(submission: LeadSubmission): Promise<LeadCreationResult>;
  updateNotification(leadId: string, update: NotificationUpdate): Promise<void>;
}

export interface LeadNotifier {
  notify(lead: StoredLead): Promise<{ providerId: string }>;
}

export type LeadProcessingResult =
  | { kind: "accepted"; duplicate: boolean }
  | { kind: "storage_failed" };
