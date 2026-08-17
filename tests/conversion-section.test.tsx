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
    
    // Default is build
    expect(screen.getByLabelText(/Tell us briefly what you're looking to build/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Current Website URL/i)).not.toBeInTheDocument();

    // Switch to redesign
    await user.click(screen.getByRole("button", { name: "Redesign my website" }));
    expect(screen.getByLabelText(/Current Website URL/i)).toBeRequired();
    expect(screen.getByLabelText(/What would you like to improve?/i)).toBeInTheDocument();

    // Switch to audit
    await user.click(screen.getByRole("button", { name: "Free website audit" }));
    expect(screen.getByLabelText(/Website URL/i)).toBeRequired();
    expect(screen.getByLabelText(/What's your biggest concern\?/i)).toBeInTheDocument();
  });
});
