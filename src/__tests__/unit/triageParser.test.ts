import { describe, it, expect } from "vitest";
import { parseTriageResponse } from "@/services/triage";

describe("Triage Parser", () => {
  it("Valid critical response → assert severity = 'critical'", () => {
    const result = parseTriageResponse('{"severity": "critical", "confidence": 0.9}');
    expect(result).toHaveProperty('severity', 'critical');
  });
  it("Valid low response → assert severity = 'low'", () => {
    const result = parseTriageResponse('{"severity": "low", "confidence": 0.8}');
    expect(result).toHaveProperty('severity', 'low');
  });
  it("Missing confidence field → assert fallback = 0.5", () => {
    const result = parseTriageResponse('{"severity": "medium"}');
    expect(result).toHaveProperty('confidence', 0.5);
  });
  it("Confidence below 0.6 → assert flags includes 'low-confidence'", () => {
    const result = parseTriageResponse('{"severity": "high", "confidence": 0.4}');
    expect(result).toHaveProperty('flags');
    if ('flags' in result) {
      expect(result.flags).toContain('low-confidence');
    }
  });
  it("Malformed JSON string → assert parser returns error object, never throws", () => {
    const result = parseTriageResponse("");
    expect(result).toHaveProperty('error');
  });
});
