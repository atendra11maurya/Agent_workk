import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type {
  LeadCreationResult,
  LeadRepository,
  LeadSubmission,
  NotificationUpdate,
} from "./types";

type LeadEnvironment = {
  SUPABASE_URL?: string;
  SUPABASE_SECRET_KEY?: string;
};

export class SupabaseLeadRepository implements LeadRepository {
  constructor(private readonly client: SupabaseClient) {}

  async create(submission: LeadSubmission): Promise<LeadCreationResult> {
    const { data, error } = await this.client
      .from("leads")
      .insert({
        submission_id: submission.submissionId,
        kind: submission.kind,
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        website_url: submission.websiteUrl ?? null,
        source_path: submission.sourcePath,
      })
      .select("id")
      .single();

    if (error?.code === "23505") {
      return { kind: "duplicate" };
    }

    if (error) {
      throw new Error(`Lead storage failed (${error.code || "unknown"}).`);
    }

    if (!data || typeof data.id !== "string") {
      throw new Error("Lead storage did not return an identifier.");
    }

    return { kind: "created", id: data.id };
  }

  async updateNotification(leadId: string, update: NotificationUpdate) {
    const notificationPatch =
      update.status === "sent"
        ? {
            notification_status: "sent",
            notification_provider_id: update.providerId,
            notification_error_code: null,
          }
        : {
            notification_status: "failed",
            notification_provider_id: null,
            notification_error_code: update.errorCode,
          };

    const { error } = await this.client
      .from("leads")
      .update({
        ...notificationPatch,
        updated_at: new Date().toISOString(),
      })
      .eq("id", leadId);

    if (error) {
      throw new Error(
        `Lead notification status update failed (${error.code || "unknown"}).`,
      );
    }
  }
}

export function createSupabaseLeadRepository(
  environment: LeadEnvironment = process.env as LeadEnvironment,
): LeadRepository | null {
  const url = environment.SUPABASE_URL?.trim();
  const secretKey = environment.SUPABASE_SECRET_KEY?.trim();

  if (!url || !secretKey) {
    return null;
  }

  const client = createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return new SupabaseLeadRepository(client);
}
