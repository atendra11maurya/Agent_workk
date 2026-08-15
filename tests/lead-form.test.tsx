// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { LeadForm } from "../app/components/LeadForm";

const submitLeadMock = vi.hoisted(() => vi.fn());

vi.mock("@/app/actions/submit-lead", () => ({
  submitLead: submitLeadMock,
}));

describe("LeadForm", () => {
  beforeEach(() => {
    submitLeadMock.mockReset();
    submitLeadMock.mockResolvedValue({
      status: "success",
      message: "Thanks — your enquiry is safely received.",
    });
  });

  afterEach(cleanup);

  it("exposes accessible contact fields and excludes the audit URL", () => {
    render(<LeadForm kind="contact" />);

    expect(screen.getByRole("form", { name: "Contact CodeAux" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Phone / WhatsApp")).toHaveAttribute(
      "type",
      "tel",
    );
    expect(screen.queryByLabelText("Website URL")).not.toBeInTheDocument();
  });

  it("adds a required website URL to audit requests", () => {
    render(<LeadForm kind="audit" />);

    expect(
      screen.getByRole("form", { name: "Website audit request" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Website URL")).toBeRequired();
    expect(screen.getByRole("button", { name: "Get My Free Audit" })).toBeEnabled();
  });

  it("renders an honest unavailable state and prevents submission", () => {
    render(<LeadForm kind="contact" available={false} />);

    expect(screen.getByText(/temporarily unavailable/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Enquiry" })).toBeDisabled();
  });

  it("submits a UUID, announces success, resets, and focuses the status", async () => {
    const user = userEvent.setup();
    render(<LeadForm kind="contact" />);

    await user.type(screen.getByLabelText("Name"), "Asha Mehta");
    await user.type(screen.getByLabelText("Email"), "asha@example.com");
    await user.type(screen.getByLabelText("Phone / WhatsApp"), "9876543210");
    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    const status = await screen.findByText(
      "Thanks — your enquiry is safely received.",
    );
    expect(status).toHaveFocus();
    expect(screen.getByLabelText("Name")).toHaveValue("");

    const submittedFormData = submitLeadMock.mock.calls[0][1] as FormData;
    expect(submittedFormData.get("submissionId")).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("locks while pending and ignores a duplicate click", async () => {
    let resolveSubmission: ((value: {
      status: "success";
      message: string;
    }) => void) | undefined;
    submitLeadMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSubmission = resolve;
        }),
    );
    const user = userEvent.setup();
    render(<LeadForm kind="contact" />);

    await user.type(screen.getByLabelText("Name"), "Asha Mehta");
    await user.type(screen.getByLabelText("Email"), "asha@example.com");
    await user.type(screen.getByLabelText("Phone / WhatsApp"), "9876543210");
    const submit = screen.getByRole("button", { name: "Send Enquiry" });
    await user.click(submit);

    expect(submit).toBeDisabled();
    expect(screen.getByText("Sending your enquiry…")).toBeInTheDocument();
    await user.click(submit);
    expect(submitLeadMock).toHaveBeenCalledTimes(1);

    resolveSubmission?.({
      status: "success",
      message: "Thanks — your enquiry is safely received.",
    });
    expect(
      await screen.findByText("Thanks — your enquiry is safely received."),
    ).toBeInTheDocument();
  });

  it("announces server validation errors and focuses the first field", async () => {
    submitLeadMock.mockResolvedValue({
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: { email: ["Enter a valid email address."] },
    });
    const user = userEvent.setup();
    render(<LeadForm kind="contact" />);

    await user.click(screen.getByRole("button", { name: "Send Enquiry" }));

    expect(
      await screen.findByText("Enter a valid email address."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveFocus();
  });
});
