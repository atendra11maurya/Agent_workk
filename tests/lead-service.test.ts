import { describe, expect, it, vi } from "vitest";

import { processLeadSubmission } from "../src/lib/leads/service";
import type {
  LeadNotifier,
  LeadRepository,
  LeadSubmission,
} from "../src/lib/leads/types";

const submission: LeadSubmission = {
  submissionId: "1c8f61d4-e445-4c23-846f-76529342f9f6",
  kind: "audit",
  name: "Asha Mehta",
  email: "asha@example.com",
  phone: "+91 98765 43210",
  websiteUrl: "https://example.com",
  sourcePath: "/#audit",
};

function logger() {
  return { error: vi.fn() };
}

describe("lead processing", () => {
  it("stores before notifying and records the provider id", async () => {
    const order: string[] = [];
    const repository: LeadRepository = {
      create: vi.fn(async () => {
        order.push("store");
        return { kind: "created" as const, id: "lead-123" };
      }),
      updateNotification: vi.fn(async () => {
        order.push("status");
      }),
    };
    const notifier: LeadNotifier = {
      notify: vi.fn(async () => {
        order.push("notify");
        return { providerId: "email-456" };
      }),
    };

    const result = await processLeadSubmission(submission, {
      repository,
      notifier,
      logger: logger(),
    });

    expect(result).toEqual({ kind: "accepted", duplicate: false });
    expect(order).toEqual(["store", "notify", "status"]);
    expect(repository.updateNotification).toHaveBeenCalledWith("lead-123", {
      status: "sent",
      providerId: "email-456",
    });
  });

  it("treats a duplicate submission as success without another email", async () => {
    const repository: LeadRepository = {
      create: vi.fn(async () => ({ kind: "duplicate" as const })),
      updateNotification: vi.fn(),
    };
    const notifier: LeadNotifier = { notify: vi.fn() };

    const result = await processLeadSubmission(submission, {
      repository,
      notifier,
      logger: logger(),
    });

    expect(result).toEqual({ kind: "accepted", duplicate: true });
    expect(notifier.notify).not.toHaveBeenCalled();
    expect(repository.updateNotification).not.toHaveBeenCalled();
  });

  it("keeps storage success when email fails and records that failure", async () => {
    const repository: LeadRepository = {
      create: vi.fn(async () => ({
        kind: "created" as const,
        id: "lead-123",
      })),
      updateNotification: vi.fn(),
    };
    const notifier: LeadNotifier = {
      notify: vi.fn(async () => {
        throw new Error("provider down");
      }),
    };

    const result = await processLeadSubmission(submission, {
      repository,
      notifier,
      logger: logger(),
    });

    expect(result).toEqual({ kind: "accepted", duplicate: false });
    expect(repository.updateNotification).toHaveBeenCalledWith("lead-123", {
      status: "failed",
      errorCode: "provider_error",
    });
  });

  it("records a missing email provider without rejecting the captured lead", async () => {
    const repository: LeadRepository = {
      create: vi.fn(async () => ({
        kind: "created" as const,
        id: "lead-123",
      })),
      updateNotification: vi.fn(),
    };

    const result = await processLeadSubmission(submission, {
      repository,
      notifier: null,
      logger: logger(),
    });

    expect(result).toEqual({ kind: "accepted", duplicate: false });
    expect(repository.updateNotification).toHaveBeenCalledWith("lead-123", {
      status: "failed",
      errorCode: "not_configured",
    });
  });

  it("reports storage failure and never attempts email", async () => {
    const repository: LeadRepository = {
      create: vi.fn(async () => {
        throw new Error("database down");
      }),
      updateNotification: vi.fn(),
    };
    const notifier: LeadNotifier = { notify: vi.fn() };

    const result = await processLeadSubmission(submission, {
      repository,
      notifier,
      logger: logger(),
    });

    expect(result).toEqual({ kind: "storage_failed" });
    expect(notifier.notify).not.toHaveBeenCalled();
  });
});
