import { describe, it, expect } from "vitest";
import { getSeverityColor } from "../../../utils/severityMapping";

describe("Severity Mapping", () => {
  it("should map critical", () => expect(getSeverityColor("critical")).toContain("#B71C1C"));
  it("should map high", () => expect(getSeverityColor("high")).toContain("#E65100"));
  it("should map moderate", () => expect(getSeverityColor("moderate")).toContain("#F9A825"));
  it("should map low", () => expect(getSeverityColor("low")).toContain("#2E7D32"));
  it("should handle unknown cleanly", () => expect(getSeverityColor("unknown")).toBeDefined());
});
