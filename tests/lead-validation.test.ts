import { describe, expect, it } from "vitest";

import {
  hasFilledHoneypot,
  validateLeadFormData,
} from "../src/lib/leads/validation";

const submissionId = "1c8f61d4-e445-4c23-846f-76529342f9f6";

function formData(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) {
    data.set(key, value);
  }
  return data;
}

describe("lead form validation", () => {
  it("normalizes a valid contact enquiry", () => {
    const result = validateLeadFormData(
      formData({
        submissionId,
        kind: "contact",
        name: "  Asha Mehta  ",
        email: "  ASHA@example.com ",
        phone: "+91 98765 43210",
        sourcePath: "/#contact",
      }),
    );

    expect(result).toEqual({
      success: true,
      data: {
        submissionId,
        kind: "contact",
        name: "Asha Mehta",
        email: "asha@example.com",
        phone: "+91 98765 43210",
        sourcePath: "/#contact",
      },
    });
  });

  it("requires and normalizes a website for audit requests", () => {
    const result = validateLeadFormData(
      formData({
        submissionId,
        kind: "audit",
        name: "Ravi Shah",
        email: "ravi@example.com",
        phone: "9876543210",
        websiteUrl: "example.com/services",
        sourcePath: "/#audit",
      }),
    );

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.websiteUrl).toBe("https://example.com/services");
    }
  });

  it("returns only public field errors for malformed input", () => {
    const result = validateLeadFormData(
      formData({
        submissionId,
        kind: "audit",
        name: "A",
        email: "not-an-email",
        phone: "123",
        websiteUrl: "javascript:alert(1)",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.fieldErrors).sort()).toEqual([
        "email",
        "name",
        "phone",
        "websiteUrl",
      ]);
      expect(result.hasFormError).toBe(false);
    }
  });

  it("flags hidden submission failures as a form error", () => {
    const result = validateLeadFormData(
      formData({
        submissionId: "not-a-uuid",
        kind: "contact",
        name: "Asha Mehta",
        email: "asha@example.com",
        phone: "9876543210",
      }),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.hasFormError).toBe(true);
      expect(result.fieldErrors).toEqual({});
    }
  });

  it("detects a filled honeypot independently of user fields", () => {
    expect(hasFilledHoneypot(formData({ companyWebsite: "spam.example" }))).toBe(
      true,
    );
    expect(hasFilledHoneypot(formData({ companyWebsite: "" }))).toBe(false);
  });
});
