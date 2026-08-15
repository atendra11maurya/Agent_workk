import type {
  LeadNotifier,
  LeadProcessingResult,
  LeadRepository,
  LeadSubmission,
  NotificationUpdate,
} from "./types";

export type LeadServiceDependencies = {
  repository: LeadRepository;
  notifier?: LeadNotifier | null;
  logger?: Pick<Console, "error">;
};

async function recordNotificationStatus(
  repository: LeadRepository,
  leadId: string,
  update: NotificationUpdate,
  logger: Pick<Console, "error">,
) {
  try {
    await repository.updateNotification(leadId, update);
  } catch {
    logger.error("A captured lead's notification status could not be updated.");
  }
}
export async function processLeadSubmission(
  submission: LeadSubmission,
  dependencies: LeadServiceDependencies,
): Promise<LeadProcessingResult> {
  const logger = dependencies.logger ?? console;

  let createdLead;
  try {
    createdLead = await dependencies.repository.create(submission);
  } catch {
    logger.error("A lead could not be stored.");
    return { kind: "storage_failed" };
  }

  if (createdLead.kind === "duplicate") {
    return { kind: "accepted", duplicate: true };
  }

  if (!dependencies.notifier) {
    await recordNotificationStatus(
      dependencies.repository,
      createdLead.id,
      { status: "failed", errorCode: "not_configured" },
      logger,
    );
    return { kind: "accepted", duplicate: false };
  }

  try {
    const notification = await dependencies.notifier.notify({
      ...submission,
      id: createdLead.id,
    });
    await recordNotificationStatus(
      dependencies.repository,
      createdLead.id,
      { status: "sent", providerId: notification.providerId },
      logger,
    );
  } catch {
    logger.error("A captured lead's notification email could not be sent.");
    await recordNotificationStatus(
      dependencies.repository,
      createdLead.id,
      { status: "failed", errorCode: "provider_error" },
      logger,
    );
  }

  return { kind: "accepted", duplicate: false };
}
