import { describe, it, expect } from "vitest";
import { getFlagSeverity } from "../../../utils/flagDetection";

describe("Flag Detection", () => {
  it("allergy-risk", () => expect(getFlagSeverity("allergy-risk")).toBeTruthy());
  it("drug-interaction", () => expect(getFlagSeverity("drug-interaction")).toBeTruthy());
  it("empty", () => expect(getFlagSeverity("")).toBeNull());
  it("Unknown string handles", () => expect(getFlagSeverity("fake-flag")).toBe("fake-flag"));
});
