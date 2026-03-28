import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { SeverityBadge } from "@/components/SeverityBadge";

describe("Severity Badge", () => {
  it("severity='critical' → rendered element has bg class containing red", () => {
    const { container } = render(<SeverityBadge severity="critical" confidence={0.8} />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("bg-red-500");
  });
  it("severity='low' → rendered element has bg class containing green", () => {
    const { container } = render(<SeverityBadge severity="low" confidence={0.8} />);
    const element = container.firstChild as HTMLElement;
    expect(element.className).toContain("bg-green-500");
  });
  it("confidence=0.91 → displays '91%'", () => {
    const { getByText } = render(<SeverityBadge severity="high" confidence={0.91} />);
    expect(getByText("91%")).toBeInTheDocument();
  });
  it("confidence=0.5 + severity='high' → low-confidence flag visible in DOM", () => {
    const { getByText } = render(<SeverityBadge severity="high" confidence={0.5} />);
    expect(getByText("low-confidence")).toBeInTheDocument();
  });
});
