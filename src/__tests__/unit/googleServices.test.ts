import { describe, it, expect } from "vitest";
import { buildMapsEmbedUrl, buildMapsDirectionsUrl } from "../../services/google/maps.service";
import { getNearbyFacilities } from "../../services/google/places.service";

describe("Google Services Layer", () => {
  it("buildMapsEmbedUrl('ER', 37.77, -122.41) → assert URL contains 'emergency+room'", () => {
    const url = buildMapsEmbedUrl("ER", 37.77, -122.41);
    expect(url).toContain("emergency+room");
    expect(url).toContain("37.77");
    // it handles import.meta.env mock inherently via vite string replace usually
  });

  it("buildMapsEmbedUrl('self-care') → assert URL contains 'pharmacy'", () => {
    const url = buildMapsEmbedUrl("self-care");
    expect(url).toContain("pharmacy");
    expect(url).not.toContain("center=");
  });

  it("buildMapsDirectionsUrl(37.77, -122.41, 'urgent-care') → starts with Google Maps URL", () => {
    const url = buildMapsDirectionsUrl(37.77, -122.41, "urgent-care");
    expect(url.startsWith("https://www.google.com/maps/search")).toBe(true);
  });

  it("getNearbyFacilities(37.77, -122.41, 'ER') → returns array of length 3 with expected keys", async () => {
    const facilities = await getNearbyFacilities(37.77, -122.41, "ER");
    expect(facilities.length).toBe(3);
    expect(facilities[0]).toHaveProperty("name");
    expect(facilities[0]).toHaveProperty("type");
    expect(facilities[0]).toHaveProperty("eta");
    expect(facilities[0]).toHaveProperty("distance");
    expect(facilities[0]).toHaveProperty("mapsUrl");
  });
});
