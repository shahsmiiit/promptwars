import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge tailwind classes correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn("bg-red-500", isTrue && "text-white", isFalse && "hidden")).toBe("bg-red-500 text-white");
  });

  it("should resolve tailwind class conflicts using tailwind-merge", () => {
    // text-red-500 should be overridden by text-blue-500
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    // p-4 should be overridden by p-8
    expect(cn("p-4", "p-8")).toBe("p-8");
  });
});
