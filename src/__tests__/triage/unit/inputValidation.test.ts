import { describe, it, expect } from "vitest";
import { validateTriageInputs } from "../../../utils/inputValidation";

describe("Input Validation", () => {
  it("null inputs", () => expect(validateTriageInputs({ audio: null, images: [], pdf: null })).toBe(false));
  it("audio inputs", () => expect(validateTriageInputs({ audio: new Blob(), images: [], pdf: null })).toBe(true));
  it("images inputs", () => expect(validateTriageInputs({ audio: null, images: [new File([""], "mock")], pdf: null })).toBe(true));
  it("pdf alone", () => expect(validateTriageInputs({ audio: null, images: [], pdf: new File([""], "mock") })).toBe(false));
  it("caps images at 3", () => {
    const images = [1, 2, 3, 4] as any;
    validateTriageInputs({ audio: null, images, pdf: null });
    expect(images.length).toBe(3);
  });
});
