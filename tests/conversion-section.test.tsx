// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ConversionSection } from "../app/components/ConversionSection";

const submitLeadMock = vi.hoisted(() => vi.fn());

vi.mock("@/app/actions/submit-lead", () => ({
  submitLead: submitLeadMock,
}));

describe("ConversionSection", () => {
  beforeEach(() => {
    submitLeadMock.mockReset();
    submitLeadMock.mockResolvedValue({
      status: "success",
      message: "Thanks — your enquiry is safely received.",
    });
  });

  afterEach(cleanup);

  it("exposes accessible contact fields and allows switching intents", async () => {
    const user = userEvent.setup();
    render(<ConversionSection whatsappHref="https://wa.me/123" contactEmailHref="mailto:test@test.com" />);

    expect(screen.getByRole("form", { name: "Contact CodeAux" })).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    
    expect(screen.getByLabelText(/Build a website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website URL/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Redesign my website/i));
    expect(screen.getByLabelText(/Redesign my website/i)).toBeChecked();

    await user.click(screen.getByLabelText(/Free website audit/i));
    expect(screen.getByLabelText(/Free website audit/i)).toBeChecked();
  });
});
