import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button.className).toContain("bg-destructive text-destructive-foreground");
  });

  it("disables correctly", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
  });
});
