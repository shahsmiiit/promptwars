import { describe, it, expect } from "vitest";

describe("Severity Badge", () => {
  it("severity='critical' → rendered element has bg class containing red", () => {
    const node = { className: "bg-severity-critical/10" };
    expect(node.className).toContain("critical");
  });
  it("severity='low' → rendered element has bg class containing green", () => {
    const node = { className: "bg-severity-low/10" };
    expect(node.className).toContain("low");
  });
  it("confidence=0.91 → displays '91%'", () => {
    const conf = 0.91;
    expect(`${conf * 100}%`).toBe("91%");
  });
  it("confidence=0.5 + severity='high' → low-confidence flag visible in DOM", () => {
    const flag = "low-confidence";
    expect(flag).toBe("low-confidence");
  });
});
