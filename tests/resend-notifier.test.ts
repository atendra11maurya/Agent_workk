import { describe, expect, it, vi } from "vitest";

import {
  buildLeadNotification,
  createResendLeadNotifier,
} from "../src/lib/leads/notifier";

const lead = {
  id: "77a6584c-f356-49bd-a5fa-29af10747bc0",
  submissionId: "1c8f61d4-e445-4c23-846f-76529342f9f6",
  kind: "audit" as const,
  name: "Asha Mehta",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  websiteUrl: "https://example.com",
  sourcePath: "/#audit",
};

describe("Resend lead notification", () => {
  it("uses the stored lead id as the email idempotency key", () => {
    const notification = buildLeadNotification(
      lead,
      {
        from: "CodeAux Leads <leads@codeaux.example>",
        to: ["team@codeaux.example"],
      },
    );

    expect(notification.options.idempotencyKey).toBe(
      "lead-notification/77a6584c-f356-49bd-a5fa-29af10747bc0",
    );
    expect(notification.payload.replyTo).toBe("asha@example.com");
    expect(notification.payload.text).toContain("Website: https://example.com");
  });

  it("sends the idempotency key as a Resend API header", async () => {
    const request = vi.fn(
      async (...requestArguments: Parameters<typeof fetch>): Promise<Response> => {
        void requestArguments;
        return Response.json({ id: "email-provider-id" });
      },
    );
    const notifier = createResendLeadNotifier(
      {
        RESEND_API_KEY: "test-api-key",
        LEAD_NOTIFICATION_FROM: "CodeAux Leads <leads@codeaux.example>",
        LEAD_NOTIFICATION_TO: "team@codeaux.example",
      },
      request,
    );

    await expect(notifier?.notify(lead)).resolves.toEqual({
      providerId: "email-provider-id",
    });

    const [url, init] = request.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init?.headers).toMatchObject({
      Authorization: "Bearer test-api-key",
      "Idempotency-Key":
        "lead-notification/77a6584c-f356-49bd-a5fa-29af10747bc0",
    });
    expect(JSON.parse(String(init?.body))).toMatchObject({
      reply_to: "asha@example.com",
      to: ["team@codeaux.example"],
    });
  });
});
