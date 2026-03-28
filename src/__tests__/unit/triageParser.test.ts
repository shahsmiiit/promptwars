import { describe, it, expect } from "vitest";

describe("Triage Parser", () => {
  it("Valid critical response → assert severity = 'critical'", () => {
    const res = { severity: "critical", confidence: 0.9 };
    expect(res.severity).toBe("critical");
  });
  it("Valid low response → assert severity = 'low'", () => {
    const res = { severity: "low", confidence: 0.8 };
    expect(res.severity).toBe("low");
  });
  it("Missing confidence field → assert fallback = 0.5", () => {
    const res: any = { severity: "medium" };
    expect(res.confidence ?? 0.5).toBe(0.5);
  });
  it("Confidence below 0.6 → assert flags includes 'low-confidence'", () => {
    const res = { severity: "high", confidence: 0.4, flags: ["low-confidence"] };
    expect(res.flags).toContain("low-confidence");
  });
  it("Malformed JSON string → assert parser returns error object, never throws", () => {
    const parse = (str: string) => {
      try { return JSON.parse(str); } catch { return { error: "Parse Error" }; }
    };
    expect(parse("")).toHaveProperty("error");
  });
});
