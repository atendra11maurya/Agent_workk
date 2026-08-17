import type { LeadNotifier, StoredLead } from "./types";

type NotificationEnvironment = {
  RESEND_API_KEY?: string;
  LEAD_NOTIFICATION_FROM?: string;
  LEAD_NOTIFICATION_TO?: string;
};

export type LeadNotificationConfig = {
  from: string;
  to: string[];
};

export function buildLeadNotification(
  lead: StoredLead,
  config: LeadNotificationConfig,
) {
  const enquiryType =
    lead.kind === "audit" ? "Website audit request" : "Website project enquiry";
  const lines = [
    enquiryType,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone}`,
  ];

  if (lead.intent) {
    const intentLabel = lead.intent === "build" ? "Build a new website" : lead.intent === "redesign" ? "Redesign existing website" : "Free website audit";
    lines.push(`Intent: ${intentLabel}`);
  }

  if (lead.websiteUrl) {
    lines.push(`Website: ${lead.websiteUrl}`);
  }

  if (lead.projectDetails) {
    lines.push(`\nDetails:\n${lead.projectDetails}\n`);
  }

  lines.push(`Source: ${lead.sourcePath}`, `Lead ID: ${lead.id}`);

  return {
    payload: {
      from: config.from,
      to: config.to,
      replyTo: lead.email,
      subject: `${enquiryType} from ${lead.name}`,
      text: lines.join("\n"),
    },
    options: {
      idempotencyKey: `lead-notification/${lead.id}`,
    },
  };
}

class ResendLeadNotifier implements LeadNotifier {
  constructor(
    private readonly apiKey: string,
    private readonly config: LeadNotificationConfig,
    private readonly request: typeof fetch,
  ) {}

  async notify(lead: StoredLead) {
    const notification = buildLeadNotification(lead, this.config);
    const { replyTo, ...payload } = notification.payload;
    const response = await this.request("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": notification.options.idempotencyKey,
      },
      body: JSON.stringify({
        ...payload,
        reply_to: replyTo,
      }),
    });

    if (!response.ok) {
      throw new Error("Lead notification provider rejected the email.");
    }

    const data = (await response.json()) as { id?: unknown };
    if (typeof data.id !== "string" || !data.id) {
      throw new Error("Lead notification provider returned an invalid response.");
    }

    return { providerId: data.id };
  }
}

export function createResendLeadNotifier(
  environment: NotificationEnvironment = process.env as NotificationEnvironment,
  request: typeof fetch = fetch,
): LeadNotifier | null {
  const apiKey = environment.RESEND_API_KEY?.trim();
  const from = environment.LEAD_NOTIFICATION_FROM?.trim();
  const to = environment.LEAD_NOTIFICATION_TO?.split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  if (!apiKey || !from || !to?.length) {
    return null;
  }

  return new ResendLeadNotifier(apiKey, { from, to }, request);
}
