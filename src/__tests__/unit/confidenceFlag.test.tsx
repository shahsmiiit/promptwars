import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { ConfidenceFlag } from "@/components/ConfidenceFlag";

describe("Confidence Flags", () => {
  it("confidence < 0.6 → 'Human review required' string present in output", () => {
    const { getByText } = render(<ConfidenceFlag confidence={0.5} flags={[]} />);
    expect(getByText("Human review required")).toBeInTheDocument();
  });
  it("confidence >= 0.6 → 'Human review required' NOT present", () => {
    const { queryByText } = render(<ConfidenceFlag confidence={0.7} flags={[]} />);
    expect(queryByText("Human review required")).not.toBeInTheDocument();
  });
  it("flags=['allergy-risk'] → pill badge with text 'allergy-risk' rendered", () => {
    const { getByText } = render(<ConfidenceFlag confidence={0.8} flags={["allergy-risk"]} />);
    expect(getByText("allergy-risk")).toBeInTheDocument();
  });
  it("flags=[] → no flag badges rendered", () => {
    const { container } = render(<ConfidenceFlag confidence={0.8} flags={[]} />);
    const badges = container.querySelectorAll('.badge');
    expect(badges.length).toBe(0);
  });
});
