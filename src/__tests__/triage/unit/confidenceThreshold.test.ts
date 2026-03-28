import { describe, it, expect } from "vitest";
import { getConfidenceLabel } from "../../../utils/confidenceThreshold";

describe("Confidence Threshold", () => {
  it("0.91", () => expect(getConfidenceLabel(0.91)).toContain("91"));
  it("0.5", () => expect(getConfidenceLabel(0.5).toLowerCase()).toContain("low"));
  it("0.59 triggers low confidence path check", () => expect(getConfidenceLabel(0.5)).toContain("review"));
  it("1.0", () => expect(getConfidenceLabel(1.0)).toBe("100%"));
  it("0.0", () => expect(getConfidenceLabel(0.0)).toBe("0%"));
});
